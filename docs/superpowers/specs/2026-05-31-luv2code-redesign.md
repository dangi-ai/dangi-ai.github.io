# luv2code.in — Full Redesign Spec
**Date:** 2026-05-31  
**Status:** Approved  
**Scope:** Complete rebuild of the luv2code.in personal portfolio site from scratch

---

## 1. Overview

Rebuild the personal portfolio site at **https://luv2code.in** for Sushil Dangi — Engineering Manager & Backend Engineer. The existing dark OLED coral/mint theme is replaced with a **Clean Light editorial design** with an **Emerald accent**. All pages are rebuilt from scratch; no existing component code is reused.

**Deployment:** Static export (`next build` → `out/`) to GitHub Pages. No server runtime.  
**Stack:** Next.js 16.2.6, React 19, Tailwind CSS v4, TypeScript. Already installed.

---

## 2. Design Tokens

### Colour Palette
```css
--paper:        #F8F7F4   /* page background */
--surface:      #F0EDE8   /* card backgrounds, nav bg on scroll */
--border:       #E5E1DA   /* dividers, card borders */
--muted:        #6B6560   /* secondary text */
--ink:          #1A1714   /* headings, body text */
--accent:       #059669   /* CTAs, active links, timeline dots */
--accent-light: #D1FAE5   /* tag backgrounds, chip fills */
--accent-dark:  #047857   /* hover states on accent elements */
```

### Typography
- **Headings:** Space Grotesk (already loaded via `next/font/google`)
- **Body:** DM Sans (already loaded)
- **Code / labels / tags / stats:** JetBrains Mono (already loaded)

### Type Scale
| Role | Size | Weight | Font |
|---|---|---|---|
| Page hero name | 42px | 800 | Space Grotesk |
| Page h2 | 28px | 800 | Space Grotesk |
| Section h3 | 22–24px | 700 | Space Grotesk |
| Card title | 12–14px | 700 | Space Grotesk |
| Body | 14–15px | 400 | DM Sans |
| Eyebrow label | 10px | 400 | JetBrains Mono, uppercase, letter-spacing 2px |
| Tag / chip | 10–11px | 400 | JetBrains Mono |
| Stats / metadata | 10px | 400 | JetBrains Mono |

### Spacing
- Page horizontal padding: `px-8` (32px) on desktop, `px-4` (16px) on mobile
- Max content width: `max-w-5xl` (1024px), centered
- Section vertical gap: `py-12` (48px) between major zones

---

## 3. Component Library

### Navigation
- Transparent by default; gains `bg-[--surface]/80 backdrop-blur border-b border-[--border]` on scroll (via `useEffect` + `scrollY > 10`)
- Logo left: `luv2code` in JetBrains Mono, font-bold, links to `/`
- Links right: Home · About · Experience · Work · Skills · Contact
- "Contact" renders as a filled emerald button (`bg-[--accent] text-white rounded-md px-3 py-1.5 text-sm`)
- Active page link: `text-[--accent] font-semibold`
- Mobile: hamburger menu (Lucide `Menu` icon) → full-screen overlay with same links stacked

### Buttons
- **Primary:** `bg-[--accent] text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-[--accent-dark] transition`
- **Secondary (outline dark):** `border-[1.5px] border-[--ink] text-[--ink] px-5 py-2 rounded-md text-sm font-medium hover:bg-[--surface] transition`
- **Outline accent:** `border-[1.5px] border-[--accent] text-[--accent] px-5 py-2 rounded-md text-sm font-medium hover:bg-[--accent-light] transition`

### Tags / Chips
- **Emerald:** `bg-[--accent-light] text-[--accent-dark] font-mono text-[10px] px-2 py-0.5 rounded`
- **Neutral:** `bg-[--surface] text-[--muted] font-mono text-[10px] px-2 py-0.5 rounded`

### Repo Card
White card (`bg-white border border-[--border] rounded-lg p-4 shadow-sm`). Featured repos (in FEATURED_REPOS config) get `border-t-2 border-t-[--accent]`. Contents: repo name (link, font-bold), description, tag row (language + topics), stats row (stars · forks · updated-relative). Hover: `shadow-md` transition.

