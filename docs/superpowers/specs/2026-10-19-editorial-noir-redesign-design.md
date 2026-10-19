# Editorial Noir Redesign — Design Spec

**Date:** 2026-10-19
**Status:** Implemented
**Reference:** https://reposeresidence.com/ (analysed with REA `capture_browser_scenario`,
evidence `ev_85e381541b1217af01b1d43009cc9459c5129a3b4665e89866211311929b0578`)
**Scope:** All 6 pages (Home, Work, Skills, Experience, About, Contact)

## What the reference actually does (observed)

Observed from the shipped HTML, `index-Dvt1c2aj.css`, `ReposeLifestyle-CyDo--Vq.css`
and a 1440×900 screenshot of the first viewport. Nothing below is guessed from
the site's source; everything was read from the served artifacts.

### Palette

| Role | Value |
|---|---|
| Ink (page background) | `#090c10` |
| Paper (text) | `#f6f4f1` |
| Hairlines | white at 8–24% alpha (`#ffffff14`, `#ffffff24`, `#f6f4f157`) |
| Secondary text | paper at 55–85% alpha (`#f6f4f194`, `#ffffffd6`) |
| Light-section accents | warm creams `#f4f1e8`, `#e4e1d6`; olive greys `#2f3229`, `#5c6350` |

There is no saturated accent colour. The only colour is a WhatsApp button.

### Typography

- Display: self-hosted serif (`ReposeDisplay`), fallback **Instrument Serif**,
  weight 300–400, line-height `.86–.96`, tracking `-.025em` on large sizes.
  Italic is used for emphasis inside headings (`Tallest <em>in Al Furjan.</em>`).
- Sans: self-hosted (`ReposeSans`), fallback **Manrope**, weight 300–400.
- Labels: uppercase, tiny (`.58–.78rem`), very wide tracking (`.12em`–`.46em`).
- Type scale tokens: hero `clamp(4.5rem,12.5vw,14.5rem)`, chapter
  `clamp(3.4rem,8.4vw,9.2rem)`, statement `clamp(2.2rem,4.2vw,4rem)`, lead
  `clamp(1.35rem,2vw,2.05rem)`, body `1rem`, small `.875rem`, ui `.75rem`,
  micro `.6875rem`.
- Gutters: `--gutter: clamp(1.6rem,6.5vw,8.5rem)`,
  `--gutter-block: clamp(1.8rem,5vh,3.6rem)`.

### Layout devices

- Full-viewport opening: huge two-line serif title bottom-left, 1px rule
  (`opacity .42`, `scaleX` reveal), uppercase tracked tagline, "Scroll" hint
  centred at the bottom (label + 1px vertical track with a travelling beam +
  chevron), a "Developed by" lockup bottom-right, and a 1px progress meter
  along the bottom edge.
- Index rows: `grid 56px 1fr auto`, `border-top: 1px`, tabular-num index,
  serif name, hover `translateX(10px)`; inactive rows at `opacity .4`.
- Fact rows: `border-top: 1px`, index + content, `padding: 32px 0`.
- CTA: uppercase tracked text, hairline underline (`::after`), arrow that
  moves `translate(3px,-3px)` on hover. No filled buttons.
- Background field: faint grid (`repeating-linear-gradient` every 92px,
  white at 5–8%) masked by a radial gradient; vertical hairlines that
  `scaleY` in.
- No border radius on cards, no glass blur, no gradients on text.

### Motion

- Easings: `cubic-bezier(.22,1,.36,1)` (22 uses) and
  `cubic-bezier(.22,.61,.36,1)` (21 uses); durations `.32s`–`1.2s`.
- Line reveal: `overflow:hidden` wrapper, inner `translateY(116%)` → `0`.
- Rules grow from `scaleX(0)` / `scaleY(0)`.
- Scroll hint label "breathes" (`2.6s ease-in-out infinite`); the beam runs
  `2.6s cubic-bezier(.7,0,.3,1) infinite`.
- Everything is disabled under `prefers-reduced-motion`.
- Scroll is smoothed by Lenis and the opening is a GSAP ScrollTrigger-driven
  canvas frame sequence (`height: 1380vh`). **Not replicated** — it needs a
  rendered film; the portfolio has no such asset.

## What we take, and what we change

Goal: make luv2code feel like a quiet editorial publication rather than a SaaS
dashboard. Monochrome ink/paper, serif display, hairlines instead of cards,
tracked uppercase labels, slow eased reveals. All copy, data files and routes
stay the same. This is a presentation-layer redesign.

### Tokens (`src/app/globals.css`)

| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#090c10` | page background |
| `--color-paper` | `#f6f4f1` | primary text |
| `--color-cream` | `#e4e1d6` | warm emphasis (italic words, hover) |
| `--color-muted` | `rgba(246,244,241,.62)` | secondary text |
| `--color-faint` | `rgba(246,244,241,.38)` | labels, meta |
| `--color-line` | `rgba(246,244,241,.14)` | hairlines |
| `--color-line-soft` | `rgba(246,244,241,.07)` | background grid |

Easings: `--ease-out: cubic-bezier(.22,1,.36,1)`,
`--ease-soft: cubic-bezier(.22,.61,.36,1)`.

### Fonts (`src/app/layout.tsx`)

Instrument Serif (400, italic) for display, Manrope (300–500) for body/UI,
JetBrains Mono kept for code-ish meta (repo names, tech tags). Loaded with
`next/font/google`; the old Space Grotesk / DM Sans are removed.

### Pages

- **Home**: full-viewport opening (name in two serif lines, rule, tracked
  tagline, scroll hint, "Currently" lockup bottom-right, portrait at the right
  on `md+`). Then "By the numbers" fact rows, "Hands-on with" tracked list,
  "Selected work" index rows.
- **Work / Skills / Experience / About / Contact**: eyebrow + chapter-size
  serif title with an italic emphasis word + lead paragraph. Cards become
  hairline-bordered panels or index rows.
- **Contact**: closing-chapter style — big serif line, hairline rule, CTA
  with hairline underline, social index rows, embedded form in a hairline frame.
- **Nav**: brand in serif, tracked uppercase links, hairline appears on scroll.
- **Footer**: micro tracked text, hairline top.
- **Global**: 1px scroll-progress meter fixed at the top; faint masked grid
  behind the page; `::selection` in paper at 18%.

### Motion

- `Reveal` keeps the IntersectionObserver fade-up but uses the reference
  easing and a 0.7s duration.
- New `LineReveal` wraps heading lines in `overflow:hidden` and slides them
  up from `116%` on mount/intersection with a stagger.
- Rules grow from `scaleX(0)`; index rows translate `10px` on hover.
- `prefers-reduced-motion` disables all of it.
