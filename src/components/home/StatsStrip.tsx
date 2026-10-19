const STATS = [
  { value: '10+',   label: 'Years experience' },
  { value: '15',    label: 'Engineers led' },
  { value: '~100K', label: 'Transactions a day' },
  { value: '98.2%', label: 'System uptime' },
]

// Fact rows (reference: .rp-essential-fact): index · serif number · tracked label.
export function StatsStrip() {
  return (
    <section id="numbers" className="page py-[var(--gutter-block)]" aria-label="Key achievements">
      <p className="eyebrow mb-8">By the numbers</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8">
        {STATS.map(({ value, label }, i) => (
          <div key={label} className="fact flex gap-5">
            <span className="index-num pt-2">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <div className="t-statement text-paper">{value}</div>
              <div className="tracked text-faint mt-3 text-[0.62rem]">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
