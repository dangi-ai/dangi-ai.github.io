import type { Metadata } from 'next'
import { JetBrains_Mono, Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/JsonLd'

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://luv2code.in'),
  title: { default: 'Luv2code — Sushil Dangi', template: '%s | Luv2code' },
  description: 'Engineering Manager & Backend Engineer. I luv 2 code. I luv 2 share what I learn.',
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
      className={`${jetbrainsMono.variable} ${inter.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col antialiased">
        <JsonLd />
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-coral focus:text-white focus:font-mono focus:text-sm focus:rounded-lg"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
