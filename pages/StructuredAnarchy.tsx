import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Crosshair, Network, ShieldCheck, Radar, ScanSearch, Biohazard, Cpu, Skull,
  Waypoints, RadioTower, FlaskConical, FolderSync, SquareTerminal, BrainCircuit,
  Waves, Fingerprint, FileSearch, Share2, FileText, Hexagon, ArrowLeft, type LucideIcon,
} from 'lucide-react';
import { SA_FLEET, type SANode } from '@/lib/sa-fleet';
import { SA_TAGLINES, SA_MARQUEE, SA_PILLARS, SA_TRUST } from '@/lib/sa-content';
import { ACCENT, VOID, DISPLAY, MONO, hud } from '@/lib/sa-theme';

const ICONS: Record<string, LucideIcon> = {
  hog: Crosshair, marshald: Network, aegis: ShieldCheck, sentinel: Radar, phantom: ScanSearch,
  malscope: Biohazard, syscalld: Cpu, 'de-voidlink': Skull, burrow: Waypoints, feedback: RadioTower,
  fester: FlaskConical, grip: FolderSync, vibe: SquareTerminal, mojodojo: BrainCircuit, lamprey: Waves,
  glass: Fingerprint, dossier: FileSearch, fenrir: Share2, 'report-ng': FileText,
};
// category display metadata comes straight from the generated feed (the real `cat` taxonomy)
const CAT_META: Record<string, { id: string; label: string; color: string; count: number }> =
  Object.fromEntries(SA_FLEET.cats.map((c) => [c.id, c]));

function Card({ n }: { n: SANode }) {
  const meta = CAT_META[n.cat];
  const c = meta?.color ?? '#8a8a93';
  const Icon = ICONS[n.id] ?? Hexagon;
  return (
    <div className="relative p-4 border transition-colors group" style={{ borderColor: '#24242a', background: 'rgba(255,255,255,0.015)' }}>
      <div className="absolute left-0 top-0 h-full" style={{ width: 2, background: c, opacity: 0.55 }} />
      <div className="flex items-start justify-between gap-2">
        <Icon className="w-6 h-6" strokeWidth={1.6} style={{ color: '#e9e7e0' }} />
        <span style={hud({ fontSize: 9, color: c })}>{meta?.label ?? n.cat}</span>
      </div>
      <div className="mt-3 text-lg leading-none" style={{ fontFamily: DISPLAY, letterSpacing: '0.02em', color: '#e9e7e0' }}>{n.label}</div>
      <p className="mt-2 leading-snug" style={{ fontSize: 11, color: '#76766f', minHeight: 28 }}>{n.tagline}</p>
      <div className="mt-3 pt-2 flex items-center justify-between gap-2 border-t" style={{ borderColor: '#24242a', ...hud({ fontSize: 9 }) }}>
        {n.awaiting
          ? <span style={{ color: '#ffb454' }}>awaiting integration</span>
          : <span className="truncate" title={n.status}>{n.version ?? 'untagged'}{n.commits_since_tag ? ` +${n.commits_since_tag}` : ''}</span>}
        <span style={{ color: n.mcp ? ACCENT : '#46464a' }} title={n.mcp ? 'MCP server present — agentic control' : 'awaiting MCP / agentic wiring'}>{n.mcp ? '⬡ agentic' : (n.last_commit ?? '')}</span>
      </div>
    </div>
  );
}

