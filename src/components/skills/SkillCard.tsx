'use client'

import type { Skill } from '@/lib/types'

interface SkillCardProps {
  skill: Skill
}

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

// Some icons need a specific variant suffix; default is 'original'
const VARIANT: Record<string, string> = {
  amazonwebservices: 'plain-wordmark',
  githubactions:     'plain',
  bash:              'plain',
  azuresqldatabase:  'plain',
}

function deviconUrl(slug: string): string {
  const variant = VARIANT[slug] ?? 'original'
  return `${DEVICON_BASE}/${slug}/${slug}-${variant}.svg`
}

function monogram(name: string): string {
  return name.slice(0, 2).toUpperCase()
}

// Tile inside a 1px-gap group (the gap paints the hairlines).
// Icons are monochrome until hovered, like the portrait.
export function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className="hair-cell group flex min-w-[6.5rem] flex-col items-center gap-3 px-4 py-5 transition-colors duration-500 ease-soft hover:bg-paper/[0.03]">
      <div className="flex h-8 w-8 items-center justify-center" aria-hidden>
        {skill.iconSlug ? (
          <img
            src={deviconUrl(skill.iconSlug)}
            alt=""
            width={28}
            height={28}
            loading="lazy"
            className="portrait opacity-80 group-hover:opacity-100"
            onError={(e) => {
              const target = e.currentTarget
              target.style.display = 'none'
              const fallback = target.nextElementSibling as HTMLElement | null
              if (fallback) fallback.style.display = 'flex'
            }}
          />
        ) : null}
        <span
          className="h-8 w-8 items-center justify-center font-display text-lg text-paper/80 select-none"
          style={{ display: skill.iconSlug ? 'none' : 'flex' }}
        >
          {monogram(skill.name)}
        </span>
      </div>
      <span className={`tracked text-center text-[0.6rem] ${skill.primary ? 'text-paper' : 'text-muted'}`}>
        {skill.name}
      </span>
    </div>
  )
}
