import type { Metadata } from 'next'
import { skills, CATEGORIES } from '@/data/skills'
import { SkillGroup } from '@/components/skills/SkillGroup'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Technologies Sushil Dangi works with — Java, Spring Boot, PostgreSQL, AWS, Docker, and more.',
  openGraph: { url: 'https://luv2code.in/skills' },
}

export default function SkillsPage() {
  return (
    <div className="page pb-[var(--gutter-block)]">
      <PageHeader
        eyebrow="Skills"
        title={['The tools', <em key="w">I work with.</em>]}
        lead="A backend-first stack. Java and Spring Boot at the centre, PostgreSQL underneath, AWS around it."
      />

      <div>
        {CATEGORIES.map(({ key, label }, i) => {
          const group = skills.filter(s => s.category === key)
          if (group.length === 0) return null
          return (
            <Reveal key={key} delay={i * 40}>
              <SkillGroup index={i + 1} label={label} skills={group} />
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
