export interface FaqItem {
    question: string
    answer: string
}

// FAQ doubles as FAQPage structured data, so every answer opens with the actual
// answer — the rest is explanation for whoever keeps reading.
//
// Pricing rule applies here as everywhere: no figures. Cost questions are
// answered with what drives the number and the rent-vs-own comparison.
export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'What is a distributor management system (DMS)?',
        answer: 'Software that connects a brand to its distributors and, through them, to retailers. It tracks what the distributor bought from you, what they sold to shops, what stock is sitting in their godown, which schemes apply, and who owes whom. The point is secondary sales visibility — knowing what actually moved to the market, not just what you billed to the distributor.',
    },
    {
        question: 'What is the difference between DMS and SFA?',
        answer: 'DMS runs the distributor: stock, billing to retailers, schemes, claims, collections. SFA — sales force automation — runs the field team: beat plans, retailer visits, order taking, attendance. They share the same retailers and the same orders, so most brands need both, and they work far better as one system than as two products passing data back and forth overnight.',
    },
    {
        question: 'Is a custom DMS more expensive than a ready-made one?',
        answer: 'Not once your network has any size to it. A rented DMS charges per distributor and per sales rep, every month, for as long as you use it — so the bill grows every time you do. A custom build is paid for once and then it is yours. Over a few years the two usually end up in the same range, and only one of them fits your schemes. Small network, simple schemes? Rent. We will tell you that on the call.',
    },
    {
        question: 'Can a DMS integrate with Tally?',
        answer: 'Yes. Tally, Busy, Marg, Zoho Books, SAP Business One — whatever your distributors and your own accounts team already use. Sales invoices, receipts and stock movements sync across, so nobody types the same bill twice. Most distributors will not give up Tally. They should not have to.',
    },
    {
        question: 'Does the DMS app work offline?',
        answer: 'It has to. Reps take orders in shops with one bar of signal, or none. Orders, visits and collections save on the phone and sync the moment a connection comes back. It also runs on older, cheaper Android phones, because that is what field teams actually carry — not the phone in the vendor demo.',
    },
    {
        question: 'Does it handle GST e-invoicing and e-way bills?',
        answer: 'Yes — e-invoices generated through the government IRP, e-way bills for stock transfers above the limit, HSN codes, and the right tax treatment for inter-state versus intra-state bills. Built in, not bolted on at month end.',
    },
    {
        question: 'How long does it take to build a custom DMS?',
        answer: 'The first working piece comes early. We usually start with distributor stock and secondary billing, pilot it with three to five distributors, fix what they complain about, then roll out across the network in waves. Schemes, claims and the field app follow. The exact timeline depends on how many modules and integrations you need, and we give you that after discovery, not before.',
    },
    {
        question: 'Can we move from our current DMS to a custom one?',
        answer: 'Yes. Distributor masters, retailer lists, product and price lists, open balances and scheme history all come across. The old system runs alongside for a cycle while distributors get comfortable, then you switch it off. People usually come to us from a rented DMS that stopped fitting, or from Excel sheets emailed every Monday.',
    },
    {
        question: 'Who owns the data and the software?',
        answer: 'You do. Both. The code, the database, the retailer list you spent years building. Nobody gets to raise the price on your own sales data at renewal time.',
    },
    {
        question: 'Which industries use a distributor management system?',
        answer: 'FMCG, pharma, paints and building materials, agri inputs, consumer electronics, beverages, auto spares — any business that sells through distributors to a long tail of retailers. The core is the same everywhere. The rules are not, and the rules are where a ready-made DMS usually breaks.',
    },
]

/** Signals a brand has outgrown Excel / its current DMS. */
export const SIGNALS = [
    'Secondary sales arrive as an Excel sheet from each distributor. Every Monday. In a different format each time.',
    'You know what you billed to distributors. What they sold to shops — no idea.',
    'Scheme claims pile up for a quarter, then one person spends two weeks reconciling them.',
    'A distributor says he is out of stock. Your system says he has plenty. Both are guessing.',
    'Your current DMS cannot do your slab scheme, so it lives in a spreadsheet on the side.',
    'Every new sales rep you hire means another seat on a monthly bill.',
]

