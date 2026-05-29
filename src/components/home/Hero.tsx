import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Mail } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center py-24 md:py-32 px-4 sm:px-6 lg:px-8 scanlines">

      {/* Deep coral radial glow — background layer */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,77,109,0.18) 0%, transparent 70%)',
        }}
      />
      {/* Mint secondary glow — bottom right */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 100% 100%, rgba(61,220,151,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto w-full">

        {/* Terminal prompt line */}
        <div
          className="flex items-center gap-2 mb-8 opacity-0 animate-fade-up font-mono text-sm"
          style={{ animationDelay: '0ms' }}
        >
          <Image src="/luv2code-icon.svg" alt="" width={20} height={20} aria-hidden="true" />
          <span className="text-[var(--text-secondary)]">sushil@luv2code</span>
          <span className="text-[var(--border)]">:</span>
          <span className="text-mint">~</span>
          <span className="text-[var(--border)]">$</span>
          <span className="text-coral ml-1">whoami</span>
        </div>

        {/* Name */}
        <h1
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: '80ms' }}
        >
          <span className="block font-mono text-5xl sm:text-6xl md:text-7xl font-bold leading-none tracking-tight text-[var(--text-primary)]">
            Sushil Dangi
          </span>
          <span className="block font-mono text-2xl sm:text-3xl font-medium text-coral mt-3 text-glow-coral">
            Engineering Manager &amp; Backend Engineer
          </span>
        </h1>

        {/* Tagline — terminal output style */}
        <div
          className="mt-8 opacity-0 animate-fade-up"
          style={{ animationDelay: '180ms' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] font-mono text-base sm:text-lg">
            <span className="text-mint text-glow-mint">&gt;</span>
            <span className="text-[var(--text-primary)]">I luv 2 code.</span>
            <span className="text-[var(--text-secondary)] ml-1">I luv 2 share what I learn.</span>
            <span className="w-2 h-5 bg-coral animate-blink ml-1 rounded-sm" aria-hidden="true" />
          </div>
        </div>

        {/* Value statement */}
        <p
          className="mt-6 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed opacity-0 animate-fade-up"
          style={{ animationDelay: '260ms' }}
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
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-coral text-white font-mono text-sm font-semibold hover:bg-coral/90 transition-all duration-200 cursor-pointer glow-coral"
          >
            View my work
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] font-mono text-sm font-semibold hover:border-coral hover:text-coral transition-colors duration-200 cursor-pointer"
          >
            <Mail size={16} />
            Get in touch
          </Link>
        </div>

        {/* Scroll hint */}
        <div
          className="mt-16 opacity-0 animate-fade-up"
          style={{ animationDelay: '440ms' }}
        >
          <span className="font-mono text-xs text-[var(--text-secondary)] tracking-widest uppercase">
            ↓ scroll to explore
          </span>
        </div>
      </div>
    </section>
  )
}
