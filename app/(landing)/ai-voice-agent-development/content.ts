export interface FaqItem {
    question: string
    answer: string
}

/** Visible "last updated" date. Keep equal to `updated` in landingPages.ts. */
export const LAST_UPDATED = '5 November 2026'
export const LAST_UPDATED_ISO = '2026-11-05'

// ── Rules for this page ──────────────────────────────────────────────────────
// PRICE: no Nexona build price until the user supplies one, because the brief's
// cost table needs real figures. Market ranges are named third parties', in ₹ at
// about ₹95 to $1. Valyrian Voice and API-platform per-minute prices stay in USD
// because that is what those products charge.
//
// PROOF: Valyrian facts come from valyrianvoice.com, read 2026-11-05. Dashboard
// numbers on that site are demo data, never outcomes. The site does not state
// languages, measured latency, storage region, encryption or a recording notice,
// so don't claim them. Nexona built and manages Valyrian Voice: always disclose
// that where the page recommends it.
//
// LEGAL: general information only. Primary sources: FCC 24-17, TRAI PR 91/2026.

/** The brief's exact intro. 42 words: entity, service, audience, one number. */
export const INTRO =
    'Nexonalabs is a software agency that designs and builds AI voice agent platforms for call centers, insurance, home services and clinics. We built Valyrian Voice, a production platform running AI dial sessions at 100 lines, with AI calls from 1¢ a minute.'

export const VALYRIAN_URL = 'https://valyrianvoice.com/'

export const CASE_BUILT = [
    ['Dialer', 'A browser phone for every agent, with blind, three-way and consult transfers, voicemail and recordings.'],
    ['AI agents', 'Prompted agents with tools, a memory of earlier calls with the same lead, and transfers to people.'],
    ['Dial sessions', 'Outbound AI calling at up to 100 lines, with retries and a do-not-call list that is never dialed.'],
    ['Inbound routing', 'Per number: AI only, people then AI, free people then AI, or people only.'],
    ['Telephony', 'Any SIP carrier or theirs, paced to each carrier’s calls-per-second limit, with trunk health checked every 30 seconds.'],
    ['Analytics', 'Live dashboards by campaign, caller ID, carrier, person and AI agent, plus an AI summary and extracted fields on every AI call.'],
]

export const CASE_NUMBERS = [
    { value: '100', label: 'lines per AI dial session' },
    { value: '3,000–4,000', label: 'calls an hour on one dedicated GPU' },
    { value: '1¢', label: 'a minute, AI and telephony' },
    { value: '$30', label: 'per agent a month, for the dialer' },
]

export const WHAT_WE_BUILD = [
    {
        title: 'AI outbound dial sessions',
        body: 'Upload a list, set the retries and the pacing, and let the agent work through it. The session should pause itself when calls can’t succeed, say when a trunk goes down.',
    },
    {
        title: 'AI inbound answering with human-first routing',
        body: 'Your people answer first when they are free, and the AI picks up what they can’t. Or the reverse. Ring time, give-up time and voicemail get set per number, because the sales line and the claims line should not behave alike.',
    },
    {
        title: 'Human handoff with context on the agent’s screen',
        body: 'A transfer that makes the customer repeat themselves wasted the whole AI call. The reason for the transfer shows on the person’s screen as it rings. We can add the summary and lead fields to that on a custom build.',
    },
    {
        title: 'Browser dialers and softphones',
        body: 'Nothing to install. Agents log in and dial from a browser tab, with transfers, voicemail drop and recording controls.',
    },
    {
        title: 'SIP and telephony integration',
        body: 'Bring your carrier over SIP, with registration, per-call credentials or IP authentication, or start on presets for Telnyx and Twilio. Calls-per-second limits are set per trunk.',
    },
    {
        title: 'Call recording, transcription, summaries and analytics',
        body: 'Recording on, off, or left to the agent mid-call. Transcripts and AI summaries pull out fields you define, such as renewal date or objection, so a manager reviews 400 calls by reading instead of listening.',
    },
    {
        title: 'Tool and CRM integrations',
        body: 'Agents call your systems during the conversation over HTTP tools and webhooks: look up a policy, check a slot, write the outcome. No named connector is required. If your CRM has an API, the agent can use it.',
    },
]

/** Timeline is our planning range. Cost is what other firms publish. */
export const COST_ROWS = [
    ['Single-use AI voice agent', '3–5 weeks', '₹2.9–₹33 lakh'],
    ['Voice agent plus dialer MVP', '8–12 weeks', '₹19 lakh–₹1.14 crore'],
    ['Full platform: multi-tenant, analytics, telephony', '16–24 weeks', '₹1.14–₹2.38 crore+'],
]

export const COST_SOURCES = [
    { name: 'Groovy Web', href: 'https://www.groovyweb.co/blog/ai-voice-agent-development-cost' },
    { name: 'RaftLabs', href: 'https://www.raftlabs.com/blog/voice-ai-development-cost' },
    { name: 'AddWeb Solution', href: 'https://www.addwebsolution.com/blog/how-much-does-ai-development-cost' },
]

