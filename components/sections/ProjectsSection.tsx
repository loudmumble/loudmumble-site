import { useState } from 'react';
import { TerminalLine, TerminalDivider } from '../terminal/TerminalLine';
import { Folder, GitBranch, ExternalLink } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  tech: string[];
  status: 'stable' | 'alpha' | 'development';
  github?: string;
}

const projects: Project[] = [
  {
    name: 'hog',
    description: 'Hand of God — Modular security testing & C2 framework. 27+ integrated modules covering recon, exploitation, AD attacks, reporting, and real-time multi-operator collaboration. Web UI with session-based auth, PostgreSQL-backed, Socket.IO for live updates. 269K CVEs indexed, 11K arsenal items, 1,769 atomic tests.',
    tech: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Socket.IO'],
    status: 'alpha',
  },
  {
    name: 'sec-automation',
    description: '50+ scripts for automated reconnaissance, credential analysis, and reporting workflows. Integrates with Nmap, BloodHound, CrackMapExec, and custom APIs. Handles everything from subdomain enum to hash cracking pipelines.',
    tech: ['Python', 'Bash', 'Nmap', 'BloodHound'],
    status: 'stable',
    github: 'https://github.com/loudmumble',
  },
  {
    name: 'lab-infra',
    description: 'Self-hosted offensive security lab — Active Directory forest with cross-forest trust relationships, segmented VLANs, vulnerable web applications, and C2 infrastructure. Proxmox hypervisor, pfSense routing, Windows Server 2019/2022 DCs, Kali attack nodes.',
    tech: ['Proxmox', 'pfSense', 'Active Directory', 'Windows Server', 'Kali'],
    status: 'stable',
  },
  {
    name: 'loudmumble.com',
    description: 'This terminal. Interactive CLI portfolio with system HUD, CRT scanline effects, animated ASCII branding, and live data streams. You\'re looking at it right now.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    status: 'stable',
    github: 'https://github.com/loudmumble/loudmumble-site',
  },
];

const statusConfig = {
  stable: { label: 'STABLE', color: 'text-terminal-green', bg: 'bg-terminal-green/10' },
  alpha: { label: 'ALPHA', color: 'text-terminal-yellow', bg: 'bg-yellow-500/10' },
  development: { label: 'DEV', color: 'text-terminal-cyan', bg: 'bg-cyan-500/10' },
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
                    {project.github && (
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
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <TerminalDivider />

      <div className="text-xs text-muted-foreground">
        <span className="text-terminal-green">{projects.length}</span> projects indexed.
        Click to expand details.
      </div>

      <div className="mt-3 text-xs text-muted-foreground/50 font-mono">
        try: <span className="text-primary/60">contact</span>
      </div>
    </div>
  );
};
