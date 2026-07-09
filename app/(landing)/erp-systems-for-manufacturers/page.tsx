'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import LandingHeader from '../../components/LandingHeader'
import Footer from '../../components/Footer'
import ParticleEffect from '../../components/ParticleEffect'
import { DARK, SAND, INTER } from '../../lib/constants'
import { FAQ_ITEMS } from './content'

// Slightly whiter than SAND (#E8E2DA) — used for body/heading text on this
// page's dark sections. Sand backgrounds, borders, and dots keep SAND.
const TEXT = '#F2EEE8'

// Widths keep each logo optically similar in size despite differing aspect ratios.
// `scale` grows the box for logos that carry a lot of internal whitespace, since
// object-fit: contain otherwise renders them smaller than their neighbours.
// `href` is omitted where the client has no entry in projectDetails.ts yet.
const CLIENT_LOGOS: { src: string; alt: string; width: string; scale?: number; href?: string }[] = [
    { src: '/logos/dariza.jpg', alt: 'Dariza Fabrics', width: '210px', href: '/projects/dariza' },
    { src: '/logos/1327.png', alt: '1327', width: '190px', href: '/projects/1327' },
    { src: '/froven image/Gemini_Generated_Image_gqcanogqcanogqca-Photoroom.png', alt: 'Froven Innovations', width: '110px', href: '/projects/froven' },
    { src: '/logos/aimfitness.png', alt: 'Aim Fitness Gym Thane', width: '190px', scale: 1.5 }
]

const LOGO_BASE_HEIGHT = { mobile: 70, desktop: 90 }

// Every logo sits in a frame of this height so the captions below them share one
// baseline, regardless of each logo's individual scale.
const LOGO_FRAME_SCALE = Math.max(...CLIENT_LOGOS.map((c) => c.scale ?? 1))

