import { getLanguageColor } from '@/data/language-colors'

interface Props {
  language: string | null
  size?: number
}

export function LanguageDot({ language, size = 10 }: Props) {
  if (!language) return null
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="rounded-full inline-block flex-shrink-0"
        style={{ width: size, height: size, backgroundColor: getLanguageColor(language) }}
        aria-hidden="true"
      />
      <span className="text-xs font-mono text-[var(--text-secondary)]">{language}</span>
    </span>
  )
}
