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

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-paper/80 backdrop-blur-md border-b border-line shadow-sm'
          : ''
      }`}
    >
      <div className="max-w-5xl mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono font-bold text-ink text-sm tracking-tight hover:text-accent transition-colors"
        >
          luv2code
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors ${
                pathname === href
                  ? 'text-accent font-semibold'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`text-sm font-semibold px-3 py-1.5 rounded-md transition-colors ${
              pathname === '/contact'
                ? 'bg-accent-dark text-white'
                : 'bg-accent text-white hover:bg-accent-dark'
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-ink p-1"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open navigation menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden bg-surface border-b border-line px-8 py-6 flex flex-col gap-5">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm ${
                pathname === href ? 'text-accent font-semibold' : 'text-muted'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm font-semibold bg-accent text-white px-3 py-2 rounded-md text-center"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  )
}
