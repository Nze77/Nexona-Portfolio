import { REVIEWS, reviewSummary, reviewerCredit } from '../data/reviews'
import { SITE_URL } from '../lib/constants'

/**
 * Structured data for /reviews:
 *   • WebPage        — the page as an entity, tied to the site-wide Organization.
 *   • BreadcrumbList — Home › Reviews.
 *   • Review         — one per client review, `itemReviewed` pointing at the
 *                      Organization node from SiteJsonLd, so an answer engine
 *                      attributes every review to the same Nexona entity.
 *
 * Deliberately NO reviewRating and NO aggregateRating: clients gave words, not
 * star scores, and a rating in schema that the page does not show is a
 * structured-data violation. (Reviews a business hosts about itself are not
 * eligible for Google's star snippets anyway — the value here is citability.)
 */
export default function ReviewsJsonLd() {
    const url = `${SITE_URL}/reviews`

    const reviews = REVIEWS.map((r) => ({
        '@type': 'Review',
        '@id': `${url}#${r.id}`,
        url: `${url}#${r.id}`,
        name: r.pullQuote,
        description: reviewSummary(r),
        reviewBody: r.body.join('\n\n'),
        ...(r.date ? { datePublished: r.date } : {}),
        itemReviewed: { '@id': `${SITE_URL}/#organization` },
        about: {
            '@type': 'Service',
            name: r.project,
            provider: { '@id': `${SITE_URL}/#organization` },
            ...(r.service ? { url: `${SITE_URL}${r.service.href}` } : {}),
        },
        author: {
            '@type': 'Person',
            name: reviewerCredit(r) ?? 'Anonymous client',
            ...(r.role ? { jobTitle: r.role } : {}),
            ...(r.businessIsNamed
                ? {
                      worksFor: {
                          '@type': 'Organization',
                          name: r.business,
                          ...(r.location
                              ? { address: { '@type': 'PostalAddress', addressLocality: r.location } }
                              : {}),
                      },
                  }
                : {}),
        },
        publisher: { '@id': `${SITE_URL}/#organization` },
        isPartOf: { '@id': `${url}#webpage` },
    }))

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': `${url}#webpage`,
                url,
                name: 'Client Reviews of Nexona Labs',
                description:
                    'Unedited reviews from businesses Nexona Labs has built custom software, apps and automation for.',
                inLanguage: 'en-IN',
                isPartOf: { '@id': `${SITE_URL}/#website` },
                about: { '@id': `${SITE_URL}/#organization` },
                breadcrumb: { '@id': `${url}#breadcrumb` },
                mainEntity: { '@id': `${url}#reviews` },
            },
            {
                '@type': 'ItemList',
                '@id': `${url}#reviews`,
                name: 'Client reviews',
                numberOfItems: REVIEWS.length,
                itemListElement: REVIEWS.map((r, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    item: { '@id': `${url}#${r.id}` },
                })),
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${url}#breadcrumb`,
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                    { '@type': 'ListItem', position: 2, name: 'Reviews', item: url },
                ],
            },
            ...reviews,
        ],
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}
