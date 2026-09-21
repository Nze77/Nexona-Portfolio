import { Syne, Montserrat } from 'next/font/google'
import type { Metadata } from 'next'
import { GoogleTagManager } from '@next/third-parties/google'
import VisitorTracker from './components/VisitorTracker'
import WhatsAppFloat from './components/WhatsAppFloat'
import SiteJsonLd from './components/SiteJsonLd'
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
  title: 'Nexona | Custom Software, AI Agents & Business Automation',
  description: 'Nexona builds custom ERP, CRM, AI agents and workflow automation for fast-growing businesses. Cut manual work, scale faster and request your free quote today.',
  metadataBase: new URL('https://www.nexonalabs.com'),
  openGraph: {
    title: 'Nexona | Custom Software, AI Agents & Business Automation',
    description: 'Nexona builds custom ERP, CRM, AI agents and workflow automation for fast-growing businesses. Cut manual work, scale faster and request your free quote today.',
    url: 'https://www.nexonalabs.com',
    siteName: 'Nexona',
    images: [
      {
        url: 'https://www.nexonalabs.com/logo.png',
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
    title: 'Nexona | Custom Software, AI Agents & Business Automation',
    description: 'Nexona builds custom ERP, CRM, AI agents and workflow automation for fast-growing businesses. Cut manual work, scale faster and request your free quote today.',
    images: ['https://www.nexonalabs.com/logo.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${montserrat.variable}`}>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
      <body className="antialiased" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
        <SiteJsonLd />
        <VisitorTracker />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  )
}

