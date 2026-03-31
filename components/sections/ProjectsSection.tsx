import { useState } from 'react';
import { TerminalLine, TerminalDivider } from '../terminal/TerminalLine';
import { Folder, GitBranch, ExternalLink } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  tech: string[];
  status: 'stable' | 'alpha' | 'development';
  wave?: 1 | 2 | 3;
  github?: string;
}

const projects: Project[] = [
  {
    name: 'de-voidlink',
    description: 'True-to-form VoidLink adversary simulation framework for detection engineering research. Zig beacon with direct syscall fingerprinting, Go C2 server with AES-256-GCM encryption and 5 HTTP camouflage modes, C arsenal plugins. Published 11 YARA, 7 Sigma, and Suricata detection rules. Built to validate Aegis IDS.',
    tech: ['Zig', 'Go', 'C', 'YARA', 'Sigma', 'Suricata'],
    status: 'stable',
    wave: 1,
    github: 'https://github.com/loudmumble/de-voidlink',
  },
  {
    name: 'aegis',
    description: 'Behavioral IDS for agentic AI attacks. Detects LLM-driven threats via cadence analysis and inter-arrival time fingerprinting. 9 known LLM model profiles, human-to-agent transition detection, 9 detection rules (AEGIS-001 to AEGIS-009), MCP server, web dashboard. Static Go binary.',
    tech: ['Go', 'Ollama', 'MCP', 'PCAP'],
    status: 'stable',
    wave: 1,
    github: 'https://github.com/loudmumble/aegis',
  },
  {
    name: 'syscalld',
    description: '7 kernel sensors for Linux security monitoring: syscall, process, filesystem, network, memory, module, DNS. Pure Go library with /proc fallback mode. Consumed by Sentinel and Aegis. Guest VM agent for sandbox monitoring. 215 tests passing.',
    tech: ['Go', 'eBPF', 'cilium/ebpf'],
    status: 'stable',
    wave: 1,
    github: 'https://github.com/loudmumble/syscalld',
  },
  {
    name: 'sentinel',
    description: 'Security monitoring toolkit built on syscalld. Heuristic analysis engine with 6 detection rules, behavioral correlation with 5-second sliding window, LLM-powered triage via Ollama, MCP server, web dashboard. 159 tests passing.',
    tech: ['Go', 'Ollama', 'MCP', 'inotify'],
    status: 'stable',
    wave: 1,
    github: 'https://github.com/loudmumble/sentinel',
  },
  {
    name: 'crack-ng',
    description: 'Hash-cracking orchestrator wrapping Hashcat and John the Ripper. Auto-identifies 20 hash types, GPU/CPU engine selection, cascade attack mode, session persistence, CSV/JSON export. TUI with 5 tabs built on ratatui.',
    tech: ['Rust', 'ratatui', 'tokio', 'serde'],
    status: 'stable',
    wave: 1,
    github: 'https://github.com/loudmumble/crack-ng',
  },
  {
    name: 'phantom',
    description: 'LLM-powered vulnerability discovery engine. Multi-language AST parsing via tree-sitter, 4-phase scan pipeline (Parse > Surface Map > LLM Analysis > Report), wave-based scanning with configurable limits. 167 tests passing.',
    tech: ['Python', 'Ollama', 'tree-sitter', 'Click', 'Rich'],
    status: 'stable',
    wave: 2,
    github: 'https://github.com/loudmumble/phantom',
  },
  {
    name: 'burrow',
    description: 'Post-exploitation network pivoting tool. 5 transports (Raw TCP/TLS, WebSocket, DNS, ICMP, HTTP), TUN transparent routing via gvisor netstack, multi-hop pivot chains, SOCKS5/HTTP proxy, webshell generation. Cross-compiled for 5 platforms.',
    tech: ['Go', 'WebSocket', 'gvisor', 'SOCKS5', 'ChaCha20-Poly1305'],
    status: 'stable',
    wave: 1,
    github: 'https://github.com/loudmumble/burrow',
  },
  {
    name: 'certstrike',
    description: 'ADCS exploitation framework covering ESC1-14 with dedicated Scan/Exploit functions for every ESC type. Shadow credentials, golden certificate forging, auto-pwn orchestration, cert-auth C2 with file delivery and deploy. SmartPotato privilege escalation implant. MCP server, TUI console.',
    tech: ['Go', 'LDAP', 'X.509', 'Kerberos', 'MCP'],
    status: 'stable',
    wave: 1,
    github: 'https://github.com/loudmumble/certstrike',
  },
  {
    name: 'dossier',
    description: 'AI-powered OSINT intelligence platform. Identity resolution, infrastructure mapping, breach correlation, social graph analysis. Agentic correlator with 5 recon modules. 467 tests passing.',
    tech: ['Python', 'FastAPI', 'Ollama', 'Neo4j', 'Redis'],
    status: 'stable',
    wave: 2,
    github: 'https://github.com/loudmumble/dossier',
  },
  {
    name: 'malscope',
    description: 'Malware analysis sandbox for agentic threats. Static analysis (entropy, strings, PE imports, YARA), LLM-driven triage with MITRE ATT&CK mapping, FastAPI web UI with drag-drop upload. 183 tests passing.',
    tech: ['Python', 'FastAPI', 'Ollama', 'YARA', 'pefile'],
    status: 'stable',
    wave: 3,
    github: 'https://github.com/loudmumble/malscope',
  },
  {
    name: 'lamprey',
    description: 'Real-time network traffic analysis and interception companion. Packet capture, protocol dissection, live traffic monitoring with scapy. MCP server for AI-assisted analysis. 136 tests passing.',
    tech: ['Python', 'scapy', 'Click', 'Rich', 'MCP'],
    status: 'stable',
    wave: 2,
    github: 'https://github.com/loudmumble/lamprey',
  },
  {
    name: 'aisec',
    description: 'AI security testing toolkit. 154 payloads across 17 categories: prompt injection, jailbreaking, agent hijacking, data exfiltration. Supports Ollama, OpenAI, and Anthropic connectors. 55 tests passing.',
    tech: ['Python', 'Ollama', 'OpenAI', 'Anthropic'],
    status: 'stable',
    wave: 2,
    github: 'https://github.com/loudmumble/aisec',
  },
  {
    name: '00_oneoffs',
    description: 'Collection of standalone security scripts and pentest utilities. Toolkit deployment, credential tools (NTLM spray, cached cred decryption, Snefru cracking), reconnaissance (Sonar subdomain enum, ping sweep, nmap wrappers), buffer overflow tooling.',
    tech: ['Bash', 'Python', 'PowerShell'],
    status: 'stable',
    wave: 1,
    github: 'https://github.com/loudmumble/00_oneoffs',
  },
  {
    name: 'hog',
    description: 'Hand of God -- Modular security testing & C2 framework. 27 phases, Burp Suite parity proxy, AI Red Team suite, 1,769 atomic tests. Operator-driven workflow unifying recon through reporting. Private repo, available on request.',
    tech: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Socket.IO'],
    status: 'alpha',
  },
];

