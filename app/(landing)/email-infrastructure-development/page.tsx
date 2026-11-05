'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence } from 'framer-motion'
import LandingHeader from '../../components/LandingHeader'
import ContactOverlay from '../../components/ContactOverlay'
import Footer from '../../components/Footer'
import { useContactPopup } from '../../lib/useContactPopup'
import { DARK, SAND, INTER, CLUTCH_URL } from '../../lib/constants'
import {
    TEXT,
    PANEL,
    LINE,
    MONTSERRAT,
    SCOPING_CTA,
    H2,
    EYEBROW,
    LEAD,
    H3,
    CARD,
    CARD_BODY,
    NOTE,
    SOURCE,
    INLINE_LINK,
    CTA,
    SCREEN_FRAME,
    ExternalLink,
    DataTable,
    EstimateForm,
} from '../../components/LandingBlocks'
import {
    LAST_UPDATED,
    LAST_UPDATED_ISO,
    INTRO,
    MAILNITRIX_URL,
    CASE_BUILT,
    CASE_ENGINEERING,
    CASE_NUMBERS,
    WHAT_WE_BUILD,
    COST_ROWS,
    COST_SOURCE,
    COST_DRIVERS,
    COMPARE_TABLE,
    COMPARE_SOURCES,
    AUDIENCES,
    COOLDOWN_ROWS,
    REQUIREMENTS,
    REQUIREMENT_SOURCES,
    FURTHER_READING,
    FAQ_ITEMS,
} from './content'

