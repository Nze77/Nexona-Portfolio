'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import StickyHeader from '../../components/StickyHeader'
import Footer from '../../components/Footer'
import ClientStrip from '../../components/ClientStrip'
import ContactSection from '../../components/ContactSection'
import ContactOverlay from '../../components/ContactOverlay'
import ParticleEffect from '../../components/ParticleEffect'
import { useContactPopup } from '../../lib/useContactPopup'
import { DARK, SAND, INTER } from '../../lib/constants'
import { FAQ_ITEMS } from './content'

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const } }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
}

// Inline text links: inherit the surrounding copy's colour so they read as part
// of the sentence, with a subtle underline to stay obviously clickable.
const inlineLink: React.CSSProperties = {
    color: 'inherit',
    textDecoration: 'underline',
    textDecorationThickness: '1px',
    textUnderlineOffset: '3px'
}

// The localities the page claims coverage of. Kept in one place because the
// same list is mirrored into `alsoServed` in the LANDING_PAGES registry — the
// schema should never claim an area the visible copy does not name.
const THANE_AREAS = [
    'Wagle Estate', 'Thane MIDC', 'Ghodbunder Road', 'Majiwada', 'Manpada',
    'Hiranandani Estate', 'Kolshet', 'Kalwa', 'Mumbra', 'Dombivli',
    'Kalyan', 'Bhiwandi', 'Mira Road', 'Bhayandar'
]

