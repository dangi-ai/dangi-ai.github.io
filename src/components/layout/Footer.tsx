import Link from 'next/link'
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'

const SOCIALS = [
  { href: 'https://github.com/dangi-ai',                    icon: Github,    label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/sushil-dangi/',      icon: Linkedin,  label: 'LinkedIn' },
  { href: 'https://x.com/s_dangi98',                        icon: Twitter,   label: 'X / Twitter' },
  { href: 'https://www.instagram.com/smiley_s_d/',          icon: Instagram, label: 'Instagram' },
]

export function Footer() {
  return (
    <footer className="border-t border-line mt-auto">
      <div className="max-w-5xl mx-auto px-8 py-5 flex items-center justify-between gap-4 flex-wrap">
        <p className="font-mono text-xs text-muted">
          luv2code · Sushil Dangi
        </p>
        <div className="flex items-center gap-4">
          {SOCIALS.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted hover:text-accent transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
