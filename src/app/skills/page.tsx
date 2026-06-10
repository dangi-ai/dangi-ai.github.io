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
      <p className="font-mono text-[10px] text-cyan uppercase tracking-[0.2em] mb-4">Skills</p>
      <h1 className="font-display text-4xl font-bold text-ink leading-tight mb-12">
        <span className="gradient-text">Tech</span> I work with
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
