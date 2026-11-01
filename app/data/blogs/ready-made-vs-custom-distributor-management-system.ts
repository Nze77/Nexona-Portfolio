import type { BlogPost } from './types'
import { RENT_PER_DISTRIBUTOR_MONTH, RENTED, rented, inr } from '../dmsCost'

// THE DMS COST + DECISION POST — one page for the whole topic (user, 2026-11-01).
// The separate DMS cost guide was merged in here to stop the two cannibalising
// each other; /blogs/ready-made-vs-custom-distributor-management-system and
// /blogs/ready-made-vs-custom-distributor-management-system 308-redirect here
// (next.config.ts). The slug is kept because it was already indexed.
//
// Owns every DMS cost and decision query:
//   distributor management system cost (in India), DMS price per distributor,
//   ready-made vs custom DMS, switch from a ready-made DMS, DMS vendor questions.
// The landing page /distributor-management-system owns the head term.
//
// RULES (user, 2026-11-01):
//   • Never recommend renting, ready-made software or any competitor.
//   • Publish what ready-made vendors charge (dmsCost.ts); never Nexona's DMS
//     price, AMC, hosting, exact savings or payback — "₹0 per distributor" and
//     "lakhs, if not crores" only. Exact numbers go out privately.
//   • The 5-year comparison / quote review is FREE.

const r50 = rented(50)
const r100 = rented(100)
const r250 = rented(250)
const r500 = rented(500)
const rent = inr(RENT_PER_DISTRIBUTOR_MONTH)

