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
import { RENT_PER_DISTRIBUTOR_MONTH, rented, inr } from '../../data/dmsCost'

// Rows for the rent-vs-own table: what ready-made vendors charge. Nexona's
// own DMS price is never published — see app/data/dmsCost.ts.
const RENTED_ROWS = [50, 100, 250, 500].map(rented)
const COST_GUIDE = '/distributor-management-system-cost-in-india'
import {
    FAQ_ITEMS,
    SIGNALS,
    CHAIN,
    DMS_VS_DISTRIBUTION,
    MODULES,
    PROBLEMS,
    INDUSTRIES,
    COMPARISON,
    INTEGRATIONS,
    ROLLOUT,
    ADOPTION,
    CHECKLIST,
    COST_DRIVERS,
    PROOF,
} from './content'

// Slightly whiter than SAND — used for text on this page's dark sections,
// matching the ERP landing pages.
const TEXT = '#F2EEE8'
const ALT_BG = '#25221F'

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

const INLINE_LINK: React.CSSProperties = {
    color: 'inherit',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
}

const CARD: React.CSSProperties = {
    border: '1px solid rgba(232,223,211,0.14)',
    borderRadius: '1.25rem',
    padding: '1.75rem 1.5rem',
    backgroundColor: 'rgba(232,223,211,0.03)',
}

const CARD_TITLE: React.CSSProperties = {
    fontFamily: INTER,
    fontSize: '1.05rem',
    fontWeight: 700,
    letterSpacing: '0.01em',
    margin: 0,
}

const CARD_BODY: React.CSSProperties = {
    fontSize: '0.92rem',
    lineHeight: 1.65,
    opacity: 0.72,
    marginTop: '0.7rem',
    marginBottom: 0,
}

/**
 * Three-column comparison table: a row label plus two value columns. Collapses
 * to stacked rows on mobile, with the column name inlined before each value.
 * `emphasis` brightens the second value column (the "with Nexona" side).
 */
