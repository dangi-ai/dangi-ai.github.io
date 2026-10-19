import type { ExperienceEntry } from '@/lib/types'

interface TimelineEntryProps {
  entry: ExperienceEntry
  index: number
}

// Fact row: index · period/location column · role, company, bullets, stack.
export function TimelineEntry({ entry, index }: TimelineEntryProps) {
  return (
    <article className="fact grid md:grid-cols-[3rem_14rem_1fr] gap-x-6 gap-y-4 items-baseline">
      <span className="index-num">{String(index).padStart(2, '0')}</span>

      <div className="flex flex-col gap-1.5">
        <span className="tracked text-[0.62rem] text-paper/80">
          {entry.current ? 'Now' : entry.period}
        </span>
        {entry.current && (
          <span className="tracked text-[0.6rem] text-faint">{entry.period}</span>
        )}
        <span className="tracked text-[0.6rem] text-faint">{entry.location}</span>
      </div>

      <div>
        <h3 className="t-lead text-paper">{entry.role}</h3>
        <p className="eyebrow mt-3">{entry.company}</p>

        <ul className="mt-6 max-w-2xl space-y-3">
          {entry.bullets.map((b, i) => (
            <li key={i} className="flex gap-4 text-sm leading-relaxed text-muted">
              <span aria-hidden className="mt-[0.7em] h-px w-4 flex-shrink-0 bg-paper/40" />
              {b}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap items-baseline gap-y-2">
          {entry.tech.map((t, i) => (
            <li key={t} className="tracked flex items-baseline text-[0.6rem] text-faint">
              {i > 0 && <span aria-hidden className="mx-3">·</span>}
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
