import type { ExperienceEntry } from '@/lib/types'

// TODO: Replace placeholder entries with your real experience
export const experience: ExperienceEntry[] = [
  {
    role: 'Engineering Manager',
    company: 'Your Company',
    period: '2022–Present',
    location: 'Bangalore, India',
    current: true,
    bullets: [
      'Led a team of engineers delivering Java microservices in production',
      'Owned backend architecture decisions across multiple product verticals',
      'Drove performance improvements — query optimisation, connection pool tuning',
    ],
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'AWS', 'GitHub Actions'],
  },
  {
    role: 'Senior Backend Engineer',
    company: 'Previous Company',
    period: '2019–2022',
    location: 'Bangalore, India',
    bullets: [
      'Built and maintained high-throughput REST APIs serving millions of requests',
      'Introduced Flyway migrations and standardised DB versioning across the team',
      'Mentored junior engineers on Java best practices and testing strategies',
    ],
    tech: ['Java', 'Spring Boot', 'MySQL', 'Docker'],
  },
  {
    role: 'Backend Engineer',
    company: 'Early Role',
    period: '2017–2019',
    location: 'Bangalore, India',
    bullets: [
      'Developed backend services for consumer-facing products',
      'Gained hands-on experience with Java, Spring MVC, and relational databases',
    ],
    tech: ['Java', 'Spring MVC', 'MySQL'],
  },
]
