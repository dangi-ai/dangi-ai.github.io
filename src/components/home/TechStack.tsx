const STACK = [
  { name: 'Java 21',         color: '#B07219' },
  { name: 'Spring Boot',     color: '#6DB33F' },
  { name: 'PostgreSQL',      color: '#336791' },
  { name: 'Flyway',          color: '#CC0200' },
  { name: 'AWS',             color: '#FF9900' },
  { name: 'GitHub Actions',  color: '#2088FF' },
  { name: 'Docker',          color: '#2496ED' },
  { name: 'JWT',             color: '#3DDC97' },
  { name: 'HikariCP',        color: '#FF4D6D' },
]

export function TechStack() {
  return (
    <section className="py-12 border-y border-[var(--border)]" aria-label="Tech stack">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs text-[var(--text-secondary)] uppercase tracking-widest mb-5">
          Hands-on with
        </p>
        <div className="flex flex-wrap gap-2.5">
          {STACK.map(({ name, color }) => (
            <span
              key={name}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] font-mono text-xs text-[var(--text-primary)]"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
