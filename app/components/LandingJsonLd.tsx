import { LANDING_PAGES } from '../data/landingPages'
import {
    SITE_URL,
    BUSINESS_NAME,
    BUSINESS_ADDRESS,
    BUSINESS_PHONE,
    BUSINESS_EMAIL,
    BUSINESS_GEO,
    BUSINESS_SAME_AS,
} from '../lib/constants'

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
            name: BUSINESS_NAME,
            description: page.description,
            url,
            image: `${SITE_URL}/logo.png`,
            telephone: BUSINESS_PHONE,
            email: BUSINESS_EMAIL,
            priceRange: '$$',
            // Proves this node is the same entity as the Google Business
            // Profile / social listings Google already has on file.
            sameAs: BUSINESS_SAME_AS,
            // A single City unless the page also names the localities it covers,
            // in which case they are emitted alongside it so node-level local
            // queries ("software company in Vashi") have something to match.
            areaServed: [
                { '@type': 'City', name: page.business.areaServedCity },
                ...(page.business.alsoServed ?? []).map((name) => ({
                    '@type': 'Place',
                    name,
                })),
            ],
            // The real office, identical on every page. Must match GBP exactly
            // — a page claiming to be located in the city it merely serves is a
            // NAP mismatch and costs more than the keyword is worth.
            address: {
                '@type': 'PostalAddress',
                ...BUSINESS_ADDRESS,
            },
            geo: {
                '@type': 'GeoCoordinates',
                ...BUSINESS_GEO,
            },
            openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                ],
                opens: '09:00',
                closes: '17:00',
            },
            parentOrganization: { '@id': `${SITE_URL}/#organization` },
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
