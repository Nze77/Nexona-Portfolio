// Registry of SEO landing pages living under the app/(landing) route group.
//
// HOW TO ADD A NEW LANDING PAGE (everything SEO-critical is handled for you):
//   1. Add an entry to LANDING_PAGES below (slug MUST match the folder name).
//   2. Create app/(landing)/<slug>/page.tsx with your custom UI.
//   3. Create app/(landing)/<slug>/layout.tsx with just:
//
//        import { buildLandingMetadata } from '../../lib/landingSeo'
//        import LandingJsonLd from '../../components/LandingJsonLd'
//        import { FAQ_ITEMS } from './content'
//
//        const SLUG = '<slug>'
//        export const metadata = buildLandingMetadata(SLUG)
//        export default function Layout({ children }: { children: React.ReactNode }) {
//            return <><LandingJsonLd slug={SLUG} faqItems={FAQ_ITEMS} />{children}</>
//        }
//
// Doing this automatically gives the new page:
//   • a SELF-REFERENCING canonical (so Google indexes it independently)
//   • title / description / keywords / OpenGraph / Twitter metadata
//   • ProfessionalService + FAQPage structured data
//   • an internal link in the Footer (de-orphans the page for crawlers)
//   • a sitemap.xml entry

export interface LandingPageBusiness {
    /** City the service targets, e.g. "Mumbai". */
    areaServedCity: string
    addressLocality: string
    addressRegion: string
    addressCountry: string
    /** Services offered, surfaced in ProfessionalService structured data. */
    serviceType: string[]
}

export interface LandingPage {
    /** URL slug — must match the folder name under app/(landing)/ */
    slug: string
    title: string
    description: string
    /** Sitemap priority (0–1). Landing pages are high-intent, keep this high. */
    priority?: number
    /** Target keywords for the <meta keywords> tag. */
    keywords?: string[]
    /** Short label used for the internal Footer link. Falls back to title. */
    navLabel?: string
    /** OpenGraph/Twitter overrides. Fall back to title/description when omitted. */
    og?: {
        title?: string
        description?: string
    }
    /** Local-SEO structured data (ProfessionalService schema). */
    business?: LandingPageBusiness
}

export const LANDING_PAGES: LandingPage[] = [
    {
        slug: 'software-development-agency-mumbai',
        title: 'Software Development Agency in Mumbai | Nexona',
        description:
            'Nexona is a Mumbai-based software development agency building custom web apps, AI agents, automations, and full-stack solutions for growing businesses.',
        priority: 0.9,
        navLabel: 'Software Development Mumbai',
        keywords: [
            'software development agency in Mumbai',
            'software development Mumbai',
            'custom software development Mumbai',
            'web application development Mumbai',
            'ERP CRM development Mumbai',
            'AI automation Mumbai',
        ],
        og: {
            title: 'Nexona – Software Development Agency in Mumbai',
            description:
                'Custom software development, AI agents, and business automation from Mumbai’s trusted full-stack development partner.',
        },
        business: {
            areaServedCity: 'Mumbai',
            addressLocality: 'Mumbai',
            addressRegion: 'Maharashtra',
            addressCountry: 'IN',
            serviceType: [
                'Custom Software Development',
                'Web Application Development',
                'ERP & CRM Development',
                'AI Agents & Automation',
            ],
        },
    },
    {
        slug: 'erp-software-company-in-mumbai',
        title: 'ERP Software Company in Mumbai for Manufacturers | Nexona',
        description:
            'ERP software company in Mumbai trusted by manufacturers. Nexona covers production, GST, inventory & compliance. Thane, Bhiwandi, Navi Mumbai. Book a demo.',
        priority: 0.9,
        navLabel: 'Manufacturing ERP Mumbai',
        keywords: [
            'ERP software company in Mumbai',
            'ERP software company in Mumbai for Manufacturers',
            'manufacturing ERP software Mumbai',
            'ERP solutions for manufacturers Mumbai',
            'factory management software Mumbai',
            'supply chain ERP software Mumbai',
        ],
        og: {
            title: 'ERP Software Company in Mumbai for Manufacturers | Nexona',
            description:
                'ERP software company in Mumbai trusted by manufacturers. Nexona covers production, GST, inventory & compliance. Thane, Bhiwandi, Navi Mumbai. Book a demo.',
        },
        business: {
            areaServedCity: 'Mumbai',
            addressLocality: 'Mumbai',
            addressRegion: 'Maharashtra',
            addressCountry: 'IN',
            serviceType: [
                'Manufacturing ERP Software',
                'ERP Software Company in Mumbai',
                'ERP Implementation',
                'Inventory & Production Planning',
            ],
        },
    },
]

