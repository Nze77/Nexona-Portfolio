export interface FaqItem {
    question: string
    answer: string
}

// Public starting price, user-approved 2026-10-24: ₹19,000 gets the first core
// module live (usually leads + quotations). Keep in step with `startingPrice`
// on the event-management-software entry in landingPages.ts, which feeds the
// Offer and SoftwareApplication schema.
export const STARTING_PRICE = '₹19,000'

/** Visible "last updated" date. Keep equal to `updated` in landingPages.ts. */
export const LAST_UPDATED = '24 October 2026'

// FAQ doubles as FAQPage structured data, so every answer opens with the actual
// answer — the rest is explanation for whoever keeps reading. Questions are
// phrased the way people type them into ChatGPT or Perplexity.
export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'What is the best event management software in India for a small event planner?',
        answer: `Depends what you sell. If you sell tickets, use Eventbrite or Zoho Backstage. If you run weddings, corporate events or catering, the hard part is vendors, budgets and GST invoices, and ticketing tools don't touch that. For those planners a custom event management system usually fits better, and ours starts at ${STARTING_PRICE} for the first module.`,
    },
    {
        question: 'How much does event management software cost in India?',
        answer: `Custom event management software from Nexona Labs starts at ${STARTING_PRICE} for one core module, usually lead tracking and quotations. A full system — leads, quotes, vendor payments, budget vs actual, guest RSVPs, check-in and GST invoicing — is scoped after a free workflow audit and quoted before we start. No per-user licence. Hosting is paid at cost, from about ₹1,000 a month.`,
    },
    {
        question: 'Can I run my event business on Excel and WhatsApp?',
        answer: 'Yes, up to about four or five events a month. Past that, the same vendor invoice sits in two WhatsApp groups, someone pays it twice, and the costing sheet has three versions nobody trusts. That is usually the point where a single event management system pays for itself.',
    },
    {
        question: 'What is the difference between event planner software and a wedding CRM?',
        answer: 'A wedding CRM handles the sales side: enquiries, follow-ups, site visits, quotes. Event planner software covers everything after the booking too: vendors, crew, budgets, guest lists, check-in and invoices. Most Indian wedding planners need both, and they work better as one system so a booked lead becomes the event without retyping it.',
    },
    {
        question: 'Can event management software create GST invoices?',
        answer: 'Ours does. GST invoices, credit notes and payment receipts come straight from the event record, with your GSTIN, HSN/SAC codes and the right CGST/SGST or IGST split. It can push them into Tally or Zoho Books so your accountant keeps working where they already work.',
    },
    {
        question: 'Does it work with WhatsApp?',
        answer: 'Yes, through the official WhatsApp Business API. Enquiries from WhatsApp land as leads, quotes and payment reminders go out as WhatsApp messages, and your team gets task alerts there. Meta charges per message; we pass that through at cost.',
    },
    {
        question: 'Is Cvent or Eventbrite good for Indian wedding planners?',
        answer: 'Not really. Cvent is built for large corporate conferences and is priced on annual contracts. Eventbrite is a ticketing platform that takes a fee per paid ticket. Neither handles vendor advances, a mandap decorator’s balance payment or a GST invoice to the bride’s father. They are good products, built for a different job.',
    },
    {
        question: 'How long does it take to set up custom event management software?',
        answer: 'The first module is usually live in two to three weeks. A full system takes six to ten weeks and arrives in stages, so your team is using real screens from the first month instead of waiting for a big launch.',
    },
    {
        question: 'Can my team use it on their phones at the venue?',
        answer: 'Yes. It runs in any phone browser and can be installed as an app on Android and iOS. Coordinators tick off checklists, scan guest QR codes at check-in and log a vendor payment from the venue, not after they get back to the office.',
    },
    {
        question: 'Do I own the software and my data?',
        answer: 'Yes. The source code, the database and the documentation are yours. Host it where you like, and hand it to another developer later if you want. You are not renting access to your own client list.',
    },
]

/** Hero quick-facts — the four things buyers scan for before reading anything. */
export const HERO_FACTS = [
    { value: `From ${STARTING_PRICE}`, label: 'first module, custom-built' },
    { value: '2–3 weeks', label: 'to your first live module' },
    { value: 'GST + WhatsApp', label: 'built in, not bolted on' },
    { value: 'You own it', label: 'source code and data' },
]

