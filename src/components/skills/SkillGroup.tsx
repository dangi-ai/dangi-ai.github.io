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
        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet to-cyan flex-shrink-0" aria-hidden />
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
