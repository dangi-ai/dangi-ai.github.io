import { GitHubIcon, LinkedInIcon, XIcon, InstagramIcon } from '@/components/ui/SocialIcons'

const SOCIALS = [
  { href: 'https://github.com/dangi-ai',               label: 'GitHub',      Icon: GitHubIcon    },
  { href: 'https://www.linkedin.com/in/sushil-dangi/', label: 'LinkedIn',    Icon: LinkedInIcon  },
  { href: 'https://x.com/s_dangi98',                   label: 'X / Twitter', Icon: XIcon         },
  { href: 'https://www.instagram.com/smiley_s_d/',     label: 'Instagram',   Icon: InstagramIcon },
]

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-[var(--text-secondary)]">
          © {new Date().getFullYear()} Sushil Dangi · I luv 2 code.
        </p>
        <div className="flex items-center gap-2">
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
    </footer>
  )
}
