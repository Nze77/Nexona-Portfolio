export interface FaqItem {
    question: string
    answer: string
}

/** Visible "last updated" date. Keep equal to `updated` in landingPages.ts. */
export const LAST_UPDATED = '17 November 2026'
export const LAST_UPDATED_ISO = '2026-11-17'

// ── Rules for this page ──────────────────────────────────────────────────────
// PRICE: user rule (2026-11-17): no per-agent price and no figures at all. The
// dialer is sold at one flat price set by features and scale, quoted after a
// call. Answer every pricing question with what sets the price + "contact us".
//
// PROOF: FC BPO facts are exactly what the user supplied: 60 agents, 70% of
// costs saved, much higher rate limits than before. Nothing else about them is
// known (city, old vendor, timeline, a quote), so don't add it.
//
// LEGAL: general information only. TRAI PR 11/2025 (140 and 1600 series) and
// PR 91/2026 (140 registration, 1600 can't be blocked) are primary. The 2026
// Third Amendment details (A2P declaration, up to 5 paise a minute, three
// complaints plus an AI flag) come from Policy Edge's summary, read 2026-11-17,
// because the TRAI PDF is a scan. Re-check against the gazette before adding more.

/** Front-loaded intro: what, who, pricing model, proof. */
export const INTRO =
    'Nexona Labs runs a cloud contact center dialer for Indian BPOs and sales floors, with predictive, progressive, power and preview modes, a built-in CRM view and call recording. One flat price, set by features and scale. No per-agent fee. FC BPO moved 60 agents onto it and cut costs by 70%.'

export const HERO_STATS = [
    { value: '60', label: 'agents at FC BPO' },
    { value: '70%', label: 'lower costs for FC BPO' },
    { value: 'Flat', label: 'pricing, no per-agent fee' },
    { value: '4', label: 'dialing modes, switchable per campaign' },
]

export const CASE_POINTS = [
    ['Before', 'Per-agent pricing on a hosted dialer, plus rate limits that capped how hard the floor could dial. Agents sat waiting between calls while the system held back.'],
    ['What changed', 'All 60 agents moved to our cloud dialer on one flat price. Lines, pacing and calls per second got sized to their carrier and their campaigns, not to a plan tier.'],
    ['After', 'Costs down 70%. Rate limits much higher than before, so the dialer now keeps pace with the floor rather than the other way round.'],
]

export const CASE_NUMBERS = [
    { value: '60', label: 'agents on one flat plan' },
    { value: '70%', label: 'saved on costs' },
    { value: 'Much higher', label: 'rate limits than their old dialer' },
]

/** Dialing modes. Columns: mode, how it dials, use it for, watch out for. */
export const MODES_TABLE = {
    caption: 'Predictive, progressive, power and preview dialing modes compared',
    columns: ['Mode', 'How it dials', 'Use it for', 'Watch out for'],
    rows: [
        ['Predictive', 'Dials more numbers than free agents, using live answer rate and average handle time to guess who frees up next.', 'Big lists, low connect rates, short calls. Collections, lead qualification, renewals.', 'Answered calls with no agent free. Tune the ratio or you annoy people and collect complaints.'],
        ['Progressive', 'Dials one number the moment an agent finishes wrap-up. Never more lines than free agents.', 'Warm leads and smaller lists, where every connect should reach a person instantly.', 'Slower than predictive on lists where most calls go unanswered.'],
        ['Power', 'Dials a fixed number of lines per free agent, say two or three, without the prediction.', 'Teams that want more speed than progressive with simpler, predictable behaviour.', 'A fixed ratio doesn’t adjust when connect rates swing during the day.'],
        ['Preview', 'Shows the agent the lead first. The agent decides when to dial.', 'High-value calls, B2B, anything where reading the account first matters.', 'Slowest of the four. Agents can stall on the preview screen.'],
    ],
}

export const FEATURES = [
    {
        title: 'Campaigns, lists and retries',
        body: 'Upload a list, choose the mode, set retry gaps for busy and no-answer, and set calling hours. Each campaign keeps its own caller IDs and its own dispositions.',
    },
    {
        title: 'CRM view on every call',
        body: 'The lead’s history, notes and last disposition pop on screen as the call connects. Already have a CRM? We sync over its API, so agents don’t retype a thing.',
    },
    {
        title: 'Call recording',
        body: 'Every call recorded, or none, or left to the agent. Recordings sit against the lead, searchable by number, agent, campaign and date, with a retention period you pick.',
    },
    {
        title: 'Browser softphone',
        body: 'Agents log in and dial from a browser tab, with headsets and nothing to install. Blind, consult and three-way transfers, plus hold and mute.',
    },
    {
        title: 'Your SIP carrier, your rate limits',
        body: 'Connect the carrier you already use over SIP, or let us arrange one. Calls per second and concurrent lines get set per trunk, to what the carrier actually allows.',
    },
    {
        title: 'DND scrub and do-not-call list',
        body: 'Numbers on your do-not-call list never get dialed, and agents can add one mid-call. Lists can be scrubbed against DND preferences before a campaign starts.',
    },
    {
        title: 'Live floor dashboard',
        body: 'Who is on a call, who is in wrap-up, connect rate, drop rate and talk time by campaign, agent and caller ID. The supervisor at the back of the floor sees it on a phone too.',
    },
    {
        title: 'One tenant per BPO client',
        body: 'Lists, scripts, recordings and reports kept separate per client, so a lending client never sees an insurance client’s data. Reports export per client for billing.',
    },
]

