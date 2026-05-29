'use client'
import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import type { Repo } from '@/lib/types'
import { RepoCard } from './RepoCard'
import { FEATURED_REPOS } from '@/data/featured-repos'

interface Props {
  repos: Repo[]
}

type SortKey = 'updated' | 'stars'

export function RepoGrid({ repos }: Props) {
  const [query, setQuery]   = useState('')
  const [lang,  setLang]    = useState('')
  const [sort,  setSort]    = useState<SortKey>('updated')

  const languages = useMemo(() => {
    const set = new Set(repos.map(r => r.language).filter(Boolean) as string[])
    return Array.from(set).sort()
  }, [repos])

  const filtered = useMemo(() => {
    let list = [...repos]

    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        (r.description ?? '').toLowerCase().includes(q) ||
        r.topics.some(t => t.toLowerCase().includes(q))
      )
    }

    if (lang) list = list.filter(r => r.language === lang)

    const featuredSet = new Set(FEATURED_REPOS)
    const featured = list.filter(r => featuredSet.has(r.name))
    const rest      = list.filter(r => !featuredSet.has(r.name))

    const sortFn = sort === 'stars'
      ? (a: Repo, b: Repo) => b.stargazers_count - a.stargazers_count
      : (a: Repo, b: Repo) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()

    featured.sort(sortFn)
    rest.sort(sortFn)
    return [...featured, ...rest]
  }, [repos, query, lang, sort])

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none" />
          <input
            type="search"
            placeholder="Search repos…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Search repositories"
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] font-mono text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-coral transition-colors duration-150"
          />
        </div>
        <select
          value={lang}
          onChange={e => setLang(e.target.value)}
          aria-label="Filter by language"
          className="px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] font-mono text-sm text-[var(--text-primary)] focus:outline-none focus:border-coral cursor-pointer transition-colors duration-150"
        >
          <option value="">All languages</option>
          {languages.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <select
          value={sort}
          onChange={e => setSort(e.target.value as SortKey)}
          aria-label="Sort repositories"
          className="px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] font-mono text-sm text-[var(--text-primary)] focus:outline-none focus:border-coral cursor-pointer transition-colors duration-150"
        >
          <option value="updated">Recently updated</option>
          <option value="stars">Most stars</option>
        </select>
      </div>

      {/* Count */}
      <p className="font-mono text-xs text-[var(--text-secondary)]">
        {filtered.length} {filtered.length === 1 ? 'repo' : 'repos'}
        {(query || lang) ? ' matching filters' : ''}
      </p>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-mono text-sm text-[var(--text-secondary)]">No repos found.</p>
          <button
            onClick={() => { setQuery(''); setLang('') }}
            className="mt-3 font-mono text-xs text-coral hover:underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(repo => (
            <RepoCard
              key={repo.id}
              repo={repo}
              featured={FEATURED_REPOS.includes(repo.name)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
