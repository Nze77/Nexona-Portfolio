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
        slug: 'college-erp',
        title: 'Custom College & School ERP Software Development | Nexona',
        description:
            'Custom ERP software for colleges and schools — admissions, fees, attendance, exams, hostel and NAAC-ready reports. Affordable, mobile and app ready. Get a free quote.',
        priority: 0.9,
        navLabel: 'College ERP',
        keywords: [
            'college ERP software',
            'school management software',
            'custom college ERP software development',
            'affordable school ERP software',
            'campus management system India',
            'student information system',
            'fee management software for colleges',
            'college ERP with mobile app',
            'NAAC report software for colleges',
            'admission and examination management system',
        ],
        business: {
            areaServedCity: 'Mumbai',
            addressLocality: 'Mumbai',
            addressRegion: 'Maharashtra',
            addressCountry: 'IN',
            serviceType: [
                'College ERP Software',
                'School Management Software',
                'Campus Management System',
                'Student & Fee Management',
            ],
        },
    },
    {
        slug: 'manufacturing-erp',
        title: 'Custom Manufacturing ERP Software Development | Nexona',
        description:
            'Custom ERP software for manufacturers — production, inventory, BOM, quality, dispatch and GST. Affordable, mobile and app ready, built around your factory. Get a free quote.',
        priority: 0.9,
        navLabel: 'Manufacturing ERP',
        keywords: [
            'custom manufacturing ERP software',
            'custom ERP software development company',
            'affordable ERP software for manufacturers',
            'ERP software for small manufacturing business',
            'best ERP for small manufacturers',
            'custom ERP vs off the shelf ERP',
            'manufacturing ERP with mobile app',
            'production planning and inventory software',
            'ERP software for factory',
            'bespoke ERP development for manufacturing',
        ],
        business: {
            areaServedCity: 'Mumbai',
            addressLocality: 'Mumbai',
            addressRegion: 'Maharashtra',
            addressCountry: 'IN',
            serviceType: [
                'Custom Manufacturing ERP Software',
                'ERP Development',
                'Mobile ERP Applications',
                'Production & Inventory Management',
            ],
        },
    },
    {
        slug: 'customer-retention-management-software',
        title: 'Customer Retention Management Software - Reduce Churn, Keep Customers',
        description:
            'Customer retention management software that spots churn risk before the cancellation email. Health scores, automated alerts, re-engagement workflows and renewal tracking.',
        priority: 0.9,
        navLabel: 'Customer Retention Software',
        keywords: [
            'customer retention management software',
            'customer retention management',
            'churn reduction software',
            'customer health score software',
            'customer success software',
            'reduce customer churn',
            'retention CRM',
        ],
        og: {
            title: 'Customer Retention Management Software | Nexona',
            description:
                'Catch churn risk 6 weeks before the cancellation email. Custom retention software with health scoring, churn alerts and re-engagement workflows.',
        },
        business: {
            areaServedCity: 'Mumbai',
            addressLocality: 'Mumbai',
            addressRegion: 'Maharashtra',
            addressCountry: 'IN',
            serviceType: [
                'Customer Retention Management Software',
                'Customer Success Software',
                'CRM Development',
                'Churn Analytics & Automation',
            ],
        },
    },
    {
        slug: 'erp-systems-for-manufacturers',
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

