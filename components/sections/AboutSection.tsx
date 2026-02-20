import { TerminalLine, TerminalDivider, TerminalOutput } from '../terminal/TerminalLine';
import { Crosshair, Target, Code, Cpu } from 'lucide-react';

const expertise = [
  { icon: Crosshair, label: 'Network & web app penetration testing — OWASP/PTES methodology, manual exploitation' },
  { icon: Target, label: 'Active Directory attack paths — Kerberoasting, DACL abuse, forest trust exploitation' },
  { icon: Cpu, label: 'Infrastructure hardening — Linux/Windows, firewall audits, segmentation validation' },
  { icon: Code, label: 'Security tooling — custom frameworks, automation pipelines, CI/CD security integration' },
];

export const AboutSection = () => {
  return (
    <div className="fade-in-up">
      <TerminalLine prefix="CMD" prefixColor="cyan">
        cat ./about.txt
      </TerminalLine>

      <TerminalDivider />

      <div className="space-y-4 stagger-children">
        <TerminalOutput>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-terminal-magenta text-lg font-bold">▶</span>
            <h2 className="text-xl md:text-2xl font-bold text-terminal-cyan">
              Security tools and adversary research.
            </h2>
          </div>
        </TerminalOutput>

        <TerminalOutput className="text-foreground/80 leading-relaxed max-w-3xl">
          Offensive security — network and AD pentesting, vulnerability research,
          detection engineering. The tools below are what came out of that work.
        </TerminalOutput>

        <TerminalDivider />

        <div>
          <TerminalLine prefix="SYS" prefixColor="yellow">
            Expertise modules loaded:
          </TerminalLine>

          <div className="mt-3 space-y-2 pl-2">
            {expertise.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-sm group hover:bg-primary/5 py-1 px-2 -mx-2 rounded transition-colors"
              >
                <item.icon className="w-4 h-4 text-terminal-green flex-shrink-0 group-hover:text-terminal-cyan transition-colors" />
                <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                  {item.label}
                </span>
                <span className="text-terminal-green ml-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  [LOADED]
                </span>
              </div>
            ))}
          </div>
        </div>

        <TerminalDivider />

        <div className="p-3 bg-terminal-cyan/5 border border-terminal-cyan/20 rounded">
          <TerminalLine prefix="FOCUS" prefixColor="cyan">
            Current workstreams:
          </TerminalLine>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-foreground/70">
            <span>• Building offensive security frameworks</span>
            <span>• AD attack automation</span>
            <span>• CVE research in self-hosted OSS</span>
          </div>
        </div>

        <div className="bg-primary/5 border border-border p-4 rounded">
          <TerminalLine prefix="FOCUS" prefixColor="magenta">
            Current research
          </TerminalLine>
          <p className="mt-2 text-sm text-foreground/70">
            Agentic threat detection — catching LLM-driven attacks through behavioral analysis and cadence fingerprinting.
          </p>
        </div>
      </div>

      <div className="mt-3 text-xs text-muted-foreground/50 font-mono">
        try: <span className="text-primary/60">services</span>
      </div>
    </div>
  );
};
