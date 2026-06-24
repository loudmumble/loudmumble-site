import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, Boxes, Command, Cpu, ExternalLink, Folder, Github, Mail,
  Search, Shield, Terminal, Wrench, X, ChevronRight, Check, Copy,
} from 'lucide-react';
import {
  identity, flagship, ethos, expertise, workstreams, currentResearch, services, projects,
  skillCategories, certs, contactMethods, stats, primaryLanguages, proofPoints,
} from '@/lib/portfolio-data';

// Status badge styling, driven by each project's real status (no hardcoding).
const STATUS_BADGE: Record<string, { label: string; color: string }> = {
  stable: { label: 'STABLE', color: '#d4ff3f' },
  development: { label: 'ACTIVE DEV', color: '#ffd11a' },
  alpha: { label: 'ALPHA', color: '#ff8c42' },
};

/**
 * loudmumble.com — "Mainframe"
 * An IDE-style control deck: persistent file-tree sidebar, scroll-synced
 * sections, a working ⌘K command palette, and an honest status bar. Content is
 * driven entirely by lib/portfolio-data.ts.
 */

const NAV = [
  { id: 'overview', label: 'overview.md', icon: Terminal },
  { id: 'services', label: 'services/', icon: Shield },
  { id: 'projects', label: 'projects/', icon: Boxes },
  { id: 'skills', label: 'skills.toml', icon: Cpu },
  { id: 'contact', label: 'contact.sh', icon: Mail },
] as const;

type SectionId = (typeof NAV)[number]['id'];

const accent = '#d4ff3f'; // SA chartreuse signal — aligns with the Structured Anarchy launch page
const DISPLAY = "'Anton', 'Arial Narrow', sans-serif";

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(`mf-${id}`))
      .filter((el): el is HTMLElement => !!el);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id.replace('mf-', ''));
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

const Bar = ({ level, max, color }: { level: number; max: number; color: string }) => (
  <div className="h-2 w-full bg-white/[0.04] overflow-hidden border border-white/[0.06]">
    <div
      className="h-full transition-all duration-700"
      style={{ width: `${(level / max) * 100}%`, background: color, boxShadow: `0 0 10px ${color}66` }}
    />
  </div>
);

