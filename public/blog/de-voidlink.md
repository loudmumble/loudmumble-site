# Building VoidLink From Spec: What Agentic Malware Teaches Us About Detection

*February 2026*

---

When Check Point Research dropped their VoidLink analysis earlier this year, I did what most detection engineers do: read it twice, took notes, and started thinking about how I'd catch it. Then I did something slightly less common — I built it.

Not to deploy it. Not to sell it. To understand it well enough to write rules that actually work.

This post covers DE-VoidLink, an adversary simulation project that replicates the VoidLink malware framework's architecture and behaviors for defensive research. I built it to stress-test Aegis, my behavioral IDS, and to produce detection artifacts the community can actually use. The full source is published. The rules are published. Here's how it went.

---

## Motivation: Why Build It?

The VoidLink research from Check Point (Parts 1 and 2), the Sysdig TRT analysis, and Ontinue's dissection collectively paint a detailed picture of a sophisticated agentic malware framework. VoidLink isn't your typical C2 implant. It's designed to operate autonomously, make risk-based decisions about when to beacon, and camouflage its traffic as legitimate web content. The papers are excellent. But reading about evasion techniques and actually detecting them are different problems.

Most detection rules written against published malware research are written against the *description* of the malware, not against observed behavior. That gap matters. A rule written against a PCAP sample catches that sample. A rule written against a behavioral model catches variants.

