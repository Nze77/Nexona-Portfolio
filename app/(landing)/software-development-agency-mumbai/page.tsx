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
import { FAQ_ITEMS, STARTING_PRICES, APP_STARTING_PRICES, type PriceItem } from './content'

// Extracted animation variants
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

const H2_STYLE: React.CSSProperties = {
    fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
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
    fontSize: '1.1rem',
    marginTop: '2rem'
}

// Mini case studies. Every figure is a real, measured client number already
// published elsewhere on the site — do not round, do not add to them. The D2C
// and servicing clients are unnamed by agreement.
const CASE_STUDIES: { tag: string; title: string; metrics: { num: string; label: string }[]; body: string; link: React.ReactNode }[] = [
    {
        tag: 'D2C clothing brand · Name withheld under NDA',
        title: 'An app their best customers moved to',
        metrics: [
            { num: '+57%', label: 'Order value, app vs website' },
            { num: '+187%', label: 'Lifetime value per app user' }
        ],
        body: 'We had already built their website. It sold fine. The app — one React Native codebase, Android and iOS, with a mobile admin panel the team edits prices from — gave repeat buyers a one-tap way back. Cold launch, 900ms.',
        link: <>Full write-up on our <Link href="/mobile-app-development-company-in-mumbai" style={inlineLink}>mobile app development</Link> page</>
    },
    {
        tag: 'Industrial equipment servicing · 40 employees',
        title: '90 more jobs a month. Same office team.',
        metrics: [
            { num: '300 → 390+', label: 'Service jobs per month' },
            { num: '~20 → 7 hrs', label: 'Admin work per week' }
        ],
        body: 'Enquiries arrived by email, got retyped into a sheet, turned into a quote somebody built by hand. One system now runs enquiry to invoice, and AI reads the incoming requests. A quote takes under ten minutes instead of thirty. No new admin hires.',
        link: <>More on <Link href="/business-management-software-development" style={inlineLink}>business management software</Link></>
    },
    {
        tag: 'Dialexus · AI voice agent',
        title: 'Outbound calls that update the CRM themselves',
        metrics: [
            { num: '5 → 30–35', label: 'Successful engagements per 1,000 calls' },
            { num: '600–800ms', label: 'Response latency' }
        ],
        body: 'A voice agent running its whole pipeline on a single GPU — no per-call API bill. It talks, then acts: schedules callbacks, sets the next dial time, moves the lead to the right stage. Nobody types up call notes at 7pm anymore.',
        link: <><Link href="/projects/voice-agent" style={inlineLink}>See the project</Link></>
    }
]

const INDUSTRIES: { title: string; where: string; problem: string; build: React.ReactNode }[] = [
    {
        title: 'Manufacturing',
        where: 'Andheri MIDC · Marol · Vasai · Bhiwandi',
        problem: 'Job cards on paper. A stock ledger that disagrees with the rack. Dispatch typed into Tally twice — once at the gate, once at month end.',
        build: <>Production tracking, inventory and dispatch that write straight into Tally. See our <Link href="/manufacturing-erp" style={inlineLink}>manufacturing ERP</Link>.</>
    },
    {
        title: 'D2C & E-commerce',
        where: 'Lower Parel · Bandra · Andheri West',
        problem: 'The website converts. Orders, returns and stock still live in three tabs and a WhatsApp group the founder answers at midnight.',
        build: <>Storefronts, order and returns tracking, and an <Link href="/mobile-app-development-company-in-mumbai" style={inlineLink}>app for repeat buyers</Link> when the numbers say it will earn its place.</>
    },
    {
        title: 'Education & Coaching',
        where: 'Dadar · Vile Parle · Borivali · Thane',
        problem: 'Admissions in one sheet, fees in another, attendance on a register nobody reconciles until a parent calls the office.',
        build: <>One system for admissions, fees, attendance and parent updates. Built out, that is our <Link href="/college-erp" style={inlineLink}>college ERP</Link>.</>
    },
    {
        title: 'Distribution & Trading',
        where: 'Masjid Bunder · Kalbadevi · Bhiwandi godowns',
        problem: 'Salesmen take orders in a notebook, phone them in, and someone keys them in again. Retailer outstanding is a number only the accountant knows.',
        build: <>Order taking from the field, scheme and credit tracking, live stock by godown. Our <Link href="/distributor-management-system" style={inlineLink}>distributor management system</Link> covers it.</>
    }
]

