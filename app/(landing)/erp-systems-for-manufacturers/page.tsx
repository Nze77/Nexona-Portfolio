'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import LandingHeader from '../../components/LandingHeader'
import ContactOverlay from '../../components/ContactOverlay'
import ClientStrip from '../../components/ClientStrip'
import Footer from '../../components/Footer'
import ParticleEffect from '../../components/ParticleEffect'
import { useContactPopup } from '../../lib/useContactPopup'
import { getVisitorContext } from '../../lib/visitorContext'
import { DARK, SAND, INTER } from '../../lib/constants'
import {
    TOC,
    SIGNS,
    MODULES,
    GST_ITEMS,
    INDUSTRIES,
    INDUSTRY_TABLE,
    BELTS,
    COMPARISON,
    CHOOSE,
    IMPLEMENTATION,
    MIGRATION,
    SEE_IT,
    COST_DRIVERS,
    FAQ_ITEMS,
} from './content'

// Slightly whiter than SAND (#E8E2DA) — used for body/heading text on this
// page's dark sections. Sand backgrounds, borders, and dots keep SAND.
const TEXT = '#F2EEE8'
const PANEL = '#25221F'
const MONTSERRAT = 'var(--font-montserrat), sans-serif'
const BORDER = 'rgba(232,223,211,0.1)'

// Inline text links: inherit the surrounding copy's colour so they read as part
// of the sentence, with a subtle underline to stay obviously clickable.
const inlineLink: React.CSSProperties = {
    color: 'inherit',
    textDecoration: 'underline',
    textDecorationThickness: '1px',
    textUnderlineOffset: '3px'
}

const eyebrow: React.CSSProperties = {
    fontFamily: INTER,
    fontSize: '0.85rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    opacity: 0.6,
    fontWeight: 700,
    display: 'block',
    marginBottom: '1.5rem'
}

const h2Style: React.CSSProperties = {
    fontFamily: MONTSERRAT,
    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    margin: '0 0 2rem 0'
}

const lead: React.CSSProperties = {
    fontFamily: INTER,
    opacity: 0.8,
    lineHeight: 1.8,
    fontSize: '1.1rem',
    margin: 0
}

