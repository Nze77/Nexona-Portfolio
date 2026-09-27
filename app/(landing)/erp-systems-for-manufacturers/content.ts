export interface FaqItem {
    question: string
    answer: string
}

// Copy for this page lives here so page.tsx stays about layout. Two rules hold
// across all of it:
//   • No price figures, anywhere. Cost is answered with what drives it.
//   • Nothing claims past manufacturing clients. Industries are ones we build
//     for, belts are where those industries sit — capability, not track record.

/** Jump links under the hero. Ids must match the section ids in page.tsx. */
export const TOC = [
    { id: 'what-is-manufacturing-erp', label: 'What it is' },
    { id: 'signs-you-need-erp', label: 'Signs you need it' },
    { id: 'erp-modules-for-manufacturing', label: 'Modules' },
    { id: 'gst-ready-erp', label: 'GST' },
    { id: 'erp-by-industry', label: 'Industries' },
    { id: 'mumbai-industrial-belts', label: 'Mumbai belts' },
    { id: 'erp-comparison', label: 'Tally vs ERP' },
    { id: 'erp-implementation', label: 'Implementation' },
    { id: 'erp-cost-india', label: 'Cost' },
    { id: 'faq', label: 'FAQ' },
]

export const SIGNS = [
    {
        title: 'Stock in Tally never matches the rack',
        body: 'Someone walks the godown every Saturday with a clipboard. The count is off again. Nobody can say whether it was a wrong issue slip, a return that never got booked, or material that went out to a job-worker on a handwritten challan.',
    },
    {
        title: 'Production planning lives in one person’s head',
        body: 'Usually the planner who has been there eleven years. On leave, the schedule is a guess. Gone for good — well, you find out how much of the factory ran on one memory.',
    },
    {
        title: 'Three people, three answers',
        body: 'Sales says the order ships Friday. Stores says the raw material has not arrived. Production has not heard of the order at all. Each of them is reading a different spreadsheet, and each spreadsheet is correct about something.',
    },
    {
        title: 'Month-end takes a week',
        body: 'Accounts spends the first five working days reconciling purchase bills against GRNs against GSTR-2B. Costing per order? Nobody knows it until the quarter is over, which is too late to fix the price.',
    },
    {
        title: 'The ERP you bought is now a very expensive invoice printer',
        body: 'It went live. People used it for a month. Now it prints invoices and everything else runs on Excel next to it. That side spreadsheet is the tell — if the team works around the system, the system does not fit.',
    },
]

/** H3 titles are the search terms people actually use for each module. */
export const MODULES = [
    {
        title: 'Production Planning Software',
        does: 'Plans runs against confirmed orders, material on hand, and machine capacity — in one view.',
        changes: 'You commit to a delivery date knowing the steel is actually in stores. Not hoping.',
    },
    {
        title: 'Production Management & Monitoring',
        does: 'Job cards, routing, and output logged at each stage from a phone on the floor.',
        changes: 'A stalled operation shows up at 11 a.m., not at the evening call.',
    },
    {
        title: 'Manufacturing Inventory Management',
        does: 'Raw material, WIP, and finished goods tracked live across every godown and every job-worker.',
        changes: 'The Saturday stock count becomes a spot check rather than an investigation.',
    },
    {
        title: 'BOM Management',
        does: 'Multi-level, version-controlled bills of materials with approved alternates.',
        changes: 'Production always pulls the current revision. The old drawing stops reaching the floor.',
    },
    {
        title: 'Purchase & Procurement',
        does: 'Requisition, vendor comparison, PO, GRN, and bill matching on one approval path.',
        changes: 'The panic purchase at retail rates — the one nobody approved — mostly stops.',
    },
    {
        title: 'Quality Management',
        does: 'Incoming, in-process, and final inspection, with rejections tied to vendor and batch.',
        changes: 'You can see which supplier sends the bad lots. With numbers, not a feeling.',
    },
    {
        title: 'Sales, Orders & Dispatch',
        does: 'Enquiry to quote to order to dispatch, with the invoice and e-way bill raised off the same record.',
        changes: 'Sales answers “where is my order” without calling the plant.',
    },
    {
        title: 'Job Work & Subcontracting',
        does: 'Material sent out, processed, and received back — tracked per job-worker, per challan.',
        changes: 'Goods at the plating vendor stay on your books instead of vanishing into a register.',
    },
    {
        title: 'Costing & Finance',
        does: 'Actual material, labour, and overhead booked against each order or batch. GST-ready accounts.',
        changes: 'You find out which orders made money this month, not next quarter.',
    },
    {
        title: 'Maintenance, HR & Reports',
        does: 'Preventive maintenance schedules, attendance and shifts, and dashboards per role.',
        changes: 'The CNC gets serviced before it quits. The owner reads one screen instead of six WhatsApp groups.',
    },
]

