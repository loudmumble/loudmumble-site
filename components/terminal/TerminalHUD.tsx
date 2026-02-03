import { useState, useEffect, useMemo } from 'react';
import { Navigation } from './Navigation';
import { useIsMobile } from '@/hooks/use-mobile';

interface HUDProps {
    activeSection: string;
    onNavigate: (section: string) => void;
}

const HEX_CHARS = '0123456789ABCDEF';

// Variation 1: The "Command Center" (Intricate, ASCII centric)
const CommandCenterHUD = ({ activeSection, onNavigate }: HUDProps) => {
    const [stats, setStats] = useState({
        ram: { used: 4.2, total: 16.0 },
        gpu: { load: 12, temp: 45 },
        net: { up: 245, down: 12.4 },
        cpu: 32
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ram: { ...prev.ram, used: Math.min(16, Math.max(2, prev.ram.used + (Math.random() * 0.2 - 0.1))) },
                gpu: { load: Math.min(100, Math.max(0, prev.gpu.load + Math.floor(Math.random() * 5 - 2))), temp: 45 + Math.floor(Math.random() * 3) },
                net: { up: Math.floor(Math.random() * 500 + 100), down: Number((Math.random() * 20 + 5).toFixed(1)) },
                cpu: Math.min(100, Math.max(0, prev.cpu + Math.floor(Math.random() * 7 - 3)))
            }));
        }, 800);
        return () => clearInterval(interval);
    }, []);

    const ascii = `
██╗      ██████╗ ██╗   ██╗██████╗ ███╗   ███╗██╗   ██╗███╗   ███╗██████╗ ██╗     ███████╗
██║     ██╔═══██╗██║   ██║██╔══██╗████╗ ████║██║   ██║████╗ ████║██╔══██╗██║     ██╔════╝
██║     ██║   ██║██║   ██║██║  ██║██╔████╔██║██║   ██║██╔████╔██║██████╔╝██║     █████╗  
██║     ██║   ██║██║   ██║██║  ██║██║╚██╔╝██║██║   ██║██║╚██╔╝██║██╔══██╗██║     ██╔══╝  
███████╗╚██████╔╝╚██████╔╝██████╔╝██║ ╚═╝ ██║╚██████╔╝██║ ╚═╝ ██║██████╔╝███████╗███████╗
╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═════╝ ╚══════╝╚══════╝`;

    return (
        <div className="w-full flex flex-col items-center gap-6 py-4 px-6 border-b border-border bg-black/60 relative overflow-hidden group">
            {/* Intricate background pattern */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(90deg, var(--border) 1px, transparent 1px), linear-gradient(var(--border) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Top Telemetry Row */}
            <div className="w-full flex justify-between items-center text-[10px] font-mono tracking-tighter text-muted-foreground/80">
                <div className="flex gap-6">
                    <div className="flex flex-col">
                        <span className="text-terminal-cyan/60">SYSTEM_MEMORY [RAM]</span>
                        <div className="flex items-center gap-2">
                            <div className="w-24 h-1 bg-muted/20 rounded-full overflow-hidden">
                                <div className="h-full bg-terminal-magenta" style={{ width: `${(stats.ram.used / stats.ram.total) * 100}%` }} />
                            </div>
                            <span className="text-terminal-magenta">{stats.ram.used.toFixed(1)}GB <span className="text-[8px]">/ {stats.ram.total}GB</span></span>
                        </div>
                    </div>
                    <div className="flex flex-col border-l border-border/30 pl-6">
                        <span className="text-terminal-yellow/60">NEURAL_ENGINE [GPU]</span>
                        <span className="text-terminal-yellow uppercase">RTX-4090 | {stats.gpu.load}% | {stats.gpu.temp}°C</span>
                    </div>
                </div>

                <div className="flex gap-6 items-end text-right">
                    <div className="flex flex-col border-r border-border/30 pr-6">
                        <span className="text-terminal-green/60">UPLINK_RATE</span>
                        <span className="text-terminal-green">{stats.net.up} KB/s</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-terminal-cyan/60">DOWNLINK_RATE</span>
                        <span className="text-terminal-cyan">{stats.net.down} MB/s</span>
                    </div>
                </div>
            </div>

            {/* Center: ASCII Art */}
            <div className="relative py-2 group-hover:scale-[1.02] transition-transform duration-500">
                <pre className="text-[6px] md:text-[8px] leading-[1.1] text-terminal-magenta/90 text-glow-subtle whitespace-pre select-none font-bold">
                    {ascii}
                </pre>
                {/* Animated scanline through ASCII */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-terminal-magenta/30 blur-sm animate-scanline pointer-events-none" />
            </div>

            {/* Bottom Row: Unified Navigation */}
            <div className="w-full flex flex-col items-center gap-4">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="w-full max-w-2xl px-4">
                    <Navigation activeSection={activeSection} onNavigate={onNavigate} />
                </div>
            </div>
        </div>
    );
};

// Selection logic
export const TerminalHUD = (props: HUDProps) => {
    const isMobile = useIsMobile();
    const [theme, setTheme] = useState<'command' | 'cyber' | 'aggressive'>('command');

    if (isMobile) {
        return (
            <div className="w-full flex flex-col items-center gap-4 py-4 border-b border-border bg-black/20">
                <h1 className="text-xl font-bold text-terminal-magenta tracking-widest text-glow-subtle">LOUDMUMBLE</h1>
                <div className="h-[1px] w-[80%] bg-border/30" />
                <Navigation activeSection={props.activeSection} onNavigate={props.onNavigate} />
            </div>
        );
    }

    const themes = {
        command: <CommandCenterHUD {...props} />,
        cyber: <CyberneticHUD {...props} />,
        aggressive: <AggressiveHUD {...props} />
    };

    return (
        <div className="relative group/hud">
            {themes[theme]}

            <div className="absolute top-2 right-2 opacity-0 group-hover/hud:opacity-100 transition-opacity flex gap-1 z-50">
                {(['command', 'cyber', 'aggressive'] as const).map(t => (
                    <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`
                            px-1.5 py-0.5 text-[7px] font-mono border transition-all
                            ${theme === t ? 'bg-terminal-magenta text-white border-terminal-magenta' : 'bg-black/60 text-muted-foreground border-border hover:border-terminal-magenta/50'}
                        `}
                    >
                        {t.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Variation 2: Cybernetic (Minimalist Trace Lines)
const CyberneticHUD = ({ activeSection, onNavigate }: HUDProps) => {
    return (
        <div className="w-full flex flex-col py-6 px-10 border-b border-terminal-cyan/20 bg-black/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-terminal-cyan to-transparent animate-pulse" />

            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col gap-1">
                    <div className="text-[10px] text-terminal-cyan font-bold tracking-[0.4em]">TRACE_DETECTION: INACTIVE</div>
                    <div className="h-0.5 w-32 bg-terminal-cyan/20 overflow-hidden">
                        <div className="h-full bg-terminal-cyan w-[60%]" />
                    </div>
                </div>
                <h1 className="text-3xl font-light tracking-[0.3em] text-terminal-cyan/80">L O U D M U M B L E</h1>
                <div className="text-right flex flex-col gap-1 items-end">
                    <div className="text-[10px] text-terminal-magenta font-bold tracking-[0.2em]">SIGNAL_STRENGTH: 100%</div>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-2 h-1 bg-terminal-magenta" />)}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center gap-6">
                <div className="flex gap-12 text-[10px] font-mono text-muted-foreground">
                    <div className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-terminal-cyan" />LINK_ESTABLISHED</div>
                    <div className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-terminal-magenta" />ENCRYPT_AES_256</div>
                    <div className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-terminal-yellow" />LATENCY: 14ms</div>
                </div>
                <div className="w-full max-w-xl">
                    <Navigation activeSection={activeSection} onNavigate={onNavigate} />
                </div>
            </div>
        </div>
    );
};

// Variation 3: Aggressive (High density activity feed)
const AggressiveHUD = ({ activeSection, onNavigate }: HUDProps) => {
    const [logs, setLogs] = useState<string[]>([]);
    useEffect(() => {
        const lines = ["SYS_INIT", "MOD_LOAD", "AUTH_REQ", "NET_MAPPING", "PORT_SCAN_01", "FIREWALL_BYPASS", "PAYLOAD_INJECT"];
        const interval = setInterval(() => {
            setLogs(prev => [lines[Math.floor(Math.random() * lines.length)], ...prev].slice(0, 4));
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full flex py-4 px-6 border-b-2 border-terminal-red/40 bg-zinc-950/90 relative">
            <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-end gap-4 mb-2">
                    <h1 className="text-4xl font-black text-terminal-red leading-none italic uppercase tracking-tighter">LoudMumble</h1>
                    <div className="text-[9px] font-mono text-terminal-red/50 bg-terminal-red/10 px-1 py-0.5 border border-terminal-red/20 mb-1">
                        SEC_LEVEL: ALPHA
                    </div>
                </div>
                <div className="max-w-md">
                    <Navigation activeSection={activeSection} onNavigate={onNavigate} />
                </div>
            </div>

            <div className="w-48 flex flex-col gap-1 font-mono text-[8px] border-l border-terminal-red/20 pl-4 py-2">
                <div className="text-terminal-red/70 font-bold mb-1 underline text-[7px]">LIVE_ACTIVITY_FEED</div>
                {logs.map((log, i) => (
                    <div key={i} className="flex justify-between items-center bg-terminal-red/5 p-1 border-b border-terminal-red/5">
                        <span className="text-terminal-red/60">{log}</span>
                        <span className="text-[6px] text-terminal-red/30">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
