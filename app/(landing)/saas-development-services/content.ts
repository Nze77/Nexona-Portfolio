export interface FaqItem {
    question: string
    answer: string
}

export interface Question extends FaqItem {
    /** Anchor id, also the key page.tsx uses to attach tables and links. */
    id: string
}

/** Visible "last updated" date. Keep equal to `updated` in landingPages.ts. */
export const LAST_UPDATED = '5 November 2026'
export const LAST_UPDATED_ISO = '2026-11-05'

// ── Rules for this page ──────────────────────────────────────────────────────
// PRICE: "starts from" ₹73,000, user-approved 2026-11-05. Never a flat price or
// a range, and don't describe what it includes until the user says. Keep in step
// with `business.startingPrice` in landingPages.ts. All other ₹ figures are named
// third parties' USD numbers, converted at USD_TO_INR and rounded. Re-check the
// rate if these figures are updated.
//
// PROOF: product facts below come from each product's public site, read
// 2026-11-05. Neither site publishes customer results, and the numbers visible
// in their screenshots are demo data, so never present them as outcomes.
// Mailnitrix sends through customers' own Gmail and Outlook. It does not run IP
// pools or its own MTA, so don't describe it as sending infrastructure.
//
// ANSWERS: every `answer` is a 40–60 word direct answer, quotable on its own.
// These double as FAQPage schema and the llms-full.txt export.

export const STARTING_PRICE = '₹73,000'

/** RBI reference rate was ₹95.25 on 30 October 2026. Figures below use ₹95. */
export const USD_TO_INR_NOTE = {
    text: 'Converted from US dollars at about ₹95 to $1 (RBI reference rate, 30 October 2026) and rounded',
    href: 'https://www.msei.in/markets/currency/historical-data/rbireferenceratearchives',
}

export const HERO_FACTS = [
    { value: '2 live products', label: 'you can open and inspect today' },
    { value: 'Voice + email', label: 'AI, telephony and deliverability' },
    { value: 'Clutch-verified', label: 'review from Valyrian Voice’s founder' },
    { value: `From ${STARTING_PRICE}`, label: 'custom-built, and the code is yours' },
]

export const PROJECTS = [
    {
        id: 'valyrian-voice',
        name: 'Valyrian Voice',
        url: 'https://valyrianvoice.com/',
        domain: 'valyrianvoice.com',
        image: '/saas/valyrian-voice.webp',
        width: 1440,
        height: 900,
        alt: 'Valyrian Voice homepage, an AI voice agent and dialer SaaS for call centers built by Nexona Labs, showing its demo dashboard of calls, connect rate, conversations and conversions.',
        tagline: 'Dialer and AI voice agents for call centers.',
        summary:
            'AI agents call out, answer inbound numbers and hand qualified customers to a human, with the reason on that person’s screen. The site footer reads “Developed and managed by Nexona Labs”.',
        built: [
            'AI dial sessions at 100 lines, with retries and caller ID rotation',
            'Browser dialer with blind, three-way and consult transfers',
            'Prompted agents with tools, memory and human handoff',
            'Inbound routing by number: AI only, people then AI, or people only',
            'AI summary and extracted fields on every AI call',
            'Any SIP carrier, with trunk health checked every 30 seconds',
            'Per-agent and per-minute billing, plus dedicated GPU runtimes for enterprise',
        ],
    },
    {
        id: 'mailnitrix',
        name: 'Mailnitrix',
        url: 'https://mailnitrix.com/',
        domain: 'mailnitrix.com',
        image: '/saas/mailnitrix.webp',
        width: 1440,
        height: 829,
        alt: 'Mailnitrix homepage, a cold email SaaS for Gmail and Outlook built by Nexona Labs, showing a sample campaign rotating across four mailboxes with daily limits and a cooldown.',
        tagline: 'Cold email for Gmail and Outlook.',
        summary:
            'Founders, sales teams, agencies and recruiters connect their own mailboxes. Mailnitrix warms them up and rotates every send so no single mailbox burns out.',
        built: [
            'Automatic warm-up with spam rescue and placement tracking',
            'Inbox rotation with random pacing and rolling 24-hour limits',
            'Error-aware cooldowns that pause a mailbox and move its emails',
            'Gmail over SMTP and IMAP, Outlook with a Microsoft Graph fallback',
            'Open tracking that filters machine opens and known scanners',
            'Client workspaces for agencies, plus API and webhooks',
            'Free plan and three paid tiers, with overage per 1,000 emails',
        ],
    },
]

