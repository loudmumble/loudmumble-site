# CLAUDE.md — loudmumble-site

## What this is

Terminal/IDE-themed security portfolio SPA at [loudmumble.com](https://loudmumble.com).
Vite + React 18 + TypeScript + Tailwind CSS. Deployed to GitHub Pages via GitHub Actions.

## Architecture

```
App.tsx                  # HashRouter: /, /blog/:slug, *
pages/
  Index.tsx              # Home — "Mainframe" IDE-style deck (sidebar nav,
                         #   scroll-spy sections, ⌘K command palette, status bar)
  BlogPost.tsx           # Markdown blog renderer (marked + DOMPurify)
  NotFound.tsx           # 404
lib/
  portfolio-data.ts      # SINGLE SOURCE OF TRUTH for all site content
  utils.ts               # cn() helper
components/
  terminal/TerminalWindow.tsx   # window chrome used by the blog
  ui/                    # shadcn/ui primitives
public/                  # favicons, og-image, robots.txt, CNAME, blog/*.md
```

All page content (identity, expertise, services, projects, skills, certs,
contact, stats) lives in `lib/portfolio-data.ts`. **Edit content there**, not in
the page components.

## Project data

`projects` in `lib/portfolio-data.ts` mirrors the **public** repos on
`github.com/loudmumble`. Descriptions are the repos' own GitHub descriptions;
`tech` reflects each repo's actual primary languages. Keep it in sync when repos
are added/renamed.

## Commands

```bash
npm run dev      # Vite dev server (http://localhost:8080)
npm run build    # Production build → dist/
npm run preview  # Preview the production build
npm run lint     # ESLint
npm run test     # Vitest
```

## Conventions

- Brand is always lowercase: `loudmumble` — never `LoudMumble` / `LOUDMUMBLE`.
- No real name on the site (identity separation by design).
- No `as any`, `@ts-ignore`, `@ts-expect-error`.

## Public-repo hygiene

This repository is public. Do not commit:
- private, internal, or unreleased project names or roadmaps;
- internal infrastructure (IPs, hostnames, private remotes);
- personal identifying information or session/agent working dirs
  (`.sisyphus/`, `.claude/`, `.remember/` are gitignored).

Only list repositories that are already public on GitHub.

## Notes

- Earlier design explorations (the original command-line terminal homepage and
  four alternate redesigns) are kept as reference **outside** this repo, in a
  sibling `loudmumble-site-archive/` directory.
