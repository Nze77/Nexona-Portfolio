import { SECTIONS } from '../data/sections'
import { LANDING_PAGES } from '../data/landingPages'
import { SITE_URL } from '../lib/constants'

/**
 * /llms.txt — the curated index for LLMs (llmstxt.org spec).
 *
 * Structure required by the spec: an H1 name, a blockquote summary, then H2
 * sections of `- [Title](url): description` links. Everything is generated
 * from the same registries that feed sitemap.xml, so adding a landing page or
 * project to app/data/ automatically shows up here too — no manual upkeep.
 *
 * This is DESCRIPTIVE (here is what matters), unlike robots.ts which is
 * PRESCRIPTIVE (what may be crawled). The two are complementary.
 */
export const dynamic = 'force-static'

export function GET() {
    const landingLinks = LANDING_PAGES.map(
        (page) =>
            `- [${page.navLabel ?? page.title}](${SITE_URL}/${page.slug}): ${page.description}`,
    ).join('\n')

    const projectLinks = SECTIONS.map((section) => {
        const items = section.products
            .map(
                (product) =>
                    `- [${product.name}](${SITE_URL}${product.link}): ${product.description}`,
            )
            .join('\n')
        return `### ${section.category}\n\n${items}`
    }).join('\n\n')

    const body = `# Nexona

> Nexona is a Mumbai-based software studio building bespoke AI agents, business automations, ERPs, CRMs, and full-stack web applications for growing businesses. We design systems around how a company actually operates rather than forcing it into off-the-shelf software.

## Core pages

- [Home](${SITE_URL}/): Overview of Nexona — the operational problems we solve and the systems we build to solve them.
- [Projects](${SITE_URL}/projects): Portfolio of shipped work across full-stack development, AI agents, and automations.

## Services

${landingLinks}

## Projects

${projectLinks}

## Contact

- Email: info@nexonalabs.com
- Phone: +91 90822 07416
- Location: Mumbai, India

## Optional

- [Full content export](${SITE_URL}/llms-full.txt): Every page's content inlined into a single file.
`

    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
    })
}