export default function EmailInfrastructureDevelopmentPage() {
    const [isMobile, setIsMobile] = useState(false)
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
    const scopingButton = (
        <button type="button" onClick={openContact} style={{ ...CTA, marginTop: '2rem' }}>
            {SCOPING_CTA}
        </button>
    )
    const joinLinks = (items: { name: string; href: string }[]) =>
        items.map((s, i) => (
            <span key={s.name}>
                {i > 0 && ', '}
                <ExternalLink href={s.href}>{s.name}</ExternalLink>
            </span>
        ))

    return (
        <main style={{ backgroundColor: DARK, color: TEXT, fontFamily: INTER }}>
            <LandingHeader theme="dark" onContactClick={openContact} />

            {/* Hero */}
            <section data-theme="dark" style={{ padding: isMobile ? '4rem 5% 3rem' : '7rem 8% 4rem' }}>
                <div style={{ maxWidth: '1100px' }}>
                    <nav aria-label="Breadcrumb" style={{ fontSize: '0.8rem', opacity: 0.55, marginBottom: '1.25rem' }}>
                        <Link href="/" style={{ color: 'inherit' }}>Home</Link>
                        <span aria-hidden="true"> / </span>
                        <span>Email Infrastructure Development</span>
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
                        We Build High-Volume Email Sending Platforms
                    </h1>
                    <p style={{ ...LEAD, marginTop: '1.75rem', maxWidth: '720px', opacity: 0.88 }}>{INTRO}</p>
                    <button type="button" onClick={openContact} style={{ ...CTA, marginTop: '2.25rem' }}>
                        {SCOPING_CTA}
                    </button>
                </div>
            </section>

            {/* Case study */}
            <section id="mailnitrix" data-theme="dark" style={{ backgroundColor: PANEL, padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Case study</span>
                    <h2 style={H2}>Mailnitrix: cold email for Gmail and Outlook</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '760px', opacity: 0.82 }}>
                        The problem: Instantly and Smartlead price by tier and cap contacts on most plans, so cost jumps as a
                        list grows. Mailnitrix sends from the customer&rsquo;s own mailboxes, with paid plans that don&rsquo;t cap
                        mailboxes or contacts. It runs no mail servers or IP pools of its own.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.15fr 0.85fr', gap: isMobile ? '2rem' : '3.5rem', marginTop: '2.5rem', alignItems: 'start' }}>
                        <figure style={{ margin: 0 }}>
                            <a href={MAILNITRIX_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'block', ...SCREEN_FRAME }}>
                                <Image
                                    src="/saas/mailnitrix.webp"
                                    width={1440}
                                    height={829}
                                    sizes="(max-width: 768px) 90vw, 600px"
                                    priority
                                    alt="Mailnitrix, a cold email platform built by Nexona Labs, showing a sample campaign rotating across four Gmail and Outlook mailboxes with daily limits and one mailbox cooling down."
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                            </a>
                            <figcaption style={{ fontSize: '0.85rem', lineHeight: 1.6, opacity: 0.6, marginTop: '0.8rem' }}>
                                The live site, with a sample campaign. <ExternalLink href={MAILNITRIX_URL}>Open Mailnitrix</ExternalLink>
                            </figcaption>
                        </figure>
                        <div>
                            <h3 style={{ ...H3, fontSize: '1.2rem' }}>What we built</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0.9rem 0 0' }}>
                                {CASE_BUILT.map((item) => (
                                    <li key={item} style={{ fontSize: '0.93rem', lineHeight: 1.55, opacity: 0.78, display: 'flex', gap: '0.6rem', marginBottom: '0.5rem' }}>
                                        <span aria-hidden="true" style={{ opacity: 0.45 }}>—</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <h3 style={{ ...H3, fontSize: '1.2rem', marginTop: '3rem' }}>The engineering that matters</h3>
                    <div style={{ ...grid(3), marginTop: '1.25rem' }}>
                        {CASE_ENGINEERING.map((item) => (
                            <div key={item.title} style={CARD}>
                                <h4 style={H3}>{item.title}</h4>
                                <p style={CARD_BODY}>{item.body}</p>
                            </div>
                        ))}
                    </div>

                    <h3 style={{ ...H3, fontSize: '1.2rem', marginTop: '3rem' }}>The numbers</h3>
                    <dl style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? '1.25rem' : '2rem', margin: '1.25rem 0 0' }}>
                        {CASE_NUMBERS.map((n) => (
                            <div key={n.label}>
                                <dt style={{ fontFamily: MONTSERRAT, fontSize: 'clamp(1.3rem, 2.4vw, 1.9rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>{n.value}</dt>
                                <dd style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', opacity: 0.62 }}>{n.label}</dd>
                            </div>
                        ))}
                    </dl>
                    <p style={{ ...SOURCE, maxWidth: '820px' }}>
                        Monthly list prices read 5 November 2026 from{' '}
                        {joinLinks([{ name: 'Mailnitrix', href: 'https://mailnitrix.com/pricing' }, ...COMPARE_SOURCES])}.
                        To be fair to them, Smartlead Pro ($94) includes 90,000 sends and Instantly Hypergrowth ($107) includes
                        125,000, so the gap narrows as volume rises. Product prices, not what we charge to build.
                    </p>

                    <h3 style={{ ...H3, fontSize: '1.2rem', marginTop: '3rem' }}>The outcome</h3>
                    <p style={{ ...NOTE, opacity: 0.8, fontSize: '1rem', maxWidth: '800px' }}>
                        Mailnitrix is live, with a free tier you can sign up for and test yourself. User counts and send volumes
                        aren&rsquo;t public yet, so we won&rsquo;t quote any.
                    </p>
                    {scopingButton}
                </div>
            </section>

            {/* What we build */}
            <section data-theme="light" style={{ backgroundColor: SAND, color: DARK, padding: pad }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={{ ...EYEBROW, opacity: 0.6 }}>What we build</span>
                    <h2 style={H2}>What goes into an email sending platform?</h2>
                    <div style={{ ...grid(3, '1.75rem 2.25rem'), marginTop: '2.75rem' }}>
                        {WHAT_WE_BUILD.map((item) => (
                            <div key={item.title} style={{ borderTop: '1px solid rgba(46,42,38,0.18)', paddingTop: '1.1rem' }}>
                                <h3 style={{ ...H3, fontSize: '1rem', lineHeight: 1.35 }}>{item.title}</h3>
                                <p style={{ fontSize: '0.9rem', lineHeight: 1.62, opacity: 0.75, margin: '0.5rem 0 0' }}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cost. Trigger for the contact popup. */}
            <section id="cost" ref={thirdSectionRef} data-theme="dark" style={{ padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Cost and timeline</span>
                    <h2 style={H2}>How much does it cost to build a cold email platform?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '760px', opacity: 0.85 }}>
                        About ₹28.5 lakh to ₹52 lakh for an MVP, and up to about ₹1.43 crore for a platform you sell, on one
                        firm&rsquo;s published estimate. We send a written quote after a 30-minute scoping call.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.15fr 0.85fr', gap: isMobile ? '2rem' : '3.5rem', alignItems: 'start' }}>
                        <div>
                            <DataTable
                                caption="Cold email platform development cost and timeline by scope"
                                columns={['Scope', 'Timeline', 'Cost']}
                                rows={COST_ROWS}
                                isMobile={isMobile}
                            />
                            <p style={SOURCE}>
                                Timelines are our planning ranges. Costs are from{' '}
                                <ExternalLink href={COST_SOURCE.href}>{COST_SOURCE.name}</ExternalLink>, a vendor&rsquo;s estimate,
                                converted at about ₹95 to $1. Mailboxes and domains are extra.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ ...H3, marginTop: isMobile ? 0 : '1.5rem' }}>What drives the cost</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 0' }}>
                                {COST_DRIVERS.map(([name, body]) => (
                                    <li key={name} style={{ borderBottom: `1px solid ${LINE}`, padding: '0.7rem 0', fontSize: '0.9rem', lineHeight: 1.55 }}>
                                        <strong>{name}. </strong>
                                        <span style={{ opacity: 0.72 }}>{body}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {scopingButton}
                </div>
            </section>

            {/* Build vs buy vs white-label */}
            <section id="build-vs-buy" data-theme="dark" style={{ backgroundColor: PANEL, padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Build vs buy vs white-label</span>
                    <h2 style={H2}>Should you build, buy Instantly or Smartlead, or white-label?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '780px', opacity: 0.85 }}>
                        Buy, unless you have a reason not to. Low volume, or no developers, means a custom platform will only
                        cost you money. Build when email is the product you sell, or when your volume makes tiers absurd.
                    </p>
                    <DataTable {...COMPARE_TABLE} isMobile={isMobile} />
                    <p style={SOURCE}>Monthly list prices from {joinLinks(COMPARE_SOURCES)}, read 5 November 2026.</p>
                    <h3 style={{ ...H3, fontSize: '1.2rem', marginTop: '2.5rem' }}>The unit economics</h3>
                    <p style={{ ...NOTE, opacity: 0.8, fontSize: '1rem', maxWidth: '800px' }}>
                        Sending from mailboxes you already pay for changes the sums. Mailnitrix charges $0.75 per 1,000 emails on
                        its Launch plan and $0.30 per 1,000 above 500,000 on Enterprise. At 500,000 emails a month, Instantly Light
                        Speed lists $358 and Smartlead Unlimited Prime $379. That margin is the case for building your own, if you
                        also carry the abuse handling, support and upkeep.
                    </p>
                </div>
            </section>

            {/* Who it's for */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Who it&rsquo;s for</span>
                    <h2 style={H2}>Who should build their own email platform?</h2>
                    <div style={{ ...grid(2), marginTop: '2.5rem' }}>
                        {AUDIENCES.map((item) => (
                            <div key={item.title} style={CARD}>
                                <h3 style={H3}>{item.title}</h3>
                                <p style={CARD_BODY}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                    <p style={{ ...NOTE, marginTop: '1.75rem', maxWidth: '760px' }}>
                        Billing, tenancy and the rest of the product side are covered under{' '}
                        <Link href="/saas-development-services" style={INLINE_LINK}>SaaS development services</Link>.
                    </p>
                </div>
            </section>

            {/* Deliverability */}
            <section id="deliverability" data-theme="dark" style={{ backgroundColor: PANEL, padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Deliverability engineering</span>
                    <h2 style={H2}>How does a sending system protect sender reputation?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '780px', opacity: 0.85 }}>
                        By sending slowly and backing off quickly. It can&rsquo;t guarantee the inbox, and Mailnitrix&rsquo;s own FAQ says
                        so: &ldquo;No tool can promise that.&rdquo; Placement depends on your domain, mailboxes, list and copy.
                    </p>
                    <div style={{ ...grid(3), marginTop: '2.25rem' }}>
                        <div style={CARD}>
                            <h3 style={H3}>Rolling limits, not midnight resets</h3>
                            <p style={CARD_BODY}>A midnight reset lets a mailbox send a full day’s volume at 11 pm and again at 12:01. Counting the last 24 hours stops that.</p>
                        </div>
                        <div style={CARD}>
                            <h3 style={H3}>Paced send gaps</h3>
                            <p style={CARD_BODY}>Random gaps of 20 seconds to 2 minutes by default. Backlogs get re-spaced instead of fired together, even after a restart.</p>
                        </div>
                        <div style={CARD}>
                            <h3 style={H3}>Rotation with honest limits</h3>
                            <p style={CARD_BODY}>Rotation spreads volume and contains damage. At 30 to 40 a day per mailbox, it doesn’t rescue a bad list or an unwanted message.</p>
                        </div>
                    </div>
                    <h3 style={{ ...H3, fontSize: '1.2rem', marginTop: '3rem' }}>Cooldowns per error type</h3>
                    <DataTable
                        caption="How Mailnitrix responds to Gmail and Microsoft SMTP error codes"
                        columns={['Code', 'What it means', 'What the system does']}
                        rows={COOLDOWN_ROWS}
                        isMobile={isMobile}
                    />
                    <p style={SOURCE}>
                        From <ExternalLink href="https://mailnitrix.com/features/inbox-rotation">Mailnitrix inbox rotation</ExternalLink>.
                        Further reading: {joinLinks(FURTHER_READING)}.
                    </p>
                </div>
            </section>

            {/* Compliance */}
            <section id="compliance" data-theme="dark" style={{ padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Compliance</span>
                    <h2 style={H2}>What rules does an email sending platform need to follow?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '780px', opacity: 0.85 }}>
                        We build for legitimate B2B outreach. If the brief is getting around spam filters, or mailing people who
                        asked you to stop, we are the wrong team.
                    </p>
                    <h3 style={{ ...H3, fontSize: '1.2rem', marginTop: '2.5rem' }}>Mailbox provider requirements</h3>
                    <DataTable
                        caption="Google, Yahoo and Microsoft bulk sender requirements"
                        columns={['Provider', 'Applies to', 'Requirements']}
                        rows={REQUIREMENTS}
                        isMobile={isMobile}
                    />
                    <div style={{ ...grid(2, '1.5rem 2.5rem'), marginTop: '2.5rem' }}>
                        <div>
                            <h3 style={H3}>CAN-SPAM (US)</h3>
                            <p style={CARD_BODY}>No misleading headers or subjects, a real postal address, and a clear opt-out honoured within 10 business days. The FTC lists penalties of up to $53,088 per email.</p>
                        </div>
                        <div>
                            <h3 style={H3}>GDPR and PECR (EU, UK)</h3>
                            <p style={CARD_BODY}>In the UK, PECR’s email consent rule doesn’t apply to corporate subscribers, but sole traders are treated as individuals and UK GDPR still applies. EU rules vary by country, and some are stricter.</p>
                        </div>
                        <div>
                            <h3 style={H3}>Unsubscribes and suppression</h3>
                            <p style={CARD_BODY}>An unsubscribe has to reach every mailbox and every campaign, including ones not yet created. We build one suppression list per tenant, checked before each send.</p>
                        </div>
                        <div>
                            <h3 style={H3}>Acceptable use</h3>
                            <p style={CARD_BODY}>Your platform needs a policy and the means to enforce it. <ExternalLink href="https://mailnitrix.com/legal/acceptable-use">Mailnitrix’s</ExternalLink> bans purchased consumer lists and may pause sending above a 5% bounce rate or a 0.3% complaint rate.</p>
                        </div>
                    </div>
                    <p style={{ ...NOTE, marginTop: '2rem', maxWidth: '800px' }}>
                        A caution on warmup: it is automated engagement, and mailbox providers can restrict that. Treat it as one modest
                        input, never as a substitute for sending email people want.
                    </p>
                    <p style={{ ...SOURCE, maxWidth: '800px' }}>
                        Sources: {joinLinks(REQUIREMENT_SOURCES)}. Checked 5 November 2026, and these keep tightening. This is general
                        information, not legal advice, so confirm requirements with your own counsel.
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section data-theme="dark" style={{ backgroundColor: PANEL, padding: pad }}>
                <div style={{ maxWidth: '860px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Questions</span>
                    <h2 style={H2}>Cold email platform questions, answered</h2>
                    <div style={{ marginTop: '2.5rem' }}>
                        {FAQ_ITEMS.map((faq) => (
                            <div key={faq.question} style={{ borderTop: `1px solid ${LINE}`, padding: '1.5rem 0' }}>
                                <h3 style={{ ...H3, lineHeight: 1.45 }}>{faq.question}</h3>
                                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.75, margin: '0.6rem 0 0', maxWidth: '720px' }}>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                    {scopingButton}
                </div>
            </section>

            {/* About + authorship */}
            <section data-theme="dark" style={{ padding: isMobile ? '3.5rem 5%' : '5rem 8%' }}>
                <div style={{ maxWidth: '860px', margin: '0 auto', ...CARD, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1.5rem', alignItems: isMobile ? 'flex-start' : 'center' }}>
                    <Image src="/logo.png" width={64} height={64} alt="Nexona Labs logo" style={{ borderRadius: '0.75rem', flexShrink: 0 }} />
                    <div>
                        <p style={{ ...EYEBROW, marginBottom: '0.4rem' }}>Written by</p>
                        <p style={{ ...H3, margin: 0 }}>The Nexona Labs team</p>
                        <p style={{ ...CARD_BODY, marginTop: '0.5rem' }}>
                            A Mumbai software studio, and the team that built Mailnitrix. Last updated{' '}
                            <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED}</time>.
                        </p>
                        <p style={{ fontSize: '0.88rem', marginTop: '0.75rem', marginBottom: 0, display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                            <ExternalLink href="https://www.linkedin.com/company/nexonalabs">LinkedIn</ExternalLink>
                            <ExternalLink href={CLUTCH_URL}>Reviews on Clutch</ExternalLink>
                        </p>
                    </div>
                </div>
            </section>

            {/* Estimate form */}
            <section id="estimate" data-theme="dark" style={{ backgroundColor: PANEL, padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                    <h2 style={H2}>Estimate your email platform</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', opacity: 0.8 }}>
                        Four quick answers. We reply with a rough range, or tell you to go and buy Instantly instead.
                    </p>
                    <EstimateForm
                        formLocation="estimate-form-email"
                        isMobile={isMobile}
                        fields={[
                            { name: 'providers', label: 'Providers needed', options: ['Gmail only', 'Outlook only', 'Gmail and Outlook', 'Other or not sure'] },
                            { name: 'volume', label: 'Emails a month', options: ['Under 50,000', '50,000 to 500,000', '500,000 to 5 million', 'Over 5 million'] },
                            { name: 'product', label: 'Your own use or a product?', options: ['Internal use', 'White-label for clients', 'A product we will sell', 'Inside our existing SaaS'] },
                            { name: 'timeline', label: 'When do you need it?', options: ['This month', '1 to 3 months', '3 to 6 months', 'Just exploring'] },
                        ]}
                    />
                </div>
            </section>

            <AnimatePresence>
                {contactOpen && (
                    <ContactOverlay trigger={trigger} heading={SCOPING_CTA} submitLabel="Request a callback" onClose={closeContact} />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
