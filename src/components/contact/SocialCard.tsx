interface SocialCardProps {
  href: string
  platform: string
  handle: string
  ariaLabel: string
  index: number
}

// Index row: number · platform in serif · handle; arrow on the right.
export function SocialCard({ href, platform, handle, ariaLabel, index }: SocialCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="index-row group"
    >
      <span className="index-num">{String(index).padStart(2, '0')}</span>
      <span className="min-w-0">
        <span className="index-name t-lead block text-paper">{platform}</span>
        <span className="mt-1.5 block truncate tracked text-[0.6rem] text-faint">{handle}</span>
      </span>
      <span
        aria-hidden
        className="text-faint transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper"
      >
        ↗
      </span>
    </a>
  )
}
