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
    iconBg:    '#30363D',
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
    iconBg:    '#1F2430',
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
      <p className="font-mono text-[10px] text-cyan uppercase tracking-[0.2em] mb-4">Contact</p>
      <h1 className="font-display text-4xl font-bold text-ink leading-tight mb-4">
        Let&apos;s build something <span className="gradient-text">great</span>.
      </h1>
      <p className="text-muted leading-relaxed max-w-lg mb-12">
        I&apos;m always open to interesting conversations, collaborations, or just a good engineering chat.
      </p>

      <div className="grid lg:grid-cols-[1fr_1.6fr] gap-8 items-start mb-12">
        <div className="flex flex-col gap-3">
          {SOCIALS.map(s => (
            <SocialCard key={s.href} {...s} />
          ))}
        </div>

        <div className="card-glass p-2 sm:p-3 overflow-hidden rounded-xl">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdPkUDE0KYuGpw1YVy30UTB7mxROvChNpJURDH3Yzh1r32i2Q/viewform?embedded=true"
            title="Contact form"
            className="w-full rounded-lg"
            height={1150}
            loading="lazy"
          >
            Loading…
          </iframe>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 max-w-lg mx-auto">
        <a
          href="mailto:sushil.dangi@luv2code.in"
          className="inline-block btn-gradient font-semibold text-sm px-6 py-3 rounded-md"
        >
          Say hi via email →
        </a>
        <p className="font-mono text-xs text-muted">sushil.dangi@luv2code.in</p>
      </div>
    </div>
  )
}
