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

export default function BusinessManagementSoftwarePage() {
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
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop"
                        alt="Business management software development — Nexona unifies sales, inventory and operations in one custom system"
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
                        <span style={{ fontFamily: INTER, fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Sales &middot; Inventory &middot; Operations &middot; One System</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] as const }}
                        style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.1rem, 6vw, 5.25rem)',
                            fontWeight: 800,
                            lineHeight: 0.94,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.04em',
                            maxWidth: '1200px',
                            margin: 0
                        }}
                    >
                        Business Management <br /> Software <span style={{ color: 'transparent', WebkitTextStroke: `1px ${SAND}` }}>Development</span>
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
                            maxWidth: '840px',
                            letterSpacing: '0.02em',
                            lineHeight: 1.6
                        }}
                    >
                        <Link href="/" style={inlineLink}>Nexona</Link> is a business management
                        software development company. We build custom business management software for
                        startups and SMEs that have outgrown Excel — sales, inventory and operations
                        pulled into one system. Yours. Not a template with your logo on it.
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
                        { num: '4-7 wks', label: 'To Your First Live Module' },
                        { num: '0', label: 'Per-User Licence Fees' },
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
                            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop"
                            alt="Replacing Excel spreadsheets with custom business management software"
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
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Past The Spreadsheet Stage</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            lineHeight: 1.05,
                            textTransform: 'uppercase',
                            marginBottom: '2.5rem',
                            letterSpacing: '-0.02em'
                        }}>
                            Custom Software To Manage Business Operations
                        </motion.h2>

                        {/* Answer-first paragraph, written to be quotable verbatim by
                            AI search and featured snippets. */}
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.85, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '1.5rem', fontWeight: 500 }}>
                            Custom business management software is one system your whole operation runs
                            on — quotations, orders, stock, purchase, jobs, customers, approvals and the
                            reports on top of them — built around your process instead of the other way
                            round. Startups and growing SMEs come to us when the spreadsheet stops being
                            a tool and starts being a liability.
                        </motion.p>

                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '1.5rem' }}>
                            Nobody decides to outgrow Excel. It just happens. One sheet becomes four,
                            somebody adds a tab for the branch in Surat, then a second file appears
                            because the first one takes 40 seconds to open, and now two people are
                            editing two versions of the truth on a Tuesday afternoon.
                        </motion.p>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '1.5rem' }}>
                            A jewellery wholesaler we worked with had a stock workbook running 41 tabs.
                            Tab 12 fed tab 30 through a formula nobody could explain, because the person
                            who wrote it left in March 2023. Everyone knew. Nobody touched column K —
                            there was an actual rule about it, said out loud to new joiners. They were
                            doing ₹9 crore a year on a file with a haunted column.
                        </motion.p>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '3rem' }}>
                            We did not replace all 41 tabs. Six of them mattered. The rest were reports,
                            which the database now generates on its own — well, most of them. Two are
                            still exported to Excel because their auditor wants it that way and honestly
                            that is a fine reason.
                        </motion.p>

                        <motion.ul variants={staggerContainer} style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                'Sales and inventory management software sharing one live database',
                                'Operations management software for jobs, tasks and field teams',
                                'Custom internal tools where no off-the-shelf app fits',
                                'Custom dashboard development for owners, sales and warehouse',
                                'Workflow automation software development for the repeat steps',
                                'Role-based access, approvals and an audit trail Excel never had'
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

            {/* Signals — the "have we outgrown Excel yet" section. Built for AEO:
                a model answering "when should we replace spreadsheets" can lift
                this whole block. */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '3.5rem' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Spreadsheet / System</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            Signs You Have Outgrown Excel
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.78, lineHeight: 1.8, fontSize: '1.1rem', marginTop: '2rem', maxWidth: '760px' }}>
                            Eight of these come up in almost every first call, roughly in the order they
                            cost the most. Four or more and you should be looking at replacing Excel with
                            software rather than adding another tab to it.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gap: '0' }}>
                        {[
                            { from: 'Two people editing two versions of the same file', to: 'One database. Everyone sees the same number at the same second.' },
                            { from: 'Stock in the sheet disagrees with stock on the rack', to: 'Orders reserve it, dispatch decrements it. No manual adjusting.' },
                            { from: 'A quote sent for something you cannot actually supply', to: 'Quotation checks live availability before it goes out.' },
                            { from: 'The Monday report someone rebuilds by hand every week', to: 'A dashboard that is already correct when you open your laptop.' },
                            { from: 'Nobody knows who changed the price on row 340', to: 'Every edit stamped with a name, a time and the old value.' },
                            { from: 'Approvals happening across four WhatsApp threads', to: 'One tap, logged, with a record of who said yes and when.' },
                            { from: 'A new hire needs six weeks to learn the file', to: 'Screens that explain themselves. Two days, not six weeks.' },
                            { from: 'The whole business depends on one person’s workbook', to: 'A system the company owns, backed up, that survives resignations.' }
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

            {/* Off-the-shelf vs custom — definitional section for AEO/GEO. */}
            <section style={{ backgroundColor: '#25221F', color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4rem', maxWidth: '840px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>The Honest Comparison</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            When Should A Startup Build Custom Internal Tools?
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.12rem', marginTop: '2rem' }}>
                            Short version: when you are about to hire someone whose job is mostly moving
                            information between systems. That is the moment. Not a revenue number, not a
                            headcount — the moment a salary starts being spent on copy-paste. Under 15
                            people, off-the-shelf plus a bit of discipline is usually the right answer and
                            we will say so on the call.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2.5rem' }}>
                        {[
                            {
                                kind: 'Stay Off-The-Shelf',
                                line: 'Your process is normal. Bending it slightly costs you nothing.',
                                points: [
                                    'Under about 15 people and growing slowly',
                                    'One or two workarounds, and they are mild',
                                    'Nobody is doing daily re-entry between two systems',
                                    'The tools you pay for cover 85% of the job'
                                ],
                                note: 'Cheaper, faster, and we will tell you this for free rather than sell you a build.'
                            },
                            {
                                kind: 'Build Custom Internal Tools',
                                line: 'Your process is the business, and generic software is slowing it down.',
                                points: [
                                    'A pricing, approval or stock rule no product supports',
                                    'Three or more spreadsheet workarounds propping up the SaaS',
                                    'You are about to hire for operations because of admin load',
                                    'Per-user licences now hurt every time you grow the team'
                                ],
                                note: 'A one-time build against a salary that repeats every year.'
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

            {/* Modules — what a unified business management system contains */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4rem', maxWidth: '820px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>What Goes Inside</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            A Unified Business Management System
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.12rem', marginTop: '2rem' }}>
                            Software to manage sales, inventory and operations in one place means these
                            six modules sharing a single database — not six apps with a nightly sync
                            between them. You will not start with all six. Most clients begin with two.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                        {[
                            {
                                title: 'Sales & customers',
                                body: <>Enquiries, quotations, orders, pricing rules with their exceptions, and the follow-up nobody remembers to send. Closest thing we have shipped is the <Link href="/projects/automated-crm" style={inlineLink}>automated sales tracker</Link> — every customer, full history, one screen.</>
                            },
                            {
                                title: 'Inventory & purchase',
                                body: <>Live stock by location, reservations against confirmed orders, reorder points, GRN and supplier records. The rack and the screen finally agree. <Link href="/projects/froven" style={inlineLink}>Froven</Link> runs sales and rental stock this way.</>
                            },
                            {
                                title: 'Operations & jobs',
                                body: 'Work assigned, tracked and closed — production runs, service jobs, deliveries, field visits. Operations management software your floor staff use on a phone, because they are not sitting at a desktop.'
                            },
                            {
                                title: 'Dashboards & reporting',
                                body: <>Custom dashboard development for the three people who need three different views. Owner sees margin and cash — much like the <Link href="/projects/profit-dashboard" style={inlineLink}>profit dashboard</Link> we built. Warehouse sees today. Sales sees their own pipeline.</>
                            },
                            {
                                title: 'Approvals & permissions',
                                body: <>Who can discount past 12%, who signs off a purchase over ₹50,000, who is not allowed to see supplier cost. Role-based access, the same way our <Link href="/projects/multi-tenant-chat" style={inlineLink}>multi-tenant platform</Link> isolates one org from another. Enforced by the software, not by trust.</>
                            },
                            {
                                title: 'Automation layer',
                                body: <>The repeat steps removed — reminders, status updates, scheduled reports, stock alerts. Built with the same team that handles our <Link href="/ai-automation-agency" style={inlineLink}>business process automation</Link> and <Link href="/ai-agent-development-company" style={inlineLink}>AI agent development</Link> work, using the <Link href="/projects/workflow-connector" style={inlineLink}>workflow connector</Link> approach.</>
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ delay: (i % 3) * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '24px', padding: '2.5rem', backgroundColor: 'rgba(232,223,211,0.03)' }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.35rem', fontWeight: 700, margin: '0 0 1.25rem 0', letterSpacing: '-0.01em' }}>{item.title}</h3>
                                <p style={{ fontFamily: INTER, opacity: 0.75, lineHeight: 1.7, margin: 0 }}>{item.body}</p>
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
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>Spreadsheet To System</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.1rem, 4.2vw, 3.5rem)',
                            fontWeight: 800,
                            marginTop: '1.5rem',
                            textTransform: 'uppercase'
                        }}>
                            How We Replace Excel With Software
                        </motion.h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                        {[
                            { step: '01', title: 'Open your actual files', desc: 'Not a requirements workshop. We sit with the person who uses the workbook and watch them do a normal Tuesday. Which columns they use, which they ignore, what they fix by hand every time.' },
                            { step: '02', title: 'Cut the scope in half', desc: 'You get a phase plan, a fixed number, and an argument. Some of what you asked for will not repay the build cost — a 41-tab file is rarely 41 tabs of value. Better to hear that before invoicing starts.' },
                            { step: '03', title: 'Ship the first module', desc: 'Four to seven weeks to something live with your real data in it. The spreadsheet stays open beside it for two or three weeks. Nobody has to trust the new thing on faith.' },
                            { step: '04', title: 'Add the next one', desc: 'Module two starts once module one is genuinely being used, not once it is signed off. Then dashboards, then automation. You are running on it long before the project ends.' }
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
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            marginTop: '1.5rem',
                            textTransform: 'uppercase'
                        }}>
                            Business Management Software Development Services
                        </motion.h2>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        {[
                            {
                                title: 'Custom Business Management Software',
                                desc: <>The full build — sales, inventory, purchase, operations, users and reporting on one database. Phased, so you are using part of it inside two months rather than waiting for a launch date that keeps moving. <Link href="/projects" style={inlineLink}>Our shipped work</Link> is mostly this.</>,
                                img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80'
                            },
                            {
                                title: 'Custom Internal Tools',
                                desc: <>One sharp tool for one painful workflow. An internal tools development company is really just people who will build the thing four staff open forty times a day — a <Link href="/projects/multi-tenant-chat" style={inlineLink}>secure internal platform</Link>, say — properly, instead of selling you a seat licence.</>,
                                img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80'
                            },
                            {
                                title: 'Sales & Inventory Management Software',
                                desc: <>Quotation checks live stock. Order reserves it. Dispatch decrements it. No overnight sync, no month-end reconciliation, no argument about whose number is right. The <Link href="/projects/automated-crm" style={inlineLink}>sales side</Link> plugs straight into it.</>,
                                img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80'
                            },
                            {
                                title: 'Operations Management Software',
                                desc: <>Jobs, schedules, field teams, deliveries and the status of all of it. Mobile-first where the work happens away from a desk — a supervisor is not going to walk back to a computer to mark something done. Often paired with a <Link href="/projects/workflow-connector" style={inlineLink}>connector</Link> into your existing apps.</>,
                                img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80'
                            },
                            {
                                title: 'Custom Dashboard Development',
                                desc: <>Live operational dashboards built on the same database the business runs on, so nothing is a stale export — see the <Link href="/projects/profit-dashboard" style={inlineLink}>profit dashboard</Link>. Pairs well with the <Link href="/customer-retention-management-software" style={inlineLink}>retention side</Link> when churn is the number you actually watch.</>,
                                img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'
                            },
                            {
                                title: 'Excel Migration',
                                desc: <>Your workbooks moved into a real system without losing the history in them. We start with one file, not eleven. If it turns into something bigger it usually becomes a full <Link href="/manufacturing-erp" style={inlineLink}>ERP</Link> — but it rarely starts there.</>,
                                img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80'
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
                                    <Image src={s.img} alt={`${s.title} — business management software development by Nexona`} fill style={{ objectFit: 'cover' }} />
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

            {/* Who we build for — sector relevance plus internal links out */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '4rem', maxWidth: '800px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Who This Is For</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            Startups And SMEs We Build For
                        </motion.h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                        {[
                            {
                                title: 'Startups scaling past 12 people',
                                body: <>Business management software for startups is mostly about not hiring three coordinators. Startup operations software first, headcount second — the <Link href="/software-development-company-in-navi-mumbai" style={inlineLink}>founders we work with</Link> usually find four to six hours a week per person hiding in admin. Without a technical co-founder to sequence it, that decision sits with a <Link href="/fractional-cto-as-a-service" style={inlineLink}>fractional CTO</Link>.</>
                            },
                            {
                                title: 'Distributors & wholesalers',
                                body: <>Multi-location stock, credit limits, price lists that differ by customer, dispatch paperwork. This is where a unified sales and inventory system pays for itself fastest — usually inside nine months. <Link href="/projects/froven" style={inlineLink}>Froven</Link> is the sales-and-rental version of it.</>
                            },
                            {
                                title: 'Small manufacturers',
                                body: <>Job cards, material issue, production reporting, dispatch. Some of it stays a lean internal tool. Some grows into a proper <Link href="/erp-systems-for-manufacturers" style={inlineLink}>ERP for manufacturers</Link>, which is a different conversation and a different budget.</>
                            },
                            {
                                title: 'Service & field businesses',
                                body: <>Scheduling, technician assignment, on-site status updates, billing off completed work. Custom operations software that runs on the phone in a van, not just the laptop in the office. Customer side usually goes to an <Link href="/projects/ai-support-hub" style={inlineLink}>AI support hub</Link>.</>
                            },
                            {
                                title: 'Retail & D2C brands',
                                body: <>Orders, returns, stock across channels, and the storefront itself. Sometimes that means a full <Link href="/projects/dariza" style={inlineLink}>e-commerce platform</Link>, sometimes a <Link href="/projects/1327" style={inlineLink}>custom product configurator</Link> bolted onto the operations system behind it.</>
                            },
                            {
                                title: 'Growing SMEs on legacy tools',
                                body: <>Custom software for growing SMEs stuck between Tally, a 2014 desktop app and six spreadsheets. We keep what works and build the missing layer — full context on how our <Link href="/software-development-agency-mumbai" style={inlineLink}>development team</Link> approaches it.</>
                            },
                            {
                                title: 'Education & institutions',
                                body: <>Admissions, fees, attendance, the accreditation report six people assemble by hand. Mostly handled by our <Link href="/college-erp" style={inlineLink}>college ERP</Link> work, though smaller institutes often want just two modules.</>
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ delay: (i % 3) * 0.12, duration: 0.7, ease: [0.23, 1, 0.32, 1] as const }}
                                style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '24px', padding: '2.5rem', backgroundColor: 'rgba(232,223,211,0.03)' }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.35rem', fontWeight: 700, margin: '0 0 1.25rem 0', letterSpacing: '-0.01em' }}>{item.title}</h3>
                                <p style={{ fontFamily: INTER, opacity: 0.75, lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What bolts on afterwards — the second-phase work, and the internal
                link surface into the project detail pages. */}
            <section style={{ backgroundColor: '#25221F', color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={staggerContainer}
                        style={{ marginBottom: '3.5rem', maxWidth: '820px' }}
                    >
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Phase Two, Usually</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            lineHeight: 1.08,
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            What Bolts On Once The Data Is Clean
                        </motion.h2>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.12rem', marginTop: '2rem' }}>
                            None of this works on a spreadsheet. It needs one database with real records
                            in it, which is the actual reason to build the management system first. These
                            are all things we have shipped for other clients — click through if you want
                            the detail rather than the summary.
                        </motion.p>
                    </motion.div>

                    <div style={{ display: 'grid', gap: '0' }}>
                        {[
                            {
                                href: '/projects/voice-agent',
                                label: 'AI voice agent',
                                body: 'Picks up when nobody can, checks order status against your live system, logs the call.'
                            },
                            {
                                href: '/projects/rag-chatbot',
                                label: 'Enterprise RAG chatbot',
                                body: 'Answers staff and customer questions from your own documents instead of a guess.'
                            },
                            {
                                href: '/projects/agentic-web-assistant',
                                label: 'Agentic web assistant',
                                body: 'A site that explains your own services and pushes the enquiry into your system.'
                            },
                            {
                                href: '/projects/ai-support-hub',
                                label: 'AI customer support hub',
                                body: 'The same six questions, forty times a day, handled at 11pm and logged properly.'
                            },
                            {
                                href: '/projects/social-autopilot',
                                label: 'Social media autopilot',
                                body: 'Scheduling and content off the back of what the business is actually shipping.'
                            },
                            {
                                href: '/projects/automated-crm',
                                label: 'Automated sales & CRM',
                                body: 'Cold leads flagged, follow-ups sent, pipeline reports nobody has to assemble.'
                            }
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
                                    gap: isMobile ? '0.4rem' : '2.5rem',
                                    alignItems: isMobile ? 'flex-start' : 'baseline',
                                    padding: '1.6rem 0',
                                    borderBottom: `1px solid rgba(232,223,211,0.12)`
                                }}
                            >
                                <Link href={row.href} style={{ ...inlineLink, fontFamily: INTER, fontSize: '1.05rem', fontWeight: 700, flex: isMobile ? undefined : '0 0 34%', lineHeight: 1.5 }}>
                                    {row.label}
                                </Link>
                                <p style={{ fontFamily: INTER, fontSize: '1.05rem', lineHeight: 1.6, margin: 0, flex: 1, opacity: 0.72 }}>
                                    {row.body}
                                </p>
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
                            Questions We Get Before The Build
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
                        Send Us The Spreadsheet
                    </motion.h2>
                    <motion.p variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '1.2rem', opacity: 0.8, lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
                        No spec needed. One call, the file you dread opening, and an honest read on
                        whether custom software is even the right move yet. Sometimes the answer is
                        &ldquo;fix the process first, then call us in eight months&rdquo; — and we would
                        rather say that than sell you a build you are not ready for.
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
                        heading="Get a free systems review"
                        submitLabel="Book Free Systems Review"
                        onClose={closeContact}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
