export interface FaqItem {
    question: string
    answer: string
}

/** Visible "last updated" date. Keep equal to `updated` in landingPages.ts. */
export const LAST_UPDATED = '5 November 2026'
export const LAST_UPDATED_ISO = '2026-11-05'

// ── Rules for this page ──────────────────────────────────────────────────────
// POSITIONING: B2B outreach infrastructure and legitimate sending. Never frame
// any of this as evading spam filters or provider limits. Warmup is described
// factually and never promised to work. No inbox-placement guarantees.
//
// ACCURACY: Mailnitrix sends through customers' own Gmail and Outlook mailboxes.
// It runs no IP pools or mail servers of its own, and it is not a transactional
// email service. Keep the distinction visible. Gmail connects by app password
// over SMTP/IMAP, not the Gmail API. Facts read from mailnitrix.com 2026-11-05.
//
// PRICE: no Nexona build price until the user supplies one. Market ranges are
// named third parties', in ₹ at about ₹95 to $1. Mailnitrix, Instantly and
// Smartlead prices stay in USD because that is what those products charge.
// Instantly's live monthly price ($107) is higher than the $97 on Mailnitrix's
// own compare pages, so re-check these before changing them.

/** The brief's exact intro: entity, service, audience, one number. */
export const INTRO =
    'Nexonalabs designs and builds email sending infrastructure and cold email platforms for agencies, SaaS companies and outbound teams. We built Mailnitrix, a production platform that rotates sends across unlimited Gmail and Outlook mailboxes with warmup, throttling and 20,000 emails for $19 a month.'

export const MAILNITRIX_URL = 'https://mailnitrix.com/'

export const CASE_BUILT = [
    'Mailbox rotation across unlimited connected Gmail and Outlook accounts',
    'Automatic warmup with a gradual ramp and spam rescue',
    'Rolling 24-hour limits per mailbox, not a midnight reset',
    'Error-aware cooldowns that move queued email to healthy mailboxes',
    'Automatic campaign pause and resume, with a readable reason',
    'Unified inbox across every mailbox',
    'Campaign engine with follow-ups that stop on reply',
]

export const CASE_ENGINEERING = [
    {
        title: 'Microsoft Graph fallback',
        body: 'Plenty of Microsoft 365 tenants switch off SMTP. When Outlook answers “535 5.7.139 SmtpClientAuthentication is disabled”, the mailbox moves to the Graph API and the email is retried.',
    },
    {
        title: 'Error-code handling',
        body: 'A full recipient mailbox and a Gmail rate limit look alike to a basic tool. Mailnitrix treats each code on its own, so one bad address doesn’t rest a healthy mailbox, and a real pushback from Google does.',
    },
    {
        title: 'Machine-open filtering',
        body: 'Apple Mail Privacy Protection, security gateways and link scanners load the tracking image without anyone reading. Those get filtered by timing, source and known scanners. Gmail’s image proxy counts as real, because it loads when the email is opened.',
    },
]

export const CASE_NUMBERS = [
    { value: '$19', label: 'for 20,000 emails a month' },
    { value: '$94–$107', label: 'for the Smartlead and Instantly tiers covering that volume' },
    { value: 'Unlimited', label: 'mailboxes and contacts on paid plans' },
    { value: '1,000', label: 'emails a month on the free tier' },
]

export const WHAT_WE_BUILD = [
    {
        title: 'Multi-mailbox sending engines with rotation and pacing',
        body: 'A scheduler that picks the next healthy mailbox, spaces sends and re-spaces any backlog, so a restart never fires 400 queued emails at once.',
    },
    {
        title: 'Email warmup systems',
        body: 'Gradual ramps per mailbox, placement checks and hold rules. Mailnitrix starts at 3 emails a day, adds about 2 a day up to 30, and holds if inbox placement falls below 70%.',
    },
    {
        title: 'Gmail API and SMTP integrations',
        body: 'Mailnitrix connects Gmail with app passwords over SMTP and IMAP, which is quick to ship. The Gmail API suits a product that needs OAuth, though Google’s app verification takes planning.',
    },
    {
        title: 'Microsoft Graph and OAuth integrations',
        body: 'One-click Microsoft sign-in with revocable tokens, and Graph sending as a fallback. Basic SMTP AUTH gets disabled by default at the end of December 2026, so build on OAuth now.',
    },
    {
        title: 'Campaign and sequence builders with reply detection',
        body: 'CSV and Excel import, personalisation from any column, scheduling and A/B tests. Sequences stop the moment someone replies, because following up after a “no thanks” is how complaints happen.',
    },
    {
        title: 'Unified inbox and reply handling',
        body: 'Every reply from every mailbox in one place, threaded, with the campaign it came from.',
    },
    {
        title: 'Open and click tracking with bot filtering',
        body: 'Custom tracking domains, first-open counting and scanner filters, plus a switch to turn tracking off per campaign.',
    },
    {
        title: 'Usage-based billing and tiered plans',
        body: 'Allowances, overage per 1,000 emails, resets per billing period and team seats. Warmup emails shouldn’t count against the allowance.',
    },
    {
        title: 'Multi-tenant and white-label agency versions',
        body: 'Client workspaces so one agency’s client never sees another’s data, with custom domains and branding on top. Mailnitrix offers workspaces on Nitro and white-label on Enterprise.',
    },
]

