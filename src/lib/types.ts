export interface Repo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  updated_at: string
  fork: boolean
  archived: boolean
}

export interface ExperienceEntry {
  role: string
  company: string
  period: string
  location: string
  bullets: string[]
  tech: string[]
  current?: boolean
}

export interface Skill {
  name: string
  category: 'language' | 'framework' | 'data' | 'devops' | 'tool'
  iconSlug?: string
  primary?: boolean
}
