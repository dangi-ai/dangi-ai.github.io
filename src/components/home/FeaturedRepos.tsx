import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { RepoCard } from '@/components/work/RepoCard'
import type { Repo } from '@/lib/types'
import { FEATURED_REPOS } from '@/data/featured-repos'

interface Props {
  repos: Repo[]
}

export function FeaturedRepos({ repos }: Props) {
  const featuredSet = new Set(FEATURED_REPOS)

  let display: Repo[]
  if (featuredSet.size > 0) {
    display = repos.filter(r => featuredSet.has(r.name)).slice(0, 4)
  } else {
    display = [...repos]
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      .slice(0, 4)
  }

  if (display.length === 0) return null

  return (
    <section className="py-20" aria-label="Featured projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label + heading */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="block font-mono text-xs text-coral tracking-widest uppercase mb-2">
              // featured
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Featured work
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-coral hover:text-coral/80 transition-colors duration-150 cursor-pointer"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {display.map(repo => (
            <RepoCard key={repo.id} repo={repo} featured />
          ))}
        </div>
      </div>
    </section>
  )
}
