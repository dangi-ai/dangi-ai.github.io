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
    <section className="py-16 border-y border-[var(--border)]" aria-label="Tech stack">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label + heading */}
        <div className="mb-8">
          <span
            className="block font-mono text-xs text-coral tracking-widest uppercase mb-2"
          >
            // stack
          </span>
          <h2
            className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What I build with
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {STACK.map(({ name, color }) => (
            <span
              key={name}
              className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-lg glass font-mono text-sm text-[var(--text-primary)] hover:border-coral/30 transition-colors duration-150 cursor-default"
            >
              {/* Language color dot with glow */}
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 8px ${color}99, 0 0 16px ${color}44`,
                }}
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