/** Public Clutch review. Same wording as the Mumbai page: keep it verbatim. */
export const CLUTCH_REVIEW = {
    quote: 'The thing I found most impressive was that Nexona did not approach the project as a simple ‘build what the client asks for’ engagement.',
    attribution: 'Founder & CEO, Valyrian Voice · AI voice project · Verified on Clutch',
}

/** Service list. Carries the secondary keywords in plain language. */
export const SERVICES = [
    {
        title: 'SaaS MVP development',
        body: 'One core workflow, login, billing and an admin panel, in front of real users. For founders asking how to build a SaaS product for their startup without hiring first.',
    },
    {
        title: 'Custom SaaS development',
        body: 'Built from scratch around your product instead of a boilerplate you will fight in month seven. Backend, frontend, billing, infrastructure.',
    },
    {
        title: 'Multi-tenant and white-label SaaS',
        body: 'Tenant isolation, workspaces and roles, plus per-customer domains, branding and emails when your customers resell you.',
    },
    {
        title: 'AI SaaS development',
        body: 'Voice agents, RAG chatbots and AI features inside a product you already run, metered per tenant so one customer can’t eat your margin.',
    },
    {
        title: 'PaaS development services',
        body: 'The platform layer: public APIs, webhooks, tenant provisioning, usage metering and developer docs, for products other developers build on.',
    },
    {
        title: 'Taking over a stuck SaaS',
        body: 'Your freelancer left, or the v1 won’t scale. We read the code first and tell you whether it needs fixing or replacing. Sometimes the answer is neither.',
    },
]

