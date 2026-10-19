import type { Skill } from '@/lib/types'
import { SkillCard } from './SkillCard'

interface SkillGroupProps {
  index: number
  label: string
  skills: Skill[]
}

// Fact row: index · category eyebrow · tiles.
export function SkillGroup({ index, label, skills }: SkillGroupProps) {
  return (
    <div className="fact grid md:grid-cols-[3rem_14rem_1fr] gap-x-6 gap-y-5 items-start">
      <span className="index-num pt-1">{String(index).padStart(2, '0')}</span>
      <h2 className="eyebrow pt-1">{label}</h2>
      <div className="hair-grid flex flex-wrap self-start">
        {skills.map(skill => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  )
}
