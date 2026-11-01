import type { BlogPost } from './types'
import { RENT_PER_DISTRIBUTOR_MONTH, RENTED, rented, inr } from '../dmsCost'

// COST GUIDE — served at the ROOT path /distributor-management-system-cost-in-india.
// Owns the cost queries for the DMS cluster:
//   distributor management system cost (in India), DMS software price,
//   DMS cost per distributor, custom vs ready-made DMS cost.
// The landing page /distributor-management-system owns the head term; the
// blog ready-made-vs-custom-distributor-management-system owns the decision
// (fit, hidden costs, switching) and links here for the rupee figures.
//
// PRICING RULE (user, 2026-11-01): show what ready-made vendors charge; never
// Nexona's DMS price, AMC, hosting, exact savings or payback. See dmsCost.ts.
// Offer (user-confirmed): the 5-year comparison / quote review is FREE.
// Never promote ready-made / rented software or competitors (user, 2026-11-01).

const r50 = rented(50)
const r100 = rented(100)
const r250 = rented(250)
const r500 = rented(500)
const rent = inr(RENT_PER_DISTRIBUTOR_MONTH)

export const POST: BlogPost = {
    slug: 'distributor-management-system-cost-in-india',
    path: '/distributor-management-system-cost-in-india',
    title: 'Distributor Management System Cost in India (2026): Rent vs Own',
    metaTitle: 'Distributor Management System Cost in India (2026)',
    description: `Ready-made DMS with portal, CRM and loyalty costs about ${rent} per distributor a month. Own yours and that fee is ₹0, saving lakhs if not crores.`,
    excerpt: `Ready-made distributor management systems with a distributor portal, CRM and loyalty charge about ${rent} per distributor per month in India — ${inr(r100.fiveYears)} over five years for 100 distributors. Own a custom DMS and that fee drops to ₹0. For most networks the saving runs into lakhs, for large ones crores.`,
    category: 'Distribution',
    published: '2026-11-01',
    updated: '2026-11-01',
    readingMinutes: 7,
    keywords: [
        'distributor management system cost in India',
        'distributor management system cost',
        'DMS software cost India',
        'DMS software price India',
        'DMS cost per distributor',
        'distributor portal cost',
        'custom DMS cost',
        'ready-made vs custom DMS cost',
        'DMS with CRM and loyalty cost',
        'retailer loyalty program software cost India',
        'distributor management software pricing',
    ],
    relatedServices: [
        { label: 'Distributor Management System', href: '/distributor-management-system' },
        { label: 'Customer Retention Software', href: '/customer-retention-management-software' },
        { label: 'Manufacturing ERP', href: '/manufacturing-erp' },
        { label: 'App Development Cost', href: '/business-app-development-cost-in-india' },
    ],
    body: [
        {
            type: 'callout',
            label: 'Short answer',
            text: `A ready-made distributor management system with a distributor portal, CRM and loyalty programme costs about **${rent} per distributor per month** in India. That is ${inr(r100.year)} a year for 100 distributors and ${inr(r500.fiveYears)} over five years for 500 — and it rises every time you sign a distributor. With a custom DMS that fee becomes **₹0**, because you own the source code; you pay only AMC and hosting, which do not grow per distributor. For most brands that saves **lakhs, and for networks of a few hundred distributors, crores**. Figures as of November 2026.`,
        },

        // ── 1 ────────────────────────────────────────────────────────────
        { type: 'h2', text: 'How much does a distributor management system cost in India?' },
        {
            type: 'p',
            text: `About ${rent} per distributor per month for a ready-made DMS with a distributor portal, CRM and loyalty. That is Nexona’s estimate of the market average in November 2026. Fifty distributors: ${inr(r50.month)} a month. Five hundred: ${inr(r500.month)} a month. Every month, for as long as you use it.`,
        },
        {
            type: 'table',
            caption: `What a ready-made DMS costs at ${rent} per distributor per month`,
            columns: ['Distributors', 'Per month', 'Per year', 'Over 3 years', 'Over 5 years'],
            rows: RENTED.map((r) => [String(r.distributors), inr(r.month), inr(r.year), inr(r.threeYears), inr(r.fiveYears)]),
        },
        {
            type: 'p',
            text: 'And that is the flattering version. It leaves out everything below — which is where the real bill usually lives.',
        },

        // ── 2 ────────────────────────────────────────────────────────────
        { type: 'h2', text: 'What does a ready-made DMS charge on top of the per-distributor fee?' },
        {
            type: 'p',
            text: 'Per-rep seats, implementation, customisation and the renewal increase. None of them is in the table above. A brand with a 50-person field team can find the rep seats alone add another large line to the monthly bill.',
        },
        {
            type: 'ul',
            items: [
                '**Sales rep seats.** Most products charge per field user, per month, on top of the distributor fee.',
                '**Implementation.** Data migration, setup, training. Billed once, rarely small.',
                '**Customisation.** The slab scheme the product does not support, built for you, billed to you — and not owned by you.',
                '**Modules sold separately.** Claims, van sales, a retailer app. The bundle in the demo is not always the bundle in the contract.',
                '**The renewal.** Three years of retailer and scheme history on their server. Everyone at the renewal meeting knows how hard it is to leave.',
            ],
        },

        // ── 3 ────────────────────────────────────────────────────────────
        { type: 'h2', text: 'Why does a custom DMS cost ₹0 per distributor?' },
        {
            type: 'p',
            text: 'Because nobody is renting it to you. With a custom DMS you own the source code, the database and the retailer data. There is no licence, so there is nothing to count — distributor 501 costs the same as distributor 500. After the build you pay AMC for upkeep and hosting for the servers. Neither is charged per head.',
        },
        {
            type: 'p',
            text: 'Ownership is the part brands underrate. Your retailer history, scheme records and visit data sit on your own server, so the renewal meeting never happens. Nobody gets to raise the price on your own sales data.',
        },

        // ── 4 ────────────────────────────────────────────────────────────
        { type: 'h2', text: 'What do you pay for with a custom DMS instead?' },
        {
            type: 'p',
            text: 'Three things, all agreed in writing before work starts: a one-time build, a fixed monthly AMC, and hosting. The build is scoped to your schemes and integrations, so we quote it after seeing your scheme sheet, not before. None of the three goes up when you add a distributor or a rep.',
        },
        {
            type: 'table',
            caption: 'Ready-made vs custom DMS: how you pay',
            columns: ['', 'Ready-made DMS', 'Custom DMS'],
            rows: [
                ['Per distributor', `About ${rent} a month`, '₹0'],
                ['Per sales rep', 'Usually charged monthly', '₹0'],
                ['Up front', 'Implementation fee', 'One-time build'],
                ['Every month', 'Grows with your network', 'Flat AMC + hosting'],
                ['Customisation', 'Billed, and owned by the vendor', 'Part of your system, owned by you'],
                ['Source code and data', 'On the vendor’s platform', 'Yours, from day one'],
            ],
        },
        {
            type: 'p',
            text: 'What the build covers, for a portal + CRM + loyalty scope: distributor portal (orders, live stock, invoices, ledger), CRM (retailers, beat plans, visits), loyalty (points, tiers, redemptions), two-way Tally sync, GST e-invoicing and e-way bills, and role-based reports. Most brands start with the portal and Tally sync, pilot with five distributors, then add the rest.',
        },

        // ── 5 ────────────────────────────────────────────────────────────
        { type: 'h2', text: 'How much can you save with a custom DMS?' },
        {
            type: 'p',
            text: `Lakhs, if not crores. The rented column above is money that stops: ${inr(r50.fiveYears)} over five years at 50 distributors, ${inr(r100.fiveYears)} at 100, ${inr(r250.fiveYears)} at 250. A custom DMS replaces it with a one-time build and a flat running cost that does not move with your network. The bigger the network, the bigger the gap — past a few hundred distributors, it is crores.`,
        },
        {
            type: 'p',
            text: 'Your exact number depends on your distributor count, your rep count and what you pay today. So we work it out for you rather than publish an example that is not yours.',
        },
        {
            type: 'cta',
            heading: 'How much is your network costing you?',
            text: 'Send us your current DMS invoice or quote and your distributor count. We send back a written five-year comparison — what you pay renting vs what owning would cost — free, whether or not you build with us.',
            buttonLabel: 'Get my 5-year comparison',
        },

        // ── 6 ────────────────────────────────────────────────────────────
        { type: 'h2', text: 'Why do growing brands move off a rented DMS?' },
        {
            type: 'p',
            text: 'The bill is usually what starts the conversation. It is rarely the only reason. By the time a brand looks at a custom DMS, at least two of these are true:',
        },
        {
            type: 'ul',
            items: [
                'A scheme they ran last year lives in Excel, because the product could not do it.',
                'Distributors bill in Tally and refuse to type every invoice twice.',
                'The category has rules a generic product handles badly — batch and expiry in pharma, crates and deposits in beverages, seasonal credit in agri inputs.',
                'They have been quoted for a customisation more than once, and own none of it.',
                'The renewal quote went up, and their retailer history is on someone else’s server.',
            ],
        },
        {
            type: 'p',
            text: 'A custom DMS fixes all five at once, because it is built around how you distribute rather than how a product was designed to work. The seat-month maths for the decision is in [ready-made vs custom distributor management system](/blogs/ready-made-vs-custom-distributor-management-system).',
        },

        // ── 7 ────────────────────────────────────────────────────────────
        { type: 'h2', text: 'How do you calculate what your DMS really costs?' },
        {
            type: 'p',
            text: 'Run the rented side yourself. It takes two minutes and most brands have never done it:',
        },
        {
            type: 'ul',
            items: [
                '**Rented, 5 years** = distributors × price per distributor per month × 60, plus sales reps × price per rep per month × 60, plus implementation and customisation.',
                '**Then add growth.** If the plan says the network doubles in three years, run it again at the year-three count. That is the bill you are actually signing.',
                '**Custom, 5 years** = one-time build + (AMC + hosting) × 60. Ask any builder for these three numbers in writing. If they will not give them, that tells you something.',
            ],
        },
        {
            type: 'p',
            text: 'Want the custom side worked out for your scheme sheet? That is the [distributor management system](/distributor-management-system) we build. Loyalty on its own, for retailers you already sell to, sits closer to our [customer retention software](/customer-retention-management-software).',
        },
    ],
    faq: [
        {
            question: 'How much does DMS software cost in India?',
            answer: `A ready-made DMS with distributor portal, CRM and loyalty averages about ${rent} per distributor per month — ${inr(r100.year)} a year for 100 distributors, before per-rep seats. A custom DMS costs ₹0 per distributor: you pay a one-time build plus flat AMC and hosting, and you own the source code.`,
        },
        {
            question: 'What is the cost of a DMS per distributor?',
            answer: `Rented: about ${rent} per distributor per month, plus per-rep seats on most products. Custom: ₹0 per distributor, because you own the source code. You pay AMC and hosting instead, and neither grows when you add distributors.`,
        },
        {
            question: 'How much can a custom DMS save over a ready-made one?',
            answer: `Lakhs for most brands, crores for networks of a few hundred distributors. A rented DMS at ${rent} per distributor per month costs ${inr(r100.fiveYears)} over five years at 100 distributors and ${inr(r500.fiveYears)} at 500. A custom DMS replaces that with a one-time build and flat running costs.`,
        },
        {
            question: 'What does a custom DMS cost to run?',
            answer: 'A fixed monthly AMC for updates and fixes, plus hosting. Both are quoted in writing before the build starts, and neither is charged per distributor or per user, so adding 200 distributors does not change the bill.',
        },
        {
            question: 'Do I own the source code of a custom DMS?',
            answer: 'Yes. The code sits in a repository in your company’s name from day one, along with the database and every retailer record. That is why there is no per-distributor or per-user fee. If you stop working with us, the system keeps running and stays yours.',
        },
        {
            question: 'Can you check our current DMS quote?',
            answer: 'Yes, free, whether or not you build with us. Send the quote or last invoice and your distributor and rep count. We send back a written five-year comparison of renting vs owning for your network, and flag the line items that usually grow at renewal.',
        },
    ],
    cta: {
        heading: 'Paying per distributor today?',
        text: 'Send us the invoice. We will send back what the same network would cost to own over five years, in writing. Free.',
    },
}