export default function ERPPage() {
    const heroRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

    const [isMobile, setIsMobile] = useState(false)
    const [openFaq, setOpenFaq] = useState<number | null>(0)

    // Form state for the closing assessment section
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        requirement: ''
    })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const phoneRegex = /^\+?[0-9\s\-\(\)]{7,15}$/
        if (!phoneRegex.test(formData.phone)) {
            setStatus('error')
            setErrorMessage('Please enter a valid phone number.')
            return
        }

        setStatus('loading')
        setErrorMessage('')

        // The visitor's stated requirement becomes the message body.
        const messageBody = formData.requirement.trim()

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: messageBody,
                    meta: getVisitorContext({ formLocation: 'erp-page-inline-form' })
                })
            })

            if (response.ok) {
                setStatus('success')
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    requirement: ''
                })
            } else {
                setStatus('error')
                setErrorMessage('Something went wrong. Please check your inputs and try again.')
            }
        } catch {
            setStatus('error')
            setErrorMessage('Network error. Please try again later.')
        }
    }

    const sectionPad = isMobile ? '6rem 5%' : '10rem 8%'

    // Shared table cell styling for the three comparison-style tables. Tables
    // scroll horizontally on narrow screens rather than squeezing columns.
    const cell = (last: boolean, dark: boolean): React.CSSProperties => ({
        padding: isMobile ? '1rem 1.25rem' : '1.25rem 1.75rem',
        fontSize: '0.98rem',
        lineHeight: 1.6,
        textAlign: 'left',
        verticalAlign: 'top',
        borderBottom: last ? 'none' : `1px solid ${dark ? 'rgba(232,223,211,0.1)' : 'rgba(46,42,38,0.12)'}`
    })
    const headCell = (dark: boolean): React.CSSProperties => ({
        textAlign: 'left',
        padding: isMobile ? '1rem 1.25rem' : '1.25rem 1.75rem',
        fontFamily: MONTSERRAT,
        fontSize: '0.9rem',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
        borderBottom: `2px solid ${dark ? 'rgba(232,223,211,0.2)' : 'rgba(46,42,38,0.2)'}`
    })

    return (
        <main style={{ backgroundColor: DARK, color: TEXT, minHeight: '100vh', overflowX: 'clip' }}>
            <LandingHeader theme="dark" onContactClick={openContact} />

            {/* ── Hero (H1) ────────────────────────────────────────────────── */}
            <section
                ref={heroRef}
                style={{
                    minHeight: '100vh',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'left',
                    padding: '1rem 5% 3rem',
                    overflow: 'hidden'
                }}
            >
                <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, y, zIndex: 0 }}>
                    <Image
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop"
                        alt="Manufacturing plant running ERP software"
                        fill
                        style={{ objectFit: 'cover', opacity: 0.09 }}
                        priority
                    />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, rgba(46,42,38,0.45), ${DARK})` }} />
                </motion.div>

                <ParticleEffect />

                <motion.div
                    style={{
                        zIndex: 10,
                        opacity,
                        width: '100%',
                        maxWidth: '1400px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: isMobile ? '2.5rem' : '3.5rem',
                    }}
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            alignItems: isMobile ? 'stretch' : 'start',
                            gap: isMobile ? '3rem' : '5rem',
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <h1
                                style={{
                                    fontFamily: MONTSERRAT,
                                    fontSize: 'clamp(1.6rem, 3vw, 2.8rem)',
                                    fontWeight: 800,
                                    lineHeight: 1.15,
                                    textTransform: 'uppercase',
                                    letterSpacing: '-0.03em',
                                    margin: 0
                                }}
                            >
                                Manufacturing ERP Software, <br /> Built in Mumbai
                            </h1>

                            <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <p style={{ fontFamily: INTER, fontSize: isMobile ? '1.05rem' : '1.2rem', color: '#FFFFFF', letterSpacing: '0.01em', lineHeight: 1.7, margin: 0 }}>
                                    ERP software for manufacturing that fits the plant you already run. Production, inventory, purchase, quality, costing, and GST in one system — built around your process, not a template you bend to fit.
                                </p>
                                <p style={{ fontFamily: INTER, fontSize: isMobile ? '1.05rem' : '1.2rem', color: '#FFFFFF', letterSpacing: '0.01em', lineHeight: 1.7, margin: 0 }}>
                                    Nexona is an ERP software company in Mumbai building ERP for manufacturers in pharma, chemicals, textiles, engineering, and auto components. We walk your floor first. Then we build.
                                </p>
                            </div>
                        </div>

                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '16 / 10',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                display: isMobile ? 'none' : 'block',
                            }}
                        >
                            <Image
                                src="/erp.png"
                                alt="Manufacturing ERP dashboard showing production, inventory and dispatch"
                                fill
                                priority
                                sizes="(max-width: 768px) 0px, 52vw"
                                style={{ objectFit: 'cover', objectPosition: 'top', borderRadius: '10px' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: isMobile ? 'wrap' : 'nowrap', justifyContent: 'flex-start', gap: '1.5rem' }}>
                        {[
                            'One live number for stock',
                            'Works on the shop-floor phone',
                            'You own the code'
                        ].map((bullet) => (
                            <div
                                key={bullet}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    backgroundColor: 'rgba(232, 226, 218, 0.04)',
                                    border: '1px solid rgba(232, 226, 218, 0.1)',
                                    borderRadius: '12px',
                                    padding: '0.75rem 1.5rem',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <span style={{ width: '8px', height: '8px', backgroundColor: SAND, borderRadius: '50%', flexShrink: 0 }} />
                                <span style={{ fontFamily: INTER, fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                    {bullet}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            <ClientStrip />

            {/* ── On this page — jump links ────────────────────────────────── */}
            <nav aria-label="On this page" style={{ backgroundColor: PANEL, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: isMobile ? '1.5rem 5%' : '1.75rem 8%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem 1.5rem' }}>
                    <span style={{ fontFamily: INTER, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5, fontWeight: 700 }}>On this page</span>
                    {TOC.map((item) => (
                        <a key={item.id} href={`#${item.id}`} style={{ fontFamily: INTER, fontSize: '0.92rem', color: TEXT, opacity: 0.85, textDecoration: 'none', borderBottom: `1px solid rgba(232,223,211,0.25)` }}>
                            {item.label}
                        </a>
                    ))}
                </div>
            </nav>

            {/* ── 1. What Is Manufacturing ERP Software? (definition block) ─────
                The opening sentence is kept to ~40 words and answers the question
                head-on — the shape Google lifts into featured snippets and AI
                Overviews. Do not pad it. */}
            <section id="what-is-manufacturing-erp" style={{ backgroundColor: DARK, color: TEXT, padding: isMobile ? '6rem 5%' : '9rem 8%' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <span style={eyebrow}>Definition</span>
                    <h2 style={{ ...h2Style, fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '0 0 2.5rem 0' }}>
                        What Is Manufacturing ERP Software?
                    </h2>

                    <div style={{ borderLeft: `3px solid ${SAND}`, paddingLeft: isMobile ? '1.5rem' : '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <p style={{ fontFamily: INTER, fontSize: isMobile ? '1.15rem' : '1.35rem', fontWeight: 500, lineHeight: 1.6, margin: 0, color: TEXT }}>
                            Manufacturing ERP software is a single system that connects production, inventory, purchase, sales, quality, finance, and GST, so every department in a factory works from the same live data.
                        </p>
                        <p style={lead}>
                            Plan a run, and the system already knows whether the material is in stores. Issue material, and stock drops. Dispatch, and the invoice and e-way bill come off the same entry. No one retypes anything into a second file.
                        </p>
                    </div>

                    <h3 style={{ fontFamily: MONTSERRAT, fontSize: '1.4rem', fontWeight: 700, margin: '4rem 0 1.25rem 0' }}>
                        Manufacturing ERP vs accounting software like Tally
                    </h3>
                    <p style={{ ...lead, marginBottom: '1.25rem' }}>
                        Tally is accounting and inventory software, and good at it. It does not plan production, run job cards, hold batch genealogy, schedule machines, or record a quality rejection against a vendor. That is why most plants end up with Tally in accounts and a dozen spreadsheets everywhere else.
                    </p>
                    <p style={lead}>
                        An ERP for manufacturing industry covers those gaps. Tally can stay for the books — the ERP syncs with it — while production, stores, and planning move into one place.
                    </p>
                </div>
            </section>

            {/* ── 2. Signs Your Factory Has Outgrown Tally and Excel ───────────── */}
            <section id="signs-you-need-erp" ref={thirdSectionRef} style={{ backgroundColor: PANEL, padding: sectionPad, borderTop: `1px solid ${BORDER}` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', gap: isMobile ? '3rem' : '6rem' }}>
                    <div style={{ flex: 1, position: isMobile ? 'static' : 'sticky', top: '8rem' }}>
                        <span style={eyebrow}>Diagnosis</span>
                        <h2 style={h2Style}>
                            Signs Your Factory Has Outgrown Tally and Excel
                        </h2>
                        <p style={lead}>
                            Nobody decides to buy an ERP on a quiet Tuesday. It is five small failures, repeating, until someone does the maths on what they cost. If three of these sound familiar, you are there.
                        </p>
                    </div>

                    <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
                        {SIGNS.map((sign, i) => (
                            <div key={sign.title} style={{ border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '1.75rem', backgroundColor: 'rgba(232,223,211,0.02)' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.75rem' }}>
                                    <span style={{ fontFamily: MONTSERRAT, fontWeight: 800, opacity: 0.35 }}>0{i + 1}</span>
                                    <h3 style={{ fontFamily: INTER, fontSize: '1.1rem', fontWeight: 700, margin: 0, color: TEXT }}>{sign.title}</h3>
                                </div>
                                <p style={{ fontFamily: INTER, fontSize: '0.98rem', opacity: 0.72, lineHeight: 1.7, margin: 0 }}>{sign.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. ERP Modules for Manufacturing ─────────────────────────────
                Each H3 is the term people search for that module. One line on
                what it does, one on what changes on the floor. */}
            <section id="erp-modules-for-manufacturing" style={{ backgroundColor: DARK, color: TEXT, padding: sectionPad, borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ maxWidth: '850px', marginBottom: '5rem' }}>
                        <span style={eyebrow}>What&apos;s inside</span>
                        <h2 style={h2Style}>ERP Modules for Manufacturing</h2>
                        <p style={lead}>
                            Ten modules. You will not need all of them on day one — most plants start with inventory, because that is where the numbers disagree first. The rest go live in whatever order hurts most.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
                        {MODULES.map((m) => (
                            <div key={m.title} style={{ border: '1px solid rgba(232,223,211,0.12)', borderRadius: '20px', padding: '2rem', backgroundColor: 'rgba(232,223,211,0.02)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <h3 style={{ fontFamily: MONTSERRAT, fontSize: '1.2rem', fontWeight: 700, margin: 0, letterSpacing: '-0.01em', color: TEXT }}>{m.title}</h3>
                                <p style={{ fontFamily: INTER, fontSize: '0.95rem', opacity: 0.78, lineHeight: 1.6, margin: 0 }}>{m.does}</p>
                                <p style={{ fontFamily: INTER, fontSize: '0.95rem', lineHeight: 1.6, margin: 0, paddingTop: '1rem', borderTop: `1px solid ${BORDER}`, color: SAND }}>
                                    <span style={{ fontWeight: 700 }}>What changes: </span>{m.changes}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. GST-Ready ERP ─────────────────────────────────────────── */}
            <section id="gst-ready-erp" style={{ backgroundColor: SAND, color: DARK, padding: sectionPad }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', gap: isMobile ? '3rem' : '6rem' }}>
                    <div style={{ flex: 1 }}>
                        <span style={eyebrow}>Compliance</span>
                        <h2 style={h2Style}>GST-Ready ERP: e-Invoicing, e-Way Bills &amp; Reconciliation</h2>
                        <p style={{ ...lead, marginBottom: '1.25rem' }}>
                            GST for a manufacturer is not the same job as GST for a shop. You buy from two hundred vendors and half of them file late. The dispatch truck changes at Bhiwandi and the e-way bill has to follow.
                        </p>
                        <p style={lead}>
                            A GST ERP software handles that off the transactions you already record. Nobody logs into a portal to type something twice.
                        </p>
                    </div>

                    <div style={{ flex: 1.1, display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
                        {GST_ITEMS.map((item) => (
                            <div key={item.title} style={{ borderLeft: `3px solid ${DARK}`, paddingLeft: '1.5rem' }}>
                                <h3 style={{ fontFamily: INTER, fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.4rem 0' }}>{item.title}</h3>
                                <p style={{ fontFamily: INTER, fontSize: '0.98rem', opacity: 0.78, lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. ERP by industry ───────────────────────────────────────────
                Ordered by search demand. Capability copy only — no claims of past
                clients in these verticals. */}
            <section id="erp-by-industry" style={{ backgroundColor: DARK, color: TEXT, padding: sectionPad, borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ maxWidth: '900px', marginBottom: '5rem' }}>
                        <span style={eyebrow}>Industries</span>
                        <h2 style={h2Style}>ERP for Pharma, Chemical, Textile, Engineering &amp; Auto Component Manufacturers</h2>
                        <p style={lead}>
                            The bones of a factory are the same everywhere. Stock comes in, gets turned into something, goes out. The details are not — a pharma batch record and a fabrication job card have almost nothing in common. These are the five industries we build ERP for, and what each one needs that a generic system gets wrong.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {INDUSTRIES.map((ind) => (
                            <div key={ind.title} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? '1rem' : '4rem', borderTop: `1px solid rgba(232,223,211,0.15)`, padding: '2.5rem 0 1rem' }}>
                                <h3 style={{ fontFamily: MONTSERRAT, fontSize: '1.45rem', fontWeight: 700, margin: 0, lineHeight: 1.3, color: TEXT }}>{ind.title}</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {ind.body.map((para, i) => (
                                        <p key={i} style={{ fontFamily: INTER, fontSize: '1.02rem', opacity: 0.78, lineHeight: 1.75, margin: 0 }}>{para}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 style={{ fontFamily: MONTSERRAT, fontSize: '1.3rem', fontWeight: 700, margin: '5rem 0 1.5rem 0' }}>
                        What each industry needs from its ERP
                    </h3>
                    <div style={{ overflowX: 'auto', borderRadius: '20px', border: `1px solid ${BORDER}`, backgroundColor: 'rgba(232,223,211,0.02)' }}>
                        <table style={{ width: '100%', minWidth: '680px', borderCollapse: 'collapse', fontFamily: INTER }}>
                            <thead>
                                <tr>
                                    {INDUSTRY_TABLE.columns.map((c) => <th key={c} scope="col" style={headCell(true)}>{c}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {INDUSTRY_TABLE.rows.map((row, i, rows) => (
                                    <tr key={row[0]}>
                                        <th scope="row" style={{ ...cell(i === rows.length - 1, true), fontWeight: 700 }}>{row[0]}</th>
                                        <td style={{ ...cell(i === rows.length - 1, true), opacity: 0.8 }}>{row[1]}</td>
                                        <td style={{ ...cell(i === rows.length - 1, true), opacity: 0.8 }}>{row[2]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ── 6. Mumbai industrial belts ───────────────────────────────────
                Where these industries cluster. Geography, not a client list. */}
            <section id="mumbai-industrial-belts" style={{ backgroundColor: PANEL, color: TEXT, padding: sectionPad, borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ maxWidth: '900px', marginBottom: '4rem' }}>
                        <span style={eyebrow}>Local</span>
                        <h2 style={h2Style}>Where Mumbai&apos;s Manufacturers Are, and What Their ERP Has to Handle</h2>
                        <p style={{ ...lead, marginBottom: '1.25rem' }}>
                            Mumbai&apos;s factories are mostly not in Mumbai. They are strung along MIDC estates from Tarapur down to Taloja, and each belt has its own mix of industries — which means its own ERP problems.
                        </p>
                        <p style={lead}>
                            As an ERP software company in Mumbai, we come to the plant. All of these are a drive, not a flight.
                        </p>
                    </div>

                    <div style={{ overflowX: 'auto', borderRadius: '20px', border: `1px solid ${BORDER}`, backgroundColor: 'rgba(232,223,211,0.02)' }}>
                        <table style={{ width: '100%', minWidth: '720px', borderCollapse: 'collapse', fontFamily: INTER }}>
                            <thead>
                                <tr>
                                    {['Industrial belt', 'Industries there', 'What the ERP has to handle'].map((c) => <th key={c} scope="col" style={headCell(true)}>{c}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {BELTS.map((row, i, rows) => (
                                    <tr key={row.belt}>
                                        <th scope="row" style={{ ...cell(i === rows.length - 1, true), fontWeight: 700 }}>{row.belt}</th>
                                        <td style={{ ...cell(i === rows.length - 1, true), opacity: 0.8 }}>{row.industries}</td>
                                        <td style={{ ...cell(i === rows.length - 1, true), opacity: 0.8 }}>{row.handle}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p style={{ fontFamily: INTER, fontSize: '0.98rem', lineHeight: 1.75, opacity: 0.65, margin: '2.5rem 0 0 0' }}>
                        Nearby:{' '}
                        <Link href="/ai-automation-company-in-thane" style={inlineLink}>AI automation in Thane</Link>{' · '}
                        <Link href="/software-development-company-in-navi-mumbai" style={inlineLink}>Software development in Navi Mumbai</Link>{' · '}
                        <Link href="/software-development-agency-mumbai" style={inlineLink}>Software development in Mumbai</Link>
                    </p>
                </div>
            </section>

            {/* ── 7. Comparison table ──────────────────────────────────────────
                Categories, not brands. Packaged ERP genuinely wins a row or two;
                keep it that way — a one-sided table reads as an ad. */}
            <section id="erp-comparison" style={{ backgroundColor: SAND, color: DARK, padding: sectionPad }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ maxWidth: '850px', marginBottom: '4rem' }}>
                        <span style={eyebrow}>Compare</span>
                        <h2 style={h2Style}>Tally + Excel vs Packaged ERP vs Built-to-Fit ERP</h2>
                        <p style={lead}>
                            Three ways manufacturers run today. Packaged ERP is a fine answer if your factory already works the way the software assumes — some do. If yours does not, you pay for the product and then again to make it behave.
                        </p>
                    </div>

                    <div style={{ overflowX: 'auto', borderRadius: '20px', border: '1px solid rgba(46,42,38,0.15)', backgroundColor: 'rgba(255,255,255,0.35)' }}>
                        <table style={{ width: '100%', minWidth: '760px', borderCollapse: 'collapse', fontFamily: INTER }}>
                            <thead>
                                <tr>
                                    {COMPARISON.columns.map((c, i) => <th key={i} scope="col" style={{ ...headCell(false), width: i === 0 ? '22%' : '26%' }}>{c}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARISON.rows.map((row, i, rows) => (
                                    <tr key={row[0]}>
                                        <th scope="row" style={{ ...cell(i === rows.length - 1, false), fontWeight: 700 }}>{row[0]}</th>
                                        <td style={{ ...cell(i === rows.length - 1, false), opacity: 0.75 }}>{row[1]}</td>
                                        <td style={{ ...cell(i === rows.length - 1, false), opacity: 0.75 }}>{row[2]}</td>
                                        <td style={{ ...cell(i === rows.length - 1, false), fontWeight: 600 }}>{row[3]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ── 8. How to Choose an ERP for Manufacturing Industry ─────────── */}
            <section id="how-to-choose-erp" style={{ backgroundColor: PANEL, color: TEXT, padding: sectionPad, borderTop: `1px solid ${BORDER}` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', gap: isMobile ? '3rem' : '6rem' }}>
                    <div style={{ flex: 1.2 }}>
                        <span style={eyebrow}>Buyer&apos;s checklist</span>
                        <h2 style={h2Style}>How to Choose an ERP for Manufacturing Industry</h2>
                        <p style={{ ...lead, marginBottom: '1.25rem' }}>
                            Every vendor demo looks good. They are running a demo company with clean data and a process designed to fit the software. Yours is not that.
                        </p>
                        <p style={lead}>
                            Weigh these five before you commit. And if you would rather have someone independent referee three vendor pitches, that is a job for a{' '}
                            <Link href="/fractional-cto-as-a-service" style={inlineLink}>fractional CTO</Link>, not the vendor.
                        </p>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
                        {CHOOSE.map((item) => (
                            <div key={item.title} style={{ border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '1.5rem', backgroundColor: 'rgba(232,223,211,0.02)', display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                                <span style={{ width: '8px', height: '8px', backgroundColor: SAND, borderRadius: '50%', marginTop: '0.55rem', flexShrink: 0 }} />
                                <div>
                                    <h3 style={{ fontFamily: INTER, fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.35rem 0', color: TEXT }}>{item.title}</h3>
                                    <p style={{ fontFamily: INTER, fontSize: '0.95rem', opacity: 0.7, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 9. ERP Implementation Services ───────────────────────────────
                Week ranges are the plan for a single-plant rollout. */}
            <section id="erp-implementation" style={{ backgroundColor: DARK, color: TEXT, padding: sectionPad, borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ maxWidth: '850px', marginBottom: '6rem' }}>
                        <span style={eyebrow}>Rollout</span>
                        <h2 style={h2Style}>ERP Implementation Services: Process &amp; Timeline</h2>
                        <p style={{ ...lead, marginBottom: '1.25rem' }}>
                            A single-plant rollout is planned at 8 to 16 weeks. Multi-plant, or eleven years of Excel to untangle — longer.
                        </p>
                        <p style={lead}>
                            The first module goes live early and the rest follow in stages. Big-bang go-lives are how factories end up running two systems in parallel and trusting neither. The same team runs every step, from the first walkthrough to the weeks after go-live.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '3rem' }}>
                        {IMPLEMENTATION.map((step) => (
                            <div key={step.num} style={{ borderTop: `1px solid rgba(232,223,211,0.2)`, paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}>
                                    <span style={{ fontFamily: MONTSERRAT, fontSize: '2rem', fontWeight: 800, opacity: 0.35 }}>{step.num}</span>
                                    <span style={{ fontFamily: INTER, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: SAND, opacity: 0.8 }}>{step.weeks}</span>
                                </div>
                                <h3 style={{ fontFamily: MONTSERRAT, fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>{step.title}</h3>
                                <p style={{ fontFamily: INTER, fontSize: '0.95rem', opacity: 0.75, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 10. ERP Data Migration from Tally and Excel ──────────────────── */}
            <section id="erp-data-migration" style={{ backgroundColor: SAND, color: DARK, padding: sectionPad }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '4rem' : '8rem' }}>
                    <div style={{ flex: 1.2 }}>
                        <span style={eyebrow}>Migration</span>
                        <h2 style={h2Style}>ERP Data Migration from Tally and Excel</h2>
                        <p style={{ ...lead, marginBottom: '2.5rem' }}>
                            Every buyer asks the same thing: what happens to everything we already have? It comes across. Cleaned first — the vendor spelled three different ways, the item code that means two different parts — then checked line by line before anyone relies on it.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                            {MIGRATION.map((bullet) => (
                                <div key={bullet} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                    <div style={{ width: '8px', height: '8px', backgroundColor: DARK, borderRadius: '50%', marginTop: '0.55rem', flexShrink: 0 }} />
                                    <p style={{ fontFamily: INTER, fontSize: '1.05rem', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>{bullet}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ flex: 1, width: '100%', position: 'relative', aspectRatio: '4/5', borderRadius: '24px', overflow: 'hidden' }}>
                        <Image
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
                            alt="Migrating manufacturing data from Tally and Excel into an ERP"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </section>

            {/* ── 11. Cloud ERP for Manufacturing vs On-Premise ────────────────── */}
            <section id="cloud-vs-on-premise-erp" style={{ backgroundColor: DARK, color: TEXT, padding: sectionPad, borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ maxWidth: '800px', marginBottom: '4rem' }}>
                        <span style={eyebrow}>Deployment</span>
                        <h2 style={h2Style}>Cloud ERP for Manufacturing vs On-Premise</h2>
                        <p style={lead}>
                            Cloud suits most plants. On-premise earns its keep where plant internet is unreliable or data has to stay on your own servers. We build for both.
                        </p>
                    </div>

                    <div style={{ overflowX: 'auto', borderRadius: '20px', border: `1px solid ${BORDER}`, backgroundColor: 'rgba(232,223,211,0.02)' }}>
                        <table style={{ width: '100%', minWidth: '640px', borderCollapse: 'collapse', fontFamily: INTER }}>
                            <thead>
                                <tr>
                                    {['', 'Cloud ERP', 'On-Premise ERP'].map((heading, i) => (
                                        <th key={i} scope="col" style={{ ...headCell(true), width: i === 0 ? '26%' : '37%' }}>{heading}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { label: 'Upfront cost', cloud: 'Lower — no servers to buy', onPrem: 'Higher — servers and setup' },
                                    { label: 'Access', cloud: 'Plant, office, phone — anywhere', onPrem: 'On-site network, VPN for remote' },
                                    { label: 'Updates', cloud: 'Handled for you', onPrem: 'Scheduled with your IT team' },
                                    { label: 'Best for', cloud: 'Most Mumbai manufacturers', onPrem: 'Unreliable plant internet or strict data residency' },
                                    { label: 'Maintenance', cloud: 'Handled by Nexona', onPrem: 'Your IT team, with our support' }
                                ].map((row, i, rows) => (
                                    <tr key={row.label}>
                                        <th scope="row" style={{ ...cell(i === rows.length - 1, true), fontWeight: 700 }}>{row.label}</th>
                                        <td style={{ ...cell(i === rows.length - 1, true), opacity: 0.8 }}>{row.cloud}</td>
                                        <td style={{ ...cell(i === rows.length - 1, true), opacity: 0.8 }}>{row.onPrem}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ── 12. See It Working Before You Commit ─────────────────────────
                Proof by process, not by testimonial — there are no case studies
                to show yet, and nothing here should imply there are. */}
            <section id="see-it-working" style={{ backgroundColor: PANEL, color: TEXT, padding: sectionPad, borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '3rem' : '6rem' }}>
                    <div style={{ flex: 1.1 }}>
                        <span style={eyebrow}>Low risk</span>
                        <h2 style={h2Style}>See It Working Before You Commit</h2>
                        <p style={{ ...lead, marginBottom: '2.5rem' }}>
                            Buying an ERP off a slide deck is how plants end up with the expensive invoice printer. So you don&apos;t. You see it run on your own data first.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
                            {SEE_IT.map((item) => (
                                <div key={item.title} style={{ border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '1.5rem', backgroundColor: 'rgba(232,223,211,0.02)' }}>
                                    <h3 style={{ fontFamily: INTER, fontSize: '1.05rem', fontWeight: 700, color: TEXT, margin: '0 0 0.5rem 0' }}>{item.title}</h3>
                                    <p style={{ fontFamily: INTER, fontSize: '0.93rem', opacity: 0.7, lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ flex: 1, width: '100%', position: 'relative', aspectRatio: '16 / 11', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${BORDER}` }}>
                        <Image
                            src="/erp.png"
                            alt="ERP dashboard with production plan, stock by location and dispatch status"
                            fill
                            sizes="(max-width: 768px) 100vw, 45vw"
                            style={{ objectFit: 'cover', objectPosition: 'top' }}
                        />
                    </div>
                </div>
            </section>

            {/* ── 13. What Decides ERP Cost in India ───────────────────────────
                House rule: no price figures, no ranges, no "starting from". */}
            <section id="erp-cost-india" style={{ backgroundColor: DARK, color: TEXT, padding: sectionPad, borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', gap: isMobile ? '3rem' : '6rem' }}>
                    <div style={{ flex: 1.1 }}>
                        <span style={eyebrow}>Cost</span>
                        <h2 style={h2Style}>What Decides ERP Cost in India</h2>
                        <p style={{ ...lead, marginBottom: '1.25rem' }}>
                            No figure on this page, on purpose. A two-module build for one plant and a pharma rollout across three sites are not the same job, and any number printed here would be wrong for one of them.
                        </p>
                        <p style={{ ...lead, marginBottom: '1.25rem' }}>
                            What we can tell you is what moves it. We scope first, then quote — in writing, after the plant walkthrough.
                        </p>
                        <p style={{ fontFamily: INTER, fontStyle: 'italic', fontWeight: 600, fontSize: '1.1rem', color: TEXT, margin: 0 }}>
                            No per-user licence either way. You own what gets built.
                        </p>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
                        {COST_DRIVERS.map((d) => (
                            <div key={d.title} style={{ border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '1.5rem', backgroundColor: 'rgba(232,223,211,0.02)' }}>
                                <h3 style={{ fontFamily: INTER, fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.35rem 0', color: TEXT }}>{d.title}</h3>
                                <p style={{ fontFamily: INTER, fontSize: '0.95rem', opacity: 0.7, lineHeight: 1.6, margin: 0 }}>{d.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 14. FAQ (mirrors FAQPage schema via layout.tsx) ─────────────── */}
            <section id="faq" style={{ backgroundColor: PANEL, color: TEXT, padding: sectionPad }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <span style={{ ...eyebrow, marginBottom: '1rem' }}>FAQ</span>
                        <h2 style={{ ...h2Style, margin: 0 }}>Manufacturing ERP: Frequently Asked Questions</h2>
                    </div>

                    <div>
                        {FAQ_ITEMS.map((item, i) => {
                            const isOpen = openFaq === i
                            return (
                                <div key={item.question} style={{ borderBottom: `1px solid rgba(232,223,211,0.12)` }}>
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : i)}
                                        aria-expanded={isOpen}
                                        style={{
                                            width: '100%',
                                            background: 'none',
                                            border: 'none',
                                            color: TEXT,
                                            cursor: 'pointer',
                                            padding: '2rem 0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: '2rem',
                                            textAlign: 'left'
                                        }}
                                    >
                                        <h3 style={{ fontFamily: MONTSERRAT, fontSize: isMobile ? '1.1rem' : '1.35rem', fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
                                            {item.question}
                                        </h3>
                                        <span style={{ fontFamily: INTER, fontSize: '1.75rem', fontWeight: 300, flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>+</span>
                                    </button>
                                    <div
                                        style={{
                                            overflow: 'hidden',
                                            height: isOpen ? 'auto' : 0,
                                            opacity: isOpen ? 1 : 0,
                                            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
                                        }}
                                    >
                                        <p style={{ fontFamily: INTER, fontSize: '1.05rem', lineHeight: 1.7, opacity: 0.75, margin: 0, paddingBottom: '2rem', maxWidth: '720px' }}>
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── 15. Book an ERP assessment ───────────────────────────────── */}
            <section id="erp-assessment" style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5% 8rem' : '10rem 8%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '5rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                        <span style={eyebrow}>Next step</span>
                        <h2 style={{ ...h2Style, fontSize: 'clamp(2rem, 4.2vw, 3.2rem)' }}>
                            Book a 45-Minute ERP Assessment
                        </h2>
                        <p style={{ ...lead, marginBottom: '3rem' }}>
                            Tell us what you make and where it hurts. We come back with a written scope — which modules, what order they go live in, how long it takes — before you commit to anything.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                            {[
                                'A walkthrough of your plant, stores, and accounts',
                                'A gap analysis of how you run today',
                                'A written plan: modules, sequence, timeline'
                            ].map((bullet) => (
                                <div key={bullet} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                    <div style={{ width: '8px', height: '8px', backgroundColor: DARK, borderRadius: '50%', marginTop: '0.55rem', flexShrink: 0 }} />
                                    <p style={{ fontFamily: INTER, fontSize: '1.05rem', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>{bullet}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: `1px solid rgba(46,42,38,0.15)`, paddingTop: '1.5rem' }}>
                            <p style={{ fontFamily: INTER, fontSize: '0.95rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                                No canned demo. A conversation about your plant.
                            </p>
                        </div>
                    </div>

                    {/* Lead capture form */}
                    <div
                        style={{
                            flex: 1.2,
                            width: '100%',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '24px',
                            padding: isMobile ? '2.5rem 1.5rem' : '3.5rem',
                            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)'
                        }}
                    >
                        <p style={{ fontFamily: MONTSERRAT, fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 2rem 0', letterSpacing: '-0.02em' }}>
                            Request ERP Assessment
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label htmlFor="name" style={{ fontFamily: INTER, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.6 }}>Full Name *</label>
                                    <input required type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} style={{ padding: '0.8rem 1rem', border: '1px solid rgba(46,42,38,0.15)', borderRadius: '8px', fontSize: '1rem', fontFamily: INTER, outline: 'none', backgroundColor: '#F8F6F2' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label htmlFor="phone" style={{ fontFamily: INTER, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.6 }}>Phone Number *</label>
                                    <input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} style={{ padding: '0.8rem 1rem', border: '1px solid rgba(46,42,38,0.15)', borderRadius: '8px', fontSize: '1rem', fontFamily: INTER, outline: 'none', backgroundColor: '#F8F6F2' }} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="email" style={{ fontFamily: INTER, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.6 }}>Email Address *</label>
                                <input required type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} style={{ padding: '0.8rem 1rem', border: '1px solid rgba(46,42,38,0.15)', borderRadius: '8px', fontSize: '1rem', fontFamily: INTER, outline: 'none', backgroundColor: '#F8F6F2' }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="requirement" style={{ fontFamily: INTER, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.6 }}>What do you make, and what hurts? *</label>
                                <textarea required id="requirement" name="requirement" rows={4} placeholder="e.g. Chemical plant in Taloja, stock never matches Tally" value={formData.requirement} onChange={handleInputChange} style={{ padding: '0.8rem 1rem', border: '1px solid rgba(46,42,38,0.15)', borderRadius: '8px', fontSize: '1rem', fontFamily: INTER, outline: 'none', backgroundColor: '#F8F6F2', resize: 'vertical' }} />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                style={{
                                    backgroundColor: DARK,
                                    color: TEXT,
                                    padding: '1rem 2rem',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontFamily: INTER,
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease',
                                    marginTop: '1rem',
                                    boxShadow: '0 4px 12px rgba(46, 42, 38, 0.25)'
                                }}
                            >
                                {status === 'loading' ? 'Submitting...' : 'Request Assessment'}
                            </button>

                            {status === 'success' && (
                                <p style={{ fontFamily: INTER, fontSize: '0.95rem', color: '#047857', fontWeight: 600, marginTop: '1rem', textAlign: 'center' }}>
                                    ✓ Thank you! Your ERP assessment request has been received.
                                </p>
                            )}

                            {status === 'error' && (
                                <p style={{ fontFamily: INTER, fontSize: '0.95rem', color: '#DC2626', fontWeight: 600, marginTop: '1rem', textAlign: 'center' }}>
                                    ✗ {errorMessage}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </section>

            {/* Shared contact popup — same trigger rules as the other landing pages */}
            <AnimatePresence>
                {contactOpen && (
                    <ContactOverlay
                        trigger={trigger}
                        eyebrow="Get in touch"
                        heading="Get a free ERP assessment"
                        submitLabel="Request Assessment"
                        onClose={closeContact}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
