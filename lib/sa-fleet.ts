// AUTO-GENERATED from loopd fleet-map.portal.json (sanitized feed). Public-safe: names/taglines/status only.
export interface SANode { id:string; label:string; cat:string; tagline:string; status:string; planes:string[]; verdict:string|null; team:string|null; domain:string; }
export interface SAFleet { generated:string; stats:{nodes:number;product:number;control_plane:number;candidate:number;edges:number}; nodes:SANode[]; }

export const SA_FLEET: SAFleet = {
  "generated": "2026-06-24",
  "stats": {
    "nodes": 46,
    "product": 19,
    "control_plane": 25,
    "candidate": 13,
    "edges": 72
  },
  "nodes": [
    {
      "id": "hog",
      "label": "HOG",
      "cat": "offensive",
      "tagline": "AI-augmented C2 / pentest orchestration",
      "status": "Production Ready",
      "planes": [
        "product",
        "control-plane"
      ],
      "verdict": "pending",
      "team": "red",
      "domain": "offensive"
    },
    {
      "id": "marshald",
      "label": "Marshald",
      "cat": "orchestration",
      "tagline": "Fleet orchestration daemon",
      "status": "Production Ready",
      "planes": [
        "product",
        "control-plane"
      ],
      "verdict": "aligned",
      "team": "purple",
      "domain": "infrastructure"
    },
    {
      "id": "aegis",
      "label": "Aegis",
      "cat": "defensive",
      "tagline": "Agentic IDS via cadence analysis",
      "status": "Beta",
      "planes": [
        "product",
        "control-plane"
      ],
      "verdict": "pending",
      "team": "blue",
      "domain": "defensive"
    },
    {
      "id": "sentinel",
      "label": "Sentinel",
      "cat": "defensive",
      "tagline": "eBPF-based host security monitoring",
      "status": "Production Ready",
      "planes": [
        "product",
        "control-plane"
      ],
      "verdict": "pending",
      "team": "blue",
      "domain": "defensive"
    },
    {
      "id": "phantom",
      "label": "Phantom",
      "cat": "offensive",
      "tagline": "LLM-powered vulnerability discovery",
      "status": "Production Ready",
      "planes": [
        "product",
        "control-plane"
      ],
      "verdict": "pending",
      "team": "red",
      "domain": "offensive"
    },
    {
      "id": "malscope",
      "label": "Malscope",
      "cat": "defensive",
      "tagline": "AI-powered malware analysis sandbox",
      "status": "Production Ready",
      "planes": [
        "product",
        "control-plane"
      ],
      "verdict": "pending",
      "team": "blue",
      "domain": "defensive"
    },
    {
      "id": "syscalld",
      "label": "eBPF Sensors",
      "cat": "sensor",
      "tagline": "Shared kernel-level telemetry",
      "status": "Production Ready",
      "planes": [
        "product",
        "control-plane"
      ],
      "verdict": "n/a",
      "team": "blue",
      "domain": "infrastructure"
    },
    {
      "id": "de-voidlink",
      "label": "DE-VoidLink",
      "cat": "offensive",
      "tagline": "Local adversary simulation — detection engineering",
      "status": "Production Ready",
      "planes": [
        "product"
      ],
      "verdict": null,
      "team": "red",
      "domain": "offensive"
    },
    {
      "id": "burrow",
      "label": "Burrow",
      "cat": "offensive",
      "tagline": "Advanced network pivoting tool",
      "status": "Production Ready",
      "planes": [
        "product",
        "control-plane"
      ],
      "verdict": "in-progress",
      "team": "red",
      "domain": "offensive"
    },
    {
      "id": "feedback",
      "label": "Feedback",
      "cat": "offensive",
      "tagline": "Covert LLM output exfiltration",
      "status": "Production Ready",
      "planes": [
        "product"
      ],
      "verdict": null,
      "team": "red",
      "domain": "offensive"
    },
    {
      "id": "fester",
      "label": "Fester",
      "cat": "offensive",
      "tagline": "Targeted dataset poisoning engine",
      "status": "Production Ready",
      "planes": [
        "product"
      ],
      "verdict": null,
      "team": "red",
      "domain": "offensive"
    },
    {
      "id": "grip",
      "label": "Grip",
      "cat": "infra",
      "tagline": "Cross-platform encrypted file sync",
      "status": "Beta",
      "planes": [
        "product"
      ],
      "verdict": null,
      "team": null,
      "domain": "infrastructure"
    },
    {
      "id": "vibe",
      "label": "Vibe",
      "cat": "infra",
      "tagline": "AI-Powered Electron IDE — Fleet Loop-Execution Agent",
      "status": "Production Ready",
      "planes": [
        "product",
        "control-plane"
      ],
      "verdict": "aligned",
      "team": null,
      "domain": "infrastructure"
    },
    {
      "id": "mojodojo",
      "label": "Mojodojo",
      "cat": "aiml",
      "tagline": "AI model training & benchmarking",
      "status": "Production Ready",
      "planes": [
        "product"
      ],
      "verdict": null,
      "team": "purple",
      "domain": "infrastructure"
    },
    {
      "id": "lamprey",
      "label": "Lamprey",
      "cat": "offensive",
      "tagline": "Real-time network traffic analysis",
      "status": "Production Ready",
      "planes": [
        "product",
        "control-plane"
      ],
      "verdict": "pending",
      "team": "blue",
      "domain": "offensive"
    },
    {
      "id": "glass",
      "label": "Glass",
      "cat": "infra",
      "tagline": "Privacy suite — TLS fingerprinting",
      "status": "Beta",
      "planes": [
        "product"
      ],
      "verdict": null,
      "team": "blue",
      "domain": "infrastructure"
    },
    {
      "id": "dossier",
      "label": "Dossier",
      "cat": "offensive",
      "tagline": "AI-powered OSINT intelligence",
      "status": "Production Ready",
      "planes": [
        "product",
        "control-plane"
      ],
      "verdict": "pending",
      "team": "red",
      "domain": "offensive"
    },
    {
      "id": "fenrir",
      "label": "Fenrir",
      "cat": "offensive",
      "tagline": "BH CE v6 attack path scoring + engagement enrichment",
      "status": "Production Ready",
      "planes": [
        "product"
      ],
      "verdict": null,
      "team": "blue",
      "domain": "offensive"
    },
    {
      "id": "report-ng",
      "label": "Report-NG",
      "cat": "infra",
      "tagline": "Automated engagement report generation ← Sidekick",
      "status": "Beta",
      "planes": [
        "product"
      ],
      "verdict": null,
      "team": "blue",
      "domain": "infrastructure"
    },
    {
      "id": "darkwarden",
      "label": "darkwarden",
      "cat": "authority",
      "tagline": "Agent identity authority — sole credential minter + kill-switch",
      "status": "Live",
      "planes": [
        "control-plane"
      ],
      "verdict": "aligned",
      "team": null,
      "domain": "infrastructure"
    },
    {
      "id": "loopd",
      "label": "loopd",
      "cat": "authority",
      "tagline": "Fleet authority — declared truth + conformance verify",
      "status": "Live",
      "planes": [
        "control-plane"
      ],
      "verdict": null,
      "team": null,
      "domain": "infrastructure"
    },
    {
      "id": "sidekick",
      "label": "Sidekick",
      "cat": "agent",
      "tagline": "Pentest knowledge bus",
      "status": "Integrated",
      "planes": [
        "control-plane"
      ],
      "verdict": "aligned",
      "team": null,
      "domain": "infrastructure"
    },
    {
      "id": "athena",
      "label": "Athena",
      "cat": "agent",
      "tagline": "Wiki crawler & knowledge base agent",
      "status": "Integrated",
      "planes": [
        "control-plane"
      ],
      "verdict": "aligned",
      "team": null,
      "domain": "infrastructure"
    },
    {
      "id": "persistent-assistant",
      "label": "Persistent Assistant",
      "cat": "agent",
      "tagline": "Job-scraping daemon + CLI client agent",
      "status": "In Progress",
      "planes": [
        "control-plane"
      ],
      "verdict": "in-progress",
      "team": null,
      "domain": "infrastructure"
    },
    {
      "id": "command-center",
      "label": "Command Center",
      "cat": "surface",
      "tagline": "Portal + State API control surface",
      "status": "Integrated",
      "planes": [
        "control-plane"
      ],
      "verdict": "aligned",
      "team": null,
      "domain": "infrastructure"
    },
    {
      "id": "infragent-plugin",
      "label": "InfrAgent Plugin",
      "cat": "surface",
      "tagline": "Remote control-plane surface (mobile) — alongside Vibe",
      "status": "Integrated",
      "planes": [
        "control-plane"
      ],
      "verdict": "aligned",
      "team": null,
      "domain": "infrastructure"
    },
    {
      "id": "grimoire",
      "label": "Grimoire",
      "cat": "surface",
      "tagline": "Markdown notes app host (hosts InfrAgent plugin)",
      "status": "App Host",
      "planes": [
        "control-plane"
      ],
      "verdict": "n/a",
      "team": null,
      "domain": "infrastructure"
    },
    {
      "id": "pry",
      "label": "Pry",
      "cat": "agent",
      "tagline": "Web testing proxy + most-integrated tool agent",
      "status": "In Progress",
      "planes": [
        "control-plane"
      ],
      "verdict": "in-progress",
      "team": null,
      "domain": "infrastructure"
    },
    {
      "id": "wraith",
      "label": "WRAITH",
      "cat": "agent",
      "tagline": "AI testing C2 (original Hand-of-God)",
      "status": "In Progress",
      "planes": [
        "control-plane"
      ],
      "verdict": "in-progress",
      "team": "red",
      "domain": "infrastructure"
    },
    {
      "id": "trusted",
      "label": "Trusted",
      "cat": "agent",
      "tagline": "ADCS/PKI + cert-auth C2",
      "status": "In Progress",
      "planes": [
        "control-plane"
      ],
      "verdict": "in-progress",
      "team": "red",
      "domain": "infrastructure"
    },
    {
      "id": "purpsquad",
      "label": "PurpSquad",
      "cat": "agent",
      "tagline": "Purple-team simulator",
      "status": "Pending",
      "planes": [
        "control-plane"
      ],
      "verdict": "pending",
      "team": "purple",
      "domain": "infrastructure"
    },
    {
      "id": "scry",
      "label": "Scry",
      "cat": "agent",
      "tagline": "TLS/SSL assessment & divination",
      "status": "Pending",
      "planes": [
        "control-plane"
      ],
      "verdict": "pending",
      "team": "red",
      "domain": "infrastructure"
    },
    {
      "id": "crack-ng",
      "label": "crack-ng",
      "cat": "agent",
      "tagline": "Hash-cracking orchestrator (Rust)",
      "status": "Pending",
      "planes": [
        "control-plane"
      ],
      "verdict": "pending",
      "team": "red",
      "domain": "infrastructure"
    },
    {
      "id": "bjornagotchi",
      "label": "Bjornagotchi",
      "cat": "candidate",
      "tagline": "Agentified pwnagotchi/Bjorn RPi-zero redteam devices",
      "status": "Candidate",
      "planes": [
        "candidate"
      ],
      "verdict": null,
      "team": "red",
      "domain": "infrastructure"
    },
    {
      "id": "artemis",
      "label": "Artemis",
      "cat": "candidate",
      "tagline": "Dashboard/control plane for Bjornagotchi/pwnagotchi/Bjorn",
      "status": "Candidate",
      "planes": [
        "candidate"
      ],
      "verdict": null,
      "team": null,
      "domain": "infrastructure"
    },
    {
      "id": "mirage",
      "label": "Mirage",
      "cat": "candidate",
      "tagline": "Synthetic identity / deepfake engine",
      "status": "Candidate",
      "planes": [
        "candidate"
      ],
      "verdict": null,
      "team": "red",
      "domain": "infrastructure"
    },
    {
      "id": "cloudstrike",
      "label": "CloudStrike",
      "cat": "candidate",
      "tagline": "Cloud attack tooling",
      "status": "Candidate",
      "planes": [
        "candidate"
      ],
      "verdict": null,
      "team": "red",
      "domain": "infrastructure"
    },
    {
      "id": "set-ng",
      "label": "SET-NG",
      "cat": "candidate",
      "tagline": "Social engineering toolkit",
      "status": "Candidate",
      "planes": [
        "candidate"
      ],
      "verdict": null,
      "team": "red",
      "domain": "infrastructure"
    },
    {
      "id": "anvil",
      "label": "Anvil",
      "cat": "candidate",
      "tagline": "Payload build/obfuscation generator",
      "status": "Candidate",
      "planes": [
        "candidate"
      ],
      "verdict": null,
      "team": "red",
      "domain": "infrastructure"
    },
    {
      "id": "cve-db",
      "label": "CVE-DB",
      "cat": "candidate",
      "tagline": "Dynamic CVE data feed",
      "status": "Candidate",
      "planes": [
        "candidate"
      ],
      "verdict": null,
      "team": null,
      "domain": "infrastructure"
    },
    {
      "id": "pkgr",
      "label": "pkgr",
      "cat": "candidate",
      "tagline": "Package-manager supply-chain risk demo",
      "status": "Candidate",
      "planes": [
        "candidate"
      ],
      "verdict": null,
      "team": null,
      "domain": "infrastructure"
    },
    {
      "id": "i2p-utils",
      "label": "i2p-utils",
      "cat": "candidate",
      "tagline": "Drop-in I2P connection manager",
      "status": "Candidate",
      "planes": [
        "candidate"
      ],
      "verdict": null,
      "team": null,
      "domain": "infrastructure"
    },
    {
      "id": "clearbrite",
      "label": "ClearBrite",
      "cat": "candidate",
      "tagline": "Mobile/laptop sensitive-data extraction PoC",
      "status": "Candidate",
      "planes": [
        "candidate"
      ],
      "verdict": null,
      "team": null,
      "domain": "infrastructure"
    },
    {
      "id": "courier",
      "label": "Courier",
      "cat": "candidate",
      "tagline": "Phishing & email security",
      "status": "Candidate",
      "planes": [
        "candidate"
      ],
      "verdict": null,
      "team": "red",
      "domain": "infrastructure"
    },
    {
      "id": "prism",
      "label": "Prism",
      "cat": "candidate",
      "tagline": "Trading platform (monetization candidate)",
      "status": "Candidate",
      "planes": [
        "candidate"
      ],
      "verdict": null,
      "team": null,
      "domain": "infrastructure"
    },
    {
      "id": "undependent",
      "label": "undependent",
      "cat": "candidate",
      "tagline": "Vendoring helper (under review)",
      "status": "Candidate",
      "planes": [
        "candidate"
      ],
      "verdict": null,
      "team": null,
      "domain": "infrastructure"
    }
  ]
};

