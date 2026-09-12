import {
    SITE_URL,
    BUSINESS_NAME,
    BUSINESS_ADDRESS,
    BUSINESS_PHONE,
    BUSINESS_EMAIL,
    BUSINESS_GEO,
    BUSINESS_SAME_AS,
} from '../lib/constants'

/**
 * Site-wide entity graph, emitted once from the root layout:
 *   • Organization — the canonical "who is Nexona" node every other node
 *     points at. This is what Google anchors a knowledge panel to, and what
 *     `sameAs` uses to tie the site to the Google Business Profile listing.
 *   • WebSite      — lets Google attribute the domain to that Organization.
 *
 * The per-page ProfessionalService nodes in LandingJsonLd reference this via
 * `parentOrganization`, so the landing pages inherit the identity instead of
 * each declaring an unrelated business.
 */
export default function SiteJsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': `${SITE_URL}/#organization`,
                name: BUSINESS_NAME,
                url: SITE_URL,
                logo: {
                    '@type': 'ImageObject',
                    url: `${SITE_URL}/logo.png`,
                },
                image: `${SITE_URL}/logo.png`,
                email: BUSINESS_EMAIL,
                telephone: BUSINESS_PHONE,
                address: {
                    '@type': 'PostalAddress',
                    ...BUSINESS_ADDRESS,
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    ...BUSINESS_GEO,
                },
                sameAs: BUSINESS_SAME_AS,
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'sales',
                    telephone: BUSINESS_PHONE,
                    email: BUSINESS_EMAIL,
                    areaServed: 'IN',
                    availableLanguage: ['en', 'hi'],
                },
            },
            {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                url: SITE_URL,
                name: BUSINESS_NAME,
                publisher: { '@id': `${SITE_URL}/#organization` },
            },
        ],
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}
