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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* Section label + Heading */}
      <div className="mb-12">
        <span className="block font-mono text-xs text-coral tracking-widest uppercase mb-3">
          // about
        </span>
        <h1
          className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          About me
        </h1>
        <p
          className="text-coral text-lg font-semibold"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Engineering Manager &amp; Backend Engineer
        </p>
      </div>

      {/* Story */}
      <section className="mb-20 space-y-5" aria-label="My story">
        <p
          className="text-[var(--text-secondary)] leading-relaxed text-base sm:text-lg"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          I am Sushil Dangi — an Engineering Manager and backend engineer who has spent years deep
          in Java and Spring Boot, solving the kinds of problems that only show up in production at
          scale. My work lives in the unsexy layers: connection pool tuning, migration strategies,
          IAM roles that actually work, CI pipelines that catch failures before your users do.
        </p>
        <p
          className="text-[var(--text-secondary)] leading-relaxed text-base sm:text-lg"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          My engineering philosophy is simple:{' '}
          <span className="text-[var(--text-primary)] font-semibold">
            ship working software, then improve it.
          </span>{' '}
          I am sceptical of architecture astronauts and allergic to premature abstraction. The best
          systems I have worked on were boring — plain services, clear boundaries, great
          observability.
        </p>
        <p
          className="text-[var(--text-secondary)] leading-relaxed text-base sm:text-lg"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          I specialise in backend architecture, performance optimisation, database design, deployment
          automation, and cloud integrations. I also manage engineers — which means I spend a
          meaningful portion of my time helping other developers level up.
        </p>
      </section>

      {/* Skills bento grid */}
      <section aria-label="Skills and technology">
        <div className="mb-8">
          <span className="block font-mono text-xs text-coral tracking-widest uppercase mb-3">
            // skills
          </span>
          <h2
            className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What I work with
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SKILLS.map(({ group, Icon, items }) => (
            <div
              key={group}
              className="card-glass group p-6 hover:border-mint/40 transition-colors duration-200"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <Icon size={18} className="text-mint flex-shrink-0" />
                <span className="font-mono text-xs text-mint uppercase tracking-widest">{group}</span>
              </div>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-[var(--text-primary)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Knowledge sharing — gradient border card */}
      <section
        className="mt-20 relative p-px rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(61,220,151,0.4) 0%, rgba(124,58,237,0.2) 50%, rgba(255,77,109,0.4) 100%)',
        }}
        aria-label="On sharing knowledge"
      >
        <div
          className="rounded-2xl p-7"
          style={{
            background: 'rgba(13,13,20,0.9)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="mb-4">
            <span className="font-mono text-xs text-mint uppercase tracking-widest">
              // knowledge
            </span>
          </div>
          <h2
            className="text-xl font-bold text-[var(--text-primary)] mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            On sharing knowledge
          </h2>
          <p
            className="text-[var(--text-secondary)] leading-relaxed text-base sm:text-lg"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            &ldquo;I luv 2 code&rdquo; is only half the story. The rest is sharing. I believe every
            senior engineer owes the community something — a blog post, a mentoring conversation, an
            open-source tool, a detailed commit message. When I write code, I try to write it as if
            the next person reading it is learning something new. Often, that person is me, six months
            later.
          </p>
        </div>
      </section>
    </div>
  )
}