/** The distribution chain — explains primary / secondary / tertiary sales. */
export const CHAIN = [
    {
        stage: 'Brand',
        sale: 'Primary sale',
        body: 'You bill the distributor or super stockist. The number your ERP already knows.',
    },
    {
        stage: 'Distributor',
        sale: 'Secondary sale',
        body: 'The distributor bills retailers. This is where most brands go blind, and what a DMS exists to capture.',
    },
    {
        stage: 'Retailer',
        sale: 'Tertiary sale',
        body: 'The shop sells to the customer. You see it through orders, returns and reorder patterns.',
    },
    {
        stage: 'Your dashboard',
        sale: 'One view',
        body: 'Stock, sales and money at every level, as it happens rather than at month end.',
    },
]

/** Distributor vs distribution management — both terms get searched. */
export const DMS_VS_DISTRIBUTION: { point: string; distributor: string; distribution: string }[] = [
    {
        point: 'Focus',
        distributor: 'Your relationship with each distributor — stock, billing, schemes, claims.',
        distribution: 'The whole route to market — distributors, field team, retailers, logistics.',
    },
    {
        point: 'Main users',
        distributor: 'Distributors, their billing staff, your sales ops team.',
        distribution: 'Everyone above, plus field reps, area managers and leadership.',
    },
    {
        point: 'Usually includes',
        distributor: 'Inventory, secondary billing, scheme and claim management, collections.',
        distribution: 'A DMS plus sales force automation, retailer ordering and analytics.',
    },
]

/** Core modules. Each replaces a specific manual habit. */
export const MODULES = [
    {
        title: 'Purchase orders and GRN',
        body: 'Distributor raises a PO to you, you dispatch, they confirm receipt against it. Shortages and damages recorded at the door, not argued about later.',
        replaces: 'Replaces: POs on WhatsApp, receipts on paper.',
    },
    {
        title: 'Distributor inventory',
        body: 'Live stock at every distributor, by SKU, batch and expiry. Near-expiry stock flagged before it becomes a return.',
        replaces: 'Replaces: calling the distributor to ask.',
    },
    {
        title: 'Secondary billing',
        body: 'Distributor bills retailers from the DMS itself — GST invoice, e-invoice, e-way bill — so every secondary sale is captured the moment it happens.',
        replaces: 'Replaces: the Monday Excel sheet.',
    },
    {
        title: 'Schemes and claims',
        body: 'Slab discounts, quantity schemes, free goods, display schemes, region-specific offers. Applied on the bill, claimed back to you automatically, proof attached.',
        replaces: 'Replaces: the quarterly claim reconciliation.',
    },
    {
        title: 'Retailer credit and collections',
        body: 'Credit limits per retailer, outstanding by age, collections recorded in the field by UPI or cash, and a hold when a shop crosses its limit.',
        replaces: 'Replaces: a ledger and somebody’s memory.',
    },
    {
        title: 'Field sales app',
        body: 'Beat plans, retailer visits with location check-in, order taking against live distributor stock. Works offline.',
        replaces: 'Replaces: order books and phone calls.',
    },
    {
        title: 'Returns and damages',
        body: 'Expired, damaged, wrong item — logged with a reason, credited correctly, visible to you so a pattern shows up before it becomes a habit.',
        replaces: 'Replaces: a pile in the corner of the godown.',
    },
    {
        title: 'Dashboards for each role',
        body: 'The brand sees the whole network. An area manager sees a territory. A distributor sees their own business. Same data, different doors.',
        replaces: 'Replaces: MIS reports built by hand.',
    },
]

