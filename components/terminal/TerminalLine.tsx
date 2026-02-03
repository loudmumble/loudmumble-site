import { ReactNode } from 'react';

interface TerminalLineProps {
  prefix?: string;
  prefixColor?: 'green' | 'yellow' | 'cyan' | 'magenta' | 'red' | 'orange' | 'blue';
  children: ReactNode;
  className?: string;
  indent?: boolean;
}

const prefixColors = {
  green: 'text-terminal-green',
  yellow: 'text-terminal-yellow',
  cyan: 'text-terminal-cyan',
  magenta: 'text-terminal-magenta',
  red: 'text-terminal-red',
  orange: 'text-terminal-orange',
  blue: 'text-terminal-blue',
};

export const TerminalLine = ({
  prefix,
  prefixColor = 'green',
  children,
  className = "",
  indent = false
}: TerminalLineProps) => {
  return (
    <div className={`terminal-line font-mono text-sm leading-relaxed ${indent ? 'pl-4' : ''} ${className}`}>
      {prefix && (
        <span className={`${prefixColors[prefixColor]} font-medium`}>
          [{prefix.padEnd(6)}]
        </span>
      )}
      {prefix && <span className="text-muted-foreground mx-1"></span>}
      <span className="text-foreground">{children}</span>
    </div>
  );
};

export const TerminalPrompt = ({ command = "" }: { command?: string }) => {
  return (
    <div className="terminal-line font-mono text-sm flex items-center gap-0 mt-2">
      <span className="text-terminal-cyan">loud</span>
      <span className="text-muted-foreground">@</span>
      <span className="text-terminal-magenta">mumble</span>
      <span className="text-muted-foreground">:</span>
      <span className="text-terminal-blue">~</span>
      <span className="text-foreground">% </span>
      <span className="text-terminal-bright-green">{command}</span>
      <span className="cursor-blink text-terminal-green ml-0.5">▊</span>
    </div>
  );
};

export const TerminalDivider = () => {
  return (
    <div className="my-3 text-border overflow-hidden">
      ─────────────────────────────────────────────────────────────────────────
    </div>
  );
};

export const TerminalOutput = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
  return (
    <div className={`text-foreground/90 text-sm leading-relaxed ${className}`}>
      {children}
    </div>
  );
};
