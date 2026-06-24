// Single source of truth for portfolio content, shared across all site variations.
// Extracted verbatim from the original section components so every variation
// renders identical substance — only the design/UX differs.

export interface Project {
  name: string;
  description: string;
  tech: string[];
  status: 'stable' | 'alpha' | 'development';
  wave?: 1 | 2 | 3;
  github?: string;
}

export interface Service {
  title: string;
  description: string;
  tag: string;
  tagValue: string;
}

export interface SkillCategory {
  name: string;
  accent: string; // hex accent for variations that want per-category color
  skills: { name: string; level: number; max: number }[];
}

export interface ContactMethod {
  label: string;
  value: string;
  href: string;
  kind: 'email' | 'link';
}

export const identity = {
  handle: 'loudmumble',
  // A person, not a product. Role-first so the handle never reads as a brand name.
  role: 'Offensive Security Engineer · Red-Team Tooling Developer',
  // Hero line. A deliberate inversion of "don't reinvent the wheel" — the whole
  // thesis: in this domain, the bespoke offensive tool is worth building yourself.
  tagline: 'This wheel is worth inventing.',
  blurb:
    'Offensive security engineer and red-team operator. Over two years I built an integrated toolkit of 40+ purpose-built units — C2 orchestration, multi-transport pivoting, ADCS exploitation, behavioral detection, PCAP credential harvesting, and agentic attack-chain automation — solo, single-binary, no Docker. HTB global rank #902, Top 1% Academy. Available for senior red-team roles and consulting engagements.',
  location: 'remote / encrypted',
  status: 'open to opportunities',
  version: 'v4.2.1',
};

// The flagship is a named PROJECT — distinct from the handle above, so the site
// never conflates "loudmumble the operator" with "the platform he built."
export const flagship = {
  name: 'Structured Anarchy',
  kind: 'Agentic Operator Platform',
  blurb:
    'My flagship: an agentic operator platform that lets one person direct a coordinated swarm across offensive, defensive, and purple-team work. 40+ integrated units, channel-bound identity, a single kill-switch. Built solo.',
  metric: '40+ units',
  status: 'Private RC',
};

// Shared across the loudmumble/example through-line — the same line closes
// example.com; here it lives in the status bar. Same person, same ethos.
export const ethos =
  "It's not a deficit of attention, it's an abundance of curiosity.";

export const expertise: string[] = [
  'Autonomous red team platform: C2 orchestration, agentic attack chains, full engagement pipeline',
  'Network pivoting & tunneling: multi-transport (TCP/WS/DNS/ICMP), TUN/TAP, SOCKS, relay chains',
  'ADCS/PKI exploitation: ESC1–14, shadow credentials, golden cert forging, cert-auth C2',
  'Active Directory: Kerberoasting, DACL abuse, forest trust exploitation, BloodHound-driven paths',
  'Detection engineering: eBPF behavioral IDS, PCAP credential detection, YARA/Sigma/Suricata',
  'AI/LLM red teaming: prompt injection, jailbreaking, adversarial input, supply chain attacks',
];

export const workstreams: string[] = [
  'Integrated offensive platforms',
  'Post-exploitation infrastructure',
  'ADCS / PKI attack tooling',
  'Agentic attack automation',
  'Detection engineering',
];

export const currentResearch =
  'Agentic attack orchestration: marshaling autonomous AI loops against live targets with human-out-of-the-loop execution, gated by cryptographic identity and kill-switch authority.';

export const services: Service[] = [
  {
    title: 'Penetration Testing',
    description:
      'Full-scope security assessments following OWASP/PTES methodology. Web apps, APIs, internal networks, cloud infrastructure. Deliverables include executive summary, technical findings with PoC, and prioritized remediation guidance.',
    tag: 'METHODOLOGIES',
    tagValue: 'BLACK / GREY / WHITE BOX',
  },
  {
    title: 'Active Directory Assessments',
    description:
      'Attack path analysis through AD environments: Kerberoasting, AS-REP roasting, DACL abuse, GPO exploitation, forest trust attacks. BloodHound-driven analysis with manual validation of every escalation route.',
    tag: 'TOOLING',
    tagValue: 'BLOODHOUND / IMPACKET / CRACKMAPEXEC',
  },
  {
    title: 'Vulnerability Research',
    description:
      'Zero-day hunting in self-hosted and open-source software. Manual code review, fuzzing, auth bypass analysis. Responsible disclosure with Nuclei template development for regression testing.',
    tag: 'TARGETS',
    tagValue: 'SELF-HOSTED OSS / WEB APPS',
  },
  {
    title: 'Security Tooling',
    description:
      'Custom framework development for offensive operations. Automation pipelines, C2 integration, API security testing harnesses. Python, Go, TypeScript, Bash. Whatever the job needs.',
    tag: 'STACK',
    tagValue: 'PYTHON / GO / TS / BASH',
  },
];

