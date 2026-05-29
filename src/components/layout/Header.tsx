'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Mail } from 'lucide-react'
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
    <header className="sticky top-4 z-40 w-full pointer-events-none">
      <div className="max-w-5xl mx-auto px-4 pointer-events-auto">

        {/* Floating pill container */}
        <div
          className="rounded-2xl border border-white/10 px-5 h-14 flex items-center justify-between"
          style={{
            backgroundColor: 'rgba(8,12,24,0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >

          {/* Logo */}
          <Link href="/" aria-label="Luv2code home" onClick={() => setMobileOpen(false)}>
            <Image
              src="/luv2code-dark.svg"
              alt="Luv2code"
              width={100}
              height={26}
              className="hidden dark:block"
              priority
            />
            <Image
              src="/luv2code-primary.svg"
              alt="Luv2code"
              width={100}
              height={26}
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
                      : 'text-white/75 hover:text-white hover:bg-white/8',
                  ].join(' ')}
                >
                  {label}
                  {active && (
                    <span
                      className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-coral"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right: theme toggle + CTA + hamburger */}
          <div className="flex items-center gap-2">
            {/* Social icons — hidden on small */}
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hidden lg:flex p-2 rounded-lg text-white/60 hover:text-coral hover:bg-white/8 transition-colors duration-150 cursor-pointer"
              >
                <Icon size={15} />
              </a>
            ))}

            <ThemeToggle />

            {/* Get in touch CTA */}
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-coral text-white font-semibold text-xs hover:bg-coral/90 transition-all duration-200 cursor-pointer"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <Mail size={13} />
              Get in touch
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="md:hidden p-2 rounded-lg text-white/75 hover:text-white hover:bg-white/8 transition-colors duration-150 cursor-pointer"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile nav drawer — outside pill, below it */}
        {mobileOpen && (
          <div
            className="md:hidden mt-2 rounded-2xl border border-white/10 px-4 py-4 space-y-1"
            style={{
              backgroundColor: 'rgba(8,12,24,0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
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
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5',
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
            <div className="px-4 pt-2">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-coral text-white font-semibold text-xs hover:bg-coral/90 transition-all duration-200 cursor-pointer"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <Mail size={13} />
                Get in touch
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
