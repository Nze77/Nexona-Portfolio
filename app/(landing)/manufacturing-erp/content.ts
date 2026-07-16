export interface FaqItem {
    question: string
    answer: string
}

// FAQ doubles as FAQPage structured data, so every answer opens with the actual
// answer — the rest is explanation for whoever keeps reading.
export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'What is custom manufacturing ERP software?',
        answer: 'An ERP built around your factory instead of a product you bend to fit. Your process, your forms, the reports you actually read. Custom ERP for manufacturers covers the same ground as any other — production, inventory, purchase, quality, dispatch, GST — it just does it the way your plant already does it. No screens nobody opens.',
    },
    {
        question: 'Is custom ERP software affordable for a small manufacturer?',
        answer: 'Usually cheaper to own than a boxed one, yes. Sounds backwards. The boxed product charges you for every module in the bundle and every person who logs in, and that bill comes back every year whether you used the thing or not. We build the parts you need and stop. You are not renting your own software.',
    },
    {
        question: 'Custom ERP or off-the-shelf ERP — which is better for manufacturing?',
        answer: 'Off-the-shelf, if your factory already works the way the software thinks it should. Some do. If yours does not, you pay twice — once for the product, then again to make it behave — and your team still keeps a spreadsheet on the side. That spreadsheet is the tell. If people are working around the ERP, you have outgrown it.',
    },
    {
        question: 'Does your manufacturing ERP work on mobile?',
        answer: 'Yes — phone, tablet, desktop, and it installs as an app if you want it on a home screen. This matters more than it sounds. Your floor supervisor does not sit at a desktop. He is next to a machine with oily hands and a phone in his pocket, and if the software only lives in the office, he will write it on paper and someone will type it in later. Badly.',
    },
    {
        question: 'Why is Nexona better than older ERP systems?',
        answer: 'Newer technology, mostly. Most ERPs running in Indian factories today were designed when the browser was an afterthought — you can feel it in every page load. We build on modern tools, so screens are quick, the thing works on any device, and when you want a field added you are not filing a ticket with a vendor in another country and waiting two quarters.',
    },
    {
        question: 'How long does a custom ERP take to build?',
        answer: 'You see working software early, not at the end. We start with whatever hurts most — usually inventory, sometimes production planning — get that live, let your team use it. The rest comes in stages. Big-bang go-lives are how factories end up running two systems in parallel and trusting neither.',
    },
    {
        question: 'Can you replace our Tally or spreadsheets without losing data?',
        answer: 'Yes. Stock, item masters, vendors, customers, open orders — it all comes across, and the old way can run alongside while people settle. Almost everyone comes to us from spreadsheets, Tally, or an ERP they bought once and quietly stopped using.',
    },
    {
        question: 'What features should manufacturing ERP have?',
        answer: 'Production planning, live inventory, BOM, purchase, sales and dispatch, quality, job work, maintenance, costing, GST-ready accounts, roles, and reports that answer a question. That is the spine. Everything past that depends on what you make and how.',
    },
    {
        question: 'Do you build ERP for our industry?',
        answer: 'Engineering and fabrication, pharma, food, chemicals, textiles, packaging, plastics, auto components. The bones of a factory are the same everywhere. The details are not — a pharma batch record and a fabrication job card have almost nothing in common — which is the whole argument for building it to fit.',
    },
    {
        question: 'Do we own the software you build?',
        answer: 'You own it. Yours, shaped around your plant, extendable when you add a line or a location or a product nobody has thought of yet.',
    },
]

/** Reasons Nexona's approach beats a boxed ERP product. */
export const WHY_BETTER = [
    {
        title: 'Newer technology',
        body: 'Most ERPs were built when a browser was an afterthought. You can feel it — every click waits. We build on modern tools, so screens are quick and a change takes days.',
    },
    {
        title: 'Works on mobile',
        body: 'Your supervisor does not sit at a desktop. Phone in the plant, tablet at the gate, desktop in accounts, same live data on all of them.',
    },
    {
        title: 'App and web app',
        body: 'Open it in a browser, install nothing. Or put it on a home screen like any other app — Android, iOS, desktop. Your team decides.',
    },
    {
        title: 'Shaped to your factory',
        body: 'We build the flow your people already know. Training is short because there is not much to learn. That is the point.',
    },
    {
        title: 'Affordable to own',
        body: 'No modules you never open. No fee for every person you hire. You own what we build — it does not evaporate when you stop paying.',
    },
    {
        title: 'It can grow',
        body: 'Add a plant, a line, a product. It was built to be changed, not frozen on go-live day and slowly worked around.',
    },
]