// Sourced from github.com/loudmumble — public, non-fork repos only, ordered by
// most recently pushed. Descriptions are the repos' own GitHub descriptions;
// tech reflects each repo's actual primary languages. Private repos are
// intentionally excluded.
export const projects: Project[] = [
  {
    name: 'hog',
    description:
      'C2 orchestration platform. Unified session management across Sliver, Havoc, Empire, and Metasploit — single TUI, single binary, embedded React web UI via go:embed. Real-time Sentinel alert correlation maps host-level events to active C2 sessions. MCP server for AI agent integration, marshald dispatch for autonomous attack chains, JWT auth, SSE feeds, PostgreSQL persistence. The orchestration layer for the full platform.',
    tech: ['Go', 'React', 'TypeScript', 'PostgreSQL'],
    status: 'stable',
    github: 'https://github.com/loudmumble/hog',
  },
  {
    name: 'burrow',
    description:
      'Post-exploitation pivot framework combining Raw TCP, WebSocket, DNS, and ICMP transports in one static binary. Userspace TUN/TAP, SOCKS5, port forwarding, bidirectional relay, subnet scanner, file transfer, and in-place payload upgrade. Profile-based deployment deploys a full relay stack in under 30 seconds. Functional equivalent of ligolo-ng + chisel + pivotnacci + dnscat2 + socat — one binary, zero dependencies.',
    tech: ['Go'],
    status: 'stable',
    github: 'https://github.com/loudmumble/burrow',
  },
  {
    name: 'trusted',
    description:
      'ADCS/PKI attack framework with full ESC1–14 enumeration and exploitation automation. Shadow credentials, golden certificate forging, Kerberos/NTLM/cert-based authentication exploitation. Pure Go, CGO-free static binary. The ESC coverage is complete — every misconfiguration Certipy finds, trusted exploits.',
    tech: ['Go'],
    status: 'stable',
    github: 'https://github.com/loudmumble/trusted',
  },
  {
    name: 'sentinel',
    description:
      'Host security monitor with C2 correlation output. Configurable scoring engine POSTs high-score events to HOG /sentinel/event for real-time session correlation — maps host alerts to active C2 implants automatically. MCP server included for AI agent integration.',
    tech: ['Go'],
    status: 'stable',
    github: 'https://github.com/loudmumble/sentinel',
  },
  {
    name: 'lamprey',
    description:
      'Network forensics and credential detection engine. Live interface capture (no libpcap), PCAP parsing, protocol anomaly detection, credential harvesting from network traffic. 171 tests. Static binary with MCP server for fleet integration.',
    tech: ['Go'],
    status: 'stable',
    github: 'https://github.com/loudmumble/lamprey',
  },
  {
    name: 'aegis',
    description:
      'Behavioral IDS consuming eBPF/syscall sensor data. Flags LLM-driven attacks by network cadence — inter-arrival-time fingerprinting, model profiling, rule engine. Catches autonomous agents by behavioral signature, not payload.',
    tech: ['Go'],
    status: 'development',
    github: 'https://github.com/loudmumble/aegis',
  },
  {
    name: 'syscalld',
    description:
      'Pure-Go (CGO-free) kernel sensor: syscall tracing, process/file/network/DNS visibility via /proc and eBPF. Embeddable library consumed by aegis and lamprey. Live TUI included.',
    tech: ['Go'],
    status: 'stable',
    github: 'https://github.com/loudmumble/syscalld',
  },
  {
    name: 'mtls-core',
    description:
      'Drop-in mutual TLS 1.3 foundation for Go services: private CA, per-service cert issuance, channel-bound peer identity via peer certificate (not bearer tokens). Standard library only, no CGO. Powers the identity layer across the entire fleet.',
    tech: ['Go'],
    status: 'stable',
    github: 'https://github.com/loudmumble/mtls-core',
  },
  {
    name: 'pry',
    description:
      'Intercepting web proxy with AI-assisted bug discovery. HTTP/HTTPS interception, request manipulation, automated fuzzing, session handling. Zero-false-positive proof generation for autonomous web app security testing.',
    tech: ['Go', 'React', 'TypeScript'],
    status: 'development',
    github: 'https://github.com/loudmumble/pry',
  },
  {
    name: 'de-voidlink',
    description:
      'Adversary simulation framework replicating published malware syscall and C2 fingerprints for detection engineering. Published 11 YARA rules, 7 Sigma rules, and Suricata signatures from replicated threat intelligence. No functional malware payloads.',
    tech: ['Zig', 'Go', 'C', 'YARA'],
    status: 'development',
    github: 'https://github.com/loudmumble/de-voidlink',
  },
  {
    name: 'crack-ng',
    description:
      'Hash-cracking orchestrator: auto-detects hash type and GPU, dispatches to Hashcat or John the Ripper, ratatui TUI. Built in Rust.',
    tech: ['Rust'],
    status: 'stable',
    github: 'https://github.com/loudmumble/crack-ng',
  },
  {
    name: 'grimoire',
    description:
      'Local-first Obsidian-style markdown knowledge base — Electron + React + Milkdown. Plain .md files on disk, no cloud, no database, agentic integrations with self-hosted models. Built for operators who want their notes offline and private.',
    tech: ['TypeScript', 'React', 'Electron', 'Rust'],
    status: 'stable',
    github: 'https://github.com/loudmumble/grimoire',
  },
  {
    name: '00_oneoffs',
    description:
      'Standalone offensive-security scripts and operator utilities — credential tooling, recon helpers, hash manipulation, engagement one-liners.',
    tech: ['Bash', 'Python', 'PowerShell'],
    status: 'stable',
    github: 'https://github.com/loudmumble/00_oneoffs',
  },
];