export const GROUPS: { id: string; eyebrow: string; heading: string; intro: string; questions: Question[] }[] = [
    {
        id: 'hiring',
        eyebrow: 'Hiring and vendor selection',
        heading: 'Who should build your SaaS product?',
        intro: 'Five questions founders ask before they sign anything. We sell one of these options, so check our reasoning.',
        questions: [
            {
                id: 'who-can-build',
                question: 'Who can build a SaaS product for me from scratch?',
                answer: 'A SaaS development agency, a senior freelancer or a technical co-founder can. Pick an agency if you need product, backend, billing and DevOps at once and have no CTO yet. Nexona Labs builds SaaS from scratch and hands over the code. Valyrian Voice and Mailnitrix are live examples you can open today.',
            },
            {
                id: 'best-companies-india',
                question: 'What are the best SaaS development companies for startups in India?',
                answer: 'No neutral ranking exists. Most “top 10” lists are written by a company on the list, and ours would be too. Shortlist agencies with a live SaaS product you can actually use, verified reviews on Clutch and an engineer on your first call. Nexona Labs in Mumbai fits founders who want their code handed over.',
            },
            {
                id: 'choose-agency',
                question: 'How do I choose a SaaS development agency?',
                answer: 'Use a product they shipped, then question them. Ask who wrote it, who owns the code, how tenant data is isolated and what happens when a payment fails. A vague answer on isolation tells you more than any portfolio. Then ask to speak with one founder, alone, without the agency on the call.',
            },
            {
                id: 'agency-vs-inhouse-vs-freelancers',
                question: 'SaaS development agency vs in-house team vs freelancers: which is better?',
                answer: 'Use an agency to get a first version out without hiring. Hire in-house once you have revenue and a product that changes weekly. Use freelancers for one defined piece, or if one senior person can carry it. Most founders should move from agency to in-house eventually, not pick one option forever.',
            },
            {
                id: 'offshore-for-us-startups',
                question: 'Should a US startup hire an offshore SaaS development company in India?',
                answer: 'Usually yes for a first version, if someone on your side makes product calls daily. Indian agencies cost far less for similar scope. IST overlaps a US evening, so expect mostly async work and one live slot a day. Get IP assignment, repository access from day one and a named lead in writing.',
            },
        ],
    },
    {
        id: 'cost',
        eyebrow: 'Cost and timeline',
        heading: 'What does SaaS development cost, and how long does it take?',
        intro: 'Our starting price first, then published market figures, mostly from agencies with something to sell. We name each one, and we have converted their dollars to rupees.',
        questions: [
            {
                id: 'cost-2026',
                question: 'How much does it cost to build a SaaS product in 2026?',
                answer: 'Custom SaaS development from Nexona Labs starts from ₹73,000, and the final quote depends on scope. For comparison, Codercops puts a standard SaaS MVP at about ₹9.5 to ₹28.5 lakh with an Indian agency and ₹38 lakh to ₹1.14 crore with a US one. Compliance-heavy products can pass ₹1.7 crore.',
            },
            {
                id: 'mvp-timeline',
                question: 'How long does it take to build a SaaS MVP?',
                answer: 'Plan for about 8 to 12 weeks if the MVP is one core workflow, login, billing and an admin panel. Published agency estimates run from 6 to 14 weeks, and payments plus multi-tenancy can stretch that to 20. Someone promising a real SaaS in two weeks is probably selling you a template.',
            },
            {
                id: 'india-vs-us-cost',
                question: 'What does a SaaS MVP cost in India vs the US?',
                answer: 'A standard SaaS MVP costs about ₹9.5 to ₹28.5 lakh in India and ₹38 lakh to ₹1.14 crore in the US, according to Codercops, an Indian agency that admits its bias. Senior agency rates run about ₹4,750 to ₹7,100 an hour in India and ₹17,100 to ₹23,800 in the US.',
            },
            {
                id: 'fixed-vs-retainer',
                question: 'Fixed price vs retainer: which is better for SaaS development?',
                answer: 'Use a fixed price for a tightly scoped MVP and a retainer once real users start changing your priorities. A fixed price protects your budget and makes every change a negotiation. A retainer buys flexibility, but someone must watch the output. Most SaaS products should start fixed, then switch soon after launch.',
            },
        ],
    },
    {
        id: 'technical',
        eyebrow: 'Technical',
        heading: 'How do the hard parts of a SaaS actually work?',
        intro: 'Multi-tenancy, AI, PaaS, email and voice. The last two are the ones we can show you running.',
        questions: [
            {
                id: 'multi-tenant',
                question: 'How do you build a multi-tenant SaaS platform?',
                answer: 'Pick an isolation model first: pool, bridge or silo. Most startups should begin with pool, meaning one database with row-level security, and keep a path to silo for customers who demand it. Then add tenant-aware login, billing per tenant, and automated tests that deliberately try to read another tenant’s data.',
            },
            {
                id: 'add-ai-rag',
                question: 'How do you add AI or RAG features to an existing SaaS?',
                answer: 'Start with one feature and one tenant’s data, not a rewrite. Index that content in a vector store, filter every retrieval by tenant, and call the model through your own service layer so you can swap it later. Log every answer, meter usage per tenant, and let users flag wrong ones.',
            },
            {
                id: 'what-is-paas',
                question: 'What is PaaS, and when should a startup build one?',
                answer: 'PaaS, or platform as a service, gives developers a platform to build and run software on, instead of a finished app. Build one only if developers are your customer and you have already run the workload yourself. For most startups the answer is not yet. Ship the SaaS, then expose an API.',
            },
            {
                id: 'saas-vs-paas',
                question: 'SaaS vs PaaS: which should I build?',
                answer: 'Build SaaS if your customer is a business user who wants a job done. Build PaaS if your customer is a developer who wants to build on top of you. SaaS has the shorter road to first revenue. PaaS needs docs, SDKs, quotas and a reliability bar that first-time teams underestimate.',
            },
            {
                id: 'ai-chatbot-rag',
                question: 'How do you build an AI chatbot SaaS with RAG pipelines?',
                answer: 'Build four parts: document ingestion per customer, tenant-filtered retrieval, a model layer you can swap, and a widget or API customers embed. Then add usage metering, because AI costs scale with every query. Our RAG chatbot project runs retrieval and generation on a single GPU or CPU setup, at roughly 400 to 700 ms response latency.',
            },
            {
                id: 'email-saas',
                question: 'What goes into email infrastructure SaaS development?',
                answer: 'Mailbox connections, warm-up, send pacing, per-mailbox limits, error-code handling, reply detection and unsubscribes, plus analytics that filter out bot opens. We built this for Mailnitrix, a cold email SaaS that sends through customers’ own Gmail and Outlook mailboxes. Running your own IP pools and mail servers is a different, harder project.',
            },
            {
                id: 'voice-ai-saas',
                question: 'What goes into voice AI SaaS development?',
                answer: 'Telephony, speech recognition, a language model and voice synthesis, fast enough to hold a conversation, plus the dialer, transfers, recordings and billing around them. We built Valyrian Voice this way: AI dial sessions at 100 lines, inbound routing and human handoff. Its site reports 3,000 to 4,000 calls an hour on one dedicated GPU.',
            },
        ],
    },
]

