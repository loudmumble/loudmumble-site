# Detection Engineering: The Gap Between Signatures and Behavior

*Published 2025-01-14 · loudmumble*

---

There is a persistent misconception in detection engineering: that a good rule is a precise rule. Precision is desirable, but chasing it at the expense of behavioral coverage is how defenders end up writing hundreds of rules that collectively miss the attack.

This post is about the gap between signature-based detection and behavioral detection — what each buys you, where each breaks down, and how to think about building a detection stack that actually holds up against an adversary who reads your playbook.

## The Signature Trap

A signature rule matches a known artifact. Hash of a known implant. Exact command-line string from a published PoC. A specific mutex name that appeared in a threat report. These rules are fast to write, produce near-zero false positives on day one, and give leadership something to check off.

The problem is the half-life. The moment an adversary knows the indicator is burned — or just rotates tooling as standard practice — the rule produces nothing. You are now detecting the **ghost of an attack** that happened to someone else, months ago, in a different environment.

More concerning: precision breeds false confidence. A well-tuned signature library that fires clean every day starts to feel like coverage. It isn't. It is a collection of known-bad snapshots with no ability to detect anything novel.

## What Behavioral Detection Actually Means

Behavioral detection is not "detect suspicious PowerShell." That is still a signature — it is just a noisy one.

True behavioral detection models what a process, user, or system **should do** in a given context and alerts on deviation. It requires:

- **Baseline understanding** of normal. Not "PowerShell is unusual" but "this host has never spawned PowerShell from a Word macro, and Word macros here run in a restricted AppLocker policy." Context matters. The same event is noise on a developer workstation and a high-confidence alert on a finance host.
- **Chain modeling**. Individual events are rarely meaningful. A process writing to a temp directory means nothing. That same process, having been spawned by a browser, calling `CreateRemoteThread` into `lsass.exe` thirty seconds later — that is a chain. Detection needs to reason across time.
- **Invariant behaviors**. Some things attackers cannot easily change. They can rename binaries, rotate hashes, and obfuscate shellcode. They cannot stop process injection from creating cross-process memory writes. They cannot exfiltrate data without bytes leaving the host. Focus detection on the things that **must happen** for the attack to succeed, not on the artifacts that happen to accompany it.

## A Concrete Example: LSASS Credential Access

The signature approach: detect `mimikatz.exe`, detect `sekurlsa::logonpasswords` in command-line arguments, detect known Mimikatz PE hashes.

All of these are bypassed in the first ten minutes of any halfway serious red team engagement. Rename the binary. Compile from source. Call the APIs directly from a custom reflective loader. Done.

The behavioral approach: detect any process opening a handle to `lsass.exe` with `PROCESS_VM_READ` that is not a known-good process (AV agent, EDR sensor, WER). This does not care about the tool name, the binary hash, or the command line. It cares about the **action that must occur** for credential extraction to work. The handle open is invariant.

You still get false positives. Crash reporters, debuggers, some security tooling. That is the tradeoff — behavioral rules require tuning, and tuning requires understanding your environment. But the coverage is structural rather than cosmetic.

## The Detection Stack in Practice

A mature detection stack layers both approaches deliberately:

| Layer | Type | Purpose |
|-------|------|---------|
| IOC matching | Signature | Fast catch of known-bad, threat intel operationalization |
| Anomaly | Statistical | Surface deviation from baseline for triage |
| Behavioral | Rule/graph | Model attack techniques as sequences of events |
| Hunting | Manual/assisted | Uncover what rules miss via adversary-centric investigation |

None of these replaces the others. IOC matching catches commodity malware and gives incident responders a fast first signal. Behavioral rules catch technique reuse even when tooling rotates. Hunting finds the gaps in the rules — and good hunters write new behavioral rules from what they find.

The failure mode is treating any single layer as sufficient. Most organizations hit IOC matching and stop. Some add anomaly detection and interpret the noise as coverage. Few build the behavioral layer, because it is hard — it requires knowledge of attack technique mechanics, not just knowledge of known bad hashes.

## Building Behavioral Rules: Starting Points

If you are building this out, a few places to start:

- **Process lineage**. Model expected parent-child process relationships per host type. Office spawning `cmd.exe` is unusual in most environments. Office spawning `wscript.exe` spawning `powershell.exe` with `-encodedcommand` is a chain worth alerting on regardless of what the payload does.
- **Network from unexpected processes**. `mshta.exe`, `regsvr32.exe`, `certutil.exe` initiating outbound connections to non-CDN, non-update infrastructure. The technique (living-off-the-land binary for network beaconing) is more persistent than any specific C2 domain.
- **Credential access patterns**. Handle opens to `lsass.exe`, SAM/SYSTEM/SECURITY registry hive access from non-administrative tools, DCSync patterns in AD event logs (4662 on domain controller for specific GUIDs).
- **Persistence mechanism creation**. New scheduled tasks, new services, autorun key writes from processes that have no business writing them. Not "a scheduled task was created" but "a scheduled task was created by a process that spawned from a browser six minutes ago."

## The Adversary's Perspective

The most useful mental model for detection engineering is to think like the person trying to defeat your rules.

A red teamer does not see your detections directly, but they see the results: alerts fired, engagement shut down, objectives not reached. They iterate. If your detection fires on `mimikatz.exe`, they rename it. If it fires on the PE signature, they recompile. If it fires on `sekurlsa::logonpasswords` in command-line args, they call the APIs directly. If you have a behavioral rule on the LSASS handle with `PROCESS_VM_READ`, they switch to a kernel-level credential extraction technique that bypasses userland hooks entirely.

Every layer of behavioral detection forces the adversary to go deeper, get noisier, or bring more capability. That is the goal — not to make attacks impossible but to make them expensive enough that most attackers stop or make a detectable mistake.

Detection engineering is not a configuration task. It is an ongoing, adversarial process. Build the behavioral layer. Write rules from the invariant actions of techniques, not the artifacts of tools. Tune against your environment. Hunt with what the rules miss, and feed what you find back into the rules.

---

*loudmumble — security tools and adversary research*
