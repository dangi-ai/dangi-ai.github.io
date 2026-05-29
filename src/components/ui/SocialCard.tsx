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
      className="group flex items-start gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-coral transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
    >
      <span className="mt-0.5 text-coral group-hover:scale-110 transition-transform duration-150">
        <Icon size={24} />
      </span>
      <div>
        <p className="font-mono text-sm font-semibold text-[var(--text-primary)]">{label}</p>
        <p className="font-mono text-xs text-coral mt-0.5">{handle}</p>
        <p className="text-sm text-[var(--text-secondary)] mt-1">{description}</p>
      </div>
    </a>
  )
}