/** The features a manufacturing ERP genuinely needs. */
export const FEATURES = [
    {
        title: 'Production planning',
        body: 'What to make, when, on which machine. Against real orders and real capacity, not a wish.',
    },
    {
        title: 'Inventory in real time',
        body: 'Raw material, WIP, finished goods. Live. You stop counting to find out what you have.',
    },
    {
        title: 'Bill of materials',
        body: 'Every product broken into parts, so material and cost are known before the job starts.',
    },
    {
        title: 'Purchase and vendors',
        body: 'POs, what is due, supplier rates and history. In one place instead of one inbox.',
    },
    {
        title: 'Sales and dispatch',
        body: 'Quote to order to delivery, with the paperwork and the status your customer keeps ringing about.',
    },
    {
        title: 'Quality checks',
        body: 'Incoming, in-process, final. Catch it before it ships, not after it comes back.',
    },
    {
        title: 'Job work and outsourcing',
        body: 'Material sent out, material returned. Nothing quietly disappearing at a vendor for three months.',
    },
    {
        title: 'Machine and maintenance',
        body: 'What is running, what is down, what is due. Before it stops mid-shift.',
    },
    {
        title: 'Costing',
        body: 'What the job actually cost — material, labour, overhead. Price on fact, not on feel.',
    },
    {
        title: 'GST-ready accounts',
        body: 'Invoices, e-way bills, returns. Indian rules, built in, not reconciled at month end.',
    },
    {
        title: 'Roles and permissions',
        body: 'People see their work. Approvals sit with whoever should be approving.',
    },
    {
        title: 'Reports that answer questions',
        body: 'Orders, stock, delays, margins. Plain. For deciding something, not for framing.',
    },
]

/** Custom vs boxed ERP — the comparison buyers run before they enquire. */
export const COMPARISON: { point: string; boxed: string; nexona: string }[] = [
    {
        point: 'Fit to your process',
        boxed: 'Your team changes how it works to suit the software.',
        nexona: 'Built around how your plant already runs.',
    },
    {
        point: 'What you pay for',
        boxed: 'The whole bundle, including the modules nobody opens.',
        nexona: 'The parts your factory uses. That is it.',
    },
    {
        point: 'Adding people',
        boxed: 'A licence for every user. Every year. Forever.',
        nexona: 'Hire freely — nobody bills you per head to use your own system.',
    },
    {
        point: 'Making a change',
        boxed: 'Raise a ticket. Wait on the vendor. Pay for the customisation.',
        nexona: 'Tell us. Small things land in days.',
    },
    {
        point: 'On the shop floor',
        boxed: 'Built for a desktop in an office. Phones came later, and it shows.',
        nexona: 'Phone, tablet, desktop. Installs as an app.',
    },
    {
        point: 'Going live',
        boxed: 'Long project, then a big-bang switch that stalls the plant.',
        nexona: 'Start where it hurts. Add the rest once people trust it.',
    },
    {
        point: 'Ownership',
        boxed: 'You rent access. Stop paying, it goes away.',
        nexona: 'You own what we build.',
    },
]

/** Industries — long-tail intent, and proof we understand the differences. */
export const INDUSTRIES = [
    'Engineering & fabrication',
    'Pharma',
    'Food processing',
    'Chemicals',
    'Textiles',
    'Packaging',
    'Plastics & moulding',
    'Auto components',
]

/** Signals a manufacturer has outgrown spreadsheets or a boxed ERP. */
export const SIGNALS = [
    'Nobody knows the real stock until somebody walks the floor and counts it.',
    'The production plan is a spreadsheet. One person maintains it. Pray he does not resign.',
    'Dispatch slips and you find out when the customer calls, not before.',
    'The same entry goes into the ERP and then into Excel, because the ERP report is unreadable.',
    'You pay for an ERP your team politely works around.',
    'Ask what a finished job cost and you get an estimate, delivered slowly.',
]
