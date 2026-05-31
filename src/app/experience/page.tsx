import type { Metadata } from 'next'
import { experience } from '@/data/experience'
import { TimelineEntry } from '@/components/experience/TimelineEntry'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Career timeline of Sushil Dangi — Engineering Manager and Backend Engineer.',
  openGraph: { url: 'https://luv2code.in/experience' },
}

export default function ExperiencePage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      <p className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] mb-4">
        Experience
      </p>
      <h1 className="font-display text-4xl font-bold text-ink leading-tight mb-12">
        Career timeline
      </h1>

      <div className="max-w-2xl">
        {experience.map((entry, i) => (
          <TimelineEntry
            key={`${entry.company}-${entry.period}`}
            entry={entry}
            isLast={i === experience.length - 1}
          />
        ))}
      </div>

      <p className="mt-10 font-mono text-xs text-muted border border-line rounded-md px-4 py-3 max-w-2xl">
        ⚠ Content is placeholder — update <code className="text-accent">src/data/experience.ts</code> with your real roles.
      </p>
    </div>
  )
}
