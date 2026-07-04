'use client'

import { useRef, useState, useEffect, Children } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Factory,
    Dumbbell,
    Stethoscope,
    ShoppingBag,
    Truck,
    Building2,
    UtensilsCrossed,
    GraduationCap,
    TrendingUp,
    TrendingDown,
} from 'lucide-react'
import Footer from '../components/Footer'
import LandingHeader from '../components/LandingHeader'
import { useLenis } from '../lib/useLenis'
import { fadeUp, stagger } from '../lib/variants'
import { DARK, SAND, MID_DARK, INTER } from '../lib/constants'

/** Challenges shown in the "Problems that we solve" section. */
const CHALLENGES = [
    {
        id: 'crm',
        n: '01',
        title: 'Customers slipping through the cracks',
        teaser: 'Leads, follow-ups and client history scattered across inboxes.',
        detail:
            'Without a real system, leads go cold, follow-ups get forgotten, and every salesperson keeps their own version of the truth in a personal spreadsheet. You can’t see your pipeline, forecast revenue, or know which deals actually need attention.',
        solution:
            'We build a tailored CRM around how your team actually sells — centralising every contact, deal and interaction, with automated reminders and clear pipeline visibility so nothing falls through the cracks.',
    },
    {
        id: 'erp',
        n: '02',
        title: 'Operations running on disconnected tools',
        teaser: 'Inventory, finance and orders living in separate systems.',
        detail:
            'Inventory says one thing, accounting says another, and orders are reconciled by hand at the end of every month. Disconnected tools mean duplicated work, costly errors, and no single view of how the business is really doing.',
        solution:
            'We design a custom ERP that unifies inventory, orders, finance and reporting into one source of truth — so every department works from the same live data and decisions stop being guesswork.',
    },
    {
        id: 'automation',
        n: '03',
        title: 'Manual work that doesn’t scale',
        teaser: 'Repetitive admin and copy-paste eating your team’s day.',
        detail:
            'Your team spends hours on repetitive tasks — moving data between apps, generating documents, chasing approvals. It works at small volume, but every new customer adds more manual overhead instead of more output.',
        solution:
            'We map the repetitive workflows and replace them with automation and AI agents — handling the busywork end-to-end and flagging only the exceptions, so growth no longer means hiring another team to keep up.',
    },
] as const

/** Solution offerings shown in the "Solutions" section. */
const SOLUTIONS = [
    {
        id: 'crm',
        title: 'CRM',
        desc: 'Custom CRMs that centralise every lead, deal and client interaction — with automated follow-ups and clear pipeline visibility.',
    },
    {
        id: 'erp',
        title: 'ERP',
        desc: 'Tailored ERP systems unifying inventory, orders, finance and reporting into one reliable source of truth.',
    },
    {
        id: 'automation',
        title: 'Automation',
        desc: 'AI-powered automation that takes repetitive workflows off your team’s plate so the business scales without the overhead.',
    },
] as const

/** Industries shown in the "Industries we serve" section. */
const INDUSTRIES = [
    {
        id: 'manufacturing',
        Icon: Factory,
        title: 'Manufacturing',
        desc: 'Production tracking, inventory and quality control unified into one live system.',
    },
    {
        id: 'gym',
        Icon: Dumbbell,
        title: 'Gym & Fitness',
        desc: 'Membership, bookings and billing automated so members stay engaged and retained.',
    },
    {
        id: 'healthcare',
        Icon: Stethoscope,
        title: 'Healthcare',
        desc: 'Patient records, appointments and follow-ups managed securely in one place.',
    },
    {
        id: 'retail',
        Icon: ShoppingBag,
        title: 'Retail & E-commerce',
        desc: 'Orders, stock and customers synced across every channel in real time.',
    },
    {
        id: 'logistics',
        Icon: Truck,
        title: 'Logistics',
        desc: 'Fleet, routes and deliveries tracked end-to-end with automated dispatch.',
    },
    {
        id: 'realestate',
        Icon: Building2,
        title: 'Real Estate',
        desc: 'Listings, leads and contracts organised with automated client follow-ups.',
    },
    {
        id: 'hospitality',
        Icon: UtensilsCrossed,
        title: 'Hospitality',
        desc: 'Reservations, orders and staff scheduling handled from a single dashboard.',
    },
    {
        id: 'education',
        Icon: GraduationCap,
        title: 'Education',
        desc: 'Enrolments, courses and student progress tracked without the manual admin.',
    },
] as const

