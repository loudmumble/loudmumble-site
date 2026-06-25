import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Github, Mail, Copy, Check, ArrowUpRight, ChevronRight, Crosshair, Waypoints, KeyRound,
  Radar, Waves, ShieldCheck, Cpu, Lock, ScanSearch, Skull, Hash, BookText, Boxes, type LucideIcon,
} from 'lucide-react';
import {
  identity, flagship, ethos, expertise, currentResearch, services, projects,
  skillCategories, certs, contactMethods, proofPoints, primaryLanguages,
} from '@/lib/portfolio-data';
import { ACCENT, VOID, INK, DIM, FAINT, LINE, DISPLAY, MONO, hud } from '@/lib/sa-theme';
import { SA_FLEET } from '@/lib/sa-fleet';

const STATUS_COLOR: Record<string, string> = { stable: ACCENT, development: '#ffd11a', alpha: '#ff8c42' };
const PROJECT_ICON: Record<string, LucideIcon> = {
  hog: Crosshair, burrow: Waypoints, trusted: KeyRound, sentinel: Radar, lamprey: Waves,
  aegis: ShieldCheck, syscalld: Cpu, 'mtls-core': Lock, pry: ScanSearch, 'de-voidlink': Skull,
  'crack-ng': Hash, grimoire: BookText, '00_oneoffs': Boxes,
};

const NAV = [
  { id: 'services', label: 'What I do' },
  { id: 'arsenal', label: 'Arsenal' },
  { id: 'skills', label: 'Capabilities' },
  { id: 'contact', label: 'Contact' },
];

