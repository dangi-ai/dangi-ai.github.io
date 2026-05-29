import Link from 'next/link'
import Image from 'next/image'
import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/ui/SocialIcons'
import { ThemeToggle } from './ThemeToggle'

const NAV = [
  { href: '/',        label: 'Home'    },
  { href: '/about',   label: 'About'   },
  { href: '/work',    label: 'Work'    },
  { href: '/contact', label: 'Contact' },
]

const SOCIALS = [
  { href: 'https://github.com/dangi-ai',                    label: 'GitHub',      Icon: GitHubIcon   },
  { href: 'https://www.linkedin.com/in/sushil-dangi/',      label: 'LinkedIn',    Icon: LinkedInIcon },
  { href: 'https://x.com/s_dangi98',                        label: 'X / Twitter', Icon: XIcon        },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" aria-label="Luv2code home">
          <Image
            src="/luv2code-dark.svg"
            alt="Luv2code"
            width={120}
            height={32}
            className="hidden dark:block"
            priority
          />
          <Image
            src="/luv2code-primary.svg"
            alt="Luv2code"
            width={120}
            height={32}
            className="block dark:hidden"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-mono text-sm text-[var(--text-secondary)] hover:text-coral transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: socials + theme toggle */}
        <div className="flex items-center gap-1">
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hidden sm:flex p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--muted)] transition-colors duration-150 cursor-pointer"
            >
              <Icon size={16} />
            </a>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
