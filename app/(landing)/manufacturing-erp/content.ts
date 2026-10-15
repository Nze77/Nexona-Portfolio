export interface FaqItem {
    question: string
    answer: string
}

// Public starting price for this page only — the user asked for it explicitly
// (2026-10-15). Every other landing page stays price-free. Keep this in step
// with `startingPrice` on the manufacturing-erp entry in landingPages.ts,
// which feeds the Offer schema.
export const STARTING_PRICE = '₹70,000'

// FAQ doubles as FAQPage structured data, so every answer opens with the actual
// answer — the rest is explanation for whoever keeps reading.
export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'How much does custom manufacturing ERP software cost in India?',
        answer: `Ours start at ${STARTING_PRICE} in development cost, and that covers every module — production planning, BOM, inventory, purchase, sales and dispatch, quality, job work, maintenance, costing, GST accounts, reports. Web and phone. No per-user licence on top. What moves the number past that is more plants, machine and hardware connections, unusual process logic, and how messy the data coming across is. We scope it, then quote before we start.`,
    },
    {
        question: 'How long does it take to build a manufacturing ERP?',
        answer: 'The first module is usually live in four to six weeks. A full plant ERP — production, inventory, purchase, quality, dispatch, accounts — takes three to six months, and it arrives in stages, not all at once. Your team is using real screens from the first month. Big-bang go-lives are how factories end up running two systems side by side and trusting neither.',
    },
    {
        question: 'Custom ERP or ERPNext / Odoo — which is better for a manufacturer?',
        answer: 'ERPNext or Odoo, if your factory already works the way they expect and you can live with their screens. Plenty of plants can. If yours cannot, you end up paying a partner to customise a product, and those customisations are the first thing to break on the next version upgrade. Custom wins when your process is the reason you win orders — odd routings, job work, batch rules, costing nobody else does quite like you.',
    },
    {
        question: 'Do you customise Odoo or ERPNext, or build from scratch?',
        answer: 'From scratch. Every screen, table and report is written for your plant. We do not resell or configure a template. If we look at your process and think Odoo or ERPNext would genuinely do the job, we will say so on the first call — it saves us both a few months.',
    },
    {
        question: 'Does your ERP integrate with Tally?',
        answer: 'Yes. Most clients keep accounts in Tally Prime, so the ERP syncs masters, sales and purchase vouchers, and stock journals into it — your accountant does not have to change anything. If you would rather move accounts into the ERP itself, we can do that too. Your call.',
    },
    {
        question: 'Does it handle GST e-invoicing and e-way bills?',
        answer: 'Yes. E-invoices go to the IRP and come back with the IRN and QR code, straight from the dispatch screen. E-way bills come off the same data, so nobody types a vehicle number twice. GSTR-1 and 3B summaries are ready at month end instead of being rebuilt from Excel.',
    },
    {
        question: 'Can the ERP connect to our machines or PLCs?',
        answer: 'Usually, yes. Newer machines and PLCs talk OPC UA, Modbus or MQTT, and a small gateway on the floor sends counts, run time and downtime into the ERP. A twenty-year-old press with no port gets a cheap counter sensor — or a tablet next to it where the operator taps a button. Not every machine needs to be wired. The bottleneck ones do.',
    },
    {
        question: 'Do you build MES software for the shop floor?',
        answer: 'Yes — as part of the ERP or on its own. Digital job cards, machine-wise output, downtime with reason codes, rejection and scrap, shift reports, OEE. Operators log in with a QR badge on a shared tablet, because nobody on the floor is remembering a password.',
    },
    {
        question: 'Cloud or on-premise — which is better for a factory?',
        answer: 'Cloud for most plants. Nothing to maintain, and the owner can check dispatch from the car. If the internet at the plant drops every afternoon — it happens more than people admit — we put a local server on site that keeps working offline and syncs to the cloud when the line comes back.',
    },
    {
        question: 'Does your manufacturing ERP work on mobile?',
        answer: 'Yes — phone, tablet, desktop, and it installs as an app if you want it on a home screen. Your floor supervisor does not sit at a desktop. They are next to a machine with oily hands and a phone in their pocket, and if the software only lives in the office, it gets written on paper and typed in later. Badly.',
    },
    {
        question: 'Can you replace our Tally or spreadsheets without losing data?',
        answer: 'Yes. Item masters, BOMs, stock, vendors, customers, open orders — it all comes across, and the old way runs alongside for a couple of weeks while people settle. Almost everyone comes to us from spreadsheets, Tally, or an ERP they bought once and quietly stopped using.',
    },
    {
        question: 'What modules should a manufacturing ERP have?',
        answer: 'Production planning, BOM and MRP, live inventory, purchase, sales and dispatch, quality, job work, maintenance, costing, GST-ready accounts, roles, and reports that answer a question. That is the spine. Past that it depends on what you make and how — and you will not need all of it on day one.',
    },
    {
        question: 'Which industries do you build ERP for?',
        answer: 'Engineering and fabrication, pharma, food processing, chemicals, textiles, packaging, plastics and moulding, auto components. The bones of a factory are the same everywhere. The details are not — a pharma batch record and a fabrication job card have almost nothing in common, which is the whole argument for building it to fit.',
    },
    {
        question: 'Do we own the source code?',
        answer: 'Yes. The code, the database, the documentation — yours. Host it where you like, hand it to another developer later if you want. You are not renting your own software.',
    },
    {
        question: 'Do you work with factories outside Mumbai?',
        answer: 'Yes. We are Mumbai-based and come to plants across Thane, Bhiwandi, Navi Mumbai, Vasai and Palghar. Elsewhere in India — Pune, Gujarat, further — we work remotely and usually come on site for discovery and go-live.',
    },
    {
        question: 'What happens after go-live?',
        answer: 'We stay on. Fixes, small changes, new reports — the little things that turn up once people actually use it. Small changes land in days, not quarters. And when you add a line, a plant or a product, the system was built to be extended, not frozen.',
    },
]