/** What sets the flat price. No figures, by user rule. */
export const PRICE_DRIVERS = [
    ['Concurrent lines and calls per second', 'The real measure of scale. 60 agents on predictive at a 3:1 ratio need far more lines than 60 agents on preview.'],
    ['Features switched on', 'Recording and how long you keep it, CRM sync depth, AI voice agents, per-client reporting.'],
    ['Number of clients or campaigns', 'A single in-house sales team is one setup. A BPO running eleven clients with separate data is a different one.'],
    ['Hosting', 'Our cloud, or a server in your own account if your clients insist on it.'],
    ['Telephony', 'Your own SIP carrier, or one we arrange. Either way, minutes are shown separately, not buried in a seat fee.'],
]

export const PER_SEAT_PROBLEMS = [
    'A 60-seat day shift that drops to 22 people after 9 pm still pays for 60 seats.',
    'A new client campaign means buying seats first, before a rupee of revenue comes in.',
    'Concurrent channels and higher calls per second are sold as add-ons, so the plan that looked cheap stops being cheap the moment you dial hard.',
]

export const COMPARE_TABLE = {
    caption: 'Per-agent cloud dialer compared with a flat-priced cloud dialer from Nexona Labs and a self-hosted open-source dialer',
    columns: ['', 'Per-agent cloud dialer', 'Our flat-priced cloud dialer', 'Self-hosted open source (e.g. VICIdial)'],
    rows: [
        ['Price shape', 'A fee per seat each month, plus add-ons.', 'One flat price for your features and scale. No seat count.', 'Free software. You pay for servers and someone to run them.'],
        ['Rate limits', 'Set by the plan tier.', 'Set by your carrier and your campaigns.', 'Set by your hardware and your carrier.'],
        ['Adding 20 agents for a new client', 'Buy 20 more seats.', 'Add the logins. The price moves only if scale moves materially.', 'Free, if the server can take it.'],
        ['Who keeps it running', 'The vendor.', 'Us.', 'You, including the 2 am outage.'],
        ['CRM', 'Their CRM, or a paid connector.', 'Built-in lead view, or a sync to yours over API.', 'Basic lead screens. Anything more is your developer’s job.'],
        ['Best for', 'Small teams that want to start today and stay small.', 'BPOs and sales floors from about 20 agents up, where seat fees hurt.', 'Teams with a strong in-house telephony admin.'],
    ],
}

export const INDUSTRIES = [
    {
        title: 'Multi-client BPOs',
        body: 'Each client gets its own lists, scripts, caller IDs and reports. Headcount shifts between clients every month, and your dialer bill shouldn’t shift with it.',
    },
    {
        title: 'Collections and lending',
        body: 'Large lists, low connect rates, strict calling hours. Predictive mode earns its keep here, as long as the drop rate stays low.',
    },
    {
        title: 'Insurance and renewals',
        body: 'Renewal lists every month, recordings kept for disputes, and a 1600-series number for service calls where the rules ask for one.',
    },
    {
        title: 'Real estate, edtech and inside sales',
        body: 'Fresh leads from ads and forms, called within minutes. Progressive mode for warm leads, predictive for the old ones nobody finished.',
    },
]

export const PROCESS = [
    ['Scoping call', '30 minutes', 'Agents, shifts, campaigns, current dialer and carrier. You leave with a flat price in writing, not a seat count.'],
    ['Carrier and numbers', '2–5 days', 'SIP trunk connected, rate limits set per trunk, caller IDs mapped to campaigns. 140-series and DLT registration run on the telecom provider’s clock, so start those first.'],
    ['Lists, users and CRM', '2–3 days', 'Lists imported, dispositions set, agent logins created, and your CRM synced if you have one.'],
    ['Pilot campaign', '1 week', 'One campaign, one team, real calls. We watch drop rate and connect rate and tune the dialing ratio daily.'],
    ['Full floor', 'Ongoing', 'Every campaign moved over. Support from the people who built it, not a ticket queue.'],
]

