import type { Metadata } from 'next'
import { SocialCard } from '@/components/contact/SocialCard'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Get in touch with Sushil Dangi — let's build something great together.",
  openGraph: { url: 'https://luv2code.in/contact' },
}

const SOCIALS = [
  {
    href:      'https://github.com/dangi-ai',
    platform:  'GitHub',
    handle:    'github.com/dangi-ai',
    iconBg:    '#1A1714',
    iconText:  'GH',
    ariaLabel: 'Sushil Dangi on GitHub',
  },
  {
    href:      'https://www.linkedin.com/in/sushil-dangi/',
    platform:  'LinkedIn',
    handle:    'linkedin.com/in/sushil-dangi',
    iconBg:    '#0A66C2',
    iconText:  'in',
    ariaLabel: 'Sushil Dangi on LinkedIn',
  },
  {
    href:      'https://x.com/s_dangi98',
    platform:  'X / Twitter',
    handle:    '@s_dangi98',
    iconBg:    '#000000',
    iconText:  '𝕏',
    ariaLabel: 'Sushil Dangi on X',
  },
  {
    href:      'https://www.instagram.com/smiley_s_d/',
    platform:  'Instagram',
    handle:    '@smiley_s_d',
    iconBg:    'linear-gradient(135deg, #F58529, #DD2A7B, #8134AF)',
    iconText:  'IG',
    ariaLabel: 'Sushil Dangi on Instagram',
  },
]

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      <p className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] mb-4">Contact</p>
      <h1 className="font-display text-4xl font-extrabold text-ink leading-tight mb-4">
        Let&apos;s build something great.
      </h1>
      <p className="text-muted leading-relaxed max-w-lg mb-12">
        I&apos;m always open to interesting conversations, collaborations, or just a good engineering chat.
      </p>

      <div className="flex flex-col gap-3 max-w-lg mb-12">
        {SOCIALS.map(s => (
          <SocialCard key={s.href} {...s} />
        ))}
      </div>

      <div className="text-center max-w-lg">
        <a
          href="mailto:dangi.sushil5@gmail.com"
          className="inline-block bg-accent text-white font-semibold text-sm px-6 py-3 rounded-md hover:bg-accent-dark transition-colors"
        >
          Say hi via email →
        </a>
        <p className="font-mono text-xs text-muted mt-3">dangi.sushil5@gmail.com</p>
      </div>
    </div>
  )
}
