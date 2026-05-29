import { Star, GitFork, ExternalLink, Globe } from 'lucide-react'
import { LanguageDot } from '@/components/ui/LanguageDot'
import type { Repo } from '@/lib/types'
import { formatRelativeDate, formatNumber } from '@/lib/utils'

interface Props {
  repo: Repo
  featured?: boolean
}

export function RepoCard({ repo, featured = false }: Props) {
  return (
    <article
      className={[
        'group relative flex flex-col gap-3 rounded-2xl border border-[var(--border)]',
        'bg-[var(--bg-card)] p-5 transition-all duration-200',
        'hover:border-coral/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-coral/5',
        featured ? 'sm:col-span-2' : '',
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-mono text-sm font-semibold text-[var(--text-primary)] truncate group-hover:text-coral transition-colors duration-150">
          {repo.name}
        </h3>
        <div className="flex items-center gap-2 flex-shrink-0">
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live site for ${repo.name}`}
              className="text-[var(--text-secondary)] hover:text-mint transition-colors duration-150 cursor-pointer"
            >
              <Globe size={14} />
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub: ${repo.name}`}
            className="text-[var(--text-secondary)] hover:text-coral transition-colors duration-150 cursor-pointer"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--text-secondary)] line-clamp-2 flex-1">
        {repo.description ?? 'No description'}
      </p>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map(t => (
            <span
              key={t}
              className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-mint/10 text-mint border border-mint/20"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Footer stats */}
      <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
        <LanguageDot language={repo.language} />
        <div className="flex items-center gap-3 text-[var(--text-secondary)]">
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1 font-mono text-xs">
              <Star size={11} />
              {formatNumber(repo.stargazers_count)}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1 font-mono text-xs">
              <GitFork size={11} />
              {formatNumber(repo.forks_count)}
            </span>
          )}
          <span className="font-mono text-xs">{formatRelativeDate(repo.updated_at)}</span>
        </div>
      </div>
    </article>
  )
}
