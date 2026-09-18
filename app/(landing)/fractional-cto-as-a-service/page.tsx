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

const MONT = 'var(--font-montserrat), sans-serif'

/* Comparison data lives outside the component so the table stays readable.
   Rendered as a real <table> on purpose — it is the single most extractable
   element on the page, and AI search lifts it whole for
   "fractional CTO vs full-time CTO". No cost figures, only relative cost. */
const COMPARISON_COLUMNS = ['Fractional CTO', 'Full-time CTO', 'One-shot consultant'] as const

const COMPARISON_ROWS: { label: string; cells: [string, string, string]; winner: 0 | 1 | 2 }[] = [
    {
        label: 'Cost',
        cells: [
            'Monthly retainer, scoped to the mandate. No equity, no severance, no recruiter fee.',
            'Executive salary plus equity, plus the search that got you there.',
            'Lower on paper. Paid again every time a new question comes up.'
        ],
        winner: 0
    },
    {
        label: 'Speed to start',
        cells: [
            'Assessment inside two weeks. Leading by the third.',
            'A search, a notice period, then ramp-up. Quarters, not weeks.',
            'Fast to book. Slow to matter.'
        ],
        winner: 0
    },
    {
        label: 'Continuity',
        cells: [
            'Same person every month. Owns the decision and its consequences.',
            'Strongest here — they live inside the company full-time.',
            'Gone before the recommendation is tested.'
        ],
        winner: 1
    },
    {
        label: 'Independence',
        cells: [
            'No internal politics, no team to protect. Will tell you the build is wrong.',
            'Eventually inherits the politics of the thing they built.',
            'Independent, but often selling the implementation they just recommended.'
        ],
        winner: 0
    },
    {
        label: 'Hands-on depth',
        cells: [
            'Reads the code, reviews the releases, writes the first AI pipeline.',
            'Depends entirely on the hire. Many stop coding years before you meet them.',
            'Rarely touches the repository at all.'
        ],
        winner: 0
    },
    {
        label: 'Best when',
        cells: [
            'You need senior judgement now and cannot justify the full-time seat yet.',
            'Engineering is the product and the team is past twenty-five people.',
            'You have one narrow, closed question and no need for an owner.'
        ],
        winner: 0
    }
]