export default function AiAutomationCompanyInThanePage() {
    const heroRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

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

    return (
        <main style={{ backgroundColor: DARK, color: SAND, minHeight: '100vh', overflow: 'hidden' }}>
            <StickyHeader theme="dark" onContactClick={openContact} />

            {/* ── Hero ────────────────────────────────────────────────────────
                H1 is the exact primary keyword and nothing else. Every competitor
                ranking for this term pads theirs with "Best" or "#1"; the
                unadorned version reads as the incumbent. */}
            <section
                ref={heroRef}
                style={{
                    height: '100vh',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '0 5%',
                    overflow: 'hidden'
                }}
            >
                <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, y, zIndex: 0 }}>
                    <Image
                        src="https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=2000&auto=format&fit=crop"
                        alt="AI automation company in Thane — Nexona automates invoicing, dispatch and enquiry workflows for Thane businesses"
                        fill
                        style={{ objectFit: 'cover', opacity: 0.22 }}
                        priority
                    />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, rgba(46,42,38,0.25), ${DARK})` }} />
                </motion.div>

                <ParticleEffect />

                <motion.div style={{ zIndex: 10, opacity, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] as const }}
                        style={{
                            padding: '0.6rem 2rem',
                            border: `1px solid rgba(232,223,211,0.15)`,
                            borderRadius: '99px',
                            marginBottom: '2rem',
                            backdropFilter: 'blur(12px)',
                            backgroundColor: 'rgba(232,223,211,0.05)',
                            display: 'inline-block'
                        }}
                    >
                        <span style={{ fontFamily: INTER, fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Thane &middot; Wagle Estate &middot; Ghodbunder &middot; Kalyan</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] as const }}
                        style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.2rem, 6vw, 5.5rem)',
                            fontWeight: 800,
                            lineHeight: 0.94,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.04em',
                            maxWidth: '1200px',
                            margin: 0
                        }}
                    >
                        AI Automation Company in <span style={{ color: 'transparent', WebkitTextStroke: `1px ${SAND}` }}>Thane</span>
                    </motion.h1>

                    {/* First line of body copy — carries the exact primary keyword
                        and the differentiator in one breath, answer-first, so AI
                        search can quote it verbatim. */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] as const }}
                        style={{
                            fontFamily: INTER,
                            fontSize: isMobile ? '1.05rem' : '1.3rem',
                            marginTop: '2.5rem',
                            opacity: 0.85,
                            maxWidth: '840px',
                            letterSpacing: '0.02em',
                            lineHeight: 1.6
                        }}
                    >
                        <Link href="/" style={inlineLink}>Nexona</Link> is an AI automation company
                        in Thane, from Wagle Estate to Kalyan. We build the automation in code rather
                        than reselling you a subscription tool: invoice and PO matching, dispatch
                        entry, WhatsApp enquiries and approval chains, wired into the Tally, ERP and
                        CRM you already run on.
                    </motion.p>
                </motion.div>
            </section>

            {/* Stats bar */}
            <section style={{ backgroundColor: '#25221F', padding: '4rem 5%', borderTop: `1px solid rgba(232,223,211,0.1)` }}>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', textAlign: 'center' }}
                >
                    {[
                        { num: '3-5 wks', label: 'To First Live Automation' },
                        { num: '50+', label: 'Systems Shipped' },
                        { num: '100%', label: 'Source Code Yours' }
                    ].map((stat, i) => (
                        <motion.div key={i} variants={fadeInUp}>
                            <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '3rem', fontWeight: 800, margin: 0, color: SAND }}>{stat.num}</h3>
                            <p style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6, marginTop: '0.5rem' }}>{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <ClientStrip />

            {/* ── S1 · What we automate ───────────────────────────────────────
                Third section, one of the two contact-popup triggers. Converts the
                abstract term into work a Thane owner recognises in five seconds.
                Every competitor ships an undifferentiated service grid here. */}
            <section ref={thirdSectionRef} style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
                <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ maxWidth: '860px', marginBottom: '4.5rem' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>What We Actually Automate</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.1rem, 4.2vw, 3.6rem)',
                            fontWeight: 800,
                            lineHeight: 1.05,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            The Work Nobody Was Hired To Do
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.12rem', marginTop: '2rem' }}>
                            Most Thane businesses do not have an automation problem in the abstract.
                            They have a person who spends the first ninety minutes of every day moving
                            information between two systems that will never speak to each other on
                            their own. These are the ones we get asked for most.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '2rem' }}>
                        {[
                            {
                                title: 'Invoice and PO matching',
                                now: 'Someone opens the purchase order, opens the invoice, compares line by line, then types the result into Tally.',
                                after: <>Fields are extracted from both, matched automatically, and only the mismatches reach a person. Common with trading and distribution firms across <strong>Bhiwandi</strong> and <strong>Wagle Estate</strong>.</>
                            },
                            {
                                title: 'Dispatch challans into the ERP',
                                now: 'Challans come back from the gate as paper or a photo on WhatsApp, and get re-entered at the end of the day. Or Monday.',
                                after: <>Read, validated against the order, written straight into the system. Often the point where this grows into a full <Link href="/erp-systems-for-manufacturers" style={inlineLink}>manufacturing ERP</Link>.</>
                            },
                            {
                                title: 'WhatsApp enquiries into the CRM',
                                now: 'Enquiries land on a number three people share. Some get answered, some get scrolled past, nobody knows which.',
                                after: <>Captured, qualified, written into your <Link href="/customer-retention-management-software" style={inlineLink}>CRM</Link> with the context attached, routed to an owner, and chased if nobody replies.</>
                            },
                            {
                                title: 'Quotation follow-ups',
                                now: 'A quote goes out. Whether it gets chased on day three depends entirely on how busy that week was.',
                                after: 'Follow-ups fire on their own schedule, stop the moment the customer replies, and escalate the ones that go quiet past a threshold you set.'
                            },
                            {
                                title: 'Approval chains',
                                now: 'A discount, a purchase or a leave request sits in a director’s inbox behind two hundred other emails.',
                                after: 'Routed to the right approver on their phone, with the context they need to decide, and escalated if it sits untouched. Approvals stop being a bottleneck nobody can see.'
                            },
                            {
                                title: 'The Monday report',
                                now: 'Somebody exports three files, pastes them into a spreadsheet with nine tabs, and rebuilds the same view every week.',
                                after: <>Built once, run on a schedule, delivered before anyone asks. Usually the first step toward a proper <Link href="/business-management-software-development" style={inlineLink}>business management system</Link>.</>
                            },
                            {
                                title: 'Vendor and stock reconciliation',
                                now: 'The rack disagrees with the system, and finding out why is a two-day job nobody volunteers for.',
                                after: 'Continuous reconciliation, with exceptions flagged the day they appear rather than at the quarter end.'
                            },
                            {
                                title: 'Intake and onboarding',
                                now: 'New member, new patient, new student, new tenant. The same details get collected three times by three people.',
                                after: <>One intake flow that writes to every system that needs it. Where the judgement calls get harder, this is where <Link href="/ai-agent-development-company" style={inlineLink}>an AI agent</Link> starts to earn its place.</>
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-8%" }}
                                transition={{ delay: (i % 3) * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{ border: `1px solid rgba(46,42,38,0.15)`, borderRadius: '20px', padding: '2.25rem', backgroundColor: 'rgba(46,42,38,0.03)' }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.25rem', fontWeight: 700, margin: '0 0 1.25rem 0', letterSpacing: '-0.01em' }}>{item.title}</h3>
                                <p style={{ fontFamily: INTER, fontSize: '0.98rem', lineHeight: 1.65, opacity: 0.65, margin: '0 0 1rem 0' }}>
                                    <span style={{ fontWeight: 700, opacity: 0.9 }}>Today. </span>{item.now}
                                </p>
                                <p style={{ fontFamily: INTER, fontSize: '0.98rem', lineHeight: 1.65, opacity: 0.85, margin: 0, fontWeight: 500 }}>
                                    <span style={{ fontWeight: 700 }}>After. </span>{item.after}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── S2 · AI vs process automation vs RPA ────────────────────────
                Definitional block built for AEO/GEO: an engine answering "what's
                the difference" can lift the whole thing. Deliberately the
                CONDENSED version — the pillar owns the canonical treatment. */}
            <section style={{ backgroundColor: '#25221F', color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4rem', maxWidth: '840px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Three Words Used Interchangeably</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            AI Automation vs Process Automation vs RPA
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.12rem', marginTop: '2rem' }}>
                            Short version: process automation runs the rules, RPA imitates a person
                            clicking, and AI automation handles the mess. Real projects use more than
                            one. The ones that fail picked the wrong tool for the step.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
                        {[
                            {
                                kind: 'Process Automation',
                                line: 'A fixed rule. Same input, same output, every time.',
                                rows: [
                                    ['Good for', 'Order approved, so raise the invoice, adjust stock, notify dispatch'],
                                    ['Breaks when', 'The input stops being predictable'],
                                    ['Upkeep', 'Low. Boringly reliable'],
                                    ['Share of our work', 'Roughly 70%']
                                ]
                            },
                            {
                                kind: 'RPA',
                                line: 'Software imitating a person clicking through a screen.',
                                rows: [
                                    ['Good for', 'Old systems with no API and no way in'],
                                    ['Breaks when', 'The screen changes, a field moves, the window loads slowly'],
                                    ['Upkeep', 'High, and it is the cost nobody quotes for'],
                                    ['Share of our work', 'A last resort, not a default']
                                ]
                            },
                            {
                                kind: 'AI Automation',
                                line: 'No writable rule. The input arrives messy and has to be read first.',
                                rows: [
                                    ['Good for', 'A scanned PO where the quantity lands in a different column each time'],
                                    ['Breaks when', 'It is trusted with something irreversible, unsupervised'],
                                    ['Upkeep', 'Moderate. Needs monitoring and thresholds'],
                                    ['Share of our work', 'The remaining 30%, and rising']
                                ]
                            }
                        ].map((col, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ delay: i * 0.12, duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '24px', padding: isMobile ? '2rem' : '2.5rem', backgroundColor: 'rgba(232,223,211,0.03)' }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.4rem', fontWeight: 800, margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{col.kind}</h3>
                                <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: '1rem', lineHeight: 1.6, margin: '0 0 2rem 0' }}>{col.line}</p>
                                <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                                    {col.rows.map(([k, v], j) => (
                                        <div key={j}>
                                            <dt style={{ fontFamily: INTER, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.5, fontWeight: 700, marginBottom: '0.35rem' }}>{k}</dt>
                                            <dd style={{ fontFamily: INTER, fontSize: '0.98rem', lineHeight: 1.55, opacity: 0.8, margin: 0 }}>{v}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.65 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{ fontFamily: INTER, fontSize: '1.02rem', lineHeight: 1.8, marginTop: '3rem', maxWidth: '820px' }}
                    >
                        Most builds use the rules for the spine of the workflow and AI only for the
                        steps that used to need a human to read something first. The longer version of
                        this distinction lives on our{' '}
                        <Link href="/ai-automation-agency" style={inlineLink}>AI automation agency</Link> page.
                    </motion.p>
                </div>
            </section>

            {/* ── S3 · Proof · Aim Fitness, Thane West ────────────────────────
                The highest-value block on the page. Not one of the competitors
                ranking for this term publishes a real, named local case study —
                they run stock testimonials or none at all. A genuine Thane West
                client with a named business is the hardest thing on this page to
                copy. Keep the friction paragraph: the honesty is the point. */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4rem', maxWidth: '840px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Built in Thane</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            Aim Fitness, Lokmanya Nagar
                        </motion.h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.35fr', gap: isMobile ? '3rem' : '5rem', alignItems: 'start' }}>
                        {/* Client card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }}
                            style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '24px', padding: '2.5rem', backgroundColor: 'rgba(232,223,211,0.03)', position: 'sticky', top: '8rem' }}
                        >
                            <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '2rem' }}>
                                <Image
                                    src="/logos/aimfitness.png"
                                    alt="Aim Fitness Gym, Thane West — Nexona client"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.3rem', fontWeight: 800, margin: '0 0 1rem 0', textTransform: 'uppercase' }}>Aim Fitness</h3>
                            <address style={{ fontFamily: INTER, fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.65, fontStyle: 'normal', margin: '0 0 2rem 0' }}>
                                In front of TMC School, Pada No. 2,<br />
                                Lokmanya Nagar, Thane West,<br />
                                Thane, Maharashtra 400606
                            </address>
                            {/* Measured outcomes. Real client figures — do not
                                round up, do not add a fourth. The members number
                                is deliberately framed as growth the system
                                absorbed rather than growth it caused; the copy
                                beside it says so explicitly. */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.25rem', paddingBottom: '2.25rem', borderBottom: `1px solid rgba(232,223,211,0.15)` }}>
                                {[
                                    { num: '+88%', label: 'Renewals' },
                                    { num: '8–12 hrs', label: 'Saved Per Week' },
                                    { num: '<90 → 500+', label: 'Members Handled, Same Desk' }
                                ].map((s, i) => (
                                    <div key={i}>
                                        <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.85rem', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{s.num}</p>
                                        <p style={{ fontFamily: INTER, fontSize: '0.74rem', letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 700, marginTop: '0.4rem' }}>{s.label}</p>
                                    </div>
                                ))}
                            </div>
                            <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {[
                                    ['What we built', 'Custom gym management system + CRM'],
                                    ['Replaced', 'A paper register, a spreadsheet and a phone'],
                                    ['Runs on', 'Their own infrastructure. Their code.']
                                ].map(([k, v], i) => (
                                    <div key={i}>
                                        <dt style={{ fontFamily: INTER, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.5, fontWeight: 700, marginBottom: '0.35rem' }}>{k}</dt>
                                        <dd style={{ fontFamily: INTER, fontSize: '1rem', lineHeight: 1.55, opacity: 0.85, margin: 0 }}>{v}</dd>
                                    </div>
                                ))}
                            </dl>
                        </motion.div>

                        {/* Narrative */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-10%" }}
                            variants={staggerContainer}
                        >
                            <motion.h3 variants={fadeInUp} style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: isMobile ? '1.35rem' : '1.65rem', fontWeight: 700, margin: '0 0 1.75rem 0', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
                                A gym is a renewals business that looks like a fitness business
                            </motion.h3>

                            {[
                                'Aim Fitness runs out of Lokmanya Nagar in Thane West, in front of the TMC school. When we started, memberships were tracked in a register at the desk. Renewal dates lived in a spreadsheet one person maintained. Follow-ups happened on WhatsApp from a personal phone, which meant they happened when that person remembered.',
                                'None of that is unusual, and none of it was anyone’s fault. It is what every growing gym does until the member count passes the point where a person can hold it in their head. The failure mode is specific and expensive: a membership lapses quietly, nobody notices for three weeks, and by the time anyone calls, the member has already joined somewhere else. Churn in this business is not dramatic. It is silent.',
                                'We built them a custom gym management system with a CRM underneath it. Members, plans, payments and attendance in one place. Renewal dates that surface before they matter rather than after. Follow-ups that fire on a schedule and stop the moment someone responds, sent from the gym’s number rather than a staff member’s personal one.',
                                'They had fewer than 90 paying members then. They have more than 500 now. We are not going to claim the software did that — they built the gym, ran the marketing and kept people coming back. What the system did was stop the admin growing at the same rate. The same front desk that was straining at 90 handles 500-plus without anyone hired to chase renewals, and it saves eight to twelve hours a week doing it. Renewals are up 88%, and that number we will take credit for, because it is almost entirely a function of a date surfacing before it passes instead of after.'
                            ].map((para, i) => (
                                <motion.p key={i} variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '1.08rem', lineHeight: 1.8, opacity: 0.8, margin: '0 0 1.5rem 0' }}>
                                    {para}
                                </motion.p>
                            ))}

                            <motion.div variants={fadeInUp} style={{ borderLeft: `2px solid rgba(232,223,211,0.25)`, paddingLeft: '1.75rem', marginTop: '2.5rem' }}>
                                <p style={{ fontFamily: INTER, fontSize: '1.02rem', lineHeight: 1.8, opacity: 0.7, margin: 0 }}>
                                    This is a small business, not an enterprise deployment. That is the
                                    point. The same three problems — records in one place, a date that
                                    surfaces before it is missed, a follow-up that does not depend on
                                    anyone remembering — are what we automate for a fabricator in Wagle
                                    Estate and a distributor in Bhiwandi. Only the nouns change.
                                </p>
                            </motion.div>

                            <motion.p variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '1rem', lineHeight: 1.7, opacity: 0.6, marginTop: '2.5rem' }}>
                                More of what we have shipped is on the{' '}
                                <Link href="/projects" style={inlineLink}>projects page</Link>, and the
                                systems side of this work is covered on{' '}
                                <Link href="/business-management-software-development" style={inlineLink}>business management software</Link>.
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── S4 · Built for how Thane actually runs ──────────────────────
                Two halves. 4a maps automations to Thane's real economic
                geography. 4b names the operating constraints — Tally, WhatsApp,
                part-paper records, GST, Marathi. A city-swapped template
                structurally cannot produce 4b, which is exactly why it is here. */}
            <section style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
                <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4.5rem', maxWidth: '860px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Local Reality, Not Local Keywords</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.1rem, 4.2vw, 3.6rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.05,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            Built For How Thane Runs
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.12rem', marginTop: '2rem' }}>
                            Thane is not a smaller Mumbai. It is an industrial belt with a service
                            economy layered on top, and the automation that works in a Lower Parel
                            office does not survive contact with a factory gate in Wagle Estate.
                        </motion.p>
                    </motion.div>

                    {/* 4a — sectors */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: isMobile ? '5rem' : '7rem' }}>
                        {[
                            {
                                where: 'Wagle Estate & Thane MIDC',
                                what: 'Chemicals, engineering, fabrication',
                                body: <>Batch records, dispatch paperwork, QC sign-offs and GST documentation. Automation here usually starts at the gate and works inward, and often becomes a full <Link href="/manufacturing-erp" style={inlineLink}>manufacturing ERP</Link>.</>
                            },
                            {
                                where: 'Bhiwandi corridor',
                                what: 'Warehousing, logistics, distribution',
                                body: 'Purchase orders, e-way bills, stock that disagrees with the rack, and three-way matching that somebody does by eye. High document volume, low tolerance for error, enormous upside.'
                            },
                            {
                                where: 'Ghodbunder Road & Kolshet',
                                what: 'Real estate, hospitality, retail',
                                body: 'Site enquiries arriving at all hours across WhatsApp, portals and walk-ins, then dying in a shared inbox. Capture, qualification and routing is nearly always the first build.'
                            },
                            {
                                where: 'Majiwada, Manpada, Hiranandani Estate',
                                what: 'Clinics, institutes, professional services',
                                body: <>Intake, appointments, fee and renewal cycles, reminders. The education version of this is covered on our <Link href="/college-erp" style={inlineLink}>college and school ERP</Link> page.</>
                            },
                            {
                                where: 'Kalwa, Mumbra, Dombivli, Kalyan',
                                what: 'Smaller units, tighter margins',
                                body: 'Fewer systems, more paper, and no tolerance for a monthly licence that scales with headcount. Scope has to be small and the first result has to arrive fast, or it does not get built at all.'
                            },
                            {
                                where: 'Across the MMR',
                                what: 'Businesses outgrowing Excel',
                                body: <>The point where spreadsheets quietly stop working, usually somewhere past twelve people. Automate before hiring for operations. If nobody senior is deciding what gets built, a <Link href="/fractional-cto-as-a-service" style={inlineLink}>fractional CTO</Link> comes first.</>
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-8%" }}
                                transition={{ delay: (i % 3) * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{ border: `1px solid rgba(46,42,38,0.15)`, borderRadius: '20px', padding: '2.25rem', backgroundColor: 'rgba(46,42,38,0.03)' }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.5rem 0', letterSpacing: '-0.01em' }}>{item.where}</h3>
                                <p style={{ fontFamily: INTER, fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.5, fontWeight: 700, margin: '0 0 1.25rem 0' }}>{item.what}</p>
                                <p style={{ fontFamily: INTER, fontSize: '0.98rem', lineHeight: 1.7, opacity: 0.75, margin: 0 }}>{item.body}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* 4b — constraints. The section a template cannot write. */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ maxWidth: '900px' }}
                    >
                        <motion.h3 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.15,
                            letterSpacing: '-0.02em',
                            margin: '0 0 2.5rem 0'
                        }}>
                            Six Constraints We Build Around
                        </motion.h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {[
                                {
                                    c: 'You run Tally, not NetSuite',
                                    b: 'So the integration has to work with what Tally actually exposes rather than the clean API a case study assumes. We read and write the formats it supports and keep it as the book of record, because your CA is not changing accounting software for this.'
                                },
                                {
                                    c: 'Work happens on WhatsApp, not Slack',
                                    b: 'Enquiries, approvals, dispatch photos and price negotiations all arrive on the same number. An automation that ignores WhatsApp is automating the quiet half of your business and leaving the loud half alone.'
                                },
                                {
                                    c: 'Records are part digital, part paper',
                                    b: 'A challan is a photo. An invoice is a scan of a print of a PDF. Extraction has to survive a skewed phone camera in bad light, which is a genuinely different engineering problem from parsing a clean digital file.'
                                },
                                {
                                    c: 'Compliance means GST and e-way bills',
                                    b: 'Deadlines, formats and reconciliation that do not bend. Automation here has to be auditable — you need to be able to show why the system did what it did, not just that it did it.'
                                },
                                {
                                    c: 'Your staff work in Marathi and Hindi',
                                    b: 'Often mixed with English inside one sentence, typed in Latin script. Classification has to be built against real messages from your business, not clean test data, and the interface has to be usable by the person at the desk rather than the person who commissioned it.'
                                },
                                {
                                    c: 'There is no in-house engineer',
                                    b: 'So nothing can be built that needs one. When a workflow breaks at 9pm on a Saturday, there has to be someone to message, and it cannot be a ticket queue in another timezone. This is the reason we avoid fragile chains of connected no-code tools.'
                                }
                            ].map((item, i) => (
                                <motion.div key={i} variants={fadeInUp} style={{ display: 'flex', gap: isMobile ? '1rem' : '2rem', alignItems: 'flex-start' }}>
                                    <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '0.9rem', fontWeight: 800, opacity: 0.35, flexShrink: 0, paddingTop: '0.3rem' }}>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div>
                                        <h4 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.6rem 0', letterSpacing: '-0.01em' }}>{item.c}</h4>
                                        <p style={{ fontFamily: INTER, fontSize: '1rem', lineHeight: 1.75, opacity: 0.75, margin: 0 }}>{item.b}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── S5 · How a project runs + failure handling ──────────────────
                Replaces the identical five-step diagram every competitor ships.
                The "when it gets it wrong" block is the trust argument — no
                competing page in this SERP addresses failure at all. */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4rem', maxWidth: '840px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>How It Runs</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            The Demo Takes Days. The System Takes Weeks.
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.12rem', marginTop: '2rem' }}>
                            Anyone can show you a working demo in an afternoon, and you should be
                            suspicious of what that proves. A demo handles the clean case. The gap
                            between that and a system that survives the scanned invoice, the missing
                            field and the vendor who spells the same product three ways is where the
                            actual timeline lives.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: isMobile ? '4rem' : '6rem' }}>
                        {[
                            {
                                w: 'Week 1',
                                t: 'We watch, and we count',
                                need: 'An hour with whoever actually does the work, and real documents — not sanitised ones',
                                out: 'A measured baseline: how long each step takes today, how often it goes wrong, and what that costs per month'
                            },
                            {
                                w: 'Week 2',
                                t: 'Scope, and the honest no',
                                need: 'A decision-maker in the room for ninety minutes',
                                out: 'What we would build first, what we would leave alone, and what we expect it to save. This is the go/no-go. If automation is not your problem, this is where we say so'
                            },
                            {
                                w: 'Weeks 3–5',
                                t: 'Build the first workflow',
                                need: 'Access to the systems it touches, and someone to answer questions within a day',
                                out: 'One workflow live in production, handling real volume, with the exceptions visible'
                            },
                            {
                                w: 'Weeks 6–8',
                                t: 'Harden it against reality',
                                need: 'Your team using it and telling us what is annoying',
                                out: 'Thresholds tuned, edge cases handled, the parts nobody uses removed'
                            },
                            {
                                w: 'Week 8+',
                                t: 'Measure against the baseline',
                                need: 'Nothing',
                                out: 'The same two numbers from week one, measured again. If it is not measurably faster or cleaner, it was the wrong thing to automate and we will tell you that rather than invoice around it'
                            }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-8%" }}
                                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '20px', padding: isMobile ? '1.75rem' : '2.25rem 2.5rem', backgroundColor: 'rgba(232,223,211,0.03)', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '130px 1fr', gap: isMobile ? '1rem' : '2.5rem', alignItems: 'start' }}
                            >
                                <span style={{ fontFamily: INTER, fontSize: '0.78rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.5, paddingTop: '0.25rem' }}>{step.w}</span>
                                <div>
                                    <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.25rem', fontWeight: 700, margin: '0 0 1.1rem 0', letterSpacing: '-0.01em' }}>{step.t}</h3>
                                    <p style={{ fontFamily: INTER, fontSize: '0.96rem', lineHeight: 1.65, opacity: 0.6, margin: '0 0 0.75rem 0' }}>
                                        <span style={{ fontWeight: 700, opacity: 0.9 }}>We need from you. </span>{step.need}
                                    </p>
                                    <p style={{ fontFamily: INTER, fontSize: '0.96rem', lineHeight: 1.65, opacity: 0.8, margin: 0 }}>
                                        <span style={{ fontWeight: 700 }}>You get. </span>{step.out}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Failure handling */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }}
                        style={{ border: `1px solid rgba(232,223,211,0.25)`, borderRadius: '24px', padding: isMobile ? '2.25rem' : '3.5rem', backgroundColor: 'rgba(232,223,211,0.05)' }}
                    >
                        <h3 style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            margin: '0 0 1.75rem 0',
                            lineHeight: 1.15
                        }}>
                            What Happens When The AI Gets It Wrong
                        </h3>
                        <p style={{ fontFamily: INTER, fontSize: '1.08rem', lineHeight: 1.8, opacity: 0.8, margin: '0 0 2.5rem 0', maxWidth: '760px' }}>
                            It will, sometimes. Any vendor telling you otherwise is selling you a demo.
                            The question is not whether a model misreads a smudged quantity — it is
                            whether that mistake reaches your ledger. Four things, designed in from the
                            start rather than added after the first incident.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '2rem' }}>
                            {[
                                ['Confidence thresholds', 'Every extraction carries a score. Anything under the line you set never goes straight through.'],
                                ['Human review queues', 'Low-confidence items land in a queue built for speed — the field in question, the source image, accept or correct.'],
                                ['Full audit logs', 'What the system saw, what it decided, and why. A wrong result can be traced rather than argued about.'],
                                ['Draft-and-approve on anything irreversible', 'Credit notes, contracts, price changes, payments. The system prepares. A person presses the button. Always.']
                            ].map(([t, b], i) => (
                                <div key={i}>
                                    <h4 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.65rem 0', letterSpacing: '-0.01em' }}>{t}</h4>
                                    <p style={{ fontFamily: INTER, fontSize: '0.98rem', lineHeight: 1.7, opacity: 0.7, margin: 0 }}>{b}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── S6 · Cost drivers ───────────────────────────────────────────
                NO FIGURES. Deliberate, and it applies site-wide: engagements are
                scoped per client and a number published before discovery is a
                guess. This section captures the budget-anchoring intent that the
                two competitors publishing price tiers currently win by default,
                by answering the question behind it instead of the question. */}
            <section style={{ backgroundColor: '#25221F', color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4rem', maxWidth: '840px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Budget</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            What Drives The Cost
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.12rem', marginTop: '2rem' }}>
                            We do not publish a rate card, and you should be wary of one that covers a
                            website and an AI automation project in the same bracket. Cost tracks scope,
                            not seats, and we quote after discovery. What follows is what actually moves
                            the number, so you can estimate the shape of it before you speak to anyone.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[
                            ['How many systems it touches', 'One workflow inside one system is the floor. Every additional system that has to send or receive data adds integration work, and the ones without a clean API add the most.'],
                            ['Whether documents are digital or scanned', 'A structured digital file is cheap to read. A photo of a challan taken at a gate in poor light is a different problem, and it is the more common one here.'],
                            ['How much error tolerance the process has', 'A marketing follow-up can be ninety-five percent right. A GST reconciliation cannot. Lower tolerance means more validation, more review tooling and more testing.'],
                            ['Volume, and how spiky it is', 'Forty documents a day and four thousand are different architectures. So is a month-end that is twenty times a normal Tuesday.'],
                            ['Where it runs', 'Your infrastructure, an Indian cloud region, or ours. On-premise deployment behind your firewall costs more to set up and is sometimes the only option compliance will accept.'],
                            ['Build versus run', 'The one-time build is the visible number. Model usage, hosting and monitoring are ongoing, usually modest, and we would rather show you both up front than discover the second one together in month three.']
                        ].map(([t, b], i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-8%" }}
                                transition={{ delay: (i % 3) * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '20px', padding: '2.25rem', backgroundColor: 'rgba(232,223,211,0.03)' }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.15rem', fontWeight: 700, margin: '0 0 1rem 0', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{t}</h3>
                                <p style={{ fontFamily: INTER, fontSize: '0.98rem', lineHeight: 1.7, opacity: 0.75, margin: 0 }}>{b}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.65 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{ fontFamily: INTER, fontSize: '1.02rem', lineHeight: 1.8, marginTop: '3rem', maxWidth: '820px' }}
                    >
                        One thing that is not a cost driver: how many people use it. There is no
                        per-seat licence at the end of this. You own the system, and hiring four more
                        staff costs you nothing extra. The same logic applied to agent work is on our{' '}
                        <Link href="/ai-agent-development-company" style={inlineLink}>AI agent development</Link> page.
                    </motion.p>
                </div>
            </section>

            {/* ── S7 · Vendor selection checklist ─────────────────────────────
                Captures the "which is best" evaluation intent. Framed as buyer
                education rather than attack — each question is one we answer
                well and a reseller or a city-page template shop cannot. */}
            <section style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4rem', maxWidth: '840px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Before You Shortlist</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            How To Choose An AI Automation Company in Thane
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.12rem', marginTop: '2rem' }}>
                            Seven questions worth asking anyone you are considering, including us. Most
                            firms ranking for this search are web-development or digital-marketing
                            agencies that added an AI page last year. That is not disqualifying on its
                            own, but it should change what you ask them.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
                        {[
                            ['Do you write code, or configure a tool you resell?', 'Both are legitimate. They fail differently. A no-code platform is faster and cheaper until you hit the thing it does not support, and then there is no way through. Ask what happens at that point.'],
                            ['Who owns the source code, and the prompts?', 'Be careful with an answer that describes ownership of your data but goes quiet about the system processing it. If leaving is expensive, you are not a client, you are a tenant.'],
                            ['Can you show me a system you built?', 'Not a stock dashboard screenshot, not a logo wall. A real screen from a real client, with the client named. If nobody will let them show anything, ask why.'],
                            ['Where does our data go, and does it leave India?', 'A vendor who has not thought about this will answer vaguely and quickly. The right answer is specific about what gets sent to a model, what is redacted first, and what never leaves your systems.'],
                            ['What is your evaluation method before go-live?', 'Meaning: how do you know it works before real money depends on it? If the answer is "we test it", press further. Ask what the accuracy threshold is and who signed off on it.'],
                            ['Who maintains it in month four?', 'The build is the easy part. Ask who you message when a workflow breaks on a Saturday evening, how fast they respond, and whether that is a named person or a ticket queue.'],
                            ['Is the office you claim the office you have?', 'Several firms ranking for this search list a Thane address and operate from Nashik, Noida, Vadodara or Powai. Ask for the address on their GST registration. It takes thirty seconds, and it tells you something about everything else they will say.']
                        ].map(([q, a], i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-5%" }}
                                transition={{ delay: i * 0.06, duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{ display: 'flex', gap: isMobile ? '1rem' : '2rem', alignItems: 'flex-start', borderBottom: `1px solid rgba(46,42,38,0.12)`, paddingBottom: '2.25rem' }}
                            >
                                <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '0.9rem', fontWeight: 800, opacity: 0.3, flexShrink: 0, paddingTop: '0.25rem' }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: isMobile ? '1.1rem' : '1.25rem', fontWeight: 700, margin: '0 0 0.75rem 0', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{q}</h3>
                                    <p style={{ fontFamily: INTER, fontSize: '1rem', lineHeight: 1.75, opacity: 0.75, margin: 0 }}>{a}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── S8/S9 · Where we are, and where we work ─────────────────────
                Nexona is registered in Mumbai and serves Thane. Saying that
                plainly is the point: it is the one claim on this page a
                prospect can verify in thirty seconds, and half the SERP fails
                it. Do NOT rewrite this into a Thane office — constants.ts keeps
                the real address and the schema must not contradict GBP. */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '3.5rem' : '5rem', alignItems: 'start' }}>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-10%" }}
                            variants={staggerContainer}
                        >
                            <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Straight Answer</motion.span>
                            <motion.h2 variants={fadeInUp} style={{
                                fontFamily: "var(--font-montserrat), sans-serif",
                                fontSize: 'clamp(1.9rem, 3.6vw, 3rem)',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                lineHeight: 1.08,
                                letterSpacing: '-0.02em',
                                margin: '0 0 2rem 0'
                            }}>
                                We Are Not Pretending To Be A Thane Company
                            </motion.h2>
                            {[
                                'Nexona is registered in Mumbai and works across the MMR. Thane is a market we serve, not an address we hold, and we would rather tell you that on the page than have you find out on a call.',
                                'We say it because it is checkable, and because several firms ranking for this exact search do the opposite: a Thane address in the heading, a registered office in Nashik, Noida, Vadodara or Powai. Those pages are generated from one template with the city name swapped in, which is also why so many of them describe a Thane market they have never visited.',
                                'What we do have here is clients. Aim Fitness in Lokmanya Nagar is one of them, and we came to site to build it. Discovery happens in your office, in front of the actual work, because a workflow described in a meeting and a workflow watched at the desk are rarely the same workflow. After that the engineering is remote, the way it is for every serious software team in this city.'
                            ].map((p, i) => (
                                <motion.p key={i} variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '1.06rem', lineHeight: 1.8, opacity: 0.8, margin: '0 0 1.4rem 0' }}>{p}</motion.p>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }}
                            style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '24px', padding: isMobile ? '2.25rem' : '3rem', backgroundColor: 'rgba(232,223,211,0.03)' }}
                        >
                            <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.3rem', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 1.75rem 0', letterSpacing: '-0.01em' }}>
                                Where We Work In Thane
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '2.25rem' }}>
                                {THANE_AREAS.map((area) => (
                                    <span
                                        key={area}
                                        style={{
                                            fontFamily: INTER,
                                            fontSize: '0.88rem',
                                            padding: '0.45rem 1rem',
                                            border: `1px solid rgba(232,223,211,0.2)`,
                                            borderRadius: '99px',
                                            opacity: 0.8
                                        }}
                                    >
                                        {area}
                                    </span>
                                ))}
                            </div>
                            <p style={{ fontFamily: INTER, fontSize: '0.98rem', lineHeight: 1.75, opacity: 0.65, margin: '0 0 1.5rem 0' }}>
                                Site visits across all of it for discovery. If you are further out along
                                the Kalyan or Bhiwandi side, that is still a drive we make.
                            </p>
                            <p style={{ fontFamily: INTER, fontSize: '0.98rem', lineHeight: 1.75, opacity: 0.65, margin: 0 }}>
                                Nearby:{' '}
                                <Link href="/software-development-agency-mumbai" style={inlineLink}>Mumbai</Link>{' · '}
                                <Link href="/software-development-company-in-navi-mumbai" style={inlineLink}>Navi Mumbai</Link>{' · '}
                                <Link href="/erp-systems-for-manufacturers" style={inlineLink}>ERP for MMR manufacturers</Link>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── S10 · FAQ ──────────────────────────────────────────────────
                Copy lives in content.ts and is mirrored into FAQPage schema by
                layout.tsx, so the two can never drift. Question 2 carries the
                secondary keyword explicitly; question 15 is written in
                direct-answer form for PAA. */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ textAlign: 'center', marginBottom: '5rem' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>FAQ</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.1rem, 4.2vw, 3.5rem)',
                            fontWeight: 800,
                            marginTop: '1.5rem',
                            textTransform: 'uppercase'
                        }}>
                            What Thane Businesses Ask Us
                        </motion.h2>
                    </motion.div>

                    <div>
                        {FAQ_ITEMS.map((item, i) => {
                            const isOpen = openFaq === i
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-5%" }}
                                    transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.05 }}
                                    style={{ borderBottom: `1px solid rgba(232,223,211,0.15)` }}
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : i)}
                                        aria-expanded={isOpen}
                                        style={{
                                            width: '100%',
                                            background: 'none',
                                            border: 'none',
                                            color: SAND,
                                            cursor: 'pointer',
                                            padding: '2rem 0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: '2rem',
                                            textAlign: 'left'
                                        }}
                                    >
                                        <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: isMobile ? '1.1rem' : '1.35rem', fontWeight: 700, margin: 0, lineHeight: 1.3 }}>{item.question}</h3>
                                        <span style={{ fontFamily: INTER, fontSize: '1.75rem', fontWeight: 300, flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>+</span>
                                    </button>
                                    <motion.div
                                        initial={false}
                                        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] as const }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <p style={{ fontFamily: INTER, fontSize: '1.05rem', lineHeight: 1.7, opacity: 0.75, margin: 0, paddingBottom: '2rem', maxWidth: '720px' }}>{item.answer}</p>
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '4rem 5% 6rem' : '4rem 8% 10rem', textAlign: 'center' }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    variants={staggerContainer}
                    style={{ maxWidth: '900px', margin: '0 auto' }}
                >
                    <motion.h2 variants={fadeInUp} style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: 'clamp(2.1rem, 4.2vw, 3.75rem)',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        lineHeight: 1.05,
                        marginBottom: '2rem'
                    }}>
                        Tell Us What Keeps Getting Retyped
                    </motion.h2>
                    <motion.p variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '1.2rem', opacity: 0.8, lineHeight: 1.7, maxWidth: '740px', margin: '0 auto' }}>
                        No spec, no process map, no shortlist of tools. One hour, an honest description
                        of the part of your week that keeps going wrong, and we will tell you whether
                        automation is even the right answer. Sometimes it is a staffing problem wearing
                        a software costume, and we will say that too.
                    </motion.p>
                </motion.div>
            </section>

            <ContactSection />

            {/* Shared contact popup — same trigger rules as the other landing pages */}
            <AnimatePresence>
                {contactOpen && (
                    <ContactOverlay
                        trigger={trigger}
                        eyebrow="Get in touch"
                        heading="Get a free automation audit"
                        submitLabel="Book Free Automation Audit"
                        onClose={closeContact}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
