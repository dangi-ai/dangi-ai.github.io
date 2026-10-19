import type { Metadata } from 'next'
import { SocialCard } from '@/components/contact/SocialCard'
import { LineReveal } from '@/components/ui/LineReveal'
import { Reveal } from '@/components/ui/Reveal'

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
    ariaLabel: 'Sushil Dangi on GitHub',
  },
  {
    href:      'https://www.linkedin.com/in/sushil-dangi/',
    platform:  'LinkedIn',
    handle:    'linkedin.com/in/sushil-dangi',
    ariaLabel: 'Sushil Dangi on LinkedIn',
  },
  {
    href:      'https://x.com/s_dangi98',
    platform:  'X / Twitter',
    handle:    '@s_dangi98',
    ariaLabel: 'Sushil Dangi on X',
  },
  {
    href:      'https://www.instagram.com/smiley_s_d/',
    platform:  'Instagram',
    handle:    '@smiley_s_d',
    ariaLabel: 'Sushil Dangi on Instagram',
  },
]

// Closing chapter (reference: .closing): eyebrow, big serif line, rule, CTA, foot.
export default function ContactPage() {
  return (
    <div className="page pb-[var(--gutter-block)]">
      <Reveal immediate>
        <header className="min-h-[60svh] flex flex-col justify-center py-[var(--gutter-block)]">
          <p className="eyebrow mb-6">Contact</p>
          <LineReveal
            as="h1"
            lines={[<>Let&apos;s build</>, <>something <em>great.</em></>]}
            className="t-chapter max-w-[14ch]"
            immediate
          />
          <span className="rule mt-10 text-paper" />
          <a href="mailto:sushil.dangi@luv2code.in" className="cta-line mt-10 self-start text-[0.9rem]">
            sushil.dangi@luv2code.in <span className="arrow">↗</span>
          </a>
          <p className="mt-8 max-w-lg text-[0.95rem] leading-relaxed text-muted">
            Always open to interesting conversations, collaborations, or just a good engineering chat.
          </p>
        </header>
      </Reveal>

      <Reveal>
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-x-16 gap-y-12 items-start">
          <section aria-label="Social links">
            <p className="eyebrow mb-6">Elsewhere</p>
            <div className="index-list">
              {SOCIALS.map((s, i) => (
                <SocialCard key={s.href} {...s} index={i + 1} />
              ))}
            </div>
          </section>

          <section aria-label="Contact form">
            <p className="eyebrow mb-6">Or write here</p>
            <div className="panel p-1 sm:p-2 overflow-hidden">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSdPkUDE0KYuGpw1YVy30UTB7mxROvChNpJURDH3Yzh1r32i2Q/viewform?embedded=true"
                title="Contact form"
                className="w-full"
                height={1150}
                loading="lazy"
              >
                Loading…
              </iframe>
            </div>
          </section>
        </div>
      </Reveal>
    </div>
  )
}