export const COST_DRIVERS = [
    ['Concurrency', 'Ten lines and 500 lines are different systems. Queues, pacing and failover all change.'],
    ['Telephony', 'One SIP trunk is simple. Several carriers across countries, with number rotation rules, is not.'],
    ['GPU vs API inference', 'API models start faster. Your own GPUs cost more to build and much less per minute at volume.'],
    ['Languages', 'English is the easy case. Every extra language or code-switching pattern needs its own testing.'],
    ['Integrations', 'Each CRM, policy system or calendar the agent touches mid-call is a piece of work, and a failure to handle.'],
]

export const COMPARE_TABLE = {
    caption: 'Custom AI voice platform compared with Vapi, Retell and Bland, Valyrian Voice and an in-house team',
    columns: ['', 'Custom build (us)', 'Vapi, Retell, Bland', 'Valyrian Voice', 'In-house team'],
    rows: [
        ['Wins when', 'The platform is your product, or your workflow won’t fit anyone else’s.', 'Your developers want to test ideas fast and swap models freely.', 'You run a calling operation and just want it working this month.', 'Voice is core to the company for years and you can hire for it.'],
        ['Time to first call', 'Weeks.', 'Hours to days.', 'Days.', 'Months.'],
        ['Cost shape', 'Build cost, then your own running costs. No platform margin.', 'Vapi $0.05/min hosting plus providers. Retell $0.07–$0.31/min. Bland from $0.14/min, telephony separate.', '1¢/min with telephony, 0.5¢ on your carrier. Dialer $30 per agent a month.', 'Salaries first, savings much later.'],
        ['Lines included', 'Whatever you size for.', 'Vapi 4 to 30 by plan, then $10 a line. Retell 20, then $8 a line. Bland 10 to 50.', 'Up to 100 per session.', 'Whatever you size for.'],
        ['What you own', 'Code, data and roadmap.', 'Your prompts and config.', 'Your data. The product stays Valyrian’s.', 'Everything, including every 3 am outage.'],
        ['Main risk', 'Upfront cost before the idea is proven.', 'Bills climb with minutes, and you depend on their roadmap.', 'You can’t reshape it into your own product.', 'Your one voice engineer resigns.'],
    ],
}

export const COMPARE_PRICE_SOURCES = [
    { name: 'Vapi', href: 'https://vapi.ai/pricing' },
    { name: 'Retell AI', href: 'https://www.retellai.com/pricing' },
    { name: 'Bland AI', href: 'https://www.bland.ai/pricing' },
    { name: 'Valyrian Voice', href: 'https://valyrianvoice.com/pricing' },
]

/** Valyrian's published estimator: 20,000 calls a day, 1.5 min, 22 calling days. */
export const UNIT_ROWS = [
    ['Per minute, with telephony (1¢)', '$6,600'],
    ['Per minute, your own carrier (0.5¢), carrier rates extra', '$3,300'],
    ['Dedicated GPU, 1 node × 9 hours × $2, before platform fee and telephony', '$396'],
]

export const INDUSTRIES = [
    {
        title: 'Insurance renewals',
        body: 'Renewal lists pile up every month, and a claim call can’t wait on hold. An agent can work the list, confirm details against the policy system, and pass anyone with a changed circumstance to a licensed person.',
    },
    {
        title: 'Solar and home services lead follow-up',
        body: 'Leads from forms and guides go cold within hours, and the first caller usually wins the job. An agent rings within minutes of the form, checks roof or property basics and books the site visit.',
    },
    {
        title: 'Clinics and dental recalls',
        body: 'Recall lists are long, front desks are busy, and most calls end in voicemail. An agent works the list, books into the real calendar and leaves the front desk alone. Health data brings its own rules, so scope those first.',
    },
    {
        title: 'BPOs and lending teams',
        body: 'A BPO needs each client’s lists, scripts and reporting kept apart. A lending team needs fast callbacks on numbers it owns.',
    },
]

export const PROCESS = [
    ['Discovery', '1 week', 'We listen to your real calls, pick one flow and agree what a successful call is. Then a written scope and price.'],
    ['Prompt and flow design', '1–2 weeks', 'Scripts, objections, tools and transfer rules. Tested by phone against people trying to break it.'],
    ['Telephony setup', '1 week', 'Carriers, numbers, pacing and consent records. In India, 140-series registration can take longer, so start it early.'],
    ['Pilot', '2 weeks', 'A small slice of real traffic, with every call reviewed. We compare it with your human baseline.'],
    ['Scale', 'Ongoing', 'Add lines in steps, watch connect rate and complaints, and tune weekly. A flow that worked at ten lines can fail at a hundred.'],
]