// What moves a project up from its starting price (STARTING_PRICES in content.ts).
const COST_DRIVERS: [string, string][] = [
    ['How much the first phase covers', 'Three workflows done properly beat eleven done badly. Most of the number comes from here, which is why we push to cut it.'],
    ['How many types of user', 'An owner dashboard is one thing. Add field staff, a warehouse login and a customer portal and each one gets its own screens, rules and permissions.'],
    ['What it has to talk to', 'Razorpay is quick. Tally, a courier API, an old database nobody has documented — each adds integration work, and the undocumented ones add the most.'],
    ['Your existing data', 'Six years of Excel with three date formats and duplicate customers takes real time to clean. Better to know that in week one.'],
    ['Whether AI is part of it', 'Reading invoices, answering customers, summarising calls. Worth it when it removes hours. We will tell you when it does not.'],
    ['The deadline', 'A go-live pinned to April 1st or a trade show means more people working in parallel. Possible. Rarely cheaper.']
]

const HOW_TO_CHOOSE: [string, string][] = [
    ['Who actually writes the code?', 'The people on the sales call and the people building your software are often different companies. Ask to meet the engineer before you sign.'],
    ['Whose account is the repository in?', 'Yours, from the first commit, or you do not really own what you paid for. This one question rules out more vendors than any other.'],
    ['Can they show a live system a client uses today?', 'Not a portfolio PDF. A real login, real data, tapped through on the call.'],
    ['Do they push back on your brief?', 'A company that builds everything you ask for will build things you never use. You want someone who argues — politely — about the parts that will not pay off.'],
    ['Who picks up in month four?', 'A named person on WhatsApp, or a ticket queue. Ask how fast they reply on a Saturday.'],
    ['Will they tell you to buy off-the-shelf?', 'If your process looks like everyone else’s, Zoho or Tally will do it cheaper. A software development company that never says so is selling hours, not answers.']
]