export const POST: BlogPost = {
    slug: 'ready-made-vs-custom-distributor-management-system',
    title: 'Ready-Made vs Custom Distributor Management System: Cost in India (2026) and When to Switch',
    metaTitle: 'Ready-Made vs Custom DMS: Cost in India (2026)',
    description: `Ready-made DMS with portal, CRM and loyalty costs about ${rent} per distributor a month. Own a custom DMS and that fee is ₹0. Costs, signs and how to switch.`,
    excerpt: `Ready-made distributor management systems with a distributor portal, CRM and loyalty charge about ${rent} per distributor per month in India — ${inr(r100.fiveYears)} over five years for 100 distributors. Own a custom DMS and that fee drops to ₹0. The costs, the signs you have outgrown your DMS, and how to switch.`,
    category: 'Distribution',
    published: '2026-09-28',
    updated: '2026-11-01',
    readingMinutes: 10,
    keywords: [
        // Cost
        'distributor management system cost in India',
        'distributor management system cost',
        'DMS software cost India',
        'DMS software price India',
        'DMS cost per distributor',
        'distributor portal cost',
        'DMS with CRM and loyalty cost',
        'custom DMS cost',
        // Decision and switch
        'ready-made vs custom distributor management system',
        'custom DMS vs off the shelf',
        'build vs buy distributor management system',
        'switch from ready-made DMS to custom',
        'signs you have outgrown your DMS',
        'questions to ask a DMS vendor',
        'distributor management system for FMCG',
    ],
    relatedServices: [
        { label: 'Distributor Management System', href: '/distributor-management-system' },
        { label: 'Customer Retention Software', href: '/customer-retention-management-software' },
        { label: 'Manufacturing ERP', href: '/manufacturing-erp' },
        { label: 'App Development Cost', href: '/blogs/business-app-development-cost-in-india' },
    ],
    body: [
        {
            type: 'callout',
            label: 'Short answer',
            text: `A ready-made distributor management system with a distributor portal, CRM and loyalty programme costs about **${rent} per distributor per month** in India — ${inr(r100.year)} a year for 100 distributors and ${inr(r500.fiveYears)} over five years for 500, rising every time you sign a distributor. With a custom DMS that fee becomes **₹0**, because you own the source code; you pay only AMC and hosting, which do not grow per distributor. For most brands that saves **lakhs, and for networks of a few hundred distributors, crores**. Switch four to six months before your renewal: export your data, pilot with three to five distributors for one billing cycle, then roll out region by region. Figures as of November 2026.`,
        },

        // ── Cost ─────────────────────────────────────────────────────────
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
            text: 'Nobody multiplies it out in the demo. The per-distributor price sits on slide nine of a deck, next to a photo of a smiling kirana owner, and it looks like a rounding error against your monthly sales. It is not. It is a subscription that grows every time your distribution does — the one thing you are actively trying to make happen.',
        },

        { type: 'h2', text: 'What does a ready-made DMS cost you beyond the per-distributor fee?' },
        {
            type: 'p',
            text: 'Per-rep seats, implementation, customisation and the renewal increase — none of them in the table above. And the costs that never reach an invoice, because they land in your team’s week instead:',
        },
        {
            type: 'ul',
            items: [
                '**Sales rep seats.** Most products charge per field user, per month, on top of the distributor fee.',
                '**Implementation.** Data migration, setup, training. Billed once, rarely small.',
                '**The scheme spreadsheet.** Every brand has a scheme the product cannot do — a slab that changes by region, free goods on a mixed basket, a display scheme with photo proof. It lives in Excel next to the DMS, and one person in sales ops spends a week a quarter reconciling it.',
                '**Double entry at the distributor.** The DMS does not sync properly with the distributor’s Tally, so their billing clerk types every invoice twice. Adoption drops. You are back to the Monday Excel sheet, except now you are paying for software too.',
                '**Customisation you pay for and do not own.** The vendor builds your feature, bills you for it, and it can break in the next product update.',
                '**Paying for the bundle.** Van sales, modern trade, a module you will never open — included, priced in, unused.',
                '**The renewal.** Three years of retailer data, visit history and scheme records on their server. Everyone at the renewal meeting knows how hard it feels to leave.',
            ],
        },

        { type: 'h2', text: 'Why does a custom DMS cost ₹0 per distributor?' },
        {
            type: 'p',
            text: 'Because nobody is renting it to you. With a custom DMS you own the source code, the database and the retailer data. There is no licence, so there is nothing to count — distributor 501 costs the same as distributor 500. After the build you pay AMC for upkeep and hosting for the servers. Neither is charged per head.',
        },
        {
            type: 'p',
            text: 'Ownership is the part brands underrate. Your retailer history, scheme records and visit data sit on your own server, so the renewal meeting never happens. Nobody gets to raise the price on your own sales data.',
        },

        { type: 'h2', text: 'Ready-made vs custom DMS: how do they compare?' },
        {
            type: 'table',
            caption: 'Ready-made vs custom DMS for a brand with a growing distributor network',
            columns: ['', 'Ready-made DMS', 'Custom DMS'],
            rows: [
                ['Per distributor', `About ${rent} a month`, '₹0'],
                ['Per sales rep', 'Usually charged monthly', '₹0'],
                ['Every month', 'Grows with your network', 'Flat AMC + hosting'],
                ['Your schemes', 'Supported types only; the rest in Excel', 'Your exact logic, applied on the bill'],
                ['Tally / SAP sync', 'Standard connectors, extras cost more', 'Built for your stack from day one'],
                ['Changes', 'Vendor roadmap, ticket queue', 'Your roadmap'],
                ['Customisation', 'Billed to you, owned by the vendor', 'Part of your system, owned by you'],
                ['Source code and data', 'On the vendor’s platform', 'Yours, from day one'],
                ['At renewal', 'Price rises; your data is their leverage', 'Nothing to renew'],
            ],
        },

        { type: 'h2', text: 'How much can you save with a custom DMS?' },
        {
            type: 'p',
            text: `Lakhs, if not crores. The rented column above is money that stops: ${inr(r50.fiveYears)} over five years at 50 distributors, ${inr(r100.fiveYears)} at 100, ${inr(r250.fiveYears)} at 250. A custom DMS replaces it with a one-time build and a flat running cost that does not move with your network. The bigger the network, the bigger the gap — past a few hundred distributors, it is crores.`,
        },
        {
            type: 'p',
            text: 'Your exact number depends on your distributor count, your rep count and what you pay today. Run the rented side yourself — it takes two minutes and most brands have never done it:',
        },
        {
            type: 'ul',
            items: [
                '**Rented, 5 years** = distributors × price per distributor per month × 60, plus sales reps × price per rep per month × 60, plus implementation and customisation.',
                '**Then add growth.** If the plan says the network doubles in three years, run it again at the year-three count. That is the bill you are actually signing.',
                '**Custom, 5 years** = one-time build + (AMC + hosting) × 60. Ask for these three numbers in writing.',
            ],
        },
        {
            type: 'cta',
            heading: 'How much is your network costing you?',
            text: 'Send us your current DMS invoice or quote and your distributor count. We send back a written five-year comparison — what you pay renting vs what owning would cost — free, whether or not you build with us.',
            buttonLabel: 'Get my 5-year comparison',
        },

        // ── Decision and switch ──────────────────────────────────────────
        { type: 'h2', text: 'What are the signs you have outgrown a ready-made DMS?' },
        {
            type: 'p',
            text: 'Two or more of these, and you are already paying for the gap — in money, or in one person’s week:',
        },
        {
            type: 'ul',
            items: [
                'At least one scheme you ran last year lives in a spreadsheet next to the DMS.',
                'Distributors bill in Tally and refuse to double-enter, so secondary sales arrive late or not at all.',
                'Your distributor network or field team is growing, and every new name is another licence.',
                'You sell in a category with its own rules — batch and expiry in pharma, crates and deposits in beverages, seasonal credit in agri inputs.',
                'You have been quoted for a customisation more than once.',
                'The renewal quote came in higher than last year’s.',
            ],
        },

        { type: 'h2', text: 'What does a custom DMS need from you?' },
        {
            type: 'p',
            text: 'Less than people expect. Three things:',
        },
        {
            type: 'ul',
            items: [
                '**A few weeks of attention in discovery.** Someone from sales ops sits with the builder and explains how schemes and claims actually work. The spreadsheet next to your current DMS becomes the requirements document.',
                '**A staged rollout.** One module first — the distributor portal and Tally sync, usually — piloted with a handful of distributors, then CRM, loyalty and the field app in waves. The spend follows the value.',
                '**The right builder.** Ask who fixes things in year two, how fast, and whether the code sits in your company’s name from day one. At Nexona it does.',
            ],
        },
        {
            type: 'p',
            text: 'What a portal + CRM + loyalty build covers: distributor portal (orders, live stock, invoices, ledger), CRM (retailers, beat plans, visits), loyalty (points, tiers, redemptions), two-way Tally sync, GST e-invoicing and e-way bills, and role-based reports. The build is quoted in writing after we see your scheme sheet, not before.',
        },

        { type: 'h2', text: 'How do you switch from a ready-made DMS to a custom one?' },
        {
            type: 'ol',
            items: [
                '**Export everything first.** Distributor and retailer masters, product and price lists, open balances, scheme history. Before you tell the vendor you are leaving.',
                '**Map your real schemes.** The ones in the DMS and the ones in the spreadsheet next to it. The spreadsheet is the requirements document.',
                '**Pilot with three to five distributors.** One friendly, one busy, one who hates change. Run old and new side by side for one billing cycle.',
                '**Roll out region by region.** Switch the old system off only when nobody has opened it for a month.',
                '**Time it to your renewal.** Start the build four to six months before the contract renews, so you are not paying for both for long.',
            ],
        },
        {
            type: 'p',
            text: 'Custom is not all-or-nothing, either. Build the [custom distributor management system](/distributor-management-system) core and keep Tally for the books. Add the field app once distributors are actually using the first piece; what that app takes to build is in [business app development cost in India](/blogs/business-app-development-cost-in-india). Loyalty on its own, for retailers you already sell to, sits closer to our [customer retention software](/customer-retention-management-software).',
        },

        { type: 'h2', text: 'What should you ask any DMS vendor before you sign or renew?' },
        {
            type: 'p',
            text: 'Take these into every demo and every renewal meeting. The answers tell you most of what you need.',
        },
        {
            type: 'ul',
            items: [
                'What does this cost in year three, at the number of distributors and reps we plan to have?',
                'Can it run every scheme we ran last year, without a spreadsheet?',
                'Does it sync both ways with Tally at the distributor end?',
                'Does the field app work offline, on a three-year-old Android phone?',
                'Can we export all our data, in a usable format, any time — not just at exit?',
                'When our scheme structure changes next quarter, who changes the software, and how long does it take?',
            ],
        },
        {
            type: 'p',
            text: 'Watch what happens at the first question. A vendor who answers it straight, with your numbers, is rarer than it should be.',
        },

        {
            type: 'callout',
            label: 'Where Nexona comes in',
            text: 'Nexona is a software studio in Mumbai that builds [custom distributor management systems](/distributor-management-system) — distributor portal, secondary billing, schemes and claims, CRM, loyalty and a field sales app, synced with Tally and GST-ready. One module first, the rest once distributors use it. ₹0 per distributor, and you own the source code.',
        },
    ],
    cta: {
        heading: 'Paying per distributor today?',
        text: 'Send us the invoice and your scheme sheet. We send back what the same network would cost to own over five years, in writing — free, whether or not you build with us.',
    },
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
            question: 'What are the signs you have outgrown your distributor management system?',
            answer: 'Schemes that live in a spreadsheet beside the DMS, distributors who double-enter bills because it does not sync with Tally, repeated customisation quotes, category rules the product handles badly — batch and expiry, crates and deposits — and a renewal quote that rises with your network. Two or more means it is time for a custom DMS.',
        },
        {
            question: 'Can we move from our current DMS to a custom one without losing data?',
            answer: 'Yes. Export distributor and retailer masters, product and price lists, open balances and scheme history before announcing the switch, then pilot the custom DMS with three to five distributors alongside the old one for a billing cycle before rolling out region by region.',
        },
        {
            question: 'When is the best time to switch DMS?',
            answer: 'Four to six months before your current contract renews. That leaves time to export data, map your real schemes, and pilot with three to five distributors for a full billing cycle, so the old system is switched off at renewal instead of being paid for another year.',
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
}