export default function StructuredAnarchy() {
  const [ti, setTi] = useState(0);
  const [filter, setFilter] = useState<string>('all');
  useEffect(() => { const id = setInterval(() => setTi((i) => (i + 1) % SA_TAGLINES.length), 3600); return () => clearInterval(id); }, []);

  // the whole fleet — one product, grouped by the real `cat` taxonomy (no fabricated splits)
  const shown = useMemo(() => (filter === 'all' ? SA_FLEET.nodes : SA_FLEET.nodes.filter((n) => n.cat === filter)), [filter]);

  const stats = [
    { v: String(SA_FLEET.stats.nodes), l: 'fleet units' },
    { v: String(SA_FLEET.stats.mcp), l: 'agentic · MCP' },
    { v: String(SA_FLEET.stats.awaiting), l: 'awaiting integ.' },
    { v: String(SA_FLEET.stats.edges), l: 'wired flows' },
  ];

  return (
    <div style={{ background: VOID, color: '#e9e7e0', fontFamily: MONO, minHeight: '100vh' }}>
      {/* atmosphere (shared with the portfolio) */}
      <div className="sa-grid" aria-hidden />
      <div className="sa-vignette" aria-hidden />
      <div className="sa-grain" aria-hidden />

      {/* nav */}
      <header className="sticky top-0 z-50 border-b" style={{ borderColor: '#24242a', background: 'rgba(10,10,11,0.8)', backdropFilter: 'blur(6px)' }}>
        <div className="max-w-[1400px] mx-auto px-5 h-11 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80" style={hud()}>
            <ArrowLeft className="w-3.5 h-3.5" /> loudmumble
          </Link>
          <span style={{ fontFamily: DISPLAY, fontSize: 15, letterSpacing: '0.06em' }}>STRUCTURED&nbsp;ANARCHY</span>
          <span style={hud()}>v1.0.0-rc1</span>
        </div>
      </header>

      <main className="relative" style={{ zIndex: 10 }}>
        {/* hero */}
        <section className="max-w-[1400px] mx-auto px-5 pt-20 md:pt-28 pb-14">
          <p style={hud()}><span style={{ color: ACCENT }}>▶ </span>an agentic operator platform · {SA_FLEET.stats.nodes}-unit fleet · built solo</p>
          <h1 className="mt-5 leading-[0.84]" style={{ fontFamily: DISPLAY }}>
            <span className="block" style={{ fontSize: 'clamp(3rem,13vw,10rem)' }}>STRUCTURED</span>
            <span className="block" style={{ fontSize: 'clamp(3rem,13vw,10rem)', color: ACCENT }}>ANARCHY</span>
          </h1>
          <div className="mt-7 grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <p className="text-sm md:text-base max-w-xl leading-relaxed" style={{ color: '#76766f' }}>
                One operator directing a coordinated swarm across offensive, defensive, and purple-team work — a true force exponentiator.
              </p>
              <p key={ti} className="mt-5 h-7 text-lg md:text-2xl" style={{ fontFamily: DISPLAY, letterSpacing: '0.02em' }}>
                <span style={{ color: ACCENT }}>“</span>{SA_TAGLINES[ti]}<span style={{ color: ACCENT }}>”</span>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#fleet" className="px-6 py-3 text-[13px] font-bold uppercase tracking-widest" style={{ background: ACCENT, color: VOID, fontFamily: MONO }}>▚ Explore the fleet</a>
                <Link to="/" className="px-6 py-3 text-[13px] uppercase tracking-widest border" style={{ borderColor: '#24242a', color: '#76766f', fontFamily: MONO }}>← The operator</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 border w-full lg:w-auto" style={{ borderColor: '#24242a', gap: 1, background: '#24242a' }}>
              {stats.map((s) => (
                <div key={s.l} className="px-5 py-4 lg:w-[150px]" style={{ background: VOID }}>
                  <div className="text-4xl leading-none" style={{ fontFamily: DISPLAY }}>{s.v}</div>
                  <div className="mt-2" style={hud()}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* marquee */}
        <div className="border-y overflow-hidden whitespace-nowrap" style={{ borderColor: '#24242a', background: 'rgba(15,15,18,0.4)' }}>
          <div className="py-3 inline-flex" style={{ animation: 'sa-marquee 38s linear infinite' }}>
            {[...SA_MARQUEE, ...SA_MARQUEE].map((m, i) => (
              <span key={i} className="px-6 inline-flex items-center gap-6" style={{ fontFamily: DISPLAY, fontSize: 14, letterSpacing: '0.2em', color: '#76766f' }}>
                {m}<span style={{ color: ACCENT, fontSize: 11 }}>◆</span>
              </span>
            ))}
          </div>
        </div>
        <style>{`@keyframes sa-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>

        {/* fleet */}
        <section id="fleet" className="max-w-[1400px] mx-auto px-5 py-20 md:py-24" style={{ scrollMarginTop: 48 }}>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b pb-4" style={{ borderColor: '#24242a' }}>
            <div>
              <span style={hud()}>§01 / the fleet</span>
              <h2 className="mt-2 text-4xl md:text-6xl" style={{ fontFamily: DISPLAY }}>THE FLEET, NOT A PITCH</h2>
              <p className="mt-3 text-sm max-w-lg" style={{ color: '#76766f' }}>Every unit generated from the real repositories — category, version, and last-commit read straight from the code{SA_FLEET.derived_at ? `, ${SA_FLEET.derived_at.slice(0, 10)}` : ''}. Nothing hand-typed.</p>
            </div>
            <div className="flex flex-wrap border" style={{ borderColor: '#24242a', gap: 1, background: '#24242a' }}>
              {[{ id: 'all', label: 'ALL', color: ACCENT, count: SA_FLEET.stats.nodes }, ...SA_FLEET.cats].map((f) => {
                const on = filter === f.id;
                return <button key={f.id} onClick={() => setFilter(f.id)} className="px-3 py-2" style={{ ...hud(), background: on ? '#15151a' : VOID, color: on ? f.color : '#76766f' }}>{f.label} · {f.count}</button>;
              })}
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {shown.map((n) => <Card key={n.id} n={n} />)}
          </div>
        </section>

        {/* thesis */}
        <section className="border-y" style={{ borderColor: '#24242a', background: 'rgba(15,15,18,0.3)' }}>
          <div className="max-w-[1400px] mx-auto px-5 py-20 md:py-24">
            <span style={hud()}>§02 / the thesis</span>
            <h2 className="mt-2 text-4xl md:text-6xl max-w-3xl" style={{ fontFamily: DISPLAY }}>LET GO <span style={{ color: ACCENT }}>AND</span> TAKE CONTROL</h2>
            <div className="mt-10 grid md:grid-cols-2 border" style={{ borderColor: '#24242a', gap: 1, background: '#24242a' }}>
              {SA_PILLARS.map((p) => (
                <div key={p.n} className="p-6 md:p-8" style={{ background: VOID }}>
                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl leading-none" style={{ fontFamily: DISPLAY, color: '#46464a' }}>{p.n}</span>
                    <h3 className="text-xl md:text-2xl" style={{ fontFamily: DISPLAY, letterSpacing: '0.02em' }}>{p.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed md:pl-[4.5rem]" style={{ color: '#76766f' }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* trust */}
        <section className="max-w-[1400px] mx-auto px-5 py-20 md:py-24">
          <div className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16">
            <div className="max-w-sm">
              <span style={hud()}>§03 / trust, built out</span>
              <h2 className="mt-2 text-4xl md:text-5xl" style={{ fontFamily: DISPLAY }}>DON'T TRUST<br />THE AGENTS.</h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: '#76766f' }}>The platform doesn't either. Identity is proven by the channel, not declared in a request. Authority can only narrow. Every action answers to one sovereign — and one kill-switch.</p>
            </div>
            <div className="grid border self-start w-full" style={{ borderColor: '#24242a', gap: 1, background: '#24242a' }}>
              {SA_TRUST.map((t) => (
                <div key={t.k} className="grid sm:grid-cols-[200px_1fr] gap-1 sm:gap-6 px-5 py-4" style={{ background: VOID }}>
                  <div style={hud({ color: ACCENT })}>{t.k}</div>
                  <div className="text-sm leading-snug" style={{ color: 'rgba(233,231,224,0.9)' }}>{t.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* footer */}
        <footer className="border-t" style={{ borderColor: '#24242a' }}>
          <div className="max-w-[1400px] mx-auto px-5 py-16 md:py-24">
            <span style={hud()}>§04 / access</span>
            <h2 className="mt-3 text-5xl md:text-7xl leading-[0.85]" style={{ fontFamily: DISPLAY }}>IT JUST HASN'T<br /><span style={{ color: ACCENT }}>BEEN DONE YET.</span></h2>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="mailto:contact@loudmumble.com?subject=Structured%20Anarchy" className="px-7 py-4 text-[13px] font-bold uppercase tracking-widest" style={{ background: ACCENT, color: VOID }}>▚ Request access</a>
              <Link to="/" className="text-[13px] uppercase tracking-widest" style={hud()}>← Back to the portfolio</Link>
            </div>
          </div>
          <div className="border-t" style={{ borderColor: '#24242a' }}>
            <div className="max-w-[1400px] mx-auto px-5 py-6 flex flex-wrap items-center justify-between gap-3">
              <span style={{ fontFamily: DISPLAY, fontSize: 14, letterSpacing: '0.06em' }}>STRUCTURED ANARCHY</span>
              <span style={hud()}>by loudmumble · an agentic operator platform</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
