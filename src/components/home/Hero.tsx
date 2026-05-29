import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center py-24 md:py-32 px-4 sm:px-6 lg:px-8">

      {/* Ambient gradient blobs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Coral blob — top left */}
        <div
          className="blob-float-1 absolute"
          style={{
            top: '-10%',
            left: '-5%',
            width: '520px',
            height: '520px',
            borderRadius: '9999px',
            background: '#FF4D6D',
            filter: 'blur(120px)',
            opacity: 0.18,
          }}
        />
        {/* Mint blob — bottom right */}
        <div
          className="blob-float-2 absolute"
          style={{
            bottom: '-15%',
            right: '-5%',
            width: '480px',
            height: '480px',
            borderRadius: '9999px',
            background: '#3DDC97',
            filter: 'blur(100px)',
            opacity: 0.14,
          }}
        />
        {/* Purple blob — center right */}
        <div
          className="blob-float-3 absolute"
          style={{
            top: '20%',
            right: '15%',
            width: '560px',
            height: '560px',
            borderRadius: '9999px',
            background: '#7C3AED',
            filter: 'blur(140px)',
            opacity: 0.12,
          }}
        />
      </div>

      {/* Dot grid overlay */}
      <div aria-hidden="true" className="absolute inset-0 grid-bg pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-4xl mx-auto w-full">

        {/* Availability badge */}
        <div
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full glass opacity-0 animate-fade-up"
          style={{ animationDelay: '0ms' }}
        >
          <span className="w-2 h-2 rounded-full bg-mint animate-pulse flex-shrink-0" aria-hidden="true" />
          <span className="font-mono text-xs text-[var(--text-secondary)] tracking-wide">
            Available for new projects
          </span>
        </div>

        {/* Giant gradient headline */}
        <h1
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: '80ms' }}
        >
          <span
            className="block gradient-text leading-none tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 700,
            }}
          >
            Sushil Dangi
          </span>
          <span
            className="block mt-3 text-coral text-glow-coral"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
              fontWeight: 600,
            }}
          >
            Engineering Manager &amp; Backend Engineer
          </span>
        </h1>

        {/* Tagline — frosted glass pill */}
        <div
          className="mt-8 opacity-0 animate-fade-up"
          style={{ animationDelay: '180ms' }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass">
            <span className="text-mint text-glow-mint font-mono">&gt;</span>
            <span className="text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-body)', fontSize: '1rem' }}>
              I luv 2 code.
            </span>
            <span className="text-[var(--text-secondary)]" style={{ fontFamily: 'var(--font-body)', fontSize: '1rem' }}>
              I luv 2 share what I learn.
            </span>
            <span className="w-2 h-5 bg-coral animate-blink ml-1 rounded-sm" aria-hidden="true" />
          </div>
        </div>

        {/* Body paragraph */}
        <p
          className="mt-6 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed opacity-0 animate-fade-up"
          style={{ animationDelay: '260ms', fontFamily: 'var(--font-body)' }}
        >
          Java / Spring Boot specialist. I ship production code daily and believe the best way
          to grow is to teach. Backend architecture, performance optimisation, cloud integrations
          — that is where I live.
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-wrap gap-4 opacity-0 animate-fade-up"
          style={{ animationDelay: '340ms' }}
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-coral text-white font-semibold text-sm hover:bg-coral/90 transition-all duration-200 cursor-pointer glow-coral"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            View my work
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass text-[var(--text-primary)] font-semibold text-sm hover:border-coral/40 hover:text-coral transition-all duration-200 cursor-pointer"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <Mail size={16} />
            Get in touch
          </Link>
        </div>

        {/* Stats row */}
        <div
          className="mt-10 flex flex-wrap gap-3 opacity-0 animate-fade-up"
          style={{ animationDelay: '420ms' }}
        >
          {[
            { label: '38+ Repos' },
            { label: '108+ Stars' },
            { label: 'Java / Spring Boot' },
          ].map(({ label }) => (
            <span
              key={label}
              className="inline-flex items-center px-4 py-1.5 rounded-full glass font-mono text-xs text-[var(--text-secondary)] tracking-wide"
            >
              {label}
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}
