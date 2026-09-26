'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import StickyHeader from '../../components/StickyHeader'
import Footer from '../../components/Footer'
import ContactSection from '../../components/ContactSection'
import ContactOverlay from '../../components/ContactOverlay'
import ParticleEffect from '../../components/ParticleEffect'
import { useContactPopup } from '../../lib/useContactPopup'
import { DARK, SAND, INTER, GBP_URL, CLUTCH_URL } from '../../lib/constants'
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

// The localities the page claims coverage of. Mirrored into `alsoServed` in
// the LANDING_PAGES registry — the schema should never claim an area the
// visible copy does not name.
const MUMBAI_AREAS = [
    'Andheri', 'Goregaon', 'Malad', 'Borivali', 'Powai',
    'Bandra Kurla Complex', 'Lower Parel', 'Worli',
    'Thane', 'Navi Mumbai', 'Vashi', 'Airoli', 'Belapur'
]

// D2C case-study screenshots. Tall phone captures, so they sit behind a
// "Show screenshots" toggle instead of being cropped into a wide frame. They
// are ALWAYS rendered into the HTML (only visually hidden when collapsed), so
// crawlers index the images and their alt text either way.
const CASE_SCREENS = [
    { src: '/app/1.jpeg', alt: 'React Native shopping app by Nexona, a mobile app development company in Mumbai — category tabs and product grid for a D2C clothing brand' },
    { src: '/app/3.jpeg', alt: 'Product page in a custom D2C clothing app — size guide, share button and add to cart with Razorpay checkout' },
    { src: '/app/2.jpeg', alt: 'Custom mobile admin panel built by Nexona — the brand’s team editing products and prices from a phone' }
]

const H2_STYLE: React.CSSProperties = {
    fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: 'clamp(2rem, 4vw, 3.4rem)',
    fontWeight: 800,
    textTransform: 'uppercase',
    lineHeight: 1.08,
    letterSpacing: '-0.02em',
    margin: 0
}

const EYEBROW_STYLE: React.CSSProperties = {
    fontFamily: INTER,
    fontSize: '0.85rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    opacity: 0.6,
    fontWeight: 700,
    display: 'block',
    marginBottom: '1.5rem'
}

const INTRO_STYLE: React.CSSProperties = {
    fontFamily: INTER,
    opacity: 0.8,
    lineHeight: 1.8,
    fontSize: '1.12rem',
    marginTop: '2rem'
}

