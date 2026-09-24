// Types for the /blogs section. Kept apart from index.ts so individual post
// files can import them without a circular dependency on the registry.

/**
 * A post body is a list of typed blocks rather than MDX or raw HTML, so the
 * same content renders as the page, as markdown in /llms-full.txt, and feeds
 * the table of contents — with no parser dependency.
 *
 * Inline syntax inside `text` / list items / table cells:
 *   **bold**   and   [link text](/internal-or-https-url)
 */
export type BlogBlock =
    | { type: 'p'; text: string }
    | { type: 'h2'; text: string }
    | { type: 'h3'; text: string }
    | { type: 'ul'; items: string[] }
    | { type: 'ol'; items: string[] }
    /** Boxed, front-loaded answer. The first block of every post should be
     *  one — it is the passage answer engines lift when they cite the page. */
    | { type: 'callout'; label?: string; text: string }
    /** Rendered as a real <table>: the most extractable element on a page. */
    | { type: 'table'; caption?: string; columns: string[]; rows: string[][] }

export interface BlogFaqItem {
    question: string
    answer: string
}

export interface BlogPost {
    /** URL slug — served at /blogs/<slug>. Never change it once published. */
    slug: string
    /** Visible H1. Can be longer than the meta title. */
    title: string
    /** <title> tag. Aim for under 60 characters. */
    metaTitle: string
    /** Meta description. Aim for 140–160 characters. */
    description: string
    /** One or two sentences for the /blogs index card and llms.txt. */
    excerpt: string
    /** Keyword cluster for the <meta keywords> tag. */
    keywords: string[]
    /** Topic label shown above the title, e.g. "Event Management". */
    category: string
    /** ISO date (YYYY-MM-DD). */
    published: string
    /** ISO date the copy was last materially revised. Bump it only when the
     *  content moves — a date that changes on every deploy gets discounted. */
    updated?: string
    readingMinutes: number
    /** Landing pages this post supports, as "/slug" paths. Rendered as the
     *  related-services block and emitted as `mentions` in the schema. */
    relatedServices?: { label: string; href: string }[]
    body: BlogBlock[]
    faq?: BlogFaqItem[]
    /** End-of-post call to action. Falls back to a generic one. */
    cta?: { heading: string; text: string }
}
