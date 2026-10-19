const TECHS = [
  'Java 21', 'Spring Boot', 'PostgreSQL', 'Flyway',
  'AWS', 'GitHub Actions', 'Docker', 'JWT', 'HikariCP',
]

// Single tracked line of tools separated by middle dots — no chips.
export function TechStrip() {
  return (
    <section className="page pb-[var(--gutter-block)]" aria-label="Technologies I work with">
      <div className="border-t border-line pt-8 md:grid md:grid-cols-[14rem_1fr] md:gap-8">
        <p className="eyebrow mb-5 md:mb-0">Hands-on with</p>
        <ul className="flex flex-wrap items-baseline gap-y-3">
          {TECHS.map((tech, i) => (
            <li key={tech} className="tracked text-muted flex items-baseline">
              {i > 0 && <span aria-hidden className="mx-4 text-faint">·</span>}
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
