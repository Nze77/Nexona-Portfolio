import type { Metadata } from 'next'
import type { BlogPost } from '../data/blogs'
import { SITE_URL } from './constants'

/**
 * Metadata for a single post. Same rules as buildLandingMetadata: a
 * self-referencing canonical per post, and the OpenGraph image repeated
 * because Next.js merges `openGraph` shallowly over the root layout's.
 */
export function buildBlogMetadata(post: BlogPost): Metadata {
    const path = `/blogs/${post.slug}`
    const image = { url: `${SITE_URL}/logo.png`, width: 1080, height: 1080, alt: post.title }

    return {
        title: post.metaTitle,
        description: post.description,
        keywords: post.keywords,
        alternates: { canonical: path },
        openGraph: {
            title: post.title,
            description: post.description,
            url: `${SITE_URL}${path}`,
            siteName: 'Nexona',
            type: 'article',
            locale: 'en_US',
            publishedTime: post.published,
            modifiedTime: post.updated ?? post.published,
            authors: ['Nexona'],
            section: post.category,
            tags: post.keywords.slice(0, 6),
            images: [image],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: [image.url],
        },
    }
}
