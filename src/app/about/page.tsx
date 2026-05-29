import type { Metadata } from 'next'
import { Code2, Server, Database, Cloud } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'Engineering Manager & Backend Engineer — Java, Spring Boot, PostgreSQL, and cloud integrations.',
  openGraph: { url: 'https://luv2code.in/about/' },
}

const SKILLS = [
  {
    group: 'Languages',
    Icon: Code2,
    items: ['Java 21', 'TypeScript', 'SQL', 'Shell / Bash'],
  },
  {
    group: 'Frameworks',
    Icon: Server,
    items: ['Spring Boot', 'Spring Security', 'Hibernate / JPA', 'Next.js'],
  },
  {
    group: 'Data',
    Icon: Database,
    items: ['PostgreSQL', 'Flyway', 'HikariCP', 'Redis'],
  },
  {
    group: 'DevOps & Cloud',
    Icon: Cloud,
    items: ['GitHub Actions CI/CD', 'AWS S3 / RDS / SES', 'Docker', 'Secrets Manager'],
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Heading */}
      <h1 className="font-mono text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-2">
        About me
      </h1>
      <p className="font-mono text-coral mb-12">Engineering Manager &amp; Backend Engineer</p>

      {/* Story */}
      <section className="mb-16 space-y-4" aria-label="My story">
        <p className="text-[var(--text-secondary)] leading-relaxed text-base">
          I am Sushil Dangi — an Engineering Manager and backend engineer who has spent years deep
          in Java and Spring Boot, solving the kinds of problems that only show up in production at
          scale. My work lives in the unsexy layers: connection pool tuning, migration strategies,
          IAM roles that actually work, CI pipelines that catch failures before your users do.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed text-base">
          My engineering philosophy is simple:{' '}
          <span className="text-[var(--text-primary)] font-medium">
            ship working software, then improve it.
          </span>{' '}
          I am sceptical of architecture astronauts and allergic to premature abstraction. The best
          systems I have worked on were boring — plain services, clear boundaries, great
          observability.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed text-base">
          I specialise in backend architecture, performance optimisation, database design, deployment
          automation, and cloud integrations. I also manage engineers — which means I spend a
          meaningful portion of my time helping other developers level up.
        </p>
      </section>

      {/* Skills bento grid */}
      <section aria-label="Skills and technology">
        <h2 className="font-mono text-xl font-bold text-[var(--text-primary)] mb-6">
          What I work with
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SKILLS.map(({ group, Icon, items }) => (
            <div
              key={group}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 hover:border-mint/50 transition-colors duration-200"
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon size={16} className="text-mint" />
                <span className="font-mono text-xs text-mint uppercase tracking-widest">{group}</span>
              </div>
              <ul className="space-y-1.5">
                {items.map(item => (
                  <li key={item} className="flex items-center gap-2 font-mono text-sm text-[var(--text-primary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Knowledge sharing */}
      <section
        className="mt-16 p-6 rounded-2xl border border-mint/20 bg-mint/5"
        aria-label="On sharing knowledge"
      >
        <h2 className="font-mono text-sm font-semibold text-mint uppercase tracking-widest mb-3">
          On sharing knowledge
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed text-base">
          &ldquo;I luv 2 code&rdquo; is only half the story. The rest is sharing. I believe every
          senior engineer owes the community something — a blog post, a mentoring conversation, an
          open-source tool, a detailed commit message. When I write code, I try to write it as if
          the next person reading it is learning something new. Often, that person is me, six months
          later.
        </p>
      </section>
    </div>
  )
}
