import type { ComponentType, SVGProps } from 'react'

type SvgIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>

interface Props {
  href: string
  label: string
  handle: string
  description: string
  Icon: SvgIcon
}

export function SocialCard({ href, label, handle, description, Icon }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — ${handle}`}
      className="card-glass group flex items-start gap-4 p-6 hover:border-coral/35 cursor-pointer"
    >
      <span className="mt-0.5 text-coral group-hover:scale-110 transition-transform duration-150 flex-shrink-0">
        <Icon size={26} />
      </span>
      <div>
        <p
          className="text-sm font-semibold text-[var(--text-primary)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {label}
        </p>
        <p className="font-mono text-xs text-coral mt-0.5">{handle}</p>
        <p
          className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {description}
        </p>
      </div>
    </a>
  )
}