// Categories ordered as a narrative: what I do -> how I build it -> what I use
// -> where I run it. Within each category, skills are sorted by level so the
// progress bars form a clean descending staircase. Levels are a deliberately
// conservative self-assessment, kept in lockstep with the proficiency numbers on
// example.com so the same person reads the same way across both sites.
export const skillCategories: SkillCategory[] = [
  {
    name: 'OFFENSIVE SECURITY',
    accent: '#ff4d4d',
    skills: [
      { name: 'OSINT / Recon', level: 9, max: 10 },
      { name: 'Active Directory', level: 8, max: 10 },
      { name: 'Network Penetration', level: 8, max: 10 },
      { name: 'Web App Security', level: 8, max: 10 },
      { name: 'ADCS / PKI', level: 8, max: 10 },
      { name: 'AI / LLM Red Teaming', level: 7, max: 10 },
      { name: 'Binary Exploitation', level: 6, max: 10 },
    ],
  },
  {
    name: 'DEVELOPMENT',
    accent: '#d4ff3f',
    skills: [
      { name: 'Bash / Shell', level: 8, max: 10 },
      { name: 'Go', level: 8, max: 10 },
      { name: 'Python', level: 8, max: 10 },
      { name: 'PowerShell', level: 7, max: 10 },
      { name: 'C / C++', level: 7, max: 10 },
      { name: 'Rust', level: 6, max: 10 },
      { name: 'TypeScript', level: 5, max: 10 },
      { name: 'Zig', level: 4, max: 10 },
    ],
  },
  {
    name: 'TOOLS & FRAMEWORKS',
    accent: '#ffd11a',
    skills: [
      { name: 'Nmap / Masscan', level: 9, max: 10 },
      { name: 'Metasploit', level: 8, max: 10 },
      { name: 'Burp Suite', level: 8, max: 10 },
      { name: 'Impacket / CME', level: 8, max: 10 },
      { name: 'BloodHound', level: 8, max: 10 },
      { name: 'Nuclei', level: 7, max: 10 },
      { name: 'YARA / Sigma / Suricata', level: 7, max: 10 },
      { name: 'Ghidra / RE', level: 6, max: 10 },
    ],
  },
  {
    name: 'INFRASTRUCTURE',
    accent: '#3399ff',
    skills: [
      { name: 'Linux / Unix', level: 9, max: 10 },
      { name: 'Networking / VLANs', level: 8, max: 10 },
      { name: 'Windows Server / AD', level: 8, max: 10 },
      { name: 'Proxmox / KVM', level: 8, max: 10 },
      { name: 'Docker / Containers', level: 8, max: 10 },
      { name: 'eBPF', level: 5, max: 10 },
      { name: 'Cloud (Azure/AWS)', level: 6, max: 10 },
    ],
  },
];

// Mirrors the cert/training record on example.com, curated to the
// security-relevant subset (Microsoft fundamentals live on the professional
// site). "earned" = passed exams; "training" = completed coursework/labs, which
// is stated as such and never as a held certification.
export const certs = {
  earned: ['PJPT'],
  inProgress: ['PNPT', 'BSCP'],
  training: [
    'HTB CPTS',
    'HTB CWES',
    'HTB AI Red Teamer (in progress)',
    'THM Red Team Path',
  ],
};

export const contactMethods: ContactMethod[] = [
  {
    label: 'EMAIL',
    value: 'contact@loudmumble.com',
    href: 'mailto:contact@loudmumble.com',
    kind: 'email',
  },
  {
    label: 'GITHUB',
    value: 'github.com/loudmumble',
    href: 'https://github.com/loudmumble',
    kind: 'link',
  },
];

// Aggregate stats used by hero/dashboard layouts. Derived from real repo data.
export const primaryLanguages = ['Go', 'TypeScript', 'Rust', 'C', 'Python', 'Zig'];

export const stats = {
  publicRepos: projects.length,
  languages: primaryLanguages.length,
};

export const proofPoints = [
  { label: 'HTB Global Rank', value: '#902', note: 'top 1,000 worldwide — verifiable' },
  { label: 'HTB Academy', value: 'Top 1%', note: '490+ targets · CPTS + CWES complete' },
  { label: 'TryHackMe', value: 'Top 4%', note: 'ADversary-badged · Red Team path complete' },
  { label: 'Platform scale', value: '12+ tools', note: 'integrated, production-ready, single-binary each' },
];
