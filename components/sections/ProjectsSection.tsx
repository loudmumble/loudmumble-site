import { useState } from 'react';
import { TerminalLine, TerminalDivider } from '../terminal/TerminalLine';
import { Folder, GitBranch } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  tech: string[];
  status: 'stable' | 'alpha' | 'development';
}

const projects: Project[] = [
  {
    name: 'hog',
    description: 'Security testing platform with modular architecture. Web-based interface for managing assessments, tracking findings, and generating reports. Built with session-based auth and PostgreSQL.',
    tech: ['TypeScript', 'Node.js', 'React', 'PostgreSQL'],
    status: 'development',
  },
  {
    name: 'sec-automation',
    description: 'Collection of scripts and tools for automating common pentest workflows — enumeration, credential spraying, and report generation.',
    tech: ['Python', 'Bash', 'API Integration'],
    status: 'stable',
  },
  {
    name: 'lab-infra',
    description: 'Home lab environment for practicing AD attacks, hosting vulnerable applications, and testing tooling. Documented build process and configurations.',
    tech: ['Virtualization', 'Active Directory', 'Networking'],
    status: 'stable',
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
