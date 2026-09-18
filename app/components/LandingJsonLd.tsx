import { LANDING_PAGES } from '../data/landingPages'
import {
    SITE_URL,
    BUSINESS_NAME,
    BUSINESS_ADDRESS,
    BUSINESS_PHONE,
    BUSINESS_EMAIL,
    BUSINESS_GEO,
    BUSINESS_SAME_AS,
    BUSINESS_AREA_SERVED,
} from '../lib/constants'

export interface FaqItem {
    question: string
    answer: string
}

/** Stable, URL-safe fragment id for a service name, so the @id a Service node
 *  publishes stays the same across builds and can be referenced from the
 *  OfferCatalog above. */
function slugifyService(name: string): string {
    return name
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
}

/**
 * Structured data for a landing page:
 *   • WebPage             — always; anchors the page as an entity and carries
 *                           `dateModified`, which is what freshness re-ranking
 *                           in both Google and AI search reads.
 *   • BreadcrumbList      — always; gives the SERP breadcrumb trail and tells
 *                           crawlers the page hangs off the homepage rather
 *                           than floating unparented.
 *   • ProfessionalService — local SEO (only emitted when `business` is set)
 *   • Service             — one node per `serviceType`, wrapped in an
 *                           hasOfferCatalog. Without this, what the page
 *                           actually sells exists only as prose.
 *   • FAQPage             — rich results (only emitted when `faqItems` exist)
 *
 * Every node is @id-addressable and cross-referenced, so the whole page reads
 * as ONE connected entity graph instead of unrelated islands — that linkage is
 * what lets an answer engine attribute the FAQ answers to the business.
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

    // ── WebPage ───────────────────────────────────────────────────────────
    // `isPartOf` ties the page to the WebSite node emitted site-wide by
    // SiteJsonLd; `about` ties it to the Organization. `dateModified` is only
    // emitted when the registry actually carries a date — a fabricated or
    // build-time-generated date is worse than none, because it moves on every
    // deploy and gets discounted.
    graph.push({
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage: 'en-IN',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        primaryImageOfPage: `${SITE_URL}${page.og?.image ?? '/logo.png'}`,
        breadcrumb: { '@id': `${url}#breadcrumb` },
        ...(page.updated ? { dateModified: page.updated } : {}),
    })

    // ── BreadcrumbList ────────────────────────────────────────────────────
    graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: SITE_URL,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: page.navLabel ?? page.title,
                item: url,
            },
        ],
    })

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
            // City first (it is the strongest local signal and the one the GBP
            // listing corroborates), then any localities the page names, then
            // the countries the business actually takes work from. Delivery is
            // remote-first, so restricting this to one city would understate
            // the market and lose every national/international query. The
            // address node above still pins the entity to Mumbai.
            areaServed: [
                { '@type': 'City', name: page.business.areaServedCity },
                ...(page.business.alsoServed ?? []).map((name) => ({
                    '@type': 'Place',
                    name,
                })),
                ...BUSINESS_AREA_SERVED,
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
            // Machine-readable answer to "what is included", which otherwise
            // exists only as prose cards an extractor has to guess at.
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: page.navLabel ?? page.title,
                itemListElement: page.business.serviceType.map((name) => ({
                    '@type': 'Offer',
                    // Deliberately NO price/priceSpecification: engagements are
                    // scoped per client, and a made-up figure in schema is a
                    // structured-data violation as well as a commercial one.
                    itemOffered: { '@id': `${url}#service-${slugifyService(name)}` },
                })),
            },
        })

        // One addressable Service node per offering, each pointing back at the
        // ProfessionalService as provider. This is what an answer engine reads
        // when asked what the business does, and it makes each individual
        // service citable on its own.
        for (const name of page.business.serviceType) {
            graph.push({
                '@type': 'Service',
                '@id': `${url}#service-${slugifyService(name)}`,
                name,
                serviceType: name,
                provider: { '@id': `${url}#business` },
                areaServed: [
                    { '@type': 'City', name: page.business.areaServedCity },
                    ...BUSINESS_AREA_SERVED,
                ],
                url,
            })
        }
    }

    if (faqItems.length > 0) {
        graph.push({
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            // Without isPartOf the FAQ floats free of the business; with it,
            // an engine quoting an answer knows whose answer it is.
            isPartOf: { '@id': `${url}#webpage` },
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
