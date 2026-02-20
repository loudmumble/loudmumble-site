# Building VoidLink From Spec: What Agentic Malware Teaches Us About Detection

*February 2026*

---

When Check Point Research dropped their VoidLink analysis earlier this year, I did what most detection engineers do: read it twice, took notes, and started thinking about how I'd catch it. Then I did something slightly less common — I built it.

Not to deploy it. To understand it well enough to write rules that actually work.

The result is DE-VoidLink: an adversary simulation that replicates VoidLink's architecture and behaviors for defensive research. I built it to stress-test Aegis, my behavioral IDS, and to produce detection artifacts the community can use. Full source published. Rules published. Here's how it went.

---

## Why Build It?

Most detection rules written against published malware research are written against the *description* of the malware, not against observed behavior. That gap matters. A rule written against a PCAP sample catches that sample. A rule written against a behavioral model catches variants. To build a behavioral model, you need to run the thing.

Since running actual VoidLink carries obvious risks (and the sample isn't freely distributed), the next best option is a faithful simulation from the published specs. That's DE-VoidLink.

The secondary goal was validating Aegis, which focuses on cadence analysis and inter-arrival time fingerprinting rather than signature matching. VoidLink's beaconing behavior is exactly the kind of thing Aegis is designed to catch.

---

## Architecture: Zig Beacon, Go C2, C Arsenal

DE-VoidLink mirrors the multi-component architecture described in the published research:

**Beacon (Zig):** Zig's compile-time features produce small, self-contained binaries with predictable syscall patterns — right for an implant that needs to be portable and quiet.

**C2 Server (Go):** Go's standard library makes it straightforward to serve convincing fake web content while multiplexing actual C2 traffic underneath.

**Arsenal (C):** Capability modules in C give maximum control over the syscall surface. The published arsenal covers system info collection (`recon.c`), credential path enumeration (`cred_harvest.c`), and persistence vector checking (`persist.c`) — all read-only operations.

---

## Beaconing Modes: Risk-Based and LLM-Mimicking

This is the most interesting part of VoidLink's design, and the hardest detection problem.

Most C2 frameworks beacon on a fixed interval with some jitter. VoidLink's published design describes two distinct strategies:

**voidlink mode (risk-based timing):** The beacon adjusts its check-in interval based on perceived environmental risk. Quiet host, off-hours, no active user sessions? Beacon more frequently. Active environment or signs of monitoring? Back off. The goal is minimizing exposure during high-risk periods while staying responsive when the coast is clear.

**ai-cadence mode (LLM token timing mimicry):** This one is genuinely clever. LLM inference produces tokens at a characteristic rate — not perfectly uniform, but with a specific statistical distribution based on model architecture and hardware. The ai-cadence mode generates inter-arrival times that match this distribution, making the beacon's timing pattern resemble an application making LLM API calls.

In 2026, LLM API traffic is everywhere. An endpoint making periodic HTTPS requests with timing that matches GPT-4 token generation is... normal. That's the point.

For Aegis, ai-cadence was the hardest test case. The distinguishing features turn out to be subtle: genuine LLM traffic has session-level structure (prompt-response pairs with variable prompt lengths), while VoidLink's mimicry produces a more stationary distribution without that session structure. AEGIS-006 catches the LLM timing fingerprint; codifying the session-structure distinction as a rule is the active area of research. The false positive rate was higher than I'd like before tuning. That's an honest result. The mimicry is good.

---

## HTTP Camouflage: Five Modes

Cadence analysis is mode-agnostic — the inter-arrival time patterns are similar regardless of what the HTTP wrapper looks like. That's the key insight. But the five modes are worth knowing because each produces different traffic patterns, response sizes, and timing characteristics that affect other detection approaches:

- **PNG mode:** Mimics CDN serving static image assets
- **JS mode:** Resembles JavaScript file fetches and responses
- **CSS mode:** Mimics stylesheet loading (burst patterns at page load, not on-demand)
- **HTML mode:** Full page responses — highest overhead, most convincing for proxy inspection environments
- **API mode:** JSON REST-style traffic — most flexible for environments where API calls are common and inspected less carefully

A detection approach targeting only one mode misses the others. Timing-layer analysis doesn't have that problem.

---

## The Syscall Fingerprint

The characteristic syscall sequence DE-VoidLink replicates:

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

The key insight is in the last three calls. `memfd_create` creates an anonymous in-memory file descriptor — nothing touches disk. `write` stages the payload into that memory region. `execveat` (when present) executes directly from the memory descriptor. Any process that hits `memfd_create` → `write` → `execveat` in close temporal proximity, after establishing an outbound connection, is doing something worth looking at.

That sequence is a durable fingerprint. The HTTP camouflage modes change the network-layer appearance significantly. The syscall sequence barely changes at all. Kernel-level visibility is worth the operational complexity.

In DE-VoidLink, `execveat` is disabled by default. The simulation stages a benign marker string (`PHANTOM_LINK_SIMULATED_PAYLOAD`) into the memfd region but does not execute it. The behavioral fingerprint is preserved for detection purposes without creating actual code execution risk.

---

## VoidStream: The Wire Protocol

Underneath the HTTP camouflage sits VoidStream. The frame format:

```
[4 bytes: frame length]
[12 bytes: GCM nonce]
[N bytes: ciphertext]
[16 bytes: GCM auth tag]
```

AES-256-GCM throughout, fresh nonce per frame from `crypto/rand`. Session IDs and message types live at the HTTP layer — session IDs assigned at check-in via header, message types implicit in the endpoint path (handshake, sync, heartbeat, kill).

Nothing revolutionary in the crypto choices. What's detection-relevant is the frame size distribution: heartbeats produce small, consistent frames; task responses vary with output size. That size distribution combined with timing creates a behavioral signature that's hard to fully suppress.

---

## Safety Controls

These are enforced in code, not suggestions:

- **`PHANTOM_LINK_SAFETY` env var:** The beacon won't run unless this is set to a specific value. Prevents accidental execution outside intentional lab contexts.
- **`--dry-run` default:** All execution is dry-run by default. You have to explicitly opt into live mode.
- **`--max-runtime`:** Hard wall on simulation duration. Process self-terminates regardless of operator input.
- **Localhost binding:** C2 server binds to localhost only. External connectivity requires explicit configuration changes.
- **No `execveat`:** Final stage of the syscall chain is disabled. Benign marker staged, not executed.
- **Read-only arsenal:** All capability modules perform only read operations — no privilege escalation, no persistence installation, no lateral movement.

---

## Testing Aegis: The AEGIS Rules

Running DE-VoidLink against Aegis produced nine detection rules. The first seven target agentic traffic broadly; the last two target C2 beaconing specifically:

| Rule ID | Name | What It Catches | Severity |
|---------|------|-----------------|----------|
| AEGIS-001 | LLM Streaming Cadence | Flow with 15-80ms mean IAT, low variance — LLM token streaming pattern | medium |
| AEGIS-002 | High-Confidence Agent Traffic | >80% confidence model fingerprint match | high |
| AEGIS-003 | Human-to-Agent Transition | Session shifts from human timing to agent timing mid-flow | high |
| AEGIS-004 | Sustained Agent Session | Agent flow active 120+ seconds, 200+ packets — autonomous operation | high |
| AEGIS-005 | Perfectly Regular Traffic | Near-zero variance (regularity >0.9, CV <0.1) — scripted/automated | medium |
| AEGIS-006 | Known LLM Model in Encrypted Traffic | Inter-token timing fingerprint matches known LLM through encryption | medium |
| AEGIS-007 | High-Volume Agent Data Transfer | Agent flow exceeding 1MB — potential exfiltration | critical |
| AEGIS-008 | C2 Beaconing Pattern | 500ms-10s periodic timing, low jitter (CV <0.30, regularity >0.70) | high |
| AEGIS-009 | Periodic Network Beaconing | Strong autocorrelation at second-scale intervals — high-confidence C2 | high |

AEGIS-008 and AEGIS-009 catch voidlink mode reliably. The ai-cadence mode is harder — AEGIS-006 flags the LLM timing fingerprint, but the false positive rate before tuning was higher than I'd like. The mimicry is good enough that distinguishing it from genuine LLM API traffic requires session-level analysis that isn't fully codified as a rule yet.

---

## Published Detection Rules

- **11 YARA rules** (5+3+3 across 3 files) covering binary characteristics: string patterns, section layouts, import table signatures
- **7 Sigma rules** (3+2+2 across 3 files) covering the syscall sequence, process behavior, and network indicators — written for compatibility with common SIEM backends
- **Aegis behavioral profiles** for both beaconing modes

All rules include comments explaining the detection logic and known false positive conditions. Rules without that context are hard to tune and harder to trust.

---

## Lessons

**Behavioral detection is harder to evade than signature detection, but harder to write.** The ai-cadence mode shows that a motivated adversary can make their traffic look like something legitimate. But faking the session-level structure of genuine LLM traffic requires essentially implementing a real LLM client, which creates its own detection surface.

**The syscall sequence is a durable fingerprint.** HTTP camouflage changes the network-layer appearance significantly. The syscall sequence barely changes. Kernel-level visibility is worth the operational complexity.

**Safety controls and usability aren't in conflict.** The `PHANTOM_LINK_SAFETY` variable and dry-run default make the tool easier to use in lab environments where you want predictable, controlled behavior. Good safety design is good design.

**Publishing the simulation alongside the rules matters.** Detection rules without a way to test them are hard to validate. Anyone can run DE-VoidLink in their own lab and verify the rules fire correctly.

---

## What's Next

The ai-cadence detection needs more work. AEGIS-006 catches the LLM timing fingerprint, but distinguishing mimicry from genuine LLM traffic at the session-structure level isn't codified as a rule yet. I want to explore whether the prompt-response pattern difference can be detected without a pre-trained baseline — that would make the detection deployable in new environments without a calibration period.

The YARA rules cover current DE-VoidLink binary characteristics. As the project evolves, I want to develop more abstract rules targeting behavioral patterns rather than specific binary artifacts — rules that catch variants, not just the current build.

---

## Code and Rules

- **DE-VoidLink simulation:** [github.com/loudmumble/de-voidlink](https://github.com/loudmumble/de-voidlink)
- **Aegis IDS:** [github.com/loudmumble/aegis](https://github.com/loudmumble/aegis)

Full source, detection rules, and lab documentation in both repos. If you find issues with the rules or want to discuss the research, open an issue or reach out directly.

---

## References

- Check Point Research, "VoidLink: The Cloud-Native Malware Framework" (January 13, 2026): [research.checkpoint.com/2026/voidlink-the-cloud-native-malware-framework/](https://research.checkpoint.com/2026/voidlink-the-cloud-native-malware-framework/)
- Check Point Research, "VoidLink: Early AI-Generated Malware Framework" (January 20, 2026): [research.checkpoint.com/2026/voidlink-early-ai-generated-malware-framework/](https://research.checkpoint.com/2026/voidlink-early-ai-generated-malware-framework/)
- Sysdig TRT, "VoidLink Threat Analysis: Sysdig Discovers C2-Compiled Kernel Rootkits" (January 16, 2026): [sysdig.com/blog/voidlink-threat-analysis-sysdig-discovers-c2-compiled-kernel-rootkits](https://www.sysdig.com/blog/voidlink-threat-analysis-sysdig-discovers-c2-compiled-kernel-rootkits)
- Ontinue, "VoidLink: Dissecting an AI-Generated C2 Implant" (February 2026): [ontinue.com/resource/voidlink-dissecting-an-ai-generated-c2-implant/](https://www.ontinue.com/resource/voidlink-dissecting-an-ai-generated-c2-implant/)

---

**loudmumble** is a security researcher focused on agentic threat detection and offensive tooling. Tools and research at [github.com/loudmumble](https://github.com/loudmumble) and [loudmumble.com](https://loudmumble.com).