/** Timeline is our planning range. Cost is what other firms publish. */
export const COST_ROWS = [
    ['Sending engine for one mailbox provider', '3–5 weeks', 'No published benchmark. Below the MVP range.'],
    ['Campaign platform MVP (Gmail + Outlook)', '8–12 weeks', '₹28.5–₹52 lakh'],
    ['Full platform: billing, teams, analytics, white-label', '16–24 weeks', 'Up to ₹1.43 crore'],
]

export const COST_SOURCE = {
    name: 'RaftLabs',
    href: 'https://www.raftlabs.com/blog/cost-to-build-app-like-instantly',
}

export const COST_DRIVERS = [
    ['Number of providers', 'Each one is its own auth, limits and error table.'],
    ['Warmup complexity', 'A shared network across customers needs its own abuse controls.'],
    ['Deliverability monitoring', 'Placement checks, bounce and complaint tracking per mailbox, and alerts someone will read.'],
    ['Billing', 'Flat plans are easy. Metered email with overage and yearly discounts isn’t.'],
    ['Team seats and workspaces', 'Roles, client separation and audit logs reach into almost every query.'],
    ['Scale', 'Thousands a day run on a simple queue. Millions need a different design.'],
]

export const COMPARE_TABLE = {
    caption: 'Building a custom email platform compared with Instantly or Smartlead and a white-label tool',
    columns: ['', 'Custom build (us)', 'Instantly or Smartlead', 'White-label reselling'],
    rows: [
        ['Better when', 'You will sell the platform, embed sending in your product, or send at real volume.', 'You run campaigns and have no developer team. Most people, honestly.', 'You want your brand on a tool this quarter, without engineers.'],
        ['Start', 'Weeks to months.', 'Today.', 'Days.'],
        ['What you pay', 'A build, then your own running costs and upkeep.', 'Tiers: Smartlead $39–$379 a month, Instantly $47–$358.', 'A fee per client, such as Smartlead’s $29 a month per workspace.'],
        ['Main risk', 'Deliverability becomes your problem at 2 am.', 'Costs jump between tiers as lists grow.', 'Your margin and product both depend on one vendor.'],
    ],
}

export const COMPARE_SOURCES = [
    { name: 'Smartlead', href: 'https://www.smartlead.ai/pricing' },
    { name: 'Instantly', href: 'https://www.instantly.ai/pricing' },
]

export const AUDIENCES = [
    {
        title: 'Outbound agencies who want their own branded tool',
        body: 'Per-workspace fees add up across 30 clients, and every client sees someone else’s product.',
    },
    {
        title: 'SaaS companies adding campaign or transactional email',
        body: 'Campaign features inside your product are a good fit for us. Transactional email is a different job, and most teams should plug in a dedicated delivery service instead of running mail servers. We wire that in.',
    },
    {
        title: 'Sales teams outgrowing per-seat pricing',
        body: 'Twenty reps and 200 mailboxes make a seat-based bill look strange. If you have developers to own it afterwards, custom can pay off.',
    },
    {
        title: 'Founders launching a competitor',
        body: 'You have seen what Mailnitrix did to the price at 20,000 emails. Cheaper alone is a hard business once the abuse tickets start.',
    },
]

/** Exact behaviour from Mailnitrix's inbox-rotation page. */
export const COOLDOWN_ROWS = [
    ['Gmail 550 5.4.5', 'Daily limit reached', 'Mailbox rests 24 hours. Its queue moves to other mailboxes.'],
    ['421 4.7.0, 4.7.28', 'Unusual rate', 'A 1-hour pause that doubles on repeats, up to 24 hours.'],
    ['550 5.7.1', 'Rejected as unsolicited', 'A 6-hour pause, recorded on the mailbox.'],
    ['550 5.1.1, 552 5.2.2', 'Bad or full recipient', 'Only that recipient is affected. The mailbox keeps sending.'],
    ['535 5.7.8', 'Login rejected', 'Mailbox flagged and stopped until the password is fixed.'],
]

export const REQUIREMENTS = [
    ['Google', 'Near 5,000+ messages a day to personal Gmail', 'SPF, DKIM and DMARC. One-click unsubscribe honoured within 48 hours. Spam rate below 0.10%, and never reaching 0.30%.'],
    ['Yahoo', 'Bulk senders', 'SPF, DKIM and DMARC. Functioning one-click list-unsubscribe, honoured within 2 days. Spam rate below 0.3%.'],
    ['Microsoft', 'Over 5,000 a day to Outlook consumer addresses', 'SPF, DKIM and DMARC at p=none or stronger. Non-compliant mail can be rejected with 550 5.7.515.'],
]

