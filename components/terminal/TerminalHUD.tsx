import { useState, useEffect, useMemo } from 'react';
import { Navigation } from './Navigation';
import { useIsMobile } from '@/hooks/use-mobile';

interface HUDProps {
    activeSection: string;
    onNavigate: (section: string) => void;
}

const HEX_CHARS = '0123456789ABCDEF';
const BIN_CHARS = '01';

const DataStream = ({ type = 'hex', rows = 6, cols = 12 }: { type?: 'hex' | 'bin'; rows?: number; cols?: number }) => {
    const [data, setData] = useState<string[]>([]);

    useEffect(() => {
        const generate = () => {
            const chars = type === 'hex' ? HEX_CHARS : BIN_CHARS;
            return Array.from({ length: rows }, () =>
                Array.from({ length: cols }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
            );
        };

        const interval = setInterval(() => {
            setData(generate());
        }, 150);

        return () => clearInterval(interval);
    }, [type, rows, cols]);

    return (
        <div className="font-mono text-[8px] leading-tight text-primary/40 select-none">
            {data.map((row, i) => (
                <div key={i}>{row}</div>
            ))}
        </div>
    );
};

const SystemGauge = ({ label, value, color = 'text-terminal-green' }: { label: string; value: number; color?: string }) => {
    const bars = Math.floor((value / 100) * 10);
    return (
        <div className="flex items-center gap-2 font-mono text-[10px]">
            <span className="text-muted-foreground w-8 uppercase">{label}</span>
            <div className="flex gap-0.5">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-1.5 h-3 border border-border ${i < bars ? (i > 7 ? 'bg-terminal-red' : (i > 5 ? 'bg-terminal-yellow' : color.replace('text-', 'bg-'))) : 'bg-transparent'}`}
                    />
                ))}
            </div>
            <span className={color}>{value}%</span>
        </div>
    );
};

const GlitchTitle = ({ text }: { text: string }) => {
    const [display, setDisplay] = useState(text);
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.9) {
                setIsGlitching(true);
                const glitched = text.split('').map(c =>
                    Math.random() > 0.8 ? HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)] : c
                ).join('');
                setDisplay(glitched);
                setTimeout(() => {
                    setDisplay(text);
                    setIsGlitching(false);
                }, 100);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <div className="relative">
            <h1 className={`text-2xl md:text-3xl font-bold tracking-[0.2em] transition-all duration-75 ${isGlitching ? 'text-terminal-red translate-x-[1px]' : 'text-terminal-magenta'}`}>
                {display}
            </h1>
            <div className="absolute -inset-1 bg-terminal-magenta/5 blur-xl pointer-events-none" />
        </div>
    );
};

export const TerminalHUD = ({ activeSection, onNavigate }: HUDProps) => {
    const isMobile = useIsMobile();
    const [cpu, setCpu] = useState(42);
    const [mem, setMem] = useState(64);
    const [net, setNet] = useState(12);

    useEffect(() => {
        const interval = setInterval(() => {
            setCpu(prev => Math.min(100, Math.max(0, prev + Math.floor(Math.random() * 11) - 5)));
            setMem(prev => Math.min(100, Math.max(0, prev + Math.floor(Math.random() * 3) - 1)));
            setNet(prev => Math.min(100, Math.max(0, prev + Math.floor(Math.random() * 21) - 10)));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    if (isMobile) {
        return (
            <div className="w-full flex flex-col items-center gap-4 py-4 border-b border-border bg-black/20">
                <GlitchTitle text="LOUDMUMBLE" />
                <Navigation activeSection={activeSection} onNavigate={onNavigate} />
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-4 py-4 px-6 border-b border-border bg-black/40 relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />

            <div className="flex justify-between items-start gap-8">
                {/* Left Side: Telemetry */}
                <div className="flex flex-col gap-3 flex-none">
                    <div className="flex flex-col gap-2">
                        <SystemGauge label="CPU" value={cpu} color="text-terminal-cyan" />
                        <SystemGauge label="MEM" value={mem} color="text-terminal-magenta" />
                        <SystemGauge label="NET" value={net} color="text-terminal-yellow" />
                    </div>
                    <div className="h-[1px] w-full bg-border/50" />
                    <div className="flex items-center gap-4">
                        <DataStream type="hex" rows={4} cols={8} />
                        <div className="text-[10px] font-mono text-muted-foreground/50 rotate-90 whitespace-nowrap">
                            KERN_STATUS: OK
                        </div>
                    </div>
                </div>

                {/* Center: Branding & Navigation */}
                <div className="flex-1 flex flex-col items-center justify-center -mt-2">
                    <GlitchTitle text="LOUDMUMBLE" />
                    <div className="mt-4 w-full max-w-md">
                        <Navigation activeSection={activeSection} onNavigate={onNavigate} />
                    </div>
                </div>

                {/* Right Side: Log Feed / Activity */}
                <div className="flex flex-col items-end gap-3 flex-none">
                    <div className="font-mono text-[9px] text-right space-y-0.5 text-terminal-green/60">
                        <div>IP: 10.31.33.7</div>
                        <div>LOC: [REDACTED]</div>
                        <div>AUTH_LVL: 4</div>
                    </div>
                    <div className="h-[1px] w-full bg-border/50" />
                    <div className="flex items-start gap-3">
                        <div className="text-[9px] font-mono text-muted-foreground/50 border-r border-border/30 pr-2">
                            LOG_LEVEL: VERBOSE<br />
                            BUFF: 1024KB
                        </div>
                        <DataStream type="bin" rows={4} cols={16} />
                    </div>
                </div>
            </div>

            {/* Bottom status strip */}
            <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground border-t border-border/30 pt-2 -mx-2 px-2">
                <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
                        LIVE LINK: ESTABLISHED
                    </span>
                    <span className="text-secondary/50">ENCRYPTION: AES-256-GCM</span>
                </div>
                <div className="flex gap-4">
                    <span>UPTIME: 99D 23H 59M</span>
                    <span className="text-terminal-yellow">DANGER_LEVEL: MINIMAL</span>
                </div>
            </div>
        </div>
    );
};
