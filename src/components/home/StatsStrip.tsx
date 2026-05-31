const STATS = [
  { value: '10+',   label: 'Years Experience' },
  { value: '15',    label: 'Engineers Led' },
  { value: '~100K', label: 'Transactions / Day' },
  { value: '98.2%', label: 'System Uptime' },
]

export function StatsStrip() {
  return (
    <section className="border-b border-line" aria-label="Key achievements">
      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="bg-white border border-line border-t-2 border-t-accent rounded-lg px-5 py-5 text-center shadow-sm"
            >
              <div className="font-mono text-3xl font-bold text-accent leading-none mb-2">
                {value}
              </div>
              <div className="text-xs text-muted leading-snug">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
