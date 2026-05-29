import Link from 'next/link'
import { ArrowRight, Mail, GitFork, Star, Code2, Cloud, Clock, Zap } from 'lucide-react'

const WORKS_WITH = [
  { name: 'Spring Boot', color: '#6DB33F' },
  { name: 'PostgreSQL',  color: '#336791' },
  { name: 'AWS',         color: '#FF9900' },
  { name: 'GitHub Actions', color: '#2088FF' },
  { name: 'Docker',      color: '#2496ED' },
  { name: 'JWT',         color: '#3DDC97' },
]

const STATS = [
  { icon: GitFork, value: '38+',   label: 'Repositories', color: 'coral' as const },
  { icon: Star,    value: '108+',  label: 'Stars',        color: 'mint'  as const },
  { icon: Code2,   value: 'Java',  label: 'Spring Boot',  color: 'coral' as const },
  { icon: Cloud,   value: 'AWS',   label: 'Cloud',        color: 'mint'  as const },
  { icon: Clock,   value: '10+',   label: 'Yrs Exp',      color: 'coral' as const },
  { icon: Zap,     value: 'CI/CD', label: 'Automation',   color: 'mint'  as const },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center py-20 md:py-28 px-4 sm:px-6 lg:px-8">

      {/* Ambient gradient blobs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Coral blob — top center */}
        <div
          className="blob-float-1 absolute"
          style={{
            top: '-15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            height: '500px',
            borderRadius: '9999px',
            background: '#FF4D6D',
            filter: 'blur(140px)',
            opacity: 0.15,
          }}
        />
        {/* Mint blob — bottom right */}
        <div
          className="blob-float-2 absolute"
          style={{
            bottom: '-10%',
            right: '-5%',
            width: '460px',
            height: '460px',
            borderRadius: '9999px',
            background: '#3DDC97',
            filter: 'blur(100px)',
            opacity: 0.10,
          }}
        />
        {/* Purple blob — mid left */}
        <div
          className="blob-float-3 absolute"
          style={{
            top: '30%',
            left: '-5%',
            width: '500px',
            height: '500px',
            borderRadius: '9999px',
            background: '#7C3AED',
            filter: 'blur(130px)',
            opacity: 0.10,
          }}
        />
      </div>

      {/* Radial hero glow */}
      <div aria-hidden="true" className="absolute inset-0 hero-glow pointer-events-none" />

      {/* Dot grid overlay */}
      <div aria-hidden="true" className="absolute inset-0 grid-bg pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">

        {/* Works-with strip */}
        <div
          className="flex items-center justify-center flex-wrap gap-2 mb-10 opacity-0 animate-fade-up"
          style={{ animationDelay: '0ms' }}
          aria-label="Works with"
        >
          <span
            className="font-mono text-xs text-[var(--text-secondary)] tracking-widest uppercase mr-2"
          >
            Works with
          </span>
          {WORKS_WITH.map(({ name, color }) => (
            <span
              key={name}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 6px ${color}88`,
                }}
                aria-hidden="true"
              />
              {name}
            </span>
          ))}
        </div>

        {/* Gradient headline */}
        <h1
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: '80ms' }}
        >
          {/* Line 1: Sushil  Dangi */}
          <span
            className="block leading-none tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 9vw, 6.5rem)',
              fontWeight: 700,
            }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #FF4D6D 0%, #ff8fa3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Sushil
            </span>
            {' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #3DDC97 0%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Dangi
            </span>
          </span>

          {/* Line 2: Engineering Manager */}
          <span
            className="block mt-4 text-white"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 600,
            }}
          >
            Engineering Manager
          </span>

          {/* Line 3: & Backend Engineer */}
          <span
            className="block mt-1 text-[var(--text-secondary)]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              fontWeight: 400,
            }}
          >
            &amp; Backend Engineer
          </span>
        </h1>

        {/* Description */}
        <p
          className="mt-6 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-up"
          style={{ animationDelay: '180ms', fontFamily: 'var(--font-body)' }}
        >
          Java / Spring Boot specialist. I ship production code daily and believe the best way
          to grow is to teach. Backend architecture, performance optimisation, cloud integrations
          — that is where I live.
        </p>

        {/* Terminal command pill */}
        <div
          className="mt-8 flex justify-center opacity-0 animate-fade-up"
          style={{ animationDelay: '260ms' }}
        >
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(0,0,0,0.45)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
            }}
          >
            <span style={{ color: '#FF4D6D' }}>$</span>
            <span className="text-white/90">whoami</span>
            <span className="text-white/30 mx-1">·</span>
            <span style={{ color: '#3DDC97' }}>--luv</span>
            <span className="text-white/70">2code</span>
          </div>
        </div>

        {/* CTAs */}
        <div
          className="mt-8 flex flex-wrap gap-4 justify-center opacity-0 animate-fade-up"
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
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 text-[var(--text-primary)] font-semibold text-sm hover:border-coral/40 hover:text-coral transition-all duration-200 cursor-pointer"
            style={{
              fontFamily: 'var(--font-body)',
              backgroundColor: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Mail size={16} />
            Get in touch
          </Link>
        </div>

        {/* Stats cards grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-14 opacity-0 animate-fade-up"
          style={{ animationDelay: '420ms' }}
        >
          {STATS.map(({ icon: Icon, value, label, color }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-white/[0.08] transition-all duration-200 hover:border-white/20"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Icon
                size={20}
                style={{ color: color === 'coral' ? '#FF4D6D' : '#3DDC97' }}
                aria-hidden="true"
              />
              <span
                className="font-bold leading-none"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  color: color === 'coral' ? '#FF4D6D' : '#3DDC97',
                }}
              >
                {value}
              </span>
              <span
                className="text-xs text-[var(--text-secondary)] text-center leading-tight"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