export const FAQ_ITEMS: FaqItem[] = GROUPS.flatMap((g) =>
    g.questions.map(({ question, answer }) => ({ question, answer })),
)

/** Questions to put to any SaaS agency, ours included. */
export const AGENCY_CHECKS = [
    'Can I use something you shipped, today, with a real login?',
    'Who writes my code: the person on this call, or someone I’ll never meet?',
    'Do I get the repository from day one, or at final payment?',
    'How is one customer’s data kept away from another’s? Show me.',
    'A renewal payment fails at 2 am. What happens to that customer’s account?',
    'Who do I call in month seven, when the agency has moved on to a bigger client?',
]

export const AGENCY_TABLE = {
    caption: 'SaaS development agency compared with an in-house team and freelancers',
    columns: ['Agency', 'In-house team', 'Freelancers'],
    rows: [
        {
            point: 'Best when',
            values: [
                'You need a first version and have no team.',
                'You have revenue and the product changes weekly.',
                'The job is one defined piece, or one strong person can carry it.',
            ],
        },
        {
            point: 'Time to start',
            values: ['Days to weeks.', 'Months. Hiring alone eats a quarter.', 'Days.'],
        },
        {
            point: 'Who covers backend, DevOps and design',
            values: ['The agency.', 'Whoever you managed to hire.', 'Only what that person knows.'],
        },
        {
            point: 'Main risk',
            values: [
                'You lose priority to a bigger client, and context walks out at handover. Demand docs and repo access.',
                'Salaries burning before anyone is sure the product should exist.',
                'One person disappears during Diwali, with the deploy keys.',
            ],
        },
    ],
}

/** Scope tiers, from one vendor. Their figures, not ours. */
export const SCOPE_ROWS = [
    { scope: 'Single-purpose MVP: basic auth, one core workflow, no compliance', cost: '₹43–₹71 lakh', time: '10–14 weeks' },
    { scope: 'MVP with payments and multi-tenant architecture', cost: '₹76 lakh–₹1.43 crore', time: '14–20 weeks' },
    { scope: 'Production SaaS with HIPAA, SOC 2 or KYC/AML', cost: '₹1.71–₹3.33 crore+', time: '6–9 months' },
]

export const SCOPE_SOURCE = {
    name: 'Phenomenon Studio, via eCommerce Fastlane, May 2026',
    href: 'https://ecommercefastlane.com/saas-development-costs-budgets-timelines-answers/',
}

export const REGION_ROWS = [
    { region: 'India', mvp: '₹9.5–₹28.5 lakh', time: '6–10 weeks', rate: '₹4,750–₹7,100' },
    { region: 'Eastern Europe', mvp: '₹14–₹43 lakh', time: '8–12 weeks', rate: '₹7,600–₹11,400' },
    { region: 'United States', mvp: '₹38 lakh–₹1.14 crore', time: '8–12 weeks', rate: '₹17,100–₹23,800' },
]

