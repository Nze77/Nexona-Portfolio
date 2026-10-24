// Shared content for the Mumbai landing page.
// Imported by both page.tsx (visible UI) and layout.tsx (JSON-LD schema)
// so the FAQ copy and the FAQPage structured data never drift apart.
//
// Targets both "software agency in Mumbai" and "software development company
// in Mumbai".
//
// PRICING: starting prices approved by the user on 2026-10-24 for this page
// and the mobile app page only. Always framed as "starts from" — never a flat
// price or a range. Change figures here, nowhere else.

export interface FaqItem {
    question: string
    answer: string
}

export interface PriceItem {
    label: string
    price: string
    note: string
}

export const STARTING_PRICES: PriceItem[] = [
    { label: 'AI & process automation', price: '₹4,000', note: 'Start with one workflow — a reminder, a report, an approval that stops being chased on WhatsApp' },
    { label: 'CRM', price: '₹13,000', note: 'Pipeline, follow-ups and quotation history your sales team actually updates' },
    { label: 'Custom software', price: '₹25,000', note: 'Built around the workflow that is eating your week, not a template' },
    { label: 'ERP', price: '₹58,000', note: 'Orders, inventory, purchase and reporting in one place' }
]

// Mirrors APP_PRICE_TIERS on the mobile app page — keep the two in step.
export const APP_STARTING_PRICES: PriceItem[] = [
    { label: 'MVP app', price: '₹25,000', note: 'One type of user, one core flow, one way to pay' },
    { label: 'Mid-size app', price: '₹1.53 lakh', note: 'Two types of user, or several outside systems to talk to' },
    { label: 'Complex app', price: '₹4 lakh', note: 'On-demand and multi-app platforms, offline sync, hardware, heavy integrations' }
]

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'Software development company or software agency — what is the difference?',
        answer:
            'In Mumbai, mostly the name. Both design, build and maintain custom software. The useful difference is elsewhere: does the firm write the code itself, or sell the project and pass it to a team you never meet? We are a software development company that works the way a good agency does — one small team, from the scoping call to the fix you need in month four.',
    },
    {
        question: 'What does a software development company in Mumbai actually build?',
        answer:
            'Whatever the problem needs, which is usually less than people expect. For us that means custom ERPs and CRMs, web apps, mobile apps, internal tools, and AI automation that removes repeat work. All of it built around how your business already runs, not a template with your logo on it.',
    },
    {
        question: 'How much does custom software development cost in Mumbai?',
        answer:
            'Custom software starts from ₹25,000. ERP starts from ₹58,000, CRM from ₹13,000, a single AI automation from ₹4,000, and a mobile app from ₹25,000. Those are starting points for the smallest real version. What moves the number up: how many workflows the first phase covers, how many systems it has to talk to (Tally, a payment gateway, a courier API), whether AI is part of it, and how hard the deadline is. What does not move it: the number of people who use it. No per-user licence. We scope first, then you get the exact number in writing.',
    },
    {
        question: 'How long does a typical software project take?',
        answer:
            'A working link within the first two weeks. A first phase your team can use day to day in about six to eight. Larger systems — a full ERP, a platform with a mobile app on top — run longer, but they ship in phases, so you are never waiting four months to see anything real.',
    },
    {
        question: 'Who owns the source code?',
        answer:
            'You do. Code, database, designs, documentation. The repository sits in your company’s account from the first commit, not ours. If you move the work in-house or to another team later, nothing is held back — and on a React, Node and Postgres stack, any competent developer can pick it up.',
    },
    {
        question: 'Do you work with startups or only established companies?',
        answer:
            'Both. Most of our clients are growing SMEs, plus founders building a first version. A startup does not need a full platform. It needs the two or three workflows eating everyone’s day turned into software, and we scope in phases for exactly that reason.',
    },
    {
        question: 'We already use Tally and spreadsheets. Do we have to replace them?',
        answer:
            'No. Tally handles accounts well and we connect to it rather than fight it. The custom layer covers what Tally was never built for — operations, field teams, approvals, follow-ups, and whatever currently lives in a spreadsheet only one person is allowed to open.',
    },
    {
        question: 'What technologies does Nexona build with?',
        answer:
            'React and Next.js for web, React Native and Flutter for mobile, Node.js and FastAPI on the backend, PostgreSQL for data. Boring, well-supported tools, chosen on purpose. Your software should outlive our involvement, and the next engineer who opens the code should recognise everything in it.',
    },
    {
        question: 'What happens after launch?',
        answer:
            'The weeks after go-live are when software gets genuinely good, so they are part of the project — bug fixes, the changes real usage exposes, a second round of training. After that it is a monthly plan or on-call fixes, your choice, with a named engineer you can message on WhatsApp instead of a ticket queue.',
    },
    {
        question: 'Are you actually based in Mumbai?',
        answer:
            'Yes. Nexona is registered in Mumbai and works across the MMR — Thane and Navi Mumbai included. Scoping happens in person at your office if you want it. The build itself is remote, like most engineering teams in this city. Ask anyone you shortlist for the address on their GST registration. Thirty seconds, and it tells you a lot.',
    },
]
