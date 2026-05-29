'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/ui/SocialIcons'
import { ThemeToggle } from './ThemeToggle'

const NAV = [
  { href: '/',        label: 'Home'    },
  { href: '/about',   label: 'About'   },
  { href: '/work',    label: 'Work'    },
  { href: '/contact', label: 'Contact' },
]

const SOCIALS = [
  { href: 'https://github.com/dangi-ai',               label: 'GitHub',      Icon: GitHubIcon   },
  { href: 'https://www.linkedin.com/in/sushil-dangi/', label: 'LinkedIn',    Icon: LinkedInIcon },
  { href: 'https://x.com/s_dangi98',                   label: 'X / Twitter', Icon: XIcon        },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" aria-label="Luv2code home" onClick={() => setMobileOpen(false)}>
          <Image
            src="/luv2code-dark.svg"
            alt="Luv2code"
            width={110}
            height={28}
            className="hidden dark:block"
            priority
          />
          <Image
            src="/luv2code-primary.svg"
            alt="Luv2code"
            width={110}
            height={28}
            className="block dark:hidden"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {NAV.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={[
                  'relative px-4 py-1.5 rounded-lg font-mono text-sm transition-colors duration-150',
                  active
                    ? 'text-coral'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--muted)]',
                ].join(' ')}
              >
                {label}
                {active && (
                  <span
                    className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-coral"
                    aria-hidden="true"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right: socials + theme + hamburger */}
        <div className="flex items-center gap-1">
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hidden sm:flex p-2 rounded-lg text-[var(--text-secondary)] hover:text-coral hover:bg-[var(--muted)] transition-colors duration-150 cursor-pointer"
            >
              <Icon size={15} />
            </a>
          ))}
          <ThemeToggle />
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--muted)] transition-colors duration-150 cursor-pointer"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)] px-4 py-4 space-y-1">
          {NAV.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={[
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-sm transition-colors duration-150',
                  active
                    ? 'text-coral bg-coral/10'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--muted)]',
                ].join(' ')}
              >
                {active && <span className="w-1 h-1 rounded-full bg-coral" aria-hidden="true" />}
                {label}
              </Link>
            )
          })}
          {/* Mobile socials */}
          <div className="flex items-center gap-2 px-4 pt-3">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-coral transition-colors duration-150 cursor-pointer"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
