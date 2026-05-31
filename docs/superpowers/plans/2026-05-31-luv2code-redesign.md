# luv2code Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild luv2code.in from scratch — Clean Light theme, Emerald accent, 6 pages (Home, About, Experience, Work, Skills, Contact), transparent→frosted nav, editorial + card-grid hybrid layout.

**Architecture:** Next.js 16 App Router static export (`output: 'export'`). Server components for all pages; `'use client'` only for Nav (scroll state) and RepoGrid (filter state). GitHub repos fetched at build time via `scripts/fetch-repos.mjs` and baked into `src/data/repos.json`. Experience and skills data are TypeScript files maintained manually.

**Tech Stack:** Next.js 16.2.6, React 19, Tailwind CSS v4, TypeScript, Lucide React, `@icons-pack/react-simple-icons` (new dep for brand icons)

---

## File Map

**Create:**
- `src/app/experience/page.tsx`
- `src/app/skills/page.tsx`
- `src/components/layout/Nav.tsx`
- `src/components/home/TechStrip.tsx`
- `src/components/work/RepoCard.tsx`
- `src/components/work/RepoGrid.tsx`
- `src/components/work/filterRepos.ts`
- `src/components/experience/TimelineEntry.tsx`
- `src/components/experience/Timeline.tsx`
- `src/components/skills/SkillCard.tsx`
- `src/components/skills/SkillGroup.tsx`
- `src/components/contact/SocialCard.tsx`
- `src/components/ui/Tag.tsx`
- `src/data/experience.ts`
- `src/data/skills.ts`
- `src/config/featured.ts`
- `src/lib/languageColors.ts`
- `src/lib/relativeTime.ts`
- `src/lib/__tests__/relativeTime.test.ts`
- `src/lib/__tests__/filterRepos.test.ts`
- `vitest.config.ts`

**Rewrite (modify in place):**
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/about/page.tsx`
- `src/app/work/page.tsx`
- `src/app/contact/page.tsx`
- `src/components/home/Hero.tsx`
- `src/components/home/FeaturedRepos.tsx`
- `src/components/layout/Footer.tsx`
- `src/lib/types.ts`
- `src/components/JsonLd.tsx`
- `public/sitemap.xml`

**Delete:**
- `src/components/layout/Header.tsx`
- `src/components/layout/ThemeProvider.tsx`
- `src/components/layout/ThemeToggle.tsx`
- `src/components/home/TechStack.tsx`

---

## Task 1: Setup — Read Docs, Install Deps, Vitest, Gitignore

**Files:**
- Modify: `.gitignore`
- Create: `vitest.config.ts`
- Modify: `package.json` (add devDeps)

- [ ] **Step 1: Read Next.js 16 docs for breaking changes**

```bash
ls node_modules/next/dist/docs/
```

Read any docs related to: App Router, `'use client'`, `usePathname`, `Link`, `next/font`, static export (`output: 'export'`). Note any API differences from Next.js 15 before proceeding.

- [ ] **Step 2: Add `.superpowers/` to .gitignore**

Open `.gitignore` (or create it) and append:

```
.superpowers/
```

- [ ] **Step 3: Install new dependencies**

```bash
cd luv2code-site
npm install @icons-pack/react-simple-icons
npm install --save-dev vitest @vitejs/plugin-react
```

Expected: packages installed, no peer-dep errors.

- [ ] **Step 4: Create vitest.config.ts**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    include: ['src/**/__tests__/**/*.test.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

- [ ] **Step 5: Add test script to package.json**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest run"
```

- [ ] **Step 6: Commit**

```bash
git add .gitignore vitest.config.ts package.json package-lock.json
git commit -m "chore: setup vitest, install simple-icons, add .superpowers to gitignore"
```

---

## Task 2: Design Tokens — Rewrite globals.css

**Files:**
- Rewrite: `src/app/globals.css`

- [ ] **Step 1: Rewrite globals.css with new token system**

Replace the entire file:

```css
@import "tailwindcss";

@theme inline {
  /* Palette tokens — use as: bg-paper, text-ink, text-accent, etc. */
  --color-paper:        #F8F7F4;
  --color-surface:      #F0EDE8;
  --color-line:         #E5E1DA;
  --color-muted:        #6B6560;
  --color-ink:          #1A1714;
  --color-accent:       #059669;
  --color-accent-light: #D1FAE5;
  --color-accent-dark:  #047857;

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

/* CSS custom properties for use in arbitrary Tailwind values */
:root {
  --paper:        #F8F7F4;
  --surface:      #F0EDE8;
  --line:         #E5E1DA;
  --muted:        #6B6560;
  --ink:          #1A1714;
  --accent:       #059669;
  --accent-light: #D1FAE5;
  --accent-dark:  #047857;
}

/* Base */
html { scroll-behavior: smooth; }

body {
  background-color: var(--paper);
  color: var(--ink);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

/* Focus ring uses emerald accent */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
cd luv2code-site && npx tsc --noEmit
```

