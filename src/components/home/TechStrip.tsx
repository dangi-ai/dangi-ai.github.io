const TECHS = [
  'Java 21', 'Spring Boot', 'PostgreSQL', 'Flyway',
  'AWS', 'GitHub Actions', 'Docker', 'JWT', 'HikariCP',
]

export function TechStrip() {
  return (
    <section className="border-b border-line py-6" aria-label="Technologies I work with">
      <div className="max-w-5xl mx-auto px-8">
        <p className="font-mono text-[10px] text-faint uppercase tracking-[0.2em] mb-4">
          Hands-on with
        </p>
        <div className="flex flex-wrap gap-2">
          {TECHS.map(tech => (
            <span
              key={tech}
              className="bg-surface border border-line text-muted font-mono text-xs px-3 py-1.5 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
