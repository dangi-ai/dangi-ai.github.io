import type { Metadata } from 'next'
import { Instrument_Serif, Manrope, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ScrollMeter } from '@/components/ui/ScrollMeter'

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
})

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://luv2code.in'),
  title: { default: 'Luv2code — Sushil Dangi', template: '%s | Luv2code' },
  description:
    'Senior Java / Spring Boot Lead · 10+ years building distributed systems & leading engineering teams. I luv 2 code. I luv 2 share what I learn.',
  openGraph: {
    type: 'website',
    url: 'https://luv2code.in',
    siteName: 'Luv2code',
    images: [{ url: '/luv2code-icon.svg', width: 512, height: 512, alt: 'Luv2code' }],
  },
  twitter: { card: 'summary', site: '@s_dangi98' },
  icons: { icon: '/luv2code-favicon-64.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh flex flex-col bg-ink text-paper antialiased">
        <div aria-hidden className="field pointer-events-none fixed inset-0 -z-10" />
        <ScrollMeter />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-paper focus:text-ink focus:text-xs focus:tracking-[0.2em] focus:uppercase"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main-content" className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
