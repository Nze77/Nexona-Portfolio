import type { BlogPost } from './types'

// COST GUIDE — served at the ROOT path /business-app-development-cost-in-india
// (see `path` below), not under /blogs. Written to be quoted by ChatGPT,
// Perplexity and Google AI Overviews: every H2 is the question as people ask
// it, answered in 40–60 words before any detail, with a table where possible.
//
// Primary keyword: business app development cost in India
// Secondary:       app development cost India, custom app development cost,
//                  enterprise app development cost, plus the long-tail H2s/FAQs.
//
// ─── PRICING RULES ──────────────────────────────────────────────────────────
// • Rate approved by the user on 2026-11-01: ₹1,500–₹2,000 per hour. Every
//   rupee figure on this page is HOURS × RATE, computed below, so changing
//   RATE_LOW / RATE_HIGH re-prices the whole page. Bump `updated` when you do.
// • Ranges are allowed on THIS page only (user decision, 2026-11-01). The
//   landing pages keep their "starts from" rule.
// • Tier floors are the approved starting prices from the mobile app page
//   (MVP ₹25,000 · mid-size ₹1.53 lakh · complex ₹4 lakh). Keep them in step
//   with APP_PRICE_TIERS in mobile-app-development-company-in-mumbai/content.ts.
// • UI/UX market rates by seniority are ESTIMATES of the Indian market, not
//   Nexona's rate card. Sanity-check them before each update.
//
// ─── OFFERS (user-confirmed 2026-11-01) ────────────────────────────────────
// • Reviewing another agency's quote is FREE, whether or not they build with us.
// • Missed guarantee → fixed at no charge. User states it has never happened.
//
// ─── MEASURED NUMBERS ONLY ─────────────────────────────────────────────────
// The benchmarks come from the D2C client app on the mobile app landing page
// (React Native, name withheld under NDA): 120ms hot / 900ms cold launch,
// +57% order value, +187% lifetime value. No crash-free rate or sync time has
// been measured, so none is published.
// TODO(user): add the test device for the launch times, and a measured
// design-rework example, when available.

const RATE_LOW = 1500
const RATE_HIGH = 2000
const HOURS_PER_DAY = 8

/** ₹ in Indian notation: ₹37,500 below a lakh, ₹1.53 lakh above. */
function inr(n: number): string {
    if (n >= 100000) return `₹${Number((n / 100000).toFixed(2))} lakh`
    return `₹${Math.round(n).toLocaleString('en-IN')}`
}

/** Price range for an hours range: low hours at the low rate, high at the high. */
const cost = (lo: number, hi: number) => `${inr(lo * RATE_LOW)}–${inr(hi * RATE_HIGH)}`
const hours = (lo: number, hi: number) => `${lo}–${hi} h`
const designCost = (loDays: number, hiDays: number) => cost(loDays * HOURS_PER_DAY, hiDays * HOURS_PER_DAY)

/** Approved tier floors (see PRICING RULES). Upper bound = max hours × high rate. */
const APP_TYPES = [
    { type: 'Internal tool', what: 'Approvals, site inspections, attendance, stock counts. One or two user roles.', from: 25000, maxHours: 100, weeks: '3–8 weeks', designDays: [2, 5] },
    { type: 'Field-sales app', what: 'Order taking, beat plans, GPS check-in, offline order capture, catalogue.', from: 153000, maxHours: 220, weeks: '8–14 weeks', designDays: [5, 10] },
    { type: 'Customer or dealer portal', what: 'Orders, invoices, payment links, reorders, ticket status.', from: 153000, maxHours: 250, weeks: '10–16 weeks', designDays: [6, 12] },
    { type: 'ERP-connected app', what: 'Two-way sync with Tally, SAP Business One or a custom ERP, GST, offline, several roles.', from: 400000, maxHours: 600, weeks: '14–24 weeks', designDays: [8, 18] },
] as const

const typeRange = (t: (typeof APP_TYPES)[number]) => `${inr(t.from)}–${inr(t.maxHours * RATE_HIGH)}`

