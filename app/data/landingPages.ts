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
    /** Extra localities surfaced alongside the city in `areaServed`. Use this
     *  for neighbourhood/node-level local SEO on city-specific landing pages. */
    alsoServed?: string[]
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
        title: 'Software Agency in Mumbai | Custom Software Development – Nexona',
        description:
            'Nexona is a software agency in Mumbai building custom web apps, AI agents, automations, and full-stack software for growing businesses.',
        priority: 0.9,
        navLabel: 'Software Agency Mumbai',
        keywords: [
            'software agency Mumbai',
            'software agency in Mumbai',
            'software development agency in Mumbai',
            'software development Mumbai',
            'custom software development Mumbai',
            'web application development Mumbai',
            'ERP CRM development Mumbai',
            'AI automation Mumbai',
        ],
        og: {
            title: 'Nexona – Software Agency in Mumbai',
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
        // Sister page to software-development-agency-mumbai. Kept deliberately
        // disjoint from it: that page owns "software agency (in) Mumbai", this
        // one owns the Navi Mumbai / node-level queries. No shared keywords,
        // no shared H1/H2 phrasing — the two support each other rather than
        // competing for the same SERP.
        slug: 'software-development-company-in-navi-mumbai',
        title: 'Software Development Company in Navi Mumbai | Custom Software – Nexona',
        description:
            'Nexona is a software development company in Navi Mumbai building custom software, business management systems and process automation for startups and growing companies — Airoli and Vashi to Belapur, Kharghar and Panvel.',
        priority: 0.9,
        navLabel: 'Software Development Navi Mumbai',
        keywords: [
            'software development company in Navi Mumbai',
            'software development in Navi Mumbai',
            'software company in Navi Mumbai',
            'custom software development Navi Mumbai',
            'business management software Navi Mumbai',
            'process automation Navi Mumbai',
            'software development for startups Navi Mumbai',
            'MVP development Navi Mumbai',
            'software developers Navi Mumbai',
            'web development company Navi Mumbai',
            'software company Vashi',
            'software company CBD Belapur',
            'software development Kharghar',
            'software development Airoli',
        ],
        og: {
            title: 'Software Development Company in Navi Mumbai | Nexona',
            description:
                'Custom software, business management systems and process automation for Navi Mumbai startups and growing companies. Built around how you actually work.',
        },
        business: {
            areaServedCity: 'Navi Mumbai',
            alsoServed: [
                'Airoli',
                'Rabale',
                'Ghansoli',
                'Mahape',
                'Turbhe',
                'Vashi',
                'Sanpada',
                'Nerul',
                'Seawoods',
                'CBD Belapur',
                'Kharghar',
                'Kamothe',
                'Ulwe',
                'Panvel',
                'Taloja',
            ],
            addressLocality: 'Navi Mumbai',
            addressRegion: 'Maharashtra',
            addressCountry: 'IN',
            serviceType: [
                'Custom Software Development',
                'Business Management Systems',
                'Business Process Automation',
                'Startup MVP Development',
                'Web & Mobile Application Development',
                'AI Agents & Systems Integration',
            ],
        },
    },
    {
        // Service-intent page, deliberately NON-GEOGRAPHIC. The Mumbai and Navi
        // Mumbai pages own the location queries ("... in Mumbai"); this one owns
        // "AI automation agency" and the un-located service queries around it.
        //
        // Slug moved from /ai-and-process-automation-agency so it carries the
        // exact primary keyword; next.config.ts 308-redirects the old path.
        //
        // CANNIBALISATION BOUNDARY: this page owns the AGENCY/OUTCOME cluster
        // (automating existing repeat work). ai-agent-development-company owns
        // the BUILD cluster (someone who already wants an agent engineered).
        // No shared H1/H2 phrasing, no shared keywords, no shared serviceType.
        slug: 'ai-automation-agency',
        title: 'AI Automation Agency | Workflow & Process Automation – Nexona',
        description:
            'Nexona is an AI automation agency that maps how your business actually works, then automates the repeat work — data entry, approvals, reports and follow-ups.',
        priority: 0.95,
        navLabel: 'AI Automation',
        keywords: [
            'AI automation agency',
            'AI automation services',
            'AI automation',
            'AI process automation',
            'process automation agency',
            'business process automation services',
            'AI workflow automation services',
            'workflow automation company',
            'intelligent process automation services',
            'automate business processes',
            'document processing automation',
            'automation consulting services',
        ],
        og: {
            title: 'AI Automation Agency | Nexona',
            description:
                'We map how work actually moves through your business, then automate the repeat parts. Workflow automation, document processing and integrations — built to fit, not templated.',
        },
        business: {
            areaServedCity: 'Mumbai',
            alsoServed: ['India', 'United Arab Emirates', 'United Kingdom', 'United States'],
            addressLocality: 'Mumbai',
            addressRegion: 'Maharashtra',
            addressCountry: 'IN',
            serviceType: [
                'AI Automation Agency',
                'Business Process Automation',
                'Workflow Automation',
                'Document Processing Automation',
                'Systems Integration',
            ],
        },
    },
    {
        // BUILD-intent page. Someone landing here has already decided they want
        // an AI agent engineered; they are comparing vendors, not deciding
        // whether to automate. That is why it is separate from
        // ai-automation-agency, which owns the "we have repeat work" outcome
        // queries. Boundary held deliberately:
        //   ai-automation-agency        → process/workflow/agency language
        //   ai-agent-development-company → agent/RAG/LLM engineering language
        // Non-geographic, so it supports the city pages rather than competing.
        slug: 'ai-agent-development-company',
        title: 'AI Agent Development Company | Custom AI Agents – Nexona',
        description:
            'Nexona is an AI agent development company that builds custom AI agents in code — your data, your infrastructure, your codebase at the end of it. Not rented drag-and-drop workflows.',
        priority: 0.95,
        navLabel: 'AI Agent Development',
        keywords: [
            'AI agent development company',
            'AI agent development services',
            'custom AI agent development',
            'hire AI agent developer',
            'AI agent development cost',
            'AI agent developers',
            'LangGraph developer',
            'LangChain development services',
            'RAG development services',
            'custom LLM application development',
            'multi agent system development',
            'enterprise AI agent development',
        ],
        og: {
            title: 'AI Agent Development Company | Nexona',
            description:
                'Custom AI agents built in code — LangGraph, Python, your data, your infrastructure. Evaluated before launch, monitored after, and yours to keep.',
        },
        business: {
            areaServedCity: 'Mumbai',
            alsoServed: ['India', 'United Arab Emirates', 'United Kingdom', 'United States'],
            addressLocality: 'Mumbai',
            addressRegion: 'Maharashtra',
            addressCountry: 'IN',
            serviceType: [
                'AI Agent Development',
                'Custom AI Agent Development',
                'RAG Pipeline Development',
                'LLM Application Development',
                'Multi-Agent System Development',
                'AI Systems Integration',
            ],
        },
    },
    {
        // Horizontal service page. Deliberately NOT an ERP page and NOT an
        // automation page: manufacturing-erp / college-erp own the vertical ERP
        // queries, ai-automation-agency owns the automation-agency
        // queries. This one owns the "business management software" cluster —
        // custom internal tools, replacing Excel, unified sales/inventory/
        // operations systems for startups and SMEs. Non-geographic, so it
        // supports the city pages rather than competing with them.
        slug: 'business-management-software-development',
        title: 'Business Management Software Development Company | Nexona',
        description:
            'Nexona builds custom business management software for startups and SMEs outgrowing Excel — unifying sales, inventory, and operations into one system.',
        priority: 0.95,
        navLabel: 'Business Management Software',
        keywords: [
            'business management software',
            'custom business management software',
            'business management software development company',
            'business management software for startups',
            'replace excel with software',
            'outgrow excel spreadsheets',
            'internal tools development company',
            'custom internal tools for startups',
            'workflow automation software development',
            'business process automation software',
            'operations management software',
            'custom operations software for startups',
            'unified business management system',
            'custom software to manage business operations',
            'scale business operations software',
            'custom dashboard development for business',
            'sales and inventory management software',
            'business automation software development company',
            'SME management software development',
            'startup operations software',
            'custom software for growing SMEs',
        ],
        og: {
            title: 'Business Management Software Development Company | Nexona',
            description:
                'Custom business management software for startups and SMEs that have outgrown Excel. Sales, inventory and operations in one system — built around how you actually work.',
        },
        business: {
            areaServedCity: 'Mumbai',
            alsoServed: ['India', 'United Arab Emirates', 'United Kingdom', 'United States'],
            addressLocality: 'Mumbai',
            addressRegion: 'Maharashtra',
            addressCountry: 'IN',
            serviceType: [
                'Business Management Software Development',
                'Custom Internal Tools Development',
                'Operations Management Software',
                'Sales & Inventory Management Software',
                'Workflow Automation Software Development',
                'Custom Dashboard Development',
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