export const GST_ITEMS = [
    {
        title: 'e-Invoicing and IRN',
        body: 'Invoices go to the IRP and come back with the IRN and signed QR code before they print. No re-keying into a portal.',
    },
    {
        title: 'e-Way bills from the dispatch entry',
        body: 'Vehicle number, distance, consignee — already in the dispatch record, so the e-way bill generates off it. Part-B updates when the truck changes.',
    },
    {
        title: 'GSTR-2B reconciliation',
        body: 'Purchase bills matched against 2B each month, with mismatches listed by vendor. Accounts chases three suppliers instead of checking three hundred bills.',
    },
    {
        title: 'Audit trail and role-based access',
        body: 'Every edit logged with who, when, and what changed. Stores sees stock, accounts sees ledgers, and nobody quietly edits a posted invoice.',
    },
]

/**
 * Ordered by search demand. Pharma and chemicals are one line of business for
 * us but two H3s, because they are two separate searches.
 */
export const INDUSTRIES = [
    {
        title: 'ERP for Pharma Industry',
        body: [
            'Pharma ERP software lives or dies on batch genealogy. Which API lot went into batch 24B117, who released it, which distributor got it. With that on file, a recall is a query. Without it — a week in the record room.',
            'The system holds batch manufacturing records, line clearance, deviations and CAPA, expiry and retest dates, and FEFO dispatch so the oldest stock leaves first. QC release gates dispatch: a batch that has not been approved cannot be invoiced. The audit trail is generated as the work happens, which is the only way it is ever ready when the inspector arrives.',
        ],
    },
    {
        title: 'ERP for Chemical Industry',
        body: [
            'Formulas are version-locked. A revised recipe does not reach the reactor until someone with the authority approves it, and the old version stays on file with the date it was retired.',
            'Planning reads reactor and tank capacity, so the schedule stays honest when a batch cycle runs four hours longer than sales assumed. Hazardous storage, MSDS references, yield against standard per batch, and by-product tracking sit in the same record.',
        ],
    },
    {
        title: 'ERP for Textile & Garment Industry',
        body: [
            'Colour × size × style breaks most generic systems. Here stock is held at the variant level, so a size-38 navy shirt never gets counted as a size-38 black one.',
            'Grey fabric out to the dyeing unit, back, out again to printing, then to stitching — each hop is a job-work challan with quantity in and quantity out, and the shrinkage in between shows up as a number. Powerloom lots from Bhiwandi get tracked by lot and quality, not dumped into one line called “fabric”.',
        ],
    },
    {
        title: 'ERP for Engineering & Industrial Machinery',
        body: [
            'Job cards, routing, and operation-wise tracking for make-to-order work. Multi-level BOMs with revisions, so the fabricator welds to the current drawing.',
            'Machining, plating, and heat treatment sent out to sub-contractors stays on your books, challan by challan. Costing runs per job card — material, machine hours, sub-contract — so you know whether that one-off gearbox housing made money or quietly didn’t.',
        ],
    },
    {
        title: 'ERP for Auto Component Manufacturers',
        body: [
            'OEM schedules and call-offs flow into production planning, so you build to the release, not to a guess. PPAP documents, first-article inspection, and control plans sit against each part number.',
            'Traceability runs from heat number or component lot to the delivered part. When a supplier audit lands — or a field failure comes back — the answer takes minutes.',
        ],
    },
]

/** Industry × must-have table. Short cell text on purpose; it scrolls on mobile. */
export const INDUSTRY_TABLE = {
    columns: ['Industry', 'Must-have', 'Where generic ERPs break'],
    rows: [
        ['Pharma', 'Batch genealogy, QC release, FEFO, expiry', 'Treat a batch like an item code'],
        ['Chemicals', 'Locked formulas, reactor capacity, yield', 'No recipe versioning'],
        ['Textiles & Garments', 'Variant matrix, multi-hop job work', 'One SKU per colour-size, thousands of them'],
        ['Engineering & Machinery', 'Job cards, routing, per-job costing', 'Built for repeat production, not one-offs'],
        ['Auto Components', 'OEM schedules, PPAP, lot traceability', 'Quality lives in a separate file'],
    ],
}

/**
 * Where these industries cluster around Mumbai. This is geography, not a
 * client list — keep it that way.
 */
