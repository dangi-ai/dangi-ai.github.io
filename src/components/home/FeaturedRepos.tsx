import Link from 'next/link'
import type { Repo } from '@/lib/types'
import { FEATURED_REPOS } from '@/config/featured'
import { relativeTime } from '@/lib/relativeTime'

interface FeaturedReposProps {
  repos: Repo[]
}

function pickFeatured(repos: Repo[]): Repo[] {
  if (FEATURED_REPOS.length > 0) {
    const pinned = FEATURED_REPOS
      .map(name => repos.find(r => r.name === name))
      .filter(Boolean) as Repo[]
    if (pinned.length > 0) return pinned.slice(0, 4)
  }
  return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 4)
}

// Index rows (reference: .rp-index-row): number · serif name + description · meta.
export function FeaturedRepos({ repos }: FeaturedReposProps) {
  const featured = pickFeatured(repos)

  return (
    <section id="selected-work" className="page py-[var(--gutter-block)] border-t border-line">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <p className="eyebrow mb-5">Selected work</p>
          <h2 className="t-statement text-paper">
            Open source, <em>in public.</em>
          </h2>
        </div>
        <Link href="/work" className="cta-line muted">
          All repositories <span className="arrow">→</span>
        </Link>
      </div>

      <div className="index-list">
        {featured.map((repo, i) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="index-row group"
          >
            <span className="index-num">{String(i + 1).padStart(2, '0')}</span>

            <span className="min-w-0">
              <span className="index-name t-lead block text-paper">{repo.name}</span>
              {repo.description && (
                <span className="mt-2 block max-w-xl text-sm leading-relaxed text-muted">
                  {repo.description}
                </span>
              )}
            </span>

            <span className="hidden sm:flex flex-col items-end gap-1.5 tracked text-faint text-[0.62rem] whitespace-nowrap">
              <span className="text-paper/70">
                {repo.language ?? '—'} <span aria-hidden className="ml-3 inline-block transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </span>
              <span>
                {repo.stargazers_count} stars · {relativeTime(repo.updated_at)}
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