const FEATURES: [string, number, number][] = [
    ['Login (OTP or email, password reset)', 8, 14],
    ['User roles and permissions (up to 3 roles)', 16, 30],
    ['Dashboard (6–8 numbers, 2–3 charts)', 20, 40],
    ['Push notifications (3–5 triggers)', 8, 16],
    ['Reports with PDF / Excel export (a set of 5)', 16, 32],
    ['Offline mode with sync and conflict handling', 50, 110],
    ['ERP sync (one system, one direction)', 25, 60],
    ['GPS check-in and location trail', 12, 24],
    ['Photo capture and upload', 8, 16],
    ['Payments through Razorpay', 10, 20],
    ['Web admin panel (5–8 record types)', 30, 60],
]

const INTEGRATIONS: [string, number, number, string][] = [
    ['Tally Prime, read only', 25, 50, 'Ledgers, stock items, outstanding. A small sync agent runs on the Tally machine.'],
    ['Tally Prime, two-way', 50, 100, 'Sales orders and receipts pushed back as vouchers. Duplicate-voucher checks included.'],
    ['Zoho Books / Zoho Inventory', 20, 45, 'Documented API. The quickest of the lot.'],
    ['SAP Business One', 40, 90, 'Through the Service Layer API. Licensing is on your SAP partner, not us.'],
    ['Custom or legacy ERP, no API', 60, 150, 'Database-level or file-drop sync. The undocumented ones cost the most.'],
    ['GST e-invoice (IRN) and e-way bill', 30, 60, 'Through a GST Suvidha Provider. Their fee is separate.'],
    ['GSTIN lookup and validation', 4, 8, 'Stops a typo in a dealer’s GSTIN reaching an invoice.'],
]

const DATE_CHECKED = '1 November 2026'

