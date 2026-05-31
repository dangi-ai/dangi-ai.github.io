import * as SimpleIcons from '@icons-pack/react-simple-icons'
import type { Skill } from '@/lib/types'

interface SkillCardProps {
  skill: Skill
}

function monogram(name: string): string {
  return name.slice(0, 2).toUpperCase()
}

type IconComponent = React.ComponentType<{ size?: number; color?: string }>

function resolveIcon(iconSlug?: string): IconComponent | null {
  if (!iconSlug) return null
  const key = 'Si' + iconSlug.charAt(0).toUpperCase() + iconSlug.slice(1)
  const icon = (SimpleIcons as Record<string, unknown>)[key]
  return typeof icon === 'function' ? (icon as IconComponent) : null
}

export function SkillCard({ skill }: SkillCardProps) {
  const Icon = resolveIcon(skill.iconSlug)

  return (
    <div className="bg-white border border-line rounded-lg p-3 flex flex-col items-center gap-2 min-w-[76px] hover:shadow-sm transition-shadow">
      <div className="w-8 h-8 flex items-center justify-center" aria-hidden>
        {Icon ? (
          <Icon size={28} />
        ) : (
          <span className="w-8 h-8 rounded flex items-center justify-center bg-surface text-muted font-mono text-xs font-bold select-none">
            {monogram(skill.name)}
          </span>
        )}
      </div>
      <span className="font-mono text-[10px] text-ink text-center leading-tight font-semibold">
        {skill.name}
      </span>
    </div>
  )
}