/** Hero quick-facts — the four things buyers scan for before reading anything. */
export const HERO_FACTS = [
    { value: `From ${STARTING_PRICE}`, label: 'all modules included' },
    { value: '4–6 weeks', label: 'to your first live module' },
    { value: 'Tally + GST', label: 'built in, not bolted on' },
    { value: 'You own it', label: 'source code and data' },
]

/** What moves the price up from the starting figure. Modules are NOT a driver:
 *  the starting price covers all of them (user-confirmed 2026-10-15). */
export const COST_DRIVERS = [
    {
        title: 'More than one plant',
        body: 'Stock transfers between locations, per-plant costing, who approves what where.',
    },
    {
        title: 'Machines and hardware',
        body: 'PLCs, counters, weighbridges, label printers on the floor. Each connection is real work.',
    },
    {
        title: 'Unusual process logic',
        body: 'A costing method, routing or approval chain nobody else uses. Fine — it just takes longer to build.',
    },
    {
        title: 'The state of your data',
        body: 'Clean item masters move in a day. Eleven spreadsheets with three spellings of every part take longer.',
    },
]

/** Typical build timeline. */
export const TIMELINE = [
    { phase: 'Discovery at your plant', time: '1–2 weeks' },
    { phase: 'First module live', time: '4–6 weeks' },
    { phase: 'Parallel run with the old way', time: '2–3 weeks' },
    { phase: 'Full plant ERP, in stages', time: '3–6 months' },
]

/** Signals a manufacturer has outgrown spreadsheets or a boxed ERP. */
export const SIGNALS = [
    'Nobody knows the real stock until somebody walks the floor and counts it.',
    'The production plan is a spreadsheet. One person maintains it. Pray they do not resign.',
    'Dispatch slips and you find out when the customer calls, not before.',
    'The same entry goes into the ERP and then into Excel, because the ERP report is unreadable.',
    'You pay for an ERP — Odoo, ERPNext, something older — that your team politely works around.',
    'Ask what a finished job cost and you get an estimate, delivered slowly.',
]