/** Problem → today → with a DMS. Captures "why do I need a DMS" intent. */
export const PROBLEMS: { problem: string; today: string; withDms: string }[] = [
    {
        problem: 'No secondary sales data',
        today: 'You plan production on what you billed distributors, then find stock stuck in their godowns.',
        withDms: 'You plan on what actually reached shops.',
    },
    {
        problem: 'Scheme leakage',
        today: 'Discounts given that should not have been. Claims paid that nobody can verify.',
        withDms: 'Schemes apply by rule on the bill. Claims arrive with the invoices behind them.',
    },
    {
        problem: 'Stock-outs at the retailer',
        today: 'The shop runs out, the distributor had it, nobody connected the two.',
        withDms: 'Reps order against live stock. Low stock at a distributor triggers a reorder.',
    },
    {
        problem: 'Expiry write-offs',
        today: 'Old batches sit at the back while new ones get sold first.',
        withDms: 'Batch and expiry tracked. Near-expiry stock flagged while it can still move.',
    },
    {
        problem: 'Slow collections',
        today: 'Outstanding is a number someone calculates at month end.',
        withDms: 'Aged outstanding per retailer, live. Credit holds that enforce themselves.',
    },
    {
        problem: 'A field team you cannot see',
        today: 'Visits reported at the end of the day, from memory.',
        withDms: 'Check-ins with location, orders with timestamps, beats you can actually review.',
    },
]

/** Industry-specific rules. The details are where a generic DMS breaks. */
export const INDUSTRIES: { industry: string; rule: string }[] = [
    {
        industry: 'FMCG',
        rule: 'Thousands of small retailers, small drop sizes, van sales, and schemes that change every month.',
    },
    {
        industry: 'Pharma',
        rule: 'Batch and expiry on every line, drug licence numbers on invoices, near-expiry returns, recall by batch.',
    },
    {
        industry: 'Paints and building materials',
        rule: 'Dealer credit limits, project pricing, and tinted or cut-to-size items that are not a simple SKU.',
    },
    {
        industry: 'Agri inputs',
        rule: 'Seasonal credit — goods out before kharif or rabi, money back after harvest — and dues tracked across months.',
    },
    {
        industry: 'Consumer electronics',
        rule: 'Serial numbers on every unit, warranty registration at sale, service returns kept apart from sales returns.',
    },
    {
        industry: 'Beverages',
        rule: 'Returnable crates and glass, deposits per retailer, and a summer peak that doubles the beat overnight.',
    },
    {
        industry: 'Auto spares',
        rule: 'Tens of thousands of part numbers, fitment by vehicle model, and mechanics buying on credit.',
    },
]

/** Rented DMS vs custom — the decision the page is built around. */
export const COMPARISON: { point: string; rented: string; nexona: string }[] = [
    {
        point: 'What you pay',
        rented: 'Per distributor, per rep, per month. Grows every time you grow. Never stops.',
        nexona: 'Paid to build. Then it is yours — no seat count, no annual rent.',
    },
    {
        point: 'Your schemes',
        rented: 'Whatever scheme types the product supports. The rest go to Excel.',
        nexona: 'Your exact slab, region and free-goods logic, applied on the bill.',
    },
    {
        point: 'Integrations',
        rented: 'Standard connectors. Anything else is a paid customisation, if they agree to it.',
        nexona: 'Built to talk to your Tally, SAP or ERP from day one.',
    },
    {
        point: 'Changes',
        rented: 'Raise a ticket. Join the queue behind every other customer.',
        nexona: 'Tell us. Small things land in days.',
    },
    {
        point: 'Your data',
        rented: 'Lives on their platform. Exports on their terms.',
        nexona: 'Your database, your retailer list, your code.',
    },
    {
        point: 'Adding distributors',
        rented: 'Each one is another licence.',
        nexona: 'Onboard as many as you have. Nobody bills you per head.',
    },
    {
        point: 'Best for',
        rented: 'A small network with standard schemes. Honestly.',
        nexona: 'A growing network, unusual schemes, or a bill that keeps climbing.',
    },
]

/** Systems we connect the DMS to. Named specifically on purpose. */
export const INTEGRATIONS = [
    'Tally Prime',
    'Busy',
    'Marg ERP',
    'Zoho Books',
    'SAP Business One',
    'SAP S/4HANA',
    'GST e-invoice (IRP)',
    'E-way bill',
    'WhatsApp ordering',
    'UPI and payment gateways',
    'Your existing ERP, via API',
]

