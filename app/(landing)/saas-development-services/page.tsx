'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence } from 'framer-motion'
import LandingHeader from '../../components/LandingHeader'
import ClientStrip from '../../components/ClientStrip'
import ContactOverlay from '../../components/ContactOverlay'
import Footer from '../../components/Footer'
import { useContactPopup } from '../../lib/useContactPopup'
import { DARK, SAND, INTER, CLUTCH_URL } from '../../lib/constants'
import {
    LAST_UPDATED,
    LAST_UPDATED_ISO,
    STARTING_PRICE,
    USD_TO_INR_NOTE,
    HERO_FACTS,
    PROJECTS,
    CLUTCH_REVIEW,
    SERVICES,
    GROUPS,
    AGENCY_CHECKS,
    AGENCY_TABLE,
    SCOPE_ROWS,
    SCOPE_SOURCE,
    REGION_ROWS,
    REGION_SOURCE,
    AFTER_LAUNCH_SOURCE,
    COST_DRIVERS,
    TENANCY_ROWS,
    TENANCY_SOURCE,
    RLS_SOURCE,
    RLS_SNIPPET,
    SAAS_PAAS_TABLE,
    GARTNER_SOURCE,
} from './content'

// Same palette as the other landing pages.
const TEXT = '#F2EEE8'
const PANEL = '#25221F'
const LINE = 'rgba(232,223,211,0.14)'
const MONTSERRAT = 'var(--font-montserrat), sans-serif'

const H2: React.CSSProperties = {
    fontFamily: MONTSERRAT,
    fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    textTransform: 'uppercase',
    margin: 0,
}

const EYEBROW: React.CSSProperties = {
    fontFamily: INTER,
    fontSize: '0.8rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    fontWeight: 700,
    opacity: 0.55,
    display: 'block',
    marginBottom: '1rem',
}

const LEAD: React.CSSProperties = {
    fontFamily: INTER,
    fontSize: 'clamp(1rem, 1.35vw, 1.15rem)',
    lineHeight: 1.7,
    letterSpacing: '0.01em',
}

const H3: React.CSSProperties = {
    fontFamily: INTER,
    fontSize: '1.05rem',
    fontWeight: 700,
    letterSpacing: '0.01em',
    margin: 0,
}

const CARD: React.CSSProperties = {
    border: `1px solid ${LINE}`,
    borderRadius: '1.25rem',
    padding: '1.75rem 1.5rem',
    backgroundColor: 'rgba(232,223,211,0.03)',
}

const CARD_BODY: React.CSSProperties = {
    fontSize: '0.92rem',
    lineHeight: 1.65,
    opacity: 0.72,
    marginTop: '0.7rem',
    marginBottom: 0,
}

const NOTE: React.CSSProperties = {
    fontSize: '0.92rem',
    lineHeight: 1.7,
    opacity: 0.68,
    marginTop: '1.1rem',
    marginBottom: 0,
}

const SOURCE: React.CSSProperties = {
    fontSize: '0.8rem',
    lineHeight: 1.55,
    opacity: 0.58,
    marginTop: '0.9rem',
    marginBottom: 0,
}

const INLINE_LINK: React.CSSProperties = {
    color: SAND,
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
}

const CTA: React.CSSProperties = {
    backgroundColor: SAND,
    color: DARK,
    fontWeight: 600,
    fontSize: '0.95rem',
    padding: '0.95rem 1.8rem',
    borderRadius: '999px',
    textDecoration: 'none',
    display: 'inline-block',
    border: 'none',
    cursor: 'pointer',
    fontFamily: INTER,
}

const TH: React.CSSProperties = {
    textAlign: 'left',
    padding: '0 1.25rem 0.9rem 0',
    borderBottom: '1px solid rgba(232,223,211,0.2)',
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    opacity: 0.5,
    verticalAlign: 'bottom',
}

