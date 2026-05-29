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
    <section className="py-14 border-y border-[var(--border)]" aria-label="Tech stack">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Terminal-style heading */}
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-xs text-mint">&gt;</span>
          <span className="font-mono text-xs text-[var(--text-secondary)] uppercase tracking-widest">
            hands-on with
          </span>
          <span className="w-2 h-3 bg-mint/60 animate-blink rounded-sm" aria-hidden="true" />
        </div>
        <div className="flex flex-wrap gap-2">
          {STACK.map(({ name, color }) => (
            <span
              key={name}
              className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] font-mono text-xs text-[var(--text-primary)] hover:border-coral/40 transition-colors duration-150 cursor-default"
            >
              {/* Language color dot */}
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}80` }}
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