export const COMPLIANCE = [
    {
        title: 'Call recording consent',
        body: 'US federal law needs one party’s consent, but several states, including California, Florida and Pennsylvania, need everyone’s. Simplest rule: announce the recording in the first line of every call.',
    },
    {
        title: 'Do-not-call lists',
        body: 'Valyrian Voice has this built in: do-not-call numbers are always left out of a session, and an agent can mark one from the dialer or the call log. You still have to scrub against national registries yourself, such as the US National Do Not Call Registry and India’s DND.',
    },
    {
        title: 'US rules: TCPA and AI disclosure',
        body: 'The FCC ruled in February 2024 that AI-generated voices count as “artificial” under the TCPA. Outbound AI calls need prior express consent, and written consent for telemarketing. State rules are moving quickly as well, so have the agent say it is an AI in its opening line.',
    },
    {
        title: 'Indian rules: TRAI and DND',
        body: 'TRAI requires promotional calls to come from registered 140-series numbers, and service or transactional calls from the 1600 series. Ten-digit numbers are out for telemarketing, and customers can block promotional calls by sector. The DPDP Rules, notified in November 2025, phase in over about 18 months.',
    },
    {
        title: 'Data handling and where recordings live',
        body: 'On a custom build you pick the cloud region and retention period, so ask for this in writing from any vendor. Valyrian Voice keeps client campaign data in single-tenant structures, runs its GPU inference without storing call contents, and lets customers delete recordings automatically after a CRM sync.',
    },
]

export const COMPLIANCE_SOURCES = [
    { name: 'FCC declaratory ruling on AI voices', href: 'https://www.fcc.gov/node/261899' },
    { name: 'TRAI press release 91/2026', href: 'https://trai.gov.in/sites/default/files/2026-07/PR_No91of2026.pdf' },
]

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'How much does it cost to build an AI voice agent?',
        answer: 'Other firms publish roughly ₹2.9 lakh to ₹33 lakh for a single-use agent, and over ₹1 crore for a full platform. Telephony, concurrency, integrations and compliance drive the gap. Those are build costs only, so add running costs per minute. If you just need calls made rather than a product of your own, renting usually costs far less.',
    },
    {
        question: 'How long does it take to build an AI calling platform?',
        answer: 'Plan on 3 to 5 weeks for a single-use agent, 8 to 12 weeks for a voice agent with a dialer, and 16 to 24 weeks for a multi-tenant platform with analytics and telephony. Carrier setup and number registration sit outside your control and can add time, particularly 140-series registration in India.',
    },
    {
        question: 'Can AI voice agents transfer calls to humans?',
        answer: 'Yes, and they should. Valyrian Voice transfers to a person or any number you choose, and the reason appears on their screen as it rings. If nobody takes a blind transfer, the call returns to the agent who sent it. Decide your transfer rules before you write the prompt, because they shape everything else.',
    },
    {
        question: 'How many calls can an AI voice agent make at once?',
        answer: 'As many as your carrier limits, compute and plan allow. Valyrian Voice runs up to 100 lines per dial session, paced to each carrier’s calls-per-second limit, and reports 3,000 to 4,000 calls an hour on one dedicated GPU. Vapi’s plans include 4 to 30 lines and Retell’s include 20, with more available for a monthly fee.',
    },
    {
        question: 'Is it legal to use AI voice agents for outbound calls?',
        answer: 'Generally yes, with the right consent and numbers. In the US, the FCC treats AI voices as artificial under the TCPA, so you need prior express consent, written for telemarketing. In India, promotional calls must use registered 140-series numbers and respect DND preferences. This is general information, so confirm your use case with your own counsel.',
    },
    {
        question: 'Should I build a custom AI dialer or use Vapi or Retell?',
        answer: 'Start with Vapi or Retell if your developers want to test an idea this week. Build custom when the platform is your product, or when minutes reach a volume where per-minute fees outrun a dedicated GPU. If you simply run call campaigns, buying a finished product such as Valyrian Voice usually beats doing either.',
    },
    {
        question: 'What languages and accents can it handle?',
        answer: 'That depends on the speech recognition and voice models you choose, so we test with recordings of your own callers before promising anything. English is the easy case. Indian accents, code-switching between Hindi and English, and noisy phone lines need more tuning. We measure accuracy per language during the pilot, not from a vendor’s list.',
    },
    {
        question: 'Can it integrate with my CRM?',
        answer: 'Yes, if your CRM has an API. Agents call your systems during the conversation over HTTP tools and webhooks, so they can look up a record, check a slot and write the outcome afterwards. Valyrian Voice takes this generic route instead of listing named connectors. A custom build can add a deeper sync where needed.',
    },
    {
        question: 'What does an AI voice agent cost per minute?',
        answer: 'Valyrian Voice lists 1¢ a minute with telephony. Vapi lists $0.05 a minute for hosting, and estimates $82 to $129 for 1,000 minutes with providers. Retell lists $0.07 to $0.31, and Bland starts at $0.14 with telephony separate. Compare the same model and voice quality across each, because cheap minutes on a robotic voice cost you conversions.',
    },
]
