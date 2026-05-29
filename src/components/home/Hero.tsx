import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Mail } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      {/* Subtle dot-grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle, #FF4D6D 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Coral radial glow */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] opacity-10 dark:opacity-15 blur-3xl rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #FF4D6D 0%, transparent 65%)' }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Icon mark */}
        <div className="mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0ms' }}>
          <Image
            src="/luv2code-icon.svg"
            alt="Luv2code mark"
            width={56}
            height={56}
            priority
          />
        </div>

        {/* Headline */}
        <h1
          className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold leading-tight opacity-0 animate-fade-up"
          style={{ animationDelay: '80ms' }}
        >
          <span className="text-[var(--text-primary)]">Sushil Dangi</span>
          <br />
          <span className="text-coral">Engineering Manager</span>
          <br />
          <span className="text-[var(--text-secondary)] text-2xl sm:text-3xl font-medium">
            &amp; Backend Engineer
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="mt-6 font-mono text-lg sm:text-xl text-mint opacity-0 animate-fade-up"
          style={{ animationDelay: '160ms' }}
        >
          I luv 2 code. I luv 2 share what I learn.
        </p>

        {/* Value statement */}
        <p
          className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed opacity-0 animate-fade-up"
          style={{ animationDelay: '240ms' }}
        >
          Java / Spring Boot specialist. I ship production code daily and believe the best way
          to grow is to teach. Backend architecture, performance optimisation, cloud integrations
          — that is where I live.
        </p>

        {/* CTAs */}
        <div
          className="mt-10 flex flex-wrap gap-4 opacity-0 animate-fade-up"
          style={{ animationDelay: '320ms' }}
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-coral text-white font-mono text-sm font-semibold hover:bg-coral/90 transition-colors duration-150 cursor-pointer"
          >
            View my work
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--text-primary)] font-mono text-sm font-semibold hover:border-coral hover:text-coral transition-colors duration-150 cursor-pointer"
          >
            <Mail size={16} />
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  )
}
