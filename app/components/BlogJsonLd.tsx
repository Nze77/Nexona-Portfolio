import type { BlogPost } from '../data/blogs'
import { SITE_URL } from '../lib/constants'

/**
 * Structured data for a post:
 *   • BlogPosting    — author/publisher point at the site-wide Organization
 *                      node from SiteJsonLd, so a cited passage is attributed
 *                      to Nexona rather than to an anonymous page.
 *   • BreadcrumbList — Home › Blog › Post.
 *   • FAQPage        — only when the post has FAQ items.
 *
 * `mentions` links the post to the service pages it supports, which is how
 * an answer engine connects "this article about the problem" to "the company
 * that sells the fix".
 */
export default function BlogJsonLd({ post }: { post: BlogPost }) {
    const url = `${SITE_URL}/blogs/${post.slug}`
    const org = { '@id': `${SITE_URL}/#organization` }

    const graph: Record<string, unknown>[] = [
        {
            '@type': 'BlogPosting',
            '@id': `${url}#article`,
            headline: post.title,
            description: post.description,
            url,
            mainEntityOfPage: url,
            image: `${SITE_URL}/logo.png`,
            datePublished: post.published,
            dateModified: post.updated ?? post.published,
            inLanguage: 'en-IN',
            articleSection: post.category,
            keywords: post.keywords.join(', '),
            author: org,
            publisher: org,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            ...(post.relatedServices?.length
                ? {
                      mentions: post.relatedServices.map((s) => ({
                          '@type': 'WebPage',
                          name: s.label,
                          url: `${SITE_URL}${s.href}`,
                      })),
                  }
                : {}),
        },
        {
            '@type': 'BreadcrumbList',
            '@id': `${url}#breadcrumb`,
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blogs` },
                { '@type': 'ListItem', position: 3, name: post.title, item: url },
            ],
        },
    ]

    if (post.faq?.length) {
        graph.push({
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            isPartOf: { '@id': `${url}#article` },
            mainEntity: post.faq.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
        })
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
            }}
        />
    )
}
