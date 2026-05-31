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

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className="bg-white border border-line rounded-lg p-3 flex flex-col items-center gap-2 min-w-[80px] hover:shadow-sm transition-shadow">
      <div className="w-8 h-8 flex items-center justify-center" aria-hidden>
        {skill.iconSlug ? (
          <img
            src={deviconUrl(skill.iconSlug)}
            alt=""
            width={32}
            height={32}
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget
              target.style.display = 'none'
              const fallback = target.nextElementSibling as HTMLElement | null
              if (fallback) fallback.style.display = 'flex'
            }}
          />
        ) : null}
        <span
          className="w-8 h-8 rounded items-center justify-center bg-surface text-muted font-mono text-xs font-bold select-none"
          style={{ display: skill.iconSlug ? 'none' : 'flex' }}
        >
          {monogram(skill.name)}
        </span>
      </div>
      <span className="font-mono text-[10px] text-ink text-center leading-tight font-semibold">
        {skill.name}
      </span>
    </div>
  )
}
