// Shared content for the customer retention management landing page.
// Imported by page.tsx (visible UI) and layout.tsx (FAQPage JSON-LD) so the
// copy and the structured data never drift apart.

export interface FaqItem {
    question: string
    answer: string
}

export interface TitledItem {
    title: string
    body: string
}

// Why retention matters — the case you make to leadership.
export const WHY_IT_MATTERS: TitledItem[] = [
    {
        title: 'The real cost of losing a customer',
        body: 'It is not just the subscription fee. It is the upsell they would have taken in month 9. The referral they gave to 2 people at a conference. The case study you were going to build around them. One churned customer is probably worth 4–6× what their invoice said — make that visible to leadership and the conversation about retention budget changes pretty fast.',
    },
    {
        title: 'Retention drives growth faster than acquisition',
        body: 'Bain & Company put a number on it — a 5% improvement in retention increases profits by 25–95%. Wide range, yes, but even the low end beats most acquisition channels. Retained customers buy more. They complain about things that actually matter instead of churning silently. They tell people. None of that needs an ad budget.',
    },
    {
        title: 'Loyalty as a competitive differentiator',
        body: 'In markets where the product difference is thin — and most markets, honestly, it is thinner than anyone wants to admit — the post-sale experience is the separation. How you handle a bad month. Whether someone picks up the phone. Retention software gives you the data to keep that personal across 400 accounts.',
    },
]

// What to look for when evaluating retention software.
export const CAPABILITIES: TitledItem[] = [
    {
        title: 'Unified customer health scoring',
        body: 'One number per account that says whether that customer is fine or not fine. Not 11 tabs a CSM has to cross-reference — one score, updated automatically, with the logic visible so people actually trust it. That last part matters more than most vendors will tell you. A health score nobody believes just gets ignored.',
    },
    {
        title: '360° customer CRM profile',
        body: 'Everything about a customer in one place. Every interaction, renewal, support ticket, and the note a sales rep left in 2022 that turned out to matter 18 months later. Context is the difference between a generic check-in and a conversation that lands.',
    },
    {
        title: 'Automated churn risk alerts',
        body: 'When a score drops, someone needs to know immediately — not at the next weekly meeting. The software sends the alert, assigns the task, maybe triggers an email sequence, without waiting for a human to notice. Humans are busy. They miss things. That is not a criticism, it is just true.',
    },
    {
        title: 'Re-engagement workflows',
        body: 'Dormant customers are not gone customers. Someone who has not logged in for 47 days is probably still paying, probably still meant to use the product more, and probably responds to a well-timed email better than you would expect. Automated sequences handle that for every account, without anyone remembering to send it.',
    },
    {
        title: 'NPS and feedback loop management',
        body: 'Sending an NPS survey and then doing nothing with the responses is, honestly, worse than not sending it. Customers notice. Responses should route to the right person, detractors should get flagged, and sentiment should be tracked per account over time — not just an aggregate score for a slide deck.',
    },
    {
        title: 'Renewal and expansion tracking',
        body: '90 days before renewal is when retention is actually won or lost — not on the renewal call. A team walking into that conversation without the account health score, the last 3 support tickets, and whether usage has expanded is going in blind.',
    },
]

// How the software works, in order.
export const STEPS: TitledItem[] = [
    {
        title: 'Connect your data sources',
        body: 'Product analytics, billing, helpdesk, CRM — pulled together into one customer profile. Setup is usually faster than people expect. The first week is mostly deciding which data sources matter and which ones are noise.',
    },
    {
        title: 'Build your health score model',
        body: 'You define what healthy looks like for your customers specifically. Login frequency means something different for a project management tool than for a payroll platform. The model runs continuously — you do not pull the numbers, they are just there.',
    },
    {
        title: 'Activate retention playbooks',
        body: 'Pre-built playbooks for the common scenarios — onboarding check-ins, at-risk escalations, win-back campaigns — or build your own. Triggers fire automatically, so your team works the 12 accounts that need a human conversation this week, not all 400.',
    },
    {
        title: 'Measure and improve',
        body: 'Retention rate, at-risk account count, revenue recovered. The data gets sharper over time because the model learns which signals in your customer base actually predict churn — and it is rarely the signals you assumed.',
    },
]

// Who this is built for.
export const AUDIENCES: TitledItem[] = [
    { title: 'B2B SaaS companies', body: 'Reduce monthly churn below 1%, and find expansion revenue sitting in accounts you already have.' },
    { title: 'E-commerce brands', body: 'Increase repeat purchase rate, recover lapsed buyers before they go elsewhere.' },
    { title: 'Service agencies', body: 'Manage long-term client relationships past the initial project, not just up to delivery.' },
    { title: 'Subscription businesses', body: 'Prevent cancellations at renewal, catch failed payments before they become quiet churns.' },
    { title: 'Manufacturers and MSMEs', body: 'Retain wholesale and trade clients across longer sales cycles where the relationship is the product.' },
    { title: 'Consultancies', body: 'Extend engagements, spot referral opportunities, stop losing clients to competitors who just called more often.' },
]

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'What is customer retention management?',
        answer: 'It is the set of processes and tools you use to keep existing customers instead of constantly replacing them. Tracking behaviour, catching risk early, acting before the cancellation — that is the core of it.',
    },
    {
        question: 'How does customer retention management software work?',
        answer: 'It pulls data from your product, billing, helpdesk and CRM into unified profiles, generates health scores, and detects when something looks wrong. Then it triggers a workflow — an alert, an email, a task assigned to someone — without waiting for a human to notice. The loop runs continuously, not just when someone thinks to check.',
    },
    {
        question: 'What is the difference between a CRM and customer retention management software?',
        answer: 'A CRM is built to close deals. Customer retention management software is built for everything after. Some platforms try to do both, with varying results. If your current CRM has a "customer success" tab that nobody uses, that is the gap this software fills.',
    },
    {
        question: 'How quickly will we see results?',
        answer: 'First week: dashboards, health scores, alert configuration. Days 30–60: the at-risk accounts you did not know were at risk start showing up. By day 90 most teams have recovered enough revenue to justify the software cost several times over. That is not a guarantee — it depends on your current churn rate and how consistently the team acts on alerts.',
    },
    {
        question: 'Is this only for large businesses?',
        answer: 'No. A 3-person customer success team uses it because they cannot manually track 200 accounts without something slipping. An enterprise team uses it because they have 4,000 accounts and need prioritisation. The use case scales, the core problem does not change.',
    },
]