/** Pain-to-fix table. Each row should stand on its own if quoted alone. */
export const PAIN_TO_FIX: { pain: string; fix: string }[] = [
    {
        pain: 'Enquiries arrive on WhatsApp, Instagram, calls and WedMeGood. Half get a reply two days late.',
        fix: 'Every enquiry lands in one lead list with an owner and a follow-up date. Nothing goes cold by accident.',
    },
    {
        pain: 'A quote takes two days because someone copies rows out of last year’s sheet.',
        fix: 'Quotes build from your own rate cards and past events, with margin shown per line. Same afternoon.',
    },
    {
        pain: 'The florist gets paid twice. Nobody notices for a month.',
        fix: 'Vendor payments are logged against the event and the booking. A second payment on the same bill gets flagged.',
    },
    {
        pain: 'You find out a wedding lost money three weeks after it ended.',
        fix: 'Budget vs actual updates as costs are committed, so you see the loss while you can still do something.',
    },
    {
        pain: 'The guest list lives in four versions. The bride’s side has its own.',
        fix: 'One guest list with RSVPs, meal choices and room allotment, shared by link with the family.',
    },
    {
        pain: 'GST invoices are typed by hand at month end, from memory and bank statements.',
        fix: 'GST invoices come off the event record in one click and sync to Tally or Zoho Books.',
    },
    {
        pain: 'Suresh is booked for two events on the same Saturday. You find out that morning.',
        fix: 'The crew calendar flags the clash the moment the second booking is made.',
    },
]

/** Core features, plain names first — these are the terms people search for. */
export const FEATURES = [
    {
        title: 'Lead tracking',
        body: 'Every enquiry from WhatsApp, calls, Instagram and your website in one pipeline: new, site visit, quote sent, booked.',
    },
    {
        title: 'Quotations',
        body: 'Itemised quotes from your rate cards, with margin per line, sent as a branded PDF or WhatsApp link.',
    },
    {
        title: 'Vendor payments',
        body: 'Advances, balances and due dates for every caterer, decorator and DJ, tied to the event they belong to.',
    },
    {
        title: 'Budget vs actual',
        body: 'What you quoted against what you are actually spending, per event, live. Profit per event without waiting for the CA.',
    },
    {
        title: 'Guest RSVPs',
        body: 'Invites, RSVPs, meal preferences and room allotment, updated by guests through a link instead of phone calls.',
    },
    {
        title: 'Check-in',
        body: 'QR passes for every guest and a phone-based scanner at the gate. Live headcount for the caterer.',
    },
    {
        title: 'GST invoicing',
        body: 'GST invoices, receipts and credit notes from the event record. Payment milestones with Razorpay links.',
    },
]

/** Smaller modules visible in the screenshot. */
export const MORE_FEATURES = [
    'Payment milestones and overdue alerts',
    'Tasks and checklists per event',
    'Crew and events calendar with clash alerts',
    'Client portal for menu and decor approvals',
    'Follow-up automation on WhatsApp',
    'Profit per event and margin reports',
]

/** Worked example — numbers mirror the demo system in the screenshot and the
 *  before/after a build is scoped around. Not presented as a named client. */
export const EXAMPLE_RESULTS = [
    { metric: 'Time to send a quote', before: '2 days', after: '40 minutes' },
    { metric: 'Overdue client payments found on day one', before: 'Unknown', after: '₹1.57 lakh' },
    { metric: 'Coordinator hours a week spent reconciling vendor payments', before: '9 hours', after: 'Under 2' },
    { metric: 'Crew double-bookings found before the event', before: 'On the day', after: 'At booking' },
]

/** Custom vs Eventbrite/Cvent vs Excel + WhatsApp. */
export const COMPARISON: { point: string; nexona: string; platforms: string; excel: string }[] = [
    {
        point: 'Built for',
        nexona: 'Planners, wedding companies, caterers and agencies running the business side of events.',
        platforms: 'Selling tickets and registering attendees for conferences and public events.',
        excel: 'Anything, which is the problem. Every planner builds a different sheet.',
    },
    {
        point: 'Pricing',
        nexona: `From ${STARTING_PRICE}, one time. No per-user fee.`,
        platforms: 'Eventbrite takes a fee per paid ticket. Cvent is quote-based, usually on annual contracts.',
        excel: 'Free. You pay in coordinator hours and double payments.',
    },
    {
        point: 'Vendor payments and budgets',
        nexona: 'Advances, balances and budget vs actual per event.',
        platforms: 'Not the focus. Budgeting is usually basic or an add-on.',
        excel: 'Possible, if one person maintains it and never leaves.',
    },
    {
        point: 'GST invoicing',
        nexona: 'Built in, with Tally and Zoho Books sync.',
        platforms: 'Not built for Indian GST invoicing.',
        excel: 'Typed by hand at month end.',
    },
    {
        point: 'WhatsApp',
        nexona: 'Official WhatsApp Business API for leads, reminders and alerts.',
        platforms: 'Email-first.',
        excel: 'Twenty groups, no record.',
    },
    {
        point: 'Fits how you work',
        nexona: 'Built around your stages, approvals and rate cards.',
        platforms: 'You adapt to the product.',
        excel: 'Fits perfectly, until a second person edits it.',
    },
    {
        point: 'Who owns the data',
        nexona: 'You. Code and database.',
        platforms: 'You rent access.',
        excel: 'You, scattered across laptops.',
    },
]

