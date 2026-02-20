import { useState, useEffect } from 'react';
import { TerminalLine, TerminalDivider } from './TerminalLine';

interface InitLine {
  prefix: string;
  prefixColor: 'green' | 'yellow' | 'cyan' | 'magenta' | 'red' | 'orange' | 'blue';
  content: string;
  status?: string;
  statusColor?: string;
}

const initSequence: InitLine[] = [
  { prefix: 'SYSTEM', prefixColor: 'yellow', content: 'loudmumble security terminal v4.2.0' },
  { prefix: 'SYSTEM', prefixColor: 'yellow', content: 'Initializing secure connection...', status: 'OK', statusColor: 'text-terminal-green' },
  { prefix: 'CRYPTO', prefixColor: 'cyan', content: 'Loading AES-256 encryption modules...', status: 'OK', statusColor: 'text-terminal-green' },
  { prefix: 'CRYPTO', prefixColor: 'cyan', content: 'Verifying TLS 1.3 handshake...', status: 'OK', statusColor: 'text-terminal-green' },
  { prefix: 'NET', prefixColor: 'blue', content: 'Firewall status:', status: 'ACTIVE', statusColor: 'text-terminal-green' },
  { prefix: 'NET', prefixColor: 'blue', content: 'VPN tunnel:', status: 'ESTABLISHED', statusColor: 'text-terminal-green' },
  { prefix: 'NET', prefixColor: 'blue', content: 'Connection: 10.31.33.7 →', status: 'SECURE', statusColor: 'text-terminal-green' },
];

export const SystemInit = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [sessionId] = useState(() => `SES-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
  const [loginTime] = useState(() => new Date().toISOString());

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= initSequence.length + 4) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  const authLines: InitLine[] = [
    { prefix: 'AUTH', prefixColor: 'magenta', content: 'User: loud' },
    { prefix: 'AUTH', prefixColor: 'magenta', content: `Session ID: ${sessionId}` },
    { prefix: 'AUTH', prefixColor: 'magenta', content: `Login time: ${loginTime}` },
    { prefix: 'AUTH', prefixColor: 'magenta', content: 'Status:', status: 'AUTHENTICATED', statusColor: 'text-terminal-green' },
  ];

  const allLines = [...initSequence, ...authLines];

  return (
    <div className="stagger-children">
      {allLines.slice(0, visibleLines).map((line, index) => (
        <TerminalLine key={index} prefix={line.prefix} prefixColor={line.prefixColor}>
          {line.content}
          {line.status && (
            <span className={`ml-2 font-bold ${line.statusColor}`}>{line.status}</span>
          )}
        </TerminalLine>
      ))}

      {visibleLines > allLines.length - 1 && <TerminalDivider />}

      {visibleLines > allLines.length && (
        <div className="text-center text-foreground/80 text-sm py-2">
          Welcome to the loudmumble security terminal. Type '<span className="text-primary">help</span>' for commands.
        </div>
      )}

      {visibleLines > allLines.length + 1 && <TerminalDivider />}

    </div>
  );
};
