'use client'

import { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  /** reveal on mount instead of on intersection (above-the-fold content) */
  immediate?: boolean
}

// Fades content up on first entry into the viewport. Also adds `is-in`, which
// lets nested `.rule` and `.line-inner` elements run their own reveals.
// CSS lives in globals.css; reduced-motion users see content immediately.
export function Reveal({ children, delay = 0, className = '', immediate = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (immediate) {
      const id = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(id)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [immediate])

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible is-in' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
