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
        'card-glass group flex flex-col gap-3 p-5',
        featured ? 'sm:col-span-2' : '',
      ].join(' ')}
    >
      {/* Gradient top border line — visible on hover */}
      <div
        className="absolute inset-x-0 top-0 h-[1px] rounded-t-2xl bg-gradient-to-r from-transparent via-coral/0 to-transparent group-hover:via-coral/70 transition-all duration-300"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3
          className="text-sm font-semibold text-[var(--text-primary)] truncate group-hover:text-coral transition-colors duration-200"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {repo.name}
        </h3>
        <div className="flex items-center gap-2 flex-shrink-0">
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live site for ${repo.name}`}
              className="p-1 text-[var(--text-secondary)] hover:text-mint transition-colors duration-150 cursor-pointer"
            >
              <Globe size={13} />
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub: ${repo.name}`}
            className="p-1 text-[var(--text-secondary)] hover:text-coral transition-colors duration-150 cursor-pointer"
          >
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Description */}
      <p
        className="text-sm text-[var(--text-secondary)] line-clamp-2 flex-1 leading-relaxed"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {repo.description ?? 'No description'}
      </p>

      {/* Topics — mint glass pills */}
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map(t => (
            <span
              key={t}
              className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-mint/8 text-mint border border-mint/20"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Footer stats */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
        <LanguageDot language={repo.language} />
        <div className="flex items-center gap-3 text-[var(--text-secondary)]">
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1 font-mono text-xs">
              <Star size={11} className="text-coral" />
              {formatNumber(repo.stargazers_count)}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1 font-mono text-xs">
              <GitFork size={11} />
              {formatNumber(repo.forks_count)}
            </span>
          )}
          <span className="font-mono text-[10px] text-[var(--text-secondary)]">
            {formatRelativeDate(repo.updated_at)}
          </span>
        </div>
      </div>
    </article>
  )
}
