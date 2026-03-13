# CLAUDE.md — loudmumble-site

## What This Is

Terminal-themed security portfolio SPA at [loudmumble.com](https://loudmumble.com). Built with Vite + React 18 + TypeScript + Tailwind CSS. Deployed to GitHub Pages via GitHub Actions.

## Architecture

```
App.tsx                     # HashRouter: /, /blog/:slug, *
pages/
  Index.tsx                 # Main terminal UI — boot sequence, command handler, section rendering
  BlogPost.tsx              # Markdown blog renderer (marked + DOMPurify)
  NotFound.tsx              # 404 page
components/
  terminal/
    SystemInit.tsx           # Boot sequence animation (80ms stagger, 11 lines)
    TerminalHUD.tsx          # Header: LED ASCII banner, live stats ticker, navigation
    CommandInput.tsx         # Terminal input with history (↑/↓), tab-completion, autocomplete
    HelpOutput.tsx           # help/neofetch/whoami command outputs
    Navigation.tsx           # Nav buttons: ABOUT, SERVICES, PROJECTS, CONTACT, GITHUB
    TerminalWindow.tsx       # Window chrome wrapper
    TerminalLine.tsx         # Terminal line/divider primitives
    AsciiHeader.tsx          # ASCII art header component
  sections/
    AboutSection.tsx         # Profile, expertise, current research
    ServicesSection.tsx      # 4 services: pentest, AD, vuln research, tooling
    ProjectsSection.tsx      # 10 projects in tree view with wave badges
    SkillsSection.tsx        # Skills grid with progress bars, certs
    ContactSection.tsx       # Contact info
  ui/                        # shadcn/ui component library (40+ components)
hooks/
  useKeyboardNavigation.ts   # F1-F4 keyboard shortcuts
  use-mobile.tsx             # Mobile breakpoint detection
  use-toast.ts               # Toast notifications
lib/
  utils.ts                   # cn() utility (clsx + tailwind-merge)
public/
  blog/                      # Blog markdown files (currently empty — post removed)
  favicon.ico, favicon.svg
  robots.txt, CNAME
```

## Commands

```bash
npm run dev          # Vite dev server
npm run build        # Production build (outputs to dist/)
npm run preview      # Preview production build
npm run lint         # ESLint
npm run test         # Vitest
```

## Terminal Commands (in-app)

`help`, `about`, `services`, `projects`, `skills`, `contact`, `blog`, `github`, `enterprise`, `clear`, `whoami`, `neofetch`, `ls`, `pwd`, `date`, `uptime`, `exit`

## Key Features

- **Boot sequence**: SystemInit.tsx animates 11 lines at 80ms intervals (system, crypto, net, auth)
- **Scrollable pager**: Content area with `overflow-y-auto terminal-scrollbar`, auto-shows `about` after boot
- **10 projects**: 9 across 3 waves (Wave 1: 3 LIVE, Wave 2: 4, Wave 3: 2) + hog (private, no wave)
- **Blog system**: BlogPost.tsx fetches `/blog/{slug}.md`, renders with `marked`, sanitizes with DOMPurify. Route: `/#/blog/:slug`
- **Enterprise command**: Generic HOG reference with contact email
- **HUD**: Animated LED ASCII banner, binary/hex side streams, live fake stats ticker (RAM, GPU, inference, up/down)
- **Keyboard nav**: F1=about, F2=services, F3=projects, F4=contact, `/`=focus input, Ctrl+L=clear

## Project Data (ProjectsSection.tsx)

| Wave | Tool | Status |
|------|------|--------|
| 1 | de-voidlink | STABLE [LIVE] |
| 1 | aegis | STABLE [LIVE] |
| 1 | ebpf-sensors | STABLE [LIVE] |
| 2 | phantom | STABLE [WAVE-2] |
| 2 | dossier | STABLE [WAVE-2] |
| 2 | lamprey | STABLE [WAVE-2] |
| 2 | aisec | STABLE [WAVE-2] |
| 3 | burrow | STABLE [WAVE-3] |
| 3 | malscope | STABLE [WAVE-3] |
| — | hog | ALPHA (private) |

## Constraints

- All text uses lowercase "loudmumble" — never "LoudMumble" or "LOUDMUMBLE"
- No real name on loudmumble.com (identity separation by design)
- No `as any`, `@ts-ignore`, `@ts-expect-error`
- HOG references: generic language only, no internals
- No internal IPs, private GitLab URLs, or infrastructure details

## Current State

- `npm run build` passes clean
- Blog infrastructure ready but no published posts (DE-VoidLink post was live, removed in production polish commit 1cb4460)
- OG meta tags present in index.html but `og-image.png` not in public/ — OG preview won't render image
- Wave status teasers implemented on all project cards
- See ROADMAP.md for Phase 2+ items still open
