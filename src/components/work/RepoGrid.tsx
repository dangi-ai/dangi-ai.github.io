'use client'

import { useState, useMemo } from 'react'
import type { Repo } from '@/lib/types'
import { FEATURED_REPOS } from '@/config/featured'
import { filterRepos } from './filterRepos'
import { RepoCard } from './RepoCard'

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
      <div className="grid sm:grid-cols-[1fr_auto_auto] gap-x-8 gap-y-4 items-end mb-12">
        <label className="flex flex-col gap-2">
          <span className="eyebrow">Search</span>
          <input
            type="search"
            placeholder="Repository name or topic"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="field-input"
            aria-label="Search repositories"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="eyebrow">Language</span>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="field-input min-w-[10rem]"
            aria-label="Filter by language"
          >
            {languages.map(l => (
              <option key={l} value={l}>{l === 'all' ? 'All languages' : l}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="eyebrow">Sort</span>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as 'stars' | 'updated')}
            className="field-input min-w-[10rem]"
            aria-label="Sort repositories"
          >
            <option value="stars">Stars</option>
            <option value="updated">Recently updated</option>
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="eyebrow text-center py-20">No repositories match your filters.</p>
      ) : (
        <div className="hair-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((repo, i) => (
            <RepoCard
              key={repo.id}
              repo={repo}
              index={i + 1}
              featured={featuredSet.has(repo.name)}
            />
          ))}
        </div>
      )}

      <p className="mt-8 eyebrow text-center">
        {filtered.length} of {repos.length} repositories · fetched from github.com/dangi-ai at build time
      </p>
    </div>
  )
}
