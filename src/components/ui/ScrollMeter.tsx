'use client'

import { useEffect, useRef } from 'react'

// 1px progress meter pinned to the top edge (reference: .opening__meter).
// Scales with document scroll; no React state so it never re-renders.
export function ScrollMeter() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      el.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-line-soft">
      <div
        ref={ref}
        className="h-full w-full origin-left bg-paper/60 will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
