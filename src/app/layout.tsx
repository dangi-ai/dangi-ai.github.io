import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
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
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh flex flex-col bg-bg text-ink antialiased">
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-violet/20 blur-[140px]" />
          <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-cyan/10 blur-[140px]" />
        </div>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan focus:text-bg focus:font-mono focus:text-sm focus:rounded-lg"
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
