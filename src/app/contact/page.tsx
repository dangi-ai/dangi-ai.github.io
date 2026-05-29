import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import { SocialCard } from '@/components/ui/SocialCard'
import { GitHubIcon, LinkedInIcon, XIcon, InstagramIcon } from '@/components/ui/SocialIcons'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Sushil Dangi.',
  openGraph: { url: 'https://luv2code.in/contact/' },
}

const SOCIALS = [
  {
    href: 'https://github.com/dangi-ai',
    label: 'GitHub',
    handle: '@dangi-ai',
    description: 'Open-source work, experiments, and side projects.',
    Icon: GitHubIcon,
  },
  {
    href: 'https://www.linkedin.com/in/sushil-dangi/',
    label: 'LinkedIn',
    handle: 'Sushil Dangi',
    description: 'Professional updates, articles, and career history.',
    Icon: LinkedInIcon,
  },
  {
    href: 'https://x.com/s_dangi98',
    label: 'X / Twitter',
    handle: '@s_dangi98',
    description: 'Thoughts on engineering, learning, and shipping software.',
    Icon: XIcon,
  },
  {
    href: 'https://www.instagram.com/smiley_s_d/',
    label: 'Instagram',
    handle: '@smiley_s_d',
    description: 'Life outside the terminal.',
    Icon: InstagramIcon,
  },
]

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-mono text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-2">
        Say hi
      </h1>
      <p className="text-[var(--text-secondary)] mb-12 leading-relaxed">
        The best way to reach me is through any of these. I read everything.
      </p>

      {/* Social link cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        {SOCIALS.map(social => (
          <SocialCard key={social.href} {...social} />
        ))}
      </div>

      {/* Direct email */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
        <div className="flex items-center gap-2 mb-3">
          <Mail size={16} className="text-coral" />
          <span className="font-mono text-sm font-semibold text-[var(--text-primary)]">Email</span>
        </div>
        <p className="text-sm text-[var(--text-secondary)] mb-4">
          For professional enquiries, collaborations, or just a friendly hello.
        </p>
        <a
          href="mailto:dangi.sushil5@gmail.com"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-coral text-white font-mono text-sm font-semibold hover:bg-coral/90 transition-colors duration-150 cursor-pointer"
        >
          Send an email
        </a>
      </div>
    </div>
  )
}
