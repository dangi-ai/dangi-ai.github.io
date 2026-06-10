import Link from 'next/link'
import type { Repo } from '@/lib/types'
import { FEATURED_REPOS } from '@/config/featured'
import { getLanguageColor } from '@/lib/languageColors'
import { relativeTime } from '@/lib/relativeTime'
import { Star, GitFork } from 'lucide-react'

interface FeaturedReposProps {
  repos: Repo[]
}

function pickFeatured(repos: Repo[]): Repo[] {
  if (FEATURED_REPOS.length > 0) {
    const pinned = FEATURED_REPOS
      .map(name => repos.find(r => r.name === name))
      .filter(Boolean) as Repo[]
    if (pinned.length > 0) return pinned.slice(0, 3)
  }
  return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3)
}

export function FeaturedRepos({ repos }: FeaturedReposProps) {
  const featured = pickFeatured(repos)

  return (
    <section className="max-w-5xl mx-auto px-8 py-12">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display text-xl font-bold text-ink">Featured work</h2>
        <Link href="/work" className="text-sm text-cyan font-medium hover:text-violet-light transition-colors">
          View all repos →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map(repo => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-glass p-4 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-display font-bold text-sm text-ink leading-snug">{repo.name}</span>
              <span className="text-faint text-xs flex-shrink-0 mt-0.5" aria-hidden>↗</span>
            </div>

            {repo.description && (
              <p className="text-muted text-xs leading-relaxed flex-1">{repo.description}</p>
            )}

            <div className="flex flex-wrap gap-1.5">
              {repo.language && (
                <span className="flex items-center gap-1 bg-white/5 font-mono text-[10px] px-2 py-0.5 rounded text-ink">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: getLanguageColor(repo.language) }}
                    aria-hidden
                  />
                  {repo.language}
                </span>
              )}
              {repo.topics.slice(0, 2).map(t => (
                <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-muted">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 font-mono text-[10px] text-faint">
              <span className="flex items-center gap-1">
                <Star size={10} aria-hidden /> {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork size={10} aria-hidden /> {repo.forks_count}
              </span>
              <span className="ml-auto">{relativeTime(repo.updated_at)}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
