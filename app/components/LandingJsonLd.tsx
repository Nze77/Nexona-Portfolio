import { LANDING_PAGES } from '../data/landingPages'
import { SITE_URL } from '../lib/constants'

export interface FaqItem {
    question: string
    answer: string
}

/**
 * Structured data for a landing page:
 *   • ProfessionalService — local SEO (only emitted when `business` is set)
 *   • FAQPage             — rich results (only emitted when `faqItems` exist)
 *
 * Driven entirely by the LANDING_PAGES registry, so every current and future
 * landing page gets correct schema with no per-page boilerplate.
 */
export default function LandingJsonLd({
    slug,
    faqItems = [],
}: {
    slug: string
    faqItems?: FaqItem[]
}) {
    const page = LANDING_PAGES.find((p) => p.slug === slug)
    if (!page) return null

    const url = `${SITE_URL}/${slug}`
    const graph: Record<string, unknown>[] = []

    if (page.business) {
        graph.push({
            '@type': 'ProfessionalService',
            '@id': `${url}#business`,
            name: 'Nexona',
            description: page.description,
            url,
            image: `${SITE_URL}/logo.png`,
            areaServed: {
                '@type': 'City',
                name: page.business.areaServedCity,
            },
            address: {
                '@type': 'PostalAddress',
                addressLocality: page.business.addressLocality,
                addressRegion: page.business.addressRegion,
                addressCountry: page.business.addressCountry,
            },
            serviceType: page.business.serviceType,
        })
    }

    if (faqItems.length > 0) {
        graph.push({
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: faqItems.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer,
                },
            })),
        })
    }

    if (graph.length === 0) return null

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': graph,
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}