/** Integrations — named explicitly for entity clarity. */
export const INTEGRATIONS = [
    {
        title: 'WhatsApp Business API',
        body: 'Enquiries become leads. Quotes, RSVP nudges and payment reminders go out on WhatsApp.',
    },
    {
        title: 'Razorpay',
        body: 'Payment links on every milestone. Paid status updates on the event by itself.',
    },
    {
        title: 'Tally Prime',
        body: 'Invoices, receipts and vendor bills synced in. Your accountant stays in Tally.',
    },
    {
        title: 'Zoho Books',
        body: 'Same sync, for teams that keep their books in Zoho instead.',
    },
    {
        title: 'GST e-invoicing',
        body: 'IRN and QR code from the invoice screen for clients that need e-invoices.',
    },
    {
        title: 'Excel import',
        body: 'Your existing leads, vendors and rate cards come across on day one.',
    },
]

/** Corporate agencies and decor/production houses — the two use cases that
 *  don't have their own H2. Wedding planners and caterers do. */
export const OTHER_USE_CASES = [
    {
        title: 'Corporate event agencies',
        body: 'Procurement wants its PO number on every invoice and bounces anything that does not match the approved quote to the rupee. Quotes, POs and invoices sit on one record, so they match. Offsites, dealer meets and product launches each get their own checklist template.',
    },
    {
        title: 'Decor and production houses',
        body: 'Your stock is the business: trusses, LED panels, 300 chiavari chairs, a mandap frame that lives in Bhiwandi. Inventory is booked per event with dispatch and return, so the same LED wall cannot go to two venues on one night.',
    },
]

/** What moves the price up from the starting figure. */
export const COST_DRIVERS = [
    {
        title: 'How many modules',
        body: `${STARTING_PRICE} gets one module live. Each one after that is scoped and quoted before we start it.`,
    },
    {
        title: 'Integrations',
        body: 'WhatsApp Business API, Razorpay, Tally and Zoho Books are each a real piece of work.',
    },
    {
        title: 'Guest-facing parts',
        body: 'RSVP pages, QR passes and a check-in scanner for 1,500-guest weddings need more care than an internal screen.',
    },
    {
        title: 'The state of your data',
        body: 'One clean vendor sheet moves in an hour. Six years of WhatsApp-forwarded rate cards take longer.',
    },
]

/** Price table. */
export const PRICE_ROWS = [
    { item: 'First core module (usually leads + quotations)', price: `From ${STARTING_PRICE}`, time: '2–3 weeks' },
    { item: 'Full system: all seven modules + client portal', price: 'Quoted after the audit', time: '6–10 weeks' },
    { item: 'Hosting', price: 'From ~₹1,000 / month', time: 'Paid at cost' },
    { item: 'Per-user licence', price: '₹0', time: 'Add staff freely' },
]

/** Third-party figures — every one is attributed and linked in the page. */
export const MARKET_STATS = [
    {
        value: '46 lakh',
        label: 'weddings in the 1 Nov – 14 Dec 2025 season, driving about ₹6.5 lakh crore in trade. Catering took around 10% of wedding spend and event management around 5%.',
        source: 'CAIT, reported by Angel One',
        href: 'https://oga-prod.angelone.in/news/market-updates/indias-wedding-season-to-driveover-rs-6-lakh-crore-trade-says-cait',
    },
    {
        value: '$59.2 billion',
        label: 'projected size of India’s experience economy by 2030, up from $32.2 billion in 2024, growing 16–18% a year. Organised events already support over one crore jobs.',
        source: 'EEMA Vision 2030, via Indian Television, July 2026',
        href: 'https://indiantelevision.com/mam/indias-experience-economy-set-to-nearly-double-to-59-2-billion-by-2030-eema/',
    },
    {
        value: '70%',
        label: 'of event planners said the lack of integration between their event tools was their biggest challenge. 83% used more than one provider.',
        source: 'EventMobi survey of 108 planners, 2019',
        href: 'https://www.eventmobi.com/blog/the-top-event-management-tools-used-by-event-planners-in-2019/',
    },
]