/** Accent colours for the Results dashboard. */
const NEG = '#c96a5a' // "without us" — muted red
const POS = '#6fae8f' // "with us"    — muted green

/** Headline KPI tiles at the top of the dashboard. */
const KPIS = [
    { label: 'Less manual work', value: '76%', trend: 'down' as const },
    { label: 'Faster operations', value: '3.4×', trend: 'up' as const },
    { label: 'Revenue growth', value: '+32%', trend: 'up' as const },
    { label: 'Customer retention', value: '89%', trend: 'up' as const },
]

/**
 * Before/after comparison rows. `withoutPct` / `withPct` drive the bar widths
 * (0–100) and are decoupled from the display labels so each row scales nicely.
 */
const METRICS = [
    {
        label: 'Customer retention',
        withoutLabel: '61%',
        withLabel: '89%',
        withoutPct: 61,
        withPct: 89,
        delta: '+28 pts',
    },
    {
        label: 'Monthly revenue growth',
        withoutLabel: '+3%',
        withLabel: '+27%',
        withoutPct: 14,
        withPct: 88,
        delta: '9× faster',
    },
    {
        label: 'Manual admin work',
        withoutLabel: '38 hrs / week',
        withLabel: '9 hrs / week',
        withoutPct: 85,
        withPct: 22,
        delta: '−76%',
    },
    {
        label: 'Lead response time',
        withoutLabel: '6 hours',
        withLabel: '5 minutes',
        withoutPct: 95,
        withPct: 6,
        delta: '−98%',
    },
] as const

/**
 * Standalone /home landing page.
 *
 * Header: "Projects" (left) · "Nexona" wordmark (center) · "Contact us" (right)
 * Hero:   slightly-right text block with headline, sub-paragraph and CTA,
 *         a floating, mouse-reactive tech.png on the left.
 *
 * Smooth scroll via Lenis; entrance + ambient animations via Framer Motion.
 */
