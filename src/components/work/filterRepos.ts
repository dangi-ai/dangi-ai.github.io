import type { Repo } from '@/lib/types'

export interface FilterOptions {
  query: string
  language: string
  sort: 'stars' | 'updated'
}

export function filterRepos(repos: Repo[], opts: FilterOptions): Repo[] {
  const q = opts.query.toLowerCase().trim()

  let result = repos.filter(r => {
    const matchesQuery =
      !q ||
      r.name.toLowerCase().includes(q) ||
      (r.description ?? '').toLowerCase().includes(q)

    const matchesLang =
      opts.language === 'all' || r.language === opts.language

    return matchesQuery && matchesLang
  })

  if (opts.sort === 'stars') {
    result = result.sort((a, b) => b.stargazers_count - a.stargazers_count)
  } else {
    result = result.sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
  }

  return result
}
