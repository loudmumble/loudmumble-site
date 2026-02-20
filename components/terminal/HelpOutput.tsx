import { TerminalDivider } from './TerminalLine';

interface Command {
  name: string;
  description: string;
  shortcut?: string;
}

const commands: Command[] = [
  { name: 'help', description: 'Display this help message' },
  { name: 'about', description: 'View profile and expertise', shortcut: 'F1' },
  { name: 'services', description: 'List available services', shortcut: 'F2' },
  { name: 'skills', description: 'View skills and certifications' },
  { name: 'projects', description: 'Browse project portfolio', shortcut: 'F3' },
  { name: 'blog', description: 'Read the latest research writeup', shortcut: 'F5' },
  { name: 'contact', description: 'Get contact information', shortcut: 'F4' },
  { name: 'enterprise', description: 'Enterprise detection capabilities' },
  { name: 'github', description: 'Open github.com/loudmumble' },
  { name: 'clear', description: 'Clear the terminal', shortcut: 'Ctrl+L' },
  { name: 'whoami', description: 'Display current user info' },
  { name: 'neofetch', description: 'System information display' },
];

export const HelpOutput = () => {
  return (
    <div className="font-mono text-sm space-y-2">
      <div className="text-terminal-yellow font-bold">
        loudmumble security terminal - command reference
      </div>

      <TerminalDivider />

      <div className="grid gap-1">
        {commands.map((cmd) => (
          <div key={cmd.name} className="flex items-center">
            <span className="text-terminal-cyan w-20">{cmd.name}</span>
            <span className="text-muted-foreground flex-1">{cmd.description}</span>
            {cmd.shortcut && (
              <span className="text-terminal-magenta/60 text-xs">[{cmd.shortcut}]</span>
            )}
          </div>
        ))}
      </div>

      <TerminalDivider />

      <div className="text-xs text-muted-foreground">
        <span className="text-terminal-green">TIP:</span> Use Tab for autocomplete, ↑/↓ for history
      </div>
    </div>
  );
};

export const NeofetchOutput = () => {
  return (
    <div className="font-mono text-xs md:text-sm flex flex-col md:flex-row gap-4 md:gap-8">
      {/* ASCII Art */}
      <pre className="text-terminal-magenta text-[8px] md:text-[10px] leading-tight">
        {`    ██╗     ███╗   ███╗
    ██║     ████╗ ████║
    ██║     ██╔████╔██║
    ██║     ██║╚██╔╝██║
    ███████╗██║ ╚═╝ ██║
    ╚══════╝╚═╝     ╚═╝`}
      </pre>

      {/* System Info */}
      <div className="space-y-1">
        <div><span className="text-terminal-cyan">loud</span>@<span className="text-terminal-magenta">mumble</span></div>
        <div className="text-muted-foreground">─────────────────────</div>
        <div><span className="text-terminal-cyan">OS:</span> Security Terminal v4.2.0</div>
        <div><span className="text-terminal-cyan">Host:</span> loudmumble.com</div>
        <div><span className="text-terminal-cyan">Uptime:</span> 99.9%</div>
        <div><span className="text-terminal-cyan">Shell:</span> zsh 5.9</div>
        <div><span className="text-terminal-cyan">Resolution:</span> 2560x1440 (HiDPI)</div>
        <div><span className="text-terminal-cyan">Theme:</span> cybersec-dark</div>
        <div><span className="text-terminal-cyan">Terminal:</span> mumble-term</div>
        <div><span className="text-terminal-cyan">GPU:</span> Hardware Accelerated</div>
        <div className="pt-2 flex gap-1">
          <span className="w-4 h-4 bg-terminal-red rounded-sm" />
          <span className="w-4 h-4 bg-terminal-green rounded-sm" />
          <span className="w-4 h-4 bg-terminal-yellow rounded-sm" />
          <span className="w-4 h-4 bg-terminal-blue rounded-sm" />
          <span className="w-4 h-4 bg-terminal-magenta rounded-sm" />
          <span className="w-4 h-4 bg-terminal-cyan rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export const WhoamiOutput = () => {
  return (
    <div className="font-mono text-sm">
      <div className="text-terminal-green">loud</div>
      <div className="text-muted-foreground text-xs mt-1">
        uid=1337(loud) gid=1337(security) groups=1337(security),27(sudo),1000(pentest)
      </div>
    </div>
  );
};
