import type { Metadata } from 'next'
import { experience, education } from '@/data/experience'
import { TimelineEntry } from '@/components/experience/TimelineEntry'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Career timeline of Sushil Dangi — Senior Java / Spring Boot Lead with 10+ years building distributed systems and leading engineering teams.',
  openGraph: { url: 'https://luv2code.in/experience' },
}

export default function ExperiencePage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      <p className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] mb-4">
        Experience
      </p>
      <h1 className="font-display text-4xl font-bold text-ink leading-tight mb-2">
        Career timeline
      </h1>
      <p className="text-muted text-sm mb-12">10+ years · Java · Spring Boot · Distributed Systems</p>

      {/* Work experience */}
      <div className="max-w-2xl">
        {experience.map((entry, i) => (
          <TimelineEntry
            key={`${entry.company}-${entry.period}`}
            entry={entry}
            isLast={i === experience.length - 1}
          />
        ))}
      </div>

      {/* Education */}
      <div className="max-w-2xl mt-16 border-t border-line pt-12">
        <h2 className="font-display text-xl font-bold text-ink mb-8">Education</h2>
        <div className="space-y-8">
          {education.map((edu) => (
            <div key={edu.degree} className="flex gap-5">
              <div className="flex flex-col items-center flex-shrink-0 pt-1">
                <div className="w-3 h-3 rounded-full bg-paper border-2 border-line flex-shrink-0" />
              </div>
              <div>
                <h3 className="font-display font-bold text-ink text-base">{edu.degree}</h3>
                <p className="font-mono text-[11px] text-accent mt-1">{edu.institution}</p>
                <p className="font-mono text-[11px] text-muted mt-0.5">{edu.period}</p>
                {edu.notes && (
                  <p className="text-sm text-muted leading-relaxed mt-3">{edu.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