const SectionTitle = ({ cmd, children }: { cmd: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <div className="font-mono text-xs text-white/30 mb-1">
      <span style={{ color: accent }}>loud@mumble</span>
      <span className="text-white/30">:~$ </span>
      {cmd}
    </div>
    <h2 className="text-3xl md:text-4xl text-white tracking-tight" style={{ fontFamily: DISPLAY }}>{children}</h2>
  </div>
);

export default function Index() {
  const ids = useMemo(() => NAV.map((n) => n.id), []);
  const active = useScrollSpy(ids) as SectionId;
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [clock, setClock] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === 'Escape') setPaletteOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (id: string) => {
    document.getElementById(`mf-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setPaletteOpen(false);
  };

  const paletteItems = useMemo(() => {
    const base = [
      ...NAV.map((n) => ({ label: `goto ${n.id}`, action: () => go(n.id) })),
      { label: 'open github.com/loudmumble', action: () => window.open('https://github.com/loudmumble', '_blank') },
      { label: 'copy contact@loudmumble.com', action: () => navigator.clipboard.writeText('contact@loudmumble.com') },
      ...projects.filter((p) => p.github).map((p) => ({
        label: `repo ${p.name}`,
        action: () => window.open(p.github!, '_blank'),
      })),
    ];
    return base.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const copyEmail = () => {
    navigator.clipboard.writeText('contact@loudmumble.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden text-white/80 flex flex-col font-mono"
      style={{ background: '#0a0a0b', fontFamily: "'JetBrains Mono','Fira Code',monospace" }}
    >
      <div className="sa-grid" aria-hidden />
      <div className="sa-vignette" aria-hidden />
      <div className="sa-grain" aria-hidden />

      {/* top chrome bar */}
      <header className="relative z-10 flex-none h-9 flex items-center gap-3 px-3 border-b border-white/10 bg-black/40 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-white/40">loud@mumble — ~/portfolio</span>
        <button
          onClick={() => setPaletteOpen(true)}
          className="ml-auto flex items-center gap-2 px-2 py-1 rounded border border-white/10 hover:border-white/25 text-white/40 hover:text-white/70 transition"
        >
          <Command className="w-3 h-3" /> <span className="hidden sm:inline">palette</span>
          <kbd className="hidden sm:inline text-[10px] px-1 rounded bg-white/10">⌘K</kbd>
        </button>
      </header>

      <div className="relative z-10 flex-1 flex min-h-0">
        {/* sidebar */}
        <aside className="hidden md:flex flex-col w-60 flex-none border-r border-white/10 bg-black/30">
          <div className="p-4 border-b border-white/10">
            <div className="text-2xl tracking-wide" style={{ color: accent, fontFamily: DISPLAY }}>
              {identity.handle}
            </div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-white/40 mt-1">{identity.role}</div>
          </div>
          <nav className="p-2 space-y-0.5">
            {NAV.map((n) => {
              const on = active === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition group"
                  style={on ? { background: `${accent}14`, color: accent } : undefined}
                >
                  <n.icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                  <span className={on ? '' : 'text-white/55 group-hover:text-white/85'}>{n.label}</span>
                  {on && <ChevronRight className="w-3 h-3 ml-auto" />}
                </button>
              );
            })}
          </nav>
          <div className="mt-auto p-4 border-t border-white/10 text-[11px] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white/35">public repos</span>
              <span style={{ color: accent }}>{stats.publicRepos}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/35">languages</span>
              <span className="text-white/70">{stats.languages}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/35">status</span>
              <span className="flex items-center gap-1 text-[#27c93f]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f] animate-pulse" /> online
              </span>
            </div>
          </div>
        </aside>

        {/* main scroll panel */}
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <div className="max-w-4xl mx-auto px-6 md:px-10 py-12 space-y-24">
            {/* overview */}
            <section id="mf-overview" className="scroll-mt-12">
              <div
                className="rounded-xl border border-white/10 p-8 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(51,255,153,0.05), transparent 60%)' }}
              >
                <div className="text-xs text-white/40 mb-4">$ whoami && cat overview.md</div>
                <h1 className="text-5xl md:text-7xl text-white leading-[0.9] tracking-tight" style={{ fontFamily: DISPLAY }}>
                  {identity.handle}
                </h1>
                <p className="mt-2 text-xs sm:text-sm uppercase tracking-[0.22em] text-white/45">{identity.role}</p>
                <p className="mt-4 text-lg italic" style={{ color: accent }}>“{identity.tagline}”</p>
                <p className="mt-4 text-white/55 leading-relaxed max-w-2xl">{identity.blurb}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="https://github.com/loudmumble" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-black"
                    style={{ background: accent }}>
                    <Github className="w-4 h-4" /> github
                  </a>
                  <button onClick={() => go('contact')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-white/15 hover:border-white/30 transition">
                    <Mail className="w-4 h-4" /> get in touch
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {proofPoints.map((p) => (
                    <div key={p.label} className="rounded-lg border border-white/10 p-3 bg-black/30 text-center">
                      <div className="text-lg font-bold" style={{ color: accent }}>{p.value}</div>
                      <div className="text-[10px] text-white/60 font-semibold mt-0.5">{p.label}</div>
                      <div className="text-[9px] text-white/30 mt-0.5 leading-tight">{p.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* flagship — a named PROJECT, kept distinct from the identity above; links to its launch page */}
              <Link to="/structured-anarchy" className="group block mt-6 rounded-xl border p-6 relative overflow-hidden transition-colors"
                style={{ borderColor: `${accent}40`, background: `linear-gradient(135deg, ${accent}0d, transparent 65%)` }}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">flagship project</span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-bold" style={{ background: `${accent}1a`, color: accent }}>{flagship.status}</span>
                </div>
                <div className="mt-2 flex items-baseline gap-3 flex-wrap">
                  <h3 className="text-3xl md:text-4xl text-white tracking-tight" style={{ fontFamily: DISPLAY }}>{flagship.name}</h3>
                  <span className="text-xs text-white/40">{flagship.kind}</span>
                  <span className="ml-auto text-2xl" style={{ color: accent, fontFamily: DISPLAY }}>{flagship.metric}</span>
                </div>
                <p className="mt-3 text-sm text-white/55 leading-relaxed max-w-3xl">{flagship.blurb}</p>
                <div className="mt-4 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: accent }}>
                  View the launch page <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div className="rounded-lg border border-white/10 p-5 bg-white/[0.02]">
                  <div className="text-xs uppercase tracking-wider text-white/35 mb-3 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5" /> expertise
                  </div>
                  <ul className="space-y-2 text-sm">
                    {expertise.map((e) => (
                      <li key={e} className="flex gap-2 text-white/60">
                        <span style={{ color: accent }}>›</span>{e}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg border border-white/10 p-5 bg-white/[0.02]">
                    <div className="text-xs uppercase tracking-wider text-white/35 mb-3">workstreams</div>
                    <div className="flex flex-wrap gap-2">
                      {workstreams.map((w) => (
                        <span key={w} className="text-xs px-2 py-1 rounded border border-white/10 text-white/60">{w}</span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg p-5 border" style={{ borderColor: `${accent}33`, background: `${accent}0a` }}>
                    <div className="text-xs uppercase tracking-wider mb-2" style={{ color: accent }}>current research</div>
                    <p className="text-sm text-white/65 leading-relaxed">{currentResearch}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* services */}
            <section id="mf-services" className="scroll-mt-12">
              <SectionTitle cmd="ls -la ./services/">What I do</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((s) => (
                  <div key={s.title}
                    className="group rounded-lg border border-white/10 p-5 bg-white/[0.02] hover:bg-white/[0.04] transition"
                    style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench className="w-4 h-4" style={{ color: accent }} />
                      <h3 className="font-semibold text-white">{s.title}</h3>
                    </div>
                    <p className="text-sm text-white/55 leading-relaxed">{s.description}</p>
                    <div className="mt-3 text-[11px] text-white/40">
                      [{s.tag}] <span style={{ color: accent }}>{s.tagValue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* projects */}
            <section id="mf-projects" className="scroll-mt-12">
              <SectionTitle cmd="tree ./projects/ --show-status">
                {stats.publicRepos} tools on GitHub
              </SectionTitle>
              <div className="space-y-2">
                {projects.map((p) => (
                  <a key={p.name} href={p.github} target="_blank" rel="noreferrer"
                    className="group block rounded-lg border border-white/10 p-4 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Folder className="w-4 h-4 text-white/40" />
                      <span className="font-semibold text-white group-hover:text-[#33ff99] transition">{p.name}</span>
                      {(() => {
                        const badge = STATUS_BADGE[p.status] ?? STATUS_BADGE.stable;
                        return (
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-bold"
                            style={{ background: `${badge.color}1a`, color: badge.color }}>{badge.label}</span>
                        );
                      })()}
                      <ExternalLink className="w-3.5 h-3.5 ml-auto text-white/25 group-hover:text-white/60 transition" />
                    </div>
                    <p className="mt-2 text-sm text-white/50 leading-relaxed">{p.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded border border-white/10 text-white/45">{t}</span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-4 text-xs text-white/35">
                <span style={{ color: accent }}>{stats.publicRepos}</span> public repositories ·{' '}
                <span className="text-white/45">{primaryLanguages.join(' · ')}</span>
              </div>
            </section>

            {/* skills */}
            <section id="mf-skills" className="scroll-mt-12">
              <SectionTitle cmd="cat skills.toml">Capabilities</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-6">
                {skillCategories.map((cat) => (
                  <div key={cat.name} className="rounded-lg border border-white/10 p-5 bg-white/[0.02]">
                    <div className="text-xs font-bold mb-4 pb-2 border-b border-white/10" style={{ color: cat.accent }}>
                      [{cat.name}]
                    </div>
                    <div className="space-y-3">
                      {cat.skills.map((sk) => (
                        <div key={sk.name}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-white/65">{sk.name}</span>
                            <span className="text-white/35">{Math.round((sk.level / sk.max) * 100)}%</span>
                          </div>
                          <Bar level={sk.level} max={sk.max} color={cat.accent} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-white/35 w-20 shrink-0">certified</span>
                  {certs.earned.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded border"
                      style={{ borderColor: `${accent}55`, color: accent }}>{c}</span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-white/35 w-20 shrink-0">in progress</span>
                  {certs.inProgress.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded border border-[#ffd11a]/30 text-[#ffd11a]">{c}</span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-white/35 w-20 shrink-0">training</span>
                  {certs.training.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded border border-white/10 text-white/45">{c}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* contact */}
            <section id="mf-contact" className="scroll-mt-12 pb-16">
              <SectionTitle cmd="./contact.sh">Establish channel</SectionTitle>
              <div className="rounded-xl border border-white/10 p-8 bg-white/[0.02]">
                <p className="text-white/55 mb-6">Encrypted channels preferred. PGP available on request.</p>
                <div className="space-y-3">
                  {contactMethods.map((m) => (
                    <div key={m.label} className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-black/20">
                      {m.kind === 'email' ? <Mail className="w-4 h-4" style={{ color: accent }} /> : <Github className="w-4 h-4" style={{ color: accent }} />}
                      <div className="flex-1">
                        <div className="text-[10px] text-white/35">[{m.label}]</div>
                        <a href={m.href} target={m.kind === 'link' ? '_blank' : undefined} rel="noreferrer"
                          className="text-sm font-medium hover:underline" style={{ color: accent }}>{m.value}</a>
                      </div>
                      {m.kind === 'email' && (
                        <button onClick={copyEmail} className="p-2 text-white/40 hover:text-white transition">
                          {copied ? <Check className="w-4 h-4 text-[#27c93f]" /> : <Copy className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* status bar */}
      <footer className="relative z-10 flex-none h-7 flex items-center gap-4 px-3 border-t border-white/10 bg-black/50 text-[11px] text-white/40">
        <span style={{ color: accent }}>● SECURE</span>
        <span>~/portfolio/{active}</span>
        <span className="hidden sm:inline">UTF-8</span>
        <span className="hidden sm:inline">main</span>
        <span className="hidden lg:block flex-1 text-center italic text-white/25 truncate px-4">
          &ldquo;{ethos}&rdquo;
        </span>
        <span className="ml-auto lg:ml-0">{clock.toLocaleTimeString()}</span>
        <span>{identity.version}</span>
      </footer>

      {/* command palette */}
      {paletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm"
          onClick={() => setPaletteOpen(false)}>
          <div className="w-full max-w-lg mx-4 rounded-xl border border-white/15 bg-[#0d100f] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 px-4 border-b border-white/10">
              <Search className="w-4 h-4 text-white/40" />
              <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="type a command…"
                className="flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/30" />
              <button onClick={() => setPaletteOpen(false)}><X className="w-4 h-4 text-white/40" /></button>
            </div>
            <div className="max-h-72 overflow-y-auto py-2">
              {paletteItems.length === 0 && (
                <div className="px-4 py-3 text-sm text-white/30">no matches</div>
              )}
              {paletteItems.map((it) => (
                <button key={it.label} onClick={it.action}
                  className="w-full text-left px-4 py-2 text-sm text-white/65 hover:bg-white/5 hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-white/25" /> {it.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
