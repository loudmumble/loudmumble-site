import { ReactNode } from 'react';

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export const TerminalWindow = ({
  children,
  title = "loud@mumble:~",
  className = ""
}: TerminalWindowProps) => {
  return (
    <div className={`terminal-window border-glow relative flex flex-col ${className}`}>
      {/* Title bar */}
      <div className="flex-none flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
        <span className="text-terminal-yellow text-sm font-medium">{title}</span>
        <div className="flex items-center gap-2">
          <div className="title-bar-button close" />
          <div className="title-bar-button minimize" />
          <div className="title-bar-button maximize" />
        </div>
      </div>

      {/* Content area with scanlines */}
      <div className="relative flex-1 overflow-hidden scanlines">
        <div className="h-full w-full p-4 md:p-6 overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};
