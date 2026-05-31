import type { Skill } from '@/lib/types'

export const skills: Skill[] = [
  // Languages
  { name: 'Java',       category: 'language',  iconSlug: 'openjdk',    primary: true },
  { name: 'SQL',        category: 'language',                           primary: true },
  { name: 'Bash',       category: 'language',  iconSlug: 'gnubash' },

  // Frameworks & Libraries
  { name: 'Spring Boot', category: 'framework', iconSlug: 'springboot', primary: true },
  { name: 'Hibernate',   category: 'framework', iconSlug: 'hibernate' },
  { name: 'Flyway',      category: 'framework', iconSlug: 'flyway' },
  { name: 'HikariCP',    category: 'framework' },
  { name: 'JWT',         category: 'framework' },

  // Data
  { name: 'PostgreSQL',  category: 'data', iconSlug: 'postgresql', primary: true },
  { name: 'MySQL',       category: 'data', iconSlug: 'mysql' },
  { name: 'Redis',       category: 'data', iconSlug: 'redis' },

  // DevOps & Cloud
  { name: 'AWS',            category: 'devops',                           primary: true },
  { name: 'GitHub Actions', category: 'devops', iconSlug: 'githubactions', primary: true },
  { name: 'Docker',         category: 'devops', iconSlug: 'docker' },
  { name: 'Linux',          category: 'devops', iconSlug: 'linux' },

  // Tools
  { name: 'Git',       category: 'tool', iconSlug: 'git' },
  { name: 'IntelliJ',  category: 'tool', iconSlug: 'intellijidea' },
  { name: 'Postman',   category: 'tool', iconSlug: 'postman' },
]

export const CATEGORIES: { key: Skill['category']; label: string }[] = [
  { key: 'language',  label: 'Languages' },
  { key: 'framework', label: 'Frameworks & Libraries' },
  { key: 'data',      label: 'Data' },
  { key: 'devops',    label: 'DevOps & Cloud' },
  { key: 'tool',      label: 'Tools' },
]