export default function HomePage() {
    useLenis()

    // Swap the card grids for an auto-advancing carousel on mobile.
    const isMobile = useIsMobile()

    // "The difference we make" — toggle between the without/with-us states and
    // reveal the bars once the panel scrolls into view.
    const [impactMode, setImpactMode] = useState<'without' | 'with'>('without')
    const [impactRevealed, setImpactRevealed] = useState(false)

    // Mouse-reactive parallax for the hero artwork.
    const [tilt, setTilt] = useState({ x: 0, y: 0 })
    const frame = useRef<number | null>(null)

    // Currently opened challenge overlay (null = closed).
    const [active, setActive] = useState<(typeof CHALLENGES)[number] | null>(null)

    // Contact overlay open/closed.
    const [contactOpen, setContactOpen] = useState(false)

    // Lock body scroll + close on Escape while any overlay is open.
    useEffect(() => {
        if (!active && !contactOpen) return
        document.body.style.overflow = 'hidden'
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return
            setActive(null)
            setContactOpen(false)
        }
        window.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', onKey)
        }
    }, [active, contactOpen])

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (frame.current) return
            frame.current = requestAnimationFrame(() => {
                frame.current = null
                const x = (e.clientX / window.innerWidth - 0.5) * 2
                const y = (e.clientY / window.innerHeight - 0.5) * 2
                setTilt({ x, y })
            })
        }
        window.addEventListener('mousemove', onMove, { passive: true })
        return () => {
            window.removeEventListener('mousemove', onMove)
            if (frame.current) cancelAnimationFrame(frame.current)
        }
    }, [])

    return (
        <main
            style={{
                minHeight: '100vh',
                backgroundColor: DARK,
                color: SAND,
                fontFamily: 'var(--font-montserrat), sans-serif',
                overflowX: 'hidden',
            }}
        >
            {/* ───────────────────────── Header ───────────────────────── */}
            <LandingHeader theme="dark" onContactClick={() => setContactOpen(true)} />

            {/* ───────────────────────── Hero ───────────────────────── */}
            <section
                style={{
                    position: 'relative',
                    minHeight: 'calc(100vh - 6rem)',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    alignItems: 'center',
                    gap: '2rem',
                    padding: '2rem clamp(1.5rem, 6vw, 6rem)',
                }}
                className="hero-grid"
            >
                {/* Ambient glow */}
                <div
                    aria-hidden
                    style={{
                        position: 'absolute',
                        top: '20%',
                        left: '10%',
                        width: '40vw',
                        height: '40vw',
                        maxWidth: 520,
                        maxHeight: 520,
                        background:
                            'radial-gradient(circle, rgba(232,223,211,0.10) 0%, rgba(232,223,211,0) 70%)',
                        filter: 'blur(20px)',
                        pointerEvents: 'none',
                    }}
                />

                {/* Left — floating, mouse-reactive artwork */}
                <motion.div
                    initial={{ opacity: 0, x: -60, scale: 0.92 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    className="hero-art"
                    style={{
                        position: 'relative',
                        justifySelf: 'center',
                        width: '100%',
                        maxWidth: 620,
                        aspectRatio: '1 / 1',
                    }}
                >
                    <motion.div
                        animate={{ y: [0, -18, 0] }}
                        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            transform: `translate3d(${tilt.x * 18}px, ${tilt.y * 18}px, 0) rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 6}deg)`,
                            transition: 'transform 0.25s ease-out',
                            willChange: 'transform',
                        }}
                    >
                        <Image
                            src="/tech.png"
                            alt="Custom software and AI solutions"
                            fill
                            priority
                            quality={100}
                            unoptimized
                            sizes="(max-width: 900px) 80vw, 40vw"
                            style={{ objectFit: 'contain' }}
                        />
                    </motion.div>
                </motion.div>

                {/* Right - copy block (slightly right of center) */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="hero-copy"
                    style={{
                        position: 'relative',
                        maxWidth: 560,
                        justifySelf: 'start',
                        paddingLeft: 'clamp(0px, 4vw, 64px)',
                    }}
                >
                    <motion.h1
                        variants={fadeUp}
                        style={{
                            fontFamily: 'var(--font-montserrat), sans-serif',
                            fontWeight: 800,
                            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                            lineHeight: 1.05,
                            letterSpacing: '0.01em',
                            margin: 0,
                        }}
                    >
                        Custom Software and AI solutions
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        custom={0.12}
                        style={{
                            marginTop: '1.5rem',
                            fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                            lineHeight: 1.65,
                            letterSpacing: '0.03em',
                            color: 'rgba(232,223,211,0.78)',
                            maxWidth: 480,
                        }}
                    >
                        We help businesses outsource Software, AI to help them with SOPs,
                        Enterprise Management systems, and process/AI automation
                    </motion.p>

                    <motion.div variants={fadeUp} custom={0.24} style={{ marginTop: '2.5rem' }}>
                        <Link href="/#contact" className="cta-btn" style={ctaStyle}>
                            Get a Free Quote
                            <span className="cta-arrow" style={{ display: 'inline-block' }}>
                                →
                            </span>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* ──────────────── Problems that we solve (light) ──────────────── */}
            <section
                style={{
                    position: 'relative',
                    backgroundColor: SAND,
                    color: DARK,
                    padding: 'clamp(4rem, 8vw, 7rem) clamp(1rem, 4vw, 3rem) clamp(2rem, 4vw, 3rem)',
                }}
            >
                <motion.h2
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    style={{
                        fontFamily: 'var(--font-montserrat), sans-serif',
                        fontWeight: 800,
                        fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                        lineHeight: 1.08,
                        letterSpacing: '-0.01em',
                        margin: 0,
                        maxWidth: 720,
                    }}
                >
                    Problems that we solve
                </motion.h2>

                {isMobile ? (
                    <MobileCarousel>
                        {CHALLENGES.map((c) => (
                            <ChallengeCard key={c.id} c={c} compact onClick={() => setActive(c)} />
                        ))}
                    </MobileCarousel>
                ) : (
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="challenge-grid"
                        style={{
                            marginTop: 'clamp(2.5rem, 5vw, 4rem)',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '1.5rem',
                        }}
                    >
                        {CHALLENGES.map((c) => (
                            <ChallengeCard key={c.id} c={c} onClick={() => setActive(c)} />
                        ))}
                    </motion.div>
                )}
            </section>

            {/* ──────────────── Solutions (light) ──────────────── */}
            <section
                style={{
                    position: 'relative',
                    backgroundColor: SAND,
                    color: DARK,
                    padding: '0 clamp(1rem, 4vw, 3rem) clamp(4rem, 8vw, 7rem)',
                }}
            >
                <motion.h2
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    style={{
                        fontFamily: 'var(--font-montserrat), sans-serif',
                        fontWeight: 800,
                        fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                        lineHeight: 1.08,
                        letterSpacing: '-0.01em',
                        margin: 0,
                    }}
                >
                    Solutions
                </motion.h2>

                {isMobile ? (
                    <MobileCarousel>
                        {SOLUTIONS.map((s, i) => (
                            <SolutionCard key={s.id} s={s} i={i} compact />
                        ))}
                    </MobileCarousel>
                ) : (
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="challenge-grid"
                        style={{
                            marginTop: 'clamp(2.5rem, 5vw, 4rem)',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '1.5rem',
                        }}
                    >
                        {SOLUTIONS.map((s, i) => (
                            <SolutionCard key={s.id} s={s} i={i} />
                        ))}
                    </motion.div>
                )}
            </section>

            {/* ──────────────── Industries we serve (dark) ──────────────── */}
            <section
                style={{
                    position: 'relative',
                    backgroundColor: DARK,
                    color: SAND,
                    padding: 'clamp(4rem, 8vw, 7rem) clamp(1rem, 4vw, 3rem)',
                }}
            >
                <motion.h2
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    style={{
                        fontFamily: 'var(--font-montserrat), sans-serif',
                        fontWeight: 800,
                        fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                        lineHeight: 1.08,
                        letterSpacing: '-0.01em',
                        margin: 0,
                    }}
                >
                    Industries we serve
                </motion.h2>

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className="industry-grid"
                    style={{
                        marginTop: 'clamp(2.5rem, 5vw, 4rem)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1.25rem',
                    }}
                >
                    {INDUSTRIES.map((ind) => (
                        <IndustryCard key={ind.id} ind={ind} />
                    ))}
                </motion.div>
            </section>

            {/* ──────────────── Results & impact (dashboard) ──────────────── */}
            <section
                style={{
                    position: 'relative',
                    backgroundColor: SAND,
                    color: DARK,
                    padding: 'clamp(4rem, 8vw, 7rem) clamp(1rem, 4vw, 3rem)',
                }}
            >
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    style={{ maxWidth: 720 }}
                >
                    <span style={{
                        fontFamily: INTER,
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        opacity: 0.5,
                    }}>
                        Results & impact
                    </span>
                    <h2 style={{
                        fontFamily: 'var(--font-montserrat), sans-serif',
                        fontWeight: 800,
                        fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                        lineHeight: 1.08,
                        letterSpacing: '-0.01em',
                        margin: '0.75rem 0 0',
                    }}>
                        The difference we make
                    </h2>
                    <p style={{
                        marginTop: '1rem',
                        fontSize: 'clamp(1rem, 1.4vw, 1.1rem)',
                        lineHeight: 1.6,
                        opacity: 0.72,
                    }}>
                        A side-by-side look at how businesses perform before and after working
                        with us — less busywork, faster operations, and numbers that move.
                    </p>
                </motion.div>

                {/* Dashboard panel */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    onViewportEnter={() => setImpactRevealed(true)}
                    style={{
                        marginTop: 'clamp(2.5rem, 5vw, 3.5rem)',
                        backgroundColor: DARK,
                        color: SAND,
                        borderRadius: '1.5rem',
                        padding: 'clamp(1.25rem, 3vw, 2.25rem)',
                        boxShadow: `10px 10px 0 rgba(46,42,38,0.25)`,
                        border: `2px solid ${DARK}`,
                    }}
                >
                    {/* Window chrome */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto 1fr',
                        alignItems: 'center',
                        gap: '0.9rem',
                        paddingBottom: '1.25rem',
                        marginBottom: '1.75rem',
                        borderBottom: '1px solid rgba(232,226,218,0.14)',
                    }}>
                        <span style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                            {[NEG, '#d9a25a', POS].map((c) => (
                                <span key={c} style={{ width: 11, height: 11, borderRadius: 999, backgroundColor: c, opacity: 0.85 }} />
                            ))}
                        </span>
                        <div style={{ justifySelf: 'center' }}>
                            <ImpactToggle mode={impactMode} onChange={setImpactMode} />
                        </div>
                        <span aria-hidden />
                    </div>

                    {/* KPI tiles */}
                    <div className="kpi-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1rem',
                        marginBottom: '2rem',
                    }}>
                        {KPIS.map((k) => (
                            <div key={k.label} style={{
                                backgroundColor: MID_DARK,
                                borderRadius: '1rem',
                                padding: '1.25rem 1.35rem',
                            }}>
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    fontFamily: INTER,
                                    fontSize: '0.72rem',
                                    letterSpacing: '0.06em',
                                    textTransform: 'uppercase',
                                    opacity: 0.6,
                                }}>
                                    {k.trend === 'up'
                                        ? <TrendingUp size={14} color={POS} />
                                        : <TrendingDown size={14} color={POS} />}
                                    {k.label}
                                </span>
                                <div style={{
                                    fontFamily: 'var(--font-montserrat), sans-serif',
                                    fontWeight: 800,
                                    fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
                                    lineHeight: 1.1,
                                    marginTop: '0.6rem',
                                }}>
                                    {k.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Comparison bars — single bar per metric, driven by the toggle */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {METRICS.map((m) => (
                            <MetricRow key={m.label} m={m} mode={impactMode} revealed={impactRevealed} />
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ──────────────── Contact overlay ──────────────── */}
            <AnimatePresence>
                {contactOpen && <ContactOverlay onClose={() => setContactOpen(false)} />}
            </AnimatePresence>

            {/* ──────────────── Challenge detail overlay ──────────────── */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setActive(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 120,
                            backgroundColor: 'rgba(46,42,38,0.55)',
                            backdropFilter: 'blur(6px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1.5rem',
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, scale: 0.97 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                            style={{
                                position: 'relative',
                                width: '100%',
                                maxWidth: 620,
                                maxHeight: '85vh',
                                overflowY: 'auto',
                                backgroundColor: SAND,
                                color: DARK,
                                borderRadius: '1.25rem',
                                padding: 'clamp(2rem, 5vw, 3.25rem)',
                                boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
                            }}
                        >
                            <button
                                onClick={() => setActive(null)}
                                aria-label="Close"
                                className="overlay-close"
                            >
                                ✕
                            </button>

                            <span
                                style={{
                                    fontFamily: INTER,
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    letterSpacing: '0.1em',
                                    opacity: 0.5,
                                }}
                            >
                                CHALLENGE {active.n}
                            </span>

                            <h3
                                style={{
                                    fontFamily: 'var(--font-montserrat), sans-serif',
                                    fontWeight: 800,
                                    fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)',
                                    lineHeight: 1.1,
                                    margin: '0.75rem 0 1.5rem',
                                }}
                            >
                                {active.title}
                            </h3>

                            <p style={{ fontSize: '1rem', lineHeight: 1.7, margin: 0, opacity: 0.85 }}>
                                {active.detail}
                            </p>

                            <div
                                style={{
                                    marginTop: '2rem',
                                    paddingTop: '1.75rem',
                                    borderTop: '1px solid rgba(46,42,38,0.15)',
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: INTER,
                                        fontWeight: 700,
                                        fontSize: '0.8rem',
                                        letterSpacing: '0.1em',
                                        opacity: 0.5,
                                    }}
                                >
                                    HOW WE SOLVE IT
                                </span>
                                <p
                                    style={{
                                        fontSize: '1.05rem',
                                        lineHeight: 1.7,
                                        margin: '0.75rem 0 0',
                                        fontWeight: 500,
                                    }}
                                >
                                    {active.solution}
                                </p>
                            </div>

                            <div style={{ marginTop: '2.25rem' }}>
                                <Link
                                    href="/#contact"
                                    onClick={() => setActive(null)}
                                    className="cta-btn"
                                    style={{ ...ctaStyle, backgroundColor: DARK, color: SAND }}
                                >
                                    Get a Free Quote
                                    <span className="cta-arrow" style={{ display: 'inline-block' }}>
                                        →
                                    </span>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ───────────────────────── Footer ───────────────────────── */}
            <Footer />

            {/* Responsive + hover styles */}
            <style jsx>{`
                .cta-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.6rem;
                    box-shadow: 6px 6px 0 ${DARK};
                    transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease, color 0.25s ease;
                }
                .cta-btn:hover {
                    transform: translateY(-4px);
                    background-color: ${DARK} !important;
                    color: ${SAND} !important;
                    box-shadow: none;
                }
                .cta-btn:hover :global(.cta-arrow) {
                    transform: translateX(4px);
                }
                :global(.cta-arrow) {
                    transition: transform 0.25s ease;
                }

                /* Overlay close button */
                :global(.overlay-close) {
                    position: absolute;
                    top: 1.1rem;
                    right: 1.1rem;
                    width: 38px;
                    height: 38px;
                    border-radius: 999px;
                    border: 1px solid rgba(46, 42, 38, 0.2);
                    background: transparent;
                    color: ${DARK};
                    font-size: 0.9rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.25s ease, transform 0.25s ease;
                }
                :global(.overlay-close:hover) {
                    background-color: rgba(46, 42, 38, 0.08);
                    transform: rotate(90deg);
                }

                @media (max-width: 900px) {
                    .hero-grid {
                        grid-template-columns: 1fr !important;
                        text-align: center;
                        gap: 1rem !important;
                        padding-top: 1rem !important;
                    }
                    .hero-art {
                        max-width: 340px !important;
                    }
                    .hero-copy {
                        justify-self: center !important;
                        padding-left: 0 !important;
                    }
                    .hero-copy :global(p) {
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .industry-grid {
                        grid-template-columns: 1fr 1fr !important;
                    }
                    .kpi-grid {
                        grid-template-columns: 1fr 1fr !important;
                    }
                    /* On touch, surface "Show more" without hover */
                    .challenge-more {
                        opacity: 0.7;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </main>
    )
}

const ctaStyle: React.CSSProperties = {
    backgroundColor: SAND,
    color: DARK,
    fontWeight: 600,
    fontSize: '0.95rem',
    letterSpacing: '0.02em',
    padding: '0.95rem 1.8rem',
    borderRadius: '999px',
    textDecoration: 'none',
    fontFamily: INTER,
}

/** True while the viewport is at/below the mobile breakpoint. */
function useIsMobile(query = '(max-width: 900px)') {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const mq = window.matchMedia(query)
        const update = () => setIsMobile(mq.matches)
        update()
        mq.addEventListener('change', update)
        return () => mq.removeEventListener('change', update)
    }, [query])
    return isMobile
}

/**
 * Mobile carousel: shows one child at a time full-width and auto-advances every
 * 5s — the current slide moves left while the next slides in from the right.
 * A cloned first slide appended to the track makes the wrap seamless.
 */
function MobileCarousel({ children }: { children: React.ReactNode }) {
    const slides = Children.toArray(children)
    const count = slides.length
    const [index, setIndex] = useState(0)
    const [animate, setAnimate] = useState(true)

    // Auto-advance.
    useEffect(() => {
        if (count <= 1) return
        const id = setInterval(() => setIndex((i) => i + 1), 5000)
        return () => clearInterval(id)
    }, [count])

    // After sliding onto the cloned first slide, snap back to the real first
    // slide with the transition disabled, then re-enable it next frame.
    useEffect(() => {
        if (animate) return
        const r = requestAnimationFrame(() =>
            requestAnimationFrame(() => setAnimate(true))
        )
        return () => cancelAnimationFrame(r)
    }, [animate])

    const onTransitionEnd = () => {
        if (index === count) {
            setAnimate(false)
            setIndex(0)
        }
    }

    const display = count > 1 ? [...slides, slides[0]] : slides

    return (
        <div style={{ overflow: 'hidden', marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <div
                onTransitionEnd={onTransitionEnd}
                style={{
                    display: 'flex',
                    transform: `translateX(-${index * 100}%)`,
                    transition: animate
                        ? 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
                        : 'none',
                }}
            >
                {display.map((slide, i) => (
                    <div
                        key={i}
                        style={{
                            flex: '0 0 100%',
                            minWidth: '100%',
                            boxSizing: 'border-box',
                            padding: '4px 10px 18px',
                        }}
                    >
                        {slide}
                    </div>
                ))}
            </div>
        </div>
    )
}

function ChallengeCard({
    c,
    onClick,
    compact = false,
}: {
    c: (typeof CHALLENGES)[number]
    onClick: () => void
    compact?: boolean
}) {
    const [hovered, setHovered] = useState(false)
    return (
        <motion.button
            variants={fadeUp}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                minHeight: compact ? 'auto' : 280,
                textAlign: 'left',
                cursor: 'pointer',
                backgroundColor: hovered ? DARK : SAND,
                color: hovered ? SAND : DARK,
                border: `2px solid ${DARK}`,
                borderRadius: '1.5rem',
                padding: compact ? '1.6rem 1.5rem' : '2rem 1.75rem',
                fontFamily: 'var(--font-montserrat), sans-serif',
                boxShadow: hovered ? 'none' : `6px 6px 0 ${DARK}`,
                transform: hovered ? 'translateY(-4px)' : 'none',
                transition: 'background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
            }}
        >
            <span style={{ fontFamily: INTER, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.45 }}>
                {c.n}
            </span>
            <h3 style={{ fontWeight: 800, fontSize: '1.3rem', lineHeight: 1.25, margin: '1rem 0 0.75rem' }}>
                {c.title}
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, margin: 0, opacity: 0.7 }}>
                {c.teaser}
            </p>
            <span style={{
                marginTop: 'auto',
                paddingTop: '1.5rem',
                display: compact ? 'none' : 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: INTER,
                fontWeight: 600,
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
            }}>
                Show more →
            </span>
        </motion.button>
    )
}

/**
 * Contact overlay — name / email / phone / requirement, posted to /api/contact
 * (same SMTP endpoint as the #contact section on the landing page).
 */
function ContactOverlay({ onClose }: { onClose: () => void }) {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/
        if (!phoneRegex.test(form.phone)) {
            setStatus('error')
            setErrorMessage('Please enter a valid phone number.')
            return
        }

        setStatus('loading')
        setErrorMessage('')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            if (res.ok) {
                setStatus('success')
                setForm({ name: '', email: '', phone: '', message: '' })
            } else if (res.status === 422) {
                setStatus('error')
                setErrorMessage('Please check your information and try again.')
            } else {
                setStatus('error')
                setErrorMessage('Something went wrong. Please try again later.')
            }
        } catch {
            setStatus('error')
            setErrorMessage('Network error. Please try again later.')
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 130,
                backgroundColor: 'rgba(46,42,38,0.55)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Contact us"
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 520,
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    backgroundColor: SAND,
                    color: DARK,
                    borderRadius: '1.25rem',
                    padding: 'clamp(2rem, 5vw, 3rem)',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
                    fontFamily: 'var(--font-montserrat), sans-serif',
                }}
            >
                <button onClick={onClose} aria-label="Close" className="overlay-close">
                    ✕
                </button>

                <span style={{
                    fontFamily: INTER,
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    opacity: 0.5,
                }}>
                    Get in touch
                </span>
                <h3 style={{
                    fontWeight: 800,
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                    lineHeight: 1.1,
                    margin: '0.6rem 0 1.75rem',
                }}>
                    Let&apos;s talk business
                </h3>

                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            backgroundColor: DARK,
                            color: SAND,
                            padding: '1.5rem',
                            borderRadius: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <span style={{
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '50%',
                            border: `1.5px solid ${SAND}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </span>
                        <p style={{ fontFamily: INTER, fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', margin: 0, textTransform: 'uppercase' }}>
                            Received. We will be in touch shortly.
                        </p>
                    </motion.div>
                ) : (
                    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <input type="text" name="name" value={form.name} onChange={onChange} placeholder="NAME" required style={overlayInputStyle} />
                        <input type="email" name="email" value={form.email} onChange={onChange} placeholder="EMAIL" required style={overlayInputStyle} />
                        <input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="PHONE NUMBER" required style={overlayInputStyle} />
                        <textarea name="message" value={form.message} onChange={onChange} placeholder="YOUR REQUIREMENT" required style={{ ...overlayInputStyle, minHeight: 110, resize: 'none' }} />

                        {status === 'error' && (
                            <p style={{ color: '#c0392b', fontSize: '0.8rem', fontFamily: INTER, fontWeight: 600, margin: 0, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                                {errorMessage}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            style={{
                                fontFamily: INTER,
                                fontWeight: 700,
                                fontSize: '0.75rem',
                                letterSpacing: '0.2em',
                                color: SAND,
                                backgroundColor: DARK,
                                border: 'none',
                                borderRadius: '999px',
                                padding: '1.15rem 2rem',
                                textTransform: 'uppercase',
                                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                                opacity: status === 'loading' ? 0.7 : 1,
                                width: '100%',
                                marginTop: '0.5rem',
                            }}
                        >
                            {status === 'loading' ? 'Sending…' : 'Submit Inquiry'}
                        </button>
                    </form>
                )}
            </motion.div>
        </motion.div>
    )
}

const overlayInputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1.5px solid ${DARK}`,
    padding: '0.85rem 0',
    fontFamily: INTER,
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    color: DARK,
    outline: 'none',
}

/**
 * Segmented Without-us / With-us toggle. A single sliding pill (red → green)
 * makes the active state unmistakable.
 */
function ImpactToggle({
    mode,
    onChange,
}: {
    mode: 'without' | 'with'
    onChange: (m: 'without' | 'with') => void
}) {
    const options = [
        { key: 'without' as const, label: 'Without us', color: POS },
        { key: 'with' as const, label: 'With us', color: NEG },
    ]
    const activeIndex = mode === 'without' ? 0 : 1
    return (
        <div style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            backgroundColor: MID_DARK,
            border: '1px solid rgba(232,226,218,0.14)',
            borderRadius: 999,
            padding: 4,
        }}>
            <motion.div
                aria-hidden
                animate={{
                    x: activeIndex === 0 ? '0%' : '100%',
                    backgroundColor: options[activeIndex].color,
                }}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                style={{
                    position: 'absolute',
                    top: 4,
                    bottom: 4,
                    left: 4,
                    width: 'calc(50% - 4px)',
                    borderRadius: 999,
                }}
            />
            {options.map((o) => {
                const active = o.key === mode
                return (
                    <button
                        key={o.key}
                        type="button"
                        onClick={() => onChange(o.key)}
                        aria-pressed={active}
                        style={{
                            position: 'relative',
                            zIndex: 1,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.55rem 1.15rem',
                            fontFamily: INTER,
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            letterSpacing: '0.03em',
                            whiteSpace: 'nowrap',
                            color: active ? SAND : 'rgba(232,226,218,0.55)',
                            transition: 'color 0.25s ease',
                        }}
                    >
                        {o.label}
                    </button>
                )
            })}
        </div>
    )
}

function MetricRow({
    m,
    mode,
    revealed,
}: {
    m: (typeof METRICS)[number]
    mode: 'without' | 'with'
    revealed: boolean
}) {
    const isWith = mode === 'with'
    const pct = isWith ? m.withPct : m.withoutPct
    const label = isWith ? m.withLabel : m.withoutLabel
    const color = isWith ? NEG : POS
    const track: React.CSSProperties = {
        position: 'relative',
        gridColumn: '1 / -1',
        height: 12,
        borderRadius: 999,
        backgroundColor: 'rgba(232,226,218,0.10)',
        overflow: 'hidden',
        marginTop: '0.35rem',
    }
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '0.35rem 1rem',
                alignItems: 'center',
            }}
        >
            <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: '0.9rem' }}>
                {m.label}
            </span>
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                    style={{
                        fontFamily: INTER,
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color,
                        justifySelf: 'end',
                    }}
                >
                    {label}
                </motion.span>
            </AnimatePresence>

            <div style={track}>
                <motion.div
                    animate={{ width: revealed ? `${pct}%` : '0%', backgroundColor: color }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: '100%', borderRadius: 999 }}
                />
            </div>
        </div>
    )
}

function IndustryCard({ ind }: { ind: (typeof INDUSTRIES)[number] }) {
    const [hovered, setHovered] = useState(false)
    return (
        <motion.div
            variants={fadeUp}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 200,
                borderRadius: '1.25rem',
                padding: '1.75rem 1.5rem',
                backgroundColor: hovered ? SAND : 'transparent',
                color: hovered ? DARK : SAND,
                border: `2px solid ${hovered ? SAND : 'rgba(232,223,211,0.2)'}`,
                transform: hovered ? 'translateY(-4px)' : 'none',
                transition: 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
                fontFamily: 'var(--font-montserrat), sans-serif',
            }}
        >
            <ind.Icon
                aria-hidden
                size={32}
                strokeWidth={1.75}
                style={{ color: hovered ? DARK : SAND, transition: 'color 0.25s ease' }}
            />
            <h3 style={{
                fontWeight: 800,
                fontSize: '1.25rem',
                lineHeight: 1.2,
                margin: '1.1rem 0 0.6rem',
            }}>
                {ind.title}
            </h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.55, margin: 0, opacity: hovered ? 0.8 : 0.65 }}>
                {ind.desc}
            </p>
        </motion.div>
    )
}

function SolutionCard({ s, i, compact = false }: { s: (typeof SOLUTIONS)[number]; i: number; compact?: boolean }) {
    const [hovered, setHovered] = useState(false)
    return (
        <motion.div
            variants={fadeUp}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                minHeight: compact ? 'auto' : 220,
                borderRadius: '1.5rem',
                padding: compact ? '1.6rem 1.5rem' : '2rem 1.75rem',
                backgroundColor: DARK,
                color: SAND,
                border: `2px solid ${DARK}`,
                boxShadow: hovered ? `10px 10px 0 rgba(46,42,38,0.4)` : `6px 6px 0 rgba(46,42,38,0.3)`,
                transform: hovered ? 'translateY(-4px)' : 'none',
                transition: 'box-shadow 0.25s ease, transform 0.25s ease',
            }}
        >
            <h3 style={{
                fontFamily: 'var(--font-montserrat), sans-serif',
                fontWeight: 800,
                fontSize: '1.9rem',
                lineHeight: 1.1,
                margin: '0 0 1rem',
            }}>
                {s.title}
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.65, margin: 0, opacity: 0.78 }}>
                {s.desc}
            </p>
            <span style={{
                marginTop: 'auto',
                paddingTop: '1.5rem',
                fontFamily: INTER,
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                opacity: 0.4,
            }}>
                {`0${i + 1}`}
            </span>
        </motion.div>
    )
}
