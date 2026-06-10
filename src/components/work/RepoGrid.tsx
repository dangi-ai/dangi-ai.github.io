'use client'

import { useState, useMemo } from 'react'
import type { Repo } from '@/lib/types'
import { FEATURED_REPOS } from '@/config/featured'
import { filterRepos } from './filterRepos'
import { RepoCard } from './RepoCard'
import { Search } from 'lucide-react'

interface RepoGridProps {
  repos: Repo[]
}

export function RepoGrid({ repos }: RepoGridProps) {
  const [query, setQuery]       = useState('')
  const [language, setLanguage] = useState('all')
  const [sort, setSort]         = useState<'stars' | 'updated'>('stars')

  const languages = useMemo(() => {
    const langs = repos.map(r => r.language).filter(Boolean) as string[]
    return ['all', ...Array.from(new Set(langs)).sort()]
  }, [repos])

  const filtered = useMemo(
    () => filterRepos(repos, { query, language, sort }),
    [repos, query, language, sort]
  )

  const featuredSet = useMemo(() => new Set(FEATURED_REPOS), [])

  return (
    <div>
      <div className="flex flex-wrap gap-3 items-center mb-8">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            placeholder="Search repos…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-surface border border-line rounded-md pl-8 pr-3 py-2 text-sm text-ink placeholder:text-faint focus:outline-none focus:border-cyan transition-colors"
            aria-label="Search repositories"
          />
        </div>

        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="bg-surface border border-line rounded-md px-3 py-2 text-sm text-ink focus:outline-none focus:border-cyan transition-colors"
          aria-label="Filter by language"
        >
          {languages.map(l => (
            <option key={l} value={l}>{l === 'all' ? 'All languages' : l}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={e => setSort(e.target.value as 'stars' | 'updated')}
          className="bg-surface border border-line rounded-md px-3 py-2 text-sm text-ink focus:outline-none focus:border-cyan transition-colors"
          aria-label="Sort repositories"
        >
          <option value="stars">Sort: Stars</option>
          <option value="updated">Sort: Recently updated</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted text-sm font-mono text-center py-16">
          No repos match your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(repo => (
            <RepoCard
              key={repo.id}
              repo={repo}
              featured={featuredSet.has(repo.name)}
            />
          ))}
        </div>
      )}

      <p className="mt-6 font-mono text-[10px] text-faint text-center">
        Showing {filtered.length} of {repos.length} repos · fetched from github.com/dangi-ai at build time
      </p>
    </div>
  )
}
