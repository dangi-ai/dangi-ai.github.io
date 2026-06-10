const STATS = [
  { value: '10+',   label: 'Years Experience',   color: 'text-violet-light' },
  { value: '15',    label: 'Engineers Led',      color: 'text-cyan' },
  { value: '~100K', label: 'Transactions / Day', color: 'text-violet-light' },
  { value: '98.2%', label: 'System Uptime',      color: 'text-cyan' },
]

export function StatsStrip() {
  return (
    <section className="border-b border-line" aria-label="Key achievements">
      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ value, label, color }) => (
            <div key={label} className="card-glass px-5 py-5 text-center">
              <div className={`font-mono text-3xl font-bold leading-none mb-2 ${color}`}>
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