export const BELTS = [
    { belt: 'Tarapur MIDC', industries: 'Chemicals, bulk drugs, textiles', handle: 'Batch genealogy, hazardous storage, effluent records' },
    { belt: 'Taloja MIDC', industries: 'Chemicals, pharma, engineering', handle: 'Formula control, QC release, reactor planning' },
    { belt: 'Thane-Belapur (Turbhe, Mahape, Rabale)', industries: 'Chemicals, pharma, engineering', handle: 'Batch records, multi-location stock' },
    { belt: 'Ambernath & Dombivli MIDC', industries: 'Chemicals, dyes, engineering', handle: 'Yield per batch, job work to nearby units' },
    { belt: 'Thane (Wagle Estate)', industries: 'Engineering, pharma', handle: 'Job cards, sub-contract tracking' },
    { belt: 'Bhiwandi', industries: 'Powerloom textiles, warehousing', handle: 'Lot tracking, multi-godown stock, e-way bills' },
    { belt: 'Vasai–Virar', industries: 'Engineering, auto components, plastics', handle: 'OEM schedules, PPAP, routing' },
    { belt: 'Andheri MIDC (Marol)', industries: 'Pharma, engineering', handle: 'Batch records, head-office consolidation' },
]

/** Honest comparison — packaged ERP genuinely wins some rows. */
export const COMPARISON = {
    columns: ['', 'Tally + Excel', 'Packaged ERP', 'Built-to-fit (Nexona)'],
    rows: [
        ['Fits your process', 'You fit around it', 'If your process matches theirs', 'Built around yours'],
        ['Time to first use', 'Already running', 'Fast for standard processes', 'First module live in weeks, rest in stages'],
        ['Shop floor on a phone', 'No', 'Often an add-on', 'Yes — phone, tablet, desktop'],
        ['Batch / job-work tracking', 'Registers and challans', 'Varies by product', 'Built for your flow'],
        ['e-Invoice and e-way bill', 'Partly', 'Usually', 'Yes, off the same transaction'],
        ['Adding a field or report', 'Another spreadsheet', 'Ticket to the vendor', 'Days, by the team that built it'],
        ['Who owns it', 'Licence', 'Licence, often per user', 'You own the code'],
    ],
}

export const CHOOSE = [
    { title: 'Industry fit', desc: 'batch control for pharma, variant stock for textiles, job cards for engineering — ask to see yours, not the demo company’s.' },
    { title: 'People who can reach your floor', desc: 'a partner who walks the plant before scoping, not a helpline in another time zone.' },
    { title: 'GST built in, not bolted on', desc: 'e-invoice, e-way bill and 2B reconciliation working off the same transaction.' },
    { title: 'The floor supervisor test', desc: 'hand the phone app to the person with oily hands at the machine. If they will not use it, nothing upstream will be accurate.' },
    { title: 'Room to grow', desc: 'a second plant, a new product line, a job-worker in Gujarat — without re-implementing.' },
]

/** Week ranges are the plan for a single-plant rollout, not a historical average. */
export const IMPLEMENTATION = [
    { num: '01', weeks: 'Weeks 1–2', title: 'Plant walkthrough & discovery', desc: 'We walk the floor, stores, and accounts. Every register, every WhatsApp group that passes for a process, gets written down.' },
    { num: '02', weeks: 'Weeks 2–3', title: 'Workflow blueprint', desc: 'Production flow, approval hierarchy, and the reports each person actually reads. Signed off before anything is built — that is what stops scope creep.' },
    { num: '03', weeks: 'Weeks 3–7', title: 'First module, live', desc: 'Usually inventory. It goes live on your real data and your team uses it daily while the rest is built.' },
    { num: '04', weeks: 'Weeks 6–9', title: 'Data migration', desc: 'Item masters, vendors, customers, open orders, and opening stock pulled from Tally and Excel, cleaned, and checked line by line.' },
    { num: '05', weeks: 'Weeks 8–14', title: 'Remaining modules & training', desc: 'Production, purchase, quality, costing — in the order that hurts most. Training happens on your own data, not a demo company.' },
    { num: '06', weeks: 'Weeks 12–16', title: 'Full go-live & 30-day tuning', desc: 'The same team stays on through go-live and the weeks after, fixing the small things only real use turns up.' },
]

export const MIGRATION = [
    'Item masters, BOMs, vendors, and customers from Tally or Excel',
    'Opening stock by location, including material at job-workers',
    'Open sales orders, open POs, and pending GRNs',
    'Tally can keep running for accounts while production moves over',
    'Integrations with your existing tools — weighbridge, biometric, e-commerce — scoped up front',
]

