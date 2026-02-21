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
    description: 'True-to-form VoidLink adversary simulation framework for detection engineering research. Zig beacon with direct syscall fingerprinting, Go C2 server with AES-256-GCM encryption and 5 HTTP camouflage modes, C arsenal plugins. Published 10 YARA, 7 Sigma, and Suricata detection rules. Built to validate Aegis IDS.',
    tech: ['Zig', 'Go', 'C', 'YARA', 'Sigma', 'Suricata'],
    status: 'stable',
    wave: 1,
    github: 'https://github.com/loudmumble/de-voidlink',
  },
  {
    name: 'aegis',
    description: 'Behavioral IDS for agentic AI attacks. Detects LLM-driven threats via cadence analysis and inter-arrival time fingerprinting. Network flow tracking, 9 known LLM model profiles, human-to-agent transition detection, 7 detection rules (AEGIS-001 to AEGIS-007). 125 tests passing.',
    tech: ['Python', 'eBPF', 'NumPy', 'scapy', 'Ollama'],
    status: 'stable',
    wave: 1,
    github: 'https://github.com/loudmumble/aegis',
  },
  {
    name: 'ebpf-sensors',
    description: '7 eBPF kernel sensors providing process, network, file, and syscall telemetry. Shared framework consumed by Sentinel, Malscope, and Aegis. Guest VM agent for sandbox monitoring. 290 tests passing.',
    tech: ['Python', 'eBPF', 'BCC', 'libbpf'],
    status: 'stable',
    wave: 1,
    github: 'https://github.com/loudmumble/ebpf-sensors',
  },
  {
    name: 'phantom',
    description: 'LLM-powered vulnerability discovery engine. Multi-language AST parsing via tree-sitter, 4-phase scan pipeline (Parse > Surface Map > LLM Analysis > Report), wave-based scanning with configurable limits. 117 tests passing.',
    tech: ['Python', 'Ollama', 'tree-sitter', 'Click', 'Rich'],
    status: 'stable',
    wave: 2,
    github: 'https://github.com/loudmumble/phantom',
  },
  {
    name: 'burrow',
    description: 'Post-exploitation network pivoting tool. Multi-transport: Raw TCP/TLS, WebSocket, DNS tunnel, ICMP tunnel. Socat-style relay, SOCKS5 session routing. Cross-compiled for 5 platforms. 168 tests, 15 packages.',
    tech: ['Go', 'WebSocket', 'gvisor', 'SOCKS5', 'ChaCha20-Poly1305'],
    status: 'stable',
    wave: 3,
    github: 'https://github.com/loudmumble/burrow',
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
    description: 'Agentic malware analysis sandbox. Static analysis (entropy, strings, PE imports, YARA), LLM-driven triage with MITRE ATT&CK mapping, FastAPI web UI with drag-drop upload. 99 tests passing.',
    tech: ['Python', 'FastAPI', 'Ollama', 'YARA', 'pefile'],
    status: 'stable',
    wave: 3,
    github: 'https://github.com/loudmumble/malscope',
  },
  {
    name: 'aisec',
    description: 'AI security testing toolkit. 154 payloads across 18 categories: prompt injection, jailbreaking, agent hijacking, data exfiltration. Supports Ollama, OpenAI, and Anthropic connectors. 55 tests passing.',
    tech: ['Python', 'Ollama', 'OpenAI', 'Anthropic'],
    status: 'stable',
    wave: 2,
    github: 'https://github.com/loudmumble/aisec',
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
        <span className="text-terminal-green">{projects.length}/42</span> projects indexed.
        <span className="text-terminal-yellow ml-2">2,700+ tests across all repos.</span>
        {' '}Click to expand details.
      </div>

      <div className="mt-3 text-xs text-muted-foreground/50 font-mono">
        try: <span className="text-primary/60">contact</span> | read: <a href="/#/blog/de-voidlink" className="text-terminal-cyan hover:text-primary transition-colors">blog/de-voidlink</a>
      </div>
    </div>
  );
};