const TD: React.CSSProperties = {
    padding: '1rem 1.25rem 1rem 0',
    borderBottom: '1px solid rgba(232,223,211,0.1)',
    fontSize: '0.9rem',
    lineHeight: 1.55,
    verticalAlign: 'top',
}

const SR_ONLY: React.CSSProperties = {
    position: 'absolute',
    width: 1,
    height: 1,
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" style={INLINE_LINK}>
            {children}
        </a>
    )
}

/** Comparison table on desktop, stacked rows on phones where columns won't fit. */
function CompareTable({
    caption,
    columns,
    rows,
    isMobile,
}: {
    caption: string
    columns: string[]
    rows: { point: string; values: string[] }[]
    isMobile: boolean
}) {
    if (isMobile) {
        return (
            <div style={{ marginTop: '1.25rem' }}>
                {rows.map((row) => (
                    <div key={row.point} style={{ padding: '1rem 0', borderBottom: `1px solid ${LINE}` }}>
                        <p style={{ ...H3, fontSize: '0.95rem' }}>{row.point}</p>
                        {row.values.map((value, i) => (
                            <p key={columns[i]} style={{ fontSize: '0.88rem', lineHeight: 1.55, margin: '0.4rem 0 0', opacity: 0.78 }}>
                                <strong>{columns[i]}: </strong>
                                {value}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        )
    }
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' }}>
            <caption style={SR_ONLY}>{caption}</caption>
            <thead>
                <tr>
                    <td style={{ ...TH, width: '22%' }} />
                    {columns.map((col) => (
                        <th key={col} scope="col" style={TH}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.point}>
                        <th scope="row" style={{ ...TD, textAlign: 'left', fontWeight: 700 }}>{row.point}</th>
                        {row.values.map((value, i) => (
                            <td key={columns[i]} style={{ ...TD, opacity: 0.78 }}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default function SaasDevelopmentServicesPage() {
    const [isMobile, setIsMobile] = useState(false)
    // Shared across every landing page: the form opens after 20s on the page or
    // once the visitor scrolls to the third section, whichever comes first.
    const { triggerRef: thirdSectionRef, contactOpen, openContact, closeContact, trigger } =
        useContactPopup<HTMLElement>()

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const pad = isMobile ? '4rem 5%' : '7rem 8%'
    const grid = (desktopCols: number, gap = '1.25rem'): React.CSSProperties => ({
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : `repeat(${desktopCols}, 1fr)`,
        gap,
    })

    // Evidence under a direct answer, keyed by question id. The answer itself
    // stays plain text in content.ts so it can double as FAQPage schema.
    const extras: Record<string, React.ReactNode> = {
        'who-can-build': (
            <p style={NOTE}>
                No technical person on your side at all? Someone still has to own the decisions after launch. That can
                be us, as a{' '}
                <Link href="/fractional-cto-as-a-service" style={INLINE_LINK}>fractional CTO</Link>
                , or your first hire.
            </p>
        ),
        'best-companies-india': (
            <p style={NOTE}>
                Clutch is the least bad starting point, because reviews there are verified. Ours are{' '}
                <ExternalLink href={CLUTCH_URL}>on Clutch</ExternalLink> too.
            </p>
        ),
        'choose-agency': (
            <>
                <p style={{ ...NOTE, fontWeight: 600, opacity: 0.85 }}>Six questions to put to any agency, us included</p>
                <ol style={{ margin: '0.6rem 0 0', paddingLeft: '1.25rem' }}>
                    {AGENCY_CHECKS.map((q) => (
                        <li key={q} style={{ fontSize: '0.92rem', lineHeight: 1.6, opacity: 0.72, marginBottom: '0.35rem' }}>
                            {q}
                        </li>
                    ))}
                </ol>
            </>
        ),
        'agency-vs-inhouse-vs-freelancers': <CompareTable {...AGENCY_TABLE} isMobile={isMobile} />,
        'offshore-for-us-startups': (
            <p style={NOTE}>
                Both products on this page price in US dollars, and Valyrian Voice sells to call centers on per-minute
                billing, so USD subscriptions and usage charges are familiar ground. Your contract is the part to read
                twice.
            </p>
        ),
        'cost-2026': (
            <>
                <div style={{ ...CARD, marginTop: '1.5rem', padding: isMobile ? '1.75rem 1.5rem' : '2rem 2.25rem' }}>
                    <span style={{ ...EYEBROW, marginBottom: '0.5rem' }}>Custom SaaS development, starting from</span>
                    <p
                        style={{
                            fontFamily: MONTSERRAT,
                            fontSize: 'clamp(2.5rem, 5.5vw, 3.5rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            lineHeight: 1,
                            margin: 0,
                        }}
                    >
                        {STARTING_PRICE}
                    </p>
                    <p style={{ ...CARD_BODY, fontSize: '0.98rem', marginTop: '1rem' }}>
                        Your final price depends on what the product needs. We scope it, then quote it before we start,
                        and the code is yours when we finish.
                    </p>
                    <button type="button" onClick={openContact} style={{ ...CTA, marginTop: '1.25rem' }}>
                        Get your number
                    </button>
                </div>
                <p style={{ ...NOTE, fontWeight: 600, opacity: 0.85, marginTop: '1.75rem' }}>What other studios publish, by scope</p>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                    <caption style={SR_ONLY}>What SaaS products cost by scope, according to one studio</caption>
                    <thead>
                        <tr>
                            <th scope="col" style={TH}>Scope</th>
                            <th scope="col" style={TH}>Cost</th>
                            <th scope="col" style={{ ...TH, paddingRight: 0 }}>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SCOPE_ROWS.map((row) => (
                            <tr key={row.scope}>
                                <th scope="row" style={{ ...TD, textAlign: 'left', fontWeight: 500, opacity: 0.85 }}>{row.scope}</th>
                                <td style={{ ...TD, fontWeight: 700 }}>{row.cost}</td>
                                <td style={{ ...TD, opacity: 0.65, paddingRight: 0 }}>{row.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p style={SOURCE}>
                    Source: <ExternalLink href={SCOPE_SOURCE.href}>{SCOPE_SOURCE.name}</ExternalLink>. Vendor content, and
                    well above the Codercops range. Published guides disagree this widely, which is why a quote should
                    list what is in scope.{' '}
                    <ExternalLink href={USD_TO_INR_NOTE.href}>{USD_TO_INR_NOTE.text}</ExternalLink>.
                </p>
                <p style={NOTE}>
                    Budget for after launch too. One Indian IT firm estimates ₹19,000 to ₹1.9 lakh a month for cloud and
                    ₹7.6 to ₹38 lakh a year for maintenance on an India-built product (
                    <ExternalLink href={AFTER_LAUNCH_SOURCE.href}>{AFTER_LAUNCH_SOURCE.name}</ExternalLink>).
                </p>
                <p style={{ ...NOTE, fontWeight: 600, opacity: 0.85 }}>What moves the price up from {STARTING_PRICE}</p>
                <div style={{ ...grid(2, '0 2rem') }}>
                    {COST_DRIVERS.map((d) => (
                        <div key={d.title} style={{ borderBottom: `1px solid ${LINE}`, padding: '0.9rem 0' }}>
                            <h4 style={{ ...H3, fontSize: '0.95rem' }}>{d.title}</h4>
                            <p style={{ ...CARD_BODY, marginTop: '0.35rem' }}>{d.body}</p>
                        </div>
                    ))}
                </div>
            </>
        ),
        'india-vs-us-cost': (
            <>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' }}>
                    <caption style={SR_ONLY}>SaaS MVP cost, timeline and senior agency rates by region</caption>
                    <thead>
                        <tr>
                            <th scope="col" style={TH}>Region</th>
                            <th scope="col" style={TH}>Standard MVP</th>
                            <th scope="col" style={TH}>Time</th>
                            <th scope="col" style={{ ...TH, paddingRight: 0 }}>Senior rate / hr</th>
                        </tr>
                    </thead>
                    <tbody>
                        {REGION_ROWS.map((row) => (
                            <tr key={row.region}>
                                <th scope="row" style={{ ...TD, textAlign: 'left', fontWeight: 700 }}>{row.region}</th>
                                <td style={{ ...TD, fontWeight: 700 }}>{row.mvp}</td>
                                <td style={{ ...TD, opacity: 0.65 }}>{row.time}</td>
                                <td style={{ ...TD, opacity: 0.65, paddingRight: 0 }}>{row.rate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p style={SOURCE}>
                    Source: <ExternalLink href={REGION_SOURCE.href}>{REGION_SOURCE.name}</ExternalLink>. Agency rates,
                    converted to rupees the same way. A standard MVP here means auth, dashboard, one core feature, API,
                    admin panel and deployment. Their bias is stated on the page, and ours runs the same way. These are
                    their numbers. Ours starts from {STARTING_PRICE}, and the quote depends on scope.
                </p>
            </>
        ),
        'multi-tenant': (
            <>
                {isMobile ? (
                    <div style={{ marginTop: '1.25rem' }}>
                        {TENANCY_ROWS.map((row) => (
                            <div key={row.model} style={{ padding: '1rem 0', borderBottom: `1px solid ${LINE}` }}>
                                <p style={{ ...H3, fontSize: '0.95rem' }}>{row.model}</p>
                                <p style={{ fontSize: '0.88rem', lineHeight: 1.55, margin: '0.4rem 0 0', opacity: 0.78 }}>{row.how}</p>
                                <p style={{ fontSize: '0.88rem', lineHeight: 1.55, margin: '0.4rem 0 0', opacity: 0.6 }}>{row.tradeoff}</p>
                                <p style={{ fontSize: '0.88rem', lineHeight: 1.55, margin: '0.4rem 0 0', opacity: 0.78 }}>
                                    <strong>Start here when: </strong>
                                    {row.when}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' }}>
                        <caption style={SR_ONLY}>Pool, bridge and silo multi-tenant SaaS models compared</caption>
                        <thead>
                            <tr>
                                <th scope="col" style={TH}>Model</th>
                                <th scope="col" style={TH}>How it works</th>
                                <th scope="col" style={TH}>Trade-off</th>
                                <th scope="col" style={{ ...TH, paddingRight: 0 }}>Start here when (our view)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TENANCY_ROWS.map((row) => (
                                <tr key={row.model}>
                                    <th scope="row" style={{ ...TD, textAlign: 'left', fontWeight: 700 }}>{row.model}</th>
                                    <td style={{ ...TD, opacity: 0.78 }}>{row.how}</td>
                                    <td style={{ ...TD, opacity: 0.62 }}>{row.tradeoff}</td>
                                    <td style={{ ...TD, opacity: 0.78, paddingRight: 0 }}>{row.when}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <p style={SOURCE}>
                    Models as defined in <ExternalLink href={TENANCY_SOURCE.href}>{TENANCY_SOURCE.name}</ExternalLink>.
                </p>
                <p style={NOTE}>
                    On Postgres, the pool model looks like this. A database policy compares each row&rsquo;s tenant to a
                    value your application sets at runtime, so one forgotten WHERE clause can&rsquo;t leak a
                    customer&rsquo;s data. (
                    <ExternalLink href={RLS_SOURCE.href}>{RLS_SOURCE.name}</ExternalLink>)
                </p>
                <pre
                    style={{
                        marginTop: '0.9rem',
                        marginBottom: 0,
                        padding: '1rem 1.15rem',
                        border: `1px solid ${LINE}`,
                        borderRadius: '0.75rem',
                        backgroundColor: 'rgba(0,0,0,0.22)',
                        fontSize: '0.8rem',
                        lineHeight: 1.6,
                        overflowX: 'auto',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                    }}
                >
                    <code>{RLS_SNIPPET}</code>
                </pre>
                <p style={NOTE}>
                    White-label is a layer on top: per-customer domains, branding, sending addresses and plans. Mailnitrix
                    has a lighter version of this, with client workspaces so agencies can run campaigns for each client
                    separately.
                </p>
            </>
        ),
        'add-ai-rag': (
            <p style={NOTE}>
                The filter is the part people get wrong. A vector search with no tenant filter will cheerfully quote
                customer A&rsquo;s contract to customer B. If the feature needs to take actions, not just answer, that is
                closer to our{' '}
                <Link href="/ai-agent-development-company" style={INLINE_LINK}>AI agent development</Link> work.
            </p>
        ),
        'what-is-paas': (
            <p style={NOTE}>
                PaaS development services, from us, means the platform layer: public APIs, webhooks, tenant provisioning,
                usage metering and developer docs. Valyrian Voice agents call outside systems through HTTP tools and
                webhooks, and Mailnitrix lists an API and webhooks. Neither one is a PaaS. Both had to build that layer
                anyway.
            </p>
        ),
        'saas-vs-paas': (
            <>
                <CompareTable {...SAAS_PAAS_TABLE} isMobile={isMobile} />
                <p style={NOTE}>
                    In India, Gartner forecasts 2026 spending of about ₹61,000 crore on PaaS, up 25.4%, against about
                    ₹44,000 crore on SaaS, up 18.9%, converted from US dollars (<ExternalLink href={GARTNER_SOURCE.href}>{GARTNER_SOURCE.name}</ExternalLink>). That is
                    spending on existing platforms, much of it AI-driven. It isn&rsquo;t a reason for you to build one.
                </p>
            </>
        ),
        'ai-chatbot-rag': (
            <p style={NOTE}>
                See the <Link href="/projects/rag-chatbot" style={INLINE_LINK}>RAG chatbot project</Link>. That one is a
                portfolio build, not a SaaS with paying tenants, so read it as proof of the pipeline. Tenancy and billing
                are the parts you would add from the multi-tenant answer above.
            </p>
        ),
        'email-saas': (
            <p style={NOTE}>
                The unglamorous bit is the error table. At Mailnitrix, a Gmail <code>550 5.4.5</code> rests that mailbox for
                24 hours, a <code>421 4.7.28</code> pauses it for an hour and longer on repeats, and an Outlook mailbox with
                SMTP disabled switches to the Microsoft Graph API and retries. Mailbox passwords and Microsoft tokens are
                encrypted at rest. More on{' '}
                <Link href="/email-infrastructure-development" style={INLINE_LINK}>email infrastructure development</Link>.
            </p>
        ),
        'voice-ai-saas': (
            <p style={NOTE}>
                Latency is the hard part. A pause of a couple of seconds and the caller assumes the line dropped. On our{' '}
                <Link href="/projects/voice-agent" style={INLINE_LINK}>earlier voice agent build</Link> we ran the whole
                pipeline on a single GPU at 600 to 800 ms, against around 3,000 ms for the multi-provider setups we
                compared it with. The longer version is on{' '}
                <Link href="/ai-voice-agent-development" style={INLINE_LINK}>AI voice agent development</Link>.
            </p>
        ),
    }

    return (
        <main style={{ backgroundColor: DARK, color: TEXT, fontFamily: INTER }}>
            <LandingHeader theme="dark" onContactClick={openContact} />

            {/* Hero. The H1 and the first sentence both open on the exact primary keyword. */}
            <section data-theme="dark" style={{ padding: isMobile ? '4rem 5% 3rem' : '7rem 8% 4rem' }}>
                <div style={{ maxWidth: '1100px' }}>
                    <nav aria-label="Breadcrumb" style={{ fontSize: '0.8rem', opacity: 0.55, marginBottom: '1.25rem' }}>
                        <Link href="/" style={{ color: 'inherit' }}>Home</Link>
                        <span aria-hidden="true"> / </span>
                        <span>SaaS Development Services</span>
                        <span aria-hidden="true"> · </span>
                        <span>
                            Last updated <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED}</time>
                        </span>
                    </nav>
                    <h1
                        style={{
                            fontFamily: MONTSERRAT,
                            fontSize: 'clamp(2.1rem, 5.5vw, 4.25rem)',
                            fontWeight: 800,
                            lineHeight: 1.03,
                            letterSpacing: '-0.03em',
                            margin: 0,
                            maxWidth: '980px',
                        }}
                    >
                        SaaS Development Services for Startups and Founders
                    </h1>
                    <p style={{ ...LEAD, marginTop: '1.75rem', maxWidth: '700px', opacity: 0.88 }}>
                        SaaS development services from Nexona Labs take your product from idea to live: MVP, multi-tenant
                        backend, billing and AI features, with the code handed over. We built Valyrian Voice and Mailnitrix.
                        Both are live. Go and look.
                    </p>

                    <div
                        style={{
                            marginTop: '1.75rem',
                            maxWidth: '700px',
                            borderLeft: `2px solid ${SAND}`,
                            paddingLeft: '1.25rem',
                        }}
                    >
                        <p style={{ fontSize: '0.98rem', lineHeight: 1.7, opacity: 0.78, margin: 0 }}>
                            <strong>SaaS development</strong> is building software that customers use through a browser
                            on a subscription, with one codebase serving all of them. The hard parts usually aren&rsquo;t
                            the screens. They are keeping customers&rsquo; data apart, billing correctly and staying up
                            when your biggest customer has a busy Monday.
                        </p>
                    </div>

                    <p style={{ fontSize: '0.92rem', lineHeight: 1.65, opacity: 0.62, marginTop: '1.25rem', maxWidth: '700px' }}>
                        Nexona Labs is a Mumbai-based custom SaaS development company and software studio. We work with
                        founders in India and abroad, and hand over the source code when it is done.
                    </p>

                    <div style={{ marginTop: '2.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button type="button" onClick={openContact} style={CTA}>
                            Get a free SaaS scoping call
                        </button>
                        <a
                            href="#proof"
                            style={{
                                ...CTA,
                                backgroundColor: 'transparent',
                                color: TEXT,
                                border: '1px solid rgba(232,223,211,0.35)',
                            }}
                        >
                            See what we built
                        </a>
                    </div>

                    <dl
                        style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
                            gap: isMobile ? '1.25rem' : '2rem',
                            marginTop: '3.5rem',
                            paddingTop: '2rem',
                            borderTop: `1px solid ${LINE}`,
                            marginBottom: 0,
                        }}
                    >
                        {HERO_FACTS.map((fact) => (
                            <div key={fact.label}>
                                <dt style={{ fontFamily: MONTSERRAT, fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)', fontWeight: 800 }}>
                                    {fact.value}
                                </dt>
                                <dd style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', opacity: 0.6 }}>{fact.label}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Proof, early. Two live products beat any list of technologies. */}
            <section id="proof" data-theme="dark" style={{ backgroundColor: PANEL, padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Proof of work</span>
                    <h2 style={H2}>Which SaaS products has Nexona Labs built?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '740px', opacity: 0.82 }}>
                        Valyrian Voice, an AI voice agent and dialer platform for call centers. And Mailnitrix, a cold email
                        SaaS for Gmail and Outlook. Open both. Neither publishes customer results yet, so we won&rsquo;t
                        either, and the numbers in these screenshots are demo data.
                    </p>

                    <div style={{ ...grid(2, isMobile ? '2rem' : '2rem'), marginTop: '3rem' }}>
                        {PROJECTS.map((project, i) => (
                            <article key={project.id} id={project.id} style={{ ...CARD, padding: 0, overflow: 'hidden', scrollMarginTop: '5rem' }}>
                                <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', borderBottom: `1px solid ${LINE}` }}>
                                    <Image
                                        src={project.image}
                                        width={project.width}
                                        height={project.height}
                                        sizes="(max-width: 768px) 90vw, 560px"
                                        priority={i === 0}
                                        alt={project.alt}
                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                    />
                                </a>
                                <div style={{ padding: isMobile ? '1.5rem' : '1.75rem 2rem 2rem' }}>
                                    <h3 style={{ ...H3, fontFamily: MONTSERRAT, fontSize: '1.3rem', fontWeight: 800, textTransform: 'uppercase' }}>
                                        {project.name}
                                    </h3>
                                    <p style={{ fontSize: '0.98rem', fontWeight: 600, margin: '0.5rem 0 0', opacity: 0.9 }}>
                                        {project.tagline}
                                    </p>
                                    <p style={CARD_BODY}>{project.summary}</p>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: '1.25rem 0 0' }}>
                                        {project.built.map((item) => (
                                            <li key={item} style={{ fontSize: '0.9rem', lineHeight: 1.55, opacity: 0.76, display: 'flex', gap: '0.6rem', marginBottom: '0.45rem' }}>
                                                <span aria-hidden="true" style={{ opacity: 0.45 }}>—</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <p style={{ fontSize: '0.92rem', margin: '1.25rem 0 0' }}>
                                        <ExternalLink href={project.url}>Open {project.domain}</ExternalLink>
                                        {' · '}
                                        <Link href={project.id === 'mailnitrix' ? '/email-infrastructure-development' : '/ai-voice-agent-development'} style={INLINE_LINK}>
                                            {project.id === 'mailnitrix' ? 'How we built the sending engine' : 'How we built the voice platform'}
                                        </Link>
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>

                    <blockquote
                        cite={CLUTCH_URL}
                        style={{
                            margin: isMobile ? '3rem 0 0' : '4rem 0 0',
                            maxWidth: '860px',
                            borderLeft: '2px solid rgba(232,223,211,0.3)',
                            paddingLeft: isMobile ? '1.25rem' : '2rem',
                        }}
                    >
                        <p style={{ fontFamily: MONTSERRAT, fontSize: isMobile ? '1.15rem' : '1.4rem', fontWeight: 600, lineHeight: 1.45, letterSpacing: '-0.01em', margin: 0 }}>
                            &ldquo;{CLUTCH_REVIEW.quote}&rdquo;
                        </p>
                        <footer style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55, marginTop: '1rem' }}>
                            {CLUTCH_REVIEW.attribution}
                        </footer>
                    </blockquote>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.62, marginTop: '1.25rem', maxWidth: '760px' }}>
                        <ExternalLink href={CLUTCH_URL}>Read the full review on Clutch</ExternalLink>.
                    </p>
                </div>
            </section>

            <ClientStrip />

            {/* Services. Contact-popup trigger. */}
            <section ref={thirdSectionRef} data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={EYEBROW}>What we do</span>
                    <h2 style={H2}>What do SaaS development services include?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '700px', opacity: 0.78 }}>
                        Everything between your idea and a product strangers can pay for: scoping, design, backend,
                        tenancy, billing, infrastructure and the first months after launch.
                    </p>
                    <div style={{ ...grid(3), marginTop: '2.75rem' }}>
                        {SERVICES.map((item) => (
                            <div key={item.title} style={CARD}>
                                <h3 style={H3}>{item.title}</h3>
                                <p style={CARD_BODY}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.68, marginTop: '2rem', maxWidth: '760px' }}>
                        Not a SaaS at all? We are also a{' '}
                        <Link href="/software-development-agency-mumbai" style={INLINE_LINK}>
                            custom software development company in India
                        </Link>{' '}
                        for internal systems and{' '}
                        <Link href="/business-management-software-development" style={INLINE_LINK}>
                            business management software
                        </Link>
                        . Same people.
                    </p>
                </div>
            </section>

            {/* The question sections. Each H3 is followed by a 40-60 word direct answer. */}
            {GROUPS.map((group, groupIndex) => (
                <section
                    key={group.id}
                    id={group.id}
                    data-theme="dark"
                    style={{
                        ...(groupIndex % 2 === 0 ? { backgroundColor: PANEL } : {}),
                        padding: pad,
                        scrollMarginTop: '5rem',
                    }}
                >
                    <div style={{ maxWidth: '980px', margin: '0 auto' }}>
                        <span style={EYEBROW}>{group.eyebrow}</span>
                        <h2 style={H2}>{group.heading}</h2>
                        <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '720px', opacity: 0.72 }}>{group.intro}</p>
                        <div style={{ marginTop: '2.25rem' }}>
                            {group.questions.map((q) => (
                                <div
                                    key={q.id}
                                    id={q.id}
                                    style={{ borderTop: `1px solid ${LINE}`, padding: isMobile ? '1.75rem 0' : '2.25rem 0', scrollMarginTop: '5rem' }}
                                >
                                    <h3 style={{ ...H3, fontSize: isMobile ? '1.12rem' : '1.3rem', lineHeight: 1.35 }}>{q.question}</h3>
                                    <p style={{ fontSize: '1rem', lineHeight: 1.7, opacity: 0.86, margin: '0.75rem 0 0', maxWidth: '800px' }}>
                                        {q.answer}
                                    </p>
                                    {extras[q.id]}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            {/* Author + trust */}
            <section data-theme="dark" style={{ padding: isMobile ? '3.5rem 5%' : '5rem 8%' }}>
                <div
                    style={{
                        maxWidth: '860px',
                        margin: '0 auto',
                        ...CARD,
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: '1.5rem',
                        alignItems: isMobile ? 'flex-start' : 'center',
                    }}
                >
                    <Image
                        src="/logo.png"
                        width={64}
                        height={64}
                        alt="Nexona Labs logo"
                        style={{ borderRadius: '0.75rem', flexShrink: 0 }}
                    />
                    <div>
                        <p style={{ ...EYEBROW, marginBottom: '0.4rem' }}>Written by</p>
                        <p style={{ ...H3, margin: 0 }}>The Nexona Labs team</p>
                        <p style={{ ...CARD_BODY, marginTop: '0.5rem' }}>
                            A Mumbai software studio and the team behind Valyrian Voice and Mailnitrix. 50+ systems shipped.
                            Last updated <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED}</time>.
                        </p>
                        <p style={{ fontSize: '0.88rem', marginTop: '0.75rem', marginBottom: 0, display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                            <ExternalLink href="https://www.linkedin.com/company/nexonalabs">LinkedIn</ExternalLink>
                            <ExternalLink href={CLUTCH_URL}>Reviews on Clutch</ExternalLink>
                        </p>
                    </div>
                </div>
            </section>

            {/* Close */}
            <section data-theme="dark" style={{ backgroundColor: PANEL, padding: pad, textAlign: 'center' }}>
                <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <h2 style={H2}>Get a free SaaS scoping call</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', opacity: 0.8 }}>
                        Thirty minutes. Tell us who pays you and for what. We will tell you what the smallest real version
                        looks like, how long it takes and what it costs. Should you not be building this yet, you will
                        hear that too.
                    </p>
                    <div style={{ marginTop: '2.25rem' }}>
                        <button type="button" onClick={openContact} style={CTA}>
                            Book the call
                        </button>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {contactOpen && (
                    <ContactOverlay
                        trigger={trigger}
                        heading="Book your free SaaS scoping call"
                        submitLabel="Request a callback"
                        onClose={closeContact}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
