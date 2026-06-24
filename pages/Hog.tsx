import { useState } from 'react';
import { Check, Copy, ExternalLink, Github, Mail, ChevronRight, Terminal, Zap, Shield, Cpu, Network } from 'lucide-react';

const accent = '#33ff99';

const features = [
  {
    icon: Terminal,
    title: 'Multi-Framework C2',
    body: 'Sliver, Havoc, Empire, and Metasploit unified under one TUI. One session list, one command interface, one view of your operation.',
  },
  {
    icon: Zap,
    title: 'Real-Time Sentinel Correlation',
    body: 'Host-level behavioral alerts from Sentinel mapped to active C2 sessions automatically. No manual cross-referencing.',
  },
  {
    icon: Cpu,
    title: 'Agentic Integration',
    body: 'MCP server + marshald dispatch endpoint. Drop HOG into a Claude Code loop and let the platform run autonomous attack chains with human-gated checkpoints.',
  },
  {
    icon: Shield,
    title: 'Single Binary, No Docker',
    body: 'Embedded React UI via go:embed. One binary, one config, one systemd unit. Runs on bare metal. Nothing to orchestrate before you orchestrate.',
  },
  {
    icon: Network,
    title: 'Full Stack Out of the Box',
    body: 'Web UI, REST API, SSE real-time feeds, JWT auth, PostgreSQL persistence, scheduled command execution. Launch with hog tui — everything starts.',
  },
];

const stack = [
  'Sliver', 'Havoc', 'Empire', 'Metasploit',
  'Go', 'React', 'PostgreSQL', 'SSE', 'MCP',
];

export default function Hog() {
  const [copied, setCopied] = useState(false);
  const email = 'contact@loudmumble.com';
  const subject = 'HOG Waitlist';
  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className="min-h-screen text-white/80 font-mono"
      style={{ background: '#0a0c0b', fontFamily: "'JetBrains Mono','Fira Code',monospace" }}
    >
      {/* top bar */}
      <header className="h-9 flex items-center gap-3 px-4 border-b border-white/10 bg-black/40 text-xs sticky top-0 z-10">
        <a href="/#/" className="text-white/40 hover:text-white/70 transition flex items-center gap-1.5">
          <ChevronRight className="w-3 h-3 rotate-180" /> loudmumble.com
        </a>
        <span className="text-white/20">/</span>
        <span style={{ color: accent }}>hog</span>
        <span className="ml-auto text-white/25">Hand of God — C2 Orchestration Platform</span>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-20">

        {/* hero */}
        <section className="space-y-6">
          <div className="text-xs text-white/30">$ cat ./hog/README.md</div>
          <div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-5xl font-bold text-white tracking-tight">HOG</h1>
              <span className="text-xl font-light" style={{ color: accent }}>Hand of God</span>
            </div>
            <p className="mt-3 text-white/50 text-sm">C2 Orchestration Platform · single binary · no Docker · bare metal</p>
          </div>

          <p className="text-white/65 leading-relaxed max-w-2xl">
            The orchestration layer for the loudmumble platform. Unified session management across
            multiple C2 frameworks, real-time behavioral correlation, and agentic automation — all
            from a single Go binary with an embedded web UI.
          </p>

          {/* GIF placeholder — replace src with actual demo GIF after recording */}
          <div
            className="rounded-xl border border-white/10 overflow-hidden"
            style={{ background: '#0d100f' }}
          >
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 text-xs text-white/40">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-2">hog tui</span>
            </div>
            {/* swap the div below for: <img src="/hog-demo.gif" alt="HOG demo" className="w-full" /> */}
            <div className="flex items-center justify-center h-48 text-white/20 text-sm">
              [ demo GIF — replace this div with img tag after recording ]
            </div>
          </div>
        </section>

        {/* features */}
        <section className="space-y-4">
          <div className="text-xs text-white/30 mb-6">$ hog --capabilities</div>
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-white/10 p-5 bg-white/[0.02] flex gap-4"
            >
              <f.icon className="w-5 h-5 mt-0.5 flex-none" style={{ color: accent }} />
              <div>
                <div className="font-semibold text-white text-sm mb-1">{f.title}</div>
                <p className="text-sm text-white/50 leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </section>

        {/* stack tags */}
        <section>
          <div className="text-xs text-white/30 mb-4">$ hog version --deps</div>
          <div className="flex flex-wrap gap-2">
            {stack.map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1 rounded border border-white/10 text-white/50"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* platform context */}
        <section
          className="rounded-xl border p-6"
          style={{ borderColor: `${accent}33`, background: `${accent}08` }}
        >
          <div className="text-xs mb-3" style={{ color: accent }}>PART OF THE LOUDMUMBLE PLATFORM</div>
          <p className="text-sm text-white/60 leading-relaxed">
            HOG is the orchestration layer. The free tier — burrow, trusted, sentinel, lamprey, syscalld —
            is already on GitHub. HOG is the ceiling: where the individual tools become a coordinated platform.
          </p>
          <a
            href="https://github.com/loudmumble"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm hover:underline"
            style={{ color: accent }}
          >
            <Github className="w-4 h-4" /> github.com/loudmumble
            <ExternalLink className="w-3 h-3" />
          </a>
        </section>

        {/* founding member CTA */}
        <section className="rounded-xl border border-white/15 p-8 bg-white/[0.02] space-y-6">
          <div>
            <div className="text-xs text-white/30 mb-3">$ cat ./FOUNDING_MEMBERS.md</div>
            <h2 className="text-2xl font-bold text-white">Founding Member</h2>
            <p className="mt-2 text-white/50 text-sm">50 seats. First in, lowest price. Never increases.</p>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold" style={{ color: accent }}>$350</span>
            <span className="text-white/40 line-through text-lg">$500</span>
            <span className="text-white/40 text-sm">lifetime</span>
          </div>

          <ul className="space-y-2 text-sm text-white/60">
            {[
              'HOG — full platform access, all current + future features',
              'Full tool stack: vibe, grimoire, goodhound, full agentic pipeline',
              'Direct channel — you report a bug, it gets fixed',
              'Price locked forever at $350 — goes to $500 at 50 seats',
              'First access to everything that ships after',
            ].map((item) => (
              <li key={item} className="flex gap-2 items-start">
                <span style={{ color: accent }} className="mt-0.5">›</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2 space-y-3">
            <p className="text-xs text-white/35">
              No payment processor yet — founding members join via email. You'll hear back within 24h.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={mailtoHref}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-black text-sm"
                style={{ background: accent }}
              >
                <Mail className="w-4 h-4" /> Join Waitlist
              </a>
              <button
                onClick={copyEmail}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm border border-white/15 hover:border-white/30 transition"
              >
                {copied ? <Check className="w-4 h-4 text-[#27c93f]" /> : <Copy className="w-4 h-4" />}
                {copied ? 'copied' : 'copy email'}
              </button>
            </div>
            <p className="text-xs text-white/25">
              Subject: <span className="text-white/40">HOG Waitlist</span> · contact@loudmumble.com
            </p>
          </div>
        </section>

        {/* footer */}
        <footer className="text-xs text-white/25 flex items-center gap-4 pb-8">
          <a href="/#/" className="hover:text-white/50 transition">loudmumble.com</a>
          <span>·</span>
          <a href="https://github.com/loudmumble" target="_blank" rel="noreferrer" className="hover:text-white/50 transition">github</a>
          <span>·</span>
          <span>contact@loudmumble.com</span>
        </footer>
      </div>
    </div>
  );
}
