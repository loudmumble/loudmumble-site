# QA Learnings — loudmumble-site

## Visual QA Run — 2026-02-20

### Server
- Preview server: `npx vite preview --port 4173` — starts in ~2s, no issues
- Kill with: `kill $(lsof -ti:4173)`

### Terminal UI
- ASCII block-art header renders correctly using box-drawing characters (█, ╔, ╗, etc.)
- Terminal prompt shows `loud@mumble:~/init` on load, updates per command (e.g., `~/projects`, `~/about`)
- Input field: role=textbox, placeholder="type 'help' for commands..."
- Navigation: HUD stats (RAM, GPU, T/S, UP/DOWN), nav buttons with F-key labels

### Help Command
- All commands listed including `enterprise` — confirms the command is in the registry
- enterprise listed as: `enterprise | Enterprise detection capabilities`

### Projects Section
- Activated via `[F3] PROJECTS` nav button
- Renders as a tree: `projects/` → expandable project entries
- Wave badges render inline in project button label: `de-voidlink/ STABLE [LIVE]`
- Wave-1 projects (LIVE): de-voidlink, aegis, ebpf-sensors
- Wave-2 projects (WAVE-2): phantom, dossier, aisec
- Wave-3 projects (WAVE-3): burrow, malscope
- hog: ALPHA with no wave badge (private tool, as expected)

### GitHub Link Behavior
- Wave-1 active link: `<a>` tag with href to github.com URL, role=link
- Wave-2/3 disabled: `<span title="launching soon">` with CSS class `cursor-not-allowed`, NOT an `<a>` tag
  - Verified with `document.querySelector('[title="launching soon"]')` → `tagName: SPAN`, `cursor: not-allowed`

### Blog Route
- Internal link from projects footer: `link "blog/de-voidlink" → /#/blog/de-voidlink`
- URL after navigation: `http://localhost:4173/#/blog/de-voidlink` ✓ (HashRouter routing works)
- NOT a .md file link — proper internal route

### Blog Content
- Full markdown article renders: headings (h1, h2), paragraphs, code blocks, lists, separators
- No `{{PLACEHOLDER` strings found anywhere in the rendered content
- Article title: "Building VoidLink From Spec: What Agentic Malware Teaches Us About Detection"

### Enterprise Command
- Output shows `[ENTERPRISE]` header block
- Contains email: `dev@loudmumble.com`
- Full output: "Advanced C2 detection & behavioral analysis platform. Available for enterprise deployment and managed detection workflows. Inquire: dev@loudmumble.com"

### Mobile (375px)
- Navigation simplifies to text-only buttons (F-key shortcuts hidden on mobile)
- All nav items still accessible (ABOUT, SERVICES, PROJECTS, BLOG, CONTACT, GITHUB)
- Content remains readable, no broken layout
- Footer visible at bottom

### Console
- Zero JS errors, zero warnings throughout entire QA session