/** Custom vs ERPNext/Odoo/boxed — the comparison buyers run before they enquire. */
export const COMPARISON: { point: string; boxed: string; nexona: string }[] = [
    {
        point: 'Fit to your process',
        boxed: 'Your team changes how it works to suit the product.',
        nexona: 'Built around how your plant already runs.',
    },
    {
        point: 'Licence',
        boxed: 'Odoo Enterprise and most boxed ERPs bill per user, every year. ERPNext is free — the partner and the hosting are not.',
        nexona: `Every module from ${STARTING_PRICE}. No per-user fee. Hire freely.`,
    },
    {
        point: 'Customisation',
        boxed: 'Done on top of someone else’s product. Version upgrades break it.',
        nexona: 'There is nothing to break — the whole thing is yours.',
    },
    {
        point: 'Making a change',
        boxed: 'Raise a ticket with the partner. Wait. Pay.',
        nexona: 'Tell us. Small things land in days.',
    },
    {
        point: 'On the shop floor',
        boxed: 'Desktop screens squeezed onto a phone.',
        nexona: 'Designed for a tablet at the machine first.',
    },
    {
        point: 'Going live',
        boxed: 'Long setup, then a big-bang switch that stalls the plant.',
        nexona: 'Start where it hurts. Add the rest once people trust it.',
    },
    {
        point: 'Ownership',
        boxed: 'You rent access. Stop paying, it goes away.',
        nexona: 'You own the code and the data.',
    },
]

/** The modules a manufacturing ERP genuinely needs. */
export const FEATURES = [
    {
        title: 'Production planning',
        body: 'What to make, when, on which machine. Against real orders and real capacity, not a wish.',
    },
    {
        title: 'BOM and MRP',
        body: 'Multi-level bills of material, and the raw material you need to order for next week’s plan — worked out, not guessed.',
    },
    {
        title: 'Inventory in real time',
        body: 'Raw material, WIP, finished goods, by location and by batch. You stop counting to find out what you have.',
    },
    {
        title: 'Purchase and vendors',
        body: 'Indents, POs, GRNs, what is due, supplier rates and history. In one place instead of one inbox.',
    },
    {
        title: 'Sales and dispatch',
        body: 'Quote to order to packing list to truck, with the status your customer keeps ringing about.',
    },
    {
        title: 'Quality checks',
        body: 'Incoming, in-process, final. Catch it before it ships, not after it comes back.',
    },
    {
        title: 'Job work and outsourcing',
        body: 'Material sent out under challan, material returned. Nothing quietly disappearing at a vendor for three months.',
    },
    {
        title: 'Machine and maintenance',
        body: 'What is running, what is down, what is due for service. Before it stops mid-shift.',
    },
    {
        title: 'Costing',
        body: 'What the job actually cost — material, labour, machine hours, overhead. Price on fact, not on feel.',
    },
    {
        title: 'GST-ready accounts',
        body: 'Invoices, e-invoices, e-way bills, returns. Indian rules, built in, not reconciled at month end.',
    },
    {
        title: 'Roles and approvals',
        body: 'People see their work. Approvals sit with whoever should be approving.',
    },
    {
        title: 'Reports that answer questions',
        body: 'Orders, stock, delays, margins. Plain. For deciding something, not for framing.',
    },
]

/** MES — shop-floor execution, for the "MES software development" cluster. */
export const MES_ITEMS = [
    'Digital job cards — no more paper travelling with the material',
    'Machine-wise output, entered at the machine or counted automatically',
    'Downtime with a reason code, so “machine was down” becomes “die change, 40 minutes”',
    'Rejection and scrap logged against the job, the shift and the operator',
    'OEE per machine, per shift, without a spreadsheet',
    'QR badge login on a shared tablet — nobody on the floor remembers a password',
]

/** Integrations — the "will it work with what we have" question. */
export const INTEGRATIONS = [
    {
        title: 'Tally Prime',
        body: 'Masters, sales and purchase vouchers, stock journals synced in. Accounts keeps working in Tally.',
    },
    {
        title: 'GST e-invoice and e-way bill',
        body: 'IRN and QR code from the dispatch screen. E-way bill off the same data.',
    },
    {
        title: 'Machines and PLCs',
        body: 'OPC UA, Modbus or MQTT through a small gateway. Counts, run time and downtime, live.',
    },
    {
        title: 'Barcode and QR',
        body: 'Labels on every bag, roll and pallet. Scan at GRN, issue, and dispatch.',
    },
    {
        title: 'Weighbridges and scales',
        body: 'Weight goes straight into the GRN or the dispatch note. No handwritten slip.',
    },
    {
        title: 'WhatsApp',
        body: 'Order confirmations, dispatch updates and approval requests where people actually look.',
    },
    {
        title: 'Biometric attendance',
        body: 'Punches pulled in for shift planning and labour costing.',
    },
    {
        title: 'Excel and old systems',
        body: 'One-time migration, or a regular import if a supplier only sends spreadsheets.',
    },
]

