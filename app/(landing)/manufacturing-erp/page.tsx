'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import LandingHeader from '../../components/LandingHeader'
import ClientStrip from '../../components/ClientStrip'
import ContactOverlay from '../../components/ContactOverlay'
import Footer from '../../components/Footer'
import { useContactPopup } from '../../lib/useContactPopup'
import { DARK, SAND, INTER } from '../../lib/constants'
import {
    STARTING_PRICE,
    HERO_FACTS,
    COST_DRIVERS,
    TIMELINE,
    SIGNALS,
    COMPARISON,
    FEATURES,
    MES_ITEMS,
    INTEGRATIONS,
    WHY_BETTER,
    PROCESS,
    EXAMPLES,
    INDUSTRIES,
    FAQ_ITEMS,
} from './content'

// Slightly whiter than SAND — used for text on this page's dark sections,
// matching the sibling ERP landing page.
const TEXT = '#F2EEE8'
const PANEL = '#25221F'
const LINE = 'rgba(232,223,211,0.14)'

const H2: React.CSSProperties = {
    fontFamily: 'var(--font-montserrat), sans-serif',
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

export default function ManufacturingErpPage() {
    const [isMobile, setIsMobile] = useState(false)
    const [openFaq, setOpenFaq] = useState<number | null>(0)
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

    return (
        <main style={{ backgroundColor: DARK, color: TEXT, fontFamily: INTER }}>
            <LandingHeader theme="dark" onContactClick={openContact} />

            {/* Hero */}
            <section data-theme="dark" style={{ padding: isMobile ? '4rem 5% 3rem' : '7rem 8% 5rem' }}>
                <div style={{ maxWidth: '1100px' }}>
                    <span style={EYEBROW}>Manufacturing ERP · MES · Mumbai, India</span>
                    <h1
                        style={{
                            fontFamily: 'var(--font-montserrat), sans-serif',
                            fontSize: 'clamp(2.1rem, 5.5vw, 4.25rem)',
                            fontWeight: 800,
                            lineHeight: 1.03,
                            letterSpacing: '-0.03em',
                            margin: 0,
                            maxWidth: '980px',
                        }}
                    >
                        Custom Manufacturing ERP Software Development Company in India
                    </h1>
                    <p style={{ ...LEAD, marginTop: '1.75rem', maxWidth: '680px', opacity: 0.82 }}>
                        We are a Mumbai-based team that builds ERP, MES, inventory and production software for
                        Indian factories — from scratch, around how your plant already runs. Not an Odoo
                        template with your logo on it. Production, BOM, stock, quality, dispatch, Tally and
                        GST, on a phone at the machine or{' '}
                        <Link href="/mobile-app-development-company-in-mumbai" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                            as a mobile app
                        </Link>
                        . Every module, from {STARTING_PRICE}. You own the code.
                    </p>
                    <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button type="button" onClick={openContact} style={CTA}>
                            Get a quote for your plant
                        </button>
                        <a
                            href="#cost"
                            style={{
                                ...CTA,
                                backgroundColor: 'transparent',
                                color: TEXT,
                                border: `1px solid rgba(232,223,211,0.35)`,
                            }}
                        >
                            See pricing and timeline
                        </a>
                    </div>

                    <dl
                        style={{
                            ...grid(4, isMobile ? '1.25rem' : '2rem'),
                            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
                            marginTop: '3.5rem',
                            paddingTop: '2rem',
                            borderTop: `1px solid ${LINE}`,
                            marginBottom: 0,
                        }}
                    >
                        {HERO_FACTS.map((fact) => (
                            <div key={fact.label}>
                                <dt style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: 'clamp(1.15rem, 2vw, 1.5rem)', fontWeight: 800 }}>
                                    {fact.value}
                                </dt>
                                <dd style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', opacity: 0.6 }}>{fact.label}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            <ClientStrip />

            {/* Signals — captures "do I need an ERP yet" research intent */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Sound familiar?</span>
                    <h2 style={H2}>Has your factory outgrown spreadsheets — or its ERP?</h2>
                    <div style={{ ...grid(2, '1rem 2.5rem'), marginTop: '2.5rem' }}>
                        {SIGNALS.map((signal) => (
                            <div key={signal} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                                <span aria-hidden="true" style={{ opacity: 0.4, lineHeight: 1.7 }}>—</span>
                                <p style={{ fontSize: '0.98rem', lineHeight: 1.7, opacity: 0.78, margin: 0 }}>{signal}</p>
                            </div>
                        ))}
                    </div>
                    <p style={{ ...LEAD, marginTop: '2.5rem', maxWidth: '660px', opacity: 0.78 }}>
                        Two of these and the spreadsheets are already costing you more than software would.
                        You just cannot see it on a bill anywhere.
                    </p>
                </div>
            </section>

            {/* Cost & timeline — third section, one of the two contact-popup triggers */}
            <section id="cost" ref={thirdSectionRef} data-theme="dark" style={{ backgroundColor: PANEL, padding: pad, scrollMarginTop: '5rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Cost and timeline</span>
                    <h2 style={H2}>How much does a custom manufacturing ERP cost in India?</h2>

                    <div
                        style={{
                            marginTop: '2.5rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '0.9fr 1.1fr',
                            gap: isMobile ? '2rem' : '3.5rem',
                            alignItems: 'start',
                        }}
                    >
                        <div style={{ ...CARD, padding: isMobile ? '2rem 1.5rem' : '2.5rem 2.25rem' }}>
                            <span style={{ ...EYEBROW, marginBottom: '0.5rem' }}>Development starts at</span>
                            <p
                                style={{
                                    fontFamily: 'var(--font-montserrat), sans-serif',
                                    fontSize: 'clamp(2.75rem, 6vw, 4rem)',
                                    fontWeight: 800,
                                    letterSpacing: '-0.03em',
                                    lineHeight: 1,
                                    margin: 0,
                                }}
                            >
                                {STARTING_PRICE}
                            </p>
                            <p style={{ ...LEAD, opacity: 0.8, marginTop: '1.25rem', marginBottom: 0 }}>
                                For all of it. Production planning, BOM, inventory, purchase, dispatch, quality,
                                job work, maintenance, costing, GST accounts, reports — every module on this
                                page, on web and phone. Not a starter tier with the useful bits held back.
                            </p>
                            <p style={{ fontSize: '0.92rem', lineHeight: 1.65, opacity: 0.65, marginTop: '1rem', marginBottom: 0 }}>
                                No per-user licence on top. Hire forty more people and the bill stays where it
                                is. We scope it first, then quote each stage before we start it.
                            </p>
                            <button type="button" onClick={openContact} style={{ ...CTA, marginTop: '1.75rem' }}>
                                Get your number
                            </button>
                        </div>

                        <div>
                            <h3 style={{ ...H3, fontSize: '1.1rem' }}>What moves the price up</h3>
                            <div style={{ ...grid(2, '1.25rem 2rem'), marginTop: '1.25rem' }}>
                                {COST_DRIVERS.map((d) => (
                                    <div key={d.title} style={{ borderTop: `1px solid ${LINE}`, paddingTop: '0.9rem' }}>
                                        <h4 style={{ ...H3, fontSize: '0.95rem' }}>{d.title}</h4>
                                        <p style={{ ...CARD_BODY, marginTop: '0.4rem' }}>{d.body}</p>
                                    </div>
                                ))}
                            </div>

                            <h3 style={{ ...H3, fontSize: '1.1rem', marginTop: '2.75rem' }}>How long it takes</h3>
                            <div style={{ marginTop: '1rem' }}>
                                {TIMELINE.map((t) => (
                                    <div
                                        key={t.phase}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            gap: '1rem',
                                            padding: '0.9rem 0',
                                            borderBottom: `1px solid ${LINE}`,
                                            fontSize: '0.95rem',
                                        }}
                                    >
                                        <span style={{ opacity: 0.8 }}>{t.phase}</span>
                                        <strong style={{ whiteSpace: 'nowrap' }}>{t.time}</strong>
                                    </div>
                                ))}
                            </div>
                            <p style={{ fontSize: '0.9rem', lineHeight: 1.65, opacity: 0.6, marginTop: '1rem', marginBottom: 0 }}>
                                Your team is on real screens inside the first month. Not a demo — the thing
                                they will be using in a year.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom vs ERPNext / Odoo — the decision people are actually making */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Custom vs ERPNext, Odoo and boxed ERP</span>
                    <h2 style={H2}>Should you build a custom ERP or use ERPNext or Odoo?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '680px', opacity: 0.75 }}>
                        Use ERPNext or Odoo if your factory already works the way they expect. Some do, and we
                        will tell you on the first call if yours is one of them. Build custom when your process
                        is the reason you win orders — odd routings, job work, batch rules, a costing method
                        nobody else does quite like you. Customising someone else&rsquo;s product to fit that
                        means paying a partner to bend it, then paying again when the next version upgrade
                        breaks the bends.
                    </p>

                    <div style={{ marginTop: '2.5rem' }}>
                        <div
                            style={{
                                display: isMobile ? 'none' : 'grid',
                                gridTemplateColumns: '0.8fr 1.1fr 1.1fr',
                                gap: '1.5rem',
                                paddingBottom: '0.9rem',
                                borderBottom: '1px solid rgba(232,223,211,0.2)',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                opacity: 0.45,
                            }}
                        >
                            <span />
                            <span>ERPNext / Odoo / boxed</span>
                            <span>Nexona, built from scratch</span>
                        </div>

                        {COMPARISON.map((row) => (
                            <div
                                key={row.point}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: isMobile ? '1fr' : '0.8fr 1.1fr 1.1fr',
                                    gap: isMobile ? '0.4rem' : '1.5rem',
                                    padding: isMobile ? '1.25rem 0' : '1.4rem 0',
                                    borderBottom: '1px solid rgba(232,223,211,0.1)',
                                    alignItems: 'start',
                                }}
                            >
                                <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>{row.point}</span>
                                <span style={{ fontSize: '0.92rem', lineHeight: 1.6, opacity: 0.55 }}>
                                    {isMobile && <strong style={{ opacity: 0.75 }}>ERPNext / Odoo: </strong>}
                                    {row.boxed}
                                </span>
                                <span style={{ fontSize: '0.92rem', lineHeight: 1.6, opacity: 0.9 }}>
                                    {isMobile && <strong style={{ opacity: 0.75 }}>Nexona: </strong>}
                                    {row.nexona}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modules */}
            <section data-theme="light" style={{ backgroundColor: SAND, color: DARK, padding: pad }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={{ ...EYEBROW, opacity: 0.6 }}>Modules</span>
                    <h2 style={H2}>What modules does a manufacturing ERP need?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '660px', opacity: 0.7 }}>
                        Production, BOM, inventory, quality and dispatch are the spine. All twelve below come
                        in the {STARTING_PRICE} starting price. Not every plant uses every one — a screen
                        nobody opens is switched off, not billed for.
                    </p>

                    <div style={{ ...grid(3, '1.5rem 2rem'), marginTop: '3rem' }}>
                        {FEATURES.map((feature, i) => (
                            <div key={feature.title} style={{ borderTop: '1px solid rgba(46,42,38,0.18)', paddingTop: '1.1rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.4, letterSpacing: '0.1em' }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 style={{ fontFamily: INTER, fontSize: '1rem', fontWeight: 700, margin: '0.4rem 0 0' }}>
                                    {feature.title}
                                </h3>
                                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.7, marginTop: '0.4rem', marginBottom: 0 }}>
                                    {feature.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MES */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div
                    style={{
                        maxWidth: '1100px',
                        margin: '0 auto',
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: isMobile ? '2rem' : '4rem',
                        alignItems: 'start',
                    }}
                >
                    <div>
                        <span style={EYEBROW}>MES software development</span>
                        <h2 style={H2}>Do you build MES for the shop floor too?</h2>
                        <p style={{ ...LEAD, marginTop: '1.25rem', opacity: 0.78 }}>
                            Yes — inside the ERP, or on its own if you already have accounts and stock sorted.
                            The ERP knows what should happen. The MES knows what did. The plan says 12,000
                            pieces, the shift says 9,800, and somebody needs to know where the other 2,200 went
                            before the morning meeting, not after.
                        </p>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {MES_ITEMS.map((item) => (
                            <li
                                key={item}
                                style={{
                                    display: 'flex',
                                    gap: '0.85rem',
                                    padding: '1rem 0',
                                    borderBottom: `1px solid ${LINE}`,
                                    fontSize: '0.98rem',
                                    lineHeight: 1.6,
                                }}
                            >
                                <span aria-hidden="true" style={{ opacity: 0.4 }}>—</span>
                                <span style={{ opacity: 0.82 }}>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Integrations */}
            <section data-theme="dark" style={{ backgroundColor: PANEL, padding: pad }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Integrations</span>
                    <h2 style={H2}>Will it work with Tally, GST and your machines?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '660px', opacity: 0.75 }}>
                        Yes. Your accountant keeps Tally if they want to. E-invoices come off the dispatch screen.
                        And the machines — the ones that matter, anyway — report in by themselves. Not every
                        machine needs to be wired. The bottleneck ones do.
                    </p>
                    <div style={{ ...grid(4), marginTop: '3rem' }}>
                        {INTEGRATIONS.map((item) => (
                            <div key={item.title} style={CARD}>
                                <h3 style={H3}>{item.title}</h3>
                                <p style={CARD_BODY}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                    <p style={{ ...LEAD, marginTop: '2.5rem', maxWidth: '660px', opacity: 0.75 }}>
                        Sell through distributors? The other half — distributor stock, secondary sales, schemes
                        and claims — is our{' '}
                        <Link href="/distributor-management-system" style={INLINE_LINK}>
                            custom distributor management system
                        </Link>
                        , and it talks to the ERP directly.
                    </p>
                </div>
            </section>

            {/* Why Nexona */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Why Nexona</span>
                    <h2 style={H2}>Why build your ERP with us?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '640px', opacity: 0.75 }}>
                        Most ERPs running in Indian plants were drawn up for a clerk at a desktop. Your floor
                        stopped working like that a long time ago.
                    </p>
                    <div style={{ ...grid(3), marginTop: '3rem' }}>
                        {WHY_BETTER.map((item) => (
                            <div key={item.title} style={CARD}>
                                <h3 style={H3}>{item.title}</h3>
                                <p style={CARD_BODY}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section data-theme="light" style={{ backgroundColor: SAND, color: DARK, padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={{ ...EYEBROW, opacity: 0.6 }}>How a build runs</span>
                    <h2 style={H2}>How do we build a manufacturing ERP from scratch?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '660px', opacity: 0.7 }}>
                        One module at a time, starting with whatever hurts most. No eighteen-month project plan,
                        no big-bang switchover on a Monday morning.
                    </p>
                    <ol style={{ listStyle: 'none', padding: 0, margin: '3rem 0 0', ...grid(5, '1.5rem') }}>
                        {PROCESS.map((step, i) => (
                            <li key={step.title} style={{ borderTop: `2px solid ${DARK}`, paddingTop: '1rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.45, letterSpacing: '0.1em' }}>
                                    STEP {i + 1}
                                </span>
                                <h3 style={{ ...H3, fontSize: '1rem', marginTop: '0.4rem' }}>{step.title}</h3>
                                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.7, marginTop: '0.4rem', marginBottom: 0 }}>
                                    {step.body}
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Worked examples — illustrative, not client case studies */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Worked examples</span>
                    <h2 style={H2}>What does a custom ERP build look like in practice?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '680px', opacity: 0.75 }}>
                        Three typical shapes a build takes, by type of plant. These are worked examples of how
                        we would approach each one — not named clients, and not results we are claiming.
                    </p>
                    <div style={{ ...grid(3), marginTop: '3rem' }}>
                        {EXAMPLES.map((ex) => (
                            <article key={ex.title} style={{ ...CARD, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <span style={{ ...EYEBROW, marginBottom: 0, fontSize: '0.7rem' }}>{ex.tag}</span>
                                <h3 style={{ ...H3, fontSize: '1.1rem', lineHeight: 1.35 }}>{ex.title}</h3>
                                <div>
                                    <strong style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>The problem</strong>
                                    <p style={{ ...CARD_BODY, marginTop: '0.35rem' }}>{ex.problem}</p>
                                </div>
                                <div>
                                    <strong style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>What we build</strong>
                                    <p style={{ ...CARD_BODY, marginTop: '0.35rem' }}>{ex.build}</p>
                                </div>
                                <p style={{ fontSize: '0.88rem', fontWeight: 600, opacity: 0.85, margin: 'auto 0 0', paddingTop: '0.75rem', borderTop: `1px solid ${LINE}` }}>
                                    {ex.first}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industries + local links */}
            <section data-theme="dark" style={{ backgroundColor: PANEL, padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Industries we serve</span>
                    <h2 style={H2}>Which industries do we build ERP for?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '660px', opacity: 0.75 }}>
                        The bones are the same everywhere. The details are not. A pharma batch record and a
                        fabrication job card have nothing in common except the word &ldquo;record&rdquo;.
                    </p>

                    <div style={{ ...grid(4, '1rem'), marginTop: '2.5rem' }}>
                        {INDUSTRIES.map((industry) => (
                            <div key={industry.name} style={{ borderTop: `1px solid ${LINE}`, paddingTop: '0.9rem' }}>
                                <h3 style={{ ...H3, fontSize: '0.98rem' }}>{industry.name}</h3>
                                <p style={{ fontSize: '0.85rem', lineHeight: 1.55, opacity: 0.6, margin: '0.35rem 0 0' }}>{industry.note}</p>
                            </div>
                        ))}
                    </div>

                    <p style={{ ...LEAD, marginTop: '2.75rem', maxWidth: '680px', opacity: 0.8 }}>
                        We are based in Mumbai and come to plants across Thane, Bhiwandi, Navi Mumbai, Vasai and
                        Palghar — the MIDC estates, mostly. For local implementation support and demos at your
                        factory, see{' '}
                        <Link href="/erp-systems-for-manufacturers" style={INLINE_LINK}>
                            our ERP software for Mumbai manufacturers
                        </Link>
                        . Elsewhere in Maharashtra and the rest of India we work remotely and usually come on
                        site for discovery and go-live.
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '820px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Questions</span>
                    <h2 style={H2}>Manufacturing ERP questions, answered straight</h2>

                    <div style={{ marginTop: '2.5rem' }}>
                        {FAQ_ITEMS.map((faq, i) => {
                            const open = openFaq === i
                            return (
                                <div key={faq.question} style={{ borderTop: `1px solid ${LINE}` }}>
                                    <h3 style={{ margin: 0 }}>
                                        <button
                                            type="button"
                                            onClick={() => setOpenFaq(open ? null : i)}
                                            aria-expanded={open}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                gap: '1.5rem',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: '1.35rem 0',
                                                color: TEXT,
                                                fontFamily: INTER,
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                textAlign: 'left',
                                            }}
                                        >
                                            {faq.question}
                                            <span
                                                aria-hidden="true"
                                                style={{
                                                    flexShrink: 0,
                                                    fontSize: '0.7rem',
                                                    opacity: 0.6,
                                                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                                                    transition: 'transform 0.25s ease',
                                                }}
                                            >
                                                ▼
                                            </span>
                                        </button>
                                    </h3>
                                    <div
                                        style={{
                                            // Generous cap: the longest answers run ~90 words, which
                                            // needs ~330px on a narrow phone, and a collapsing box
                                            // can't animate to auto.
                                            maxHeight: open ? '40rem' : 0,
                                            opacity: open ? 1 : 0,
                                            overflow: 'hidden',
                                            transition: 'max-height 0.3s ease, opacity 0.25s ease, padding 0.3s ease',
                                            paddingBottom: open ? '1.35rem' : 0,
                                        }}
                                    >
                                        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.72, margin: 0, maxWidth: '640px' }}>
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Close */}
            <section data-theme="dark" style={{ backgroundColor: PANEL, padding: pad, textAlign: 'center' }}>
                <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <h2 style={H2}>Tell us where it hurts</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', opacity: 0.78 }}>
                        Stock that never matches. Jobs that slip. Paperwork nobody has time for and everybody
                        does anyway. Tell us what your factory is fighting with and we will show you what we
                        would build, what it costs, and how long — no deck, no demo of features you did not
                        ask about.
                    </p>
                    <div style={{ marginTop: '2.25rem' }}>
                        <button type="button" onClick={openContact} style={CTA}>
                            Get a free quote
                        </button>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {contactOpen && (
                    <ContactOverlay
                        trigger={trigger}
                        heading="Talk to us about your plant"
                        submitLabel="Request a callback"
                        onClose={closeContact}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
