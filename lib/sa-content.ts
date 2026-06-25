// Hand-authored Structured Anarchy page copy (taglines, marquee, pillars, trust).
// The FLEET DATA is generated — see lib/sa-fleet.ts (built by scripts/gen-sa-fleet.js
// from the loopd derived feed). Keep prose here; keep facts there.

export const SA_TAGLINES = [
  "Let go and take control.",
  "The one-man red, blue, and purple team.",
  "Because we don't trust our agents — and you shouldn't either.",
  "It's not that it can't be done. It just hasn't been yet.",
  "A true force exponentiator.",
];

export const SA_MARQUEE = [
  "AGENT-ASSISTED OPERATOR PLATFORM",
  "OFFENSIVE · DEFENSIVE · INFRASTRUCTURE",
  "CHANNEL-BOUND IDENTITY · mTLS EVERY HOP",
  "DARKWARDEN-MINTED · REVOCABLE · KILL-SWITCH",
  "GENERATED FROM REALITY, NOT HAND-MAINTAINED",
  "LET GO AND TAKE CONTROL",
];

export const SA_PILLARS = [
  {
    n: "01",
    title: "One operator, a coordinated swarm",
    body: "Direct a fleet of security agents across offensive, defensive, and purple-team work. The marshal registers, discovers, and dispatches — you set intent, the swarm executes.",
  },
  {
    n: "02",
    title: "Trust is proven, never assumed",
    body: "Every agent answers to a single identity authority. Identity is the TLS peer certificate, minted and revocable — never self-asserted. The kill-switch is one command away.",
  },
  {
    n: "03",
    title: "Emergent capability from a simple core",
    body: "Modular, extensible, tailored — not bolted on, but emergent from a foundation kept deliberately simple. Add a piece and it composes.",
  },
  {
    n: "04",
    title: "Aligned to reality, always",
    body: "The map is generated from the fleet itself, not hand-maintained. What you see is what is — roster, edges, and code-derived facts, regenerated on every change.",
  },
];

export const SA_TRUST = [
  {
    k: "Identity authority",
    v: "darkwarden — sole credential minter, admission gate, deterministic kill-switch",
  },
  {
    k: "Transport",
    v: "mTLS on every hop, built on public mtls-core",
  },
  {
    k: "Orchestration",
    v: "marshald — registers + dispatches under channel-bound identity",
  },
  {
    k: "Honesty",
    v: "What the platform observes in code is labelled 'observed' — never inflated to 'verified working.' Claims stay claims; facts stay facts.",
  },
];
