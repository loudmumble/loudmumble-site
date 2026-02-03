import { TerminalLine, TerminalDivider, TerminalPrompt, TerminalOutput } from '../terminal/TerminalLine';
import { Shield, Target, Code, Lock } from 'lucide-react';

const expertise = [
  { icon: Shield, label: 'Enterprise security assessments & malware reverse engineering' },
  { icon: Target, label: 'Infrastructure hardening across diverse technology stacks' },
  { icon: Lock, label: 'Network penetration & lateral movement techniques' },
  { icon: Code, label: 'Custom tool development for security validation' },
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
              Senior Security Consultant
            </h2>
          </div>
        </TerminalOutput>

        <TerminalOutput className="text-foreground/80 leading-relaxed max-w-3xl">
          Specializing in adversarial emulation, penetration testing, and advanced persistent
          threat analysis. Committed to strengthening defensive postures through controlled
          adversarial simulation and comprehensive threat modeling.
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

        <div className="bg-primary/5 border border-border p-4 rounded">
          <TerminalLine prefix="NOTE" prefixColor="magenta">
            Mission Statement
          </TerminalLine>
          <p className="mt-2 text-sm text-foreground/70 italic">
            "Strengthening defensive postures through controlled adversarial simulation
            and comprehensive threat modeling."
          </p>
        </div>
      </div>

      <TerminalPrompt command="./load_services.sh" />
    </div>
  );
};
