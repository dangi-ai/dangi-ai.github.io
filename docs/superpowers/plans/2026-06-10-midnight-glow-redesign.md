# Midnight Glow UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle all 6 pages of the portfolio from the light "paper + emerald" theme to the dark "Midnight Glow" theme (deep navy-black, violet→cyan gradients, glass cards, ambient glow, scroll-reveal motion) per the approved spec at `docs/superpowers/specs/2026-06-10-midnight-glow-redesign-design.md`.

**Architecture:** Presentation-layer only — same routes, components, data, and copy. Work is: (1) new design tokens + utility classes in `globals.css`, (2) glow background + dark shell in `layout.tsx`, (3) one new `Reveal` client component for scroll animations, (4) className updates in every component/page, (5) delete three dead UI components.

**Tech Stack:** Next.js 16.2.6 (static export), Tailwind CSS v4 (`@theme inline` tokens), React 19, vitest (existing logic tests only — no new test deps).

---

## Important context for the implementer

- **AGENTS.md warning:** This Next.js version may differ from your training data. This plan adds no new Next.js APIs, but if anything Next-related surprises you, read `node_modules/next/dist/docs/` before improvising.
- **Tailwind v4:** tokens are declared in CSS via `@theme inline` (see `src/app/globals.css`), not in a `tailwind.config`. A token `--color-cyan: #22D3EE` makes classes like `text-cyan`, `bg-cyan/10` work.
- **Token rename:** old tokens (`paper`, `accent`, `accent-light`, `accent-dark`) are REMOVED. New tokens: `bg`, `surface`, `line`, `ink`, `muted`, `faint`, `violet`, `violet-light`, `cyan`. Every old usage gets migrated in these tasks — if the build shows an unknown class, you missed one.
- **Verification command:** `npm run build:ci` (skips the network fetch of repos; `repos.json` is already committed). Expected: compiles, exports all 6 pages, exit 0.
- **No new dependencies. No copy/content changes.**
- This is styling work — the existing vitest suites cover pure logic (`relativeTime`, `filterRepos`) and must pass untouched at the end (`npm run test`).

---

### Task 1: Design tokens, utility classes, and base styles (`globals.css`)

**Files:**
- Modify: `src/app/globals.css` (full replacement)

- [ ] **Step 1: Replace the entire contents of `src/app/globals.css` with:**

```css
@import "tailwindcss";

@theme inline {
  /* Midnight Glow palette — use as: bg-bg, bg-surface, text-ink, text-cyan, etc. */
  --color-bg:           #0B0F1A;
  --color-surface:      rgba(255, 255, 255, 0.04);
  --color-line:         rgba(255, 255, 255, 0.08);
  --color-ink:          #F8FAFC;
  --color-muted:        #94A3B8;
  --color-faint:        #64748B;
  --color-violet:       #7C3AED;
  --color-violet-light: #A78BFA;
  --color-cyan:         #22D3EE;

  /* Font variables */
  --font-display: var(--font-space-grotesk), "Space Grotesk", system-ui, sans-serif;
  --font-body:    var(--font-dm-sans), "DM Sans", system-ui, sans-serif;
  --font-mono:    var(--font-jetbrains), "JetBrains Mono", "Menlo", monospace;

  /* Animations */
  --animate-fade-up: fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
}

/* Gradients shared by the utility classes below */
:root {
  --gradient-text: linear-gradient(90deg, #A78BFA, #22D3EE);
  --gradient-btn:  linear-gradient(90deg, #7C3AED, #22D3EE);
}

/* Base */
html { scroll-behavior: smooth; color-scheme: dark; }

body {
  background-color: #0B0F1A;
  color: #F8FAFC;
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

/* Focus ring uses cyan accent */
:focus-visible {
  outline: 2px solid #22D3EE;
  outline-offset: 3px;
  border-radius: 4px;
}

/* Glass card surface with hover lift + border glow */
.card-glass {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}
.card-glass:hover {
  transform: translateY(-2px);
  border-color: rgba(34, 211, 238, 0.35);
  box-shadow: 0 0 24px rgba(34, 211, 238, 0.08);
}

/* Featured card: 1px violet→cyan gradient border (opaque inner layer
   required for the padding-box/border-box trick) */
.card-featured {
  border-color: transparent;
  background:
    linear-gradient(#131A2A, #131A2A) padding-box,
    linear-gradient(135deg, rgba(124, 58, 237, 0.6), rgba(34, 211, 238, 0.6)) border-box;
}

/* Violet→cyan gradient text */
.gradient-text {
  background: var(--gradient-text);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Primary gradient button */
.btn-gradient {
  background: var(--gradient-btn);
  color: #fff;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
}
.btn-gradient:hover {
  opacity: 0.9;
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.35);
}

/* Scroll reveal (used by the Reveal component) */
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-visible {
  opacity: 1;
  transform: none;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .reveal { opacity: 1; transform: none; }
}
```

