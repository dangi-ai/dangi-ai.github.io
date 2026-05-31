import { describe, it, expect } from 'vitest'
import { filterRepos } from '../../components/work/filterRepos'
import type { Repo } from '../types'

const base: Repo = {
  id: 1, full_name: 'dangi-ai/a', html_url: 'https://github.com/dangi-ai/a',
  homepage: null, fork: false, archived: false,
  topics: [], updated_at: '2026-01-01T00:00:00Z',
  stargazers_count: 0, forks_count: 0,
  name: '', description: null, language: null,
}

const repos: Repo[] = [
  { ...base, id: 1, name: 'spring-starter',   description: 'Spring Boot template', language: 'Java',   stargazers_count: 10, updated_at: '2026-03-01T00:00:00Z' },
  { ...base, id: 2, name: 'pg-utils',          description: 'Postgres helpers',     language: 'SQL',    stargazers_count: 3,  updated_at: '2026-04-01T00:00:00Z' },
  { ...base, id: 3, name: 'actions-deploy',    description: 'CI/CD workflows',      language: 'YAML',   stargazers_count: 5,  updated_at: '2026-02-01T00:00:00Z' },
]

describe('filterRepos', () => {
  it('returns all repos when no filters applied', () => {
    expect(filterRepos(repos, { query: '', language: 'all', sort: 'stars' })).toHaveLength(3)
  })

  it('filters by name query (case-insensitive)', () => {
    const result = filterRepos(repos, { query: 'spring', language: 'all', sort: 'stars' })
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('spring-starter')
  })

  it('filters by description query', () => {
    const result = filterRepos(repos, { query: 'postgres', language: 'all', sort: 'stars' })
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('pg-utils')
  })

  it('filters by language', () => {
    const result = filterRepos(repos, { query: '', language: 'Java', sort: 'stars' })
    expect(result).toHaveLength(1)
    expect(result[0].language).toBe('Java')
  })

  it('sorts by stars descending', () => {
    const result = filterRepos(repos, { query: '', language: 'all', sort: 'stars' })
    expect(result.map(r => r.stargazers_count)).toEqual([10, 5, 3])
  })

  it('sorts by updated_at descending', () => {
    const result = filterRepos(repos, { query: '', language: 'all', sort: 'updated' })
    expect(result[0].name).toBe('pg-utils')
    expect(result[2].name).toBe('actions-deploy')
  })

  it('returns empty array when no match', () => {
    expect(filterRepos(repos, { query: 'zzz', language: 'all', sort: 'stars' })).toHaveLength(0)
  })
})