export const REGION_SOURCE = {
    name: 'Codercops, January 2026',
    href: 'https://blog.codercops.com/blog/mvp-development-cost-india-vs-us-vs-eastern-europe-2026',
}

export const AFTER_LAUNCH_SOURCE = {
    name: 'Kalyankari Softnet, May 2026',
    href: 'https://ks-platform.pages.dev/blog/cost-breakdown-of-building-a-saas-product-in-india-vs-usa-2026',
}

/** What moves the quote up from the starting price. No figures. */
export const COST_DRIVERS = [
    {
        title: 'Number of core workflows',
        body: 'One workflow is an MVP. Three workflows with different user types is a product, and the quote should say so.',
    },
    {
        title: 'Tenancy and billing',
        body: 'Flat plans are simple. Usage metering, seats, overage and agency workspaces each add real work.',
    },
    {
        title: 'AI and real-time',
        body: 'A chat box on a hosted model is easy. Voice under a second, on your own GPUs, is not the same job.',
    },
    {
        title: 'Compliance',
        body: 'SOC 2 or HIPAA planned from the start costs far less than retrofitting it after your first enterprise deal asks.',
    },
]

/** AWS's three models. "Start here when" is our opinion, labelled as such. */
export const TENANCY_ROWS = [
    {
        model: 'Pool',
        how: 'Tenants share the stack, the database and the tables. Row-level security keeps them apart.',
        tradeoff: 'Costs the least, offers the least isolation.',
        when: 'Most new SaaS products. This is where we would start.',
    },
    {
        model: 'Bridge',
        how: 'Tenants share the stack and the database instance, each with a dedicated schema.',
        tradeoff: 'A hybrid of pool and silo. Some compliance alignment.',
        when: 'A few customers ask for separation, most don’t care.',
    },
    {
        model: 'Silo',
        how: 'Each tenant gets a dedicated stack and database instance. Nothing crosses tenant boundaries.',
        tradeoff: 'Strongest isolation, highest cost and complexity.',
        when: 'Regulated or enterprise customers who will pay for it.',
    },
]

export const TENANCY_SOURCE = {
    name: 'AWS Guidance for Multi-Tenant Architectures',
    href: 'https://docs.aws.amazon.com/solutions/multi-tenant-architectures-on-aws/',
}

export const RLS_SOURCE = {
    name: 'AWS Prescriptive Guidance on row-level security',
    href: 'https://docs.aws.amazon.com/prescriptive-guidance/latest/saas-multitenant-managed-postgresql/rls.html',
}

export const RLS_SNIPPET = `ALTER TABLE tenant_user ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_user_isolation_policy ON tenant_user
USING (tenant_id = current_setting('app.current_tenant')::UUID);`

export const SAAS_PAAS_TABLE = {
    caption: 'SaaS compared with PaaS for a startup deciding what to build',
    columns: ['SaaS', 'PaaS'],
    rows: [
        { point: 'Your customer', values: ['A business user with a job to get done.', 'A developer building their own product on you.'] },
        { point: 'What you ship', values: ['A finished application.', 'APIs, SDKs, a console and documentation.'] },
        { point: 'Road to first revenue', values: ['Shorter. Someone can pay in week one of launch.', 'Longer. Developers evaluate slowly and integrate slower.'] },
        { point: 'Hardest part', values: ['Finding the workflow people will pay for.', 'Your outage is now every customer’s outage.'] },
        { point: 'Examples', values: ['Valyrian Voice, Mailnitrix.', 'Heroku, Vercel.'] },
    ],
}

export const GARTNER_SOURCE = {
    name: 'Gartner, June 2026, via IT Voice',
    href: 'https://www.itvoice.in/gartner-forecasts-end-user-public-cloud-spending-in-india-to-surpass-17-billion-in-2026',
}
