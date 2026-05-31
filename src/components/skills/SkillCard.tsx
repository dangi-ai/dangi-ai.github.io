import type { Skill } from '@/lib/types'

interface SkillCardProps {
  skill: Skill
}

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