function SectionHead({ n, kicker, title, sub }: { n: string; kicker: string; title: string; sub?: string }) {
  return (
    <div className="border-b pb-4" style={{ borderColor: LINE }}>
      <span style={hud()}>§{n} / {kicker}</span>
      <h2 className="mt-2 text-4xl md:text-6xl" style={{ fontFamily: DISPLAY, color: INK }}>{title}</h2>
      {sub && <p className="mt-3 text-sm max-w-xl leading-relaxed" style={{ color: DIM }}>{sub}</p>}
    </div>
  );
}

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export default function Index() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => { navigator.clipboard.writeText('contact@loudmumble.com'); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  const marquee = [...expertise.map((e) => e.split(':')[0].toUpperCase()), 'AVAILABLE FOR SENIOR RED-TEAM ROLES'];

  return (
    <div style={{ background: VOID, color: INK, fontFamily: MONO, minHeight: '100vh' }}>
      <div className="sa-grid" aria-hidden />
      <div className="sa-vignette" aria-hidden />
      <div className="sa-grain" aria-hidden />

      {/* nav */}
      <header className="sticky top-0 z-50 border-b" style={{ borderColor: LINE, background: 'rgba(10,10,11,0.82)', backdropFilter: 'blur(6px)' }}>
        <div className="max-w-[1200px] mx-auto px-5 h-11 flex items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            <span style={{ color: ACCENT }}>▚</span>
            <span style={{ fontFamily: DISPLAY, fontSize: 15, letterSpacing: '0.06em' }}>LOUDMUMBLE</span>
          </span>
          <nav className="hidden md:flex items-center gap-5">
            {NAV.map((n) => <button key={n.id} onClick={() => go(n.id)} style={hud()} className="hover:!text-white transition-colors">{n.label}</button>)}
          </nav>
          <span className="flex items-center gap-1.5" style={hud()}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }} /> open to work
          </span>
        </div>
      </header>

      <main className="relative" style={{ zIndex: 10 }}>
        {/* hero */}
        <section className="max-w-[1200px] mx-auto px-5 pt-20 md:pt-28 pb-14">
          <p style={hud()}><span style={{ color: ACCENT }}>▶ </span>$ whoami</p>
          <h1 className="mt-4 leading-[0.84]" style={{ fontFamily: DISPLAY }}>
            <span className="block" style={{ fontSize: 'clamp(3rem,14vw,11rem)' }}>LOUD<span style={{ color: ACCENT }}>MUMBLE</span></span>
          </h1>
          <p className="mt-3" style={hud({ fontSize: 13, letterSpacing: '0.22em' })}>{identity.role}</p>
          <p className="mt-5 text-lg md:text-2xl" style={{ fontFamily: DISPLAY, letterSpacing: '0.02em', color: INK }}>
            <span style={{ color: ACCENT }}>“</span>{identity.tagline}<span style={{ color: ACCENT }}>”</span>
          </p>
          <p className="mt-5 text-sm md:text-base max-w-2xl leading-relaxed" style={{ color: DIM }}>{identity.blurb}</p>

          <div className="mt-8 grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div className="flex flex-wrap gap-3">
              <a href="https://github.com/loudmumble" target="_blank" rel="noreferrer" className="px-6 py-3 text-[13px] font-bold uppercase tracking-widest inline-flex items-center gap-2" style={{ background: ACCENT, color: VOID }}>
                <Github className="w-4 h-4" /> github
              </a>
              <button onClick={() => go('contact')} className="px-6 py-3 text-[13px] uppercase tracking-widest border inline-flex items-center gap-2" style={{ borderColor: LINE, color: DIM }}>
                <Mail className="w-4 h-4" /> get in touch
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 border w-full lg:w-auto" style={{ borderColor: LINE, gap: 1, background: LINE }}>
              {proofPoints.map((p) => (
                <div key={p.label} className="px-5 py-4 lg:w-[180px]" style={{ background: VOID }}>
                  <div className="text-3xl leading-none" style={{ fontFamily: DISPLAY, color: ACCENT }}>{p.value}</div>
                  <div className="mt-2" style={hud({ fontSize: 10 })}>{p.label}</div>
                  <div className="mt-1 leading-tight" style={{ fontSize: 9, color: FAINT }}>{p.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* marquee */}
        <div className="border-y overflow-hidden whitespace-nowrap" style={{ borderColor: LINE, background: 'rgba(15,15,18,0.4)' }}>
          <div className="py-3 inline-flex" style={{ animation: 'sa-mq 40s linear infinite' }}>
            {[...marquee, ...marquee].map((m, i) => (
              <span key={i} className="px-6 inline-flex items-center gap-6" style={{ fontFamily: DISPLAY, fontSize: 13, letterSpacing: '0.2em', color: DIM }}>{m}<span style={{ color: ACCENT, fontSize: 11 }}>◆</span></span>
            ))}
          </div>
        </div>
        <style>{`@keyframes sa-mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>

        {/* flagship */}
        <section className="max-w-[1200px] mx-auto px-5 pt-16">
          <Link to="/structured-anarchy" className="group block border p-6 md:p-8 relative overflow-hidden transition-colors" style={{ borderColor: `${ACCENT}40`, background: `linear-gradient(135deg, ${ACCENT}0e, transparent 65%)` }}>
            <div className="flex items-center justify-between">
              <span style={hud()}>flagship project</span>
              <span className="text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider" style={{ background: `${ACCENT}1a`, color: ACCENT }}>{flagship.status}</span>
            </div>
            <div className="mt-2 flex items-baseline gap-3 flex-wrap">
              <h3 className="text-4xl md:text-5xl" style={{ fontFamily: DISPLAY, color: INK }}>{flagship.name.toUpperCase()}</h3>
              <span className="text-xs" style={{ color: DIM }}>{flagship.kind}</span>
              <span className="ml-auto text-3xl" style={{ fontFamily: DISPLAY, color: ACCENT }}>{SA_FLEET.stats.nodes} units</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed max-w-3xl" style={{ color: DIM }}>{flagship.blurb}</p>
            <div className="mt-4 inline-flex items-center gap-1 group-hover:gap-2 transition-all text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>View the launch page <ChevronRight className="w-3.5 h-3.5" /></div>
          </Link>
        </section>

        {/* §01 services */}
        <section id="services" className="max-w-[1200px] mx-auto px-5 py-16 md:py-20" style={{ scrollMarginTop: 48 }}>
          <SectionHead n="01" kicker="services" title="WHAT I DO" sub={currentResearch} />
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {services.map((s) => (
              <div key={s.title} className="relative p-5 border transition-colors hover:bg-white/[0.02]" style={{ borderColor: LINE }}>
                <div className="absolute left-0 top-0 h-full" style={{ width: 2, background: ACCENT, opacity: 0.4 }} />
                <h3 className="text-xl" style={{ fontFamily: DISPLAY, color: INK }}>{s.title.toUpperCase()}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: DIM }}>{s.description}</p>
                <div className="mt-3 pt-2 border-t" style={{ borderColor: LINE, ...hud({ fontSize: 9 }) }}>[{s.tag}] <span style={{ color: ACCENT }}>{s.tagValue}</span></div>
              </div>
            ))}
          </div>
        </section>

        {/* §02 arsenal */}
        <section id="arsenal" className="border-y" style={{ borderColor: LINE, background: 'rgba(15,15,18,0.3)' }}>
          <div className="max-w-[1200px] mx-auto px-5 py-16 md:py-20" style={{ scrollMarginTop: 48 }}>
            <SectionHead n="02" kicker="github.com/loudmumble" title="THE ARSENAL" sub={`${projects.length} public tools · ${primaryLanguages.join(' · ')}. Single-binary, no Docker.`} />
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {projects.map((p) => {
                const Icon = PROJECT_ICON[p.name] ?? Boxes;
                const c = STATUS_COLOR[p.status] ?? ACCENT;
                return (
                  <a key={p.name} href={p.github} target="_blank" rel="noreferrer" className="group relative p-4 border transition-colors hover:bg-white/[0.03]" style={{ borderColor: LINE, background: VOID }}>
                    <div className="absolute left-0 top-0 h-full" style={{ width: 2, background: c, opacity: 0.5 }} />
                    <div className="flex items-start justify-between gap-2">
                      <Icon className="w-5 h-5" strokeWidth={1.6} style={{ color: INK }} />
                      <ArrowUpRight className="w-4 h-4 opacity-30 group-hover:opacity-80 transition-opacity" />
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-lg" style={{ fontFamily: DISPLAY, letterSpacing: '0.02em', color: INK }}>{p.name}</span>
                      <span className="text-[9px] px-1.5 py-0.5 font-bold uppercase" style={{ background: `${c}1a`, color: c }}>{p.status === 'development' ? 'dev' : p.status}</span>
                    </div>
                    <p className="mt-2 text-[12px] leading-snug" style={{ color: DIM, minHeight: 54 }}>{p.description.length > 150 ? p.description.slice(0, 148) + '…' : p.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {p.tech.map((t) => <span key={t} className="text-[9px] px-1.5 py-0.5 border" style={{ borderColor: LINE, color: FAINT }}>{t}</span>)}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* §03 capabilities */}
        <section id="skills" className="max-w-[1200px] mx-auto px-5 py-16 md:py-20" style={{ scrollMarginTop: 48 }}>
          <SectionHead n="03" kicker="skills.toml" title="CAPABILITIES" />
          <div className="mt-6 grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {skillCategories.map((cat) => (
              <div key={cat.name}>
                <div className="pb-2 mb-3 border-b" style={{ borderColor: LINE, ...hud({ color: cat.accent }) }}>[{cat.name}]</div>
                <div className="space-y-3">
                  {cat.skills.map((sk) => (
                    <div key={sk.name}>
                      <div className="flex justify-between mb-1" style={{ fontSize: 12 }}>
                        <span style={{ color: INK }}>{sk.name}</span>
                        <span style={{ color: DIM }}>{Math.round((sk.level / sk.max) * 100)}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.06)' }}>
                        <div className="h-full transition-all duration-700" style={{ width: `${(sk.level / sk.max) * 100}%`, background: cat.accent, boxShadow: `0 0 10px ${cat.accent}66` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-2">
            {[['certified', certs.earned, ACCENT], ['in progress', certs.inProgress, '#ffd11a'], ['training', certs.training, FAINT]].map(([label, list, color]) => (
              <div key={label as string} className="flex flex-wrap items-center gap-2">
                <span style={{ ...hud({ fontSize: 10 }), width: 90 }}>{label as string}</span>
                {(list as string[]).map((c) => <span key={c} className="px-2 py-0.5 border text-[11px]" style={{ borderColor: `${color as string}55`, color: color as string }}>{c}</span>)}
              </div>
            ))}
          </div>
        </section>

        {/* §04 contact */}
        <section id="contact" className="border-t" style={{ borderColor: LINE }}>
          <div className="max-w-[1200px] mx-auto px-5 py-16 md:py-24" style={{ scrollMarginTop: 48 }}>
            <span style={hud()}>§04 / contact</span>
            <h2 className="mt-3 text-5xl md:text-7xl leading-[0.85]" style={{ fontFamily: DISPLAY }}>ESTABLISH<br /><span style={{ color: ACCENT }}>CHANNEL.</span></h2>
            <p className="mt-4 text-sm" style={{ color: DIM }}>Encrypted channels preferred. PGP available on request. Available for senior red-team roles and consulting.</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-3 max-w-2xl">
              {contactMethods.map((m) => (
                <div key={m.label} className="flex items-center gap-3 p-4 border" style={{ borderColor: LINE }}>
                  {m.kind === 'email' ? <Mail className="w-4 h-4" style={{ color: ACCENT }} /> : <Github className="w-4 h-4" style={{ color: ACCENT }} />}
                  <div className="flex-1 min-w-0">
                    <div style={hud({ fontSize: 9 })}>[{m.label}]</div>
                    <a href={m.href} target={m.kind === 'link' ? '_blank' : undefined} rel="noreferrer" className="text-sm hover:underline truncate block" style={{ color: ACCENT }}>{m.value}</a>
                  </div>
                  {m.kind === 'email' && <button onClick={copyEmail} className="p-1.5" style={{ color: DIM }}>{copied ? <Check className="w-4 h-4" style={{ color: ACCENT }} /> : <Copy className="w-4 h-4" />}</button>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* footer */}
        <footer className="border-t" style={{ borderColor: LINE }}>
          <div className="max-w-[1200px] mx-auto px-5 py-6 flex flex-wrap items-center justify-between gap-3">
            <span style={{ fontFamily: DISPLAY, fontSize: 14, letterSpacing: '0.06em' }}>LOUDMUMBLE</span>
            <span className="italic w-full md:w-auto order-last md:order-none text-center md:text-left" style={{ ...hud({ textTransform: 'none', letterSpacing: '0.02em' }) }}>“{ethos}”</span>
            <span style={hud()}>{identity.version}</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
