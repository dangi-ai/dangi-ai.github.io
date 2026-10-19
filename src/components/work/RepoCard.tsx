import type { Repo } from '@/lib/types'
import { relativeTime } from '@/lib/relativeTime'

interface RepoCardProps {
  repo: Repo
  index: number
  featured?: boolean
}

// Hairline cell inside a 1px-gap grid (the gap paints the grid lines).
export function RepoCard({ repo, index, featured = false }: RepoCardProps) {
  return (
    <div
      role="article"
      onClick={() => window.open(repo.html_url, '_blank', 'noopener,noreferrer')}
      className="hair-cell group relative flex min-h-[15rem] cursor-pointer flex-col gap-4 p-6 transition-colors duration-500 ease-soft hover:bg-paper/[0.03]"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="index-num">{String(index).padStart(2, '0')}</span>
        <span className="tracked text-[0.6rem] text-faint">
          {featured ? 'Featured' : repo.language ?? ''}
        </span>
      </div>

      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        className="t-lead text-paper break-words transition-transform duration-500 ease-editorial group-hover:translate-x-1.5"
      >
        {repo.name}
        <span aria-hidden className="ml-3 inline-block text-[0.6em] text-faint transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
      </a>

      {repo.description && (
        <p className="flex-1 text-sm leading-relaxed text-muted">{repo.description}</p>
      )}

      <div className="mt-auto flex flex-col gap-2 tracked text-[0.6rem] text-faint">
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-muted">
            {repo.topics.slice(0, 3).map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
        <div className="flex items-baseline justify-between gap-5">
          <span>
            {featured && repo.language ? `${repo.language} · ` : ''}
            {repo.stargazers_count} stars · {repo.forks_count} forks
          </span>
          {repo.homepage ? (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-paper/80 hover:text-paper whitespace-nowrap"
              aria-label={`Live site for ${repo.name}`}
            >
              Live ↗
            </a>
          ) : (
            <span className="whitespace-nowrap">{relativeTime(repo.updated_at)}</span>
          )}
        </div>
      </div>
    </div>
  )
}
