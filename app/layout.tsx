import { Syne, Montserrat } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Nexona',
  description: 'AI Agents & Automations, Full Stack Development, ERPs, CRMs, and more',
  metadataBase: new URL('https://nexonalabs.com'),
  openGraph: {
    title: 'Nexona | AI Agents & Automations',
    description: 'Bespoke AI Agents, Full Stack Development, and Business Automations to scale your enterprise.',
    url: 'https://nexonalabs.com',
    siteName: 'Nexona',
    images: [
      {
        url: 'https://nexonalabs.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'Nexona AI Agents & Automations',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexona | AI Agents & Automations',
    description: 'Bespoke AI Agents, Full Stack Development, and Business Automations to scale your enterprise.',
    images: ['https://nexonalabs.com/logo.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${montserrat.variable}`}>
      <body className="antialiased" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
        {children}
      </body>
    </html>
  )
}

