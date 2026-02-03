import { TerminalLine, TerminalDivider, TerminalPrompt } from '../terminal/TerminalLine';
import { Crosshair, Network, Bug, Wrench } from 'lucide-react';

interface Service {
  icon: typeof Crosshair;
  title: string;
  description: string;
  tag: string;
  tagValue: string;
  tagColor: string;
}

const services: Service[] = [
  {
    icon: Crosshair,
    title: 'Penetration Testing',
    description: 'Comprehensive security assessments across web applications, network infrastructure, and cloud environments.',
    tag: 'METHODOLOGIES',
    tagValue: 'BLACK/GREY/WHITE BOX',
    tagColor: 'text-terminal-red',
  },
  {
    icon: Network,
    title: 'Lateral Movement Analysis',
    description: 'Adversarial emulation scenarios testing enterprise defenses against advanced persistent threats.',
    tag: 'FOCUS',
    tagValue: 'ACTIVE DIRECTORY',
    tagColor: 'text-terminal-cyan',
  },
  {
    icon: Bug,
    title: 'Malware Analysis',
    description: 'Static and dynamic reverse engineering of malicious binaries. Extract indicators of compromise and develop countermeasures.',
    tag: 'EXPERTISE',
    tagValue: 'REVERSE ENGINEERING',
    tagColor: 'text-terminal-magenta',
  },
  {
    icon: Wrench,
    title: 'Custom Tool Development',
    description: 'Tailored security assessment tools and automation frameworks.',
    tag: 'PROFICIENCY',
    tagValue: 'PYTHON/C/C++/Go/ASM',
    tagColor: 'text-terminal-yellow',
  },
];

export const ServicesSection = () => {
  return (
    <div className="fade-in-up">
      <TerminalLine prefix="CMD" prefixColor="cyan">
        ls -la ./services/
      </TerminalLine>

      <TerminalDivider />

      <div className="grid gap-4 md:grid-cols-2 stagger-children">
        {services.map((service, index) => (
          <div
            key={index}
            className="group relative border border-border bg-card/50 p-4 rounded transition-all duration-300 hover:border-primary/50 hover:bg-primary/5"
            style={{
              boxShadow: 'inset 0 0 20px hsl(var(--primary) / 0.02)'
            }}
          >
            {/* Service header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary/10 rounded border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-5 h-5 text-terminal-green" />
              </div>
              <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {service.description}
            </p>

            {/* Tag */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">[{service.tag}]</span>
              <span className={`font-mono font-bold ${service.tagColor}`}>
                {service.tagValue}
              </span>
            </div>

            {/* Hover indicator */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-terminal-green">▶</span>
            </div>
          </div>
        ))}
      </div>

      <TerminalDivider />

      <div className="text-xs text-muted-foreground">
        <span className="text-terminal-green">4</span> services available.
        Run <span className="text-primary">--help</span> for detailed specifications.
      </div>

      <TerminalPrompt command="./show_projects.sh" />
    </div>
  );
};