/** How a build goes live. Staged, never big-bang. */
export const ROLLOUT = [
    {
        title: 'Discovery',
        body: 'We sit with your sales ops team and two or three distributors. We map your schemes, your billing, your claim process — the real one, not the one in the SOP document.',
    },
    {
        title: 'First working module',
        body: 'Usually distributor stock and secondary billing, because that is where the blindness is. Software you can click through, early.',
    },
    {
        title: 'Pilot with three to five distributors',
        body: 'One friendly distributor, one busy one, and one who hates change. If it works for the third, it works.',
    },
    {
        title: 'Rollout in waves',
        body: 'Region by region. Schemes, claims and the field app come in as distributors settle. The old process runs alongside until nobody opens it.',
    },
]

/** Adoption — the reason most DMS rollouts fail, and nobody else writes about. */
export const ADOPTION = [
    {
        title: 'Their language',
        body: 'Screens in Hindi, Marathi, Tamil — whatever your distributors and reps actually read.',
    },
    {
        title: 'Cheap phones, bad signal',
        body: 'Built for a three-year-old Android with 2GB of RAM, in a shop with no network.',
    },
    {
        title: 'Fewer taps than paper',
        body: 'If billing takes longer than the old way, the distributor goes back to the old way. So it does not.',
    },
    {
        title: 'Something in it for them',
        body: 'Faster claim settlement, clear outstanding, their own stock view. Distributors adopt what helps them. Not what helps you.',
    },
]

/** Checklist for choosing any DMS — useful whoever they pick. */
export const CHECKLIST = [
    'Can it handle every scheme you ran last year, without a spreadsheet on the side?',
    'Does it track batch and expiry, not just quantity?',
    'Does it sync with the accounting software your distributors already use?',
    'Can distributors bill retailers from it, with GST e-invoicing?',
    'Does the field app work offline?',
    'Will it run on the phones your reps actually carry?',
    'Are claims raised automatically, with invoices attached?',
    'Can you set credit limits per retailer and have them enforced?',
    'Does each role — brand, manager, distributor — see only what it should?',
    'What does it cost in year three, with the number of distributors and reps you plan to have?',
    'Can you export all your data, in a usable format, whenever you want?',
    'Who changes it when your scheme structure changes next quarter, and how long do they take?',
]

/** What drives the cost of a custom DMS. No figures — ever. */
export const COST_DRIVERS = [
    {
        title: 'How many modules',
        body: 'Stock and billing alone is one project. Add schemes, claims, a field app and retailer ordering and it is a bigger one.',
    },
    {
        title: 'Scheme complexity',
        body: 'A flat discount is simple. Stacked slab schemes that differ by region and retailer class take real work.',
    },
    {
        title: 'Integrations',
        body: 'One Tally sync is straightforward. Tally at distributors plus SAP at head office plus e-invoicing is three jobs.',
    },
    {
        title: 'Offline and multilingual',
        body: 'Offline sync and regional languages add effort up front — and save the rollout later.',
    },
]

/** Real Nexona work with the same building blocks a DMS needs. Keep these
 *  matched to what the projects actually delivered — no DMS client yet. */
export const PROOF = [
    {
        title: 'Multi-tenant platform with role-based access',
        href: '/projects/multi-tenant-chat',
        body: 'Full data isolation between organisations and a three-level role hierarchy. A DMS has exactly that shape — brand, distributor, rep, each seeing only their own slice.',
    },
    {
        title: 'Sales and rental system',
        href: '/projects/froven',
        body: 'For Froven, a commercial refrigeration business. Rentals mean stock sitting at someone else’s site instead of your own — the same problem a DMS solves for distributor stock.',
    },
    {
        title: 'Sales tracking and follow-up engine',
        href: '/projects/automated-crm',
        body: 'A lead and order tracker that flags accounts going cold and follows up on its own. The same logic finds retailers who have quietly stopped ordering.',
    },
    {
        title: 'Profit dashboards',
        href: '/projects/profit-dashboard',
        body: 'Sales, spend and bank data pulled into one daily view. The reporting layer of a DMS is built the same way.',
    },
]
