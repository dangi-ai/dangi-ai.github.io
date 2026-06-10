# Midnight Glow UI Redesign — Design Spec

**Date:** 2026-06-10
**Status:** Approved by user
**Scope:** All 6 pages (Home, Work, Skills, Experience, About, Contact)

## Goal

Replace the current light "paper + emerald" theme with a modern dark theme
("Midnight Glow"): deep navy-black background, violet→cyan gradient accents,
glassy card surfaces, ambient glow, and tasteful motion. Fixes the four
identified pain points: dated look, boring centered layout, lack of motion,
weak visual hierarchy.

All copy, content, data files, routes, and page structure stay the same.
This is a presentation-layer redesign.

## Design System

### Palette tokens (replace in `src/app/globals.css`)

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#0B0F1A` | page background (deep navy-black) |
| `--color-surface` | `rgba(255,255,255,0.04)` | glass card background |
| `--color-line` | `rgba(255,255,255,0.08)` | card borders, dividers |
| `--color-ink` | `#F8FAFC` | primary text |
| `--color-muted` | `#94A3B8` | secondary text |
| `--color-faint` | `#64748B` | tertiary text, labels |
| `--color-violet` | `#7C3AED` | accent A (gradient start) |
| `--color-cyan` | `#22D3EE` | accent B (gradient end), links, active states |

- Gradient accent: `linear-gradient(90deg, #A78BFA, #22D3EE)` for hero
  keywords (gradient text) and `linear-gradient(90deg, #7C3AED, #22D3EE)`
  for primary CTA buttons.
- Stats and detail accents alternate violet (`#A78BFA`) and cyan (`#22D3EE`).
- Old emerald/paper tokens are removed; any `bg-paper`, `text-accent`, etc.
  usages are migrated to the new tokens.

### Typography

Keep existing fonts unchanged: Space Grotesk (display), DM Sans (body),
JetBrains Mono (mono/labels). Mono uppercase eyebrow labels use cyan.

### Ambient depth

Two fixed, low-opacity radial glow blobs rendered once in `layout.tsx`
(behind all pages, `pointer-events-none`, `aria-hidden`):
violet top-right, cyan bottom-left. Subtle — background texture, not a feature.

### Motion

- **Scroll reveal:** new `Reveal` client component (IntersectionObserver)
  wraps sections/cards; fades up on first entry into viewport. Replaces the
  current load-time-only `animate-fade-up` for below-the-fold content.
- **Hover:** cards lift slightly (`translateY(-2px)`) and their border
  brightens toward cyan; gradient CTA brightens; transitions ~200ms.
- **Reduced motion:** existing `prefers-reduced-motion` override stays and
  covers all new animation.

## Components & Pages

No new routes, no data changes. Per-page work:

### Layout chrome
- **Nav** (`src/components/layout/Nav.tsx`): sticky, translucent dark with
  `backdrop-blur`, bottom border `--color-line`; active link cyan.
- **Footer**: dark, muted text, glass divider.
- **layout.tsx**: body background/text colors, glow blobs.

### Home
- **Hero** (`src/components/home/Hero.tsx`): switch from centered column to
  split layout — left: eyebrow, name with gradient keyword, bio lines, CTA
  pair (gradient primary + outlined ghost), social icons; right: headshot in
  a gradient-ring circle. Stacks vertically on mobile (photo above text).
- **StatsStrip**: 4 glassy stat cards in a row (grid `2x2` on mobile) —
  10+ yrs / 15 devs / 100K txn / 98.2% uptime, alternating accent colors.
- **FeaturedRepos / TechStrip**: glass-card treatment, scroll reveal.

### Work
- **RepoCard**: glass card, hover lift + glow; featured repos get a gradient
  border accent (replacing the current emerald accent border).
- **Filter/sort controls**: dark pills, cyan active state.

### Skills
- **SkillCard / SkillGroup**: glass tiles; category headings keep size but
  gain gradient text on the key word. Devicons CDN icons render fine on dark;
  monogram fallback colors updated for dark surfaces.

### Experience
- **TimelineEntry**: vertical gradient line (violet→cyan), cyan node dots,
  entries as glass cards.

### About / Contact
- Prose colors mapped to new tokens; **SocialCard**s become glass cards with
  hover glow; email CTA uses gradient button style.

## Architecture

- Changes are confined to: `globals.css` (tokens, keyframes, base styles),
  `layout.tsx` (glow background), component classNames, and one new
  `src/components/ui/Reveal.tsx` client component.
- Everything else stays server components; `Reveal` is the only new
  `"use client"` addition (SkillCard already is one).
- Static export workflow unchanged; no new dependencies.
- This Next.js version may differ from training data — consult
  `node_modules/next/dist/docs/` before writing code (per AGENTS.md).

## Accessibility

- Verify text contrast on dark bg: `#F8FAFC`/`#94A3B8` on `#0B0F1A` pass
  WCAG AA; `#64748B` only for non-essential labels.
- Focus ring becomes cyan (`outline-color: #22D3EE`).
- Glow blobs `aria-hidden`; all motion respects `prefers-reduced-motion`.

## Testing & Verification

- Existing vitest suites (`relativeTime`, `filterRepos`) are logic-only and
  must keep passing untouched.
- `npm run build` must succeed with all 6 pages exported.
- Manual visual pass of all 6 pages (desktop + mobile widths), including
  hover and reduced-motion behavior.

## Out of Scope

- Copy/content changes, new pages, light/dark mode toggle (dark only),
  new dependencies, data/JSON changes, analytics.
