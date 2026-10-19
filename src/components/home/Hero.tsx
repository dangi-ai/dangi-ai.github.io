import Link from 'next/link'
import { LineReveal } from '@/components/ui/LineReveal'
import { Reveal } from '@/components/ui/Reveal'
import { ScrollHint } from '@/components/ui/ScrollHint'

export function Hero() {
  return (
    <section className="relative border-b border-line" aria-label="Introduction">
      {/* Scrim: darker at the lower-left where the type sits (reference: .opening__scrim) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(100deg, rgba(9,12,16,0.7) 0%, rgba(9,12,16,0.3) 40%, rgba(9,12,16,0) 65%), linear-gradient(to bottom, rgba(9,12,16,0) 70%, rgba(9,12,16,0.5) 100%)',
        }}
      />

      <div className="page relative min-h-[calc(100svh-4rem)] flex flex-col justify-end">
        <div className="grid md:grid-cols-[1fr_auto] items-end gap-10 pt-24 pb-16 sm:pb-36 md:pb-44">
          <Reveal immediate>
            <p className="eyebrow mb-7">Senior Java / Spring Boot Lead · 10+ years · Bengaluru</p>

            <LineReveal
              as="h1"
              lines={['Sushil', 'Dangi']}
              className="t-hero w-max max-w-full"
              immediate
            />

            <span className="rule mt-8 text-paper" />

            <p className="eyebrow eyebrow-wide mt-7 max-w-md text-paper/85 leading-[1.7]">
              I luv 2 code. I luv 2 share what I learn.
            </p>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              <Link href="/work" className="cta-line">
                Selected work <span className="arrow">↗</span>
              </Link>
              <Link href="/contact" className="cta-line muted">
                Get in touch <span className="arrow">→</span>
              </Link>
            </div>
          </Reveal>

          {/* Portrait: monochrome, hairline frame offset like a mounted print */}
          <Reveal immediate delay={200} className="hidden md:block">
            <div className="relative mr-3 mb-3">
              <div aria-hidden className="absolute -inset-3 border border-line translate-x-3 translate-y-3" />
              <img
                src="/headshot.png"
                alt="Sushil Dangi"
                width={240}
                height={300}
                className="portrait relative block h-[300px] w-[240px] object-cover object-top"
              />
            </div>
          </Reveal>
        </div>

        {/* Bottom-right lockup (reference: .op-brand) */}
        <div className="absolute bottom-[var(--gutter-block)] right-[var(--gutter)] hidden sm:flex flex-col items-end gap-2 text-right">
          <span className="eyebrow">Currently</span>
          <span className="font-display text-xl leading-none text-paper">Senior Team Lead</span>
          <span className="tracked text-faint text-[0.62rem]">Technoboost Services</span>
        </div>

        <ScrollHint className="absolute bottom-[var(--gutter-block)] left-1/2 -translate-x-1/2 hidden sm:flex" />
      </div>
    </section>
  )
}