/** Reasons Nexona's approach beats a boxed ERP product. */
export const WHY_BETTER = [
    {
        title: 'Built from scratch',
        body: 'Not an Odoo template with your logo on it. Every screen is written for your plant.',
    },
    {
        title: 'Works on the floor',
        body: 'Phone in the plant, tablet at the gate, desktop in accounts. Same live data on all of them.',
    },
    {
        title: 'App and web app',
        body: 'Open it in a browser, install nothing. Or put it on a home screen — Android, iOS, desktop.',
    },
    {
        title: 'Short training',
        body: 'We build the flow your people already know. There is not much to learn. That is the point.',
    },
    {
        title: 'No per-user fee',
        body: 'Hire forty more people. The bill does not change.',
    },
    {
        title: 'It can grow',
        body: 'Add a plant, a line, a product. It was built to be changed, not frozen on go-live day.',
    },
]

/** How a build runs. */
export const PROCESS = [
    {
        title: 'We walk your plant',
        body: 'Gate to dispatch. We watch how material actually moves, and read the registers people keep in a drawer.',
    },
    {
        title: 'Pick the thing that hurts most',
        body: 'Usually inventory, sometimes production planning. That becomes module one.',
    },
    {
        title: 'Module one goes live',
        body: 'Four to six weeks in. Your team uses it for real, and tells us what is wrong with it.',
    },
    {
        title: 'Run it alongside the old way',
        body: 'Two or three weeks of both. When the numbers match, the old register goes in a cupboard.',
    },
    {
        title: 'Add the rest, one at a time',
        body: 'Production, quality, dispatch, accounts — each one lands on a system people already trust.',
    },
]

/** Worked examples — illustrative build shapes, NOT client case studies.
 *  There are no published manufacturing case studies yet; nothing here may be
 *  presented as a named client or an achieved result. */
export const EXAMPLES = [
    {
        tag: 'Fabrication job shop',
        title: 'Job cards and costing for a 60-person shop',
        problem: 'Every job is different. Quotes come from the owner’s memory. Nobody knows what the last order actually cost until the CA closes the books.',
        build: 'Job cards with routing per order, machine-hour and material booking from a tablet, job-wise costing against the quote, Tally sync for invoicing.',
        first: 'First live: job cards and material issue.',
    },
    {
        tag: 'Pharma / chemicals',
        title: 'Batch records and QC for a formulation plant',
        problem: 'Batch manufacturing records on paper, QC results in a separate register, and an auditor who wants both cross-referenced by Thursday.',
        build: 'Batch-wise BOM with yield, digital BMR, QC approval before release, expiry and lot traceability from raw material to dispatch.',
        first: 'First live: batch-wise inventory with QC hold.',
    },
    {
        tag: 'Plastics moulding',
        title: 'Machine-connected MES for 14 moulding machines',
        problem: 'The plan says 12,000 pieces. The shift says 9,800. Nobody can say where the other 2,200 went — downtime, rejection, or a mould change that ran long.',
        build: 'Shot counts from the machines, downtime with reason codes, rejection by cavity, OEE per shift, and a production plan that reads all of it.',
        first: 'First live: machine counts and downtime logging.',
    },
]

/** Industries — long-tail intent, and proof we understand the differences. */
export const INDUSTRIES = [
    { name: 'Engineering & fabrication', note: 'Job cards, routings, job-wise costing' },
    { name: 'Pharma', note: 'Batch records, QC release, lot traceability' },
    { name: 'Food processing', note: 'Recipes, shelf life, FSSAI batch tracking' },
    { name: 'Chemicals', note: 'Batch yield, hazardous stock, process loss' },
    { name: 'Textiles', note: 'Lot and shade tracking, job work at processors' },
    { name: 'Packaging', note: 'Size-wise BOMs, reel and sheet stock' },
    { name: 'Plastics & moulding', note: 'Mould life, cavity rejection, machine counts' },
    { name: 'Auto components', note: 'Customer schedules, PPAP, heat-number tracing' },
]
