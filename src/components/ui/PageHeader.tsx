import type { ReactNode } from 'react'
import { LineReveal } from './LineReveal'
import { Reveal } from './Reveal'

interface PageHeaderProps {
  eyebrow: string
  /** one entry per display line; use <em> for the italic emphasis word */
  title: ReactNode[]
  lead?: ReactNode
}

// Chapter opener shared by the inner pages: eyebrow, chapter-size serif
// title revealed line by line, hairline rule, optional lead paragraph.
export function PageHeader({ eyebrow, title, lead }: PageHeaderProps) {
  return (
    <Reveal immediate>
      <header className="pt-[var(--gutter-block)] pb-[var(--gutter-block)]">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <LineReveal as="h1" lines={title} className="t-chapter max-w-[15ch]" immediate />
        <span className="rule mt-8 text-paper" />
        {lead && (
          <p className="mt-8 max-w-xl text-[0.95rem] leading-relaxed text-muted">{lead}</p>
        )}
      </header>
    </Reveal>
  )
}
