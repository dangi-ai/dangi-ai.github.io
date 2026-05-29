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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* Section label + Heading */}
      <div className="mb-12">
        <span className="block font-mono text-xs text-coral tracking-widest uppercase mb-3">
          // contact
        </span>
        <h1
          className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Say hi
        </h1>
        <p
          className="text-[var(--text-secondary)] text-lg leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          The best way to reach me is through any of these. I read everything.
        </p>
      </div>

      {/* Social link cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
        {SOCIALS.map(social => (
          <SocialCard key={social.href} {...social} />
        ))}
      </div>

      {/* Direct email — gradient accent card */}
      <div
        className="relative p-px rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,77,109,0.5) 0%, rgba(124,58,237,0.3) 50%, rgba(255,77,109,0.2) 100%)',
        }}
      >
        {/* Coral glow backdrop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 0% 100%, rgba(255,77,109,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="relative rounded-2xl p-7"
          style={{
            background: 'rgba(13,13,20,0.9)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex items-center gap-2.5 mb-3">
            <Mail size={20} className="text-coral flex-shrink-0" />
            <span
              className="text-base font-semibold text-[var(--text-primary)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Email
            </span>
          </div>
          <p
            className="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            For professional enquiries, collaborations, or just a friendly hello.
          </p>
          <a
            href="mailto:dangi.sushil5@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-coral text-white font-semibold text-sm hover:bg-coral/90 transition-colors duration-150 cursor-pointer glow-coral"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Send an email
          </a>
        </div>
      </div>
    </div>
  )
}