function CompareTable({
    isMobile,
    headers,
    rows,
    emphasis = true,
}: {
    isMobile: boolean
    headers: [string, string]
    rows: { label: string; a: string; b: string }[]
    emphasis?: boolean
}) {
    const cols = isMobile ? '1fr' : '1fr 1.4fr 1.4fr'
    return (
        <div style={{ marginTop: '2.5rem' }}>
            {!isMobile && (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: cols,
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
                    <span>{headers[0]}</span>
                    <span>{headers[1]}</span>
                </div>
            )}
            {rows.map((row) => (
                <div
                    key={row.label}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: cols,
                        gap: isMobile ? '0.4rem' : '1.5rem',
                        padding: isMobile ? '1.25rem 0' : '1.4rem 0',
                        borderBottom: '1px solid rgba(232,223,211,0.1)',
                        alignItems: 'start',
                    }}
                >
                    <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>{row.label}</span>
                    <span style={{ fontSize: '0.92rem', lineHeight: 1.6, opacity: emphasis ? 0.55 : 0.75 }}>
                        {isMobile && <strong style={{ opacity: 0.75 }}>{headers[0]}: </strong>}
                        {row.a}
                    </span>
                    <span style={{ fontSize: '0.92rem', lineHeight: 1.6, opacity: emphasis ? 0.9 : 0.75 }}>
                        {isMobile && <strong style={{ opacity: 0.75 }}>{headers[1]}: </strong>}
                        {row.b}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default function DistributorManagementSystemPage() {
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

    return (
        <main style={{ backgroundColor: DARK, color: TEXT, fontFamily: INTER }}>
            <LandingHeader theme="dark" onContactClick={openContact} />

            {/* Hero */}
            <section data-theme="dark" style={{ padding: isMobile ? '4rem 5% 3rem' : '7rem 8% 5rem' }}>
                <div style={{ maxWidth: '900px' }}>
                    <span style={EYEBROW}>Custom DMS software for brands and distributors</span>
                    <h1
                        style={{
                            fontFamily: 'var(--font-montserrat), sans-serif',
                            fontSize: 'clamp(2.1rem, 5.5vw, 4.25rem)',
                            fontWeight: 800,
                            lineHeight: 1.03,
                            letterSpacing: '-0.03em',
                            margin: 0,
                        }}
                    >
                        A distributor management system built around how you actually distribute.
                    </h1>
                    <p style={{ ...LEAD, marginTop: '1.75rem', maxWidth: '660px', opacity: 0.82 }}>
                        You know what you billed your distributors. What they sold to the shops — that is
                        the number you are missing. We build DMS software that captures it: distributor stock,
                        secondary billing, schemes, claims, collections, and a field app your reps will
                        actually open. Custom. Owned by you. No fee per distributor, ever — which against
                        renting one saves lakhs, and for a big network, crores.
                    </p>
                    <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button type="button" onClick={openContact} style={CTA}>
                            Talk to us about your distribution
                        </button>
                    </div>
                </div>
            </section>

            <ClientStrip />

            {/* Signals — "do I need a DMS yet" research intent */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Sound familiar?</span>
                    <h2 style={H2}>When distribution has outgrown Excel</h2>
                    <div
                        style={{
                            marginTop: '2.5rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            gap: '1rem 2.5rem',
                        }}
                    >
                        {SIGNALS.map((signal) => (
                            <div key={signal} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                                <span aria-hidden="true" style={{ opacity: 0.4, lineHeight: 1.7 }}>—</span>
                                <p style={{ fontSize: '0.98rem', lineHeight: 1.7, opacity: 0.78, margin: 0 }}>{signal}</p>
                            </div>
                        ))}
                    </div>
                    <p style={{ ...LEAD, marginTop: '2.5rem', maxWidth: '660px', opacity: 0.78 }}>
                        Two of these and you are already paying for a DMS. Just not in a way that shows up
                        as a line item.
                    </p>
                </div>
            </section>

            {/* Rent vs own — third section, one of the two contact-popup triggers.
                Shows what rented DMS vendors charge; never Nexona's price (dmsCost.ts).
                The full breakdown lives on the cost guide, which this links to. */}
            <section ref={thirdSectionRef} data-theme="dark" style={{ backgroundColor: ALT_BG, padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Rent or own</span>
                    <h2 style={H2}>
                        Rented DMS: {inr(RENT_PER_DISTRIBUTOR_MONTH)} per distributor, every month. Custom: &#8377;0.
                    </h2>
                    <div
                        style={{
                            marginTop: '2.5rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            gap: isMobile ? '1.5rem' : '2.5rem',
                        }}
                    >
                        <p style={{ ...LEAD, opacity: 0.8, margin: 0 }}>
                            Ready-made DMS products with a distributor portal, CRM and loyalty average about{' '}
                            {inr(RENT_PER_DISTRIBUTOR_MONTH)} per distributor per month. A hundred distributors is{' '}
                            {inr(rented(100).year)} a year — before per-rep seats — and the bill grows
                            every time sales signs someone new.
                        </p>
                        <p style={{ ...LEAD, opacity: 0.8, margin: 0 }}>
                            Own a custom DMS and that fee becomes zero, because you own the source code. You pay
                            a one-time build, then AMC and hosting — nothing per head. That saves lakhs for most
                            brands, and crores for big networks — and the system runs your schemes exactly, talks
                            to your Tally, and belongs to you.
                        </p>
                    </div>

                    <div style={{ overflowX: 'auto', marginTop: '3rem' }}>
                        <table style={{ width: '100%', minWidth: 560, borderCollapse: 'collapse', fontFamily: INTER, color: TEXT }}>
                            <caption style={{ captionSide: 'top', textAlign: 'left', fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.55, paddingBottom: '0.9rem' }}>
                                What a ready-made DMS costs at {inr(RENT_PER_DISTRIBUTOR_MONTH)} per distributor per month
                            </caption>
                            <thead>
                                <tr>
                                    {['Distributors', 'Per year', 'Over 3 years', 'Over 5 years'].map((h) => (
                                        <th key={h} scope="col" style={{ textAlign: 'left', padding: '0.85rem 1rem', borderBottom: '2px solid rgba(242,238,232,0.5)', fontSize: '0.9rem' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {RENTED_ROWS.map((r) => (
                                    <tr key={r.distributors}>
                                        <th scope="row" style={{ textAlign: 'left', padding: '0.85rem 1rem', borderBottom: '1px solid rgba(242,238,232,0.14)', fontSize: '0.95rem' }}>{r.distributors}</th>
                                        <td style={{ padding: '0.85rem 1rem', borderBottom: '1px solid rgba(242,238,232,0.14)', opacity: 0.8 }}>{inr(r.year)}</td>
                                        <td style={{ padding: '0.85rem 1rem', borderBottom: '1px solid rgba(242,238,232,0.14)', opacity: 0.8 }}>{inr(r.threeYears)}</td>
                                        <td style={{ padding: '0.85rem 1rem', borderBottom: '1px solid rgba(242,238,232,0.14)', fontWeight: 700 }}>{inr(r.fiveYears)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ ...LEAD, marginTop: '1.75rem', maxWidth: '760px', opacity: 0.75 }}>
                        That last column is the money a custom DMS stops — per-rep seats, implementation and
                        renewal increases not included. What you pay instead, and how to compare the two, is in our{' '}
                        <Link href={COST_GUIDE} style={{ ...INLINE_LINK, color: SAND }}>
                            distributor management system cost guide
                        </Link>
                        . Send us your current DMS invoice and we will send back the five-year comparison for your network, free.
                    </p>
                </div>
            </section>

            {/* What is a DMS — definition, the chain, distributor vs distribution */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>The basics</span>
                    <h2 style={H2}>What is a distributor management system?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '720px', opacity: 0.8 }}>
                        A distributor management system (DMS) is software that connects a brand to its
                        distributors and, through them, to retailers. It records what each distributor
                        bought, what they sold to shops, what stock is left in the godown, which schemes
                        applied, and who owes money to whom. The whole point is secondary sales — knowing
                        what reached the market, not just what left your factory.
                    </p>

                    <div
                        style={{
                            marginTop: '3rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                            gap: '1.25rem',
                        }}
                    >
                        {CHAIN.map((step, i) => (
                            <div key={step.stage} style={CARD}>
                                <span style={{ fontSize: '0.72rem', fontWeight: 700, opacity: 0.45, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                                    {String(i + 1).padStart(2, '0')} · {step.sale}
                                </span>
                                <h3 style={{ ...CARD_TITLE, marginTop: '0.6rem' }}>{step.stage}</h3>
                                <p style={CARD_BODY}>{step.body}</p>
                            </div>
                        ))}
                    </div>

                    <h3 style={{ ...CARD_TITLE, fontSize: '1.2rem', marginTop: '4rem' }}>
                        Distributor management vs distribution management
                    </h3>
                    <p style={{ ...LEAD, marginTop: '0.75rem', maxWidth: '660px', opacity: 0.72 }}>
                        People use the two terms interchangeably. They overlap, not completely.
                    </p>
                    <CompareTable
                        isMobile={isMobile}
                        headers={['Distributor management', 'Distribution management']}
                        emphasis={false}
                        rows={DMS_VS_DISTRIBUTION.map((r) => ({ label: r.point, a: r.distributor, b: r.distribution }))}
                    />
                </div>
            </section>

            {/* Modules */}
            <section data-theme="light" style={{ backgroundColor: SAND, color: DARK, padding: pad }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={{ ...EYEBROW, opacity: 0.6 }}>What it does</span>
                    <h2 style={H2}>DMS modules, and what each one replaces</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '640px', opacity: 0.7 }}>
                        Eight modules. You probably need five of them on day one. Which five depends on
                        where it hurts — we would rather build those well than ship eight that half work.
                    </p>

                    <div
                        style={{
                            marginTop: '3rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                            gap: '2rem 3rem',
                        }}
                    >
                        {MODULES.map((mod, i) => (
                            <div key={mod.title} style={{ borderTop: '1px solid rgba(46,42,38,0.18)', paddingTop: '1.1rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.4, letterSpacing: '0.1em' }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 style={{ fontFamily: INTER, fontSize: '1.05rem', fontWeight: 700, margin: '0.4rem 0 0' }}>
                                    {mod.title}
                                </h3>
                                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, opacity: 0.72, marginTop: '0.45rem', marginBottom: 0 }}>
                                    {mod.body}
                                </p>
                                <p style={{ fontSize: '0.82rem', fontWeight: 600, opacity: 0.5, marginTop: '0.55rem', marginBottom: 0 }}>
                                    {mod.replaces}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p style={{ ...LEAD, marginTop: '3rem', maxWidth: '660px', opacity: 0.75 }}>
                        The field app ships as a proper Android and iOS app, not a website squeezed onto a
                        phone — the same way we build{' '}
                        <Link href="/mobile-app-development-company-in-mumbai" style={INLINE_LINK}>
                            mobile apps for our other clients
                        </Link>
                        .
                    </p>
                </div>
            </section>

            {/* Problems */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Why brands buy one</span>
                    <h2 style={H2}>Problems a DMS actually fixes</h2>
                    <CompareTable
                        isMobile={isMobile}
                        headers={['What happens today', 'With a DMS']}
                        rows={PROBLEMS.map((r) => ({ label: r.problem, a: r.today, b: r.withDms }))}
                    />
                </div>
            </section>

            {/* Comparison — the decision the page is built around */}
            <section data-theme="dark" style={{ backgroundColor: ALT_BG, padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Custom vs ready-made</span>
                    <h2 style={H2}>Ready-made DMS or custom-built?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '660px', opacity: 0.75 }}>
                        A rented DMS bills you for every distributor, every month, and still sends your
                        slab scheme to Excel. Start with the last row — it is the one vendors skip.
                    </p>
                    <CompareTable
                        isMobile={isMobile}
                        headers={['Ready-made DMS', 'Nexona custom DMS']}
                        rows={COMPARISON.map((r) => ({ label: r.point, a: r.rented, b: r.nexona }))}
                    />
                    <p style={{ ...LEAD, marginTop: '2.5rem', maxWidth: '660px', opacity: 0.8 }}>
                        Want the arithmetic, not the adjectives? We ran{' '}
                        <Link
                            href="/blogs/ready-made-vs-custom-distributor-management-system"
                            style={{ ...INLINE_LINK, color: SAND }}
                        >
                            the three-year cost of a ready-made vs custom DMS
                        </Link>{' '}
                        in seat-months, so you can plug in your own vendor&rsquo;s quote. Pricing the field-sales app on
                        its own? Offline order capture, GPS check-in and Tally sync are costed line by line in{' '}
                        <Link
                            href="/business-app-development-cost-in-india"
                            style={{ ...INLINE_LINK, color: SAND }}
                        >
                            business app development cost in India
                        </Link>
                        .
                    </p>
                </div>
            </section>

            {/* Industries */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Who we build for</span>
                    <h2 style={H2}>DMS for the way your industry sells</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '660px', opacity: 0.75 }}>
                        A pharma distributor and a paint dealer both &ldquo;manage stock&rdquo;. That is about
                        where the similarity ends.
                    </p>

                    <div style={{ marginTop: '2.5rem' }}>
                        {INDUSTRIES.map((row) => (
                            <div
                                key={row.industry}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: isMobile ? '1fr' : '1fr 2.8fr',
                                    gap: isMobile ? '0.35rem' : '1.5rem',
                                    padding: isMobile ? '1.15rem 0' : '1.3rem 0',
                                    borderBottom: '1px solid rgba(232,223,211,0.1)',
                                }}
                            >
                                <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>{row.industry}</span>
                                <span style={{ fontSize: '0.92rem', lineHeight: 1.6, opacity: 0.75 }}>{row.rule}</span>
                            </div>
                        ))}
                    </div>

                    <p style={{ ...LEAD, marginTop: '2.75rem', maxWidth: '660px', opacity: 0.8 }}>
                        Make the product as well as distribute it? The factory side lives in{' '}
                        <Link href="/manufacturing-erp" style={{ ...INLINE_LINK, color: SAND }}>
                            our custom manufacturing ERP
                        </Link>
                        , and the two can share one database, so factory stock and distributor stock never need reconciling.
                        Plant in Thane, Bhiwandi or Navi Mumbai? See{' '}
                        <Link href="/erp-systems-for-manufacturers" style={{ ...INLINE_LINK, color: SAND }}>
                            ERP for Mumbai manufacturers
                        </Link>
                        .
                    </p>
                </div>
            </section>

            {/* Integrations + rollout + adoption */}
            <section data-theme="light" style={{ backgroundColor: SAND, color: DARK, padding: pad }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={{ ...EYEBROW, opacity: 0.6 }}>Integrations</span>
                    <h2 style={H2}>Talks to what you already run</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '640px', opacity: 0.7 }}>
                        Your distributors will not give up Tally. Nobody should ask them to. The DMS syncs
                        invoices, receipts and stock into whatever they and your accounts team already use.
                    </p>
                    <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                        {INTEGRATIONS.map((name) => (
                            <span
                                key={name}
                                style={{
                                    border: '1px solid rgba(46,42,38,0.22)',
                                    borderRadius: '999px',
                                    padding: '0.6rem 1.15rem',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                }}
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                    <p style={{ ...LEAD, marginTop: '2rem', maxWidth: '660px', opacity: 0.7 }}>
                        The repetitive parts — claim reminders, low-stock alerts to distributors, retailers
                        reordering over WhatsApp — run on the same{' '}
                        <Link href="/ai-automation-agency" style={INLINE_LINK}>
                            workflow automation
                        </Link>{' '}
                        we build for other teams. Nobody chases a claim by phone.
                    </p>

                    <h2 style={{ ...H2, marginTop: '5rem' }}>How we build and roll it out</h2>
                    <div
                        style={{
                            marginTop: '2.5rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                            gap: '1.5rem 2rem',
                        }}
                    >
                        {ROLLOUT.map((step, i) => (
                            <div key={step.title} style={{ borderTop: '1px solid rgba(46,42,38,0.18)', paddingTop: '1.1rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.4, letterSpacing: '0.1em' }}>
                                    STEP {i + 1}
                                </span>
                                <h3 style={{ fontFamily: INTER, fontSize: '1rem', fontWeight: 700, margin: '0.4rem 0 0' }}>
                                    {step.title}
                                </h3>
                                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.7, marginTop: '0.4rem', marginBottom: 0 }}>
                                    {step.body}
                                </p>
                            </div>
                        ))}
                    </div>

                    <h3 style={{ fontFamily: INTER, fontSize: '1.2rem', fontWeight: 700, marginTop: '4rem', marginBottom: 0 }}>
                        Getting distributors to actually use it
                    </h3>
                    <p style={{ ...LEAD, marginTop: '0.75rem', maxWidth: '660px', opacity: 0.7 }}>
                        This is where DMS rollouts die. Not in the code — at the distributor&rsquo;s billing
                        counter, when the new screen is slower than the old register.
                    </p>
                    <div
                        style={{
                            marginTop: '2rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                            gap: '1.5rem 3rem',
                        }}
                    >
                        {ADOPTION.map((item) => (
                            <div key={item.title}>
                                <h4 style={{ fontFamily: INTER, fontSize: '1rem', fontWeight: 700, margin: 0 }}>{item.title}</h4>
                                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.7, marginTop: '0.4rem', marginBottom: 0 }}>
                                    {item.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Checklist — useful whoever they buy from, which is the point */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Before you buy anything</span>
                    <h2 style={H2}>Twelve questions to ask any DMS vendor</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '660px', opacity: 0.75 }}>
                        Including us. Take these into every demo — the salesperson who answers number ten
                        without changing the subject is rare.
                    </p>
                    <ol style={{ marginTop: '2.5rem', padding: 0, listStyle: 'none' }}>
                        {CHECKLIST.map((q, i) => (
                            <li
                                key={q}
                                style={{
                                    display: 'flex',
                                    gap: '1.1rem',
                                    padding: '1rem 0',
                                    borderBottom: '1px solid rgba(232,223,211,0.1)',
                                    fontSize: '0.98rem',
                                    lineHeight: 1.6,
                                }}
                            >
                                <span style={{ opacity: 0.4, fontWeight: 700, minWidth: '1.6rem' }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span style={{ opacity: 0.82 }}>{q}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Proof — adjacent real work. No DMS client yet, so nothing here
                may claim one. */}
            <section data-theme="dark" style={{ backgroundColor: ALT_BG, padding: pad }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={EYEBROW}>What we have built</span>
                    <h2 style={H2}>The parts of a DMS we have already shipped</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '660px', opacity: 0.75 }}>
                        A DMS is not one exotic piece of software. It is multi-party access, stock that lives
                        somewhere else, sales follow-up and reporting — stitched together around your rules.
                        We have built each of those.
                    </p>
                    <div
                        style={{
                            marginTop: '3rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                            gap: '1.25rem',
                        }}
                    >
                        {PROOF.map((item) => (
                            <div key={item.title} style={CARD}>
                                <h3 style={CARD_TITLE}>{item.title}</h3>
                                <p style={CARD_BODY}>{item.body}</p>
                                <Link
                                    href={item.href}
                                    style={{ ...INLINE_LINK, display: 'inline-block', fontSize: '0.85rem', opacity: 0.8, marginTop: '0.9rem' }}
                                >
                                    See the project
                                </Link>
                            </div>
                        ))}
                    </div>
                    <p style={{ ...LEAD, marginTop: '2.5rem', maxWidth: '720px', opacity: 0.8 }}>
                        A DMS is one kind of{' '}
                        <Link href="/business-management-software-development" style={{ ...INLINE_LINK, color: SAND }}>
                            custom business management software
                        </Link>
                        . Spotting the retailer who quietly stopped ordering is the same job our{' '}
                        <Link href="/customer-retention-management-software" style={{ ...INLINE_LINK, color: SAND }}>
                            customer retention software
                        </Link>{' '}
                        does for subscription businesses — different customer, same signal.{' '}
                        <Link href="/projects" style={{ ...INLINE_LINK, color: SAND }}>
                            See all our projects
                        </Link>
                        .
                    </p>
                </div>
            </section>

            {/* Cost drivers — the figures live in the rent-vs-own section and the cost guide */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Cost</span>
                    <h2 style={H2}>What a custom DMS costs depends on four things</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '660px', opacity: 0.75 }}>
                        Anyone quoting a DMS before seeing your scheme sheet is guessing. These four things move
                        the number, so we scope first, then quote in writing.{' '}
                        <Link href={COST_GUIDE} style={INLINE_LINK}>
                            See the full DMS cost breakdown
                        </Link>
                        .
                    </p>
                    <p style={{ ...LEAD, marginTop: '1rem', maxWidth: '660px', opacity: 0.75 }}>
                        Evaluating ready-made vendors and want someone technical on your side of the table,
                        not theirs? That is what our{' '}
                        <Link href="/fractional-cto-as-a-service" style={INLINE_LINK}>
                            fractional CTO
                        </Link>{' '}
                        work is for.
                    </p>
                    <div
                        style={{
                            marginTop: '2.5rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                            gap: '1.25rem',
                        }}
                    >
                        {COST_DRIVERS.map((item) => (
                            <div key={item.title} style={CARD}>
                                <h3 style={CARD_TITLE}>{item.title}</h3>
                                <p style={CARD_BODY}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section data-theme="dark" style={{ backgroundColor: ALT_BG, padding: pad }}>
                <div style={{ maxWidth: '820px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Questions</span>
                    <h2 style={H2}>Straight answers</h2>

                    <div style={{ marginTop: '2.5rem' }}>
                        {FAQ_ITEMS.map((faq, i) => {
                            const open = openFaq === i
                            return (
                                <div key={faq.question} style={{ borderTop: '1px solid rgba(232,223,211,0.14)' }}>
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
                                    <div
                                        style={{
                                            // Generous cap: a collapsing box can't animate to auto.
                                            maxHeight: open ? '30rem' : 0,
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
            <section data-theme="dark" style={{ padding: pad, textAlign: 'center' }}>
                <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <h2 style={H2}>Send us your scheme sheet</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', opacity: 0.78 }}>
                        The messy one. The Excel file with eleven tabs and a column nobody remembers adding.
                        That tells us more about the DMS you need than any requirements document — and we
                        will tell you exactly what to build first.
                    </p>
                    <div style={{ marginTop: '2.25rem' }}>
                        <button type="button" onClick={openContact} style={CTA}>
                            Get a free quote
                        </button>
                    </div>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.7, opacity: 0.55, marginTop: '2.5rem', marginBottom: 0 }}>
                        We are a{' '}
                        <Link href="/software-development-agency-mumbai" style={INLINE_LINK}>
                            software agency in Mumbai
                        </Link>
                        , working with businesses in{' '}
                        <Link href="/software-development-company-in-navi-mumbai" style={INLINE_LINK}>
                            Navi Mumbai
                        </Link>{' '}
                        and{' '}
                        <Link href="/ai-automation-company-in-thane" style={INLINE_LINK}>
                            Thane
                        </Link>
                        , building for brands across India.
                    </p>
                </div>
            </section>

            <AnimatePresence>
                {contactOpen && (
                    <ContactOverlay
                        trigger={trigger}
                        heading="Talk to us about your distribution"
                        submitLabel="Request a callback"
                        onClose={closeContact}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