- [ ] **Step 2: Build to surface stale-token usages**

Run: `npm run build:ci`
Expected: build SUCCEEDS (Tailwind v4 doesn't fail on unknown classes like `bg-paper` — they just stop resolving). This step is a smoke test that the CSS parses. Visual migration happens in the following tasks.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: Midnight Glow design tokens, glass/gradient utilities, reveal styles"
```

---

### Task 2: Dark shell + ambient glow (`layout.tsx`)

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update the `RootLayout` body**

Replace the `return (...)` of `RootLayout` (keep imports, font setup, and `metadata` unchanged) with:

```tsx
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh flex flex-col bg-bg text-ink antialiased">
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-violet/20 blur-[140px]" />
          <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-cyan/10 blur-[140px]" />
        </div>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan focus:text-bg focus:font-mono focus:text-sm focus:rounded-lg"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main-content" className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
```

- [ ] **Step 2: Build**

Run: `npm run build:ci`
Expected: success, all 6 pages exported.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: dark shell with ambient violet/cyan glow blobs"
```

---

### Task 3: `Reveal` scroll-animation component

**Files:**
- Create: `src/components/ui/Reveal.tsx`

- [ ] **Step 1: Create `src/components/ui/Reveal.tsx`:**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

// Fades content up on first entry into the viewport.
// CSS (.reveal / .reveal-visible) lives in globals.css; reduced-motion
// users see content immediately via the media query there.
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Build**

Run: `npm run build:ci`
Expected: success (component compiles; not used anywhere yet).

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Reveal.tsx
git commit -m "feat: Reveal scroll-animation client component"
```

---

### Task 4: Nav + Footer

**Files:**
- Modify: `src/components/layout/Nav.tsx`
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Update `Nav.tsx`**

Keep `'use client'`, imports, `NAV_LINKS`, and both `useEffect`s unchanged. Replace the `return (...)` of `Nav` with:

```tsx
  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-bg/80 backdrop-blur-md border-b border-line'
          : ''
      }`}
    >
      <div className="max-w-5xl mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono font-bold text-ink text-sm tracking-tight hover:text-cyan transition-colors"
        >
          luv2code<span className="text-cyan">_</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors ${
                pathname === href
                  ? 'text-cyan font-semibold'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`btn-gradient text-sm font-semibold px-3 py-1.5 rounded-md ${
              pathname === '/contact' ? 'ring-1 ring-cyan' : ''
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-ink p-1"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open navigation menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden bg-bg border-b border-line px-8 py-6 flex flex-col gap-5">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm ${
                pathname === href ? 'text-cyan font-semibold' : 'text-muted'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-gradient text-sm font-semibold px-3 py-2 rounded-md text-center"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  )
```

- [ ] **Step 2: Update `Footer.tsx`**

Keep the four icon components and `SOCIALS` array unchanged. Replace the `Footer` function with:

```tsx
export function Footer() {
  return (
    <footer className="border-t border-line mt-auto">
      <div className="max-w-5xl mx-auto px-8 py-5 flex items-center justify-between gap-4 flex-wrap">
        <p className="font-mono text-xs text-muted">
          luv2code · Sushil Dangi
        </p>
        <div className="flex items-center gap-4">
          {SOCIALS.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted hover:text-cyan transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Build**

Run: `npm run build:ci`
Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Nav.tsx src/components/layout/Footer.tsx
git commit -m "feat: dark Nav with blur backdrop + gradient CTA, dark Footer"
```

---

### Task 5: Home — split Hero

**Files:**
- Modify: `src/components/home/Hero.tsx`

- [ ] **Step 1: Update `Hero.tsx`**

Keep the four icon components and the `SOCIALS` array (lines above the `Hero` function) exactly as they are. Replace the entire `export function Hero() {...}` with:

```tsx
export function Hero() {
  return (
    <section className="border-b border-line">
      <div className="max-w-5xl mx-auto px-8 pt-20 pb-14 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-14">

        <div className="flex-1 text-center md:text-left">
          <p
            className="font-mono text-[10px] text-cyan uppercase tracking-[0.2em] mb-5 animate-fade-up"
            style={{ animationDelay: '0ms' }}
          >
            Senior Java / Spring Boot Lead · 10+ Years
          </p>

          <h1
            className="font-display text-5xl md:text-6xl font-bold text-ink leading-[1.05] mb-5 animate-fade-up"
            style={{ animationDelay: '60ms' }}
          >
            Hi, I&apos;m <span className="gradient-text">Sushil Dangi</span>
          </h1>

          <p
            className="text-muted text-lg leading-relaxed max-w-xl mb-3 animate-fade-up"
            style={{ animationDelay: '120ms' }}
          >
            I build scalable backend systems and lead engineering teams to ship production code daily.
          </p>
          <p
            className="text-ink font-medium text-base mb-8 animate-fade-up"
            style={{ animationDelay: '160ms' }}
          >
            I luv 2 code. I luv 2 share what I learn.
          </p>

          <div
            className="flex gap-3 flex-wrap justify-center md:justify-start mb-8 animate-fade-up"
            style={{ animationDelay: '200ms' }}
          >
            <Link
              href="/work"
              className="btn-gradient text-sm font-semibold px-6 py-3 rounded-md"
            >
              View my work →
            </Link>
            <Link
              href="/contact"
              className="border border-line text-ink text-sm font-medium px-6 py-3 rounded-md hover:bg-surface hover:border-cyan/40 transition-colors"
            >
              Get in touch
            </Link>
          </div>

          <div
            className="flex items-center gap-5 justify-center md:justify-start animate-fade-up"
            style={{ animationDelay: '240ms' }}
          >
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted hover:text-cyan transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '120ms' }}>
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-full p-[3px] bg-gradient-to-br from-violet to-cyan shadow-[0_0_40px_rgba(124,58,237,0.25)]">
            <img
              src="/headshot.png"
              alt="Sushil Dangi"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Build**

Run: `npm run build:ci`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/Hero.tsx
git commit -m "feat: split hero — gradient name, gradient-ring headshot, dark CTAs"
```

---

### Task 6: Home — StatsStrip, TechStrip, FeaturedRepos, scroll reveal

**Files:**
- Modify: `src/components/home/StatsStrip.tsx` (full replacement)
- Modify: `src/components/home/TechStrip.tsx` (full replacement)
- Modify: `src/components/home/FeaturedRepos.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace `StatsStrip.tsx` entirely with:**

```tsx
const STATS = [
  { value: '10+',   label: 'Years Experience',   color: 'text-violet-light' },
  { value: '15',    label: 'Engineers Led',      color: 'text-cyan' },
  { value: '~100K', label: 'Transactions / Day', color: 'text-violet-light' },
  { value: '98.2%', label: 'System Uptime',      color: 'text-cyan' },
]

export function StatsStrip() {
  return (
    <section className="border-b border-line" aria-label="Key achievements">
      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ value, label, color }) => (
            <div key={label} className="card-glass px-5 py-5 text-center">
              <div className={`font-mono text-3xl font-bold leading-none mb-2 ${color}`}>
                {value}
              </div>
              <div className="text-xs text-muted leading-snug">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Replace `TechStrip.tsx` entirely with:**

```tsx
const TECHS = [
  'Java 21', 'Spring Boot', 'PostgreSQL', 'Flyway',
  'AWS', 'GitHub Actions', 'Docker', 'JWT', 'HikariCP',
]

export function TechStrip() {
  return (
    <section className="border-b border-line py-6" aria-label="Technologies I work with">
      <div className="max-w-5xl mx-auto px-8">
        <p className="font-mono text-[10px] text-faint uppercase tracking-[0.2em] mb-4">
          Hands-on with
        </p>
        <div className="flex flex-wrap gap-2">
          {TECHS.map(tech => (
            <span
              key={tech}
              className="bg-surface border border-line text-muted font-mono text-xs px-3 py-1.5 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
```

(Note: `border-y` became `border-b` — the StatsStrip above it already draws the top border.)

- [ ] **Step 3: Update `FeaturedRepos.tsx`**

Keep imports, `FeaturedReposProps`, and `pickFeatured` unchanged. Replace the `FeaturedRepos` function with:

```tsx
export function FeaturedRepos({ repos }: FeaturedReposProps) {
  const featured = pickFeatured(repos)

  return (
    <section className="max-w-5xl mx-auto px-8 py-12">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display text-xl font-bold text-ink">Featured work</h2>
        <Link href="/work" className="text-sm text-cyan font-medium hover:text-violet-light transition-colors">
          View all repos →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map(repo => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-glass p-4 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-display font-bold text-sm text-ink leading-snug">{repo.name}</span>
              <span className="text-faint text-xs flex-shrink-0 mt-0.5" aria-hidden>↗</span>
            </div>

            {repo.description && (
              <p className="text-muted text-xs leading-relaxed flex-1">{repo.description}</p>
            )}

            <div className="flex flex-wrap gap-1.5">
              {repo.language && (
                <span className="flex items-center gap-1 bg-white/5 font-mono text-[10px] px-2 py-0.5 rounded text-ink">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: getLanguageColor(repo.language) }}
                    aria-hidden
                  />
                  {repo.language}
                </span>
              )}
              {repo.topics.slice(0, 2).map(t => (
                <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-muted">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 font-mono text-[10px] text-faint">
              <span className="flex items-center gap-1">
                <Star size={10} aria-hidden /> {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork size={10} aria-hidden /> {repo.forks_count}
              </span>
              <span className="ml-auto">{relativeTime(repo.updated_at)}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Wrap home sections in `Reveal` in `src/app/page.tsx`**

Replace the file's imports and `HomePage` (keep `metadata` unchanged) so it reads:

```tsx
import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { StatsStrip } from '@/components/home/StatsStrip'
import { TechStrip } from '@/components/home/TechStrip'
import { FeaturedRepos } from '@/components/home/FeaturedRepos'
import { Reveal } from '@/components/ui/Reveal'
import { JsonLd } from '@/components/JsonLd'
import repos from '@/data/repos.json'
import type { Repo } from '@/lib/types'
```

```tsx
export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Reveal>
        <StatsStrip />
      </Reveal>
      <Reveal delay={80}>
        <TechStrip />
      </Reveal>
      <Reveal>
        <FeaturedRepos repos={repos as Repo[]} />
      </Reveal>
    </>
  )
}
```

- [ ] **Step 5: Build**

Run: `npm run build:ci`
Expected: success.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/StatsStrip.tsx src/components/home/TechStrip.tsx src/components/home/FeaturedRepos.tsx src/app/page.tsx
git commit -m "feat: glass stat cards, dark tech strip, glass featured repos, scroll reveal"
```

---

### Task 7: Work page — RepoCard, RepoGrid, page header

**Files:**
- Modify: `src/components/work/RepoCard.tsx`
- Modify: `src/components/work/RepoGrid.tsx`
- Modify: `src/app/work/page.tsx`

- [ ] **Step 1: Update `RepoCard.tsx`**

Keep imports and `RepoCardProps` unchanged. Replace the `RepoCard` function with:

```tsx
export function RepoCard({ repo, featured = false }: RepoCardProps) {
  return (
    <div
      role="article"
      onClick={() => window.open(repo.html_url, '_blank', 'noopener,noreferrer')}
      className={`card-glass p-4 flex flex-col gap-3 cursor-pointer ${
        featured ? 'card-featured' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className={`font-display font-bold text-sm leading-snug hover:underline ${
            featured ? 'text-cyan' : 'text-ink'
          }`}
        >
          {repo.name}
        </a>
        <ExternalLink size={12} className="text-faint flex-shrink-0 mt-0.5" aria-hidden />
      </div>

      {repo.description && (
        <p className="text-muted text-xs leading-relaxed flex-1">{repo.description}</p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {repo.language && (
          <span className="flex items-center gap-1 bg-white/5 font-mono text-[10px] px-2 py-0.5 rounded text-ink">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: getLanguageColor(repo.language) }}
              aria-hidden
            />
            {repo.language}
          </span>
        )}
        {repo.topics.slice(0, 3).map(t => (
          <span key={t} className="bg-white/5 text-muted font-mono text-[10px] px-2 py-0.5 rounded">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 font-mono text-[10px] text-faint">
        <span className="flex items-center gap-1">
          <Star size={10} aria-hidden /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork size={10} aria-hidden /> {repo.forks_count}
        </span>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="ml-auto text-cyan hover:underline"
            aria-label={`Live site for ${repo.name}`}
          >
            live ↗
          </a>
        )}
        {!repo.homepage && (
          <span className="ml-auto">{relativeTime(repo.updated_at)}</span>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Update controls in `RepoGrid.tsx`**

Only classNames change; logic stays identical. Replace the three control elements:

The search input className becomes:

```tsx
className="w-full bg-surface border border-line rounded-md pl-8 pr-3 py-2 text-sm text-ink placeholder:text-faint focus:outline-none focus:border-cyan transition-colors"
```

Both `<select>` classNames become:

```tsx
className="bg-surface border border-line rounded-md px-3 py-2 text-sm text-ink focus:outline-none focus:border-cyan transition-colors"
```

The empty-state `<p>` className becomes `text-muted text-sm font-mono text-center py-16` (unchanged) and the bottom count `<p>` className becomes:

```tsx
className="mt-6 font-mono text-[10px] text-faint text-center"
```

- [ ] **Step 3: Update `src/app/work/page.tsx` header**

Replace the two header elements inside the returned `<div>`:

```tsx
      <p className="font-mono text-[10px] text-cyan uppercase tracking-[0.2em] mb-4">Work</p>
      <h1 className="font-display text-4xl font-bold text-ink leading-tight mb-10">
        Open source <span className="gradient-text">repos</span>
      </h1>
```

- [ ] **Step 4: Build**

Run: `npm run build:ci`
Expected: success.

- [ ] **Step 5: Commit**

```bash
git add src/components/work/RepoCard.tsx src/components/work/RepoGrid.tsx src/app/work/page.tsx
git commit -m "feat: glass repo cards with gradient featured border, dark filters"
```

---

### Task 8: Skills page — SkillCard, SkillGroup, page header

**Files:**
- Modify: `src/components/skills/SkillCard.tsx`
- Modify: `src/components/skills/SkillGroup.tsx`
- Modify: `src/app/skills/page.tsx`

- [ ] **Step 1: Update `SkillCard.tsx`**

Keep everything above the `SkillCard` function unchanged. In the function, change the outer `<div>` className to:

```tsx
className="card-glass p-3 flex flex-col items-center gap-2 min-w-[80px]"
```

and change the monogram fallback `<span>` className to:

```tsx
className="w-8 h-8 rounded items-center justify-center bg-white/10 text-muted font-mono text-xs font-bold select-none"
```

(the `style={{ display: ... }}` attribute stays as-is). The skill-name `<span>` at the bottom keeps its className (`text-ink` is still correct).

- [ ] **Step 2: Update `SkillGroup.tsx`**

Change the dot `<span>` className to:

```tsx
className="w-2 h-2 rounded-full bg-gradient-to-r from-violet to-cyan flex-shrink-0"
```

Everything else stays.

- [ ] **Step 3: Update `src/app/skills/page.tsx` header**

```tsx
      <p className="font-mono text-[10px] text-cyan uppercase tracking-[0.2em] mb-4">Skills</p>
      <h1 className="font-display text-4xl font-bold text-ink leading-tight mb-12">
        <span className="gradient-text">Tech</span> I work with
      </h1>
```

- [ ] **Step 4: Build**

Run: `npm run build:ci`
Expected: success.

- [ ] **Step 5: Commit**

```bash
git add src/components/skills/SkillCard.tsx src/components/skills/SkillGroup.tsx src/app/skills/page.tsx
git commit -m "feat: glass skill tiles, gradient category dots, skills header accents"
```

---

### Task 9: Experience page — TimelineEntry + education

**Files:**
- Modify: `src/components/experience/TimelineEntry.tsx` (full replacement)
- Modify: `src/app/experience/page.tsx`

- [ ] **Step 1: Replace `TimelineEntry.tsx` entirely with:**

```tsx
import type { ExperienceEntry } from '@/lib/types'

interface TimelineEntryProps {
  entry: ExperienceEntry
  isLast: boolean
}

export function TimelineEntry({ entry, isLast }: TimelineEntryProps) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <div
          className={`w-3 h-3 rounded-full flex-shrink-0 ${
            entry.current
              ? 'bg-gradient-to-br from-violet to-cyan shadow-[0_0_12px_rgba(34,211,238,0.5)]'
              : 'bg-bg border-2 border-cyan'
          }`}
        />
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-violet/60 to-cyan/60 mt-1.5" />
        )}
      </div>

      <div className={`flex-1 ${isLast ? '' : 'pb-10'}`}>
        <div className="card-glass p-5">
          <h3 className="font-display font-bold text-ink text-base">{entry.role}</h3>
          <p className="font-mono text-[11px] text-cyan mt-1">
            {entry.company} · {entry.period}
          </p>
          <p className="font-mono text-[11px] text-muted mt-0.5">{entry.location}</p>

          <ul className="mt-4 space-y-1.5">
            {entry.bullets.map((b, i) => (
              <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
                <span className="text-cyan mt-1 flex-shrink-0" aria-hidden>·</span>
                {b}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {entry.tech.map(t => (
              <span key={t} className="bg-white/5 text-muted font-mono text-[10px] px-2 py-0.5 rounded">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Update `src/app/experience/page.tsx`**

Header block becomes:

```tsx
      <p className="font-mono text-[10px] text-cyan uppercase tracking-[0.2em] mb-4">
        Experience
      </p>
      <h1 className="font-display text-4xl font-bold text-ink leading-tight mb-2">
        Career <span className="gradient-text">timeline</span>
      </h1>
      <p className="text-muted text-sm mb-12">10+ years · Java · Spring Boot · Distributed Systems</p>
```

In the Education section, the dot `<div>` className changes from `bg-paper border-2 border-line` to:

```tsx
className="w-3 h-3 rounded-full bg-bg border-2 border-line flex-shrink-0"
```

and the institution `<p>` className changes `text-accent` → `text-cyan`:

```tsx
<p className="font-mono text-[11px] text-cyan mt-1">{edu.institution}</p>
```

- [ ] **Step 3: Build**

Run: `npm run build:ci`
Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/components/experience/TimelineEntry.tsx src/app/experience/page.tsx
git commit -m "feat: gradient timeline with glass entry cards"
```

---

### Task 10: About + Contact pages

**Files:**
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/components/contact/SocialCard.tsx`

- [ ] **Step 1: Update `src/app/about/page.tsx`**

Header block becomes:

```tsx
      <p className="font-mono text-[10px] text-cyan uppercase tracking-[0.2em] mb-4">About</p>
      <h1 className="font-display text-4xl font-bold text-ink leading-tight mb-10">
        I luv 2 <span className="gradient-text">code</span>.<br />I luv 2 <span className="gradient-text">share</span>.
      </h1>
```

In the Skills & Technologies section, the skill-chip ternary becomes:

```tsx
                      className={
                        skill.primary
                          ? 'bg-violet/15 text-violet-light font-mono text-xs px-3 py-1 rounded'
                          : 'bg-white/5 text-muted font-mono text-xs px-3 py-1 rounded'
                      }
```

The category label `<p>` className changes `text-muted` → `text-faint` (it's a tertiary label):

```tsx
<p className="font-mono text-[10px] text-faint uppercase tracking-[0.15em] mb-3">
```

Everything else (prose paragraphs use `text-muted`, borders use `border-line`) stays as-is — those tokens now resolve to dark values.

- [ ] **Step 2: Update `src/components/contact/SocialCard.tsx`**

Replace the `SocialCard` function (keep imports and the `SocialCardProps` interface) with:

```tsx
export function SocialCard({ href, platform, handle, iconBg, iconText, ariaLabel }: SocialCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="card-glass p-4 flex items-center gap-4 group"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
        style={{ background: iconBg }}
        aria-hidden
      >
        {iconText}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display font-bold text-sm text-ink">{platform}</p>
        <p className="font-mono text-xs text-muted truncate">{handle}</p>
      </div>
      <ExternalLink
        size={14}
        className="text-faint group-hover:text-cyan transition-colors flex-shrink-0"
        aria-hidden
      />
    </a>
  )
}
```

- [ ] **Step 3: Update `src/app/contact/page.tsx`**

In the `SOCIALS` array, update two `iconBg` values that are invisible on the dark background:
- GitHub: `iconBg: '#1A1714'` → `iconBg: '#30363D'`
- X / Twitter: `iconBg: '#000000'` → `iconBg: '#1F2430'`

Header block becomes:

```tsx
      <p className="font-mono text-[10px] text-cyan uppercase tracking-[0.2em] mb-4">Contact</p>
      <h1 className="font-display text-4xl font-bold text-ink leading-tight mb-4">
        Let&apos;s build something <span className="gradient-text">great</span>.
      </h1>
```

The email CTA `<a>` className becomes:

```tsx
className="inline-block btn-gradient font-semibold text-sm px-6 py-3 rounded-md"
```

- [ ] **Step 4: Build**

Run: `npm run build:ci`
Expected: success.

- [ ] **Step 5: Commit**

```bash
git add src/app/about/page.tsx src/app/contact/page.tsx src/components/contact/SocialCard.tsx
git commit -m "feat: dark About and Contact pages, glass social cards, gradient email CTA"
```

---

### Task 11: Delete dead UI components

These three files are imported nowhere (verified by grep across `src/`); `ui/SocialCard.tsx` even references classes from an older design generation.

**Files:**
- Delete: `src/components/ui/Tag.tsx`
- Delete: `src/components/ui/SocialCard.tsx`
- Delete: `src/components/ui/LanguageDot.tsx`

- [ ] **Step 1: Verify they're still unused, then delete**

Run: `grep -rn "ui/Tag\|ui/SocialCard\|ui/LanguageDot" src --include="*.tsx" --include="*.ts" | grep -v "src/components/ui/"`
Expected: no output. Then:

```bash
git rm src/components/ui/Tag.tsx src/components/ui/SocialCard.tsx src/components/ui/LanguageDot.tsx
```

- [ ] **Step 2: Build**

Run: `npm run build:ci`
Expected: success.

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove unused Tag, SocialCard, LanguageDot components"
```

---

### Task 12: Final verification

**Files:** none modified.

- [ ] **Step 1: Run the test suite**

Run: `npm run test`
Expected: all existing tests pass (relativeTime + filterRepos suites).

- [ ] **Step 2: Full build**

Run: `npm run build:ci`
Expected: success; output lists all 6 routes (`/`, `/about`, `/contact`, `/experience`, `/skills`, `/work`) exported statically.

- [ ] **Step 3: Stale-token sweep**

Run: `grep -rn "bg-paper\|text-accent\|bg-accent\|accent-light\|accent-dark\|border-t-accent\|bg-white " src --include="*.tsx" --include="*.css" || echo CLEAN`
Expected: `CLEAN` (no remaining old-token class usages).

- [ ] **Step 4: Visual pass**

Run: `npm run dev` and check every page at desktop and ~375px width:
- `/` — split hero, gradient name, gradient-ring photo, 4 glass stat cards, sections reveal on scroll
- `/work` — glass cards, featured cards show gradient border, filters legible, hover lift works
- `/skills` — glass tiles, devicons visible on dark, monogram fallbacks legible
- `/experience` — gradient timeline line, glass entry cards, education section dark
- `/about`, `/contact` — dark prose, glass social cards, gradient email CTA
- Nav: scrolled state blurs; mobile menu opens solid dark
- Check `prefers-reduced-motion` (e.g. macOS Reduce Motion) — content visible immediately, no animation

- [ ] **Step 5: Commit anything found, otherwise done**

If the visual pass requires fixes, make minimal class-level corrections and commit as `fix: visual polish after Midnight Glow pass`.