Expected: 0 errors (ignore any pre-existing errors from old components we haven't rewritten yet; note them and continue).

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: rewrite globals.css — clean light theme, emerald tokens"
```

---

## Task 3: Types + Utility Functions

**Files:**
- Rewrite: `src/lib/types.ts`
- Create: `src/lib/languageColors.ts`
- Create: `src/lib/relativeTime.ts`
- Create: `src/lib/__tests__/relativeTime.test.ts`

- [ ] **Step 1: Write relativeTime test (TDD)**

Create `src/lib/__tests__/relativeTime.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { relativeTime } from '../relativeTime'

describe('relativeTime', () => {
  const FIXED = new Date('2026-05-31T12:00:00Z')

  beforeEach(() => { vi.setSystemTime(FIXED) })
  afterEach(() => { vi.useRealTimers() })

  it('returns "today" for same-day ISO string', () => {
    expect(relativeTime('2026-05-31T08:00:00Z')).toBe('today')
  })

  it('returns "yesterday" for 1 day ago', () => {
    expect(relativeTime('2026-05-30T08:00:00Z')).toBe('yesterday')
  })

  it('returns "N days ago" for 2–29 days', () => {
    expect(relativeTime('2026-05-26T08:00:00Z')).toBe('5 days ago')
  })

  it('returns "1 month ago" for ~30 days', () => {
    expect(relativeTime('2026-05-01T08:00:00Z')).toBe('1 month ago')
  })

  it('returns "N months ago" for several months', () => {
    expect(relativeTime('2026-02-01T08:00:00Z')).toBe('3 months ago')
  })

  it('returns "over a year ago" for 12+ months', () => {
    expect(relativeTime('2024-01-01T08:00:00Z')).toBe('over a year ago')
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
cd luv2code-site && npx vitest run src/lib/__tests__/relativeTime.test.ts
```

Expected: FAIL — `Cannot find module '../relativeTime'`

- [ ] **Step 3: Implement relativeTime**

Create `src/lib/relativeTime.ts`:

```ts
export function relativeTime(isoString: string): string {
  const then = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - then.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 30) return `${diffDays} days ago`

  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths < 12) return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`

  return 'over a year ago'
}
```

- [ ] **Step 4: Run test — verify it passes**

```bash
cd luv2code-site && npx vitest run src/lib/__tests__/relativeTime.test.ts
```

Expected: 6 tests PASS

- [ ] **Step 5: Update types.ts — add ExperienceEntry and Skill**

Replace the entire file:

```ts
export interface Repo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  updated_at: string
  fork: boolean
  archived: boolean
}

export interface ExperienceEntry {
  role: string
  company: string
  period: string
  location: string
  bullets: string[]
  tech: string[]
  current?: boolean
}

export interface Skill {
  name: string
  category: 'language' | 'framework' | 'data' | 'devops' | 'tool'
  iconSlug?: string
  primary?: boolean
}
```

- [ ] **Step 6: Create languageColors.ts**

Create `src/lib/languageColors.ts`:

```ts
const colors: Record<string, string> = {
  Java:         '#b07219',
  TypeScript:   '#3178c6',
  JavaScript:   '#f1e05a',
  Python:       '#3572A5',
  Go:           '#00ADD8',
  Rust:         '#dea584',
  Kotlin:       '#A97BFF',
  SQL:          '#e38c00',
  Shell:        '#89e051',
  YAML:         '#cb171e',
  Dockerfile:   '#384d54',
  HTML:         '#e34c26',
  CSS:          '#563d7c',
}

export function getLanguageColor(language: string | null): string {
  if (!language) return '#8b949e'
  return colors[language] ?? '#8b949e'
}
```

- [ ] **Step 7: Commit**

```bash
git add src/lib/types.ts src/lib/relativeTime.ts src/lib/languageColors.ts src/lib/__tests__/relativeTime.test.ts
git commit -m "feat: add ExperienceEntry/Skill types, relativeTime util, languageColors"
```

---

## Task 4: Data Files — Config, Experience, Skills

**Files:**
- Create: `src/config/featured.ts`
- Create: `src/data/experience.ts`
- Create: `src/data/skills.ts`

- [ ] **Step 1: Create featured.ts**

Create `src/config/featured.ts`:

```ts
// Names of repos to feature on Home and top of Work.
// If empty, falls back to top-5 by stargazers_count.
export const FEATURED_REPOS: string[] = []
```

- [ ] **Step 2: Create experience.ts with placeholder entries**

Create `src/data/experience.ts`:

```ts
import type { ExperienceEntry } from '@/lib/types'

// TODO: Replace placeholder entries with your real experience
export const experience: ExperienceEntry[] = [
  {
    role: 'Engineering Manager',
    company: 'Your Company',
    period: '2022–Present',
    location: 'Bangalore, India',
    current: true,
    bullets: [
      'Led a team of engineers delivering Java microservices in production',
      'Owned backend architecture decisions across multiple product verticals',
      'Drove performance improvements — query optimisation, connection pool tuning',
    ],
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'AWS', 'GitHub Actions'],
  },
  {
    role: 'Senior Backend Engineer',
    company: 'Previous Company',
    period: '2019–2022',
    location: 'Bangalore, India',
    bullets: [
      'Built and maintained high-throughput REST APIs serving millions of requests',
      'Introduced Flyway migrations and standardised DB versioning across the team',
      'Mentored junior engineers on Java best practices and testing strategies',
    ],
    tech: ['Java', 'Spring Boot', 'MySQL', 'Docker'],
  },
  {
    role: 'Backend Engineer',
    company: 'Early Role',
    period: '2017–2019',
    location: 'Bangalore, India',
    bullets: [
      'Developed backend services for consumer-facing products',
      'Gained hands-on experience with Java, Spring MVC, and relational databases',
    ],
    tech: ['Java', 'Spring MVC', 'MySQL'],
  },
]
```

- [ ] **Step 3: Create skills.ts**

Create `src/data/skills.ts`:

```ts
import type { Skill } from '@/lib/types'

export const skills: Skill[] = [
  // Languages
  { name: 'Java',       category: 'language',  iconSlug: 'coffeescript', primary: true },
  { name: 'SQL',        category: 'language',  iconSlug: 'postgresql',   primary: true },
  { name: 'Bash',       category: 'language',  iconSlug: 'gnubash' },

  // Frameworks & Libraries
  { name: 'Spring Boot', category: 'framework', iconSlug: 'springboot', primary: true },
  { name: 'Hibernate',   category: 'framework', iconSlug: 'hibernate' },
  { name: 'Flyway',      category: 'framework', iconSlug: 'flywaydb' },
  { name: 'HikariCP',    category: 'framework' },
  { name: 'JWT',         category: 'framework' },

  // Data
  { name: 'PostgreSQL',  category: 'data', iconSlug: 'postgresql', primary: true },
  { name: 'MySQL',       category: 'data', iconSlug: 'mysql' },
  { name: 'Redis',       category: 'data', iconSlug: 'redis' },

  // DevOps & Cloud
  { name: 'AWS',            category: 'devops', iconSlug: 'amazonwebservices', primary: true },
  { name: 'GitHub Actions', category: 'devops', iconSlug: 'githubactions',     primary: true },
  { name: 'Docker',         category: 'devops', iconSlug: 'docker' },
  { name: 'Linux',          category: 'devops', iconSlug: 'linux' },

  // Tools
  { name: 'Git',         category: 'tool', iconSlug: 'git' },
  { name: 'IntelliJ',   category: 'tool', iconSlug: 'intellijidea' },
  { name: 'Postman',    category: 'tool', iconSlug: 'postman' },
]

export const CATEGORIES: { key: Skill['category']; label: string }[] = [
  { key: 'language',  label: 'Languages' },
  { key: 'framework', label: 'Frameworks & Libraries' },
  { key: 'data',      label: 'Data' },
  { key: 'devops',    label: 'DevOps & Cloud' },
  { key: 'tool',      label: 'Tools' },
]
```

- [ ] **Step 4: Commit**

```bash
git add src/config/featured.ts src/data/experience.ts src/data/skills.ts
git commit -m "feat: add config/featured, data/experience, data/skills with placeholder content"
```

---

## Task 5: UI Atom — Tag Component

**Files:**
- Create: `src/components/ui/Tag.tsx`

- [ ] **Step 1: Create Tag**

Create `src/components/ui/Tag.tsx`:

```tsx
interface TagProps {
  children: React.ReactNode
  variant?: 'accent' | 'neutral'
}

export function Tag({ children, variant = 'neutral' }: TagProps) {
  return (
    <span
      className={
        variant === 'accent'
          ? 'bg-accent-light text-accent-dark font-mono text-[10px] px-2 py-0.5 rounded'
          : 'bg-surface text-muted font-mono text-[10px] px-2 py-0.5 rounded'
      }
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/Tag.tsx
git commit -m "feat: add Tag ui atom (accent/neutral variants)"
```

---

## Task 6: Nav — Replace Header

**Files:**
- Delete: `src/components/layout/Header.tsx`
- Delete: `src/components/layout/ThemeProvider.tsx`
- Delete: `src/components/layout/ThemeToggle.tsx`
- Delete: `src/components/home/TechStack.tsx`
- Create: `src/components/layout/Nav.tsx`

> **IMPORTANT:** Before writing Nav, check `node_modules/next/dist/docs/` for how `usePathname` and `Link` work in Next.js 16 static export mode. Verify that `usePathname` from `'next/navigation'` is available and correct.

- [ ] **Step 1: Delete old components**

```bash
rm src/components/layout/Header.tsx
rm src/components/layout/ThemeProvider.tsx
rm src/components/layout/ThemeToggle.tsx
rm src/components/home/TechStack.tsx
```

- [ ] **Step 2: Create Nav**

Create `src/components/layout/Nav.tsx`:

```tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/',           label: 'Home' },
  { href: '/about',      label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/work',       label: 'Work' },
  { href: '/skills',     label: 'Skills' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-paper/80 backdrop-blur-md border-b border-line shadow-sm'
          : ''
      }`}
    >
      <div className="max-w-5xl mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono font-bold text-ink text-sm tracking-tight hover:text-accent transition-colors"
        >
          luv2code
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors ${
                pathname === href
                  ? 'text-accent font-semibold'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`text-sm font-semibold px-3 py-1.5 rounded-md transition-colors ${
              pathname === '/contact'
                ? 'bg-accent-dark text-white'
                : 'bg-accent text-white hover:bg-accent-dark'
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
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden bg-surface border-b border-line px-8 py-6 flex flex-col gap-5">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm ${
                pathname === href ? 'text-accent font-semibold' : 'text-muted'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm font-semibold bg-accent text-white px-3 py-2 rounded-md text-center"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Nav.tsx
git commit -m "feat: add Nav with scroll-frosted effect and mobile hamburger, remove old layout components"
```

---

## Task 7: Footer

**Files:**
- Rewrite: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Rewrite Footer**

Replace the entire file:

```tsx
import Link from 'next/link'
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'

const SOCIALS = [
  { href: 'https://github.com/dangi-ai',                    icon: Github,    label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/sushil-dangi/',      icon: Linkedin,  label: 'LinkedIn' },
  { href: 'https://x.com/s_dangi98',                        icon: Twitter,   label: 'X / Twitter' },
  { href: 'https://www.instagram.com/smiley_s_d/',          icon: Instagram, label: 'Instagram' },
]

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
              className="text-muted hover:text-accent transition-colors"
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

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: rewrite Footer — minimal, social icons, emerald hover"
```

---

## Task 8: Root Layout

**Files:**
- Rewrite: `src/app/layout.tsx`

> **IMPORTANT:** Check `node_modules/next/dist/docs/` for how `metadata`, `next/font/google`, and root layout work in Next.js 16 before editing.

- [ ] **Step 1: Rewrite layout.tsx**

Replace the entire file:

```tsx
import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://luv2code.in'),
  title: { default: 'Luv2code — Sushil Dangi', template: '%s | Luv2code' },
  description:
    'Engineering Manager & Backend Engineer. Java · Spring Boot · AWS. I luv 2 code. I luv 2 share what I learn.',
  openGraph: {
    type: 'website',
    url: 'https://luv2code.in',
    siteName: 'Luv2code',
    images: [{ url: '/luv2code-icon.svg', width: 512, height: 512, alt: 'Luv2code' }],
  },
  twitter: { card: 'summary', site: '@s_dangi98' },
  icons: { icon: '/luv2code-favicon-64.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh flex flex-col bg-paper text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:font-mono focus:text-sm focus:rounded-lg"
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
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd luv2code-site && npx tsc --noEmit
```

Expected: errors only from files not yet rewritten (work/page.tsx, about/page.tsx, contact/page.tsx — ignore those for now).

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: rewrite root layout — Nav + Footer, remove ThemeProvider, clean light base"
```

---

## Task 9: Home Page

**Files:**
- Rewrite: `src/components/home/Hero.tsx`
- Create: `src/components/home/TechStrip.tsx`
- Rewrite: `src/components/home/FeaturedRepos.tsx`
- Rewrite: `src/app/page.tsx`
- Rewrite: `src/components/JsonLd.tsx`

- [ ] **Step 1: Rewrite Hero.tsx**

Replace the entire file:

```tsx
import Link from 'next/link'
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'

const SOCIALS = [
  { href: 'https://github.com/dangi-ai',                   icon: Github,    label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/sushil-dangi/',     icon: Linkedin,  label: 'LinkedIn' },
  { href: 'https://x.com/s_dangi98',                       icon: Twitter,   label: 'X / Twitter' },
  { href: 'https://www.instagram.com/smiley_s_d/',         icon: Instagram, label: 'Instagram' },
]

export function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-8 pt-20 pb-16 flex items-center justify-between gap-12 flex-wrap md:flex-nowrap">
      {/* Text column */}
      <div className="flex-1 min-w-0">
        <p
          className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] mb-4 animate-fade-up"
          style={{ animationDelay: '0ms' }}
        >
          Engineering Manager · Backend Engineer
        </p>

        <h1
          className="font-display text-5xl font-extrabold text-ink leading-[1.05] mb-5 animate-fade-up"
          style={{ animationDelay: '80ms' }}
        >
          Sushil Dangi
        </h1>

        <p
          className="text-muted text-base leading-relaxed max-w-md mb-3 animate-fade-up"
          style={{ animationDelay: '160ms' }}
        >
          I build scalable backend systems and lead engineering teams to ship production code daily.
        </p>
        <p
          className="text-ink font-medium text-base mb-8 animate-fade-up"
          style={{ animationDelay: '200ms' }}
        >
          I luv 2 code. I luv 2 share what I learn.
        </p>

        <div
          className="flex gap-3 flex-wrap mb-8 animate-fade-up"
          style={{ animationDelay: '240ms' }}
        >
          <Link
            href="/work"
            className="bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-accent-dark transition-colors"
          >
            View my work →
          </Link>
          <Link
            href="/contact"
            className="border-[1.5px] border-ink text-ink text-sm font-medium px-5 py-2.5 rounded-md hover:bg-surface transition-colors"
          >
            Get in touch
          </Link>
        </div>

        <div
          className="flex items-center gap-4 animate-fade-up"
          style={{ animationDelay: '280ms' }}
        >
          {SOCIALS.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted hover:text-accent transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      {/* Photo column */}
      <div className="flex-shrink-0 animate-fade-up" style={{ animationDelay: '160ms' }}>
        {/* Replace the div below with <Image> once a real headshot is available */}
        <div
          className="w-40 h-40 rounded-full bg-surface border-4 border-line flex items-center justify-center"
          aria-label="Photo of Sushil Dangi — placeholder"
        >
          <span className="font-display font-bold text-3xl text-muted select-none">SD</span>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create TechStrip.tsx**

Create `src/components/home/TechStrip.tsx`:

```tsx
const TECHS = [
  'Java 21', 'Spring Boot', 'PostgreSQL', 'Flyway',
  'AWS', 'GitHub Actions', 'Docker', 'JWT', 'HikariCP',
]

export function TechStrip() {
  return (
    <section className="border-y border-line py-6" aria-label="Technologies I work with">
      <div className="max-w-5xl mx-auto px-8">
        <p className="font-mono text-[10px] text-muted uppercase tracking-[0.2em] mb-4">
          Hands-on with
        </p>
        <div className="flex flex-wrap gap-2">
          {TECHS.map(tech => (
            <span
              key={tech}
              className="bg-surface text-muted font-mono text-xs px-3 py-1.5 rounded"
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

- [ ] **Step 3: Rewrite FeaturedRepos.tsx**

Replace the entire file:

```tsx
import Link from 'next/link'
import type { Repo } from '@/lib/types'
import { FEATURED_REPOS } from '@/config/featured'
import { getLanguageColor } from '@/lib/languageColors'
import { relativeTime } from '@/lib/relativeTime'
import { Star, GitFork } from 'lucide-react'

interface FeaturedReposProps {
  repos: Repo[]
}

function pickFeatured(repos: Repo[]): Repo[] {
  if (FEATURED_REPOS.length > 0) {
    const pinned = FEATURED_REPOS
      .map(name => repos.find(r => r.name === name))
      .filter(Boolean) as Repo[]
    if (pinned.length > 0) return pinned.slice(0, 3)
  }
  return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3)
}

export function FeaturedRepos({ repos }: FeaturedReposProps) {
  const featured = pickFeatured(repos)

  return (
    <section className="max-w-5xl mx-auto px-8 py-12">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display text-xl font-bold text-ink">Featured work</h2>
        <Link href="/work" className="text-sm text-accent font-medium hover:text-accent-dark transition-colors">
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
            className="bg-white border border-line rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-display font-bold text-sm text-accent leading-snug">{repo.name}</span>
              <span className="text-muted text-xs flex-shrink-0 mt-0.5" aria-hidden>↗</span>
            </div>

            {repo.description && (
              <p className="text-muted text-xs leading-relaxed flex-1">{repo.description}</p>
            )}

            <div className="flex flex-wrap gap-1.5">
              {repo.language && (
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded bg-accent-light text-accent-dark"
                >
                  {repo.language}
                </span>
              )}
              {repo.topics.slice(0, 2).map(t => (
                <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface text-muted">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 font-mono text-[10px] text-muted">
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

- [ ] **Step 4: Rewrite JsonLd.tsx**

Replace the entire file:

```tsx
export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sushil Dangi',
    url: 'https://luv2code.in',
    sameAs: [
      'https://github.com/dangi-ai',
      'https://www.linkedin.com/in/sushil-dangi/',
      'https://x.com/s_dangi98',
    ],
    jobTitle: 'Engineering Manager & Backend Engineer',
    description:
      'Engineering Manager & Backend Engineer specialising in Java, Spring Boot, PostgreSQL, and AWS.',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

- [ ] **Step 5: Rewrite src/app/page.tsx**

Replace the entire file:

```tsx
import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { TechStrip } from '@/components/home/TechStrip'
import { FeaturedRepos } from '@/components/home/FeaturedRepos'
import { JsonLd } from '@/components/JsonLd'
import repos from '@/data/repos.json'
import type { Repo } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Luv2code — Sushil Dangi',
  description:
    'Engineering Manager & Backend Engineer. Java · Spring Boot · AWS. I luv 2 code.',
  openGraph: { url: 'https://luv2code.in/' },
}

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <TechStrip />
      <FeaturedRepos repos={repos as Repo[]} />
    </>
  )
}
```

- [ ] **Step 6: Verify TypeScript and start dev server**

```bash
cd luv2code-site && npx tsc --noEmit
npm run dev
```

Open http://localhost:3000. Verify: hero text + initials avatar visible, tech strip visible, featured repos card grid visible, nav transparent on load and frosted on scroll, footer with icons.

- [ ] **Step 7: Commit**

```bash
git add src/components/home/ src/components/JsonLd.tsx src/app/page.tsx
git commit -m "feat: home page — hero, tech strip, featured repos, JsonLd"
```

---

## Task 10: About Page

**Files:**
- Rewrite: `src/app/about/page.tsx`

- [ ] **Step 1: Rewrite about/page.tsx**

Replace the entire file:

```tsx
import type { Metadata } from 'next'
import { skills } from '@/data/skills'
import type { Skill } from '@/lib/types'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Engineering Manager & Backend Engineer — Java, Spring Boot, PostgreSQL, AWS. My story and what I believe about building software.',
  openGraph: { url: 'https://luv2code.in/about' },
}

const CATEGORY_LABELS: Record<Skill['category'], string> = {
  language:  'Languages',
  framework: 'Frameworks & Libraries',
  data:      'Data',
  devops:    'DevOps & Cloud',
  tool:      'Tools',
}

const CATEGORIES: Skill['category'][] = ['language', 'framework', 'data', 'devops', 'tool']

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      {/* Header */}
      <p className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] mb-4">About</p>
      <h1 className="font-display text-4xl font-extrabold text-ink leading-tight mb-10">
        I luv 2 code.<br />I luv 2 share.
      </h1>

      {/* Bio */}
      <div className="max-w-2xl space-y-5 mb-14">
        <p className="text-muted leading-relaxed">
          I&apos;m an Engineering Manager and backend engineer with a deep focus on Java and
          Spring Boot. I care about clean architecture, predictable systems, and helping teams
          ship production code with confidence.
        </p>
        <p className="text-muted leading-relaxed">
          Beyond the code, I believe strongly in sharing what I learn — through open-source,
          writing, and building in public. That&apos;s the whole point of Luv2code.
        </p>
        <p className="text-muted leading-relaxed">
          {/* TODO: personalise this paragraph with your own story */}
          I&apos;ve spent years working on high-throughput backend systems, leading engineering
          teams, and obsessing over database performance and deployment automation.
        </p>
      </div>

      {/* Skills */}
      <div className="border-t border-line pt-10">
        <h2 className="font-display text-xl font-bold text-ink mb-8">Skills &amp; Technologies</h2>

        <div className="space-y-8">
          {CATEGORIES.map(cat => {
            const group = skills.filter(s => s.category === cat)
            if (group.length === 0) return null
            return (
              <div key={cat}>
                <p className="font-mono text-[10px] text-muted uppercase tracking-[0.15em] mb-3">
                  {CATEGORY_LABELS[cat]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.map(skill => (
                    <span
                      key={skill.name}
                      className={
                        skill.primary
                          ? 'bg-accent-light text-accent-dark font-mono text-xs px-3 py-1 rounded'
                          : 'bg-surface text-muted font-mono text-xs px-3 py-1 rounded'
                      }
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify in browser**

With dev server running, open http://localhost:3000/about. Check: heading visible, bio paragraphs readable, skills grouped by category with emerald/neutral chips.

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: about page — bio + grouped skills chips"
```

---

## Task 11: Experience Page

**Files:**
- Create: `src/components/experience/TimelineEntry.tsx`
- Create: `src/app/experience/page.tsx`

- [ ] **Step 1: Create TimelineEntry**

Create `src/components/experience/TimelineEntry.tsx`:

```tsx
import type { ExperienceEntry } from '@/lib/types'

interface TimelineEntryProps {
  entry: ExperienceEntry
  isLast: boolean
}

export function TimelineEntry({ entry, isLast }: TimelineEntryProps) {
  return (
    <div className="flex gap-5">
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <div
          className={`w-3 h-3 rounded-full flex-shrink-0 ${
            entry.current
              ? 'bg-accent'
              : 'bg-paper border-2 border-accent'
          }`}
        />
        {!isLast && <div className="w-0.5 flex-1 bg-line mt-1.5" />}
      </div>

      {/* Content */}
      <div className={`pb-10 flex-1 ${isLast ? 'pb-0' : ''}`}>
        <h3 className="font-display font-bold text-ink text-base">{entry.role}</h3>
        <p className="font-mono text-[11px] text-accent mt-1">
          {entry.company} · {entry.period}
        </p>
        <p className="font-mono text-[11px] text-muted mt-0.5">{entry.location}</p>

        <ul className="mt-4 space-y-1.5">
          {entry.bullets.map((b, i) => (
            <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
              <span className="text-accent mt-1 flex-shrink-0" aria-hidden>·</span>
              {b}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {entry.tech.map(t => (
            <span key={t} className="bg-surface text-muted font-mono text-[10px] px-2 py-0.5 rounded">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create experience/page.tsx**

```bash
mkdir -p src/app/experience
```

Create `src/app/experience/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { experience } from '@/data/experience'
import { TimelineEntry } from '@/components/experience/TimelineEntry'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Career timeline of Sushil Dangi — Engineering Manager and Backend Engineer.',
  openGraph: { url: 'https://luv2code.in/experience' },
}

export default function ExperiencePage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      <p className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] mb-4">
        Experience
      </p>
      <h1 className="font-display text-4xl font-extrabold text-ink leading-tight mb-12">
        Career timeline
      </h1>

      <div className="max-w-2xl">
        {experience.map((entry, i) => (
          <TimelineEntry
            key={`${entry.company}-${entry.period}`}
            entry={entry}
            isLast={i === experience.length - 1}
          />
        ))}
      </div>

      <p className="mt-10 font-mono text-xs text-muted border border-line rounded-md px-4 py-3 max-w-2xl">
        ⚠ Content is placeholder — update <code className="text-accent">src/data/experience.ts</code> with your real roles.
      </p>
    </div>
  )
}
```

- [ ] **Step 3: Verify in browser**

Open http://localhost:3000/experience. Check: heading, 3 timeline entries with dot + line connectors, tech tags, placeholder warning visible.

- [ ] **Step 4: Commit**

```bash
git add src/components/experience/ src/app/experience/
git commit -m "feat: experience page — vertical timeline with dot connectors and tech tags"
```

---

## Task 12: Work Page with Client-Side Filter

**Files:**
- Create: `src/components/work/filterRepos.ts`
- Create: `src/lib/__tests__/filterRepos.test.ts`
- Create: `src/components/work/RepoCard.tsx`
- Create: `src/components/work/RepoGrid.tsx`
- Rewrite: `src/app/work/page.tsx`

- [ ] **Step 1: Write filterRepos tests (TDD)**

Create `src/lib/__tests__/filterRepos.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { filterRepos } from '../../components/work/filterRepos'
import type { Repo } from '../types'

const base: Repo = {
  id: 1, full_name: 'dangi-ai/a', html_url: 'https://github.com/dangi-ai/a',
  homepage: null, fork: false, archived: false,
  topics: [], updated_at: '2026-01-01T00:00:00Z',
  stargazers_count: 0, forks_count: 0,
  name: '', description: null, language: null,
}

const repos: Repo[] = [
  { ...base, id: 1, name: 'spring-starter',   description: 'Spring Boot template', language: 'Java',   stargazers_count: 10, updated_at: '2026-03-01T00:00:00Z' },
  { ...base, id: 2, name: 'pg-utils',          description: 'Postgres helpers',     language: 'SQL',    stargazers_count: 3,  updated_at: '2026-04-01T00:00:00Z' },
  { ...base, id: 3, name: 'actions-deploy',    description: 'CI/CD workflows',      language: 'YAML',   stargazers_count: 5,  updated_at: '2026-02-01T00:00:00Z' },
]

describe('filterRepos', () => {
  it('returns all repos when no filters applied', () => {
    expect(filterRepos(repos, { query: '', language: 'all', sort: 'stars' })).toHaveLength(3)
  })

  it('filters by name query (case-insensitive)', () => {
    const result = filterRepos(repos, { query: 'spring', language: 'all', sort: 'stars' })
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('spring-starter')
  })

  it('filters by description query', () => {
    const result = filterRepos(repos, { query: 'postgres', language: 'all', sort: 'stars' })
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('pg-utils')
  })

  it('filters by language', () => {
    const result = filterRepos(repos, { query: '', language: 'Java', sort: 'stars' })
    expect(result).toHaveLength(1)
    expect(result[0].language).toBe('Java')
  })

  it('sorts by stars descending', () => {
    const result = filterRepos(repos, { query: '', language: 'all', sort: 'stars' })
    expect(result.map(r => r.stargazers_count)).toEqual([10, 5, 3])
  })

  it('sorts by updated_at descending', () => {
    const result = filterRepos(repos, { query: '', language: 'all', sort: 'updated' })
    expect(result[0].name).toBe('pg-utils')
    expect(result[2].name).toBe('actions-deploy')
  })

  it('returns empty array when no match', () => {
    expect(filterRepos(repos, { query: 'zzz', language: 'all', sort: 'stars' })).toHaveLength(0)
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
cd luv2code-site && npx vitest run src/lib/__tests__/filterRepos.test.ts
```

Expected: FAIL — `Cannot find module '../../components/work/filterRepos'`

- [ ] **Step 3: Implement filterRepos**

```bash
mkdir -p src/components/work
```

Create `src/components/work/filterRepos.ts`:

```ts
import type { Repo } from '@/lib/types'

export interface FilterOptions {
  query: string
  language: string
  sort: 'stars' | 'updated'
}

export function filterRepos(repos: Repo[], opts: FilterOptions): Repo[] {
  const q = opts.query.toLowerCase().trim()

  let result = repos.filter(r => {
    const matchesQuery =
      !q ||
      r.name.toLowerCase().includes(q) ||
      (r.description ?? '').toLowerCase().includes(q)

    const matchesLang =
      opts.language === 'all' || r.language === opts.language

    return matchesQuery && matchesLang
  })

  if (opts.sort === 'stars') {
    result = result.sort((a, b) => b.stargazers_count - a.stargazers_count)
  } else {
    result = result.sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
  }

  return result
}
```

- [ ] **Step 4: Run test — verify it passes**

```bash
cd luv2code-site && npx vitest run src/lib/__tests__/filterRepos.test.ts
```

Expected: 7 tests PASS

- [ ] **Step 5: Create RepoCard**

Create `src/components/work/RepoCard.tsx`:

```tsx
import type { Repo } from '@/lib/types'
import { relativeTime } from '@/lib/relativeTime'
import { getLanguageColor } from '@/lib/languageColors'
import { Star, GitFork, ExternalLink } from 'lucide-react'

interface RepoCardProps {
  repo: Repo
  featured?: boolean
}

export function RepoCard({ repo, featured = false }: RepoCardProps) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`bg-white border border-line rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3 ${
        featured ? 'border-t-2 border-t-accent' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`font-display font-bold text-sm leading-snug ${
            featured ? 'text-accent' : 'text-ink'
          }`}
        >
          {repo.name}
        </span>
        <ExternalLink size={12} className="text-muted flex-shrink-0 mt-0.5" aria-hidden />
      </div>

      {repo.description && (
        <p className="text-muted text-xs leading-relaxed flex-1">{repo.description}</p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {repo.language && (
          <span className="flex items-center gap-1 bg-surface font-mono text-[10px] px-2 py-0.5 rounded text-ink">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: getLanguageColor(repo.language) }}
              aria-hidden
            />
            {repo.language}
          </span>
        )}
        {repo.topics.slice(0, 3).map(t => (
          <span key={t} className="bg-surface text-muted font-mono text-[10px] px-2 py-0.5 rounded">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 font-mono text-[10px] text-muted">
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
            className="ml-auto text-accent hover:underline"
            aria-label={`Live site for ${repo.name}`}
          >
            live ↗
          </a>
        )}
        {!repo.homepage && (
          <span className="ml-auto">{relativeTime(repo.updated_at)}</span>
        )}
      </div>
    </a>
  )
}
```

- [ ] **Step 6: Create RepoGrid (client component)**

Create `src/components/work/RepoGrid.tsx`:

```tsx
'use client'

import { useState, useMemo } from 'react'
import type { Repo } from '@/lib/types'
import { FEATURED_REPOS } from '@/config/featured'
import { filterRepos } from './filterRepos'
import { RepoCard } from './RepoCard'
import { Search } from 'lucide-react'

interface RepoGridProps {
  repos: Repo[]
}

export function RepoGrid({ repos }: RepoGridProps) {
  const [query, setQuery]       = useState('')
  const [language, setLanguage] = useState('all')
  const [sort, setSort]         = useState<'stars' | 'updated'>('stars')

  const languages = useMemo(() => {
    const langs = repos.map(r => r.language).filter(Boolean) as string[]
    return ['all', ...Array.from(new Set(langs)).sort()]
  }, [repos])

  const filtered = useMemo(
    () => filterRepos(repos, { query, language, sort }),
    [repos, query, language, sort]
  )

  const featuredSet = new Set(FEATURED_REPOS)

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 items-center mb-8">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            placeholder="Search repos…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-white border border-line rounded-md pl-8 pr-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            aria-label="Search repositories"
          />
        </div>

        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="bg-white border border-line rounded-md px-3 py-2 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
          aria-label="Filter by language"
        >
          {languages.map(l => (
            <option key={l} value={l}>{l === 'all' ? 'All languages' : l}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={e => setSort(e.target.value as 'stars' | 'updated')}
          className="bg-white border border-line rounded-md px-3 py-2 text-sm text-ink focus:outline-none focus:border-accent transition-colors"
          aria-label="Sort repositories"
        >
          <option value="stars">Sort: Stars</option>
          <option value="updated">Sort: Recently updated</option>
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-muted text-sm font-mono text-center py-16">
          No repos match your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(repo => (
            <RepoCard
              key={repo.id}
              repo={repo}
              featured={featuredSet.has(repo.name)}
            />
          ))}
        </div>
      )}

      <p className="mt-6 font-mono text-[10px] text-muted text-center">
        Showing {filtered.length} of {repos.length} repos · fetched from github.com/dangi-ai at build time
      </p>
    </div>
  )
}
```

- [ ] **Step 7: Rewrite work/page.tsx**

Replace the entire file:

```tsx
import type { Metadata } from 'next'
import repos from '@/data/repos.json'
import type { Repo } from '@/lib/types'
import { RepoGrid } from '@/components/work/RepoGrid'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Open source repositories by Sushil Dangi — Java, Spring Boot, backend tools.',
  openGraph: { url: 'https://luv2code.in/work' },
}

export default function WorkPage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      <p className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] mb-4">Work</p>
      <h1 className="font-display text-4xl font-extrabold text-ink leading-tight mb-10">
        Open source repos
      </h1>
      <RepoGrid repos={repos as Repo[]} />
    </div>
  )
}
```

- [ ] **Step 8: Verify in browser**

Open http://localhost:3000/work. Check: search input, language dropdown, sort dropdown all functional; typing in search filters cards in real time; language filter works; sort changes order.

- [ ] **Step 9: Commit**

```bash
git add src/components/work/ src/app/work/page.tsx src/lib/__tests__/filterRepos.test.ts
git commit -m "feat: work page — client-side filter/sort RepoGrid, RepoCard with featured accent border"
```

---

## Task 13: Skills Page

**Files:**
- Create: `src/components/skills/SkillCard.tsx`
- Create: `src/components/skills/SkillGroup.tsx`
- Create: `src/app/skills/page.tsx`

- [ ] **Step 1: Create SkillCard**

```bash
mkdir -p src/components/skills
```

Create `src/components/skills/SkillCard.tsx`:

```tsx
import type { Skill } from '@/lib/types'

interface SkillCardProps {
  skill: Skill
}

// Map iconSlug to a simple text monogram fallback (2 letters)
function monogram(name: string): string {
  return name.slice(0, 2).toUpperCase()
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className="bg-white border border-line rounded-lg p-3 flex flex-col items-center gap-2 min-w-[76px] hover:shadow-sm transition-shadow">
      <div
        className="w-8 h-8 rounded flex items-center justify-center bg-surface text-muted font-mono text-xs font-bold select-none"
        aria-hidden
      >
        {monogram(skill.name)}
      </div>
      <span className="font-mono text-[10px] text-ink text-center leading-tight font-semibold">
        {skill.name}
      </span>
    </div>
  )
}
```

> **Note:** The monogram fallback is intentional for the initial build. To add brand SVG icons later, replace the monogram `<div>` with the appropriate `@icons-pack/react-simple-icons` component using `skill.iconSlug`. Check the package's README for the exact import pattern.

- [ ] **Step 2: Create SkillGroup**

Create `src/components/skills/SkillGroup.tsx`:

```tsx
import type { Skill } from '@/lib/types'
import { SkillCard } from './SkillCard'

interface SkillGroupProps {
  label: string
  skills: Skill[]
}

export function SkillGroup({ label, skills }: SkillGroupProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" aria-hidden />
        <h2 className="font-mono text-xs text-ink font-semibold uppercase tracking-[0.15em]">
          {label}
        </h2>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map(skill => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create skills/page.tsx**

```bash
mkdir -p src/app/skills
```

Create `src/app/skills/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { skills, CATEGORIES } from '@/data/skills'
import { SkillGroup } from '@/components/skills/SkillGroup'

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Technologies Sushil Dangi works with — Java, Spring Boot, PostgreSQL, AWS, Docker, and more.',
  openGraph: { url: 'https://luv2code.in/skills' },
}

export default function SkillsPage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      <p className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] mb-4">Skills</p>
      <h1 className="font-display text-4xl font-extrabold text-ink leading-tight mb-12">
        Tech I work with
      </h1>

      <div className="space-y-12">
        {CATEGORIES.map(({ key, label }) => {
          const group = skills.filter(s => s.category === key)
          if (group.length === 0) return null
          return <SkillGroup key={key} label={label} skills={group} />
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Verify in browser**

Open http://localhost:3000/skills. Check: 5 category groups rendered, skill cards with monograms, emerald dot section headers.

- [ ] **Step 5: Commit**

```bash
git add src/components/skills/ src/app/skills/
git commit -m "feat: skills page — category groups with monogram cards"
```

---

## Task 14: Contact Page

**Files:**
- Create: `src/components/contact/SocialCard.tsx`
- Rewrite: `src/app/contact/page.tsx`

- [ ] **Step 1: Create SocialCard**

```bash
mkdir -p src/components/contact
```

Create `src/components/contact/SocialCard.tsx`:

```tsx
import { ExternalLink } from 'lucide-react'

interface SocialCardProps {
  href: string
  platform: string
  handle: string
  iconBg: string
  iconText: string
  ariaLabel: string
}

export function SocialCard({ href, platform, handle, iconBg, iconText, ariaLabel }: SocialCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="bg-white border border-line rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow group"
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
        className="text-muted group-hover:text-accent transition-colors flex-shrink-0"
        aria-hidden
      />
    </a>
  )
}
```

- [ ] **Step 2: Rewrite contact/page.tsx**

Replace the entire file:

```tsx
import type { Metadata } from 'next'
import { SocialCard } from '@/components/contact/SocialCard'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Get in touch with Sushil Dangi — let's build something great together.",
  openGraph: { url: 'https://luv2code.in/contact' },
}

const SOCIALS = [
  {
    href:      'https://github.com/dangi-ai',
    platform:  'GitHub',
    handle:    'github.com/dangi-ai',
    iconBg:    '#1A1714',
    iconText:  'GH',
    ariaLabel: 'Sushil Dangi on GitHub',
  },
  {
    href:      'https://www.linkedin.com/in/sushil-dangi/',
    platform:  'LinkedIn',
    handle:    'linkedin.com/in/sushil-dangi',
    iconBg:    '#0A66C2',
    iconText:  'in',
    ariaLabel: 'Sushil Dangi on LinkedIn',
  },
  {
    href:      'https://x.com/s_dangi98',
    platform:  'X / Twitter',
    handle:    '@s_dangi98',
    iconBg:    '#000000',
    iconText:  '𝕏',
    ariaLabel: 'Sushil Dangi on X',
  },
  {
    href:      'https://www.instagram.com/smiley_s_d/',
    platform:  'Instagram',
    handle:    '@smiley_s_d',
    iconBg:    'linear-gradient(135deg, #F58529, #DD2A7B, #8134AF)',
    iconText:  'IG',
    ariaLabel: 'Sushil Dangi on Instagram',
  },
]

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      <p className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] mb-4">Contact</p>
      <h1 className="font-display text-4xl font-extrabold text-ink leading-tight mb-4">
        Let&apos;s build something great.
      </h1>
      <p className="text-muted leading-relaxed max-w-lg mb-12">
        I&apos;m always open to interesting conversations, collaborations, or just a good engineering chat.
      </p>

      <div className="flex flex-col gap-3 max-w-lg mb-12">
        {SOCIALS.map(s => (
          <SocialCard key={s.href} {...s} />
        ))}
      </div>

      <div className="text-center max-w-lg">
        <a
          href="mailto:dangi.sushil5@gmail.com"
          className="inline-block bg-accent text-white font-semibold text-sm px-6 py-3 rounded-md hover:bg-accent-dark transition-colors"
        >
          Say hi via email →
        </a>
        <p className="font-mono text-xs text-muted mt-3">dangi.sushil5@gmail.com</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify in browser**

Open http://localhost:3000/contact. Check: 4 social cards visible with brand backgrounds, email CTA button, all links open in new tab.

- [ ] **Step 4: Commit**

```bash
git add src/components/contact/ src/app/contact/page.tsx
git commit -m "feat: contact page — social cards + email CTA"
```

---

## Task 15: SEO — Sitemap + Robots

**Files:**
- Rewrite: `public/sitemap.xml`
- Check: `public/robots.txt`

- [ ] **Step 1: Verify static assets are correct**

```bash
cat public/CNAME       # must contain exactly: luv2code.in
cat public/robots.txt  # must have: Allow: / and Sitemap: https://luv2code.in/sitemap.xml
ls public/.nojekyll    # must exist (empty file)
```

If `.nojekyll` is missing: `touch public/.nojekyll`

- [ ] **Step 2: Update sitemap.xml with all 6 pages**

Read `public/sitemap.xml`, then replace with:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://luv2code.in/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://luv2code.in/about/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://luv2code.in/experience/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://luv2code.in/work/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://luv2code.in/skills/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://luv2code.in/contact/</loc>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

- [ ] **Step 2: Check robots.txt**

Read `public/robots.txt`. It should contain at minimum:

```
User-agent: *
Allow: /

Sitemap: https://luv2code.in/sitemap.xml
```

If the `Sitemap:` line is missing, add it.

- [ ] **Step 3: Commit**

```bash
git add public/sitemap.xml public/.nojekyll
git commit -m "feat: update sitemap with all 6 pages, verify static assets"
```

---

## Task 16: Build Verification

**Goal:** `npm run build` produces a clean static export with all 6 pages and zero TypeScript errors.

- [ ] **Step 1: Run all tests**

```bash
cd luv2code-site && npm test
```

Expected: all tests PASS (relativeTime: 6, filterRepos: 7).

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 3: Run the build**

```bash
npm run build
```

Expected: completes successfully, `out/` directory created.

- [ ] **Step 4: Verify out/ contents**

```bash
ls out/
ls out/about/
ls out/experience/
ls out/work/
ls out/skills/
ls out/contact/
```

Expected: each directory contains an `index.html` file.

- [ ] **Step 5: Spot-check rendered HTML**

```bash
grep -l "Sushil Dangi" out/index.html
grep -l "Career timeline" out/experience/index.html
grep -l "Tech I work with" out/skills/index.html
```

Expected: each grep returns the file path (content is present).

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: final build verification — all 6 pages exported, 0 TS errors"
```

---

## Appendix — Content TODOs

These require your input and are NOT blocking the build:

| What | Where | How |
|---|---|---|
| Real headshot | `src/components/home/Hero.tsx` | Replace `<div>SD</div>` with `<Image src="/headshot.jpg" ...>` and drop `headshot.jpg` in `public/` |
| Real experience | `src/data/experience.ts` | Edit the 3 placeholder entries with your actual roles, companies, dates, bullets |
| Featured repos | `src/config/featured.ts` | Add repo names to `FEATURED_REPOS` array e.g. `['spring-boot-starter']` |
| About bio | `src/app/about/page.tsx` | Edit the 3 `<p>` paragraphs; remove the TODO comment |
| Skills list | `src/data/skills.ts` | Add/remove entries; set `primary: true` for your strongest skills |
