// Registry of posts served under /blogs.
//
// HOW TO ADD A POST:
//   1. Create app/data/blogs/<slug>.ts exporting `POST: BlogPost`.
//   2. Import it below and add it to BLOG_POSTS.
//
// That is all. The route, metadata, canonical, BlogPosting + FAQPage schema,
// sitemap entry, /llms.txt link and /llms-full.txt export are all generated
// from this list.

import type { BlogBlock, BlogPost } from './types'
import { POST as MANAGE_AND_SCALE_EVENT_BUSINESS } from './how-to-manage-and-scale-an-event-management-business'

export type { BlogBlock, BlogPost, BlogFaqItem } from './types'

/** Newest first. */
export const BLOG_POSTS: BlogPost[] = [MANAGE_AND_SCALE_EVENT_BUSINESS].sort((a, b) =>
    b.published.localeCompare(a.published),
)

export function getPost(slug: string): BlogPost | undefined {
    return BLOG_POSTS.find((p) => p.slug === slug)
}

/** Stable anchor id for a heading, used by the table of contents. */
export function headingId(text: string): string {
    return text
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
}

/** The post body as markdown — used by /llms-full.txt. */
export function postToMarkdown(post: BlogPost): string {
    const block = (b: BlogBlock): string => {
        switch (b.type) {
            case 'p':
                return b.text
            case 'h2':
                return `## ${b.text}`
            case 'h3':
                return `### ${b.text}`
            case 'ul':
                return b.items.map((i) => `- ${i}`).join('\n')
            case 'ol':
                return b.items.map((i, n) => `${n + 1}. ${i}`).join('\n')
            case 'callout':
                return `> **${b.label ?? 'Note'}:** ${b.text}`
            case 'table': {
                const row = (cells: string[]) => `| ${cells.join(' | ')} |`
                return [
                    b.caption ? `*${b.caption}*\n` : '',
                    row(b.columns),
                    row(b.columns.map(() => '---')),
                    ...b.rows.map(row),
                ].join('\n')
            }
        }
    }
    return post.body.map(block).join('\n\n')
}
