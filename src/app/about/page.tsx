import type { Metadata } from 'next'
import { skills } from '@/data/skills'
import type { Skill } from '@/lib/types'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'

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
    <div className="page pb-[var(--gutter-block)]">
      <PageHeader
        eyebrow="About"
        title={[<>I luv 2 <em>code.</em></>, <>I luv 2 <em>share.</em></>]}
      />

      <Reveal>
        <div className="grid md:grid-cols-[1fr_260px] gap-12 md:gap-20 items-start">
          <div className="max-w-2xl space-y-6 text-[0.98rem] leading-[1.75] text-muted">
            <p className="t-lead text-paper">
              Senior Java backend lead with ten years spent engineering distributed systems and
              the teams that run them.
            </p>
            <p>
              Currently Senior Team Lead at Technoboost Services, leading a team of 15 developers
              building microservices with Java, Spring Boot, and Hibernate — with a focus on clean
              architecture, performance, and mentoring.
            </p>
            <p>
              I&apos;ve worked across the full backend spectrum: high-throughput REST APIs, 5-service
              microservice architectures processing ~100,000 transactions per day, PostgreSQL
              optimisation, CI/CD pipelines, and cloud deployments on AWS.
            </p>
            <p>
              Beyond the code, I believe strongly in sharing what I learn — through open-source,
              writing, and building in public. That&apos;s the whole point of Luv2code.
            </p>
          </div>

          <div className="relative mt-2 justify-self-start md:justify-self-end">
            <div aria-hidden className="absolute -inset-3 border border-line translate-x-3 translate-y-3" />
            <img
              src="/headshot.png"
              alt="Sushil Dangi"
              width={260}
              height={320}
              className="portrait relative block h-[320px] w-[260px] object-cover object-top"
            />
          </div>
        </div>
      </Reveal>

      <Reveal>
        <section className="mt-[var(--gutter-block)]">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="t-statement text-paper">
              Skills &amp; <em>technologies.</em>
            </h2>
          </div>

          <div>
            {CATEGORIES.map((cat, i) => {
              const group = skills.filter(s => s.category === cat)
              if (group.length === 0) return null
              return (
                <div key={cat} className="fact grid md:grid-cols-[3rem_14rem_1fr] gap-x-6 gap-y-3 items-baseline">
                  <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
                  <p className="eyebrow">{CATEGORY_LABELS[cat]}</p>
                  <ul className="flex flex-wrap items-baseline gap-y-2">
                    {group.map((skill, j) => (
                      <li
                        key={skill.name}
                        className={`tracked flex items-baseline ${skill.primary ? 'text-paper' : 'text-muted'}`}
                      >
                        {j > 0 && <span aria-hidden className="mx-3 text-faint">·</span>}
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>
      </Reveal>
    </div>
  )
}
