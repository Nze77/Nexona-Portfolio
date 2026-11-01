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
import { BUSINESS_EMAIL, BUSINESS_PHONE_DISPLAY } from '../../lib/constants'
import { POST as MANAGE_AND_SCALE_EVENT_BUSINESS } from './how-to-manage-and-scale-an-event-management-business'
import { POST as READY_MADE_VS_CUSTOM_DMS } from './ready-made-vs-custom-distributor-management-system'
import { POST as BUSINESS_APP_COST_INDIA } from './business-app-development-cost-in-india'

export type { BlogBlock, BlogPost, BlogFaqItem } from './types'

/** Newest first. */
export const BLOG_POSTS: BlogPost[] = [MANAGE_AND_SCALE_EVENT_BUSINESS, READY_MADE_VS_CUSTOM_DMS, BUSINESS_APP_COST_INDIA].sort((a, b) =>
    b.published.localeCompare(a.published),
)

/** Site-relative URL of a post. Every post lives at /blogs/<slug> (user rule,
 *  2026-11-01). Every link, canonical, sitemap and llms.txt entry goes
 *  through this, so the rule is enforced in one place. */
export function postPath(post: Pick<BlogPost, 'slug'>): string {
    return `/blogs/${post.slug}`
}

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
            case 'cta':
                return `**${b.heading}** ${b.text} Contact Nexona: WhatsApp or call ${BUSINESS_PHONE_DISPLAY}, email ${BUSINESS_EMAIL}.`
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