export const TRAI_RULES = [
    {
        title: '140 series for promotional calls',
        body: 'Promotional calls must come from a 140-series number registered through your telecom provider on the DLT system. Ordinary ten-digit numbers are out for telemarketing.',
    },
    {
        title: '1600 series for service and transactional calls',
        body: 'Service and transactional calls move to the 1600 series. Regulated sectors such as banking and insurance are being moved first. Call-blocking apps aren’t allowed to block 1600 numbers.',
    },
    {
        title: 'DND and consent',
        body: 'Customers can block promotional calls fully or by category through the DND registry. Scrub every promotional list before dialing, and keep a verifiable record of consent where you rely on it.',
    },
    {
        title: 'Autodialed calls must be declared',
        body: 'TRAI’s 2026 amendment covers calls placed by software without a person dialing, which includes predictive dialers. Declare that you use one, and the numbers you call from, to your telecom provider. Undeclared automated calls count as unsolicited commercial communication.',
    },
    {
        title: 'A charge on automated calls',
        body: 'The same amendment allows a termination charge of up to 5 paise a minute on automated calls. Calls from the designated commercial series, 140 and 1600, are exempt.',
    },
    {
        title: 'Complaints act faster',
        body: 'Action against a sender used to need five complaints in ten days. Now three can be enough when the operator’s own system also flags the number as spam. Disconnection and blacklisting follow repeated misuse.',
    },
]

export const TRAI_DIALER_DOES = [
    'Never dials a number on your do-not-call list',
    'Keeps caller IDs per campaign, so promotional and service calls don’t share a number',
    'Calls only inside the hours you set for each campaign',
    'Logs every attempt, answer and drop with a timestamp, for when a complaint lands',
    'Keeps the predictive ratio in check so answered calls aren’t left in silence',
]

export const TRAI_SOURCES = [
    { name: 'TRAI press release 11/2025', href: 'https://cms.trai.gov.in/sites/default/files/2025-02/PR_No.11of2025.pdf' },
    { name: 'TRAI press release 91/2026', href: 'https://trai.gov.in/sites/default/files/2026-07/PR_No91of2026.pdf' },
    { name: 'Policy Edge on the 2026 amendment', href: 'https://www.policyedge.in/p/trai-finalises-new-spam-rules-covering-ai-detection-robocalls-and-consumer-appeals' },
]

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'What is the best cloud contact center dialer for a BPO in India?',
        answer: 'One that prices on your scale rather than your seat count, lets you bring your own SIP carrier, and handles 140 and 1600 numbers, DND scrubbing and recordings without extra modules. Seat counts at a BPO swing with every client. Our cloud dialer is priced flat for that reason, and FC BPO cut costs by 70% across 60 agents.',
    },
    {
        question: 'How much does a predictive dialer cost in India?',
        answer: 'Most hosted dialers charge per agent per month, then add channels and features on top. We don’t. Our price is one flat figure set by concurrent lines, features, number of clients, hosting and telephony. Tell us your floor on a 30-minute call and you get that figure in writing.',
    },
    {
        question: 'Do you charge per agent?',
        answer: 'No. Adding agents for a new client means adding logins, not buying seats. The flat price only changes if your scale changes materially, for example a jump in concurrent lines or calls per second.',
    },
    {
        question: 'Is your dialer TRAI compliant?',
        answer: 'A dialer can’t make a campaign compliant on its own. Ours makes the compliant path the default: do-not-call numbers are never dialed, caller IDs stay per campaign so 140 and 1600 numbers don’t mix, calling hours are enforced and every attempt is logged. Registering your numbers, declaring automated calling to your telecom provider and holding consent records stay with you.',
    },
    {
        question: 'What is the difference between predictive, progressive and power dialing?',
        answer: 'Predictive dials more numbers than free agents, based on answer rates and handle time. Progressive dials one number as each agent frees up. Power dials a fixed number of lines per free agent. Predictive is fastest on big cold lists, progressive is safest on warm leads, and power sits between them.',
    },
    {
        question: 'Does it come with a CRM and call recording?',
        answer: 'Yes, both. The lead’s history and notes pop on screen as the call connects, and calls are recorded against the lead with a retention period you choose. If you already run a CRM, we sync with it over its API. If you want a CRM built around your process, we build those too.',
    },
    {
        question: 'Can I use my own telecom carrier?',
        answer: 'Yes. Connect any SIP carrier you already use, or we arrange one. Calls per second and concurrent lines get set per trunk to what that carrier allows, which is how FC BPO ended up with much higher rate limits than their old dialer gave them.',
    },
    {
        question: 'How long does it take to move from my current dialer?',
        answer: 'Usually under three weeks: a few days for carrier and numbers, a few for lists and users, then a one-week pilot campaign before the full floor moves. Number registration with your telecom provider can take longer, so start it on day one.',
    },
    {
        question: 'Can it run AI voice agents as well as human agents?',
        answer: 'Yes, as an add-on. AI agents can work the cold end of a list and transfer interested people to your human agents with the reason on screen. That changes the flat price, and TRAI treats AI and prerecorded calls as automated calls, so declare them.',
    },
]