### Experience Timeline Entry
Left column: emerald filled dot (current role) or ring dot (past roles) + vertical line connector. Right column: title (font-bold), company + dates in JetBrains Mono emerald, location in muted mono, bullet achievements in DM Sans, tech tag row.

### Skill Card
`bg-white border border-[--border] rounded-lg p-3 text-center min-w-[72px]`. SVG icon (Lucide or Devicons) at 28px, name in JetBrains Mono below. Grouped by category under section headers with emerald dot.

### Social Card (Contact)
`bg-white border border-[--border] rounded-lg p-4 flex items-center gap-3 hover:shadow-md transition cursor-pointer`. Brand-coloured icon square, platform name + handle, `↗` arrow right-aligned.

### Footer
`border-t border-[--border] py-4 px-8 flex justify-between text-xs text-[--muted] font-mono`. Left: `luv2code · Sushil Dangi`. Right: icon links to all 4 socials.

---

## 4. Pages

### 4.1 Home (`/`)

**Zones (top to bottom):**

1. **Nav** — transparent → frosted on scroll (see Navigation above)

2. **Hero** — `pt-24 pb-16`
   - Left: eyebrow label (`ENGINEERING MANAGER · BACKEND ENGINEER`), h1 (`Sushil Dangi`), 2-para tagline, primary + secondary CTA buttons, social icon links row below buttons
   - Right: circular headshot `w-36 h-36 rounded-full object-cover` (placeholder until real photo provided; use initials avatar)
   - Layout: `flex justify-between items-center gap-8` on desktop; stacked column on mobile (photo above text)

3. **Tech strip** — `border-y border-[--border] py-6`
   - Eyebrow: `HANDS-ON WITH`
   - Chip row of techs: Java 21, Spring Boot, PostgreSQL, Flyway, GitHub Actions, AWS, Docker, JWT, HikariCP

4. **Featured work** — `py-12`
   - Heading: `Featured work` + `View all repos →` right-aligned emerald link to `/work`
   - 3-column card grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`)
   - Data source: `src/data/repos.json` filtered by `FEATURED_REPOS` config (falls back to top-starred)

5. **Footer**

### 4.2 About (`/about`)

**Zones:**

1. **Page header** — eyebrow `ABOUT`, h2 `I luv 2 code. I luv 2 share.`
2. **Bio** — 2 paragraphs in DM Sans, readable line-length (`max-w-2xl`)
3. **Skills divider section** — `border-t border-[--border] pt-8`
   - Heading: `Skills & Technologies`
   - 4 subsections: Languages · Frameworks & Libraries · Data · DevOps & Cloud
   - Each: mono uppercase label + chip row (emerald for primary, neutral for secondary)

### 4.3 Experience (`/experience`)

**Zones:**

1. **Page header** — eyebrow `EXPERIENCE`, h2 `Career timeline`
2. **Timeline** — `max-w-2xl`
   - Each entry: dot + vertical line connector (last entry has no line), role title, company + date range + location in mono, bullet list of achievements, tech tag row
   - Current role: filled emerald dot; past roles: ring dot; oldest role: faded/muted
3. **Placeholder note** — amber info box: "Fill in your real experience in `src/data/experience.ts`"

**Data source:** `src/data/experience.ts` — exported array of `ExperienceEntry` objects. Typed interface:
```ts
interface ExperienceEntry {
  role: string
  company: string
  period: string        // e.g. "2022–Present"
  location: string
  bullets: string[]
  tech: string[]
  current?: boolean
}
```

### 4.4 Work (`/work`)

**Zones:**

1. **Page header** — eyebrow `WORK`, h2 `Open source repos`
2. **Filter bar** — search input (client-side, filters `repos.json` in memory) + language select dropdown + sort select (Stars / Recently updated)
3. **Repo grid** — responsive `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`; all filtering/sorting is client-side over the pre-baked JSON
4. **Footer note** — mono text: `Showing N repos · fetched from github.com/dangi-ai at build time`

**Data source:** `src/data/repos.json` — fetched by `scripts/fetch-repos.mjs` at build time from `https://api.github.com/users/dangi-ai/repos?per_page=100&sort=updated`. Forks excluded, archived repos excluded. Language→color map lives in `src/lib/languageColors.ts`.

**Config:** `src/config/featured.ts` exports `FEATURED_REPOS: string[]` — names of repos to pin. If empty, falls back to top-5 by stars.