export const SA_TAGLINES = [
  "Let go and take control.",
  "The one-man red, blue, and purple team.",
  "Because we don't trust our agents — and you shouldn't either.",
  "It's not that it can't be done. It just hasn't been yet.",
  "A true force exponentiator."
];

export const SA_MARQUEE = ["AGENT-ASSISTED OPERATOR PLATFORM","OFFENSIVE · DEFENSIVE · INFRASTRUCTURE","CHANNEL-BOUND IDENTITY · mTLS EVERY HOP","DARKWARDEN-MINTED · REVOCABLE · KILL-SWITCH","GENERATED FROM REALITY, NOT HAND-MAINTAINED","LET GO AND TAKE CONTROL"];

export const SA_PILLARS = [
  {
    "n": "01",
    "title": "One operator, a coordinated swarm",
    "body": "Direct a fleet of security agents across offensive, defensive, and purple-team work. The marshal registers, discovers, and dispatches — you set intent, the swarm executes."
  },
  {
    "n": "02",
    "title": "Trust is proven, never assumed",
    "body": "Every agent answers to a single identity authority. Identity is the TLS peer certificate, minted and revocable — never self-asserted. The kill-switch is one command away."
  },
  {
    "n": "03",
    "title": "Emergent capability from a simple core",
    "body": "Modular, extensible, tailored — not bolted on, but emergent from a foundation kept deliberately simple. Add a piece and it composes."
  },
  {
    "n": "04",
    "title": "Aligned to reality, always",
    "body": "The map is generated from the fleet itself, not hand-maintained. What you see is what is — roster, edges, and conformance, regenerated on every change."
  }
];

export const SA_TRUST = [
  {
    "k": "Identity authority",
    "v": "darkwarden — sole credential minter, admission gate, deterministic kill-switch"
  },
  {
    "k": "Transport",
    "v": "mTLS on every hop, built on public mtls-core"
  },
  {
    "k": "Orchestration",
    "v": "marshald — registers + dispatches under channel-bound identity"
  },
  {
    "k": "Honesty",
    "v": "code-observed never claimed verified — facts are labelled as facts"
  }
];