export const POST: BlogPost = {
    slug: 'business-app-development-cost-in-india',
    path: '/business-app-development-cost-in-india',
    title: 'Business App Development Cost in India (2026)',
    metaTitle: 'Business App Development Cost in India (2026): Price & Timeline',
    description:
        'How much does a business app cost in India? See ₹ price by feature, UI/UX designer cost, timeline by phase and ongoing costs. Updated 2026.',
    excerpt: `A business app in India costs ${inr(25000)} to ${inr(600 * RATE_HIGH)} to build and takes 3 to 24 weeks. Field-sales apps and customer portals sit at ₹1.53–₹5 lakh. Below: price by feature, designer cost, timeline and running costs, from Nexona’s own rate card.`,
    category: 'App Development Cost',
    published: '2026-11-01',
    updated: '2026-11-01',
    readingMinutes: 11,
    keywords: [
        'business app development cost in India',
        'app development cost India',
        'business app development',
        'custom app development cost',
        'enterprise app development cost',
        'how much does it cost to build a business app in India',
        'UI UX designer cost for mobile app India',
        'ERP mobile app development cost',
        'Tally integration app development cost',
        'app for manufacturing company cost India',
        'offline mobile app development cost',
        'internal company app development cost India',
        'how long does it take to build a business app',
        'Flutter vs native app development cost India',
        'custom business app vs off-the-shelf software cost',
        'mobile app maintenance cost per month India',
    ],
    relatedServices: [
        { label: 'Mobile App Development Mumbai', href: '/mobile-app-development-company-in-mumbai' },
        { label: 'Business Management Software', href: '/business-management-software-development' },
        { label: 'Manufacturing ERP', href: '/manufacturing-erp' },
        { label: 'Distributor Management System', href: '/distributor-management-system' },
        { label: 'Software Development Company Mumbai', href: '/software-development-agency-mumbai' },
        { label: 'Fractional CTO', href: '/fractional-cto-as-a-service' },
    ],
    body: [
        {
            type: 'callout',
            label: 'Short answer',
            text: `A business app in India typically costs **${inr(25000)}–${inr(600 * RATE_HIGH)}** and takes **3–24 weeks** to build, depending on features, integrations and platforms. A simple internal tool starts around ${inr(25000)}; an app connected to ERP, Tally or GST systems usually costs ${typeRange(APP_TYPES[3])}. UI/UX design is priced separately here (${designCost(2, 18)}) because it changes how much rework follows. This guide breaks down cost by feature, designer cost, timeline by phase and ongoing expenses, using Nexona’s published rate of ₹1,500–₹2,000 an hour. Prices reflect November 2026 and are updated whenever our rates change.`,
        },

        // ── 1 ────────────────────────────────────────────────────────────
        { type: 'h2', text: 'How much does a business app cost in India?' },
        {
            type: 'p',
            text: `Between ${inr(25000)} and ${inr(600 * RATE_HIGH)} for the build, at Nexona’s rate of ₹1,500–₹2,000 an hour. Where you land depends on three things: how many kinds of user the app has, how many outside systems it talks to, and whether it has to work without signal. Field-sales apps and customer portals, the middle of the market, sit between ₹1.53 lakh and ₹5 lakh.`,
        },
        {
            type: 'table',
            caption: `Build cost by app type · Nexona rate card · ${DATE_CHECKED}`,
            columns: ['App type', 'Typical scope', 'Build price', 'Timeline'],
            rows: APP_TYPES.map((t) => [t.type, t.what, typeRange(t), t.weeks]),
        },
        {
            type: 'p',
            text: 'The low end is real. It is also small — one flow, one role, built on components we have already written. The high end is a field team of 200 working offline in godowns, syncing two ways with Tally every few minutes. Same word, “app”. Very different jobs.',
        },
        {
            type: 'p',
            text: 'Not sure you need an app at all? Sometimes the job is a reminder, an approval, a report that builds itself — and a single [AI automation](/ai-automation-agency) from ₹4,000 does it. We will say so on the call.',
        },
        {
            type: 'cta',
            heading: 'Which row is your app?',
            text: 'Send us a feature list, or just describe what your team does on WhatsApp and Excel today. We reply with hours per feature and a price range, before you commit to anything.',
            buttonLabel: 'Get my app estimate',
        },

        // ── 2 ────────────────────────────────────────────────────────────
        { type: 'h2', text: 'What does each feature cost?' },
        {
            type: 'p',
            text: 'Each feature is hours multiplied by rate. Login is 8–14 hours. Offline mode is 50–110. That gap is why two apps with the same number of screens can be quoted ₹1 lakh apart. The table below is what we put in our own estimates, before project management and QA, which add 15–20%.',
        },
        {
            type: 'table',
            caption: `Price by feature · hours × ₹${RATE_LOW.toLocaleString('en-IN')}–₹${RATE_HIGH.toLocaleString('en-IN')}`,
            columns: ['Feature', 'Hours', 'Price'],
            rows: FEATURES.map(([f, lo, hi]) => [f, hours(lo, hi), cost(lo, hi)]),
        },
        {
            type: 'p',
            text: 'Two lines deserve a warning. Offline mode is not a toggle — it is a second copy of your data on every phone, and rules for what happens when two people edit the same order in a basement with no signal. And the dashboard is cheap only if you already know which six numbers you want. Most owners know four. The other two take a meeting.',
        },

        // ── 3 ────────────────────────────────────────────────────────────
        { type: 'h2', text: 'How much does a UI/UX designer cost for an app in India?' },
        {
            type: 'p',
            text: `A UI/UX designer in India charges roughly ₹400–₹3,500 an hour depending on seniority. A typical business app needs 2–18 design days, so design costs ${designCost(2, 18)} at Nexona’s rate. Internal tools sit at the bottom of that range because they can use a ready component library. Customer-facing apps cannot.`,
        },
        {
            type: 'table',
            caption: 'UI/UX designer rates in India · market estimate, November 2026',
            columns: ['Seniority', 'Experience', 'Hourly rate', 'Day rate (8 h)'],
            rows: [
                ['Junior', '0–2 years', '₹400–₹900', '₹3,200–₹7,200'],
                ['Mid-level', '3–5 years', '₹900–₹1,800', '₹7,200–₹14,400'],
                ['Senior / lead', '6+ years', '₹1,800–₹3,500', '₹14,400–₹28,000'],
                ['Studio (design + dev)', 'Blended team', '₹1,500–₹4,000', '₹12,000–₹32,000'],
            ],
        },
        {
            type: 'table',
            caption: 'Design days by app type · Nexona',
            columns: ['App type', 'Design days', 'Design price'],
            rows: APP_TYPES.map((t) => [t.type, `${t.designDays[0]}–${t.designDays[1]} days`, designCost(t.designDays[0], t.designDays[1])]),
        },
        {
            type: 'p',
            text: 'Skip design and you pay for it later, in build hours. Changing checkout in a clickable prototype is an edit to one screen. Changing it in week nine touches the screen, the API behind it, the tests and whatever else assumed the old flow. That is why we put a tappable prototype on your phone by week four — so you change your mind while it is cheap.',
        },

        // ── 4 ────────────────────────────────────────────────────────────
        { type: 'h2', text: 'How long does it take to build a business app?' },
        {
            type: 'p',
            text: '3 to 24 weeks from first call to the Play Store. An internal tool is 3–8 weeks; an ERP-connected app is 14–24. The build is rarely the slow part. Deciding what not to build is — that, and the Apple review nobody puts in the plan.',
        },
        {
            type: 'table',
            caption: 'Timeline by phase',
            columns: ['Phase', 'Weeks', 'What you get', 'What we need from you'],
            rows: [
                ['Discovery', '1–2', 'Written scope, screen list, hours per feature, the price in writing', 'An hour with the people who will actually use the app'],
                ['Design', '1–3', 'A clickable prototype on your own phone', 'Feedback within two days on each round'],
                ['Build', '2–14', 'An installable build at the end of every two-week sprint', 'One person who can answer questions the same day'],
                ['Testing', 'Alongside, +1–2', 'Tested on the budget Android your team actually carries', 'Two or three staff trying to break it'],
                ['Launch', '~1', 'Store listing, privacy forms, submission, the first rejection handled', 'Play and Apple developer accounts in your company’s name'],
            ],
        },

        // ── 5 ────────────────────────────────────────────────────────────
        { type: 'h2', text: 'What makes a business app cost more?' },
        {
            type: 'p',
            text: 'Five things move the price more than screen count: outside systems to integrate, offline use, the number of user roles, how many platforms, and security requirements. The number of people who download the app does not move it. There is no per-user licence on a custom build.',
        },
        {
            type: 'ul',
            items: [
                '**Integrations.** Razorpay takes a couple of days. Your ERP takes one to two weeks. An old system with no API takes longest, and nobody knows how long until someone opens it up.',
                '**Offline mode.** 50–110 hours on its own. Worth every hour for field teams. Wasted on an office app.',
                '**User roles.** A sales rep, a manager and an admin is three views of the same data and three sets of rules. Add a dealer or a delivery partner and it is closer to a second app.',
                '**Platforms.** Flutter or React Native ships Android and iOS together. Two native apps is close to two projects — see the Flutter section below.',
                '**Security.** Audit logs, single sign-on, data kept in India, a third-party VAPT before go-live. Each is a line item. Banks and pharma usually need all of them.',
                '**The deadline.** A launch pinned to a trade show means more people working in parallel. Possible. Rarely cheaper.',
            ],
        },

        // ── 6 ────────────────────────────────────────────────────────────
        { type: 'h2', text: 'How much does it cost to connect an app to ERP, Tally or GST?' },
        {
            type: 'p',
            text: `Between ${cost(4, 8).split('–')[0]} for a GSTIN check and ${inr(150 * RATE_HIGH)} for a legacy ERP with no API. A one-way Tally read is ${cost(25, 50)}; two-way Tally, where orders become vouchers, is ${cost(50, 100)}. Most competitors quote this as “depends”. Here are our hours.`,
        },
        {
            type: 'table',
            caption: 'Integration cost by type · Nexona',
            columns: ['Integration', 'Hours', 'Price', 'Notes'],
            rows: INTEGRATIONS.map(([name, lo, hi, note]) => [name, hours(lo, hi), cost(lo, hi), note]),
        },
        {
            type: 'p',
            text: 'Tally is the one that surprises people. It runs on a desktop in your accounts room, not in the cloud, so something has to sit on that machine and talk to the app — and that machine has to be on. If someone switches the accounts PC off at 7 every evening, the sync stops at 7 every evening. Plan for it. For factories, the integration usually sits inside a wider [manufacturing ERP](/manufacturing-erp) rather than a standalone app, and the [workflow connector](/projects/workflow-connector) we built is the same pattern.',
        },
        {
            type: 'cta',
            heading: 'Running Tally, SAP or a custom ERP?',
            text: 'Tell us which version and how your team uses it today. We will tell you whether a one-way read is enough or you need two-way sync — the difference is often half the integration budget.',
            buttonLabel: 'Ask about my integration',
        },

        // ── 7 ────────────────────────────────────────────────────────────
        { type: 'h2', text: 'What are the ongoing costs of a business app?' },
        {
            type: 'p',
            text: `Expect roughly ₹8,500–₹48,000 a month all in: hosting at ₹1,000–₹8,000, a maintenance retainer at ${cost(5, 20)} for 5–20 hours of work, plus app-store and API fees. Apple charges US$99 a year; Google Play is a one-time US$25. Prices below were checked on the providers’ own pages on ${DATE_CHECKED}.`,
        },
        {
            type: 'table',
            caption: `Running costs · provider prices checked ${DATE_CHECKED}`,
            columns: ['Item', 'Typical cost', 'Source'],
            rows: [
                ['Hosting (server, database, backups)', '₹1,000–₹8,000 / month for most business apps', '[AWS pricing](https://aws.amazon.com/ec2/pricing/) · [DigitalOcean pricing](https://www.digitalocean.com/pricing)'],
                ['Maintenance retainer', `${cost(5, 20)} / month (5–20 hours)`, 'Nexona rate card'],
                ['Apple Developer Program', 'US$99 / year', '[Apple](https://developer.apple.com/support/enrollment/)'],
                ['Google Play developer account', 'US$25, one time', '[Google Play Console Help](https://support.google.com/googleplay/android-developer/answer/6112435)'],
                ['Payments (Razorpay)', '2% per transaction + 18% GST on the fee; no setup fee', '[Razorpay pricing](https://razorpay.com/pricing/)'],
                ['Push notifications (Firebase Cloud Messaging)', 'No charge', '[Firebase pricing](https://firebase.google.com/pricing)'],
                ['Maps and location', 'Free monthly allowance, then per request', '[Google Maps Platform pricing](https://mapsplatform.google.com/pricing/)'],
                ['SMS OTP', 'Per message, varies by provider and volume', '[MSG91 pricing](https://msg91.com/in/pricing)'],
            ],
        },
        {
            type: 'p',
            text: 'One cost arrives every year whether you plan for it or not. Apple ships a new iOS in September, Android follows, and something small always needs adjusting. Budget a few hours for it.',
        },

        // ── 8 ────────────────────────────────────────────────────────────
        { type: 'h2', text: 'Custom app or off-the-shelf software: which is cheaper?' },
        {
            type: 'p',
            text: `A custom app, once rented software has to cover a real team. Rented software charges per user every month, forever; a custom build does not. At 40 users the custom app is cheaper by month 21 and ${inr(800 * 40 * 60 - (350000 + 15000 * 60))} cheaper by year five — and the gap widens with every user you add.`,
        },
        {
            type: 'table',
            caption: 'Cumulative cost · off-the-shelf at ₹800 per user per month vs custom build',
            columns: ['Scenario', 'Year 1', 'Year 3', 'Year 5'],
            rows: [
                ['40 users · off-the-shelf', inr(800 * 40 * 12), inr(800 * 40 * 36), inr(800 * 40 * 60)],
                ['40 users · custom (₹3.5 lakh build + ₹15,000/month to run)', inr(350000 + 15000 * 12), inr(350000 + 15000 * 36), inr(350000 + 15000 * 60)],
                ['80 users · off-the-shelf', inr(800 * 80 * 12), inr(800 * 80 * 36), inr(800 * 80 * 60)],
                ['80 users · custom (same build, ₹18,000/month to run)', inr(350000 + 18000 * 12), inr(350000 + 18000 * 36), inr(350000 + 18000 * 60)],
            ],
        },
        {
            type: 'p',
            text: 'The table assumes the vendor never raises its price, which is generous. It also ignores what each one does. A custom app runs your scheme rules and your approval chain exactly; the rented one makes you work around it, usually in Excel. For distributor software specifically — portal, CRM and loyalty — the per-distributor maths is in [distributor management system cost in India](/distributor-management-system-cost-in-india).',
        },

        // ── 9 ────────────────────────────────────────────────────────────
        { type: 'h2', text: 'Flutter vs native: how much does it change the price?' },
        {
            type: 'p',
            text: 'For Android and iOS together, native costs about 45–50% more than Flutter or React Native. The backend and admin panel are shared either way, so it is not double — but the app itself is built twice. For Android only, the difference is close to nothing.',
        },
        {
            type: 'table',
            caption: 'One field-sales scope, three ways · Nexona scoping estimate, not a measured build',
            columns: ['Approach', 'App hours', 'Backend + admin hours', 'Total', 'Price'],
            rows: [
                ['Flutter or React Native (Android + iOS)', '160', '90', '250', cost(250, 250)],
                ['Native Android only (Kotlin)', '150', '90', '240', cost(240, 240)],
                ['Native Android + iOS (Kotlin + Swift)', '280', '90', '370', cost(370, 370)],
            ],
        },
        {
            type: 'p',
            text: 'Our default is cross-platform. Native earns its cost when the app lives on hardware — Bluetooth printers, barcode guns, location tracking in the background all day. More detail on the choice on our [mobile app development](/mobile-app-development-company-in-mumbai) page.',
        },

        // ── 10 ───────────────────────────────────────────────────────────
        { type: 'h2', text: 'How does Nexona price an app, and what do we guarantee?' },
        {
            type: 'p',
            text: 'Price = hours for each person on the team × that person’s rate, summed. Developers and designers are ₹1,500 an hour; senior engineers and architects ₹2,000. Your quote lists the hours per feature, so you can cut a line and see the price drop. If we miss a guarantee below, we fix it at no charge. Worked example: 180 hours × ₹1,500 + 40 hours × ₹2,000 = ₹3.5 lakh.',
        },
        {
            type: 'table',
            caption: 'What we guarantee, and how you can check it',
            columns: ['Guarantee', 'Exactly what it means', 'How you check it'],
            rows: [
                ['Price in writing', 'The quoted price covers the agreed scope. A change of scope is quoted before any work on it starts.', 'Every invoice maps to a line in the quote.'],
                ['Code in your name', 'The repository sits in your company’s GitHub or GitLab from day one. We are collaborators.', 'You hold admin rights and can remove us any day.'],
                ['Store accounts in your name', 'Play Console and App Store Connect are registered to your company, not ours.', 'The account holder field shows your company name.'],
                ['A build every two weeks', 'An installable build on your phone at the end of each sprint — Play internal testing on Android, TestFlight on iOS.', 'You install it. No build means you know the same day.'],
                ['Crash reporting before launch', 'Firebase Crashlytics is live in the release build before the app reaches a store.', 'You get access to the dashboard.'],
                ['Eight weeks of fixes', 'Bugs against the agreed scope are fixed at no charge for eight weeks after go-live.', 'New features are not bugs; they are quoted separately.'],
                ['No per-user licence', 'Add 10 users or 1,000. The build price does not change.', 'Hosting is the only cost that grows with use, paid at cost.'],
            ],
        },
        {
            type: 'p',
            text: '**If we miss one, we fix it at no charge.** A late build, a repository not in your name, a bug inside the eight weeks — put right on our time, not yours. It has not happened yet.',
        },
        {
            type: 'cta',
            heading: 'Already have a quote from another agency?',
            text: 'Send it over. We will mark which lines look padded and which are missing, and what the same scope costs at our rate. Free, whether or not you build with us.',
            buttonLabel: 'Review my quote',
        },

        // ── 11 ───────────────────────────────────────────────────────────
        { type: 'h2', text: 'What performance should a business app deliver?' },
        {
            type: 'p',
            text: 'Under a second to open from cold. The app below launches in 900 ms cold and 120 ms hot. These are numbers from a shipped client app — a D2C clothing brand, name withheld under NDA — not an internal reference build. Sync time and crash-free rate are not here because we have not measured them on a build we can show.',
        },
        {
            type: 'table',
            caption: 'Measured on a shipped client app (React Native, FastAPI, PostgreSQL, Redis)',
            columns: ['Metric', 'Result', 'Notes'],
            rows: [
                ['Cold launch', '900 ms', 'Tap on the icon to a usable screen, app not in memory'],
                ['Hot launch', '120 ms', 'App already in memory'],
                ['Average order value, app vs website', '+57%', 'Same brand, same catalogue'],
                ['Lifetime value per app user vs website', '+187%', 'Same brand, same catalogue'],
            ],
        },
        {
            type: 'p',
            text: 'Our read on that last row: the app didn’t create new buyers. It gave the loyal ones a faster way back. The full case study is on our [mobile app development company in Mumbai](/mobile-app-development-company-in-mumbai) page.',
        },
        {
            type: 'p',
            text: 'Getting quotes from three agencies and they don’t line up? Send them over and we will review them free. You get which lines are padded and which are missing — the same review our [fractional CTO](/fractional-cto-as-a-service) clients get. For apps that run the whole business rather than one team, see [business management software](/business-management-software-development); for dealer and distributor apps, the [distributor management system](/distributor-management-system); and for everything else we build, [software development in Mumbai](/software-development-agency-mumbai).',
        },
    ],
    faq: [
        {
            question: 'How much does it cost to build a business app in India?',
            answer: `${inr(25000)} to ${inr(600 * RATE_HIGH)} for the build at Nexona’s ₹1,500–₹2,000 hourly rate. An internal tool is ${typeRange(APP_TYPES[0])}, a field-sales app ${typeRange(APP_TYPES[1])}, and an app connected to Tally or an ERP ${typeRange(APP_TYPES[3])}. Design, hosting and maintenance are extra and listed separately on this page.`,
        },
        {
            question: 'How much does a UI/UX designer cost for a mobile app in India?',
            answer: `Roughly ₹400 an hour for a junior designer and up to ₹3,500 for a senior one. A business app needs 2–18 design days, so expect ${designCost(2, 18)} at Nexona’s rate. Internal tools sit at the low end because they can use a ready component library. Customer-facing apps need more.`,
        },
        {
            question: 'How long does it take to build a business app?',
            answer: '3 to 24 weeks. An internal tool takes 3–8 weeks, a field-sales or customer app 8–16, and an app with two-way ERP or Tally sync 14–24. That covers discovery, design, build, testing and store launch. Apple’s review alone can take a day to a week, so plan for one rejection.',
        },
        {
            question: 'What does mobile app maintenance cost per month in India?',
            answer: `${cost(5, 20)} a month for a retainer of 5–20 hours at Nexona, plus hosting at about ₹1,000–₹8,000. Apple’s developer fee is US$99 a year. The first eight weeks of bug fixes after go-live are included in the build price.`,
        },
        {
            question: 'How much does Tally integration cost for a mobile app?',
            answer: `A read-only Tally Prime sync costs ${cost(25, 50)} (25–50 hours). Two-way sync, where app orders and receipts become Tally vouchers, costs ${cost(50, 100)} (50–100 hours). A small agent runs on the computer where Tally is installed, so that machine needs to stay on.`,
        },
        {
            question: 'How much does an app for a manufacturing company cost in India?',
            answer: `Most factory apps are ERP-connected, so ${typeRange(APP_TYPES[3])} and 14–24 weeks: production entry on the floor, stock movement, quality checks and dispatch, synced with Tally or the ERP. A single-purpose tool, such as a shift checklist, costs ${typeRange(APP_TYPES[0])}. Nexona’s manufacturing ERP modules start from ₹58,000.`,
        },
        {
            question: 'How much extra does offline mode cost in a mobile app?',
            answer: `Offline mode adds 50–110 hours, or ${cost(50, 110)}. That covers a local database on each phone, a sync queue, and rules for when two people edit the same record without signal. It is worth it for field and factory teams. For office staff on Wi-Fi, skip it.`,
        },
        {
            question: 'What happens if Nexona misses a deadline or a guarantee?',
            answer: 'We fix it at no charge. That covers a sprint build that does not arrive, code or store accounts not in your name, and bugs against the agreed scope in the eight weeks after launch. It has not happened yet. Other agencies’ quotes we review free, whether or not you build with us.',
        },
        {
            question: 'Is Flutter cheaper than native app development in India?',
            answer: `Yes, when you need both Android and iOS. On a typical field-sales scope, Flutter is about 250 hours (${cost(250, 250)}) and two native apps about 370 hours (${cost(370, 370)}). For Android only, the cost is nearly the same. Native is worth it for heavy hardware use.`,
        },
    ],
    cta: {
        heading: 'Want hours per feature for your app?',
        text: 'Send us a feature list, a screenshot of your current Excel, or another agency’s quote (we review quotes free). On a free scoping call we turn it into hours per feature and a price in writing — and tell you which features to leave for version two.',
    },
}
