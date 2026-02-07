import { useState } from 'react';
import { TerminalLine, TerminalDivider } from '../terminal/TerminalLine';
import { Mail, MessageSquare, Lock, Copy, Check } from 'lucide-react';

interface ContactMethod {
  icon: typeof Mail;
  label: string;
  value: string;
  type: 'email' | 'handle' | 'status';
  color: string;
}

const contactMethods: ContactMethod[] = [
  { icon: Mail, label: 'SIGNAL', value: 'contact@loudmumble.com', type: 'email', color: 'text-terminal-cyan' },
  { icon: MessageSquare, label: 'FREQUENCY', value: '@loudmumble', type: 'handle', color: 'text-terminal-magenta' },
  { icon: Lock, label: 'CHANNEL', value: 'encrypted', type: 'status', color: 'text-terminal-green' },
];

export const ContactSection = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (value: string, index: number) => {
    navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fade-in-up">
      <TerminalLine prefix="CMD" prefixColor="cyan">
        cat ./contact.txt
      </TerminalLine>

      <TerminalDivider />

      <div className="space-y-4 stagger-children">
        <div className="text-sm text-foreground/80 mb-4">
          Establish secure communication channel. All transmissions are encrypted.
        </div>

        {/* Contact methods */}
        <div className="space-y-3">
          {contactMethods.map((method, index) => (
            <div
              key={method.label}
              className="group flex items-center gap-4 p-3 bg-muted/30 border border-border rounded hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <div className={`p-2 rounded bg-primary/10 ${method.color}`}>
                <method.icon className="w-5 h-5" />
              </div>

              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-0.5">
                  [{method.label}]
                </div>
                <div className={`font-mono font-medium ${method.color}`}>
                  {method.value}
                </div>
              </div>

              {method.type !== 'status' && (
                <button
                  onClick={() => handleCopy(method.value, index)}
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-terminal-green" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          ))}
        </div>

        <TerminalDivider />

        {/* Security notice */}
        <div className="p-4 bg-terminal-green/5 border border-terminal-green/20 rounded">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-terminal-green" />
            <span className="text-sm font-bold text-terminal-green">SECURE CHANNEL</span>
          </div>
          <p className="text-xs text-foreground/60">
            For sensitive communications, PGP encryption is recommended.
            Public key available upon request.
          </p>
        </div>

        {/* Response time */}
        <div className="text-xs text-muted-foreground">
          <span className="text-terminal-yellow">[INFO]</span> Average response time:
          <span className="text-terminal-green ml-1">&lt; 24 hours</span>
        </div>
      </div>

      <div className="mt-3 text-xs text-muted-foreground/50 font-mono">
        try: <span className="text-primary/60">help</span>
      </div>
    </div>
  );
};