export const REQUIREMENT_SOURCES = [
    { name: 'Google sender guidelines', href: 'https://support.google.com/a/answer/81126' },
    { name: 'Yahoo best practices', href: 'https://senders.yahooinc.com/best-practices/' },
    { name: 'Microsoft on high-volume senders', href: 'https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/strengthening-email-ecosystem-outlook%E2%80%99s-new-requirements-for-high%E2%80%90volume-senders/4399730' },
    { name: 'FTC CAN-SPAM guide', href: 'https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business' },
    { name: 'ICO on B2B marketing', href: 'https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/' },
    { name: 'Microsoft SMTP AUTH timeline', href: 'https://techcommunity.microsoft.com/blog/exchange/updated-exchange-online-smtp-auth-basic-authentication-deprecation-timeline/4489835' },
]

export const FURTHER_READING = [
    { name: 'Gmail sending limits in 2026', href: 'https://mailnitrix.com/blog/gmail-sending-limits' },
    { name: 'Why your cold email open rates are wrong', href: 'https://mailnitrix.com/blog/why-cold-email-open-rates-are-wrong' },
    { name: 'Fixing “SmtpClientAuthentication is disabled” in Outlook', href: 'https://mailnitrix.com/blog/outlook-smtp-client-authentication-disabled' },
    { name: 'Mailnitrix vs Instantly', href: 'https://mailnitrix.com/compare/instantly' },
    { name: 'Mailnitrix vs Smartlead', href: 'https://mailnitrix.com/compare/smartlead' },
]

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'How much does it cost to build a cold email platform?',
        answer: 'RaftLabs, a development firm, estimates about ₹28.5 lakh to ₹52 lakh for an MVP with mailbox connections, sequences, a shared inbox and basic analytics, and up to about ₹1.43 crore for a platform you sell to others. Mailboxes and domains are extra. If you only send your own campaigns, renting is almost always cheaper.',
    },
    {
        question: 'How long does it take to build an Instantly alternative?',
        answer: 'Plan on 8 to 12 weeks for a campaign platform MVP on Gmail and Outlook, and 16 to 24 weeks for one with billing, teams, analytics and white-label. RaftLabs estimates 10 to 14 weeks for an MVP. Error handling only gets good once real mailboxes start failing.',
    },
    {
        question: 'How does email warmup work technically?',
        answer: 'Mailboxes exchange ordinary-looking emails on a gradual schedule, and the system moves anything found in spam back to the inbox and replies to some messages. Mailnitrix starts at 3 emails a day and ramps to 30. Providers can restrict automated engagement, so treat warmup as one input. It doesn’t replace authentication, a good list or wanted email.',
    },
    {
        question: 'How do you rotate multiple Gmail and Outlook mailboxes safely?',
        answer: 'Give each mailbox its own rolling 24-hour limit, space sends with random gaps, and pick the next healthy mailbox for each email. Back off per error code. Rotation spreads volume and limits damage when one mailbox has a problem. It doesn’t reduce complaints, and using it to get around provider limits breaches their terms.',
    },
    {
        question: 'Gmail API vs SMTP vs Microsoft Graph for sending: which should I use?',
        answer: 'Use Microsoft Graph or OAuth SMTP for Outlook, since basic SMTP AUTH gets disabled by default at the end of December 2026. For Gmail, SMTP with an app password is quickest to ship and is what Mailnitrix uses. The Gmail API suits products that want OAuth, but plan time for Google’s app verification.',
    },
    {
        question: 'How many emails can one mailbox send per day?',
        answer: 'Google Workspace allows about 2,000 messages a day per user, but that is a ceiling and not a target. For cold email, Mailnitrix treats 30 to 40 a day per mailbox as a common safe range, and lower for new mailboxes. Sending 20,000 emails a month that way needs roughly 15 to 25 mailboxes.',
    },
    {
        question: 'How do you filter fake opens from Apple Mail Privacy Protection?',
        answer: 'You filter what you can identify, using timing, source and known proxy or scanner signatures, and count each email’s first open only once. Mailnitrix counts Apple’s privacy proxy as a machine open, and Gmail’s image proxy as real. No filter is perfect, so judge campaigns on replies and clicks, and use opens only for comparison.',
    },
    {
        question: 'Can you build a white-label cold email tool for my agency?',
        answer: 'Yes. A white-label build adds client workspaces, your domain and branding, separate reporting and billing per client on top of the sending engine. Check the sums first: Smartlead sells white-label at $29 a month per client workspace, so a custom build needs enough clients to pay for itself.',
    },
    {
        question: 'Is cold email legal?',
        answer: 'Generally yes for B2B in the US and UK, within limits, and it varies across the EU. CAN-SPAM needs accurate headers, a postal address and an opt-out honoured within 10 business days. UK rules exempt corporate subscribers but not sole traders. Germany and some others are stricter. This is general information, so confirm with counsel.',
    },
]
