'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import LandingHeader from '../../components/LandingHeader'
import ClientStrip from '../../components/ClientStrip'
import ContactOverlay from '../../components/ContactOverlay'
import Footer from '../../components/Footer'
import { DARK, SAND, INTER } from '../../lib/constants'
import { WHY_IT_MATTERS, CAPABILITIES, STEPS, AUDIENCES, FAQ_ITEMS } from './content'

// Slightly whiter than SAND — used for text on this page's dark sections,
// matching the sibling ERP landing pages.
const TEXT = '#F2EEE8'

const H2: React.CSSProperties = {
    fontFamily: 'var(--font-montserrat), sans-serif',
    fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    textTransform: 'uppercase',
    margin: 0,
}

const EYEBROW: React.CSSProperties = {
    fontFamily: INTER,
    fontSize: '0.8rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    fontWeight: 700,
    opacity: 0.55,
    display: 'block',
    marginBottom: '1rem',
}

const LEAD: React.CSSProperties = {
    fontFamily: INTER,
    fontSize: 'clamp(1rem, 1.35vw, 1.15rem)',
    lineHeight: 1.7,
    letterSpacing: '0.01em',
}

const CTA: React.CSSProperties = {
    backgroundColor: SAND,
    color: DARK,
    fontWeight: 600,
    fontSize: '0.95rem',
    padding: '0.95rem 1.8rem',
    borderRadius: '999px',
    textDecoration: 'none',
    display: 'inline-block',
    border: 'none',
    cursor: 'pointer',
    fontFamily: INTER,
}

