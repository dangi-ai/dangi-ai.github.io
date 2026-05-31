import { ExternalLink } from 'lucide-react'

interface SocialCardProps {
  href: string
  platform: string
  handle: string
  iconBg: string
  iconText: string
  ariaLabel: string
}

export function SocialCard({ href, platform, handle, iconBg, iconText, ariaLabel }: SocialCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="bg-white border border-line rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow group"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
        style={{ background: iconBg }}
        aria-hidden
      >
        {iconText}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display font-bold text-sm text-ink">{platform}</p>
        <p className="font-mono text-xs text-muted truncate">{handle}</p>
      </div>
      <ExternalLink
        size={14}
        className="text-muted group-hover:text-accent transition-colors flex-shrink-0"
        aria-hidden
      />
    </a>
  )
}
