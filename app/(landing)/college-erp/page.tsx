'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import LandingHeader from '../../components/LandingHeader'
import ClientStrip from '../../components/ClientStrip'
import ContactOverlay from '../../components/ContactOverlay'
import Footer from '../../components/Footer'
import { DARK, SAND, INTER } from '../../lib/constants'
import { WHY_BETTER, FEATURES, FAQ_ITEMS, COMPARISON, INSTITUTIONS, SIGNALS } from './content'

// Slightly whiter than SAND — used for text on this page's dark sections,
// matching the sibling ERP landing pages.
const TEXT = '#F2EEE8'

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

export default function CollegeErpPage() {
    const [isMobile, setIsMobile] = useState(false)
    const [openFaq, setOpenFaq] = useState<number | null>(0)
    const [contactOpen, setContactOpen] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const pad = isMobile ? '4rem 5%' : '7rem 8%'

    return (
        <main style={{ backgroundColor: DARK, color: TEXT, fontFamily: INTER }}>
            <LandingHeader theme="dark" onContactClick={() => setContactOpen(true)} />

            {/* Hero */}
            <section data-theme="dark" style={{ padding: isMobile ? '4rem 5% 3rem' : '7rem 8% 5rem' }}>
                <div style={{ maxWidth: '900px' }}>
                    <span style={EYEBROW}>Custom ERP for colleges & schools</span>
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
                        Custom college ERP software, built around your campus.
                    </h1>
                    <p style={{ ...LEAD, marginTop: '1.75rem', maxWidth: '660px', opacity: 0.82 }}>
                        You buy campus software. Then you spend a year teaching your college to work the way the
                        software thinks a college works. We do it the other way round — admissions, fees,
                        attendance, timetables, exams, hostel, the reports NAAC will ask for — built the way you
                        already run. On a phone, in a browser, as an app for parents. Custom, and still
                        affordable for one institution rather than a whole trust, which sounds like a
                        contradiction until you see what per-student licensing does to your budget.
                    </p>
                    <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button type="button" onClick={() => setContactOpen(true)} style={CTA}>
                            Talk to us about your campus
                        </button>
                    </div>
                </div>
            </section>

            <ClientStrip />

            {/* Signals */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Sound familiar?</span>
                    <h2 style={H2}>When a campus has outgrown registers</h2>
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
                        Two of these and the registers are already costing your staff more than software would.
                        It just never shows up on a bill.
                    </p>
                </div>
            </section>

            {/* Affordable */}
            <section data-theme="dark" style={{ backgroundColor: '#25221F', padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Why it costs less than you expect</span>
                    <h2 style={H2}>Affordable ERP for a single college or school</h2>
                    <div
                        style={{
                            marginTop: '2.5rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            gap: isMobile ? '1.5rem' : '2.5rem',
                        }}
                    >
                        <p style={{ ...LEAD, opacity: 0.8, margin: 0 }}>
                            Custom is supposed to be the expensive one. Ready-made is supposed to be the safe cheap
                            one. It is usually the other way round, and nobody selling you a licence mentions it.
                            The bundle is sized for a university — departments you do not have, modules nobody has
                            opened — and it is priced per student, so every good admission season quietly costs you
                            more.
                        </p>
                        <p style={{ ...LEAD, opacity: 0.8, margin: 0 }}>
                            We build what your institution uses and stop. Modern tools, small team. And when the
                            ready-made product does not match your fee structure — it will not, not exactly — that
                            is a second bill for customisation. You skip it. You own what we build, you start where
                            it hurts, you grow from there.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why better */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Why Nexona</span>
                    <h2 style={H2}>Newer tech. In every hand on campus.</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '660px', opacity: 0.75 }}>
                        Most campus software was drawn up for a clerk at a desktop. Your students, your parents,
                        your faculty stopped working like that a long time ago.
                    </p>

                    <div
                        style={{
                            marginTop: '3rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: '1.25rem',
                        }}
                    >
                        {WHY_BETTER.map((item) => (
                            <div
                                key={item.title}
                                style={{
                                    border: '1px solid rgba(232,223,211,0.14)',
                                    borderRadius: '1.25rem',
                                    padding: '1.75rem 1.5rem',
                                    backgroundColor: 'rgba(232,223,211,0.03)',
                                }}
                            >
                                <h3 style={{ fontFamily: INTER, fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.01em', margin: 0 }}>
                                    {item.title}
                                </h3>
                                <p style={{ fontSize: '0.92rem', lineHeight: 1.65, opacity: 0.72, marginTop: '0.7rem', marginBottom: 0 }}>
                                    {item.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section data-theme="light" style={{ backgroundColor: SAND, color: DARK, padding: pad }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={{ ...EYEBROW, opacity: 0.6 }}>What it must have</span>
                    <h2 style={H2}>Features a college ERP actually needs</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '660px', opacity: 0.7 }}>
                        Not a list to impress you. The parts a campus cannot actually run without. You will not
                        need all of them — nobody does — and we would rather leave one out than build a screen
                        your staff clicks past every morning.
                    </p>

                    <div
                        style={{
                            marginTop: '3rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: '1.5rem 2rem',
                        }}
                    >
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

            {/* Comparison */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Custom vs ready-made</span>
                    <h2 style={H2}>Custom ERP or a ready-made product?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '660px', opacity: 0.75 }}>
                        Sometimes ready-made is the right call. If your rules already match the software, buy it,
                        save your money. If not, here is the comparison nobody selling you a licence will run.
                    </p>

                    <div style={{ marginTop: '2.5rem' }}>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
                                gap: isMobile ? '0.35rem' : '1.5rem',
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
                            <span>Ready-made</span>
                            <span>Nexona custom ERP</span>
                        </div>

                        {COMPARISON.map((row) => (
                            <div
                                key={row.point}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
                                    gap: isMobile ? '0.4rem' : '1.5rem',
                                    padding: isMobile ? '1.25rem 0' : '1.4rem 0',
                                    borderBottom: '1px solid rgba(232,223,211,0.1)',
                                    alignItems: 'start',
                                }}
                            >
                                <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>{row.point}</span>
                                <span style={{ fontSize: '0.92rem', lineHeight: 1.6, opacity: 0.55 }}>
                                    {isMobile && <strong style={{ opacity: 0.75 }}>Ready-made: </strong>}
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

            {/* Institutions + internal links */}
            <section data-theme="dark" style={{ backgroundColor: '#25221F', padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Who we build for</span>
                    <h2 style={H2}>ERP for the way your institution works</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '660px', opacity: 0.75 }}>
                        A school and an engineering college share a timetable and almost nothing else. One counts
                        periods, the other counts credits against a university that changes its grade card format
                        when it feels like it. Same software for both? No.
                    </p>

                    <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                        {INSTITUTIONS.map((institution) => (
                            <span
                                key={institution}
                                style={{
                                    border: '1px solid rgba(232,223,211,0.18)',
                                    borderRadius: '999px',
                                    padding: '0.6rem 1.15rem',
                                    fontSize: '0.85rem',
                                    opacity: 0.8,
                                }}
                            >
                                {institution}
                            </span>
                        ))}
                    </div>

                    <p style={{ ...LEAD, marginTop: '2.75rem', maxWidth: '660px', opacity: 0.8 }}>
                        Campuses are not the only thing we build ERP for — see our{' '}
                        <Link
                            href="/manufacturing-erp"
                            style={{ color: SAND, textDecoration: 'underline', textUnderlineOffset: '3px' }}
                        >
                            custom ERP software for manufacturers
                        </Link>
                        , built the same way. Based in and around the city? We also work on the ground with{' '}
                        <Link
                            href="/erp-systems-for-manufacturers"
                            style={{ color: SAND, textDecoration: 'underline', textUnderlineOffset: '3px' }}
                        >
                            businesses across Mumbai, Thane and Navi Mumbai
                        </Link>
                        .
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section data-theme="dark" style={{ padding: pad }}>
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
                                            // Generous cap: the longest answers need ~250px on a
                                            // narrow phone, and a collapsing box can't use auto.
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
            <section data-theme="dark" style={{ backgroundColor: '#25221F', padding: pad, textAlign: 'center' }}>
                <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <h2 style={H2}>Tell us where it hurts</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', opacity: 0.78 }}>
                        Admission season. Fee dues. Registers. The scramble before an inspection nobody wants to
                        talk about. Tell us what your campus is fighting with and we will show you what we would
                        build — no deck, no demo of features you did not ask about.
                    </p>
                    <div style={{ marginTop: '2.25rem' }}>
                        <button type="button" onClick={() => setContactOpen(true)} style={CTA}>
                            Get a free quote
                        </button>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {contactOpen && <ContactOverlay onClose={() => setContactOpen(false)} />}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
