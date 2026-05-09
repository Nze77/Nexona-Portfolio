'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import StickyHeader from '../components/StickyHeader'
import Footer from '../components/Footer'
import ContactSection from '../components/ContactSection'
import ParticleEffect from '../components/ParticleEffect'
import { DARK, SAND, INTER } from '../lib/constants'

export default function MumbaiAgencyPage() {
    const heroRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    })
    
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    return (
        <main style={{ backgroundColor: DARK, color: SAND, minHeight: '100vh', overflow: 'hidden' }}>
            <StickyHeader theme="dark" />

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
                {/* Background Parallax Image */}
                <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, y, zIndex: 0 }}>
                    <Image 
                        src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=2000&auto=format&fit=crop" 
                        alt="Mumbai Skyline"
                        fill
                        style={{ objectFit: 'cover', opacity: 0.3 }}
                        priority
                    />
                    {/* Gradient Overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent, ${DARK})` }} />
                </motion.div>

                <ParticleEffect />
                
                <motion.div style={{ zIndex: 10, opacity, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                        style={{
                            padding: '0.5rem 1.5rem',
                            border: `1px solid rgba(232,223,211,0.2)`,
                            borderRadius: '99px',
                            marginBottom: '2rem',
                            backdropFilter: 'blur(10px)',
                            backgroundColor: 'rgba(46,42,38,0.3)'
                        }}
                    >
                        <span style={{ fontFamily: INTER, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>Mumbai&apos;s Premium Tech Partner</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                        style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                            fontWeight: 800,
                            lineHeight: 0.95,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.04em',
                            maxWidth: '1200px',
                            margin: 0
                        }}
                    >
                        Software Development <br /> Agency <span style={{ color: 'rgba(232,223,211,0.5)' }}>in Mumbai</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        style={{
                            fontFamily: INTER,
                            fontSize: isMobile ? '1rem' : '1.25rem',
                            marginTop: '2rem',
                            opacity: 0.8,
                            maxWidth: '650px',
                            letterSpacing: '0.02em',
                            lineHeight: 1.6
                        }}
                    >
                        Elevating businesses in India&apos;s financial capital with bespoke AI Agents, 
                        intelligent automations, and high-performance enterprise software.
                    </motion.p>
                </motion.div>
            </section>

            {/* Feature Split Section 1 */}
            <section style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '12rem 8%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '3rem' : '6rem' }}>
                    <div style={{ flex: 1, position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '24px', overflow: 'hidden' }}>
                        <Image 
                            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
                            alt="Software Engineering"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            fontWeight: 700,
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                            marginBottom: '2rem'
                        }}>
                            Architecting the <br /> Future of Business
                        </h2>
                        <p style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.7, fontSize: '1.1rem', marginBottom: '2rem' }}>
                            We don&apos;t just write code; we build scalable digital ecosystems. As a leading software development agency in Mumbai, we understand the fast-paced, high-stakes nature of local businesses. From Bandra startups to Nariman Point enterprises, we engineer solutions that drive measurable growth.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {['Bespoke Web & Mobile Applications', 'Scalable Cloud Architecture', 'Secure Financial & Tech Portals'].map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontFamily: INTER, fontWeight: 600 }}>
                                    <div style={{ width: '8px', height: '8px', backgroundColor: DARK, borderRadius: '50%' }} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Feature Split Section 2 (Reversed) */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: isMobile ? '6rem 5%' : '12rem 8%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', alignItems: 'center', gap: isMobile ? '3rem' : '6rem' }}>
                    <div style={{ flex: 1 }}>
                        <h2 style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            fontWeight: 700,
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                            marginBottom: '2rem'
                        }}>
                            AI & Automations <br /> <span style={{ opacity: 0.5 }}>Unleashed</span>
                        </h2>
                        <p style={{ fontFamily: INTER, opacity: 0.8, lineHeight: 1.7, fontSize: '1.1rem', marginBottom: '2rem' }}>
                            Step into the future with our cutting-edge AI integration. We deploy autonomous voice agents, smart customer support hubs, and workflow connectors that run your operations 24/7. Reduce overhead, eliminate manual data entry, and let AI handle the heavy lifting while you focus on scaling.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div>
                                <h4 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>24/7</h4>
                                <p style={{ fontFamily: INTER, fontSize: '0.85rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Uptime & Support</p>
                            </div>
                            <div>
                                <h4 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>10x</h4>
                                <p style={{ fontFamily: INTER, fontSize: '0.85rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Operational Efficiency</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: 1, position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '24px', overflow: 'hidden' }}>
                        <Image 
                            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop"
                            alt="AI Automation"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </section>

            {/* Services Grid Overlay */}
            <section className="product-theme-trigger" data-theme="light" style={{ backgroundColor: SAND, color: DARK, padding: isMobile ? '6rem 5%' : '10rem 8%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
                    <span style={{ fontFamily: INTER, fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>Core Capabilities</span>
                    <h2 style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        fontWeight: 700,
                        marginTop: '1.5rem',
                        marginBottom: '4rem',
                        textTransform: 'uppercase'
                    }}>
                        End-to-End Solutions
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {[
                            { title: 'Full Stack Web Apps', desc: 'React, Next.js, and Node ecosystems built for maximum speed and SEO.', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80' },
                            { title: 'Custom ERP & CRM', desc: 'Tailored management systems designed exactly around your unique workflows.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
                            { title: 'AI Voice & Chat Agents', desc: 'Deploy hyper-realistic AI that communicates with leads and updates your database.', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80' }
                        ].map((s, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    textAlign: 'left',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                                }}
                            >
                                <div style={{ position: 'relative', width: '100%', height: '240px' }}>
                                    <Image src={s.img} alt={s.title} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '2.5rem' }}>
                                    <h4 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>{s.title}</h4>
                                    <p style={{ fontFamily: INTER, fontSize: '1rem', opacity: 0.7, lineHeight: 1.6 }}>{s.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <ContactSection />
            <Footer />
        </main>
    )
}
