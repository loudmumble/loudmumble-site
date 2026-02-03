import { useState, useEffect, useMemo, useRef } from 'react';
import { Navigation } from './Navigation';
import { useIsMobile } from '@/hooks/use-mobile';

interface HUDProps {
    activeSection: string;
    onNavigate: (section: string) => void;
}

const HEX_CHARS = '0123456789ABCDEF';
const BIN_CHARS = '01';

// Animated Data Stream (Bin/Hex)
const SideStream = ({ type = 'hex', rows = 6, cols = 8 }: { type?: 'hex' | 'bin'; rows?: number; cols?: number }) => {
    const [data, setData] = useState<string[]>([]);
    useEffect(() => {
        const chars = type === 'hex' ? HEX_CHARS : BIN_CHARS;
        const interval = setInterval(() => {
            setData(Array.from({ length: rows }, () =>
                Array.from({ length: cols }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
            ));
        }, 150);
        return () => clearInterval(interval);
    }, [type, rows, cols]);

    return (
        <div className="font-mono text-[8px] leading-tight text-primary/20 select-none">
            {data.map((row, i) => (
                <div key={i}>{row}</div>
            ))}
        </div>
    );
};

// High-Fidelity Pixel-LED Color Animated ASCII
const LEDAscii = () => {
    const [frame, setFrame] = useState(0);
    const ascii = useMemo(() => [
        "██╗      ██████╗ ██╗   ██╗██████╗ ███╗   ███╗██╗   ██╗███╗   ███╗██████╗ ██╗     ███████╗",
        "██║     ██╔═══██╗██║   ██║██╔══██╗████╗ ████║██║   ██║████╗ ████║██╔══██╗██║     ██╔════╝",
        "██║     ██║   ██║██║   ██║██║  ██║██╔████╔██║██║   ██║██╔████╔██║██████╔╝██║     █████╗  ",
        "██║     ██║   ██║██║   ██║██║  ██║██║╚██╔╝██║██║   ██║██║╚██╔╝██║██╔══██╗██║     ██╔══╝  ",
        "███████╗╚██████╔╝╚██████╔╝██████╔╝██║ ╚═╝ ██║╚██████╔╝██║ ╚═╝ ██║██████╔╝███████╗███████╗",
        "╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═════╝ ╚══════╝╚══════╝"
    ], []);

    useEffect(() => {
        let animationFrameId: number;
        const update = () => {
            setFrame(prev => prev + 1);
            animationFrameId = requestAnimationFrame(update);
        };
        animationFrameId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const getCharColor = (x: number, y: number, t: number) => {
        const hue1 = (x * 3 + t * 2) % 360;
        const intensity = Math.sin((x + y * 2 + t * 0.1) * 0.5) * 0.5 + 0.5;
        const mode = Math.floor(t / 300) % 3;
        if (mode === 0) return `hsl(${hue1}, 80%, 60%)`;
        if (mode === 1) return Math.sin(x * 0.2 + t * 0.05) > 0 ? 'var(--terminal-cyan-hsl)' : 'var(--terminal-magenta-hsl)';
        return `hsla(120, 100%, 70%, ${intensity > 0.8 ? 1 : 0.4})`;
    };

    return (
        <div className="relative group/ascii flex justify-center w-full min-w-0 overflow-hidden py-1">
            <div
                className="font-bold leading-none select-none whitespace-pre flex flex-col items-center"
                style={{ fontSize: 'clamp(4px, 0.6vw, 8px)', fontFamily: "'JetBrains Mono', monospace" }}
            >
                {ascii.map((line, i) => (
                    <div key={i} className="flex gap-0 min-w-0">
                        {line.split('').map((char, j) => (
                            <span key={j} style={{ color: char === ' ' ? 'transparent' : getCharColor(j, i, frame), textShadow: char === ' ' ? 'none' : `0 0 5px ${getCharColor(j, i, frame)}44`, width: '1ch', display: 'inline-block', textAlign: 'center' }}>
                                {char}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/10 blur-sm animate-scanline pointer-events-none" />
        </div>
    );
};

// Top Ticker Item
const TickerItem = ({ label, value, unit, colorClass }: { label: string; value: string | number; unit: string; colorClass: string }) => (
    <div className="flex items-center gap-2 px-4 border-r border-border/20 last:border-0 h-full">
        <span className="text-[7px] font-mono text-muted-foreground uppercase opacity-40">{label}</span>
        <div className="flex items-baseline gap-1">
            <span className={`text-[10px] font-bold font-mono ${colorClass} tracking-tighter`}>{value}</span>
            <span className="text-[7px] text-muted-foreground/40 font-mono italic">{unit}</span>
        </div>
    </div>
);

export const TerminalHUD = ({ activeSection, onNavigate }: HUDProps) => {
    const isMobile = useIsMobile();
    const [stats, setStats] = useState({
        ram: 4.8,
        gpu: 14,
        inference: 88,
        up: 142,
        down: 12.6
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ram: Number((prev.ram + (Math.random() * 0.1 - 0.05)).toFixed(2)),
                gpu: Math.min(100, Math.max(0, prev.gpu + Math.floor(Math.random() * 3 - 1))),
                inference: Math.min(100, Math.max(0, prev.inference + Math.floor(Math.random() * 7 - 3))),
                up: Math.floor(Math.random() * 200 + 50),
                down: Number((Math.random() * 5 + 3).toFixed(1))
            }));
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    if (isMobile) {
        return (
            <div className="w-full flex flex-col items-center gap-4 py-4 border-b border-border bg-black/20">
                <h1 className="text-xl font-bold text-terminal-magenta tracking-widest text-glow-subtle">LOUDMUMBLE</h1>
                <div className="h-[1px] w-[80%] bg-border/30" />
                <Navigation activeSection={activeSection} onNavigate={onNavigate} />
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col border-b border-border bg-black/80 relative overflow-hidden z-20">
            {/* 1. Top Telemetry Bar */}
            <div className="w-full h-8 flex items-center justify-center bg-zinc-950/80 border-b border-border/10 overflow-x-auto overflow-y-hidden no-scrollbar">
                <TickerItem label="RAM" value={stats.ram} unit="GB/16" colorClass="text-terminal-magenta" />
                <TickerItem label="GPU" value={`${stats.gpu}%`} unit="RTX-4090" colorClass="text-terminal-cyan" />
                <TickerItem label="INF" value={stats.inference} unit="TOK/S" colorClass="text-terminal-green" />
                <TickerItem label="UP" value={stats.up} unit="KB/S" colorClass="text-terminal-yellow" />
                <TickerItem label="DOWN" value={stats.down} unit="MB/S" colorClass="text-terminal-blue" />
                <div className="px-4 flex items-center gap-2">
                    <span className="text-[7px] text-muted-foreground/40 uppercase">State</span>
                    <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse shadow-[0_0_5px_var(--terminal-green)]" />
                        <span className="text-[8px] text-terminal-green/80 font-mono">NORMAL</span>
                    </div>
                </div>
            </div>

            {/* 2. Main Branding Area (ASCII flanked by Binary) */}
            <div className="w-full px-6 py-2 flex items-center justify-between gap-6 bg-black/20">
                <div className="flex-none w-[80px] opacity-60">
                    <SideStream type="bin" rows={6} cols={14} />
                </div>

                <div className="flex-1 min-w-0">
                    <LEDAscii />
                </div>

                <div className="flex-none w-[80px] text-right opacity-60">
                    <SideStream type="hex" rows={6} cols={14} />
                </div>
            </div>

            {/* 3. Condensed Navigation Strip */}
            <div className="w-full h-10 flex items-center justify-center border-t border-border/5 bg-zinc-950/40">
                <div className="scale-75 lg:scale-90 origin-center opacity-80 hover:opacity-100 transition-opacity">
                    <Navigation activeSection={activeSection} onNavigate={onNavigate} />
                </div>
            </div>
        </div>
    );
};
