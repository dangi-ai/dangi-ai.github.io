import type { ExperienceEntry } from '@/lib/types'

interface TimelineEntryProps {
  entry: ExperienceEntry
  isLast: boolean
}

export function TimelineEntry({ entry, isLast }: TimelineEntryProps) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <div
          className={`w-3 h-3 rounded-full flex-shrink-0 ${
            entry.current
              ? 'bg-gradient-to-br from-violet to-cyan shadow-[0_0_12px_rgba(34,211,238,0.5)]'
              : 'bg-bg border-2 border-cyan'
          }`}
        />
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-violet/60 to-cyan/60 mt-1.5" />
        )}
      </div>

      <div className={`flex-1 ${isLast ? '' : 'pb-10'}`}>
        <div className="card-glass p-5">
          <h3 className="font-display font-bold text-ink text-base">{entry.role}</h3>
          <p className="font-mono text-[11px] text-cyan mt-1">
            {entry.company} · {entry.period}
          </p>
          <p className="font-mono text-[11px] text-muted mt-0.5">{entry.location}</p>

          <ul className="mt-4 space-y-1.5">
            {entry.bullets.map((b, i) => (
              <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
                <span className="text-cyan mt-1 flex-shrink-0" aria-hidden>·</span>
                {b}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {entry.tech.map(t => (
              <span key={t} className="bg-white/5 text-muted font-mono text-[10px] px-2 py-0.5 rounded">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