export default function CustomerRetentionPage() {
    const [isMobile, setIsMobile] = useState(false)
    const [openFaq, setOpenFaq] = useState<number | null>(0)
    const [contactOpen, setContactOpen] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const pad = isMobile ? '4rem 5%' : '7rem 8%'

    return (
        <main style={{ backgroundColor: DARK, color: TEXT, fontFamily: INTER }}>
            <LandingHeader theme="dark" onContactClick={() => setContactOpen(true)} />

            {/* Hero */}
            <section data-theme="dark" style={{ padding: isMobile ? '4rem 5% 3rem' : '7rem 8% 5rem' }}>
                <div
                    style={{
                        maxWidth: '1300px',
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) minmax(0, 0.85fr)',
                        gap: isMobile ? '2.5rem' : '4rem',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <span style={EYEBROW}>Customer retention management software</span>
                        <h1
                            style={{
                                fontFamily: 'var(--font-montserrat), sans-serif',
                                fontSize: 'clamp(2.1rem, 5.5vw, 4.25rem)',
                                fontWeight: 800,
                                lineHeight: 1.03,
                                letterSpacing: '-0.03em',
                                margin: 0,
                            }}
                        >
                            Keep more customers, grow more revenue.
                        </h1>
                        <p style={{ ...LEAD, marginTop: '1.75rem', maxWidth: '620px', opacity: 0.82 }}>
                            You are losing customers you did not have to lose. That is the whole thing. Not because
                            your product is bad or your pricing is wrong — because nobody noticed the warning signs
                            until the cancellation email was already in the inbox.
                        </p>
                        <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '620px', opacity: 0.75 }}>
                            Customer retention management is the system that catches it before that happens. Well,
                            not a system exactly — more a set of decisions about what you track, when you act, and
                            how much of it runs without someone manually pulling a report every Tuesday.
                        </p>
                        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <button type="button" onClick={() => setContactOpen(true)} style={CTA}>
                                Talk to us about churn
                            </button>
                        </div>
                    </div>

                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: isMobile ? '16/10' : '4/3.4',
                            borderRadius: '1.5rem',
                            overflow: 'hidden',
                            border: '1px solid rgba(232,223,211,0.14)',
                        }}
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
                            alt="Customer retention management software dashboard showing account health and churn metrics"
                            fill
                            priority
                            sizes="(max-width: 768px) 90vw, 45vw"
                            style={{ objectFit: 'cover' }}
                        />
                        {/* Warms the stock photo into the page's sand/dark palette. */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(160deg, rgba(46,42,38,0.15), rgba(46,42,38,0.55))',
                            }}
                        />
                    </div>
                </div>
            </section>

            <ClientStrip />

            {/* The gap most CRMs leave */}
            <section data-theme="dark" style={{ backgroundColor: '#25221F', padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Where the CRM stops</span>
                    <h2 style={H2}>Most CRMs are built for the sale</h2>
                    <div
                        style={{
                            marginTop: '2.5rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            gap: isMobile ? '1.5rem' : '2.5rem',
                        }}
                    >
                        <p style={{ ...LEAD, opacity: 0.8, margin: 0 }}>
                            The moment a deal closes, the software kind of loses interest. The data is there, but
                            nobody is watching it for you. Customer retention management software watches it.
                        </p>
                        <p style={{ ...LEAD, opacity: 0.8, margin: 0 }}>
                            Acquiring a new customer costs 5–7× more than keeping one. You have probably heard that
                            stat. What you hear less often is that most businesses still spend ₹8 on acquisition for
                            every ₹1 on retention. The math is obvious. The behaviour does not follow.
                        </p>
                    </div>
                </div>
            </section>

            {/* What it is */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Definition</span>
                    <h2 style={H2}>What is customer retention management?</h2>

                    <div
                        style={{
                            marginTop: '2rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.1fr) minmax(0, 1fr)',
                            gap: isMobile ? '2rem' : '3.5rem',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <p style={{ ...LEAD, margin: 0, opacity: 0.8 }}>
                                It is the ongoing work of tracking how customers are actually doing — not how you hope
                                they are doing — and acting on that before they decide to leave.
                            </p>
                            <p style={{ ...LEAD, marginTop: '1.25rem', marginBottom: 0, opacity: 0.75 }}>
                                A standard CRM tells you what happened before the sale. Retention software tells you
                                what is happening right now: how often they log in, whether they have touched the
                                features they said they cared about, how many support tickets they opened in the last
                                30 days, whether last month&apos;s payment failed quietly and nobody followed up. That
                                is the part that slips. The quiet stuff.
                            </p>
                        </div>

                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '4/3',
                                borderRadius: '1.25rem',
                                overflow: 'hidden',
                                border: '1px solid rgba(232,223,211,0.14)',
                            }}
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
                                alt="Customer success team reviewing at-risk accounts before renewal"
                                fill
                                sizes="(max-width: 768px) 90vw, 45vw"
                                style={{ objectFit: 'cover' }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(160deg, rgba(46,42,38,0.15), rgba(46,42,38,0.55))',
                                }}
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            marginTop: '3rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            gap: '1.25rem',
                        }}
                    >
                        {[
                            {
                                title: 'Retention rate vs. churn rate',
                                body: 'Same metric, two angles. A business retaining 85% of customers annually still loses roughly half its customer base every 4 years. 85% sounds fine until you write it out like that. Getting to 95%+ is where the math starts working for you instead of against you.',
                            },
                            {
                                title: 'Proactive vs. reactive management',
                                body: 'Most teams are reactive. A customer emails to cancel and someone scrambles — a discount, an escalation, a rushed attempt to understand why. By then you are negotiating from a bad position and both sides know it. Proactive means you see the disengagement 6 weeks before the email arrives.',
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                style={{
                                    border: '1px solid rgba(232,223,211,0.14)',
                                    borderRadius: '1.25rem',
                                    padding: '1.75rem 1.5rem',
                                    backgroundColor: 'rgba(232,223,211,0.03)',
                                }}
                            >
                                <h3 style={{ fontFamily: INTER, fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.01em', margin: 0 }}>
                                    {item.title}
                                </h3>
                                <p style={{ fontSize: '0.92rem', lineHeight: 1.65, opacity: 0.72, marginTop: '0.7rem', marginBottom: 0 }}>
                                    {item.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why it matters */}
            <section data-theme="dark" style={{ backgroundColor: '#25221F', padding: pad }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Why it matters</span>
                    <h2 style={H2}>Retention is the cheapest growth you have</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '680px', opacity: 0.75 }}>
                        Growth cancelled out by churn on the back end is not growth. It is a treadmill with a
                        marketing budget attached.
                    </p>

                    <div
                        style={{
                            marginTop: '3rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: '1.25rem',
                        }}
                    >
                        {WHY_IT_MATTERS.map((item) => (
                            <div
                                key={item.title}
                                style={{
                                    border: '1px solid rgba(232,223,211,0.14)',
                                    borderRadius: '1.25rem',
                                    padding: '1.75rem 1.5rem',
                                    backgroundColor: 'rgba(232,223,211,0.03)',
                                }}
                            >
                                <h3 style={{ fontFamily: INTER, fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.01em', margin: 0 }}>
                                    {item.title}
                                </h3>
                                <p style={{ fontSize: '0.92rem', lineHeight: 1.65, opacity: 0.72, marginTop: '0.7rem', marginBottom: 0 }}>
                                    {item.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What to look for */}
            <section data-theme="light" style={{ backgroundColor: SAND, color: DARK, padding: pad }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <span style={{ ...EYEBROW, opacity: 0.6 }}>What to look for</span>
                    <h2 style={H2}>What retention software actually needs</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '680px', opacity: 0.7 }}>
                        Not a feature list to impress you. The parts a retention programme cannot run without —
                        and you will not need all of them on day one.
                    </p>

                    <div
                        style={{
                            marginTop: '3rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: '1.5rem 2rem',
                        }}
                    >
                        {CAPABILITIES.map((feature, i) => (
                            <div key={feature.title} style={{ borderTop: '1px solid rgba(46,42,38,0.18)', paddingTop: '1.1rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.4, letterSpacing: '0.1em' }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 style={{ fontFamily: INTER, fontSize: '1rem', fontWeight: 700, margin: '0.4rem 0 0' }}>
                                    {feature.title}
                                </h3>
                                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.7, marginTop: '0.4rem', marginBottom: 0 }}>
                                    {feature.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>How it works</span>
                    <h2 style={H2}>From scattered data to a working loop</h2>

                    <div
                        style={{
                            marginTop: '3rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                            gap: '1.5rem 2rem',
                        }}
                    >
                        {STEPS.map((step, i) => (
                            <div key={step.title} style={{ borderTop: `2px solid ${SAND}`, paddingTop: '1.25rem' }}>
                                <span
                                    style={{
                                        fontFamily: 'var(--font-montserrat), sans-serif',
                                        fontSize: '2rem',
                                        fontWeight: 800,
                                        opacity: 0.3,
                                    }}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 style={{ fontFamily: INTER, fontSize: '1.05rem', fontWeight: 700, margin: '0.5rem 0 0' }}>
                                    {step.title}
                                </h3>
                                <p style={{ fontSize: '0.92rem', lineHeight: 1.65, opacity: 0.72, marginTop: '0.6rem', marginBottom: 0 }}>
                                    {step.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Full-bleed break between the process and the audience section */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: isMobile ? '220px' : '360px',
                    overflow: 'hidden',
                }}
            >
                <Image
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1800&auto=format&fit=crop"
                    alt="Retention analytics tracking churn risk and renewal revenue across accounts"
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                />
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(to bottom, ${DARK} 0%, rgba(46,42,38,0.55) 45%, #25221F 100%)`,
                    }}
                />
            </div>

            {/* Who uses it + internal links */}
            <section data-theme="dark" style={{ backgroundColor: '#25221F', padding: pad }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Who we build for</span>
                    <h2 style={H2}>Who uses retention management software?</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', maxWidth: '680px', opacity: 0.75 }}>
                        Any business selling on a recurring basis and tired of growth being cancelled out by churn
                        on the back end.
                    </p>

                    <div
                        style={{
                            marginTop: '2.5rem',
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            gap: '1.25rem 2.5rem',
                        }}
                    >
                        {AUDIENCES.map((item) => (
                            <div key={item.title} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                                <span aria-hidden="true" style={{ opacity: 0.4, lineHeight: 1.7 }}>—</span>
                                <p style={{ fontSize: '0.98rem', lineHeight: 1.7, opacity: 0.78, margin: 0 }}>
                                    <strong style={{ fontWeight: 700, opacity: 1 }}>{item.title}</strong> — {item.body}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p style={{ ...LEAD, marginTop: '2.75rem', maxWidth: '680px', opacity: 0.8 }}>
                        Retention is one part of it — we also build the{' '}
                        <Link
                            href="/software-development-agency-mumbai"
                            style={{ color: SAND, textDecoration: 'underline', textUnderlineOffset: '3px' }}
                        >
                            custom CRMs, web apps and AI automation
                        </Link>{' '}
                        these systems sit on top of, and{' '}
                        <Link
                            href="/manufacturing-erp"
                            style={{ color: SAND, textDecoration: 'underline', textUnderlineOffset: '3px' }}
                        >
                            custom ERP software for manufacturers
                        </Link>
                        , built the same way.
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section data-theme="dark" style={{ padding: pad }}>
                <div style={{ maxWidth: '820px', margin: '0 auto' }}>
                    <span style={EYEBROW}>Questions</span>
                    <h2 style={H2}>Straight answers</h2>

                    <div style={{ marginTop: '2.5rem' }}>
                        {FAQ_ITEMS.map((faq, i) => {
                            const open = openFaq === i
                            return (
                                <div key={faq.question} style={{ borderTop: '1px solid rgba(232,223,211,0.14)' }}>
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(open ? null : i)}
                                        aria-expanded={open}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: '1.5rem',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '1.35rem 0',
                                            color: TEXT,
                                            fontFamily: INTER,
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            textAlign: 'left',
                                        }}
                                    >
                                        {faq.question}
                                        <span
                                            aria-hidden="true"
                                            style={{
                                                flexShrink: 0,
                                                fontSize: '0.7rem',
                                                opacity: 0.6,
                                                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.25s ease',
                                            }}
                                        >
                                            ▼
                                        </span>
                                    </button>
                                    <div
                                        style={{
                                            // Generous cap: the longest answers need ~250px on a
                                            // narrow phone, and a collapsing box can't use auto.
                                            maxHeight: open ? '30rem' : 0,
                                            opacity: open ? 1 : 0,
                                            overflow: 'hidden',
                                            transition: 'max-height 0.3s ease, opacity 0.25s ease, padding 0.3s ease',
                                            paddingBottom: open ? '1.35rem' : 0,
                                        }}
                                    >
                                        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.72, margin: 0, maxWidth: '640px' }}>
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Close */}
            <section data-theme="dark" style={{ backgroundColor: '#25221F', padding: pad, textAlign: 'center' }}>
                <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <h2 style={H2}>Tell us where customers slip away</h2>
                    <p style={{ ...LEAD, marginTop: '1.25rem', opacity: 0.78 }}>
                        The renewal that went quiet. The account nobody called for four months. The failed payment
                        that turned into a cancellation. Tell us where it happens in your business and we will show
                        you what we would build — no deck, no demo of features you did not ask about.
                    </p>
                    <div style={{ marginTop: '2.25rem' }}>
                        <button type="button" onClick={() => setContactOpen(true)} style={CTA}>
                            Get a free quote
                        </button>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {contactOpen && <ContactOverlay onClose={() => setContactOpen(false)} />}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
