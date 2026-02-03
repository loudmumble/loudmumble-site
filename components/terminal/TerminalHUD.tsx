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
const SideStream = ({ type = 'hex', rows = 12, cols = 10 }: { type?: 'hex' | 'bin'; rows?: number; cols?: number }) => {
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
        <div className="font-mono text-[9px] leading-tight text-primary/30 select-none">
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

    // Complex LED Patterns (Sine waves, rainbows, trace lines)
    const getCharColor = (x: number, y: number, t: number) => {
        // We'll use HSL for smooth transitions
        // Pattern 1: Horizontal Sine Wave
        const hue1 = (x * 4 + t * 2) % 360;
        // Pattern 2: Diagonal "Trace" intensity
        const intensity = Math.sin((x + y * 2 + t * 0.1) * 0.5) * 0.5 + 0.5;

        // Mix different palettes based on frame
        if ((Math.floor(t / 200) % 3) === 0) {
            // Rainbow Wave
            return `hsl(${hue1}, 80%, 60%)`;
        } else if ((Math.floor(t / 200) % 3) === 1) {
            // Cyber Cyan/Magenta pulse
            const phase = Math.sin(x * 0.1 + t * 0.05);
            return phase > 0 ? 'var(--terminal-cyan-hsl)' : 'var(--terminal-magenta-hsl)';
        } else {
            // Matrix Green Trace
            const alpha = intensity > 0.8 ? 1 : 0.4;
            return `hsla(120, 100%, 70%, ${alpha})`;
        }
    };

    return (
        <div className="relative group/ascii transition-transform duration-500 hover:scale-[1.02]">
            <div className="font-bold leading-[1.05] select-none whitespace-pre overflow-hidden">
                {ascii.map((line, i) => (
                    <div key={i} className="flex gap-0 h-[8.5px] md:h-[11px]">
                        {line.split('').map((char, j) => {
                            if (char === ' ') return <span key={j} className="inline-block w-[6px] md:w-[7.5px]" />;
                            return (
                                <span
                                    key={j}
                                    className="inline-block transition-colors duration-200"
                                    style={{
                                        color: getCharColor(j, i, frame),
                                        textShadow: `0 0 8px ${getCharColor(j, i, frame)}44`
                                    }}
                                >
                                    {char}
                                </span>
                            );
                        })}
                    </div>
                ))}
            </div>
            {/* Scanline overlay */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-white/10 blur-sm animate-scanline pointer-events-none" />
        </div>
    );
};

// Refined Telemetry Widget
const TelemetryWidget = ({ label, value, unit, colorClass }: { label: string; value: string | number; unit: string; colorClass: string }) => (
    <div className="flex flex-col gap-0.5 min-w-[120px]">
        <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-[0.2em] opacity-50">{label}</span>
        <div className="flex items-baseline gap-1">
            <span className={`text-sm font-bold font-mono ${colorClass} tracking-tighter`}>{value}</span>
            <span className="text-[10px] text-muted-foreground/60">{unit}</span>
        </div>
        <div className="h-[1px] w-full bg-border/20 mt-1" />
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
                ram: Number((prev.ram + (Math.random() * 0.2 - 0.1)).toFixed(2)),
                gpu: Math.min(100, Math.max(0, prev.gpu + Math.floor(Math.random() * 5 - 2))),
                inference: Math.min(100, Math.max(0, prev.inference + Math.floor(Math.random() * 9 - 4))),
                up: Math.floor(Math.random() * 300 + 50),
                down: Number((Math.random() * 10 + 5).toFixed(1))
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
        <div className="w-full flex flex-col items-center gap-6 py-8 px-10 border-b border-border bg-black/60 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, var(--terminal-cyan) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="w-full flex items-start justify-between gap-12 z-10">
                {/* Left Section: Stats + Stream */}
                <div className="flex flex-col gap-8 flex-none w-[160px]">
                    <div className="space-y-6">
                        <TelemetryWidget label="Memory (RAM)" value={stats.ram} unit="GB / 16" colorClass="text-terminal-magenta" />
                        <TelemetryWidget label="Inference" value={stats.inference} unit="TOK/S" colorClass="text-terminal-green" />
                    </div>
                    <SideStream type="bin" rows={10} cols={16} />
                </div>

                {/* Center Section: Branding & Single-Line Navigation */}
                <div className="flex-1 flex flex-col items-center justify-center gap-8 -mt-2 min-w-0">
                    <LEDAscii />
                    <div className="w-full flex justify-center scale-95 lg:scale-100">
                        <div className="border border-border/30 p-1 bg-black/20 rounded-sm">
                            <Navigation activeSection={activeSection} onNavigate={onNavigate} />
                        </div>
                    </div>
                </div>

                {/* Right Section: Stats + Stream */}
                <div className="flex flex-col gap-8 flex-none w-[160px] text-right items-end">
                    <div className="space-y-6">
                        <TelemetryWidget label="Neural (GPU)" value={`RTX-4090 | ${stats.gpu}%`} unit="LOAD" colorClass="text-terminal-cyan" />
                        <div className="flex flex-col items-end gap-1">
                            <span className="text-[8px] font-mono text-muted-foreground uppercase opacity-50 tracking-widest">Global Link</span>
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col items-end">
                                    <span className="text-xs text-terminal-green font-bold">{stats.up}KB/s</span>
                                    <span className="text-[7px] opacity-40">UPLINK</span>
                                </div>
                                <div className="w-[1px] h-4 bg-border/30" />
                                <div className="flex flex-col items-end">
                                    <span className="text-xs text-terminal-cyan font-bold">{stats.down}MB/s</span>
                                    <span className="text-[7px] opacity-40">DOWNLINK</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SideStream type="hex" rows={10} cols={16} />
                </div>
            </div>

            {/* Footer info strip */}
            <div className="w-full flex justify-between items-center text-[8px] font-mono text-muted-foreground/30 border-t border-border/10 pt-3">
                <div className="flex gap-4">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" /> NETWORK_STATE: STABLE</span>
                    <span>LOCATION: [34.0522° N, 118.2437° W]</span>
                </div>
                <div className="flex gap-4">
                    <span>ENCR_KEY: 0x7E3...A21</span>
                    <span className="text-terminal-magenta">KERNEL_VER: 6.1.0-SECURITY</span>
                </div>
            </div>
        </div>
    );
};
