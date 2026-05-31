import type { Metadata } from 'next'
import { skills } from '@/data/skills'
import type { Skill } from '@/lib/types'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Engineering Manager & Backend Engineer — Java, Spring Boot, PostgreSQL, AWS. My story and what I believe about building software.',
  openGraph: { url: 'https://luv2code.in/about' },
}

const CATEGORY_LABELS: Record<Skill['category'], string> = {
  language:  'Languages',
  framework: 'Frameworks & Libraries',
  data:      'Data',
  devops:    'DevOps & Cloud',
  tool:      'Tools',
}

const CATEGORIES: Skill['category'][] = ['language', 'framework', 'data', 'devops', 'tool']

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      <p className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] mb-4">About</p>
      <h1 className="font-display text-4xl font-bold text-ink leading-tight mb-10">
        I luv 2 code.<br />I luv 2 share.
      </h1>

      <div className="max-w-2xl space-y-5 mb-14">
        <p className="text-muted leading-relaxed">
          Senior Java Backend Lead with 10+ years of experience engineering scalable, distributed
          systems. Currently Senior Team Lead at Technoboost Services, leading a team of 15
          developers building microservices with Java, Spring Boot, and Hibernate — with a focus
          on clean architecture, performance, and mentoring.
        </p>
        <p className="text-muted leading-relaxed">
          I&apos;ve worked across the full backend spectrum: high-throughput REST APIs, 5-service
          microservice architectures processing ~100,000 transactions per day, PostgreSQL
          optimisation, CI/CD pipelines, and cloud deployments on AWS.
        </p>
        <p className="text-muted leading-relaxed">
          Beyond the code, I believe strongly in sharing what I learn — through open-source,
          writing, and building in public. That&apos;s the whole point of Luv2code.
        </p>
      </div>

      <div className="border-t border-line pt-10">
        <h2 className="font-display text-xl font-bold text-ink mb-8">Skills &amp; Technologies</h2>

        <div className="space-y-8">
          {CATEGORIES.map(cat => {
            const group = skills.filter(s => s.category === cat)
            if (group.length === 0) return null
            return (
              <div key={cat}>
                <p className="font-mono text-[10px] text-muted uppercase tracking-[0.15em] mb-3">
                  {CATEGORY_LABELS[cat]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.map(skill => (
                    <span
                      key={skill.name}
                      className={
                        skill.primary
                          ? 'bg-accent-light text-accent-dark font-mono text-xs px-3 py-1 rounded'
                          : 'bg-surface text-muted font-mono text-xs px-3 py-1 rounded'
                      }
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