export default function MumbaiAgencyPage() {
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

            {/* Hero Section with Parallax Image */}
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
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
                        alt="Software agency in Mumbai – Nexona digital network background"
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
                        <span style={{ fontFamily: INTER, fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Custom Software &middot; ERP &middot; CRM &middot; AI Automation</span>
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
                        Software Development Company <br /> &amp; Agency <span style={{ color: 'transparent', WebkitTextStroke: `1px ${SAND}` }}>in Mumbai</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] as const }}
                        style={{
                            fontFamily: INTER,
                            fontSize: isMobile ? '1.05rem' : '1.35rem',
                            marginTop: '2.5rem',
                            opacity: 0.8,
                            maxWidth: '780px',
                            letterSpacing: '0.02em',
                            lineHeight: 1.6
                        }}
                    >
                        <Link href="/" style={inlineLink}>Nexona</Link> is a software development company in Mumbai — a
                        software agency, if you prefer the word — building custom ERPs, CRMs, web apps
                        and AI automation for Indian SMEs. You own the code. We watch how you work first.
                    </motion.p>
                </motion.div>
            </section>

            {/* Stats Bar */}
            <section style={{ backgroundColor: '#25221F', padding: '4rem 5%', borderTop: `1px solid rgba(232,223,211,0.1)` }}>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', textAlign: 'center' }}
                >
                    {/* Real, measured client figures from the case studies below —
                        do not swap back to round "500+" style claims. */}
                    {[
                        { num: '+57%', label: 'Order Value, D2C App vs Website' },
                        { num: '390+', label: 'Service Jobs a Month, Up From 300' },
                        { num: '7 hrs', label: 'Weekly Admin, Down From ~20' },
                        { num: '5.0', label: 'Rating on Clutch' }
                    ].map((stat, i) => (
                        <motion.div key={i} variants={fadeInUp}>
                            <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '3rem', fontWeight: 800, margin: 0, color: SAND }}>{stat.num}</h3>
                            <p style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6, marginTop: '0.5rem' }}>{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Intro / Philosophy — third section, one of the two contact-popup triggers */}
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
                            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
                            alt="Software agency in Mumbai – Nexona team building custom software"
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
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Built for Mumbai Businesses</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                            fontWeight: 800,
                            lineHeight: 1.05,
                            textTransform: 'uppercase',
                            marginBottom: '2.5rem',
                            letterSpacing: '-0.02em'
                        }}>
                            A Software Company in Mumbai for Businesses That Outgrew Excel
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.85, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '1.5rem', fontWeight: 500 }}>
                            <Link href="/" style={inlineLink}>Nexona</Link> is a software development company in Mumbai that builds custom software for SMEs and startups: a tailored <Link href="/erp-systems-for-manufacturers" style={inlineLink}>ERP</Link> or <Link href="/customer-retention-management-software" style={inlineLink}>CRM system</Link>, full-stack web apps, and <Link href="/ai-automation-agency" style={inlineLink}>AI and process automation</Link> that removes the repeat work. One team handles all of it — scoping, build, launch, and the fixes after.
                        </motion.p>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '1.5rem' }}>
                            Most companies call us at the same moment. Orders live in one sheet, stock in another, and the owner finds out what happened yesterday from a WhatsApp group with 214 unread messages. Nobody decided to run the business that way. It just grew there.
                        </motion.p>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '3rem' }}>
                            When the brief is an autonomous system rather than a workflow, that becomes <Link href="/ai-agent-development-company" style={inlineLink}>AI agent development</Link>. And when what you actually need is someone to own the architecture and hiring decisions — not a build — that is <Link href="/fractional-cto-as-a-service" style={inlineLink}>Fractional CTO as a Service</Link>.
                        </motion.p>
                        {/* One-line pointer to the sister local page — separate intent,
                            separate keywords, so the two support rather than compete. */}
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.7, lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '3rem' }}>
                            Based across the harbour? We also work as a <Link href="/software-development-company-in-navi-mumbai" style={inlineLink}>software development company in Navi Mumbai</Link>, from Airoli to Panvel.
                        </motion.p>
                        <motion.ul variants={staggerContainer} style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                <>Custom web applications, and <Link href="/mobile-app-development-company-in-mumbai" style={inlineLink}>mobile app development</Link> for Mumbai businesses</>,
                                'Scalable cloud architecture and infrastructure',
                                'Secure portals for fintech, real estate, and enterprise clients',
                                <>ERP, CRM, <Link href="/event-management-software" style={inlineLink}>event management software</Link> and <Link href="/business-management-software-development" style={inlineLink}>internal business management software</Link></>,
                                'AI agents and workflow automation'
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

            {/* Why Choose Nexona Section */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ textAlign: 'center', marginBottom: '5rem' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>Why Nexona</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800,
                            marginTop: '1.5rem',
                            textTransform: 'uppercase'
                        }}>
                            Why Mumbai Businesses Choose Nexona
                        </motion.h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
                        {[
                            { title: 'We write the code ourselves', desc: 'No reselling, no handing your project to a team in another city after the contract is signed. The engineer on the scoping call is the one building it — and the one you message when something breaks.' },
                            { title: 'Built for how business runs here', desc: 'Tally for accounts. GST e-invoicing. WhatsApp as the real inbox. A floor supervisor who reads Marathi before English. A software development agency in Mumbai should build for that without being told.' },
                            { title: 'AI where it earns its place', desc: 'Our voice agent for Dialexus took successful engagements from about 5 to 30–35 per 1,000 calls. That is the bar. If AI will not remove real hours from your week, we leave it out and say so.' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-10%" }}
                                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.8, ease: [0.23, 1, 0.32, 1] as const } } }}
                                style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '24px', padding: '2.5rem', backgroundColor: 'rgba(232,223,211,0.03)' }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1.25rem 0', letterSpacing: '-0.01em' }}>{item.title}</h3>
                                <p style={{ fontFamily: INTER, opacity: 0.75, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Process Section */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ textAlign: 'center', marginBottom: '6rem' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>How We Work</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 800,
                            marginTop: '1.5rem',
                            textTransform: 'uppercase'
                        }}>
                            Our Software Development Process
                        </motion.h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                        {[
                            { step: '01', title: 'Discovery', desc: 'Two or three hours at your office, following one order from enquiry to invoice. Every place it gets re-typed goes on the list. You keep the notes whatever you decide.' },
                            { step: '02', title: 'Scope, and cut', desc: 'A written phase plan. Then we argue with half of it — the features you asked for that you will not use. Cheaper to lose them now than in month five.' },
                            { step: '03', title: 'Build in the open', desc: 'Two-week sprints. A working link every fortnight, not a status report. If something is going sideways you find out in 14 days, not at handover.' },
                            { step: '04', title: 'Launch, then stay', desc: 'Training in the room, a close watch on the first week, and fixes for what real usage exposes. The weeks after go-live are usually when it gets genuinely good.' }
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

            {/* Services Grid */}
            <section className="product-theme-trigger" data-theme="light" style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '12rem 8%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ textAlign: 'center', marginBottom: '5rem' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>Core Capabilities</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                            fontWeight: 800,
                            marginTop: '1.5rem',
                            textTransform: 'uppercase'
                        }}>
                            Our Software Development Services in Mumbai
                        </motion.h2>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        {[
                            { title: 'Full Stack Web Applications', desc: <>Customer portals, internal tools, storefronts like the one we built for <Link href="/projects/dariza" style={inlineLink}>Dariza Fabrics</Link>. React, Next.js and Node — fast on a budget Android over patchy 4G, because that is what half your users are holding.</>, img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80' },
                            { title: 'Custom ERP & CRM Development', desc: <>Off-the-shelf software rarely fits how Mumbai businesses actually operate. We design <Link href="/manufacturing-erp" style={inlineLink}>ERP</Link> and CRM systems built around your exact workflows, departments, and reporting needs.</>, img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
                            { title: 'AI Voice & Chat Agents', desc: 'Agents that pick up at 11pm, answer from your own catalogue and policies, qualify the caller, and write the enquiry into your CRM. Then they set the callback. Your team starts the morning with a list, not a voicemail box.', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80' },
                            { title: 'API & Systems Integration', desc: 'Tally, Razorpay, a courier API, the WhatsApp number everyone actually uses. Connected once, so the same order stops being typed into four places by three people.', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80' }
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-10%" }}
                                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] as const } } }}
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
                                    <Image src={s.img} alt={`${s.title} — software development services in Mumbai by Nexona`} fill style={{ objectFit: 'cover' }} />
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
                            See our recent software projects &rarr;
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Case studies — real figures only, see CASE_STUDIES */}
            <section style={{ backgroundColor: '#25221F', color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4.5rem', maxWidth: '820px' }}
                    >
                        <motion.span variants={fadeInUp} style={EYEBROW_STYLE}>Proof</motion.span>
                        <motion.h2 variants={fadeInUp} style={H2_STYLE}>
                            What Changed After We Built It
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={INTRO_STYLE}>
                            Three recent builds, with the numbers our clients measured. Two of them asked
                            not to be named. We respect that — and we are happy to walk you through either
                            build on a call.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        {CASE_STUDIES.map((c, i) => (
                            <motion.div
                                key={c.title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-10%" }}
                                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.8, ease: [0.23, 1, 0.32, 1] as const } } }}
                                style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '24px', padding: '2.5rem', backgroundColor: 'rgba(232,223,211,0.03)', display: 'flex', flexDirection: 'column' }}
                            >
                                <span style={{ fontFamily: INTER, fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 600 }}>{c.tag}</span>
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.35rem', fontWeight: 700, margin: '0.9rem 0 1.75rem 0', letterSpacing: '-0.01em', lineHeight: 1.25 }}>{c.title}</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingBottom: '1.75rem', marginBottom: '1.75rem', borderBottom: `1px solid rgba(232,223,211,0.12)` }}>
                                    {c.metrics.map((m) => (
                                        <div key={m.label}>
                                            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.85rem', fontWeight: 800, margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{m.num}</p>
                                            <p style={{ fontFamily: INTER, fontSize: '0.74rem', letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 700, marginTop: '0.4rem' }}>{m.label}</p>
                                        </div>
                                    ))}
                                </div>
                                <p style={{ fontFamily: INTER, opacity: 0.75, lineHeight: 1.7, margin: '0 0 1.5rem 0', flex: 1 }}>{c.body}</p>
                                <p style={{ fontFamily: INTER, fontSize: '0.95rem', opacity: 0.85, margin: 0, fontWeight: 600 }}>{c.link}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.7 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{ fontFamily: INTER, fontSize: '1.02rem', lineHeight: 1.8, marginTop: '3rem', maxWidth: '820px' }}
                    >
                        Clients you can look up yourself:{' '}
                        <Link href="/projects/dariza" style={inlineLink}>Dariza Fabrics</Link> (e-commerce),{' '}
                        <Link href="/projects/1327" style={inlineLink}>1327</Link> (brand and web), and{' '}
                        <Link href="/projects/froven" style={inlineLink}>Froven Innovations</Link> (a sales and rental platform for commercial refrigeration).
                    </motion.p>
                </div>
            </section>

            {/* Reviews. Quotes are VERBATIM from the verified Clutch review
                (Sep 2026) — never edit the wording. No star count printed and no
                AggregateRating schema; see the mobile page for the reasoning. */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
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

            {/* Industries */}
            <section style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4.5rem', maxWidth: '780px' }}
                    >
                        <motion.span variants={fadeInUp} style={EYEBROW_STYLE}>Industries</motion.span>
                        <motion.h2 variants={fadeInUp} style={H2_STYLE}>
                            Industries We Serve in Mumbai
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={INTRO_STYLE}>
                            Four, mostly. Each one breaks in its own way, and the first thing to fix is
                            rarely the thing the owner mentions on the first call.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {INDUSTRIES.map((ind, i) => (
                            <motion.div
                                key={ind.title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-10%" }}
                                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] as const } } }}
                                style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}
                            >
                                <span style={{ fontFamily: INTER, fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 600 }}>{ind.where}</span>
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.35rem', fontWeight: 700, margin: '0.9rem 0 1.25rem 0', letterSpacing: '-0.01em' }}>{ind.title}</h3>
                                <p style={{ fontFamily: INTER, opacity: 0.65, lineHeight: 1.7, margin: '0 0 1.25rem 0' }}>{ind.problem}</p>
                                <p style={{ fontFamily: INTER, opacity: 0.9, lineHeight: 1.7, margin: 0, fontWeight: 500, borderTop: `1px solid rgba(46,42,38,0.12)`, paddingTop: '1.25rem' }}>{ind.build}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cost — starting prices, then what moves them */}
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
                            What Software Costs in Mumbai — and What Drives It
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={INTRO_STYLE}>
                            Starting prices first. Each one is the smallest version that is genuinely
                            useful — not a teaser that doubles once you sign.
                        </motion.p>
                    </motion.div>

                    {[
                        { heading: 'Software', items: STARTING_PRICES },
                        { heading: 'Mobile apps', items: APP_STARTING_PRICES }
                    ].map((group: { heading: string; items: PriceItem[] }) => (
                        <div key={group.heading} style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontFamily: INTER, fontSize: '0.8rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55, margin: '0 0 1.25rem 0' }}>{group.heading}</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
                                {group.items.map((p, i) => (
                                    <motion.div
                                        key={p.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-8%" }}
                                        transition={{ delay: i * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }}
                                        style={{ border: `1px solid rgba(232,223,211,0.25)`, borderRadius: '20px', padding: '2rem', backgroundColor: 'rgba(232,223,211,0.05)' }}
                                    >
                                        <p style={{ fontFamily: INTER, fontSize: '0.95rem', fontWeight: 700, margin: '0 0 1rem 0' }}>{p.label}</p>
                                        <p style={{ fontFamily: INTER, fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 700, margin: 0 }}>Starts from</p>
                                        <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '2rem', fontWeight: 800, margin: '0.2rem 0 1rem 0', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{p.price}</p>
                                        <p style={{ fontFamily: INTER, fontSize: '0.92rem', lineHeight: 1.6, opacity: 0.7, margin: 0 }}>{p.note}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.8 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{ fontFamily: INTER, fontSize: '1.05rem', lineHeight: 1.8, margin: '1rem 0 3rem 0', maxWidth: '820px' }}
                    >
                        Where a project lands above its starting price comes down to six things. Judge
                        yours against them before talking to anyone. App details are on our{' '}
                        <Link href="/mobile-app-development-company-in-mumbai" style={inlineLink}>mobile app development</Link> page.
                    </motion.p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {COST_DRIVERS.map(([t, b], i) => (
                            <motion.div
                                key={t}
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
                        Three ways to work with us: a fixed scope for a defined first phase, a monthly
                        retainer once it is live, or a dedicated developer inside your team. Not a cost
                        driver — how many people use it. No per-user licence, ever. We scope first, then
                        give you the exact number in writing.
                    </motion.p>
                </div>
            </section>

            {/* How to choose */}
            <section style={{ backgroundColor: '#25221F', color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
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
                            How to Choose a Software Company in Mumbai
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={INTRO_STYLE}>
                            Six questions. Ask every company on your list — including us. The ones who go
                            vague here will go vague on your project too.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
                        {HOW_TO_CHOOSE.map(([q, a], i) => (
                            <motion.div
                                key={q}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-5%" }}
                                transition={{ delay: i * 0.06, duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{ display: 'flex', gap: isMobile ? '1rem' : '2rem', alignItems: 'flex-start', borderBottom: `1px solid rgba(232,223,211,0.12)`, paddingBottom: '2.25rem' }}
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

            {/* FAQ Section */}
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
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
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
                        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        lineHeight: 1.05,
                        marginBottom: '2rem'
                    }}>
                        Book a Free Scoping Call
                    </motion.h2>
                    <motion.p variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '1.2rem', opacity: 0.8, lineHeight: 1.7, maxWidth: '700px', margin: '0 auto' }}>
                        Tell us which workflow is eating your week, and we will tell you
                        honestly whether custom software is the answer — or whether something
                        off-the-shelf would do. Either way you leave with a clearer picture.
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
                        heading="Book a free scoping call"
                        submitLabel="Book Free Scoping Call"
                        onClose={closeContact}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
