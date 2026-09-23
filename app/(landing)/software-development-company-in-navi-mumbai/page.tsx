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
import { DARK, SAND, INTER, BUSINESS_PHONE, BUSINESS_PHONE_DISPLAY } from '../../lib/constants'
import { FAQ_ITEMS } from './content'

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

// The nodes we actually travel to, north to south. Plain text, not links —
// they are here for local relevance, not navigation.
const NODES = [
    'Airoli', 'Rabale', 'Ghansoli', 'Mahape', 'Turbhe', 'Koparkhairane',
    'Vashi', 'Sanpada', 'Nerul', 'Seawoods', 'CBD Belapur', 'Kharghar',
    'Kamothe', 'Ulwe', 'Panvel', 'Taloja'
]

const CLUTCH_URL = 'https://clutch.co/profile/nexona-labs'

// Five filled stars plus the score, linking out to the Clutch profile.
function ClutchRating({ color }: { color: string }) {
    return (
        <a
            href={CLUTCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nexona is rated 5.0 out of 5 on Clutch"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color, textDecoration: 'none', fontFamily: INTER, fontSize: '0.9rem', fontWeight: 600 }}
        >
            <span aria-hidden="true" style={{ color: '#E8B04B', letterSpacing: '0.1em', fontSize: '1rem' }}>★★★★★</span>
            <span>5.0 on Clutch</span>
        </a>
    )
}

// Industry cards: each tied to the part of Navi Mumbai where that trade sits.
const INDUSTRIES: { title: string; where: string; problem: string; build: React.ReactNode }[] = [
    {
        title: 'Manufacturing & Chemicals',
        where: 'MIDC Mahape · Rabale · Turbhe · Taloja',
        problem: 'Job cards on paper, a stock ledger that disagrees with the rack, dispatch typed into Tally twice — once at the gate, once at month end.',
        build: <>Production tracking and inventory that writes straight into Tally. More on that in our <Link href="/manufacturing-erp" style={inlineLink}>manufacturing ERP</Link> work.</>
    },
    {
        title: 'Logistics & Warehousing',
        where: 'JNPT · Uran · Taloja corridor',
        problem: 'Customers ring to ask where a consignment is. Someone rings the driver. Proof of delivery arrives as a blurry WhatsApp photo at 9pm.',
        build: 'Shipment tracking, a POD upload the driver can manage one-handed, and a status page the customer checks instead of calling.'
    },
    {
        title: 'Real Estate & Construction',
        where: 'Kharghar · Ulwe · the airport belt',
        problem: 'Site enquiries come in from portals, walk-ins and three WhatsApp numbers, then die in a shared inbox. Material requests get chased by phone.',
        build: 'Lead capture that routes each enquiry to one named person, plus a site material request flow with approvals on record.'
    },
    {
        title: 'Colleges & Coaching Centres',
        where: 'Kharghar · Nerul · CBD Belapur',
        problem: 'Admissions in one sheet, fees in another, attendance on a register nobody reconciles until the parent complains.',
        build: <>One system for admissions, fees and attendance. See our <Link href="/college-erp" style={inlineLink}>college ERP</Link> for what that looks like built out.</>
    },
    {
        title: 'Shipping & Maritime Offices',
        where: 'CBD Belapur',
        problem: 'Crew documents and certificate expiries tracked in Excel — until a certificate lapses and a vessel sits waiting on paperwork.',
        build: 'A document register with expiry alerts at 90, 30 and 7 days, and a record of who uploaded what.'
    },
    {
        title: 'Clinics & Healthcare',
        where: 'Vashi · Nerul · Seawoods',
        problem: 'Appointments booked on WhatsApp, patient history on paper cards, follow-ups that depend on the receptionist remembering.',
        build: 'Booking, patient records and automatic follow-up reminders — reception stops being the only place the schedule lives.'
    }
]

const ENGAGEMENTS: { title: string; desc: string }[] = [
    {
        title: 'Fixed-scope phase',
        desc: 'A defined first build. Written scope, fixed delivery date, a working link every two weeks until it ships. Most Navi Mumbai projects start here.'
    },
    {
        title: 'Monthly retainer',
        desc: 'Once the core system is live, new features and fixes on a steady monthly cadence. Good for the list that keeps growing after launch — and it always does.'
    },
    {
        title: 'Dedicated developer',
        desc: 'One engineer working with your team full-time, on your priorities, in your standups. For companies that have outgrown one-off projects but are not ready to hire.'
    },
    {
        title: 'Support after launch',
        desc: 'The eight weeks after go-live are included: bug fixes, the changes real usage exposes, a second round of team training. After that, an optional maintenance plan covers hosting, backups and updates.'
    }
]

const CASE_STUDY_RESULTS: { before: string; after: string; label: string }[] = [
    { before: '~20 hrs', after: '7 hrs', label: 'Admin work per week' },
    { before: '30 min', after: '<10 min', label: 'Time to create a quote' },
    { before: '300', after: '390+', label: 'Service jobs per month' }
]

export default function NaviMumbaiSoftwarePage() {
    const heroRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

    const [isMobile, setIsMobile] = useState(false)
    const [openFaq, setOpenFaq] = useState<number | null>(0)
    const [ctaHover, setCtaHover] = useState(false)
    const [callHover, setCallHover] = useState(false)

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
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
                        alt="Software development company in Navi Mumbai — Nexona builds custom business software"
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
                        <span style={{ fontFamily: INTER, fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Custom Software &middot; Automation &middot; Built For Startups</span>
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
                        Software Development <br /> Company <span style={{ color: 'transparent', WebkitTextStroke: `1px ${SAND}` }}>in Navi Mumbai</span>
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
                        <Link href="/" style={inlineLink}>Nexona</Link> builds custom software, business
                        management systems, and process automation for startups and growing companies
                        across Navi Mumbai. We come and watch how you work first. Then we build.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.45, ease: [0.23, 1, 0.32, 1] as const }}
                        style={{ marginTop: '2.75rem', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '1.25rem' : '2rem' }}
                    >
                        <button
                            onClick={openContact}
                            onMouseEnter={() => setCtaHover(true)}
                            onMouseLeave={() => setCtaHover(false)}
                            style={{
                                fontFamily: INTER,
                                fontSize: '0.95rem',
                                fontWeight: 700,
                                letterSpacing: '0.06em',
                                textTransform: 'uppercase',
                                padding: '1.1rem 2.4rem',
                                borderRadius: '99px',
                                border: `1px solid ${SAND}`,
                                backgroundColor: ctaHover ? 'transparent' : SAND,
                                color: ctaHover ? SAND : DARK,
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease, color 0.3s ease'
                            }}
                        >
                            Book a free discovery visit
                        </button>
                        <a
                            href={`tel:${BUSINESS_PHONE}`}
                            onMouseEnter={() => setCallHover(true)}
                            onMouseLeave={() => setCallHover(false)}
                            style={{
                                fontFamily: INTER,
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                color: SAND,
                                textDecoration: 'none',
                                borderBottom: `1px solid ${callHover ? SAND : 'rgba(232,223,211,0.35)'}`,
                                paddingBottom: '3px',
                                transition: 'border-color 0.3s ease'
                            }}
                        >
                            Or call {BUSINESS_PHONE_DISPLAY}
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.85 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        style={{ marginTop: '1.75rem' }}
                    >
                        <ClutchRating color={SAND} />
                    </motion.div>
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
                    {[
                        { num: '50+', label: 'Projects Shipped' },
                        { num: '24/7', label: 'Automations Running' },
                        { num: '10x', label: 'Operational Scaling' }
                    ].map((stat, i) => (
                        <motion.div key={i} variants={fadeInUp}>
                            <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '3rem', fontWeight: 800, margin: 0, color: SAND }}>{stat.num}</h3>
                            <p style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6, marginTop: '0.5rem' }}>{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Client logos */}
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
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                            alt="Nexona working with a Navi Mumbai startup team on a custom business management system"
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
                            Custom Software, Business Management &amp; Process Automation
                        </motion.h2>

                        {/* Answer-first paragraph: written to be quotable verbatim by
                            AI search and featured snippets. */}
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.85, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '1.5rem', fontWeight: 500 }}>
                            Nexona is a software development company in Navi Mumbai that builds three
                            things: custom software made for how your business actually runs, business
                            management systems that pull orders, customers, inventory and reporting into
                            one place, and process automation that deletes the repeat work. We work with
                            startups and growing companies from Airoli and Rabale through Vashi and CBD
                            Belapur down to Kharghar and Panvel.
                        </motion.p>

                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '1.5rem' }}>
                            Startups here hit the same wall at roughly the same size. Around eleven or
                            twelve people, the thing that got you here — a shared drive, four spreadsheets,
                            one WhatsApp group where decisions happen — quietly stops working. Nobody
                            announces it. You just notice that two people are entering the same order and
                            neither of them knows the other one did.
                        </motion.p>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '1.5rem' }}>
                            We saw a Belapur company run its entire client pipeline out of one Excel file.
                            2011 format. 14 tabs, one per account, and exactly one person permitted to open
                            it. She went on leave for nine days and the sales team basically stopped. That
                            is not a spreadsheet problem — well, it is, but the real problem is that the
                            business outgrew its tooling and nobody had a free week to notice.
                        </motion.p>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '3rem' }}>
                            So we start by watching. Who re-types what. Where approvals sit. Which report
                            somebody rebuilds by hand every Monday. Then we build the thing that fits —
                            not the thing the demo showed you.
                        </motion.p>

                        <motion.ul variants={staggerContainer} style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                'Custom software built around your workflow, not a template',
                                'Business management systems — orders, customers, stock, reporting',
                                'Process automation for the work nobody should still do by hand',
                                'Web and mobile apps your team will actually open',
                                'AI agents that answer, qualify, and update your systems',
                                'Integrations with Tally, payment gateways, and what you already run'
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

            {/* Built for startups */}
            <section style={{ backgroundColor: '#25221F', color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4.5rem', maxWidth: '780px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Startups, Specifically</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            Built for Navi Mumbai Startups
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.78, lineHeight: 1.8, fontSize: '1.12rem', marginTop: '2rem' }}>
                            Most agencies quote a startup like it is an enterprise with less money. Wrong
                            shape entirely. You do not need a platform. You need the two workflows eating
                            your week turned into software, shipped in six weeks, working while you raise
                            or grow into the rest.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                        {[
                            {
                                title: 'Phase one is small on purpose',
                                desc: 'We cut the first build down to the piece that pays for itself. Everything else waits. You get something live and useful before you have committed to a roadmap you might not want in four months.'
                            },
                            {
                                title: 'Change your mind, it is fine',
                                desc: 'Startups pivot. That is the job. We build in two-week sprints with a working link at the end of each one, so a change of direction costs you a fortnight, not the whole project.'
                            },
                            {
                                title: 'MVP that is not disposable',
                                desc: 'Plenty of MVPs get thrown away at the first real load. Ours don’t — same stack, same database design we would use at scale, just fewer features. You build on it instead of rebuilding it.'
                            },
                            {
                                title: 'You get the person who built it',
                                desc: 'No account manager, no ticket queue, no being forwarded to a team you have never met. Half our Navi Mumbai clients have nobody technical on staff and that works because there is nothing to escalate through.'
                            },
                            {
                                title: 'Automation before headcount',
                                desc: 'Before you hire two more people for operations, check what the software can absorb. Order entry, follow-up reminders, the Monday report somebody rebuilds by hand — that is usually four to six hours a week per person, gone.'
                            },
                            {
                                title: 'The stack is boring on purpose',
                                desc: 'React, Next.js, Node, Postgres. If you ever move this in-house or to another team — and you might — anyone competent picks it up. Software only we can maintain is a liability with a nice UI.'
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-10%" }}
                                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: (i % 3) * 0.12, duration: 0.8, ease: [0.23, 1, 0.32, 1] as const } } }}
                                style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '24px', padding: '2.5rem', backgroundColor: 'rgba(232,223,211,0.03)' }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.35rem', fontWeight: 700, margin: '0 0 1.25rem 0', letterSpacing: '-0.01em' }}>{item.title}</h3>
                                <p style={{ fontFamily: INTER, opacity: 0.75, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What automation actually removes */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '3.5rem' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Process Automation</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            What Automation Takes Off Your Week
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.78, lineHeight: 1.8, fontSize: '1.1rem', marginTop: '2rem', maxWidth: '720px' }}>
                            Not theory. These are the six that come up in nearly every discovery we run
                            in Navi Mumbai, roughly in the order they cost you the most.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gap: '0' }}>
                        {[
                            { from: 'Orders copied from email into a sheet, then into invoicing', to: 'Entered once. Everything downstream updates itself.' },
                            { from: 'Follow-ups somebody has to remember to send', to: 'Triggered by what the customer did, or didn’t do.' },
                            { from: 'The Monday report rebuilt by hand every week', to: 'Already sitting in your inbox at 8am.' },
                            { from: 'Approvals chased across three WhatsApp threads', to: 'One tap, logged, with a record of who said yes.' },
                            { from: 'Stock counts that disagree with what is on the rack', to: 'One number, updated the moment something moves.' },
                            { from: 'The same six customer questions, forty times a day', to: 'An AI agent that answers at 11pm and logs the enquiry.' }
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

            {/* Industries — each tied to where that trade actually sits in Navi Mumbai */}
            <section style={{ backgroundColor: '#25221F', color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4.5rem', maxWidth: '780px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Industries</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            Industries We Build For in Navi Mumbai
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.78, lineHeight: 1.8, fontSize: '1.1rem', marginTop: '2rem' }}>
                            Navi Mumbai is not one economy. It is the MIDC belt, the port corridor, a
                            construction boom around the airport, and a lot of offices in Belapur. Each one
                            breaks in its own way. These are the six we see most — and the thing that is
                            usually broken first.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                        {INDUSTRIES.map((ind, i) => (
                            <motion.div
                                key={ind.title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-10%" }}
                                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: (i % 3) * 0.12, duration: 0.8, ease: [0.23, 1, 0.32, 1] as const } } }}
                                style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '24px', padding: '2.5rem', backgroundColor: 'rgba(232,223,211,0.03)', display: 'flex', flexDirection: 'column' }}
                            >
                                <span style={{ fontFamily: INTER, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 600 }}>{ind.where}</span>
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.35rem', fontWeight: 700, margin: '0.9rem 0 1.25rem 0', letterSpacing: '-0.01em' }}>{ind.title}</h3>
                                <p style={{ fontFamily: INTER, opacity: 0.6, lineHeight: 1.7, margin: '0 0 1.25rem 0' }}>{ind.problem}</p>
                                <p style={{ fontFamily: INTER, opacity: 0.9, lineHeight: 1.7, margin: 0, fontWeight: 500, borderTop: `1px solid rgba(232,223,211,0.12)`, paddingTop: '1.25rem' }}>{ind.build}</p>
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
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>Start To Live</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.1rem, 4.2vw, 3.5rem)',
                            fontWeight: 800,
                            marginTop: '1.5rem',
                            textTransform: 'uppercase'
                        }}>
                            How a Navi Mumbai Project Runs
                        </motion.h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                        {[
                            { step: '01', title: 'We come to you', desc: 'Two or three hours at your office. We follow one order end to end and write down every place it gets re-entered. You keep the notes whatever happens next.' },
                            { step: '02', title: 'Scope, then argue', desc: 'You get a written phase plan. Then we push back on half of it — the parts you asked for that you will not actually use. Better to lose them now than in month five.' },
                            { step: '03', title: 'Build in the open', desc: 'Two-week sprints. A working link every fortnight, not a status update. If something is going sideways you find out in 14 days, not at handover.' },
                            { step: '04', title: 'Go live, then stay', desc: 'We train your team on-site, watch the first week closely, and fix what real usage exposes. The eight weeks after launch are usually when it gets genuinely good.' }
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
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>What You Can Hire Us For</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.1rem, 4.2vw, 3.75rem)',
                            fontWeight: 800,
                            marginTop: '1.5rem',
                            textTransform: 'uppercase'
                        }}>
                            Software Development Services in Navi Mumbai
                        </motion.h2>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        {[
                            {
                                title: 'Custom Software Development',
                                desc: 'Built for your workflow from a blank page. Web, mobile, internal tools — React, Next.js, Node. Works on a four-year-old Android on patchy 4G somewhere past Kamothe, because that is what your team is holding.',
                                img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80'
                            },
                            {
                                title: 'Business Management Systems',
                                desc: <>One place for orders, customers, inventory, invoicing and reporting. Call it an <Link href="/manufacturing-erp" style={inlineLink}>ERP</Link> if you like — the label matters less than the fact that your team stops asking three people where the number came from.</>,
                                img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80'
                            },
                            {
                                title: 'Process Automation',
                                desc: <>Order entry, reminders, approvals, weekly reports, stock updates. The work that is technically somebody’s job but shouldn’t be. Our <Link href="/ai-automation-agency" style={inlineLink}>AI and process automation</Link> team cuts it out, so you buy back hours before you buy headcount.</>,
                                img: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80'
                            },
                            {
                                title: 'Startup MVP Development',
                                desc: 'The smallest version that is genuinely usable, shipped fast, built on the stack you would keep at scale. Fewer features, same foundations — so month nine is an extension, not a rewrite.',
                                img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80'
                            },
                            {
                                title: 'CRM & Customer Systems',
                                desc: <>Follow-ups that don&apos;t die in someone&apos;s notebook. Pipeline, quotation history, and <Link href="/customer-retention-management-software" style={inlineLink}>retention tracking</Link> your field team updates from the car because it takes eleven seconds.</>,
                                img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80'
                            },
                            {
                                title: 'AI Agents & Integration',
                                desc: 'Voice and chat agents that pick up at 11pm, qualify the caller, and write the enquiry into your system. Plus the plumbing — Tally, payment gateways, courier APIs, the WhatsApp number everyone actually uses.',
                                img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80'
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
                                    <Image src={s.img} alt={`${s.title} — software development services in Navi Mumbai by Nexona`} fill style={{ objectFit: 'cover' }} />
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

            {/* Case study */}
            <section style={{ backgroundColor: '#25221F', color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ maxWidth: '820px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Case Study · Industrial Equipment Servicing</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            90 More Jobs a Month. Same Office Team.
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.12rem', marginTop: '2rem' }}>
                            Forty employees. Three hundred-odd service jobs a month. All of it running
                            through Excel, WhatsApp, email and a stack of paper job sheets — an enquiry would
                            arrive by email, get retyped into a sheet, turn into a quote somebody built by
                            hand, and then get assigned to an engineer over a phone call nobody logged.
                        </motion.p>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.12rem', marginTop: '1.5rem' }}>
                            We built one <Link href="/business-management-software-development" style={inlineLink}>business management system</Link> for
                            the whole chain. Enquiry, quotation, job assignment, engineer updates from site,
                            invoicing, payment. AI handles the repetitive middle: it reads incoming service
                            requests, pulls out the customer and machine details, writes the job summary and
                            sends the customer their update. Management gets a live dashboard — jobs, revenue,
                            payments, and how each engineer is actually doing.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '4rem' }}>
                        {CASE_STUDY_RESULTS.map((r, i) => (
                            <motion.div
                                key={r.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-5%" }}
                                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '24px', padding: '2.25rem', backgroundColor: 'rgba(232,223,211,0.03)' }}
                            >
                                <p style={{ fontFamily: INTER, fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 600, margin: '0 0 1rem 0' }}>{r.label}</p>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                                    <span style={{ fontFamily: INTER, fontSize: '1.25rem', opacity: 0.45, textDecoration: 'line-through', textDecorationThickness: '1px' }}>{r.before}</span>
                                    <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '2.5rem', fontWeight: 800 }}>{r.after}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ marginTop: '3rem', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: '1.5rem' }}
                    >
                        <p style={{ fontFamily: INTER, opacity: 0.7, lineHeight: 1.7, margin: 0, maxWidth: '640px' }}>
                            No new admin hires to get there. The capacity came out of the hours that used to
                            go on retyping.
                        </p>
                        <ClutchRating color={SAND} />
                    </motion.div>
                </div>
            </section>

            {/* Areas served — node-level local relevance */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '9rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.6 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}
                    >
                        Where We Work
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.7 }}
                        style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(1.9rem, 3.8vw, 3.1rem)',
                            fontWeight: 800,
                            marginTop: '1.5rem',
                            marginBottom: '1.5rem',
                            textTransform: 'uppercase'
                        }}
                    >
                        Areas We Serve Across Navi Mumbai
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.75 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ fontFamily: INTER, fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '640px', margin: '0 auto 3.5rem' }}
                    >
                        On-site anywhere on the Airoli–Panvel stretch. <Link href="/ai-automation-company-in-thane" style={inlineLink}>Thane</Link> and Bhiwandi too, though
                        the Navi Mumbai jobs are the ones we can reach before Palm Beach Road decides
                        otherwise.
                    </motion.p>

                    <motion.ul
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-5%" }}
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
                        style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}
                    >
                        {NODES.map((node) => (
                            <motion.li
                                key={node}
                                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                style={{
                                    fontFamily: INTER,
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    padding: '0.65rem 1.4rem',
                                    border: `1px solid rgba(232,223,211,0.18)`,
                                    borderRadius: '99px',
                                    backgroundColor: 'rgba(232,223,211,0.03)'
                                }}
                            >
                                {node}
                            </motion.li>
                        ))}
                    </motion.ul>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.7 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ fontFamily: INTER, fontSize: '1rem', lineHeight: 1.8, maxWidth: '640px', margin: '3.5rem auto 0' }}
                    >
                        Based across the harbour instead? Our{' '}
                        <Link href="/software-development-agency-mumbai" style={inlineLink}>software agency in Mumbai</Link>{' '}
                        page covers that side of the city.
                    </motion.p>
                </div>
            </section>

            {/* Engagement models & ownership — no pricing, by house rule */}
            <section style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ textAlign: 'center', marginBottom: '4.5rem' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>Engagement</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.1rem, 4.2vw, 3.5rem)',
                            fontWeight: 800,
                            marginTop: '1.5rem',
                            textTransform: 'uppercase'
                        }}>
                            How You Can Work With Us
                        </motion.h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                        {ENGAGEMENTS.map((e, i) => (
                            <motion.div
                                key={e.title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-10%" }}
                                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] as const } } }}
                                style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.3rem', fontWeight: 800, margin: '0 0 1rem 0', letterSpacing: '-0.01em' }}>{e.title}</h3>
                                <p style={{ fontFamily: INTER, fontSize: '1rem', opacity: 0.7, lineHeight: 1.65, margin: 0 }}>{e.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.6 }}
                        style={{ fontFamily: INTER, fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.7, textAlign: 'center', maxWidth: '760px', margin: '4rem auto 0' }}
                    >
                        Whichever you pick: you own the code and the IP, you get access to the repository
                        from day one, and we sign an NDA before discovery. Not extras. The default.
                    </motion.p>
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
                            Questions We Get Asked
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
                        Tell Us What Is Not Working
                    </motion.h2>
                    <motion.p variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '1.2rem', opacity: 0.8, lineHeight: 1.7, maxWidth: '700px', margin: '0 auto' }}>
                        You don&apos;t need a spec. You need one hour and an honest description of the part
                        of your week that keeps going wrong. We&apos;ll come to your office anywhere in Navi
                        Mumbai, look at it properly, and tell you whether custom software is even the
                        right answer. Sometimes it isn&apos;t.
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
                        heading="Get a free project consultation"
                        submitLabel="Book Free Consultation"
                        onClose={closeContact}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
