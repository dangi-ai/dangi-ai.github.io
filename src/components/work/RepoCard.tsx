import type { Repo } from '@/lib/types'
import { relativeTime } from '@/lib/relativeTime'
import { getLanguageColor } from '@/lib/languageColors'
import { Star, GitFork, ExternalLink } from 'lucide-react'

interface RepoCardProps {
  repo: Repo
  featured?: boolean
}

export function RepoCard({ repo, featured = false }: RepoCardProps) {
  return (
    <div
      role="article"
      onClick={() => window.open(repo.html_url, '_blank', 'noopener,noreferrer')}
      className={`bg-white border border-line rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3 cursor-pointer ${
        featured ? 'border-t-2 border-t-accent' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className={`font-display font-bold text-sm leading-snug hover:underline ${
            featured ? 'text-accent' : 'text-ink'
          }`}
        >
          {repo.name}
        </a>
        <ExternalLink size={12} className="text-muted flex-shrink-0 mt-0.5" aria-hidden />
      </div>

      {repo.description && (
        <p className="text-muted text-xs leading-relaxed flex-1">{repo.description}</p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {repo.language && (
          <span className="flex items-center gap-1 bg-surface font-mono text-[10px] px-2 py-0.5 rounded text-ink">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: getLanguageColor(repo.language) }}
              aria-hidden
            />
            {repo.language}
          </span>
        )}
        {repo.topics.slice(0, 3).map(t => (
          <span key={t} className="bg-surface text-muted font-mono text-[10px] px-2 py-0.5 rounded">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 font-mono text-[10px] text-muted">
        <span className="flex items-center gap-1">
          <Star size={10} aria-hidden /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork size={10} aria-hidden /> {repo.forks_count}
        </span>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="ml-auto text-accent hover:underline"
            aria-label={`Live site for ${repo.name}`}
          >
            live ↗
          </a>
        )}
        {!repo.homepage && (
          <span className="ml-auto">{relativeTime(repo.updated_at)}</span>
        )}
      </div>
    </div>
  )
}
