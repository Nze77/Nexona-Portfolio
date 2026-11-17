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
    ExternalLink,
    DataTable,
    EstimateForm,
} from '../../components/LandingBlocks'
import {
    LAST_UPDATED,
    LAST_UPDATED_ISO,
    INTRO,
    HERO_STATS,
    CASE_POINTS,
    CASE_NUMBERS,
    MODES_TABLE,
    FEATURES,
    PRICE_DRIVERS,
    PER_SEAT_PROBLEMS,
    COMPARE_TABLE,
    INDUSTRIES,
    PROCESS,
    TRAI_RULES,
    TRAI_DIALER_DOES,
    TRAI_SOURCES,
    FAQ_ITEMS,
} from './content'

const PRICING_CTA = 'Get a flat price for your floor'
const LIGHT_LINK: React.CSSProperties = { color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px' }

export default function CloudContactCenterPredictiveDialerPage() {
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
    const pricingButton = (
        <button type="button" onClick={openContact} style={{ ...CTA, marginTop: '2rem' }}>
            {PRICING_CTA}
        </button>
    )

    return (
        <main style={{ backgroundColor: DARK, color: TEXT, fontFamily: INTER }}>
            <LandingHeader theme="dark" onContactClick={openContact} />

            {/* Hero */}
            <section data-theme="dark" style={{ padding: isMobile ? '4rem 5% 3rem' : '7rem 8% 4rem' }}>
                <div style={{ maxWidth: '1100px' }}>
                    <nav aria-label="Breadcrumb" style={{ fontSize: '0.8rem', opacity: 0.55, marginBottom: '1.25rem' }}>
                        <Link href="/" style={{ color: 'inherit' }}>Home</Link>
                        <span aria-hidden="true"> / </span>
                        <span>Cloud Contact Center Dialer</span>
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
                            maxWidth: '1000px',
                        }}
                    >
                        Cloud Contact Center Predictive Dialer for Indian BPOs. No Per-Agent Fees.
                    </h1>
                    <p style={{ ...LEAD, marginTop: '1.75rem', maxWidth: '740px', opacity: 0.88 }}>{INTRO}</p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '2.25rem' }}>
                        <button type="button" onClick={openContact} style={CTA}>
                            {PRICING_CTA}
                        </button>
                        <a href="#fc-bpo" style={{ ...INLINE_LINK, fontSize: '0.92rem' }}>Read the FC BPO story</a>
                    </div>
                    <dl style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? '1.25rem' : '2rem', margin: '3.5rem 0 0', maxWidth: '1000px' }}>
                        {HERO_STATS.map((s) => (
                            <div key={s.label} style={{ borderTop: `1px solid ${LINE}`, paddingTop: '0.9rem' }}>
                                <dt style={{ fontFamily: MONTSERRAT, fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>{s.value}</dt>
                                <dd style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', opacity: 0.62 }}>{s.label}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Case study */}
            <section id="fc-bpo" data-theme="dark" style={{ backgroundColor: PANEL, padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Client story</span>
                    <h2 style={H2}>FC BPO: 60 agents, 70% lower costs</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '780px', opacity: 0.85 }}>
                        FC BPO was paying for seats and getting throttled anyway. Sixty agents now dial on one flat plan,
                        with costs down 70% and rate limits much higher than they had before.
                    </p>
                    <div style={{ ...grid(3, '1.5rem 2.5rem'), marginTop: '2.5rem' }}>
                        {CASE_POINTS.map(([name, body]) => (
                            <div key={name} style={{ borderTop: `1px solid ${LINE}`, paddingTop: '1rem' }}>
                                <h3 style={H3}>{name}</h3>
                                <p style={CARD_BODY}>{body}</p>
                            </div>
                        ))}
                    </div>
                    <dl style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '1.25rem' : '2rem', margin: '3rem 0 0' }}>
                        {CASE_NUMBERS.map((n) => (
                            <div key={n.label} style={CARD}>
                                <dt style={{ fontFamily: MONTSERRAT, fontSize: 'clamp(1.5rem, 3vw, 2.3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>{n.value}</dt>
                                <dd style={{ margin: '0.35rem 0 0', fontSize: '0.88rem', opacity: 0.65 }}>{n.label}</dd>
                            </div>
                        ))}
                    </dl>
                    <p style={{ ...NOTE, maxWidth: '780px' }}>
                        Rate limits matter more than most dialer brochures admit. A predictive dialer that can&rsquo;t place
                        enough calls per second is just an expensive progressive dialer.
                    </p>
                    {pricingButton}
                </div>
            </section>

            {/* Dialing modes */}
            <section id="dialing-modes" data-theme="dark" style={{ padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Dialing modes</span>
                    <h2 style={H2}>Predictive, progressive, power or preview?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '780px', opacity: 0.85 }}>
                        Predictive for big cold lists. Progressive for warm leads. All four come with the dialer, and you
                        switch per campaign, not per contract.
                    </p>
                    <DataTable {...MODES_TABLE} isMobile={isMobile} />
                    <p style={{ ...NOTE, maxWidth: '800px' }}>
                        India has no published cap on dropped calls that we know of. The US caps it at 3% of answered calls
                        per campaign over 30 days, and that&rsquo;s a sensible ceiling here too. Above it, complaints climb,
                        and under TRAI&rsquo;s 2026 rules complaints get numbers cut off faster.
                    </p>
                </div>
            </section>

            {/* Features */}
            <section data-theme="light" style={{ backgroundColor: SAND, color: DARK, padding: pad }}>
                <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                    <span style={{ ...EYEBROW, opacity: 0.6 }}>What&rsquo;s in the dialer</span>
                    <h2 style={H2}>Outbound predictive dialer with CRM and call recording</h2>
                    <div style={{ ...grid(2, '1.75rem 3rem'), marginTop: '2.75rem' }}>
                        {FEATURES.map((item) => (
                            <div key={item.title} style={{ borderTop: '1px solid rgba(46,42,38,0.18)', paddingTop: '1.1rem' }}>
                                <h3 style={H3}>{item.title}</h3>
                                <p style={{ fontSize: '0.93rem', lineHeight: 1.65, opacity: 0.75, margin: '0.5rem 0 0' }}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.72, marginTop: '2rem', maxWidth: '780px' }}>
                        No CRM yet, or one your agents hate? We build{' '}
                        <Link href="/customer-retention-management-software" style={LIGHT_LINK}>custom CRMs</Link>
                        {' '}that plug straight into the dialer. AI agents that work the cold end of a list sit under{' '}
                        <Link href="/ai-voice-agent-development" style={LIGHT_LINK}>AI voice agent development</Link>
                        , and the dispositions-to-WhatsApp-to-CRM busywork under{' '}
                        <Link href="/ai-automation-agency" style={LIGHT_LINK}>AI automation</Link>.
                    </p>
                </div>
            </section>

            {/* Pricing. Trigger for the contact popup. */}
            <section id="pricing" ref={thirdSectionRef} data-theme="dark" style={{ padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Dialer pricing in India</span>
                    <h2 style={H2}>One flat price. No per-agent fee.</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '760px', opacity: 0.85 }}>
                        You pay one figure, set by the features you need and the scale you dial at. Not by how many people
                        log in. We quote it in writing after a 30-minute call. Ask us for it.
                    </p>

                    <h3 style={{ ...H3, marginTop: '2.5rem' }}>Why per-agent pricing hurts a BPO</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0.75rem 0 0' }}>
                        {PER_SEAT_PROBLEMS.map((line) => (
                            <li key={line} style={{ borderBottom: `1px solid ${LINE}`, padding: '0.8rem 0', fontSize: '0.93rem', lineHeight: 1.6, opacity: 0.8 }}>
                                {line}
                            </li>
                        ))}
                    </ul>

                    <h3 style={{ ...H3, marginTop: '2.5rem' }}>What sets your flat price</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0.75rem 0 0' }}>
                        {PRICE_DRIVERS.map(([name, body]) => (
                            <li key={name} style={{ borderBottom: `1px solid ${LINE}`, padding: '0.8rem 0', fontSize: '0.93rem', lineHeight: 1.6 }}>
                                <strong>{name}. </strong>
                                <span style={{ opacity: 0.72 }}>{body}</span>
                            </li>
                        ))}
                    </ul>
                    {pricingButton}
                </div>
            </section>

            {/* Compare */}
            <section id="compare" data-theme="dark" style={{ backgroundColor: PANEL, padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Compare</span>
                    <h2 style={H2}>Per-agent dialer, flat-priced dialer or open source?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '780px', opacity: 0.85 }}>
                        Under about 20 agents, a per-agent cloud dialer is fine, honestly. Past that, seat fees start eating
                        the margin on every client contract, and flat pricing wins.
                    </p>
                    <DataTable {...COMPARE_TABLE} isMobile={isMobile} />
                    <p style={{ ...NOTE, maxWidth: '800px' }}>
                        Want the dialer as a product of your own, sold to other BPOs under your brand? That&rsquo;s a different
                        project: <Link href="/saas-development-services" style={INLINE_LINK}>SaaS development</Link>.
                    </p>
                </div>
            </section>

            {/* TRAI compliance */}
            <section id="trai-compliance" data-theme="dark" style={{ padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>TRAI compliance</span>
                    <h2 style={H2}>TRAI rules for outbound dialers in India</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '780px', opacity: 0.82 }}>
                        Short version: promotional calls from registered 140-series numbers, service calls from 1600, a DND
                        scrub before every campaign, and your predictive dialer declared to your telecom provider. The dialer
                        handles the mechanics. Registration and consent stay yours.
                    </p>
                    <div style={{ ...grid(2, '1.75rem 3rem'), marginTop: '2.5rem' }}>
                        {TRAI_RULES.map((item) => (
                            <div key={item.title} style={{ borderTop: `1px solid ${LINE}`, paddingTop: '1rem' }}>
                                <h3 style={H3}>{item.title}</h3>
                                <p style={CARD_BODY}>{item.body}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ ...CARD, marginTop: '2.5rem' }}>
                        <h3 style={H3}>What our dialer does about it</h3>
                        <ul style={{ margin: '0.9rem 0 0', paddingLeft: '1.1rem', fontSize: '0.93rem', lineHeight: 1.75, opacity: 0.8 }}>
                            {TRAI_DIALER_DOES.map((line) => (
                                <li key={line}>{line}</li>
                            ))}
                        </ul>
                    </div>

                    <p style={{ ...NOTE, marginTop: '2rem', maxWidth: '800px' }}>
                        On caller ID: use only numbers you own and registered. Rotating numbers to dodge spam labels is the
                        quickest way to lose all of them.
                    </p>
                    <p style={{ ...SOURCE, maxWidth: '800px' }}>
                        General information, not legal advice. TRAI keeps amending these rules, so check with your telecom
                        provider and counsel before a campaign. Sources:{' '}
                        {TRAI_SOURCES.map((s, i) => (
                            <span key={s.name}>
                                {i > 0 && ', '}
                                <ExternalLink href={s.href}>{s.name}</ExternalLink>
                            </span>
                        ))}
                        , read {LAST_UPDATED}.
                    </p>
                </div>
            </section>

            {/* Industries */}
            <section data-theme="dark" style={{ backgroundColor: PANEL, padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Who it&rsquo;s for</span>
                    <h2 style={H2}>Built for Indian call center floors</h2>
                    <div style={{ ...grid(2), marginTop: '2.5rem' }}>
                        {INDUSTRIES.map((item) => (
                            <div key={item.title} style={CARD}>
                                <h3 style={H3}>{item.title}</h3>
                                <p style={CARD_BODY}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Switching over</span>
                    <h2 style={H2}>How you move to our cloud dialer</h2>
                    <ol style={{ listStyle: 'none', padding: 0, margin: '2.25rem 0 0' }}>
                        {PROCESS.map(([name, time, body], i) => (
                            <li
                                key={name}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: isMobile ? '1fr' : '2.5rem 12rem 7rem 1fr',
                                    gap: isMobile ? '0.2rem' : '1rem',
                                    borderTop: `1px solid ${LINE}`,
                                    padding: '1.1rem 0',
                                    fontSize: '0.93rem',
                                    lineHeight: 1.6,
                                }}
                            >
                                <span aria-hidden="true" style={{ fontWeight: 700, opacity: 0.4 }}>{String(i + 1).padStart(2, '0')}</span>
                                <strong>{name}</strong>
                                <span style={{ opacity: 0.6 }}>{time}</span>
                                <span style={{ opacity: 0.75 }}>{body}</span>
                            </li>
                        ))}
                    </ol>
                    {pricingButton}
                </div>
            </section>

            {/* FAQ */}
            <section data-theme="dark" style={{ backgroundColor: PANEL, padding: pad }}>
                <div style={{ maxWidth: '860px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Questions</span>
                    <h2 style={H2}>Cloud dialer questions, answered</h2>
                    <div style={{ marginTop: '2.5rem' }}>
                        {FAQ_ITEMS.map((faq) => (
                            <div key={faq.question} style={{ borderTop: `1px solid ${LINE}`, padding: '1.5rem 0' }}>
                                <h3 style={{ ...H3, lineHeight: 1.45 }}>{faq.question}</h3>
                                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.75, margin: '0.6rem 0 0', maxWidth: '720px' }}>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                    {pricingButton}
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
                            A <Link href="/software-development-agency-mumbai" style={INLINE_LINK}>Mumbai software studio</Link>.
                            We run the dialer FC BPO&rsquo;s floor uses, and we built the calling platform behind Valyrian
                            Voice. Last updated <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED}</time>.
                        </p>
                        <p style={{ fontSize: '0.88rem', marginTop: '0.75rem', marginBottom: 0, display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                            <ExternalLink href="https://www.linkedin.com/company/nexonalabs">LinkedIn</ExternalLink>
                            <ExternalLink href={CLUTCH_URL}>Reviews on Clutch</ExternalLink>
                            <Link href="/reviews" style={INLINE_LINK}>Client reviews</Link>
                            <Link href="/projects/voice-agent" style={INLINE_LINK}>Voice agent project</Link>
                        </p>
                    </div>
                </div>
            </section>

            {/* Estimate form */}
            <section id="estimate" data-theme="dark" style={{ backgroundColor: PANEL, padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                    <h2 style={H2}>Get your flat price</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', opacity: 0.8 }}>
                        Three questions about your floor. We come back with a flat price and a time to walk you through it.
                    </p>
                    <EstimateForm
                        formLocation="estimate-form-cloud-dialer"
                        isMobile={isMobile}
                        fields={[
                            { name: 'agents', label: 'Agents on the floor', options: ['Under 20', '20 to 50', '50 to 150', 'Over 150'] },
                            { name: 'mode', label: 'Main dialing mode', options: ['Predictive', 'Progressive or power', 'Preview', 'Not sure yet'] },
                            { name: 'current', label: 'What do you dial on today?' },
                        ]}
                    />
                </div>
            </section>

            <AnimatePresence>
                {contactOpen && (
                    <ContactOverlay trigger={trigger} heading={PRICING_CTA} submitLabel="Request a callback" onClose={closeContact} />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
