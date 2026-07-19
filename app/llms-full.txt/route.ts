import { SECTIONS } from '../data/sections'
import { LANDING_PAGES } from '../data/landingPages'
import { PROJECT_DETAILS } from '../data/projectDetails'
import { SITE_URL } from '../lib/constants'

import { FAQ_ITEMS as COLLEGE_ERP_FAQ } from '../(landing)/college-erp/content'
import { FAQ_ITEMS as CRM_FAQ } from '../(landing)/customer-retention-management-software/content'
import { FAQ_ITEMS as MFG_ERP_MUMBAI_FAQ } from '../(landing)/erp-systems-for-manufacturers/content'
import { FAQ_ITEMS as MFG_ERP_FAQ } from '../(landing)/manufacturing-erp/content'
import { FAQ_ITEMS as SOFTWARE_MUMBAI_FAQ } from '../(landing)/software-development-agency-mumbai/content'

/**
 * /llms-full.txt — the same map as /llms.txt, but with the content INLINED
 * rather than linked, so a model can ingest the whole site in one fetch.
 *
 * Sourced from the same registries as sitemap.xml and llms.txt. The FAQ blocks
 * are the highest-value text on the landing pages (they already double as
 * FAQPage structured data), so they are reproduced in full here.
 */
export const dynamic = 'force-static'

interface FaqItem {
    question: string
    answer: string
}

/** FAQ content per landing-page slug. Add a line when adding a landing page. */
const FAQ_BY_SLUG: Record<string, FaqItem[]> = {
    'college-erp': COLLEGE_ERP_FAQ,
    'customer-retention-management-software': CRM_FAQ,
    'erp-systems-for-manufacturers': MFG_ERP_MUMBAI_FAQ,
    'manufacturing-erp': MFG_ERP_FAQ,
    'software-development-agency-mumbai': SOFTWARE_MUMBAI_FAQ,
}

export function GET() {
    const landingSections = LANDING_PAGES.map((page) => {
        const faqs = FAQ_BY_SLUG[page.slug] ?? []
        const faqBlock = faqs.length
            ? `\n#### Frequently asked questions\n\n${faqs
                  .map((item) => `**${item.question}**\n\n${item.answer}`)
                  .join('\n\n')}\n`
            : ''
        const served = page.business
            ? `\nServices: ${page.business.serviceType.join(', ')}\nArea served: ${page.business.areaServedCity}, ${page.business.addressRegion}, ${page.business.addressCountry}\n`
            : ''

        return `### ${page.title}

URL: ${SITE_URL}/${page.slug}

${page.description}
${served}${faqBlock}`
    }).join('\n---\n\n')

    const projectSections = PROJECT_DETAILS.map((project) => {
        const live = project.landingPage ? `\nLive site: ${project.landingPage}` : ''
        return `### ${project.name}

URL: ${SITE_URL}/projects/${project.id}
Client: ${project.client}
Year: ${project.year}
Role: ${project.role}
Deliverables: ${project.deliverables.join(', ')}${live}

${project.description.trim()}`
    }).join('\n\n---\n\n')

    const categoryOverview = SECTIONS.map(
        (section) =>
            `- **${section.category}** — ${section.products.map((p) => p.name).join(', ')}`,
    ).join('\n')

    const body = `# Nexona — Full Content Export

> Nexona is a Mumbai-based software studio building bespoke AI agents, business automations, ERPs, CRMs, and full-stack web applications for growing businesses. We design systems around how a company actually operates rather than forcing it into off-the-shelf software.

Source: ${SITE_URL}
Generated: ${new Date().toISOString().slice(0, 10)}

## What we do

${categoryOverview}

We build custom software rather than reselling licences. Clients own what we
build for them. Typical engagements: a CRM shaped around how a team actually
sells, an ERP that reflects a specific factory or campus floor, AI agents that
answer real customer questions against real company data, and automations that
remove the manual reconciliation between systems that were never meant to talk.

## Services

${landingSections}

---

## Projects

${projectSections}

---

## Contact

- Website: ${SITE_URL}
- Email: info@nexonalabs.com
- Phone: +91 90822 07416
- Location: Mumbai, India
`

    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
    })
}
