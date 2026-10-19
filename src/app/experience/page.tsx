import type { Metadata } from 'next'
import { experience, education } from '@/data/experience'
import { TimelineEntry } from '@/components/experience/TimelineEntry'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Career timeline of Sushil Dangi — Senior Java / Spring Boot Lead with 10+ years building distributed systems and leading engineering teams.',
  openGraph: { url: 'https://luv2code.in/experience' },
}

export default function ExperiencePage() {
  return (
    <div className="page pb-[var(--gutter-block)]">
      <PageHeader
        eyebrow="Experience"
        title={['Ten years,', <em key="l">one line at a time.</em>]}
        lead="Java · Spring Boot · Distributed systems · Leading teams"
      />

      <section aria-label="Work experience">
        {experience.map((entry, i) => (
          <Reveal key={`${entry.company}-${entry.period}`} delay={i * 40}>
            <TimelineEntry entry={entry} index={experience.length - i} />
          </Reveal>
        ))}
      </section>

      <Reveal>
        <section className="mt-[var(--gutter-block)]" aria-label="Education">
          <h2 className="t-statement text-paper mb-10">
            <em>Education.</em>
          </h2>
          {education.map((edu, i) => (
            <div key={edu.degree} className="fact grid md:grid-cols-[3rem_14rem_1fr] gap-x-6 gap-y-3 items-baseline">
              <span className="index-num">{String(education.length - i).padStart(2, '0')}</span>
              <div className="flex flex-col gap-1.5">
                <span className="tracked text-[0.62rem] text-paper/80">{edu.period}</span>
                <span className="tracked text-[0.6rem] text-faint">{edu.institution}</span>
              </div>
              <div>
                <h3 className="t-lead text-paper">{edu.degree}</h3>
                {edu.notes && (
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{edu.notes}</p>
                )}
              </div>
            </div>
          ))}
        </section>
      </Reveal>
    </div>
  )
}
