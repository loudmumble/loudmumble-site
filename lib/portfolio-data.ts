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
  tagline: 'Security tools and adversary research.',
  blurb:
    'Offensive security: network and AD pentesting, vulnerability research, detection engineering. The tools below are what came out of that work.',
  location: 'remote / encrypted',
  status: 'available for engagements',
  version: 'v4.2.0',
};

export const expertise: string[] = [
  'Network & web app penetration testing: OWASP/PTES methodology, manual exploitation',
  'Active Directory attack paths: Kerberoasting, DACL abuse, forest trust exploitation',
  'Infrastructure hardening: Linux/Windows, firewall audits, segmentation validation',
  'Security tooling: custom frameworks, automation pipelines, CI/CD security integration',
];

export const workstreams: string[] = [
  'Building offensive security frameworks',
  'AD attack automation',
  'CVE research in self-hosted OSS',
];

export const currentResearch =
  'Agentic threat detection: catching LLM-driven attacks through behavioral analysis and cadence fingerprinting.';

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
    name: 'burrow',
    description:
      'Multi-transport network pivoting and tunneling tool for post-exploitation network traversal.',
    tech: ['Go', 'C', 'Python'],
    status: 'stable',
    github: 'https://github.com/loudmumble/burrow',
  },
  {
    name: 'grimoire',
    description:
      'Local-first Obsidian-style markdown knowledge base with Electron, React, and Milkdown.',
    tech: ['TypeScript', 'React', 'Electron', 'Rust'],
    status: 'stable',
    github: 'https://github.com/loudmumble/grimoire',
  },
  {
    name: 'vibe',
    description:
      'Electron IDE for security engineering, binary exploitation, and AI-assisted development.',
    tech: ['TypeScript', 'React', 'Electron', 'Rust'],
    status: 'stable',
    github: 'https://github.com/loudmumble/vibe',
  },
  {
    name: 'trusted',
    description:
      'ADCS exploitation and PKI attack framework with integrated cert-auth C2.',
    tech: ['Go', 'Shell'],
    status: 'stable',
    github: 'https://github.com/loudmumble/trusted',
  },
  {
    name: 'pry',
    description:
      'Web testing proxy with HTTP/HTTPS interception, fuzzing, and AI agent integration.',
    tech: ['Go', 'TypeScript'],
    status: 'stable',
    github: 'https://github.com/loudmumble/pry',
  },
  {
    name: 'syscalld',
    description:
      'Unified kernel sensor framework for Linux security monitoring via /proc tracing.',
    tech: ['C', 'Go'],
    status: 'stable',
    github: 'https://github.com/loudmumble/syscalld',
  },
  {
    name: 'sentinel',
    description:
      'Security monitoring toolkit for Linux with /proc fallback and optional LLM analysis.',
    tech: ['Go'],
    status: 'stable',
    github: 'https://github.com/loudmumble/sentinel',
  },
  {
    name: 'lamprey',
    description:
      'Real-time network traffic analysis and IDS for live interfaces and PCAP files.',
    tech: ['Go', 'TypeScript'],
    status: 'stable',
    github: 'https://github.com/loudmumble/lamprey',
  },
  {
    name: 'crack-ng',
    description:
      'Intelligent hash-cracking orchestrator wrapping Hashcat and John the Ripper.',
    tech: ['Rust', 'Shell'],
    status: 'stable',
    github: 'https://github.com/loudmumble/crack-ng',
  },
  {
    name: 'aegis',
    description:
      'Behavioral intrusion detection system for AI-driven traffic using cadence analysis.',
    tech: ['Go'],
    status: 'stable',
    github: 'https://github.com/loudmumble/aegis',
  },
  {
    name: 'de-voidlink',
    description:
      'Adversary-simulation framework for detection-engineering research: Zig beacon, Go C2, and published YARA/Sigma/Suricata rules.',
    tech: ['Zig', 'Go', 'C', 'YARA'],
    status: 'stable',
    github: 'https://github.com/loudmumble/de-voidlink',
  },
  {
    name: '00_oneoffs',
    description:
      'Collection of standalone security scripts and pentest utilities — credential tooling, recon, and exploit helpers.',
    tech: ['Bash', 'Python', 'PowerShell'],
    status: 'stable',
    github: 'https://github.com/loudmumble/00_oneoffs',
  },
];

// Categories ordered as a narrative: what I do -> how I build it -> what I use
// -> where I run it. Within each category, skills are sorted by level so the
// progress bars form a clean descending staircase. Levels are calibrated against
// demonstrated work across the public repos on github.com/loudmumble.
export const skillCategories: SkillCategory[] = [
  {
    name: 'OFFENSIVE SECURITY',
    accent: '#ff4d4d',
    skills: [
      { name: 'OSINT / Recon', level: 9, max: 10 },
      { name: 'Active Directory', level: 9, max: 10 },
      { name: 'Network Penetration', level: 9, max: 10 },
      { name: 'Privilege Escalation', level: 9, max: 10 },
      { name: 'Web App Security', level: 8, max: 10 },
    ],
  },
  {
    name: 'DEVELOPMENT',
    accent: '#33ff99',
    skills: [
      { name: 'Go', level: 9, max: 10 },
      { name: 'Python', level: 9, max: 10 },
      { name: 'Bash / Shell', level: 8, max: 10 },
      { name: 'TypeScript', level: 8, max: 10 },
      { name: 'C / C++', level: 8, max: 10 },
      { name: 'Rust', level: 7, max: 10 },
      { name: 'Zig', level: 6, max: 10 },
      { name: 'eBPF', level: 6, max: 10 },
    ],
  },
  {
    name: 'TOOLS & FRAMEWORKS',
    accent: '#ffd11a',
    skills: [
      { name: 'Nmap / Masscan', level: 9, max: 10 },
      { name: 'Burp Suite', level: 9, max: 10 },
      { name: 'BloodHound', level: 9, max: 10 },
      { name: 'Impacket / CME', level: 9, max: 10 },
      { name: 'Metasploit', level: 9, max: 10 },
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
      { name: 'Networking / VLANs', level: 9, max: 10 },
      { name: 'Windows Server / AD', level: 9, max: 10 },
      { name: 'Docker / Containers', level: 8, max: 10 },
      { name: 'Cloud (Azure/AWS)', level: 7, max: 10 },
    ],
  },
];

export const certs = {
  pursuing: ['OSCP', 'PNPT', 'BSCP'],
  activeStudy: ['HTB Academy', 'PortSwigger Web Security'],
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
