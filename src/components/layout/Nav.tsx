'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/',           label: 'Home' },
  { href: '/about',      label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/work',       label: 'Work' },
  { href: '/skills',     label: 'Skills' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu closes when a link is chosen (see onClick below).
  const close = () => setOpen(false)

  const linkClass = (href: string) =>
    `tracked text-[0.66rem] transition-colors duration-500 ease-soft ${
      pathname === href ? 'text-paper' : 'text-faint hover:text-paper'
    }`

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color] duration-500 ease-soft border-b ${
        scrolled || open ? 'bg-ink/85 backdrop-blur-md border-line' : 'border-transparent'
      }`}
    >
      <div className="page h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-2xl leading-none text-paper tracking-[-0.01em]"
        >
          luv2<em className="text-cream">code</em>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`cta-line text-[0.66rem] ${pathname === '/contact' ? '' : 'muted'}`}
          >
            Contact <span className="arrow">→</span>
          </Link>
        </div>

        <button
          className="md:hidden text-paper p-1"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open navigation menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} strokeWidth={1.25} /> : <Menu size={20} strokeWidth={1.25} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden page py-8 flex flex-col gap-6 border-t border-line">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)} onClick={close}>
              {label}
            </Link>
          ))}
          <Link href="/contact" className="cta-line self-start" onClick={close}>
            Contact <span className="arrow">→</span>
          </Link>
        </div>
      )}
    </nav>
  )
}
