'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface LineRevealProps {
  lines: ReactNode[]
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  /** ms between each line */
  stagger?: number
  /** ms before the first line */
  delay?: number
  /** reveal on mount instead of on intersection (above-the-fold content) */
  immediate?: boolean
}

// Each line sits in an overflow-hidden wrapper and slides up from 116%
// (reference: .op-line / .op-line__inner). CSS lives in globals.css.
export function LineReveal({
  lines,
  as = 'div',
  className = '',
  stagger = 110,
  delay = 0,
  immediate = false,
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  // Every allowed tag accepts the same props we pass, so narrow once for JSX.
  const Tag = as as 'div'

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (immediate) {
      const id = requestAnimationFrame(() => setInView(true))
      return () => cancelAnimationFrame(id)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [immediate])

  return (
    <Tag ref={ref} className={`${inView ? 'is-in ' : ''}${className}`.trim()}>
      {lines.map((line, i) => (
        <span key={i} className="line">
          <span
            className="line-inner"
            style={{ transitionDelay: `${delay + i * stagger}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
