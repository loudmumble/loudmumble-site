import { useState } from 'react';
import { TerminalLine, TerminalDivider, TerminalPrompt } from '../terminal/TerminalLine';
import { Folder, GitBranch, ExternalLink } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  tech: string[];
  status: 'stable' | 'alpha' | 'development';
}

const projects: Project[] = [
  {
    name: 'hog',
    description: 'Hand of God (HOG) - A sophisticated C2 framework designed for comprehensive security testing and red team operations. Features modular architecture, encrypted communications, and extensive post-exploitation capabilities.',
    tech: ['TypeScript', 'Node.js', 'React', 'C++'],
    status: 'development',
  },
  {
    name: 'c-sync',
    description: 'Custom file synchronization tool - Multi-threaded server/client in C with encrypted transmission, automated real-time file monitoring and synchronization. Rolling 30-day directory level rollback (btrfs).',
    tech: ['C', 'Encryption', 'Multi-threading', 'BTRFS'],
    status: 'stable',
  },
  {
    name: 'chackr',
    description: 'Comprehensive LLM-Attack framework & toolkit for automated testing of large-language model API endpoints.',
    tech: ['Python', 'ML/AI', 'API Testing', 'Security'],
    status: 'alpha',
  },
  {
    name: 'fester',
    description: 'Network Attack Path visualization tool - Graphical analysis highlighting potential initial access points & lateral movement paths, utilizing machine-learning.',
    tech: ['Go', 'ML', 'Graph Theory', 'Network Security'],
    status: 'development',
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
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-terminal-green transition-colors">
                      <GitBranch className="w-3 h-3" />
                      <span>main</span>
                    </button>
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-terminal-cyan transition-colors">
                      <ExternalLink className="w-3 h-3" />
                      <span>view source</span>
                    </button>
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

      <TerminalPrompt command="./contact.sh" />
    </div>
  );
};
