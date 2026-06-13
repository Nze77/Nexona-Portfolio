import type { Metadata } from 'next'
import { LANDING_PAGES } from '../../data/landingPages'
import { FAQ_ITEMS } from './content'

const SLUG = 'software-development-agency-mumbai'
const page = LANDING_PAGES.find((p) => p.slug === SLUG)!
const url = `https://nexonalabs.com/${SLUG}`

export const metadata: Metadata = {
    title: page.title,
    description: page.description,
    keywords: [
        'software development agency in Mumbai',
        'software development Mumbai',
        'custom software development Mumbai',
        'web application development Mumbai',
        'ERP CRM development Mumbai',
        'AI automation Mumbai',
    ],
    alternates: {
        canonical: `/${SLUG}`,
    },
    openGraph: {
        title: 'Nexona – Software Development Agency in Mumbai',
        description:
            'Custom software development, AI agents, and business automation from Mumbai’s trusted full-stack development partner.',
        url,
        siteName: 'Nexona',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Nexona – Software Development Agency in Mumbai',
        description:
            'Custom software development, AI agents, and business automation from Mumbai’s trusted full-stack development partner.',
    },
}

// Structured data: ProfessionalService (local SEO) + FAQPage (rich results)
const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'ProfessionalService',
            '@id': `${url}#business`,
            name: 'Nexona',
            description: page.description,
            url,
            image: 'https://nexonalabs.com/logo.png',
            areaServed: {
                '@type': 'City',
                name: 'Mumbai',
            },
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Mumbai',
                addressRegion: 'Maharashtra',
                addressCountry: 'IN',
            },
            serviceType: [
                'Custom Software Development',
                'Web Application Development',
                'ERP & CRM Development',
                'AI Agents & Automation',
            ],
        },
        {
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: FAQ_ITEMS.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer,
                },
            })),
        },
    ],
}

export default function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    )
}