To build a behavioral model, you need to run the thing. Since running actual VoidLink in a lab carries obvious risks (and the sample isn't exactly freely distributed), the next best option is to build a faithful simulation from the published specs.

That's DE-VoidLink: a true-to-form adversary emulation of VoidLink's architecture, built for controlled lab use, with hard safety controls baked in from the start.

The secondary goal was to validate Aegis, a behavioral IDS I've been building that focuses on cadence analysis and inter-arrival time fingerprinting rather than signature matching. VoidLink's beaconing behavior is exactly the kind of thing Aegis is designed to catch. I needed a realistic target to test against.

---

## Architecture: Zig Beacon, Go C2, C Arsenal

The published VoidLink research describes a multi-component architecture. DE-VoidLink mirrors it:

**Beacon (Zig):** The implant component is written in Zig. This wasn't an arbitrary choice — Zig's compile-time features make it straightforward to produce small, self-contained binaries with predictable syscall patterns. The beacon handles the core implant loop: check-in, receive tasking, execute, report back.

**C2 Server (Go):** The command-and-control server is Go. It handles operator sessions, task queuing, and the HTTP camouflage layer. Go's standard library makes it easy to serve convincing fake web content while multiplexing actual C2 traffic underneath.

**Arsenal (C):** Capability modules are C. These are the "tools" the beacon can load and execute — system info collection (hostname, kernel, architecture, UID), credential path enumeration, and persistence vector checking. Keeping these in C gives maximum control over the syscall surface, which matters for both evasion fidelity and detection research.

The three-language architecture isn't accidental. It reflects how real tooling gets built when different components have different requirements: the beacon needs to be small and portable, the server needs to be maintainable and concurrent, and the capability modules need to be close to the metal.

---

## The Syscall Fingerprint

One of the most useful artifacts from the VoidLink research is the characteristic syscall sequence the implant produces during initialization and payload staging. DE-VoidLink replicates this sequence faithfully:

```
fork(57)
prctl(157)
socket(41)
connect(42)
recvfrom(45)
memfd_create(319)
write(1)
[execveat(322)]
```

Walk through what this means operationally. The `fork` creates a child process for the implant work. `prctl` is called to set process attributes — in VoidLink's case, this is used for process name manipulation to blend into process listings. `socket` and `connect` establish the C2 channel. `recvfrom` pulls down the payload. `memfd_create` creates an anonymous in-memory file descriptor — no file touches disk. `write` stages the payload into that memory region. `execveat` (when present) executes from the memory descriptor.

That sequence is a fingerprint. Any process that hits `memfd_create` followed by `write` followed by `execveat` in close temporal proximity, after establishing an outbound connection, is doing something worth looking at. The published Sigma rules in the DE-VoidLink repo target this syscall chain directly.

One important note on DE-VoidLink's safety controls: the `execveat` step is disabled by default. The simulation stages a benign payload into the memfd region but does not execute it. More on safety controls below.

---

## HTTP Camouflage: Five Modes

VoidLink's traffic blending is one of its more interesting design choices. Rather than encrypting traffic and hoping nobody notices the unusual TLS patterns, it wraps C2 communications in content that looks like normal web traffic at the HTTP layer.

DE-VoidLink implements five camouflage modes:

**PNG mode:** C2 data is embedded in what appears to be image transfer traffic. The HTTP headers, content-type, and response structure mimic a CDN serving static assets.

**JS mode:** Traffic is wrapped to resemble JavaScript file fetches and responses. Useful for blending into environments with heavy web application traffic.

**CSS mode:** Similar to JS mode but mimics stylesheet loading patterns. Different timing characteristics than JS — stylesheets tend to load in bursts at page load rather than on-demand.

**HTML mode:** Full page responses. Higher overhead but the most convincing cover for environments with web proxies doing content inspection.

**API mode:** API-style JSON traffic. This is the most flexible mode for environments where REST API calls are common and inspected less carefully than page loads.

The mode selection matters for detection. Each mode produces different traffic patterns, different response sizes, and different timing characteristics. A detection approach that only looks at one mode will miss the others. Aegis's cadence analysis operates at the timing layer, which is mode-agnostic — the inter-arrival time patterns are similar regardless of what the HTTP wrapper looks like.

---

## VoidStream: The Wire Protocol

Underneath the HTTP camouflage layer sits VoidStream, the actual C2 protocol. The design is straightforward but solid:

- **Encryption:** AES-256-GCM throughout. No custom crypto.
- **Wire format:** Length-prefixed frames with a fixed header structure.

```
[4 bytes: frame length]
[12 bytes: GCM nonce]
[N bytes: ciphertext]
[16 bytes: GCM auth tag]
```

The wire format is deliberately minimal — just a length-prefixed authenticated encryption envelope. The nonce is generated fresh per frame from `crypto/rand`. Session IDs and message types live at the HTTP layer, not in the wire format: session IDs are assigned at check-in and passed via header, while message types are implicit in the endpoint path (handshake, sync, heartbeat, kill).

Nothing revolutionary here — AES-GCM is the right choice for this use case, and the frame structure is clean. What's interesting from a detection standpoint is the frame size distribution. Heartbeats produce small, consistent frames. Task responses vary based on output size. That size distribution, combined with timing, creates a behavioral signature that's hard to fully suppress.

---

## Beaconing Modes: Risk-Based and LLM-Mimicking

This is where VoidLink gets genuinely interesting from a detection research perspective. Most C2 frameworks beacon on a fixed interval, maybe with some jitter. VoidLink's published design describes two distinct beaconing strategies:

**voidlink mode (risk-based timing):** The beacon adjusts its check-in interval based on perceived environmental risk. If the host looks quiet (low process activity, off-hours, no active user sessions), it beacons more frequently. If the environment looks active or monitored, it backs off. The goal is to minimize exposure during high-risk periods while maintaining responsiveness when the coast is clear.

**ai-cadence mode (LLM token timing mimicry):** This one is clever and worth understanding carefully. Large language model inference produces tokens at a characteristic rate — not perfectly uniform, but with a specific statistical distribution based on the model architecture and hardware. The ai-cadence mode generates inter-arrival times that match this distribution, making the beacon's timing pattern resemble an application making LLM API calls.

In 2026, LLM API traffic is everywhere. An endpoint making periodic HTTPS requests with timing that matches GPT-4 token generation is... normal. That's the point.

For Aegis, this was the hardest test case. The cadence analysis module had to learn to distinguish genuine LLM API traffic from VoidLink's mimicry. The distinguishing features turn out to be subtle: genuine LLM traffic has session-level patterns (prompt-response pairs with variable prompt lengths), while VoidLink's mimicry produces a more stationary distribution without the session structure. AEGIS-006 catches the LLM timing fingerprint; the session-structure distinction is the active area of research.

---

## Safety Controls

Building adversary simulation tooling responsibly means the safety controls aren't an afterthought. DE-VoidLink has several hard constraints:

**PHANTOM_LINK_SAFETY environment variable:** The beacon will not run unless this variable is set to a specific value. This prevents accidental execution outside of intentional lab contexts.

**--dry-run default:** All execution is dry-run by default. The tool logs what it *would* do without actually doing it. You have to explicitly opt into live mode.

**--max-runtime:** A hard wall on how long the simulation runs. The process self-terminates after the configured duration regardless of operator input.

**Localhost binding:** The C2 server binds to localhost only. No external connectivity by default. Connecting to an external C2 requires explicit configuration changes.

**No execveat:** The final stage of the syscall chain — actually executing the staged payload — is disabled. The simulation stages a benign marker string (`PHANTOM_LINK_SIMULATED_PAYLOAD`) into the memfd region but does not call execveat. This preserves the behavioral fingerprint for detection purposes without creating actual code execution risk.

**Benign payloads only:** The arsenal modules in the published version perform only read-only operations: system info collection, credential path existence checks (not reading contents), and persistence vector writeability checks (not writing). No privilege escalation, no persistence installation, no lateral movement.

These aren't suggestions. They're enforced in the code. The goal is a tool that's useful for detection research and genuinely difficult to misuse.

---

## Testing Aegis: What We Found

Aegis is a behavioral IDS built around cadence analysis — inter-arrival time fingerprinting of network connections. Rather than matching signatures, it profiles the timing patterns of network flows and classifies them against known behavioral models.

Running DE-VoidLink against Aegis produced nine detection rules, AEGIS-001 through AEGIS-009. The first seven are general agentic-traffic detectors; the last two target C2 beaconing specifically:

- **AEGIS-001:** LLM Streaming Cadence Detected. Flow exhibits inter-arrival timing consistent with LLM token streaming (15-80ms mean IAT, low variance). Flags AI-generated traffic — benign or malicious.
- **AEGIS-002:** High-Confidence Agent Traffic. Strong model fingerprint match with >80% confidence. The flow looks like a specific known LLM.
- **AEGIS-003:** Human-to-Agent Transition. Session shifts from human-like timing to agent-like timing mid-flow. Characteristic of an attacker handing off to an AI agent after initial access.
- **AEGIS-004:** Sustained Agent Session. Agent-classified flow active for 120+ seconds with 200+ packets. Suggests autonomous operation — recon, lateral movement, or data collection running unattended.
- **AEGIS-005:** Perfectly Regular Traffic. Near-zero timing variance (regularity >0.9, CV <0.1). No human produces this pattern. Strong indicator of scripted or automated activity.
- **AEGIS-006:** Known LLM Model in Encrypted Traffic. Inter-token timing fingerprint matches a known LLM model even through encryption. The model may be driving commands on the target.
- **AEGIS-007:** High-Volume Agent Data Transfer. Agent-classified flow exceeding 1MB transferred. Potential exfiltration or bulk collection.
- **AEGIS-008:** C2 Beaconing Pattern. Periodic timing in the 500ms-10s range with low jitter (CV <0.30) and high regularity (>0.70). This is the classic C2 beacon signature — the one VoidLink's risk-based mode produces.
- **AEGIS-009:** Periodic Network Beaconing. Strong autocorrelation at second-scale intervals combined with beaconing-range timing. High-confidence C2 indicator that catches VoidLink even when individual intervals vary.

The cadence analysis approach held up well against voidlink mode — AEGIS-008 and AEGIS-009 catch the risk-based beaconing reliably. The ai-cadence mode was harder. AEGIS-006 flags the LLM timing fingerprint, but distinguishing genuine LLM API traffic from VoidLink's mimicry requires looking at session-level structure: genuine traffic has prompt-response pairs with variable prompt lengths, while VoidLink's mimicry produces a more stationary distribution. That distinction is harder to codify as a rule, and the false positive rate was higher than I'd like before tuning. That's an honest result. The mimicry is good.

---

## Published Detection Rules

The detection artifacts from this research are published and free to use:

**11 YARA rules** covering binary characteristics of the beacon and arsenal components: string patterns, section layouts, and import table signatures.

**7 Sigma rules** covering the syscall sequence patterns, process behavior, and network indicators. These are written for compatibility with common SIEM backends.

**Aegis behavioral profiles** for both beaconing modes, usable with the Aegis IDS directly.

All rules include comments explaining the detection logic and known false positive conditions. Rules without that context are hard to tune and harder to trust.

---

## Lessons

A few things worth noting from this project:

**Behavioral detection is harder to evade than signature detection, but harder to write.** The ai-cadence mode demonstrates that a sufficiently motivated adversary can make their traffic look like something legitimate. But the session-level structure of genuine LLM traffic is hard to fake without essentially implementing a real LLM client, which creates its own detection surface.

**The syscall sequence is a durable fingerprint.** HTTP camouflage modes change the network-layer appearance significantly. The syscall sequence barely changes at all. Kernel-level visibility is worth the operational complexity.

**Safety controls should be designed in, not bolted on.** The PHANTOM_LINK_SAFETY variable and dry-run default aren't just responsible research practice — they also make the tool easier to use in lab environments where you want predictable, controlled behavior. Good safety design and good usability aren't in conflict.

**Publishing the simulation alongside the rules matters.** Detection rules without a way to test them are hard to validate. Publishing DE-VoidLink means anyone can run the simulation in their own lab and verify that the rules fire correctly. That's the point.

---

## What's Next

A few directions I'm planning to explore:

The ai-cadence detection needs more work. AEGIS-006 catches the LLM timing fingerprint, but distinguishing mimicry from genuine LLM traffic at the session-structure level isn't codified as a rule yet. I want to explore whether the prompt-response pattern difference can be detected without a pre-trained baseline, which would make the detection more deployable in new environments.

The YARA rules cover the current DE-VoidLink binary characteristics. As the project evolves, I want to develop more abstract rules that target the behavioral patterns rather than specific binary artifacts — rules that would catch variants, not just the current build.

I'm also interested in extending the HTTP camouflage analysis. The five modes in DE-VoidLink cover the published VoidLink behaviors, but the underlying technique (wrapping C2 traffic in legitimate-looking content) is general. Understanding the detection-relevant differences between modes more rigorously would produce better rules.

---

## Code and Rules

Everything is published:

- **DE-VoidLink simulation:** [github.com/loudmumble/de-voidlink](https://github.com/loudmumble/de-voidlink) {{PLACEHOLDER_DEVOIDLINK_URL — replace once GitHub repo is created}}
- **Aegis IDS:** [github.com/loudmumble/aegis](https://github.com/loudmumble/aegis) {{PLACEHOLDER_AEGIS_URL — replace once GitHub repo is created}}

The repos include the full source, the detection rules, and documentation for running the simulation in a lab environment. If you find issues with the rules, have suggestions for improving the detection logic, or want to discuss the research, open an issue or reach out directly.

This is research. Feedback makes it better.

---

*References:*

- *Check Point Research, "VoidLink: Anatomy of an Agentic Malware Framework, Part 1" (2026)* {{PLACEHOLDER_REF_CPR1 — add URL once published/verified}}
- *Check Point Research, "VoidLink: Command, Control, and Camouflage, Part 2" (2026)* {{PLACEHOLDER_REF_CPR2 — add URL once published/verified}}
- *Sysdig Threat Research Team, "VoidLink in the Wild: Runtime Analysis" (2026)* {{PLACEHOLDER_REF_SYSDIG — add URL once published/verified}}
- *Ontinue, "Dissecting VoidLink: Protocol and Evasion Mechanics" (2026)* {{PLACEHOLDER_REF_ONTINUE — add URL once published/verified}}

---

**loudmumble** is a security researcher focused on agentic threat detection and offensive tooling. Tools and research at [github.com/loudmumble](https://github.com/loudmumble) {{PLACEHOLDER_GITHUB_ORG — replace once GitHub org is created}} and [loudmumble.com](https://loudmumble.com) {{PLACEHOLDER_BLOG_ROUTE — verify blog route exists on loudmumble.com before publishing}}.