export default function ERPPage() {
    const heroRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

    const [isMobile, setIsMobile] = useState(false)
    const [openFaq, setOpenFaq] = useState<number | null>(0)

    // Form states for Section 14
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        requirement: ''
    })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    // Exit-intent style popup: shows only when the visitor has BOTH scrolled
    // into the 3rd section AND spent 30s on the page.
    const thirdSectionRef = useRef<HTMLElement>(null)
    const [scrolledToThird, setScrolledToThird] = useState(false)
    const [spent30s, setSpent30s] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [popupDismissed, setPopupDismissed] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    // Condition A: 30 seconds on the page.
    useEffect(() => {
        const t = setTimeout(() => setSpent30s(true), 30000)
        return () => clearTimeout(t)
    }, [])

    // Condition B: scrolled into the 3rd section (its top has entered the viewport).
    useEffect(() => {
        const onScroll = () => {
            const el = thirdSectionRef.current
            if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.8) {
                setScrolledToThird(true)
                window.removeEventListener('scroll', onScroll)
            }
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Both conditions must be true (and it hasn't been dismissed) to show the popup.
    useEffect(() => {
        if (spent30s && scrolledToThird && !popupDismissed) {
            setShowPopup(true)
        }
    }, [spent30s, scrolledToThird, popupDismissed])

    // Close the popup automatically once a submission succeeds.
    useEffect(() => {
        if (status === 'success') setShowPopup(false)
    }, [status])

    const closePopup = () => {
        setShowPopup(false)
        setPopupDismissed(true)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const phoneRegex = /^\+?[0-9\s\-\(\)]{7,15}$/
        if (!phoneRegex.test(formData.phone)) {
            setStatus('error')
            setErrorMessage('Please enter a valid phone number.')
            return
        }

        setStatus('loading')
        setErrorMessage('')

        // The visitor's stated requirement becomes the message body.
        const messageBody = formData.requirement.trim()

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: messageBody
                })
            })

            if (response.ok) {
                setStatus('success')
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    requirement: ''
                })
            } else {
                setStatus('error')
                setErrorMessage('Something went wrong. Please check your inputs and try again.')
            }
        } catch {
            setStatus('error')
            setErrorMessage('Network error. Please try again later.')
        }
    }

    return (
        <main style={{ backgroundColor: DARK, color: TEXT, minHeight: '100vh', overflowX: 'clip' }}>
            <LandingHeader theme="dark" onContactClick={() => { setPopupDismissed(false); setShowPopup(true) }} />

            {/* 1. Hero Section (H1) */}
            <section
                ref={heroRef}
                style={{
                    minHeight: '100vh',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'left',
                    padding: '1rem 5% 3rem',
                    overflow: 'hidden'
                }}
            >
                <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, y, zIndex: 0 }}>
                    <Image
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop"
                        alt="Manufacturing ERP System"
                        fill
                        style={{ objectFit: 'cover', opacity: 0.09 }}
                        priority
                    />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, rgba(46,42,38,0.45), ${DARK})` }} />
                </motion.div>

                <ParticleEffect />

                <motion.div
                    style={{
                        zIndex: 10,
                        opacity,
                        width: '100%',
                        maxWidth: '1400px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: isMobile ? '2.5rem' : '3.5rem',
                    }}
                >
                    {/* Top: text (left) + image (right) */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            alignItems: isMobile ? 'stretch' : 'start',
                            gap: isMobile ? '3rem' : '5rem',
                        }}
                    >
                        {/* Left: heading + copy */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <h1
                                style={{
                                    fontFamily: "var(--font-montserrat), sans-serif",
                                    fontSize: 'clamp(1.4rem, 2.7vw, 2.5rem)',
                                    fontWeight: 800,
                                    lineHeight: 1.15,
                                    textTransform: 'uppercase',
                                    letterSpacing: '-0.03em',
                                    whiteSpace: isMobile ? 'normal' : 'nowrap',
                                    margin: 0
                                }}
                            >
                                ERP Software Company <br /> in Mumbai for Manufacturers
                            </h1>

                            <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <p
                                    style={{
                                        fontFamily: INTER,
                                        fontSize: isMobile ? '1.05rem' : '1.2rem',
                                        color: '#FFFFFF',
                                        letterSpacing: '0.01em',
                                        lineHeight: 1.7,
                                        margin: 0
                                    }}
                                >
                                    Nexona is an ERP software company in Mumbai that builds one connected system across production, inventory, purchase, finance, and compliance - shaped around how your factory actually works, not a fixed template.
                                </p>
                                <p
                                    style={{
                                        fontFamily: INTER,
                                        fontSize: isMobile ? '1.05rem' : '1.2rem',
                                        color: '#FFFFFF',
                                        letterSpacing: '0.01em',
                                        lineHeight: 1.7,
                                        margin: 0
                                    }}
                                >
                                    Most manufacturers here know the cost of disconnected systems: three people give three answers about what&apos;s on the floor. Nexona closes that gap by putting every department on the same numbers, so decisions rest on what is true - not on who sent the last WhatsApp update.
                                </p>
                            </div>
                        </div>

                        {/* Right: hero image */}
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '16 / 10',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                display: isMobile ? 'none' : 'block',
                            }}
                        >
                            <Image
                                src="/erp.png"
                                alt="ERP software dashboard for Mumbai manufacturers"
                                fill
                                priority
                                sizes="(max-width: 768px) 0px, 52vw"
                                style={{ objectFit: 'cover', objectPosition: 'top', borderRadius: '10px' }}
                            />
                        </div>
                    </div>

                    {/* Bottom: bullet points in a single row, full width */}
                    <div style={{ display: 'flex', flexWrap: isMobile ? 'wrap' : 'nowrap', justifyContent: 'flex-start', gap: '1.5rem' }}>
                        {[
                            'Production visibility improves',
                            'Approvals clear same morning',
                            'Cost factors explained upfront'
                        ].map((bullet, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    backgroundColor: 'rgba(232, 226, 218, 0.04)',
                                    border: '1px solid rgba(232, 226, 218, 0.1)',
                                    borderRadius: '12px',
                                    padding: '0.75rem 1.5rem',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <span style={{ width: '8px', height: '8px', backgroundColor: SAND, borderRadius: '50%', flexShrink: 0 }} />
                                <h3 style={{ fontFamily: INTER, fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>
                                    {bullet}
                                </h3>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* 1b. Our Clients */}
            <section style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '4rem 0' : '6rem 0' }}>
                <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '4rem', padding: '0 5%' }}>
                        <span style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1rem' }}>Trusted By</span>
                        <h2 style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            Our Clients
                        </h2>
                    </div>

                    {/* Right-to-left marquee. The list is rendered twice back to back and
                        the track is shifted by exactly half its width, so the loop is seamless. */}
                    <div
                        style={{
                            overflow: 'hidden',
                            paddingBottom: '3rem',
                            maskImage: 'linear-gradient(to right, transparent, black 2%, black 98%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 2%, black 98%, transparent)'
                        }}
                    >
                        {/* Four groups, i.e. two per half. Each half must be wider than the
                            viewport or the -50% shift would expose empty track on the right. */}
                        <div className="clientMarqueeTrack">
                            {[0, 1, 2, 3].map((copy) => (
                                <div key={copy} className="clientMarqueeGroup" aria-hidden={copy !== 0}>
                                    {CLIENT_LOGOS.map((client) => {
                                        const base = isMobile ? LOGO_BASE_HEIGHT.mobile : LOGO_BASE_HEIGHT.desktop
                                        const image = (
                                            <Image
                                                src={client.src}
                                                alt={copy === 0 ? client.alt : ''}
                                                draggable={false}
                                                fill
                                                sizes="220px"
                                                style={{ objectFit: 'contain' }}
                                            />
                                        )
                                        return (
                                            <div
                                                key={client.alt}
                                                className="clientLogo"
                                                style={{ height: `${base * LOGO_FRAME_SCALE}px`, width: client.width }}
                                            >
                                                <div
                                                    className="clientLogoImage"
                                                    style={{ height: `${base * (client.scale ?? 1)}px` }}
                                                >
                                                    {client.href ? (
                                                        <Link
                                                            href={client.href}
                                                            tabIndex={copy !== 0 ? -1 : undefined}
                                                            style={{ position: 'absolute', inset: 0, display: 'block' }}
                                                        >
                                                            {image}
                                                        </Link>
                                                    ) : (
                                                        image
                                                    )}
                                                </div>
                                                <span className="clientLogoName" aria-hidden="true">
                                                    {client.alt}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .clientMarqueeTrack {
                        display: flex;
                        width: max-content;
                        animation: clientMarquee 28s linear infinite;
                    }
                    .clientMarqueeTrack:hover {
                        animation-play-state: paused;
                    }
                    .clientMarqueeGroup {
                        display: flex;
                        align-items: center;
                        gap: 5rem;
                        padding-right: 5rem;
                    }
                    .clientLogo {
                        position: relative;
                        flex-shrink: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .clientLogoImage {
                        position: relative;
                        width: 100%;
                        opacity: 0.85;
                        transition: opacity 0.3s ease, transform 0.3s ease;
                    }
                    .clientLogo:hover .clientLogoImage,
                    .clientLogo:focus-within .clientLogoImage {
                        opacity: 1;
                        transform: scale(1.04);
                    }
                    .clientLogoName {
                        position: absolute;
                        top: calc(100% + 0.9rem);
                        left: 50%;
                        transform: translateX(-50%);
                        white-space: nowrap;
                        font-family: ${INTER};
                        font-size: 0.8rem;
                        font-weight: 700;
                        letter-spacing: 0.12em;
                        text-transform: uppercase;
                        color: ${DARK};
                        opacity: 0.65;
                        transition: opacity 0.3s ease;
                        pointer-events: none;
                    }
                    .clientLogo:hover .clientLogoName,
                    .clientLogo:focus-within .clientLogoName {
                        opacity: 1;
                    }
                    @keyframes clientMarquee {
                        from { transform: translateX(0); }
                        to { transform: translateX(-50%); }
                    }
                    @media (prefers-reduced-motion: reduce) {
                        .clientMarqueeTrack { animation: none; }
                    }
                `}</style>
            </section>

            {/* 2. Why Mumbai Manufacturers Need ERP to Scale Faster (H2) */}
            <section style={{ backgroundColor: '#25221F', padding: isMobile ? '6rem 5%' : '10rem 8%', borderTop: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', gap: isMobile ? '3rem' : '6rem' }}>
                    <div style={{ flex: 1.2 }}>
                        <span style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Scale Operations</span>
                        <h2 style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            margin: '0 0 2rem 0'
                        }}>
                            Why Mumbai Manufacturers Need ERP to Scale Faster
                        </h2>
                        <p style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.1rem', margin: 0 }}>
                            The manufacturing belt through Thane, Bhiwandi, Navi Mumbai, and Vasai still runs on Tally and Excel trackers never built for this load. A small unit manages. Add a second warehouse, a third product line, or a compliance deadline you cannot miss, and that approach buckles. What gets you is rarely one big breakdown - it&apos;s the slow stack of small failures bleeding margin every quarter.
                        </p>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                        {[
                            'Warehouse and floor stock gaps',
                            'Approval delays stall purchase',
                            'No real-time production view',
                            'Compliance gaps in GST filings',
                            'Systems not built to scale up'
                        ].map((bullet, i) => (
                            <div
                                key={i}
                                style={{
                                    border: '1px solid rgba(232,223,211,0.1)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    backgroundColor: 'rgba(232,223,211,0.02)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.25rem'
                                }}
                            >
                                <span style={{ color: '#D97706', fontSize: '1.25rem', fontWeight: 'bold' }}>!</span>
                                <h3 style={{ fontFamily: INTER, fontSize: '1.05rem', fontWeight: 600, margin: 0, color: TEXT }}>
                                    {bullet}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. What Nexona Solves for Local Buyers Today (H2) */}
            <section ref={thirdSectionRef} style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', alignItems: 'center', gap: isMobile ? '4rem' : '8rem' }}>
                    <div style={{ flex: 1, width: '100%', position: 'relative', aspectRatio: '4/5', borderRadius: '24px', overflow: 'hidden' }}>
                        <Image
                            src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop"
                            alt="Nexona software engineers collaborating on custom ERP dashboards"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>

                    <div style={{ flex: 1.2 }}>
                        <span style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Eliminate Friction</span>
                        <h2 style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            margin: '0 0 2rem 0'
                        }}>
                            What Nexona Solves for Local Buyers Today
                        </h2>
                        <p style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                            ERP solutions for manufacturers are not really about software - they are about the work your team stops doing. Put sales, production, purchase, and finance on one data source and the friction between them mostly disappears. Nexona builds its ERP software for manufacturing industry clients around results you can point to, not features you have to believe in.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                            {[
                                'Sales, production, purchase, and finance work off the same live data',
                                'Inventory updates as material moves - kills stock mismatch errors',
                                'Delivery status stays visible from order confirmation to dispatch',
                                'GST filing, e-invoicing, and compliance reports pull from your transactions',
                                'Tally, Excel, and paper registers give way to one process'
                            ].map((bullet, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                    <div style={{ width: '8px', height: '8px', backgroundColor: DARK, borderRadius: '50%', marginTop: '0.55rem', flexShrink: 0 }} />
                                    <h3 style={{ fontFamily: INTER, fontSize: '1.05rem', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
                                        {bullet}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Core ERP Services Nexona Delivers for Factory Operations (H2) */}
            <section style={{ backgroundColor: DARK, color: TEXT, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <span style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1rem' }}>Services Matrix</span>
                        <h2 style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            Core ERP Services Nexona Delivers for Factory Operations
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[
                            { title: 'Production Planning & Scheduling', desc: 'plan runs against confirmed orders, available material, and machine capacity in one view, so you hit delivery dates without coordinating by phone.' },
                            { title: 'Inventory Management', desc: 'raw material, WIP, and finished goods tracked live across every location, so stock-outs get rare.' },
                            { title: 'Procurement & Purchase Management', desc: 'requisitions, vendor comparison, and approvals on a defined path, tying every rupee to a budget.' },
                            { title: 'Bill of Materials (BOM) Management', desc: 'version-controlled BOMs, so production always pulls the right components.' },
                            { title: 'Quality Management', desc: 'checks at incoming, in-process, and final inspection, with records ready for audit.' },
                            { title: 'Supply Chain Management', desc: 'vendors, transporters, and warehouse teams coordinated from one place.' },
                            { title: 'Sales & Order Management', desc: 'an enquiry becomes a confirmed order, fulfilled and tracked on one dashboard.' },
                            { title: 'Finance & Accounting', desc: 'payables, receivables, GST returns, and reporting automated, so books close faster.' },
                            { title: 'Production Monitoring', desc: 'actual output against plan as it happens, so bottlenecks surface while you can still act.' },
                            { title: 'Human Resource Management', desc: 'attendance, payroll, leave, and compliance from one system.' },
                            { title: 'Asset & Maintenance Management', desc: 'preventive maintenance scheduled and breakdowns logged.' },
                            { title: 'Reporting & Analytics', desc: 'live dashboards and scheduled reports for production, finance, inventory, and quality.' }
                        ].map((service, i) => (
                            <div
                                key={i}
                                style={{
                                    border: '1px solid rgba(232,223,211,0.12)',
                                    borderRadius: '20px',
                                    padding: '2rem',
                                    backgroundColor: 'rgba(232,223,211,0.02)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    minHeight: '200px'
                                }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.25rem', fontWeight: 700, margin: '0 0 1rem 0', letterSpacing: '-0.01em', color: TEXT }}>
                                    {service.title}
                                </h3>
                                <p style={{ fontFamily: INTER, fontSize: '0.95rem', opacity: 0.75, lineHeight: 1.6, margin: 0 }}>
                                    {service.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. How Each Nexona ERP Module Improves Control and Speed (H2) */}
            <section style={{ backgroundColor: '#25221F', color: TEXT, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <span style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1rem' }}>Modules Influence</span>
                        <h2 style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            How Each Nexona ERP Module Improves Control and Speed
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                        {[
                            { title: 'Faster Production Flow (Planning & Scheduling, Production Monitoring)', desc: 'planning runs on real numbers, and the floor view catches a delay before it becomes a missed dispatch.' },
                            { title: 'Better Inventory Accuracy (Inventory, BOM, Supply Chain)', desc: 'what the system shows is what\'s on the floor, and visibility means fewer panic purchases.' },
                            { title: 'Smarter Purchase Control (Procurement & Purchase)', desc: 'a request follows an approval path, vendor performance gets tracked, spending is controlled before the money leaves.' },
                            { title: 'Clearer Order Tracking (Sales & Order)', desc: 'sales knows status without calling the warehouse, and disputes shrink.' },
                            { title: 'Earlier Quality Checks (Quality)', desc: 'quality is enforced where production happens, so rejection and rework drop.' },
                            { title: 'Stronger Cost Visibility (Finance, Reporting)', desc: 'every cost lands against the right cost centre, and GST filing runs off transaction data.' },
                            { title: 'Timely Maintenance Alerts (Asset & Maintenance)', desc: 'machines get serviced before they quit.' },
                            { title: 'Faster Team Coordination (HR)', desc: 'approvals run on time and HR stops chasing paper.' }
                        ].map((module, i) => (
                            <div
                                key={i}
                                style={{
                                    borderLeft: `3px solid ${SAND}`,
                                    paddingLeft: '1.5rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.75rem'
                                }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.15rem', fontWeight: 700, margin: 0, lineHeight: 1.4 }}>
                                    {module.title}
                                </h3>
                                <p style={{ fontFamily: INTER, fontSize: '0.95rem', opacity: 0.7, lineHeight: 1.6, margin: 0 }}>
                                    {module.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. How Nexona Implements ERP - Process and Rollout Timeline (H2) */}
            <section style={{ backgroundColor: DARK, color: TEXT, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ maxWidth: '800px', marginBottom: '6rem' }}>
                        <span style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Rollout Process</span>
                        <h2 style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            margin: '0 0 2rem 0'
                        }}>
                            How Nexona Implements ERP - Process & Timeline
                        </h2>
                        <p style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', margin: 0 }}>
                            Most manufacturers go live in 8 to 16 weeks - faster for a single location, longer for multi-plant rollouts with complex data. Nexona&apos;s structured rollout keeps the timeline from slipping.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '3rem' }}>
                        {[
                            { num: '01', title: 'Business Needs Analysis', desc: 'Nexona learns how your operation runs, department by department, mapping where gaps cost real money.' },
                            { num: '02', title: 'Workflow Planning Setup', desc: 'we map production flow, approval hierarchy, and reporting structure - a blueprint that prevents scope creep.' },
                            { num: '03', title: 'ERP Configuration Setup', desc: 'modules, permissions, dashboards, and settings, all bending to your workflow rather than a generic mould.' },
                            { num: '04', title: 'Legacy Data Migration', desc: 'we pull records from Tally, Excel, or whatever you run, then clean, validate, and bring them across intact - including inventory and opening balances.' },
                            { num: '05', title: 'Testing and Team Training', desc: 'the system gets run end to end, then Nexona trains every user before go-live, not after.' },
                            { num: '06', title: 'Go Live and Optimisation', desc: 'we launch with support on hand, fix early issues fast, and tune the configuration in the first 30 days.' }
                        ].map((step, i) => (
                            <div
                                key={i}
                                style={{
                                    borderTop: `1px solid rgba(232,223,211,0.2)`,
                                    paddingTop: '2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}
                            >
                                <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '2rem', fontWeight: 800, opacity: 0.35 }}>
                                    {step.num}
                                </span>
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>
                                    {step.title}
                                </h3>
                                <p style={{ fontFamily: INTER, fontSize: '0.95rem', opacity: 0.75, lineHeight: 1.6, margin: 0 }}>
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Customisation, Integration, and Data Migration with Nexona (H2) */}
            <section style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '4rem' : '8rem' }}>
                    <div style={{ flex: 1.2 }}>
                        <span style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Tailored Systems</span>
                        <h2 style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            margin: '0 0 2rem 0'
                        }}>
                            Customisation, Integration, and Data Migration
                        </h2>
                        <p style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                            Every buyer asks the same question: will this fit the way we already work? Nexona&apos;s answer starts with configuration, not a code rewrite. Factory management software handles the core mechanics - the work is shaping approval flows, dashboards, and reports to match your process.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                            {[
                                'Approval workflows and reports configured to how you operate',
                                'Integration with Tally, Excel, or current accounting tools',
                                'GST-compliant invoices, e-way bills, and IRN numbers generated automatically',
                                'Legacy data migrated safely with validation before go-live',
                                'Access controlled by role - users see only what their job needs'
                            ].map((bullet, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                    <div style={{ width: '8px', height: '8px', backgroundColor: DARK, borderRadius: '50%', marginTop: '0.55rem', flexShrink: 0 }} />
                                    <h3 style={{ fontFamily: INTER, fontSize: '1.05rem', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
                                        {bullet}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        <p style={{ fontFamily: INTER, fontStyle: 'italic', fontWeight: 600, fontSize: '1.1rem', opacity: 0.9 }}>
                            None of this means rebuilding from zero - it means configuring a system that already works to the way your business runs.
                        </p>
                    </div>

                    <div style={{ flex: 1, width: '100%', position: 'relative', aspectRatio: '4/5', borderRadius: '24px', overflow: 'hidden' }}>
                        <Image
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
                            alt="Sleek custom ERP software application with analytics charts and code integration"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </section>

            {/* 8. Industry Use Cases - How Nexona Serves Mumbai Manufacturers (H2) */}
            <section style={{ backgroundColor: DARK, color: TEXT, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <span style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1rem' }}>Industrial Verticals</span>
                        <h2 style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            margin: '0 0 2rem 0'
                        }}>
                            Industry Use Cases - How Nexona Serves Mumbai Manufacturers
                        </h2>
                        <p style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.15rem', maxWidth: '800px', margin: '0 auto' }}>
                            Mumbai&apos;s industrial clusters cover some of India&apos;s most varied manufacturing. Here is how Nexona&apos;s supply chain ERP software applies across the sectors we work with most.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {[
                            { title: 'Engineering', desc: 'machine parts and fabrication across Thane and Navi Mumbai MIDC zones, with job cards, routing, BOM versioning, and vendor scheduling in one place.' },
                            { title: 'Pharma', desc: 'batch control and formulation across Andheri, Mahape, and Turbhe, holding cGMP workflows, batch records, and expiry tracking.' },
                            { title: 'Food Processing', desc: 'batch tracking near the Vashi and Navi Mumbai APMC markets, with shelf-life controls, allergen tracking, and FSSAI documentation.' },
                            { title: 'Chemicals', desc: 'compliance records and formula control, tracking hazardous storage, batch genealogy, and MSDS-aligned reports.' },
                            { title: 'Packaging', desc: 'production planning, material consumption, and dispatch control, cutting wastage when volume swings.' },
                            { title: 'Textiles', desc: 'managing the colour-size-style matrix that breaks generic systems.' },
                            { title: 'Automotive Suppliers', desc: 'vendor management, BOM control, and quality built to OEM standards, carrying PPAP and first-article inspection records.' },
                            { title: 'Trading & Distribution', desc: 'warehouse control and order management across Bhiwandi and Navi Mumbai hubs, with GST-compliant dispatch documents.' }
                        ].map((useCase, i) => (
                            <div
                                key={i}
                                style={{
                                    border: '1px solid rgba(232,223,211,0.12)',
                                    borderRadius: '20px',
                                    padding: '2rem',
                                    backgroundColor: 'rgba(232,223,211,0.03)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.75rem'
                                }}
                            >
                                <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.25rem', fontWeight: 700, margin: 0, color: TEXT }}>
                                    {useCase.title}
                                </h3>
                                <p style={{ fontFamily: INTER, fontSize: '0.95rem', opacity: 0.75, lineHeight: 1.6, margin: 0 }}>
                                    {useCase.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. Security, Compliance, and Audit-Ready Controls in Nexona ERP (H2) & 10. Delivery Trust & 11. Manufacturers Gain (Combined Grid for High Impact Visuals) */}
            <section style={{ backgroundColor: '#25221F', color: TEXT, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '6rem' }}>

                    {/* 9. Security & Compliance */}
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '3rem' : '6rem' }}>
                        <div style={{ flex: 1.2 }}>
                            <span style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Audit Ready</span>
                            <h2 style={{
                                fontFamily: "var(--font-montserrat), sans-serif",
                                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                                fontWeight: 800,
                                lineHeight: 1.1,
                                textTransform: 'uppercase',
                                letterSpacing: '-0.02em',
                                margin: '0 0 2rem 0'
                            }}>
                                Security, Compliance, and Audit-Ready Controls
                            </h2>
                            <p style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.1rem', margin: 0 }}>
                                For a manufacturer, data control is the difference between an audit that passes and a week spent hunting old registers. Nexona keeps access role-controlled, logs every change with a full trace, and generates the compliance reports your auditor needs before they ask.
                            </p>
                        </div>
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', width: '100%' }}>
                            {[
                                { title: 'Role-based access', desc: 'per function' },
                                { title: 'Full audit trail', desc: 'every entry logged' },
                                { title: 'Compliance automated', desc: 'GST, IRN, e-Way Bill' },
                                { title: 'Secure exports', desc: 'role-gated & encrypted' }
                            ].map((item, i) => (
                                <div key={i} style={{ border: '1px solid rgba(232,223,211,0.1)', borderRadius: '16px', padding: '1.5rem', backgroundColor: 'rgba(232,223,211,0.02)' }}>
                                    <h3 style={{ fontFamily: INTER, fontSize: '1.05rem', fontWeight: 700, color: TEXT, margin: '0 0 0.5rem 0' }}>{item.title}</h3>
                                    <p style={{ fontFamily: INTER, fontSize: '0.85rem', opacity: 0.6, margin: 0 }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 10. Why Manufacturers Trust Nexona's Delivery Team */}
                    <div style={{ borderTop: `1px solid rgba(232,223,211,0.1)`, paddingTop: '5rem', display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse', alignItems: 'center', gap: isMobile ? '3rem' : '6rem' }}>
                        <div style={{ flex: 1.2 }}>
                            <span style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Delivery Trust</span>
                            <h2 style={{
                                fontFamily: "var(--font-montserrat), sans-serif",
                                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                                fontWeight: 800,
                                lineHeight: 1.1,
                                textTransform: 'uppercase',
                                letterSpacing: '-0.02em',
                                margin: '0 0 2rem 0'
                            }}>
                                Why Manufacturers Trust Nexona&apos;s Delivery Team
                            </h2>
                            <p style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.1rem', margin: 0 }}>
                                Most vendors hand you a system and disappear. Nexona stays - same team from the first factory walkthrough through go-live and the 90 days after. Implementation discipline is not a promise here; it is how every project actually runs.
                            </p>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                            {[
                                'Starts with your factory floor',
                                'Same contact, start to go-live',
                                'Same senior team after go-live',
                                'Training on your actual data',
                                'Support planned before go-live'
                            ].map((bullet, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ width: '6px', height: '6px', backgroundColor: SAND, borderRadius: '50%' }} />
                                    <h3 style={{ fontFamily: INTER, fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>{bullet}</h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 11. What Manufacturers Gain After Nexona Goes Live */}
                    <div style={{ borderTop: `1px solid rgba(232,223,211,0.1)`, paddingTop: '5rem', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '3rem' : '6rem' }}>
                        <div style={{ flex: 1.2 }}>
                            <span style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Operational Gain</span>
                            <h2 style={{
                                fontFamily: "var(--font-montserrat), sans-serif",
                                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                                fontWeight: 800,
                                lineHeight: 1.1,
                                textTransform: 'uppercase',
                                letterSpacing: '-0.02em',
                                margin: '0 0 2rem 0'
                            }}>
                                What Manufacturers Gain After Nexona Goes Live
                            </h2>
                            <p style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.1rem', margin: 0 }}>
                                These are the changes manufacturers report inside the first 90 days - not a forecast, just the pattern Nexona keeps seeing. The value rarely arrives as one big saving. It shows up as the quiet disappearance of small daily losses everyone had stopped counting.
                            </p>
                        </div>
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', width: '100%' }}>
                            {[
                                'Reporting replaces daily calls',
                                'Stock records match the floor',
                                'Approvals clear hours not days',
                                'On-time delivery rate improves'
                            ].map((bullet, i) => (
                                <div key={i} style={{ border: '1px solid rgba(232,223,211,0.12)', borderRadius: '16px', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor: 'rgba(232,223,211,0.01)' }}>
                                    <h3 style={{ fontFamily: INTER, fontSize: '1rem', fontWeight: 600, color: TEXT, margin: 0 }}>{bullet}</h3>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* 12. ERP Pricing Factors - What Nexona Buyers Should Know (H2) */}
            <section style={{ backgroundColor: DARK, color: TEXT, padding: isMobile ? '6rem 5%' : '10rem 8%', borderBottom: `1px solid rgba(232,223,211,0.1)` }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '4rem' : '8rem' }}>
                    <div style={{ flex: 1.2 }}>
                        <span style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Pricing Scoping</span>
                        <h2 style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            margin: '0 0 2rem 0'
                        }}>
                            ERP Pricing Factors - What Buyers Should Know
                        </h2>
                        <p style={{ fontFamily: INTER, opacity: 0.85, lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2rem' }}>
                            ERP pricing in India sits between ₹2–5 lakh for a basic SME setup and ₹15–50 lakh for a mid-size manufacturer running multiple modules across locations. Nexona&apos;s cloud SaaS plans are very affordable. The range is wide because cost tracks what you actually need - any vendor quoting a fixed figure before understanding your operation is guessing.
                        </p>
                        <p style={{ fontFamily: INTER, fontStyle: 'italic', fontWeight: 600, fontSize: '1.15rem', color: TEXT }}>
                            The sharper question is not what Nexona ERP costs - it is what running without it costs your business every month.
                        </p>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
                        {[
                            'Module count and licensed users set the base cost',
                            'Cloud vs on-premise changes total cost of ownership',
                            'Customisation depth and legacy data volume affect price',
                            'Training, support, and annual maintenance - confirm upfront'
                        ].map((bullet, i) => (
                            <div
                                key={i}
                                style={{
                                    border: '1px solid rgba(232,223,211,0.1)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    backgroundColor: 'rgba(232,223,211,0.02)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.25rem'
                                }}
                            >
                                <span style={{ width: '8px', height: '8px', backgroundColor: SAND, borderRadius: '50%' }} />
                                <h3 style={{ fontFamily: INTER, fontSize: '1.05rem', fontWeight: 600, margin: 0, color: TEXT }}>
                                    {bullet}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 13. FAQs for ERP Software Buyers in Mumbai and Nearby (H2) */}
            <section style={{ backgroundColor: '#25221F', color: TEXT, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <span style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1rem' }}>FAQ</span>
                        <h2 style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            margin: 0
                        }}>
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div>
                        {FAQ_ITEMS.map((item, i) => {
                            const isOpen = openFaq === i
                            return (
                                <div
                                    key={i}
                                    style={{ borderBottom: `1px solid rgba(232,223,211,0.12)` }}
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : i)}
                                        aria-expanded={isOpen}
                                        style={{
                                            width: '100%',
                                            background: 'none',
                                            border: 'none',
                                            color: TEXT,
                                            cursor: 'pointer',
                                            padding: '2rem 0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: '2rem',
                                            textAlign: 'left'
                                        }}
                                    >
                                        <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: isMobile ? '1.1rem' : '1.35rem', fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
                                            {item.question}
                                        </h3>
                                        <span style={{ fontFamily: INTER, fontSize: '1.75rem', fontWeight: 300, flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>+</span>
                                    </button>
                                    <div
                                        style={{
                                            overflow: 'hidden',
                                            height: isOpen ? 'auto' : 0,
                                            opacity: isOpen ? 1 : 0,
                                            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
                                        }}
                                    >
                                        <p style={{ fontFamily: INTER, fontSize: '1.05rem', lineHeight: 1.7, opacity: 0.75, margin: 0, paddingBottom: '2rem', maxWidth: '720px' }}>
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* 14. Book a Demo and Request a Tailored ERP Assessment from Nexona (H2) */}
            <section style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5% 8rem' : '10rem 8%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '5rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                        <span style={{ fontFamily: INTER, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700, display: 'block', marginBottom: '1.5rem' }}>Tailored Assessment</span>
                        <h2 style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 4.2vw, 3.2rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            margin: '0 0 2rem 0'
                        }}>
                            Book a Demo and Request a Tailored ERP Assessment
                        </h2>
                        <p style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '3rem' }}>
                            A proper Nexona ERP assessment takes 45 minutes and gives you a clear picture of what changes, what it costs, and how long it takes - before you commit. If your team spends its days reconciling spreadsheets and chasing approvals, that is exactly the problem production management software exists to remove.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                            {[
                                'Book a Nexona manufacturing ERP demo - see your workflows in the system before deciding',
                                'Request a workflow assessment - get a gap analysis of how you operate today',
                                'Get a tailored implementation plan - timeline, modules, and investment scoped to your business'
                            ].map((bullet, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                    <div style={{ width: '8px', height: '8px', backgroundColor: DARK, borderRadius: '50%', marginTop: '0.55rem', flexShrink: 0 }} />
                                    <h3 style={{ fontFamily: INTER, fontSize: '1.05rem', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>
                                        {bullet}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: `1px solid rgba(46,42,38,0.15)`, paddingTop: '1.5rem' }}>
                            <p style={{ fontFamily: INTER, fontSize: '0.95rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                                No sales pitch, no canned demo - just a conversation about your operation and whether Nexona ERP solves the right problems.
                            </p>
                        </div>
                    </div>

                    {/* Leads capturing form */}
                    <div
                        style={{
                            flex: 1.2,
                            width: '100%',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '24px',
                            padding: isMobile ? '2.5rem 1.5rem' : '3.5rem',
                            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)'
                        }}
                    >
                        <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
                            Request ERP Assessment
                        </h3>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label htmlFor="name" style={{ fontFamily: INTER, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.6 }}>Full Name *</label>
                                    <input required type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} style={{ padding: '0.8rem 1rem', border: '1px solid rgba(46,42,38,0.15)', borderRadius: '8px', fontSize: '1rem', fontFamily: INTER, outline: 'none', backgroundColor: '#F8F6F2' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label htmlFor="phone" style={{ fontFamily: INTER, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.6 }}>Phone Number *</label>
                                    <input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} style={{ padding: '0.8rem 1rem', border: '1px solid rgba(46,42,38,0.15)', borderRadius: '8px', fontSize: '1rem', fontFamily: INTER, outline: 'none', backgroundColor: '#F8F6F2' }} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="email" style={{ fontFamily: INTER, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.6 }}>Email Address *</label>
                                <input required type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} style={{ padding: '0.8rem 1rem', border: '1px solid rgba(46,42,38,0.15)', borderRadius: '8px', fontSize: '1rem', fontFamily: INTER, outline: 'none', backgroundColor: '#F8F6F2' }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="requirement" style={{ fontFamily: INTER, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.6 }}>Requirement *</label>
                                <textarea required id="requirement" name="requirement" rows={4} placeholder="Tell us what you're looking for" value={formData.requirement} onChange={handleInputChange} style={{ padding: '0.8rem 1rem', border: '1px solid rgba(46,42,38,0.15)', borderRadius: '8px', fontSize: '1rem', fontFamily: INTER, outline: 'none', backgroundColor: '#F8F6F2', resize: 'vertical' }} />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                style={{
                                    backgroundColor: DARK,
                                    color: TEXT,
                                    padding: '1rem 2rem',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontFamily: INTER,
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease',
                                    marginTop: '1rem',
                                    boxShadow: '0 4px 12px rgba(46, 42, 38, 0.25)'
                                }}
                            >
                                {status === 'loading' ? 'Submitting...' : 'Request Assessment'}
                            </button>

                            {status === 'success' && (
                                <p style={{ fontFamily: INTER, fontSize: '0.95rem', color: '#047857', fontWeight: 600, marginTop: '1rem', textAlign: 'center' }}>
                                    ✓ Thank you! Your ERP assessment request has been received.
                                </p>
                            )}

                            {status === 'error' && (
                                <p style={{ fontFamily: INTER, fontSize: '0.95rem', color: '#DC2626', fontWeight: 600, marginTop: '1rem', textAlign: 'center' }}>
                                    ✗ {errorMessage}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </section>

            {/* Timed + scroll-triggered lead popup (both conditions must be met) */}
            {showPopup && (
                <div
                    onClick={closePopup}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 1000,
                        backgroundColor: 'rgba(46,42,38,0.55)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.5rem'
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '460px',
                            backgroundColor: '#FFFFFF',
                            color: DARK,
                            borderRadius: '20px',
                            padding: isMobile ? '2rem 1.5rem' : '2.5rem',
                            boxShadow: '0 30px 70px rgba(0,0,0,0.35)'
                        }}
                    >
                        <button
                            onClick={closePopup}
                            aria-label="Close"
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.6rem',
                                lineHeight: 1,
                                cursor: 'pointer',
                                color: DARK,
                                opacity: 0.5
                            }}
                        >
                            ×
                        </button>

                        <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.35rem', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
                            Get a Free ERP Assessment
                        </h3>
                        <p style={{ fontFamily: INTER, fontSize: '0.95rem', opacity: 0.7, margin: '0 0 1.5rem 0', lineHeight: 1.5 }}>
                            Tell us what you need and we&apos;ll get back to you.
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input required type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} style={{ padding: '0.8rem 1rem', border: '1px solid rgba(46,42,38,0.15)', borderRadius: '8px', fontSize: '1rem', fontFamily: INTER, outline: 'none', backgroundColor: '#F8F6F2' }} />
                            <input required type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} style={{ padding: '0.8rem 1rem', border: '1px solid rgba(46,42,38,0.15)', borderRadius: '8px', fontSize: '1rem', fontFamily: INTER, outline: 'none', backgroundColor: '#F8F6F2' }} />
                            <input required type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} style={{ padding: '0.8rem 1rem', border: '1px solid rgba(46,42,38,0.15)', borderRadius: '8px', fontSize: '1rem', fontFamily: INTER, outline: 'none', backgroundColor: '#F8F6F2' }} />
                            <textarea required name="requirement" rows={3} placeholder="Your requirement" value={formData.requirement} onChange={handleInputChange} style={{ padding: '0.8rem 1rem', border: '1px solid rgba(46,42,38,0.15)', borderRadius: '8px', fontSize: '1rem', fontFamily: INTER, outline: 'none', backgroundColor: '#F8F6F2', resize: 'vertical' }} />

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                style={{
                                    backgroundColor: DARK,
                                    color: TEXT,
                                    padding: '0.9rem 2rem',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontFamily: INTER,
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    cursor: status === 'loading' ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {status === 'loading' ? 'Submitting...' : 'Request Assessment'}
                            </button>

                            {status === 'error' && (
                                <p style={{ fontFamily: INTER, fontSize: '0.9rem', color: '#DC2626', fontWeight: 600, margin: 0, textAlign: 'center' }}>
                                    ✗ {errorMessage}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    )
}