### 4.5 Skills (`/skills`)

**Zones:**

1. **Page header** — eyebrow `SKILLS`, h2 `Tech I work with`
2. **Category sections** — Languages · Frameworks & Libraries · Data · DevOps & Cloud · Tools
   - Each section: emerald-dot section header + horizontal wrap of Skill Cards
   - Icons: use SVG icons from `@icons-pack/react-simple-icons` (install as dev dep) for tech brand icons (Java, Spring, AWS, Docker, etc.); Lucide for generic icons; styled 2-letter monogram as last fallback

**Data source:** `src/data/skills.ts` — exported array of skill objects. Typed:
```ts
interface Skill {
  name: string
  category: 'language' | 'framework' | 'data' | 'devops' | 'tool'
  icon?: string   // simple-icons slug or lucide icon name
  primary?: boolean   // gets emerald chip on About page
}
```

### 4.6 Contact (`/contact`)

**Zones:**

1. **Page header** — eyebrow `CONTACT`, h2 `Let's build something great.`, 1-line sub-copy
2. **Social cards** — stacked list of 4 Social Cards: GitHub, LinkedIn, X, Instagram (all open in new tab with `rel="noopener noreferrer"`)
3. **Email CTA** — primary emerald button `Say hi via email →` with `href="mailto:dangi.sushil5@gmail.com"`; email shown in mono text below

---

## 5. Data Files

| File | Purpose |
|---|---|
| `src/data/repos.json` | GitHub repos; auto-generated by `scripts/fetch-repos.mjs` at build |
| `src/data/experience.ts` | Career timeline entries; manually maintained |
| `src/data/skills.ts` | Skills list with categories; manually maintained |
| `src/config/featured.ts` | `FEATURED_REPOS` array; manually maintained |
| `src/lib/languageColors.ts` | Static map of language name → hex color |
| `src/lib/types.ts` | Shared TypeScript interfaces (`Repo`, `ExperienceEntry`, `Skill`) |

---

## 6. SEO & Meta

- `metadataBase`: `https://luv2code.in`
- Per-page `<title>` and `<meta name="description">` via Next.js `metadata` export
- Open Graph + Twitter Card tags on every page
- JSON-LD `Person` schema on Home
- `public/robots.txt` and `public/sitemap.xml` (static, hand-authored)
- `public/CNAME` → `luv2code.in`
- `public/.nojekyll`
- All images have `alt` attributes; icon-only links have `aria-label`
- `prefers-reduced-motion` respected: wrap CSS transitions in `@media (prefers-reduced-motion: no-preference)`

---

## 7. Interactions & Animation

- Nav scroll transition: `transition: background 200ms, border-color 200ms`
- Card hover: `transition: box-shadow 150ms` → `shadow-md`
- Button hover: `transition: background 150ms`
- Hero entry: single staggered fade-up on page load (name → tagline → CTAs, 100ms stagger, 300ms duration). CSS-only via `animation-delay`. Skipped if `prefers-reduced-motion`.
- No scroll-triggered animations beyond the nav.

---

## 8. Responsive Breakpoints

| Breakpoint | Layout changes |
|---|---|
| `< 640px` (mobile) | Hero stacks (photo above text), 1-col repo grid, hamburger nav |
| `640–1023px` (tablet) | 2-col repo grid, nav links visible |
| `≥ 1024px` (desktop) | 3-col repo grid, full hero split |

---

## 9. What Needs Content

The following require real data before the site is complete. Build with clearly labelled placeholders:

- **Headshot** — circular `w-36 h-36` photo in hero. Placeholder: initials avatar `SD` with `bg-[--surface]`.
- **Experience entries** — fill `src/data/experience.ts` with real roles, companies, dates, bullets.
- **Bio copy** — the About page paragraphs use placeholder text derived from the prompt; review and personalise.
- **FEATURED_REPOS** — update `src/config/featured.ts` with the 3 repo names to highlight.
- **Skills list** — review `src/data/skills.ts` and add/remove items as needed.

---

## 10. Out of Scope

- Contact form (no server runtime on GitHub Pages; mailto only)
- Blog / writing section
- Dark mode toggle (clean light only — can be added later)
- Analytics (can be added later via `<Script>` in layout)