const statusConfig = {
  stable: { label: 'STABLE', color: 'text-terminal-green', bg: 'bg-terminal-green/10' },
  alpha: { label: 'ALPHA', color: 'text-terminal-yellow', bg: 'bg-yellow-500/10' },
  development: { label: 'DEV', color: 'text-terminal-cyan', bg: 'bg-cyan-500/10' },
};

const waveConfig: Record<1 | 2 | 3, { label: string; color: string }> = {
  1: { label: '[LIVE]', color: 'text-terminal-green' },
  2: { label: '[WAVE-2]', color: 'text-terminal-yellow' },
  3: { label: '[WAVE-3]', color: 'text-terminal-yellow' },
};

export const ProjectsSection = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <div className="fade-in-up">
      <TerminalLine prefix="CMD" prefixColor="cyan">
        tree ./projects/ --show-status
      </TerminalLine>

      <TerminalDivider />

      <div className="space-y-3 stagger-children">
        {/* Tree structure header */}
        <div className="text-xs text-muted-foreground font-mono">
          <span className="text-terminal-blue">projects/</span>
        </div>

        {projects.map((project, index) => {
          const isLast = index === projects.length - 1;
          const isExpanded = expandedProject === project.name;
          const status = statusConfig[project.status];
          const wave = project.wave !== undefined ? waveConfig[project.wave] : null;

          return (
            <div key={project.name} className="font-mono">
              {/* Tree branch */}
              <button
                onClick={() => setExpandedProject(isExpanded ? null : project.name)}
                className="w-full text-left group"
              >
                <div className="flex items-center gap-2 py-1 px-2 -mx-2 rounded hover:bg-primary/5 transition-colors">
                  <span className="text-muted-foreground/50">
                    {isLast ? '└──' : '├──'}
                  </span>
                  <Folder className="w-4 h-4 text-terminal-yellow" />
                  <span className="text-terminal-cyan font-bold group-hover:text-primary transition-colors">
                    {project.name}/
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${status.bg} ${status.color} font-bold`}>
                    {status.label}
                  </span>
                  {wave && (
                    <span className={`font-mono text-xs font-bold ${wave.color}`}>
                      {wave.label}
                    </span>
                  )}
                  <span className="text-muted-foreground/50 ml-auto text-xs">
                    {isExpanded ? '[-]' : '[+]'}
                  </span>
                </div>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="ml-8 mt-2 mb-4 space-y-3 animate-fade-in">
                  <div className="flex items-start gap-2 text-xs">
                    <span className="text-muted-foreground/50">│   ├──</span>
                    <span className="text-muted-foreground">README.md</span>
                  </div>

                  <div className="ml-8 p-3 bg-muted/30 border border-border rounded text-sm">
                    <p className="text-foreground/80 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-8 text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <GitBranch className="w-3 h-3" />
                      <span>main</span>
                    </div>
                    {project.github && project.wave === 1 && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-terminal-cyan hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>source</span>
                      </a>
                    )}
                    {project.github && project.wave !== undefined && project.wave > 1 && (
                      <span
                        className="flex items-center gap-1 text-muted-foreground/30 font-mono cursor-not-allowed"
                        title="launching soon"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>launching soon</span>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <TerminalDivider />

      <div className="text-xs text-muted-foreground">
        <span className="text-terminal-green">{projects.length}/43</span> projects indexed.
        <span className="text-terminal-yellow ml-2">2,700+ tests across all repos.</span>
        {' '}Click to expand details.
      </div>

      <div className="mt-3 text-xs text-muted-foreground/50 font-mono">
        try: <span className="text-primary/60">contact</span>
      </div>
    </div>
  );
};
