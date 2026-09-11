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

export default function AiAgentDevelopmentCompanyPage() {
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
                        src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2000&auto=format&fit=crop"
                        alt="AI agent development company — Nexona engineers custom AI agents in code"
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
                        <span style={{ fontFamily: INTER, fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>LangGraph &middot; RAG &middot; Python &middot; Your Infrastructure</span>
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
                        AI Agent Development <span style={{ color: 'transparent', WebkitTextStroke: `1px ${SAND}` }}>Company</span>
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
                        <Link href="/" style={inlineLink}>Nexona</Link> is an AI agent development company
                        that builds custom AI agents in code — your data, your infrastructure, your
                        repository at the end of it. Not a canvas you rent. We test before we ship.
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
                        { num: '6-10 wks', label: 'To A Production Agent' },
                        { num: '150-400', label: 'Test Cases Before Launch' },
                        { num: '100%', label: 'Code Ownership, Yours' }
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
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
                            alt="Custom AI agent development in Python and LangGraph — Nexona engineering work"
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
                        <motion.span variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>How We Build</motion.span>
                        <motion.h2 variants={fadeInUp} style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.1rem, 4.2vw, 3.75rem)',
                            fontWeight: 800,
                            lineHeight: 1.05,
                            textTransform: 'uppercase',
                            marginBottom: '2.5rem',
                            letterSpacing: '-0.02em'
                        }}>
                            The Demo Takes Four Days. The Agent Takes Eight Weeks.
                        </motion.h2>

                        {/* Answer-first paragraph, written to be quotable verbatim by
                            AI search and featured snippets. */}
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.85, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '1.5rem', fontWeight: 500 }}>
                            Custom AI agent development is four jobs, not one: connect the agent to your
                            real data, define what it is allowed to touch, build an evaluation set that
                            proves it works, then run it where you can watch it. The model itself is about
                            a fifth of the effort. Everything wrapped around the model is the rest.
                        </motion.p>

                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '1.5rem' }}>
                            The first demo always lands. Four days, maybe five, and it answers questions in
                            your tone of voice and everyone in the room goes quiet for a second. Enjoy it.
                            That version would fall over in about nine minutes of real traffic.
                        </motion.p>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '1.5rem' }}>
                            One build — a support agent for a company selling industrial valves — spent
                            three of its eight weeks on a single problem. Their part numbers looked like
                            <span style={{ whiteSpace: 'nowrap' }}> VG-4471-B</span> and customers typed them eleven different ways. Spaces, no
                            spaces, lowercase b, the letter O where a zero should be. The agent kept
                            confidently answering about the wrong valve. Not hallucinating exactly, but
                            close enough that it did not matter what you called it.
                        </motion.p>
                        <motion.p variants={fadeInUp} style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '3rem' }}>
                            Fixing that was not a prompt. It was a normalisation layer and 240 test cases
                            written by someone in their sales team who knew every way a customer could get
                            a part number wrong. That is what the eight weeks is.
                        </motion.p>

                        <motion.ul variants={staggerContainer} style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                'Retrieval agents that answer against your own documents',
                                'Support and voice agents wired into your live systems',
                                'Internal copilots for the team, not for customers',
                                'Multi-agent systems where work is handed between agents',
                                'Evaluation harnesses so changes can be proven, not guessed',
                                'Deployed in your cloud account, monitored, and yours to keep'
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

            {/* Agent vs chatbot — definitional section, built for AEO/GEO: an LLM
                answering "what is an AI agent" can lift this whole block. Kept
                deliberately technical so it does not overlap the automation
                pillar's "AI automation vs process automation" block. */}
            <section style={{ backgroundColor: '#25221F', color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.7 }}
                        style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            marginBottom: '1.75rem',
                            lineHeight: 1.05
                        }}
                    >
                        An Agent Is Not A Chatbot
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.85 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        style={{ fontFamily: INTER, fontSize: '1.15rem', lineHeight: 1.8, maxWidth: '860px', marginBottom: '4rem' }}
                    >
                        An AI agent takes a goal, picks its own steps, calls tools to carry them out, then
                        checks whether it actually worked. A chatbot answers and stops. Same model
                        underneath — completely different engineering problem, and a completely different
                        set of ways to get hurt.
                    </motion.p>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2.5rem' : '4rem' }}>
                        {[
                            {
                                kind: 'Chatbot',
                                body: 'Answers a question from what it was given. Has no memory of your systems, cannot act, cannot check itself. Useful for FAQs and not much past that. Fails softly — a wrong answer, and the person moves on.',
                                points: ['One turn in, one turn out', 'No access to live data', 'Cannot take an action', 'Cheap to build, cheap to be wrong']
                            },
                            {
                                kind: 'Agent',
                                body: 'Holds a goal across many steps. Reads your live data, calls your systems, decides what to do next, retries when something fails, escalates when it is out of its depth. Fails hard, which is exactly why the guardrails are the build.',
                                points: ['Many steps, held state', 'Reads and writes real systems', 'Takes actions under explicit limits', 'Needs evaluation before it goes live']
                            }
                        ].map((col, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.6, delay: i * 0.12 }}
                                style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '20px', padding: isMobile ? '2rem' : '2.75rem' }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.5rem', fontWeight: 800, margin: '0 0 1rem 0', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{col.kind}</h3>
                                <p style={{ fontFamily: INTER, fontSize: '1.05rem', lineHeight: 1.7, opacity: 0.75, margin: '0 0 1.75rem 0' }}>{col.body}</p>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                    {col.points.map((p, j) => (
                                        <li key={j} style={{ fontFamily: INTER, fontSize: '0.98rem', opacity: 0.7, display: 'flex', gap: '0.9rem' }}>
                                            <span style={{ opacity: 0.5 }}>—</span>{p}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Build-in-code positioning — the differentiator, and the AEO answer to
                "custom vs no-code agent". */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.7 }}
                        style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            marginBottom: '2rem',
                            lineHeight: 1.05
                        }}
                    >
                        Written In Code. On Purpose.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.85 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        style={{ fontFamily: INTER, fontSize: '1.15rem', lineHeight: 1.8, maxWidth: '880px', marginBottom: '1.5rem' }}
                    >
                        Build a custom AI agent when the agent is the product. Use a no-code platform when
                        it is the plumbing — genuinely, if your problem is moving a form submission into a
                        CRM, go and use one, you will be live this afternoon. That is a different job and
                        it belongs on our <Link href="/ai-automation-agency" style={inlineLink}>AI automation</Link> side.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.8 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        style={{ fontFamily: INTER, fontSize: '1.15rem', lineHeight: 1.8, maxWidth: '880px', marginBottom: '4rem' }}
                    >
                        Canvases stop being the right answer at three points, and they are fairly specific
                        points. When you need to prove the thing works before customers touch it. When
                        per-run pricing meets actual volume. When the logic branches in a way you cannot
                        draw. Also — and nobody puts this in the pitch — you are renting. It runs on their
                        infrastructure, under their pricing, and leaving means building it again.
                    </motion.p>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '2rem' : '2.5rem' }}>
                        {[
                            { t: 'Evaluated', d: 'A written test set of real examples the agent has to pass before launch, rerun on every change. You can see the score. So can we.' },
                            { t: 'Owned', d: 'Your repo, your cloud account, from week one. No licence, no per-seat fee, nothing running on our side that you pay to keep alive.' },
                            { t: 'Bounded', d: 'An explicit list of what the agent may never do alone. Refunds, contracts, prices, money out — draft-and-approve, always.' }
                        ].map((c, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-8%" }}
                                transition={{ duration: 0.55, delay: i * 0.1 }}
                                style={{ borderTop: `1px solid rgba(232,223,211,0.2)`, paddingTop: '1.75rem' }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.35rem', fontWeight: 800, margin: '0 0 0.9rem 0', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{c.t}</h3>
                                <p style={{ fontFamily: INTER, fontSize: '1rem', lineHeight: 1.7, opacity: 0.72, margin: 0 }}>{c.d}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What we build — agent types, each linked to real shipped work so the
                page has proof rather than claims. */}
            <section style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.7 }}
                        style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            marginBottom: '4rem',
                            lineHeight: 1.05
                        }}
                    >
                        Agents We Have Actually Shipped
                    </motion.h2>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                        {[
                            {
                                title: 'Retrieval Assistants',
                                desc: <>Answers drawn from your own documents, with the source attached so somebody can check it. Policy manuals, product catalogues, three years of support tickets. Built as <Link href="/projects/rag-chatbot" style={inlineLink}>an enterprise RAG chatbot</Link> most recently.</>,
                                img: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&q=80'
                            },
                            {
                                title: 'Voice Agents',
                                desc: <>Picks up, understands what the caller wants, checks the real system, books or answers or escalates. Our <Link href="/projects/voice-agent" style={inlineLink}>AI voice agent</Link> work — latency matters more than cleverness here, by a lot.</>,
                                img: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&q=80'
                            },
                            {
                                title: 'Support Agents',
                                desc: <>Reads the incoming message, pulls the account, drafts a reply, resolves the easy 60% and routes the rest with context attached. See the <Link href="/projects/ai-support-hub" style={inlineLink}>AI customer support hub</Link>.</>,
                                img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80'
                            },
                            {
                                title: 'Browser & Tool Agents',
                                desc: <>Agents that operate software the way a person would when no API exists. Slow, occasionally uncanny, extremely useful against legacy portals. The <Link href="/projects/agentic-web-assistant" style={inlineLink}>agentic web assistant</Link> came out of exactly that.</>,
                                img: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=600&q=80'
                            },
                            {
                                title: 'Multi-Tenant Agent Platforms',
                                desc: <>One agent system, many customers, strict data isolation between them. Harder than it sounds and unforgiving when it goes wrong — see <Link href="/projects/multi-tenant-chat" style={inlineLink}>secure multi-tenant chat</Link>.</>,
                                img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80'
                            },
                            {
                                title: 'Internal Copilots',
                                desc: <>Not customer-facing. An agent your own team asks — where is this order, what did we quote them last year, draft the follow-up. Often wired straight into your <Link href="/customer-retention-management-software" style={inlineLink}>CRM</Link>.</>,
                                img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80'
                            }
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-8%" }}
                                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                                style={{ display: 'flex', flexDirection: 'column' }}
                            >
                                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                                    <Image src={s.img} alt={`${s.title} — AI agent development by Nexona`} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>{s.title}</h3>
                                <p style={{ fontFamily: INTER, fontSize: '1.02rem', lineHeight: 1.7, opacity: 0.78, margin: 0 }}>{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div style={{ marginTop: '4rem' }}>
                        <Link href="/projects" style={{
                            fontFamily: INTER,
                            fontSize: '0.9rem',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            color: DARK,
                            textDecoration: 'underline',
                            textUnderlineOffset: '6px'
                        }}>
                            See every project
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stack section — targets the LangChain/LangGraph and RAG/fine-tuning
                comparison queries as extractable H3 blocks. */}
            <section style={{ backgroundColor: '#25221F', color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.7 }}
                        style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            marginBottom: '3.5rem',
                            lineHeight: 1.05
                        }}
                    >
                        The Decisions That Actually Matter
                    </motion.h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        {[
                            {
                                q: 'RAG or fine-tuning?',
                                a: 'RAG, nine times out of ten. If the agent does not know your products, prices or policies, that is a retrieval problem — the documents live outside the model, you update them like any other file, and the answer can cite its source. Fine-tuning is for when it knows the facts and still does not sound like you. We have done it twice in three years and undid one.'
                            },
                            {
                                q: 'LangChain or LangGraph?',
                                a: 'LangGraph for production, LangChain for the bits around it. LangChain chains steps, which holds up until the agent has to loop, retry, branch or stop and wait for a human. LangGraph makes the run a graph with real state, so you can pause it, resume it, and replay exactly what happened when somebody complains. Sometimes neither — plain Python, no framework, when the job is small. Which is more often than you would guess.'
                            },
                            {
                                q: 'Which model?',
                                a: 'Whichever survives your evaluation set, and it changes. We build model-agnostic so swapping is a config change rather than a rewrite, because the frontier moves every few months and you should not be rebuilding each time it does. Cost usually decides it — the cheapest model that passes is the right model.'
                            },
                            {
                                q: 'Where does it run?',
                                a: 'Your cloud account. AWS, GCP, Azure, or a box in your own server room if that is genuinely what compliance requires. We deploy into your infrastructure and hand over the keys, which sounds obvious and is not what most of this industry does.'
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-8%" }}
                                transition={{ duration: 0.55, delay: i * 0.08 }}
                                style={{ borderLeft: `2px solid rgba(232,223,211,0.25)`, paddingLeft: isMobile ? '1.5rem' : '2.5rem' }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: isMobile ? '1.35rem' : '1.65rem', fontWeight: 800, margin: '0 0 1rem 0', letterSpacing: '-0.01em' }}>{item.q}</h3>
                                <p style={{ fontFamily: INTER, fontSize: '1.08rem', lineHeight: 1.75, opacity: 0.78, margin: 0, maxWidth: '820px' }}>{item.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cost drivers — targets "AI agent development cost". Deliberately
                carries NO figures: pricing is scoped per project, so the section
                answers what moves the number instead of publishing one. */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.7 }}
                        style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            marginBottom: '1.75rem',
                            lineHeight: 1.05
                        }}
                    >
                        What Drives AI Agent Development Cost
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.85 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        style={{ fontFamily: INTER, fontSize: '1.15rem', lineHeight: 1.8, maxWidth: '860px', marginBottom: '3.5rem' }}
                    >
                        We scope before we quote, so there is no price list here. Three things move the
                        number more than anything else, and none of them is which model you end up on.
                    </motion.p>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '2rem' : '2.5rem', marginBottom: '3rem' }}>
                        {[
                            { t: 'Surface Area', p: 'How many systems', d: 'One job against two systems is the floor. Every extra system the agent has to read from or write into moves the number, and not in a straight line.' },
                            { t: 'Data Condition', p: 'How messy it is', d: 'Already structured and sitting in a database is cheap. Photographs of printouts are not. Most of the spread in any quote we give comes from this one.' },
                            { t: 'Autonomy', p: 'How much it may do alone', d: 'An agent that drafts for a human to approve costs less than one allowed to act by itself, because the second needs far more proving before it goes anywhere near a customer.' }
                        ].map((c, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-8%" }}
                                transition={{ duration: 0.55, delay: i * 0.1 }}
                                style={{ border: `1px solid rgba(232,223,211,0.15)`, borderRadius: '20px', padding: isMobile ? '2rem' : '2.5rem' }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.3rem', fontWeight: 800, margin: '0 0 0.75rem 0', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{c.t}</h3>
                                <p style={{ fontFamily: INTER, fontSize: '1.25rem', fontWeight: 700, margin: '0 0 1rem 0' }}>{c.p}</p>
                                <p style={{ fontFamily: INTER, fontSize: '1rem', lineHeight: 1.7, opacity: 0.72, margin: 0 }}>{c.d}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.8 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        style={{ fontFamily: INTER, fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '860px' }}
                    >
                        The one people forget is the running cost. Model usage is billed by volume rather
                        than by seat, so it moves with how hard the agent actually works — which is the
                        opposite of how most software you buy behaves. We put that beside the build price
                        in the proposal. A project that dies in month seven over an API bill nobody
                        mentioned is a project we failed to quote honestly.
                    </motion.p>
                </div>
            </section>

            {/* FAQ */}
            <section style={{ backgroundColor: '#25221F', color: SAND, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
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
                            Agent Questions We Get Asked
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
                        Tell Us What The Agent Has To Get Right
                    </motion.h2>
                    <motion.p variants={fadeInUp} style={{ fontFamily: INTER, fontSize: '1.2rem', opacity: 0.8, lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
                        You do not need a spec. One hour, a description of the job you want handled and the
                        things it must never do on its own, and we will tell you whether an agent is even
                        the right shape for it. Sometimes the honest answer is a database query and four
                        lines of code, and we would rather say that than sell you a model.
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
                        heading="Scope your AI agent"
                        submitLabel="Book Free Agent Scoping Call"
                        onClose={closeContact}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
