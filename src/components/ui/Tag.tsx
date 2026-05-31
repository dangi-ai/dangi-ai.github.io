interface TagProps {
  children: React.ReactNode
  variant?: 'accent' | 'neutral'
}

export function Tag({ children, variant = 'neutral' }: TagProps) {
  return (
    <span
      className={
        variant === 'accent'
          ? 'bg-accent-light text-accent-dark font-mono text-[10px] px-2 py-0.5 rounded'
          : 'bg-surface text-muted font-mono text-[10px] px-2 py-0.5 rounded'
      }
    >
      {children}
    </span>
  )
}