export default function FractionalCtoAsAServicePage() {
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
                    {/* LCP element. Rendered at opacity 0.25 behind a gradient, so it
                        reads as texture rather than photography — the source width and
                        quality are pulled down to match, which is worth ~60% of the
                        bytes on the one image that gates Largest Contentful Paint.
                        `sizes` stops Next serving a 3840w candidate to a phone. */}
                    <Image
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1600&auto=format&fit=crop"
                        alt="Fractional CTO as a service — senior technology leadership for startups and MSMEs"
                        fill
                        sizes="100vw"
                        quality={50}
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
                        <span style={{ fontFamily: INTER, fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Architecture &middot; AI Strategy &middot; Due Diligence</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] as const }}
                        style={{
                            fontFamily: MONT,
                            fontSize: 'clamp(2.2rem, 6vw, 5.5rem)',
                            fontWeight: 800,
                            lineHeight: 0.94,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.04em',
                            maxWidth: '1200px',
                            margin: 0
                        }}
                    >
                        Fractional CTO <span style={{ color: 'transparent', WebkitTextStroke: `1px ${SAND}` }}>as a Service</span>
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
                            maxWidth: '860px',
                            letterSpacing: '0.02em',
                            lineHeight: 1.6
                        }}
                    >
                        <Link href="/" style={inlineLink}>Nexona Labs</Link> embeds as your fractional
                        CTO — architecture decisions, engineering leadership, AI strategy, and
                        technical due diligence — without the full-time executive cost.
                    </motion.p>
                </motion.div>
            </section>

            {/* The problem — deliberately the first thing after the hero rather than
                credentials, because it matches the query people actually type. */}
            <section id="the-problem" style={{ backgroundColor: '#25221F', padding: isMobile ? '5rem 5%' : '8rem 8%', borderTop: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '3rem', maxWidth: '760px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>The Problem</motion.span>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, fontSize: isMobile ? '1.15rem' : '1.4rem', fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
                            Nobody in the room can tell you whether the technical decision on the table
                            is the right one. So it gets made anyway, by whoever is loudest.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0 4rem' }}>
                        {[
                            'No technical co-founder, and an agency invoice you cannot audit.',
                            'Architecture chosen in week two that nobody has revisited since.',
                            'Your first developer is now leading four people and hating it.',
                            'A funding round coming, and no technical narrative that survives diligence.',
                            'AI on the board agenda, and three vendor demos that all looked identical.',
                            'Releases that slip, with no one accountable for why.'
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-5%" }}
                                transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{
                                    display: 'flex',
                                    gap: '1.25rem',
                                    alignItems: 'flex-start',
                                    padding: '1.5rem 0',
                                    borderBottom: `1px solid rgba(232,223,211,0.12)`
                                }}
                            >
                                <span style={{ fontFamily: MONT, fontWeight: 800, fontSize: '1rem', opacity: 0.35, flexShrink: 0, lineHeight: 1.6 }}>0{i + 1}</span>
                                <p style={{ fontFamily: INTER, fontSize: '1.05rem', lineHeight: 1.6, margin: 0, opacity: 0.8 }}>{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TL;DR — the single most quotable block on the page. Written as one
                self-contained paragraph so an LLM answering "what is CTO as a
                service" can lift it without needing surrounding context. */}
            <section id="in-short" style={{ backgroundColor: DARK, padding: isMobile ? '5rem 5%' : '7rem 8%' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }}
                    style={{
                        maxWidth: '900px',
                        margin: '0 auto',
                        border: `1px solid rgba(232,223,211,0.2)`,
                        borderRadius: '24px',
                        padding: isMobile ? '2.25rem' : '3.5rem',
                        backgroundColor: 'rgba(232,223,211,0.04)'
                    }}
                >
                    <span style={{ fontFamily: INTER, fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 800, opacity: 0.6, display: 'block', marginBottom: '1.5rem' }}>TL;DR</span>
                    <p style={{ fontFamily: INTER, fontSize: isMobile ? '1.05rem' : '1.2rem', lineHeight: 1.75, margin: 0, fontWeight: 500 }}>
                        Fractional CTO as a Service from Nexona Labs gives early-stage startups, growing
                        businesses and MSME manufacturers senior technology leadership — architecture
                        decisions, engineering oversight, AI strategy, vendor selection and technical
                        due diligence — without a full-time executive hire. Engagements run as a
                        monthly retainer or a fixed-scope project, priced per mandate after an
                        assessment rather than from a rate card.
                    </p>
                </motion.div>
            </section>

            <ClientStrip />

            {/* H2 1 — definition. Third section, one of the two popup triggers. */}
            <section id="what-is-fractional-cto-as-a-service" ref={thirdSectionRef} style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '12rem 8%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '4rem' : '8rem' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }}
                        style={{ flex: 1, position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '24px', overflow: 'hidden' }}
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop"
                            alt="Fractional CTO leading an architecture review session with an engineering team"
                            fill
                            sizes="(max-width: 900px) 100vw, 50vw"
                            loading="lazy"
                            quality={70}
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
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>The Definition</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: MONT,
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            lineHeight: 1.05,
                            textTransform: 'uppercase',
                            marginBottom: '2.5rem',
                            letterSpacing: '-0.02em'
                        }}>
                            What is Fractional CTO as a Service?
                        </motion.h2>

                        {/* Answer-first paragraph, written to be quotable verbatim. */}
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.85, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '1.5rem', fontWeight: 500 }}>
                            Fractional CTO as a Service is senior technology leadership on a monthly
                            retainer instead of a full-time executive hire. Someone owns the architecture
                            calls, runs the engineering team, sets the AI strategy, and reports to your
                            board — for a slice of the week rather than all of it.
                        </motion.p>

                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '1.5rem' }}>
                            The word doing the work there is <em>owns</em>. An advisor tells you what they
                            would do. A fractional CTO makes the decision, signs their name to it, and is
                            still in the room in March when it turns out to have been wrong. Which some of
                            them will be.
                        </motion.p>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '1.5rem' }}>
                            One founder came to us with a 47-slide deck from an agency proposing a rebuild
                            of a platform that had eleven active users. Eleven. Nobody had asked that
                            question in four months of conversations, because everyone in the room was
                            being paid to answer a different one. We killed the rebuild in the first
                            session. The rest of that engagement was less dramatic — hiring, mostly, and
                            a data model that needed straightening before anything else could sit on it.
                        </motion.p>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '3rem' }}>
                            You are not buying hours. You are buying the authority to say no, held by
                            someone who has nothing internal to protect.
                        </motion.p>

                        <motion.ul variants={staggerContainer} style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                'Also called CTO as a Service, CTOaaS, part-time CTO or virtual CTO',
                                'Monthly retainer or fixed-scope project, never per-seat licensing',
                                'One named person, not a rotating bench',
                                'Answerable to your board, in writing, every month'
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

            {/* H2 2 — deliverables. Named outputs, not capability labels. */}
            <section id="what-does-a-fractional-cto-do" style={{ backgroundColor: '#25221F', color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4.5rem', maxWidth: '820px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>The Work</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: MONT,
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            What Does a Fractional CTO Do?
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.12rem', marginTop: '2rem' }}>
                            Eight things, and each one ends in a document you keep. Vague retainers are
                            how this service gets a bad name — you should be able to point at what arrived
                            last month.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
                        {[
                            {
                                title: 'Technology strategy & roadmap',
                                deliverable: 'Deliverable: a 90-day technology roadmap with sequencing and named owners.',
                                body: 'What gets built, in what order, and what gets refused. The refusals matter more than the list.'
                            },
                            {
                                title: 'Architecture decisions',
                                deliverable: 'Deliverable: a written architecture audit report with risks ranked by cost.',
                                body: <>Data model, service boundaries, hosting, the parts that are expensive to change later. Where a rebuild is genuinely warranted we say so, and where it is not, we say that louder. Often it ends up as <Link href="/business-management-software-development" style={inlineLink}>one focused internal system</Link> instead.</>
                            },
                            {
                                title: 'Engineering team leadership',
                                deliverable: 'Deliverable: sprint direction, release cadence, and a monthly delivery review.',
                                body: 'Working with your existing lead rather than over them. Most teams do not need more process. They need someone to decide.'
                            },
                            {
                                title: 'AI strategy & implementation',
                                deliverable: 'Deliverable: an AI readiness assessment and a prioritised use-case shortlist.',
                                body: <>Where your data actually is, what state it is in, and the two or three workflows where a model pays for itself. Then oversight of the build — ours or yours. Adjacent to our <Link href="/ai-automation-agency" style={inlineLink}>AI automation</Link> and <Link href="/ai-agent-development-company" style={inlineLink}>AI agent development</Link> work, on the deciding side of it.</>
                            },
                            {
                                title: 'Technical due diligence',
                                deliverable: 'Deliverable: a buy-side or sell-side diligence report, findings ranked by cost.',
                                body: 'Codebase, dependencies, security posture, key-person risk, and the real maintenance bill. Written to survive the other side reading it.'
                            },
                            {
                                title: 'Vendor & cloud cost optimisation',
                                deliverable: 'Deliverable: a cloud and tooling cost review with cancellation candidates.',
                                body: 'Contracts, licences, the instance somebody spun up in 2022 and never turned off. This one tends to pay for a chunk of the retainer on its own.'
                            },
                            {
                                title: 'Hiring support for tech roles',
                                deliverable: 'Deliverable: an engineering hiring scorecard, plus interviews we sit in on.',
                                body: 'Writing the role honestly, screening, running the technical round, and making the call with you. Bad senior hires cost more than the salary.'
                            },
                            {
                                title: 'Board-ready technical reporting',
                                deliverable: 'Deliverable: an investor-ready technical narrative, refreshed monthly.',
                                body: 'What your board needs to understand about the technology, in language that does not require them to nod along.'
                            }
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-8%" }}
                                transition={{ delay: (i % 3) * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '24px', padding: isMobile ? '2rem' : '2.5rem', backgroundColor: 'rgba(232,223,211,0.03)' }}
                            >
                                <h3 style={{ fontFamily: MONT, fontSize: '1.3rem', fontWeight: 800, margin: '0 0 1rem 0', letterSpacing: '-0.01em' }}>{s.title}</h3>
                                <p style={{ fontFamily: INTER, fontSize: '1rem', lineHeight: 1.7, opacity: 0.75, margin: '0 0 1.25rem 0' }}>{s.body}</p>
                                <p style={{ fontFamily: INTER, fontSize: '0.92rem', lineHeight: 1.6, margin: 0, fontWeight: 700, opacity: 0.95, paddingTop: '1.25rem', borderTop: `1px solid rgba(232,223,211,0.12)` }}>{s.deliverable}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* H2 3 — who it's for */}
            <section id="who-needs-a-fractional-cto" style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4rem', maxWidth: '820px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Who It Is For</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: MONT,
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            Who Needs a Fractional CTO?
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.12rem', marginTop: '2rem' }}>
                            Four situations. If two of them describe you, the answer is probably yes.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                        {[
                            {
                                title: 'Startups with no technical co-founder',
                                body: <>You are paying an agency and cannot tell whether the invoice is honest or the architecture is sane. We sit on your side of that table. If the build itself needs rescuing, <Link href="/software-development-agency-mumbai" style={inlineLink}>our engineering team</Link> can pick it up — but the diagnosis comes first and stays independent.</>
                            },
                            {
                                title: 'Companies scaling an engineering team',
                                body: 'Your first developer is now managing four people and is miserable about it. Somebody has to own hiring, review standards and release cadence, and it should not be the person who was best at writing the code.'
                            },
                            {
                                title: 'Businesses preparing for a funding round',
                                body: 'Investors will ask what your architecture costs to scale, what your key-person risk is, and why the last two quarters slipped. Those answers need to exist before the meeting, in writing.'
                            },
                            {
                                title: 'MSMEs adopting AI and automation',
                                body: <>Manufacturers mostly. Three vendor demos that all looked the same, a board asking about AI, and nobody internal who can tell a real use case from a slide. This is where the <Link href="/erp-systems-for-manufacturers" style={inlineLink}>ERP</Link> conversation usually starts too.</>
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
                                <h3 style={{ fontFamily: MONT, fontSize: '1.35rem', fontWeight: 700, margin: '0 0 1.25rem 0', letterSpacing: '-0.01em' }}>{item.title}</h3>
                                <p style={{ fontFamily: INTER, opacity: 0.75, lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* H2 4 — comparison table. Rendered as a semantic <table> because this
                is the block AI search lifts wholesale for the "vs" query. */}
            <section id="fractional-cto-vs-full-time-cto" style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '3.5rem', maxWidth: '820px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>The Comparison</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: MONT,
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            Fractional CTO vs Full-Time CTO
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.78, lineHeight: 1.8, fontSize: '1.12rem', marginTop: '2rem' }}>
                            A full-time CTO wins on continuity and always will. Everything else, at your
                            stage, tilts the other way. The third column is there because most companies
                            are actually choosing between us and a consultant, not us and an executive.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-8%" }}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] as const }}
                        style={{ overflowX: 'auto', borderRadius: '24px', border: `1px solid rgba(46,42,38,0.15)`, backgroundColor: '#fff' }}
                    >
                        <table style={{ width: '100%', minWidth: '860px', borderCollapse: 'collapse', fontFamily: INTER }}>
                            <caption style={{ captionSide: 'top', textAlign: 'left', padding: '1.75rem 2rem 0', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.5 }}>
                                Fractional CTO vs full-time CTO vs one-shot consultant
                            </caption>
                            <thead>
                                <tr>
                                    <th scope="col" style={{ textAlign: 'left', padding: '1.5rem 2rem', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.5, borderBottom: `2px solid rgba(46,42,38,0.2)`, width: '150px' }}>
                                        &nbsp;
                                    </th>
                                    {COMPARISON_COLUMNS.map((col, i) => (
                                        <th
                                            key={col}
                                            scope="col"
                                            style={{
                                                textAlign: 'left',
                                                padding: '1.5rem 2rem',
                                                fontFamily: MONT,
                                                fontSize: '1.05rem',
                                                fontWeight: 800,
                                                letterSpacing: '-0.01em',
                                                borderBottom: `2px solid rgba(46,42,38,0.2)`,
                                                backgroundColor: i === 0 ? 'rgba(46,42,38,0.05)' : 'transparent'
                                            }}
                                        >
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARISON_ROWS.map((row) => (
                                    <tr key={row.label}>
                                        <th scope="row" style={{ textAlign: 'left', padding: '1.5rem 2rem', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55, borderBottom: `1px solid rgba(46,42,38,0.12)`, verticalAlign: 'top' }}>
                                            {row.label}
                                        </th>
                                        {row.cells.map((cell, ci) => (
                                            <td
                                                key={ci}
                                                style={{
                                                    padding: '1.5rem 2rem',
                                                    fontSize: '0.98rem',
                                                    lineHeight: 1.6,
                                                    verticalAlign: 'top',
                                                    borderBottom: `1px solid rgba(46,42,38,0.12)`,
                                                    backgroundColor: ci === 0 ? 'rgba(46,42,38,0.05)' : 'transparent',
                                                    fontWeight: ci === row.winner ? 600 : 400,
                                                    opacity: ci === row.winner ? 1 : 0.7
                                                }}
                                            >
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.6 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ fontFamily: INTER, fontSize: '0.95rem', lineHeight: 1.7, marginTop: '2rem', maxWidth: '760px' }}
                    >
                        There is a point where this stops being the right answer. Engineering becomes
                        the product, the team goes past roughly twenty-five people, and you need someone
                        in every room. Hire then. We will help you do it.
                    </motion.p>
                </div>
            </section>

            {/* H2 5 — cost. No figures, by design: what drives the number instead. */}
            <section id="fractional-cto-cost-india" style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '3.5rem', maxWidth: '820px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Cost</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: MONT,
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            How Much Does a Fractional CTO Cost in India?
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.85, lineHeight: 1.8, fontSize: '1.15rem', marginTop: '2rem', fontWeight: 500 }}>
                            We do not publish a rate. A firm quoting you before it has seen your stack is
                            quoting an average, and you are not an average — a two-engineer startup wanting
                            architecture direction and a fourteen-engineer company with a broken release
                            process are not the same engagement, and pricing them the same is how one of
                            them gets overcharged.
                        </motion.p>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.78, lineHeight: 1.8, fontSize: '1.1rem', marginTop: '1.5rem' }}>
                            Five things move the number. We walk you through all five on the first call,
                            and you get the scope in writing before anything is signed.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gap: '0' }}>
                        {[
                            { k: 'Team size you are leading', v: 'Two engineers and a contractor is a different week from fourteen engineers across three squads.' },
                            { k: 'Existing codebase or blank page', v: 'Inheriting someone else’s architecture costs time before it costs anything else. Greenfield is cheaper to lead, harder to get right.' },
                            { k: 'Depth of involvement', v: 'Advisory and architecture sign-off sits at one end. Running delivery, hiring and board reporting sits at the other.' },
                            { k: 'Whether AI is in the mandate', v: 'Readiness assessment, use-case selection and oversight of the build is real scope, not a line item you bolt on.' },
                            { k: 'Due diligence windows', v: 'Buy-side or sell-side diligence is compressed, deadline-bound work. It is usually priced as a fixed project rather than folded into a retainer.' }
                        ].map((row, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-5%" }}
                                transition={{ delay: i * 0.07, duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    gap: isMobile ? '0.5rem' : '3rem',
                                    alignItems: isMobile ? 'flex-start' : 'baseline',
                                    padding: '1.75rem 0',
                                    borderBottom: `1px solid rgba(232,223,211,0.12)`
                                }}
                            >
                                <p style={{ fontFamily: INTER, fontSize: '1.05rem', lineHeight: 1.6, margin: 0, flex: '0 0 auto', width: isMobile ? '100%' : '280px', fontWeight: 700 }}>
                                    {row.k}
                                </p>
                                <p style={{ fontFamily: INTER, fontSize: '1.05rem', lineHeight: 1.6, margin: 0, flex: 1, opacity: 0.72 }}>
                                    {row.v}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ fontFamily: INTER, fontSize: '1.1rem', lineHeight: 1.8, marginTop: '3rem', maxWidth: '780px', opacity: 0.85 }}
                    >
                        Set against a full-time hire it is not close. Executive salary, equity, the
                        recruiter, the notice period, and the months before they are useful — a retainer
                        sits at a fraction of that, and it ends when you stop needing it. Retainers or
                        fixed-scope projects. Never per-seat, and no charge for hiring four more people.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ fontFamily: INTER, fontSize: '1.1rem', lineHeight: 1.8, marginTop: '1.75rem', maxWidth: '780px', opacity: 0.8 }}
                    >
                        The India comparison is the one worth doing carefully. A CTO-grade hire in Mumbai
                        or Bengaluru is competing with funded startups and with the salaries that
                        product companies pay, and the search runs for months before anyone says yes.
                        Most of the companies that call us do not lose that race on money. They lose it
                        because they cannot yet offer the scope a CTO wants to run.
                    </motion.p>
                </div>
            </section>

            {/* H2 6 — process */}
            <section id="how-the-engagement-works" style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ textAlign: 'center', marginBottom: '6rem' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>Assessment To Handover</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: MONT,
                            fontSize: 'clamp(2.1rem, 4.2vw, 3.5rem)',
                            fontWeight: 800,
                            marginTop: '1.5rem',
                            textTransform: 'uppercase'
                        }}>
                            How Our Engagement Works
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.12rem', marginTop: '2rem', maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto' }}>
                            We are based in Mumbai and the work is remote-first, so where you are
                            matters less than it sounds like it should. Around Mumbai, Navi Mumbai and
                            Pune we are in the room for the things that need a room — board sessions, a
                            shop floor, the interviews. Everywhere else in India that runs over video and
                            loses nothing. We also take engagements outside India — the US, UK, UAE,
                            Singapore and Australia — where the overlap is workable. The IST day covers
                            a European morning and a US evening, which is usually enough. If your team is
                            entirely in California, say so on the first call and we will tell you honestly
                            whether the handover cost is worth it.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem' }}>
                        {[
                            { step: '01', title: 'Assessment', desc: 'Two weeks. Architecture, team, delivery process, and the thing everyone knows is broken but nobody wrote down. Ends in a written report with risks ranked by what they cost you. Yours to keep, retainer or not.' },
                            { step: '02', title: 'Strategy', desc: 'A 90-day roadmap with sequencing and named owners, plus the list of things we are telling you not to do. That second list is usually where the argument happens. Better now than in month five.' },
                            { step: '03', title: 'Lead', desc: 'We take the seat. Architecture calls, sprint direction with your lead, hiring decisions, vendor negotiations, a monthly written board update. One named person, same one every month.' },
                            { step: '04', title: 'Execute', desc: 'Oversight of what actually ships — reviewing releases, unblocking engineers, writing the first AI pipeline so the pattern is set correctly. Your team builds it. We are accountable for whether it works.' },
                            { step: '05', title: 'Hand over', desc: 'When a full-time CTO makes sense, we write the scorecard, run the technical interviews, and hand across documented decisions instead of folklore. Planning that exit is part of the job.' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-10%" }}
                                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.8, ease: [0.23, 1, 0.32, 1] as const } } }}
                                style={{ borderTop: `2px solid ${SAND}`, paddingTop: '2rem' }}
                            >
                                <span style={{ fontFamily: MONT, fontSize: '2.5rem', fontWeight: 800, opacity: 0.3 }}>{item.step}</span>
                                <h3 style={{ fontFamily: MONT, fontSize: '1.5rem', fontWeight: 700, margin: '1rem 0' }}>{item.title}</h3>
                                <p style={{ fontFamily: INTER, opacity: 0.7, lineHeight: 1.6 }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Niche section — MSME manufacturing + AI. Nobody else competing for
                this cluster, and it links the page into the ERP/automation set. */}
            <section id="fractional-cto-for-manufacturers" className="product-theme-trigger" data-theme="light" style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '12rem 8%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse', alignItems: 'center', gap: isMobile ? '4rem' : '7rem' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }}
                        style={{ flex: 1, position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '24px', overflow: 'hidden' }}
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"
                            alt="Fractional CTO for MSME manufacturers adopting AI and automation on the shop floor"
                            fill
                            sizes="(max-width: 900px) 100vw, 50vw"
                            loading="lazy"
                            quality={70}
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
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>The Niche We Actually Own</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: MONT,
                            fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                            fontWeight: 800,
                            lineHeight: 1.05,
                            textTransform: 'uppercase',
                            marginBottom: '2.5rem',
                            letterSpacing: '-0.02em'
                        }}>
                            Fractional CTO for MSME Manufacturers Adopting AI
                        </motion.h2>

                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.85, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '1.5rem', fontWeight: 500 }}>
                            Manufacturing gets its own version of this problem. The ERP was bought years
                            ago, the shop floor has quietly built workarounds for every part of it that
                            never fitted, and nobody senior enough to fix that is technical.
                        </motion.p>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.12rem', marginBottom: '1.5rem' }}>
                            So the first question is never which model to use. It is whether the
                            production data you are capturing is trustworthy enough to automate against.
                            Usually — and this is the part nobody enjoys hearing — it is not. Not yet.
                            Fixing that is unglamorous and it is the entire foundation, and skipping it is
                            how MSMEs end up with an AI pilot that technically works and nobody trusts.
                        </motion.p>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.12rem', marginBottom: '2.5rem' }}>
                            After that it gets straightforward. Quality inspection, demand forecasting,
                            maintenance scheduling, document processing for the GST paperwork. Real
                            use cases, in the order they repay the effort.
                        </motion.p>

                        <motion.ul variants={staggerContainer} style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {[
                                <>Data readiness before models — what the shop floor is actually recording</>,
                                <>Vendor scoring, so three identical demos stop being three identical demos</>,
                                <>Whether to extend the <Link href="/manufacturing-erp" style={inlineLink}>existing ERP</Link> or replace it</>,
                                <>A sequenced automation plan, built with our <Link href="/ai-automation-agency" style={inlineLink}>automation team</Link></>,
                                <>Subsidy and compliance implications written in plain language for the board</>
                            ].map((item, i) => (
                                <motion.li key={i} variants={fadeInUp} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', fontFamily: INTER, fontSize: '1.05rem', lineHeight: 1.6 }}>
                                    <div style={{ width: '10px', height: '10px', backgroundColor: DARK, borderRadius: '50%', flexShrink: 0, marginTop: '0.5rem' }} />
                                    <span>{item}</span>
                                </motion.li>
                            ))}
                        </motion.ul>

                        <motion.div variants={fadeInUp} style={{ marginTop: '3rem' }}>
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
                    </motion.div>
                </div>
            </section>

            {/* H2 7 — FAQ */}
            <section id="faq" style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
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
                            fontFamily: MONT,
                            fontSize: 'clamp(2.1rem, 4.2vw, 3.5rem)',
                            fontWeight: 800,
                            marginTop: '1.5rem',
                            textTransform: 'uppercase'
                        }}>
                            Frequently Asked Questions
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
                                    transition={{ duration: 0.5, delay: i * 0.04 }}
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
                                        <h3 style={{ fontFamily: MONT, fontSize: isMobile ? '1.1rem' : '1.35rem', fontWeight: 700, margin: 0, lineHeight: 1.3 }}>{item.question}</h3>
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
            <section id="book-a-call" style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '4rem 5% 6rem' : '4rem 8% 10rem', textAlign: 'center' }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    variants={staggerContainer}
                    style={{ maxWidth: '900px', margin: '0 auto' }}
                >
                    <motion.h2 variants={fadeInUp} style={{
                        fontFamily: MONT,
                        fontSize: 'clamp(2.1rem, 4.2vw, 3.75rem)',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        lineHeight: 1.05,
                        marginBottom: '2rem'
                    }}>
                        Tell Us the Decision You Keep Postponing
                    </motion.h2>
                    <motion.p variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '1.2rem', opacity: 0.8, lineHeight: 1.7, maxWidth: '740px', margin: '0 auto' }}>
                        No deck needed. One hour, an honest account of what your technology is doing to
                        your week, and we will tell you whether a fractional CTO is even the right answer.
                        Sometimes it is a hiring problem wearing a strategy costume, and we will say that
                        too.
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
                        heading="Book a CTO assessment call"
                        submitLabel="Book Free CTO Consultation"
                        onClose={closeContact}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
