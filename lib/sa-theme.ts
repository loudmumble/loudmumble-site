// Shared Structured Anarchy design primitives. BOTH the portfolio (pages/Index)
// and the launch page (pages/StructuredAnarchy) import these so the two surfaces
// are literally one design system and cannot drift.
import type { CSSProperties } from 'react';

export const ACCENT = '#d4ff3f';   // chartreuse signal
export const VOID = '#0a0a0b';     // near-black base
export const SURFACE = '#0f0f12';
export const SURFACE2 = '#15151a';
export const INK = '#e9e7e0';      // bone
export const DIM = '#76766f';
export const FAINT = '#46464a';
export const LINE = '#24242a';
export const DISPLAY = "'Anton','Arial Narrow',sans-serif";
export const MONO = "'JetBrains Mono','Fira Code',monospace";

export const RED = '#ff5a52';
export const BLUE = '#4d9bff';
export const EMERALD = '#34d3a6';

// terminal-mono HUD label (uppercase, wide tracking, dim)
export const hud = (extra?: CSSProperties): CSSProperties => ({
  fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: DIM, ...extra,
});
