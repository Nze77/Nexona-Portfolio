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
  icons: {
    icon: '/logo.ico',
    shortcut: '/logo.ico',
    apple: '/logo.ico',
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