export default function MobileAppDevelopmentCompanyInMumbaiPage() {
    const heroRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

    const [isMobile, setIsMobile] = useState(false)
    const [openFaq, setOpenFaq] = useState<number | null>(0)
    const [showScreens, setShowScreens] = useState(false)

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
                in this SERP pads theirs with "Best" or "Top"; the plain version
                reads as the incumbent. */}
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
                        src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000&auto=format&fit=crop"
                        alt="Mobile app development company in Mumbai — Nexona builds Android and iOS apps for Mumbai businesses"
                        fill
                        style={{ objectFit: 'cover', opacity: 0.2 }}
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
                        <span style={{ fontFamily: INTER, fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Android &middot; iOS &middot; Flutter &middot; React Native</span>
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
                        Mobile App Development Company in <span style={{ color: 'transparent', WebkitTextStroke: `1px ${SAND}` }}>Mumbai</span>
                    </motion.h1>

                    {/* First line of body copy — carries the exact primary keyword,
                        answer-first, so AI search can quote it verbatim. */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] as const }}
                        style={{
                            fontFamily: INTER,
                            fontSize: isMobile ? '1.05rem' : '1.3rem',
                            marginTop: '2.5rem',
                            opacity: 0.85,
                            maxWidth: '860px',
                            letterSpacing: '0.02em',
                            lineHeight: 1.6
                        }}
                    >
                        <Link href="/" style={inlineLink}>Nexona</Link> is a mobile app development
                        company in Mumbai. We build Android and iOS apps — native, Flutter or React
                        Native — plus the backend and admin panel behind them. The code is yours. So
                        are the store accounts.
                    </motion.p>
                </motion.div>
            </section>

            {/* Stats bar — every number here is a real, measured figure from the
                D2C case study below. Do not add round "500+" style claims. */}
            <section style={{ backgroundColor: '#25221F', padding: '4rem 5%', borderTop: `1px solid rgba(232,223,211,0.1)` }}>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', textAlign: 'center' }}
                >
                    {[
                        { num: '+57%', label: 'Order Value, App vs Website' },
                        { num: '+187%', label: 'Lifetime Value Per App User' },
                        { num: '0.9s', label: 'Cold Launch' },
                        { num: '100%', label: 'Source Code Yours' }
                    ].map((stat, i) => (
                        <motion.div key={i} variants={fadeInUp}>
                            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '3rem', fontWeight: 800, margin: 0, color: SAND }}>{stat.num}</p>
                            <p style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6, marginTop: '0.5rem' }}>{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ── S1 · Custom mobile app development ──────────────────────────
                Third section, one of the two contact-popup triggers. Carries the
                secondary keyword "custom mobile app development" (720/mo, SD 14)
                in the H2 eyebrow and the first sentence. */}
            <section ref={thirdSectionRef} style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
                <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ maxWidth: '860px', marginBottom: '4.5rem' }}
                    >
                        <motion.span variants={fadeInUp} style={EYEBROW_STYLE}>Custom Mobile App Development</motion.span>
                        <motion.h2 variants={fadeInUp} style={{ ...H2_STYLE, fontSize: 'clamp(2.1rem, 4.2vw, 3.6rem)', lineHeight: 1.05 }}>
                            Built Around Your Business. Not Resized From Someone Else’s.
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={INTRO_STYLE}>
                            Custom mobile app development means the app follows how your business
                            already works — your catalogue, your delivery partners, your approval rules.
                            Not a template with your logo on it. Templates are fine, until the day you
                            need one screen they don’t have. Then there’s no way through.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '2rem' }}>
                        {[
                            {
                                title: 'D2C and fashion brands',
                                body: 'The website converts. Repeat buyers still type the URL every single time. An app gives them a one-tap way back, and for the brand in our case study below, those app buyers spend 57% more per order.'
                            },
                            {
                                title: 'Field sales and service teams',
                                body: 'Reps in Bhiwandi godowns and on Andheri sites, taking orders on WhatsApp and a notebook. They need an app that works offline and syncs when the signal comes back — which, three levels down in a basement car park, is never quite when you expect.'
                            },
                            {
                                title: 'Clinics, diagnostics, wellness',
                                body: 'Bookings, reports, reminders. The patient wants the report PDF on their phone, not a call to the front desk at 8:40pm asking where it is.'
                            },
                            {
                                title: 'Logistics and delivery',
                                body: 'Driver apps with proof of delivery, route order and COD reconciliation. Built for a 3GB-RAM Android phone, because that is what the driver actually carries. Not the flagship on our desk.'
                            },
                            {
                                title: 'Startups building an MVP',
                                body: <>One type of user, one core flow, one way to pay. Enough to test the idea with real people — the rest waits. Founders without a technical lead often start with a <Link href="/fractional-cto-as-a-service" style={inlineLink}>fractional CTO</Link> first, and then build.</>
                            },
                            {
                                title: 'Businesses already running a system',
                                body: <>An ERP, a CRM, a custom dashboard. The app becomes the front end for the people who never sit at a desk. Well, most of them. The desk side of this is on our <Link href="/business-management-software-development" style={inlineLink}>business management software</Link> page.</>
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
                                <p style={{ fontFamily: INTER, fontSize: '0.98rem', lineHeight: 1.7, opacity: 0.75, margin: 0 }}>{item.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── S2 · Services ────────────────────────────────────────────────
                H3s carry the supporting keywords (android / ios / flutter / react
                native app development). Each becomes its own page later; until
                then they live here as sections. */}
            <section style={{ backgroundColor: '#25221F', color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4rem', maxWidth: '840px' }}
                    >
                        <motion.span variants={fadeInUp} style={EYEBROW_STYLE}>What We Build</motion.span>
                        <motion.h2 variants={fadeInUp} style={H2_STYLE}>
                            Mobile App Development Services
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={INTRO_STYLE}>
                            Six kinds of work. One team — the same engineers from the first scoping call
                            to the fix you need three months after launch.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '2rem' }}>
                        {[
                            {
                                title: 'Android App Development',
                                body: 'Kotlin, when the app needs deep hardware access — Bluetooth printers, barcode scanners, background location. Most of India is on Android, so this is where a Mumbai business usually starts.'
                            },
                            {
                                title: 'iOS App Development',
                                body: 'Swift and SwiftUI. Worth building natively when your buyers skew premium or the app leans on Apple Pay, HealthKit or widgets. Otherwise, honestly — go cross-platform.'
                            },
                            {
                                title: 'Flutter App Development',
                                body: 'One codebase, identical on both platforms down to the pixel. Our default when the design has to look exactly the same everywhere and there is no web codebase to share.'
                            },
                            {
                                title: 'React Native App Development',
                                body: 'One codebase that shares logic with a React website. The D2C app on this page is React Native: 120ms hot launch, 900ms cold. Which answers the usual objection to cross-platform.'
                            },
                            {
                                title: 'Enterprise Mobile App Development',
                                body: 'Internal apps for staff. Approvals, inspections, attendance, stock counts. Single sign-on, role-based access, device management. Unglamorous work — the kind of app that gets opened every shift.'
                            },
                            {
                                title: 'Ecommerce and On-Demand Apps',
                                body: 'Catalogue, cart, UPI and card checkout through Razorpay, order tracking, push notifications. On-demand adds a second app for the partner — the driver, the technician, the tutor — and that second app is where most of the complexity hides.'
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-8%" }}
                                transition={{ delay: (i % 3) * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '20px', padding: '2.25rem', backgroundColor: 'rgba(232,223,211,0.03)' }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.2rem', fontWeight: 700, margin: '0 0 1rem 0', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{item.title}</h3>
                                <p style={{ fontFamily: INTER, fontSize: '0.98rem', lineHeight: 1.7, opacity: 0.75, margin: 0 }}>{item.body}</p>
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
                        Every app ships with the backend and admin panel it needs. We don’t hand you a
                        front end and a list of APIs somebody else has to build. If the app needs to
                        think — search, support, voice — that part comes from our{' '}
                        <Link href="/ai-agent-development-company" style={inlineLink}>AI agent development</Link> work.
                    </motion.p>
                </div>
            </section>

            {/* ── S3 · Native vs Flutter vs React Native ───────────────────────
                None of the seven pages ranking for this term answers this
                properly. Definitional, opinionated, quotable — built for AEO. */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4rem', maxWidth: '840px' }}
                    >
                        <motion.span variants={fadeInUp} style={EYEBROW_STYLE}>The First Question Everyone Asks</motion.span>
                        <motion.h2 variants={fadeInUp} style={H2_STYLE}>
                            Native vs Flutter vs React Native
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={INTRO_STYLE}>
                            Short answer: for most Mumbai businesses, cross-platform. Flutter if the
                            design has to be identical everywhere. React Native if you already run a
                            React website. Native when the app lives on hardware — and, well, mostly only
                            then.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
                        {[
                            {
                                kind: 'Native',
                                line: 'Separate apps. Kotlin for Android, Swift for iOS.',
                                rows: [
                                    ['Good for', 'Bluetooth printers, scanners, background location, heavy camera work'],
                                    ['Watch out for', 'Two codebases, two sets of bugs, every feature built twice'],
                                    ['Team you need', 'Android and iOS engineers, separately'],
                                    ['Our take', 'Right when the hardware is the product. Rarely otherwise']
                                ]
                            },
                            {
                                kind: 'Flutter',
                                line: 'One Dart codebase, drawn by its own rendering engine.',
                                rows: [
                                    ['Good for', 'Design-heavy apps that must look the same on a budget Redmi and an iPhone'],
                                    ['Watch out for', 'Bigger app size. Some native SDKs need a bridge written by hand'],
                                    ['Team you need', 'One team'],
                                    ['Our take', 'Our default for a new app with no web codebase to share']
                                ]
                            },
                            {
                                kind: 'React Native',
                                line: 'TypeScript, rendering real native components.',
                                rows: [
                                    ['Good for', 'Businesses already on React — logic and engineers shared with the website'],
                                    ['Watch out for', 'Performance takes discipline. A careless build feels sluggish'],
                                    ['Team you need', 'One team, often the same one that runs your web app'],
                                    ['Our take', 'Our pick when a React site already exists. The D2C app below is one']
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
                        If an agency gives you the same answer for every project, you’re hearing what
                        their team happens to know. Not what your app needs.
                    </motion.p>
                </div>
            </section>

            {/* ── S4 · Case study · D2C clothing brand (NDA) ───────────────────
                The only competitor-beating proof on the page: measured results.
                Client is never named. Figures are the client's real numbers — do
                not round, do not add to them. Screenshots sit behind a toggle
                but are always in the DOM for indexing. */}
            <section style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4rem', maxWidth: '840px' }}
                    >
                        <motion.span variants={fadeInUp} style={EYEBROW_STYLE}>Case Study &middot; Name Withheld Under NDA</motion.span>
                        <motion.h2 variants={fadeInUp} style={H2_STYLE}>
                            A D2C Clothing Brand’s App
                        </motion.h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.35fr', gap: isMobile ? '3rem' : '5rem', alignItems: 'start' }}>
                        {/* Results card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }}
                            style={{ border: `1px solid rgba(46,42,38,0.15)`, borderRadius: '24px', padding: '2.5rem', backgroundColor: 'rgba(46,42,38,0.03)', position: isMobile ? 'static' : 'sticky', top: '8rem' }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.25rem', paddingBottom: '2.25rem', borderBottom: `1px solid rgba(46,42,38,0.15)` }}>
                                {[
                                    { num: '+57%', label: 'Average Order Value, App vs Website' },
                                    { num: '+187%', label: 'Lifetime Value Per App User' },
                                    { num: '120ms / 900ms', label: 'Hot Launch / Cold Launch' }
                                ].map((s, i) => (
                                    <div key={i}>
                                        <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.85rem', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{s.num}</p>
                                        <p style={{ fontFamily: INTER, fontSize: '0.74rem', letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 700, marginTop: '0.4rem' }}>{s.label}</p>
                                    </div>
                                ))}
                            </div>
                            <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {[
                                    ['What we built', 'Android + iOS app, and a custom admin panel'],
                                    ['Stack', 'React Native, FastAPI, PostgreSQL, Redis, Razorpay'],
                                    ['Before', 'A website we had already built for them']
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
                                The app their best customers moved to
                            </motion.h3>

                            {[
                                'We had already built their website. It sold fine. So the real question was never whether we could build an app — it was whether an app would earn its place, or just become one more thing somebody has to keep updated.',
                                'One React Native codebase, Android and iOS. Categories run along the top — coats, kaftans, kaftan sets, kurtis — so someone who has bought before is two taps from whatever just dropped. Product pages carry the size guide and a share button. Checkout goes straight to Razorpay. No detours.',
                                'Behind it sit FastAPI and PostgreSQL, with Redis caching the catalogue. Hot launch takes 120ms. Cold launch, 900ms — under a second from tapping the icon, even on patchy mobile data.',
                                'We built the admin panel from scratch too, instead of bolting on an off-the-shelf dashboard. It works on a phone. The team changes prices, photos and categories without waiting to get back to a laptop.',
                                'App customers now spend 57% more per order than website customers, and are worth 187% more over their lifetime. Our read: the app didn’t create new buyers. It gave the loyal ones a faster way back, and they spend more every time they use it.'
                            ].map((para, i) => (
                                <motion.p key={i} variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '1.08rem', lineHeight: 1.8, opacity: 0.8, margin: '0 0 1.5rem 0' }}>
                                    {para}
                                </motion.p>
                            ))}

                            {/* Screenshot toggle. The gallery is always rendered — only
                                hidden visually when collapsed — so the <img> tags and
                                alt text are in the HTML for crawlers regardless. */}
                            <motion.div variants={fadeInUp} style={{ marginTop: '2.5rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowScreens((v) => !v)}
                                    aria-expanded={showScreens}
                                    aria-controls="d2c-screens"
                                    style={{
                                        fontFamily: INTER,
                                        fontSize: '0.8rem',
                                        letterSpacing: '0.16em',
                                        textTransform: 'uppercase',
                                        fontWeight: 700,
                                        color: DARK,
                                        background: 'none',
                                        border: `1px solid rgba(46,42,38,0.35)`,
                                        borderRadius: '99px',
                                        padding: '0.85rem 1.75rem',
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}
                                >
                                    {showScreens ? 'Hide screenshots' : 'Show screenshots'}
                                    <span style={{ fontSize: '1.1rem', fontWeight: 300, lineHeight: 1, transform: showScreens ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>+</span>
                                </button>

                                <div
                                    id="d2c-screens"
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(3, minmax(0, 200px))',
                                        gap: isMobile ? '0.75rem' : '1.25rem',
                                        maxHeight: showScreens ? '1200px' : 0,
                                        opacity: showScreens ? 1 : 0,
                                        marginTop: showScreens ? '2rem' : 0,
                                        overflow: 'hidden',
                                        transition: 'max-height 0.6s ease, opacity 0.4s ease, margin-top 0.4s ease'
                                    }}
                                >
                                    {CASE_SCREENS.map((s) => (
                                        <figure key={s.src} style={{ margin: 0 }}>
                                            <Image
                                                src={s.src}
                                                alt={s.alt}
                                                width={720}
                                                height={1600}
                                                sizes="(max-width: 768px) 33vw, 200px"
                                                style={{ width: '100%', height: 'auto', borderRadius: '16px', border: `1px solid rgba(46,42,38,0.15)`, display: 'block' }}
                                            />
                                        </figure>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.p variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '1rem', lineHeight: 1.7, opacity: 0.6, marginTop: '2.5rem' }}>
                                Client name withheld under NDA — we’re happy to walk you through the build
                                on a call. More of what we’ve shipped is on the{' '}
                                <Link href="/projects" style={inlineLink}>projects page</Link>.
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── S4b · Third-party reviews ────────────────────────────────────
                Quotes are VERBATIM from the verified Clutch review (Sep 2026) —
                never edit the wording. It is an AI voice project, not a mobile
                one, and the attribution says so. No star rating or review count
                is printed: GBP numbers change, and a stale figure is worse than
                none. Do not add AggregateRating schema for these — Google treats
                self-hosted review markup on a business's own site as spam. */}
            <section style={{ backgroundColor: '#25221F', color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                    >
                        <motion.span variants={fadeInUp} style={EYEBROW_STYLE}>Reviews</motion.span>
                        <motion.h2 variants={fadeInUp} style={{ ...H2_STYLE, marginBottom: '3.5rem' }}>
                            What Clients Say When We’re Not In The Room
                        </motion.h2>

                        <motion.blockquote variants={fadeInUp} cite={CLUTCH_URL} style={{ margin: 0, borderLeft: `2px solid rgba(232,223,211,0.3)`, paddingLeft: isMobile ? '1.5rem' : '2.5rem' }}>
                            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: isMobile ? '1.25rem' : '1.6rem', fontWeight: 600, lineHeight: 1.45, margin: '0 0 1.5rem 0', letterSpacing: '-0.01em' }}>
                                “The thing I found most impressive was that Nexona did not approach the
                                project as a simple ‘build what the client asks for’ engagement.”
                            </p>
                            <p style={{ fontFamily: INTER, fontSize: '1.08rem', lineHeight: 1.8, opacity: 0.8, margin: '0 0 1.75rem 0' }}>
                                “When they believed there was a better technical approach, they explained
                                the relevant context, discussed the trade-offs, and gave their own
                                recommendation.”
                            </p>
                            <footer style={{ fontFamily: INTER, fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55 }}>
                                Founder &amp; CEO, Valyrian Voice &middot; AI voice project &middot; Verified on Clutch
                            </footer>
                        </motion.blockquote>

                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '1rem', lineHeight: 1.75, opacity: 0.6, margin: '2.5rem 0 0 0', maxWidth: '720px' }}>
                            Same review, the one thing they’d change: “more formal documentation and
                            planning around certain architectural decisions.” Fair. We left it in.
                        </motion.p>

                        <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '3rem' }}>
                            {[
                                { href: GBP_URL, label: 'Read our Google reviews' },
                                { href: CLUTCH_URL, label: 'Read the full review on Clutch' }
                            ].map((l) => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        fontFamily: INTER,
                                        fontSize: '0.8rem',
                                        letterSpacing: '0.16em',
                                        textTransform: 'uppercase',
                                        fontWeight: 700,
                                        color: SAND,
                                        textDecoration: 'none',
                                        border: `1px solid rgba(232,223,211,0.35)`,
                                        borderRadius: '99px',
                                        padding: '0.85rem 1.75rem'
                                    }}
                                >
                                    {l.label} &rarr;
                                </a>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── S5 · Process ─────────────────────────────────────────────────
                Timings per phase — no competitor in this SERP publishes them. */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4rem', maxWidth: '840px' }}
                    >
                        <motion.span variants={fadeInUp} style={EYEBROW_STYLE}>How It Runs</motion.span>
                        <motion.h2 variants={fadeInUp} style={H2_STYLE}>
                            From Scoping Call To The Play Store
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={INTRO_STYLE}>
                            The build is rarely the slow part. Deciding what not to build is. That, and
                            the store review nobody puts in the plan.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[
                            {
                                w: 'Weeks 1–2',
                                t: 'Scope, and cut',
                                need: 'An hour with whoever will actually use the app. Not only whoever is paying for it',
                                out: 'A written scope, a screen list, and the three features we would leave for version two'
                            },
                            {
                                w: 'Weeks 2–4',
                                t: 'A prototype you can tap',
                                need: 'Feedback within two days on each round',
                                out: 'A clickable prototype on your own phone. You will change your mind about checkout here — far cheaper than changing it in week nine'
                            },
                            {
                                w: 'Weeks 4–12',
                                t: 'Build, in two-week sprints',
                                need: 'One person who can answer questions the same day',
                                out: 'A working build installed on your phone at the end of every sprint. Not a status report. The app'
                            },
                            {
                                w: 'Alongside',
                                t: 'Test on real devices',
                                need: 'Two or three of your staff trying to break it',
                                out: 'Tested on the budget Android your customers actually own, not only the flagship we develop on'
                            },
                            {
                                w: 'Launch',
                                t: 'Stores, and the first rejection',
                                need: 'Google Play and Apple developer accounts in your company’s name',
                                out: 'Listing, screenshots, privacy forms, submission — and the first review rejection handled. There is usually one'
                            },
                            {
                                w: 'After',
                                t: 'Keep it running',
                                need: 'Nothing, unless you want new features',
                                out: 'Crash monitoring from day one, a named engineer on WhatsApp, and fixes before Apple’s September OS release breaks something small'
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
                </div>
            </section>

            {/* ── S6 · Tech stack ──────────────────────────────────────────────
                Grouped by layer, with the India-specific payment and messaging
                stack called out — competitors only show a logo wall. */}
            <section style={{ backgroundColor: '#25221F', color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4rem', maxWidth: '840px' }}
                    >
                        <motion.span variants={fadeInUp} style={EYEBROW_STYLE}>Stack</motion.span>
                        <motion.h2 variants={fadeInUp} style={H2_STYLE}>
                            What We Build With
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={INTRO_STYLE}>
                            Boring, well-supported tools. Your app should outlive our involvement, and
                            the next engineer who opens the code should recognise everything in it.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                        {[
                            { layer: 'Mobile', tools: ['React Native', 'Flutter', 'Kotlin', 'Swift / SwiftUI', 'TypeScript'] },
                            { layer: 'Backend', tools: ['FastAPI (Python)', 'Node.js', 'PostgreSQL', 'Redis'] },
                            { layer: 'Payments & India stack', tools: ['Razorpay', 'UPI', 'OTP login', 'WhatsApp Business API'] },
                            { layer: 'Cloud & monitoring', tools: ['AWS', 'Google Cloud', 'Firebase push', 'Crashlytics'] }
                        ].map((g, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-8%" }}
                                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '20px', padding: '2.25rem', backgroundColor: 'rgba(232,223,211,0.03)' }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.5rem 0', letterSpacing: '-0.01em', textTransform: 'uppercase' }}>{g.layer}</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                    {g.tools.map((t) => (
                                        <span key={t} style={{ fontFamily: INTER, fontSize: '0.88rem', padding: '0.45rem 1rem', border: `1px solid rgba(232,223,211,0.2)`, borderRadius: '99px', opacity: 0.85 }}>{t}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── S7 · Cost drivers ────────────────────────────────────────────
                NO FIGURES. Site-wide rule: engagements are scoped per client.
                Captures the cost-question intent that Duplex and Metaminds win
                with price tables, by answering the question behind it. */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4rem', maxWidth: '840px' }}
                    >
                        <motion.span variants={fadeInUp} style={EYEBROW_STYLE}>Budget</motion.span>
                        <motion.h2 variants={fadeInUp} style={H2_STYLE}>
                            What Drives The Cost Of An App
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={INTRO_STYLE}>
                            We don’t publish a price. A number quoted before anyone has seen your
                            screens is a guess with a rupee sign on it. Here is what actually moves it,
                            so you can judge the size of your project before you talk to anyone.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[
                            ['One platform or both', 'Cross-platform builds both from one codebase. Two native apps is close to two projects.'],
                            ['How many types of user', 'A shopper is one app. Add a delivery partner, a vendor or a technician and you are building a second app, plus the logic that connects them.'],
                            ['What it has to talk to', 'Razorpay is quick. Your ERP, a courier API, an old system with no API at all — each one adds integration work, and the undocumented ones add the most.'],
                            ['Backend and admin panel', 'If a backend already exists, the app plugs into it. If not, we build one, along with the admin panel your team runs things from.'],
                            ['Offline and hardware', 'An app that works without signal needs sync and conflict handling. Printers, scanners and background location need native code.'],
                            ['The deadline', 'A launch pinned to Diwali or a trade show means more people working in parallel. Possible. Rarely cheaper.']
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
                        Three ways to work with us: a fixed scope for a defined first version, a
                        dedicated team billed monthly, or a retainer after launch. Not a cost driver —
                        how many people download it. No per-user licence, ever. We scope first, then quote.
                    </motion.p>
                </div>
            </section>

            {/* ── S8 · Pre-hire checklist ──────────────────────────────────────
                A conversion section, not a guide: each question is one we answer
                well and a template shop does not. Heading is framed as "before
                you sign", NOT "how to choose" — that phrasing is an
                informational query and belongs to a blog post that links here.
                Keep it short; the long-form guide is the blog's job. */}
            <section style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4rem', maxWidth: '840px' }}
                    >
                        <motion.span variants={fadeInUp} style={EYEBROW_STYLE}>Before You Shortlist</motion.span>
                        <motion.h2 variants={fadeInUp} style={H2_STYLE}>
                            7 Questions To Ask Any App Development Company In Mumbai
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={INTRO_STYLE}>
                            Seven questions to ask anyone you’re considering. Including us.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
                        {[
                            ['Whose name are the store accounts in?', 'If the app is published under the agency’s developer account, you don’t fully own it. Moving it later is painful, sometimes impossible. This one question disqualifies more agencies than any other.'],
                            ['Can I install something you built?', 'Not a portfolio PDF. An app, from the store, on your phone, that you tap through during the call.'],
                            ['Who builds it — you, or someone you hand it to?', 'The people on the sales call and the people writing the code are often different companies. Ask to meet the engineer.'],
                            ['Which phones do you test on?', 'If the answer is the latest iPhone and a Pixel, your customers on budget Androids will find the bugs for you.'],
                            ['What happens when Apple rejects it?', 'It will, probably once. You want someone who has handled that before and has already budgeted the time for it.'],
                            ['Who fixes it in month four?', 'A named person on WhatsApp, or a ticket queue. Ask how fast they reply on a Saturday.'],
                            ['Why that framework?', 'If every project gets the same answer, you’re hearing what their team knows, not what your app needs.']
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

            {/* ── S9 · Areas served ────────────────────────────────────────────
                Carries the Thane and Navi Mumbai secondary keywords. Nexona is a
                service-area business (constants.ts — ADDRESS_IS_PUBLIC is false):
                never print a street address or claim a Thane / Navi Mumbai office. */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '3.5rem' : '5rem', alignItems: 'start' }}>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-10%" }}
                            variants={staggerContainer}
                        >
                            <motion.span variants={fadeInUp} style={EYEBROW_STYLE}>Where We Work</motion.span>
                            <motion.h2 variants={fadeInUp} style={{ ...H2_STYLE, fontSize: 'clamp(1.9rem, 3.6vw, 3rem)', margin: '0 0 2rem 0' }}>
                                Mumbai, Thane &amp; Navi Mumbai
                            </motion.h2>
                            {[
                                'Nexona is registered in Mumbai. If you’re looking for a mobile app development company in Thane or Navi Mumbai, we work there too — as a team that comes to you, not an office we pretend to have.',
                                'Scoping happens in person if you want it, in front of the people who will use the app. Watching a delivery supervisor use their phone for ten minutes tells you more than an hour in a meeting room. The build itself is remote, like most engineering teams in this city.'
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
                                Areas We Cover
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '2.25rem' }}>
                                {MUMBAI_AREAS.map((area) => (
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
                            <p style={{ fontFamily: INTER, fontSize: '0.98rem', lineHeight: 1.75, opacity: 0.65, margin: 0 }}>
                                Also:{' '}
                                <Link href="/software-development-agency-mumbai" style={inlineLink}>Software development in Mumbai</Link>{' · '}
                                <Link href="/software-development-company-in-navi-mumbai" style={inlineLink}>Navi Mumbai</Link>{' · '}
                                <Link href="/ai-automation-company-in-thane" style={inlineLink}>AI automation in Thane</Link>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── S10 · FAQ ───────────────────────────────────────────────────
                Copy lives in content.ts and is mirrored into FAQPage schema by
                layout.tsx, so the two can never drift. */}
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
                            What People Ask Before Building An App
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
                        Send Us The Idea. Half-Formed Is Fine.
                    </motion.h2>
                    <motion.p variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '1.2rem', opacity: 0.8, lineHeight: 1.7, maxWidth: '740px', margin: '0 auto' }}>
                        A voice note. A sketch on the back of a bill. A competitor’s app with the parts
                        you hate circled in red. That’s enough for a first call — we’ll tell you what
                        version one should be, and what it shouldn’t.
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
                        heading="Get a free app scoping call"
                        submitLabel="Book Free Scoping Call"
                        onClose={closeContact}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
