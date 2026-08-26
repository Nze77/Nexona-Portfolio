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

export default function AiProcessAutomationAgencyPage() {
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

            {/* Hero */}
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
                        src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2000&auto=format&fit=crop"
                        alt="AI and process automation agency — Nexona automates repeat business workflows"
                        fill
                        style={{ objectFit: 'cover', opacity: 0.25 }}
                        priority
                    />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, rgba(46,42,38,0.2), ${DARK})` }} />
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
                        <span style={{ fontFamily: INTER, fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>AI Agents &middot; Workflow Automation &middot; Integrations</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] as const }}
                        style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.4rem, 6.5vw, 5.75rem)',
                            fontWeight: 800,
                            lineHeight: 0.94,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.04em',
                            maxWidth: '1200px',
                            margin: 0
                        }}
                    >
                        AI and Process <br /> Automation <span style={{ color: 'transparent', WebkitTextStroke: `1px ${SAND}` }}>Agency</span>
                    </motion.h1>

                    {/* First line of body copy — carries the exact primary keyword,
                        answer-first, so AI search can quote it verbatim. */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] as const }}
                        style={{
                            fontFamily: INTER,
                            fontSize: isMobile ? '1.05rem' : '1.35rem',
                            marginTop: '2.5rem',
                            opacity: 0.85,
                            maxWidth: '820px',
                            letterSpacing: '0.02em',
                            lineHeight: 1.6
                        }}
                    >
                        <Link href="/" style={inlineLink}>Nexona</Link> is an AI and process automation
                        agency that maps how your business actually works, then automates the repeat
                        work — data entry, approvals, reports, follow-ups. We watch the workflow first.
                        Then we build.
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
                        { num: '24/7', label: 'Agents Running' },
                        { num: '50+', label: 'Systems Shipped' }
                    ].map((stat, i) => (
                        <motion.div key={i} variants={fadeInUp}>
                            <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '3rem', fontWeight: 800, margin: 0, color: SAND }}>{stat.num}</h3>
                            <p style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6, marginTop: '0.5rem' }}>{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <ClientStrip />

            {/* Intro — third section, one of the two contact-popup triggers */}
            <section ref={thirdSectionRef} style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '12rem 8%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '4rem' : '8rem' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }}
                        style={{ flex: 1, position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '24px', overflow: 'hidden' }}
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop"
                            alt="Mapping a business workflow before automating it — Nexona process automation discovery"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ flex: 1 }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>What We Actually Do</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.1rem, 4.2vw, 3.75rem)',
                            fontWeight: 800,
                            lineHeight: 1.05,
                            textTransform: 'uppercase',
                            marginBottom: '2.5rem',
                            letterSpacing: '-0.02em'
                        }}>
                            An Automation Agency That Counts First, Builds Second
                        </motion.h2>

                        {/* Answer-first paragraph, written to be quotable verbatim by
                            AI search and featured snippets. */}
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.85, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '1.5rem', fontWeight: 500 }}>
                            As an AI and process automation agency we do three things: process automation
                            for the rule-based work, AI automation for the judgement work, and the
                            integrations that let your existing tools hand information to each other
                            without a person copying it across. Discovery, build, measure. In that order,
                            every time.
                        </motion.p>

                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '1.5rem' }}>
                            Here is the part most agencies skip. Before anything gets built we sit with
                            the person doing the job and count. How many times a day. How long each time.
                            How often it comes back wrong. It is unglamorous work and it takes two or
                            three hours, and it is the only reason we know what is worth automating.
                        </motion.p>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '1.5rem' }}>
                            One client — a distributor, nine branches — was convinced their bottleneck was
                            month-end reporting. Everyone said so. We counted anyway. The actual cost was
                            a floor supervisor who did not sit at a desktop, so he photographed each
                            dispatch note and WhatsApped it to a girl in accounts who typed all 60-odd of
                            them in after 6pm. Every day. Nobody had ever written that step down because
                            it was not officially anybody’s process.
                        </motion.p>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '3rem' }}>
                            That one took four weeks. Month-end reporting we got to later, and it turned
                            out to matter much less than the meeting had insisted. Which happens more
                            often than you would think, honestly.
                        </motion.p>

                        <motion.ul variants={staggerContainer} style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                'Process automation for orders, approvals, reminders and reporting',
                                'AI agents that read, classify, answer and route',
                                'Document processing — invoices, POs, forms, scans',
                                'Integrations across the tools you already pay for',
                                'Custom internal tools where no off-the-shelf app fits',
                                'Measured against hours saved and error rate, not vibes'
                            ].map((item, i) => (
                                <motion.li key={i} variants={fadeInUp} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontFamily: INTER, fontWeight: 600, fontSize: '1.1rem' }}>
                                    <div style={{ width: '12px', height: '12px', backgroundColor: DARK, borderRadius: '50%', flexShrink: 0 }} />
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </div>
            </section>

            {/* AI automation vs process automation — definitional section, built for
                AEO/GEO: an LLM answering "what's the difference" can lift this whole
                block. */}
            <section style={{ backgroundColor: '#25221F', color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4rem', maxWidth: '820px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>The Distinction Nobody Explains</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            AI Automation vs Process Automation
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.12rem', marginTop: '2rem' }}>
                            Short version: process automation runs the rules, AI automation handles the
                            mess. You almost always need both, and the projects that fail are the ones
                            that pick the wrong one for the step.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2.5rem' }}>
                        {[
                            {
                                kind: 'Process Automation',
                                line: 'Fixed rule. Same input, same output, every time.',
                                points: [
                                    'Order approved → invoice raised, stock adjusted, dispatch notified',
                                    'Payment 14 days overdue → reminder sent, owner flagged',
                                    'Monday 8am → the report is already in your inbox',
                                    'Form submitted → record created, assigned, acknowledged'
                                ],
                                note: 'Cheap, fast, boringly reliable. Roughly 70% of what we build.'
                            },
                            {
                                kind: 'AI Automation',
                                line: 'No writable rule. The input arrives messy and needs reading first.',
                                points: [
                                    'A customer email that half-describes a problem → classified and routed',
                                    'A scanned PO where quantity lands in a different column each time → fields extracted',
                                    'Forty repeat questions a day → answered against your real data, at 11pm',
                                    'A long thread → summarised into a draft reply a human approves'
                                ],
                                note: 'Powerful, needs guardrails. Never unsupervised on anything irreversible.'
                            }
                        ].map((col, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ delay: i * 0.12, duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '24px', padding: isMobile ? '2rem' : '3rem', backgroundColor: 'rgba(232,223,211,0.03)' }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.5rem', fontWeight: 800, margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{col.kind}</h3>
                                <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: '1.05rem', lineHeight: 1.6, margin: '0 0 2rem 0' }}>{col.line}</p>
                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {col.points.map((p, j) => (
                                        <li key={j} style={{ fontFamily: INTER, fontSize: '1rem', lineHeight: 1.6, opacity: 0.75, paddingLeft: '1.25rem', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: 0, top: '0.55em', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: SAND, opacity: 0.5 }} />
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                                <p style={{ fontFamily: INTER, fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.55, margin: 0, fontStyle: 'italic' }}>{col.note}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What automation removes — before/after rows */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '3.5rem' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Before / After</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            Which Processes Are Worth Automating
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.78, lineHeight: 1.8, fontSize: '1.1rem', marginTop: '2rem', maxWidth: '740px' }}>
                            These eight come up in nearly every discovery we run, roughly in the order
                            they cost the most. If three of them sound like your week, you already know
                            what the first phase is.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gap: '0' }}>
                        {[
                            { from: 'The same data typed into three systems that don’t talk', to: 'Entered once. Everything downstream updates itself.' },
                            { from: 'Invoices and POs keyed in by hand from PDFs and photos', to: 'Read, extracted, checked, posted. Exceptions flagged.' },
                            { from: 'Approvals chased across four WhatsApp threads', to: 'One tap, logged, with a record of who said yes and when.' },
                            { from: 'The Monday report somebody rebuilds by hand', to: 'Already in your inbox at 8am, same numbers every time.' },
                            { from: 'Follow-ups that depend on someone remembering', to: 'Triggered by what the customer did, or didn’t do.' },
                            { from: 'The same six customer questions, forty times a day', to: 'An AI agent that answers at 11pm and logs the enquiry.' },
                            { from: 'Enquiries triaged by whoever opens the inbox first', to: 'Classified, routed and assigned before anyone reads them.' },
                            { from: 'A month-end reconciliation nobody wants to own', to: 'Matched automatically. A person only sees the mismatches.' }
                        ].map((row, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-5%" }}
                                transition={{ delay: i * 0.06, duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    gap: isMobile ? '0.5rem' : '2.5rem',
                                    alignItems: isMobile ? 'flex-start' : 'baseline',
                                    padding: '1.75rem 0',
                                    borderBottom: `1px solid rgba(232,223,211,0.12)`
                                }}
                            >
                                <p style={{ fontFamily: INTER, fontSize: '1.05rem', lineHeight: 1.6, margin: 0, flex: 1, opacity: 0.55, textDecoration: 'line-through', textDecorationThickness: '1px' }}>
                                    {row.from}
                                </p>
                                <p style={{ fontFamily: INTER, fontSize: '1.05rem', lineHeight: 1.6, margin: 0, flex: 1, fontWeight: 600 }}>
                                    {row.to}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ textAlign: 'center', marginBottom: '6rem' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>Discovery To Measured</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.1rem, 4.2vw, 3.5rem)',
                            fontWeight: 800,
                            marginTop: '1.5rem',
                            textTransform: 'uppercase'
                        }}>
                            How an Automation Project Runs
                        </motion.h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                        {[
                            { step: '01', title: 'Count the work', desc: 'Two or three hours watching one job move end to end. Every re-entry, every wait, every chase, timed. You keep those notes whatever you decide to do next.' },
                            { step: '02', title: 'Pick one, argue about the rest', desc: 'You get a written phase plan and a number for hours saved. Then we push back on half of what you asked for, because some of it will not repay the build cost. Better to hear that now.' },
                            { step: '03', title: 'Ship the first workflow', desc: 'Three to five weeks to something live and in use. Not a demo environment — the real thing, running on real data, with the old process still available for a fortnight.' },
                            { step: '04', title: 'Measure, then extend', desc: 'Eight weeks after go-live we re-measure the same two numbers we baselined. If it did not move, we say so. If it did, that is the argument for phase two, and you have the receipts.' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-10%" }}
                                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.8, ease: [0.23, 1, 0.32, 1] as const } } }}
                                style={{ borderTop: `2px solid ${SAND}`, paddingTop: '2rem' }}
                            >
                                <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '2.5rem', fontWeight: 800, opacity: 0.3 }}>{item.step}</span>
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.5rem', fontWeight: 700, margin: '1rem 0' }}>{item.title}</h3>
                                <p style={{ fontFamily: INTER, opacity: 0.7, lineHeight: 1.6 }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services grid */}
            <section className="product-theme-trigger" data-theme="light" style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '12rem 8%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ textAlign: 'center', marginBottom: '5rem' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>What You Can Hire Us For</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.1rem, 4.2vw, 3.75rem)',
                            fontWeight: 800,
                            marginTop: '1.5rem',
                            textTransform: 'uppercase'
                        }}>
                            AI and Process Automation Services
                        </motion.h2>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        {[
                            {
                                title: 'Business Process Automation',
                                desc: 'Order entry, approvals, reminders, stock movements, scheduled reports. The rule-based spine of your operation, running without anyone pressing go. Usually the cheapest hours you will ever buy back.',
                                img: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80'
                            },
                            {
                                title: 'AI Agents',
                                desc: 'Voice and chat agents that pick up at 11pm, answer against your real data, qualify the caller and write the enquiry straight into your systems. They hand off to a human the moment the question gets unusual.',
                                img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80'
                            },
                            {
                                title: 'Document Processing',
                                desc: 'Invoices, purchase orders, delivery notes, forms, photographs of forms. Read, extracted into structured fields, validated against what you already have. Exceptions get flagged for a person instead of everything going to a person.',
                                img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80'
                            },
                            {
                                title: 'Systems Integration',
                                desc: <>The plumbing between tools that were never designed to talk. Tally, payment gateways, courier APIs, your <Link href="/customer-retention-management-software" style={inlineLink}>CRM</Link>, and the WhatsApp number your customers actually use.</>,
                                img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80'
                            },
                            {
                                title: 'Custom Internal Tools',
                                desc: <>When the workflow has nowhere to live, we build it one. Sometimes that grows into a full <Link href="/manufacturing-erp" style={inlineLink}>ERP</Link> — more often it stays a single sharp tool four people open forty times a day.</>,
                                img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80'
                            },
                            {
                                title: 'Automation Audit',
                                desc: <>Not sure where to start? Two or three hours, one workflow followed end to end, a written list of what is worth automating with hours attached. Independent of whether you then hire <Link href="/software-development-agency-mumbai" style={inlineLink}>our team</Link> to build it.</>,
                                img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80'
                            }
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-10%" }}
                                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { delay: (i % 3) * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] as const } } }}
                                whileHover={{ y: -10, boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    textAlign: 'left',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <div style={{ position: 'relative', width: '100%', height: '260px' }}>
                                    <Image src={s.img} alt={`${s.title} — AI and process automation agency services by Nexona`} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>{s.title}</h3>
                                    <p style={{ fontFamily: INTER, fontSize: '1.05rem', opacity: 0.7, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginTop: '4rem' }}
                    >
                        <Link href="/projects" style={{
                            fontFamily: INTER,
                            fontSize: '1rem',
                            fontWeight: 700,
                            color: DARK,
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            borderBottom: `2px solid ${DARK}`,
                            paddingBottom: '4px'
                        }}>
                            See what we have shipped &rarr;
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Where it lands — sector-level relevance plus internal links out */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4rem', maxWidth: '800px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Where This Usually Lands</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            Who We Automate For
                        </motion.h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                        {[
                            {
                                title: 'Manufacturing & distribution',
                                body: <>Dispatch notes, production reporting, stock that disagrees with the rack, GST paperwork. Often this grows into a full <Link href="/erp-systems-for-manufacturers" style={inlineLink}>ERP for manufacturers</Link>, but it rarely starts there.</>
                            },
                            {
                                title: 'Sales-led teams',
                                body: <>Lead triage, quotation follow-ups, pipeline hygiene, renewal reminders. Pairs directly with <Link href="/customer-retention-management-software" style={inlineLink}>customer retention software</Link> when churn is the thing keeping you up.</>
                            },
                            {
                                title: 'Education & campuses',
                                body: <>Admissions chasing, fee reminders, attendance rollups, the accreditation report six people assemble by hand. The <Link href="/college-erp" style={inlineLink}>college ERP</Link> side of our work, mostly.</>
                            },
                            {
                                title: 'Startups scaling past ~12 people',
                                body: <>The size where spreadsheets quietly stop working. Automate before you hire for operations — the <Link href="/software-development-company-in-navi-mumbai" style={inlineLink}>startups we work with</Link> usually find four to six hours a week per person hiding there.</>
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ delay: (i % 2) * 0.12, duration: 0.7, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '24px', padding: '2.5rem', backgroundColor: 'rgba(232,223,211,0.03)' }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.35rem', fontWeight: 700, margin: '0 0 1.25rem 0', letterSpacing: '-0.01em' }}>{item.title}</h3>
                                <p style={{ fontFamily: INTER, opacity: 0.75, lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
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
                            Automation Questions We Get Asked
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
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
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
                    <motion.p variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '1.2rem', opacity: 0.8, lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
                        You don’t need a spec or a process map. One hour, an honest description of the
                        part of your week that keeps going wrong, and we’ll tell you whether automation
                        is even the right answer. Sometimes it is a staffing problem wearing a software
                        costume, and we’ll say that too.
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