export const SEE_IT = [
    { title: 'Pilot first', body: 'One module goes live on your data before you commit to the rest. You judge it on your own stock and your own orders, which is the only test that matters.' },
    { title: 'You own the code', body: 'No per-user licence, no annual renewal on software you already paid to build. Add a plant or a product line and extend it.' },
    { title: 'Same team throughout', body: 'The people who walk your plant are the people who build it and the people who pick up the phone after go-live.' },
    { title: 'Assessment in writing', body: 'The 45-minute assessment ends with a written scope: modules, the order they go live in, and the timeline.' },
]

export const COST_DRIVERS = [
    { title: 'How many modules, in what order', body: 'Inventory alone is a different job from inventory, production, quality, and costing across two plants.' },
    { title: 'How messy the data is', body: 'Clean Tally masters migrate quickly. Eleven years of Excel with three spellings of every vendor takes longer.' },
    { title: 'Industry rules', body: 'Pharma batch records and audit trails are more work than a trading godown. Most of that is compliance, not code.' },
    { title: 'Integrations', body: 'Weighbridges, PLCs, biometric attendance, e-commerce orders — each one adds scope.' },
    { title: 'Cloud or on-premise', body: 'Changes who runs the servers, and so what support looks like after go-live.' },
]

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'What is manufacturing ERP software?',
        answer: 'One system that connects production, inventory, purchase, sales, quality, finance, and GST, so every department works off the same live numbers. It replaces the Tally-plus-Excel-plus-registers setup most plants run on, where each team trusts a different file.',
    },
    {
        question: 'Which ERP modules does a manufacturing company need?',
        answer: 'Production planning, inventory, BOM, purchase, quality, sales and dispatch, and GST-ready finance. That is the spine. Job work, costing, maintenance, and HR come next, depending on how you make things. Start with whichever hurts most — usually inventory.',
    },
    {
        question: 'What is the best ERP for manufacturers in Mumbai?',
        answer: 'The one that fits your process and has a team that can reach your plant. Pharma needs batch genealogy, textiles need variant-level stock, engineering needs job cards. Ask any vendor to show your flow on your data. If they can only show their demo company, that tells you something.',
    },
    {
        question: 'Is Tally an ERP?',
        answer: 'Tally is accounting and inventory software, and good at it. It does not plan production, run job cards, hold batch genealogy, or manage quality. Most manufacturers keep Tally for accounts and move production, stores, and planning into an ERP — the two can run side by side.',
    },
    {
        question: 'How long does ERP implementation take?',
        answer: 'A single-plant rollout is planned at 8 to 16 weeks. The first module goes live in the first few weeks, the rest follows in stages. Multi-plant setups and heavy data clean-up take longer. Big-bang go-lives are how factories end up running two systems and trusting neither.',
    },
    {
        question: 'Is cloud ERP good for manufacturing?',
        answer: 'For most Mumbai manufacturers, yes — lower upfront cost, access from the plant and the office, updates handled for you. On-premise makes sense if plant internet is unreliable or data has to stay on your own servers. We build for both.',
    },
    {
        question: 'Can you migrate our data from Tally or Excel?',
        answer: 'Yes. Item masters, BOMs, vendors, customers, open orders, and opening stock — including stock sitting at job-workers — come across, cleaned and checked. Tally can keep running for accounts while production moves over.',
    },
    {
        question: 'Do you build ERP for pharma, chemical, textile, engineering, and auto component manufacturers?',
        answer: 'Yes, those five. The bones of a factory are the same everywhere; the details are not. A pharma batch record and a fabrication job card have almost nothing in common, which is the whole argument for building the ERP around the plant rather than the other way round.',
    },
    {
        question: 'What decides ERP cost in India?',
        answer: 'Number of modules, how clean your existing data is, industry compliance (pharma is more work than trading), integrations like weighbridges or PLCs, and cloud versus on-premise. We scope first, then quote. Anyone quoting a figure before seeing your plant is guessing.',
    },
    {
        question: 'Do you come to the plant?',
        answer: 'Yes. Discovery starts with a walkthrough of the floor, stores, and accounts — Thane, Navi Mumbai, Taloja, Bhiwandi, Vasai, out to Tarapur. The software gets built around what we see there, not around a questionnaire.',
    },
    {
        question: 'What support is provided after go-live?',
        answer: 'The same team that built it, a named contact, and defined response times. The first 30 days after go-live are for tuning — the small fixes that only real use turns up. Get the support plan in writing before you sign, with us or anyone else.',
    },
]
