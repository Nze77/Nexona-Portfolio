import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nexona',
  description: 'AI Agents & Automations, Full Stack Development, ERPs, CRMs, and more',
  openGraph: {
    title: 'Nexona | AI Agents & Automations',
    description: 'Bespoke AI Agents, Full Stack Development, and Business Automations to scale your enterprise.',
    url: 'https://www.nexonalabs.com/home',
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
    title: 'Nexona | AI Agents & Automations',
    description: 'Bespoke AI Agents, Full Stack Development, and Business Automations to scale your enterprise.',
    images: ['https://www.nexonalabs.com/logo.png'],
  },
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
