'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import StickyHeader from '../components/StickyHeader'
import Footer from '../components/Footer'
import ContactSection from '../components/ContactSection'
import ParticleEffect from '../components/ParticleEffect'
import { DARK, SAND, INTER } from '../lib/constants'

export default function MumbaiAgencyPage() {
    const heroRef = useRef<HTMLElement>(null)

    return (
        <main style={{ backgroundColor: DARK, color: SAND, minHeight: '100vh' }}>
            <StickyHeader theme="dark" />

            {/* Hero Section */}
            <section
                ref={heroRef}
                style={{
                    height: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '0 5%',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <ParticleEffect />
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                        fontWeight: 800,
                        lineHeight: 0.9,
                        textTransform: 'uppercase',
                        letterSpacing: '-0.04em',
                        maxWidth: '1200px',
                        margin: 0
                    }}
                >
                    Software Development <br /> Agency in Mumbai
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: '1.2rem',
                        marginTop: '2rem',
                        opacity: 0.7,
                        maxWidth: '700px',
                        letterSpacing: '0.02em',
                        lineHeight: 1.5
                    }}
                >
                    Elevating businesses in India&apos;s financial capital with bespoke AI Agents, 
                    Automations, and High-Performance Enterprise Software.
                </motion.p>
            </section>

            {/* Content Section */}
            <section style={{ backgroundColor: SAND, color: DARK, padding: '10rem 8%' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        fontWeight: 700,
                        lineHeight: 1,
                        textTransform: 'uppercase',
                        marginBottom: '4rem'
                    }}>
                        Why Mumbai Businesses <br /> Trust Nexona
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '4rem'
                    }}>
                        <div style={{ borderTop: `1px solid ${DARK}`, paddingTop: '2rem' }}>
                            <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Local Expertise</h3>
                            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", opacity: 0.7, lineHeight: 1.6 }}>Understanding the fast-paced market of Mumbai, we deliver solutions that are not just technically sound but strategically aligned with local business goals.</p>
                        </div>
                        <div style={{ borderTop: `1px solid ${DARK}`, paddingTop: '2rem' }}>
                            <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Next-Gen AI</h3>
                            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", opacity: 0.7, lineHeight: 1.6 }}>We integrate cutting-edge AI agents to automate customer service, sales, and internal workflows, giving you a competitive edge.</p>
                        </div>
                        <div style={{ borderTop: `1px solid ${DARK}`, paddingTop: '2rem' }}>
                            <h3 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Enterprise Ready</h3>
                            <p style={{ fontFamily: "var(--font-montserrat), sans-serif", opacity: 0.7, lineHeight: 1.6 }}>From custom ERPs to robust CRM systems, we build scalable software that grows with your organization.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Highlight */}
            <section style={{ backgroundColor: DARK, color: SAND, padding: '10rem 8%' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5 }}>Core Offerings</span>
                    <h2 style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        fontWeight: 700,
                        marginTop: '1.5rem',
                        marginBottom: '5rem',
                        textTransform: 'uppercase'
                    }}>
                        Transforming Operations <br /> through Innovation
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        {[
                            { title: 'Full Stack Development', desc: 'Custom web and mobile applications built for scale.' },
                            { title: 'AI & Automations', desc: 'Smarter business processes with agentic AI.' },
                            { title: 'Custom ERP/CRM', desc: 'Tailored management systems for your unique needs.' },
                            { title: 'Legacy Modernization', desc: 'Upgrading your tech stack for the modern era.' }
                        ].map((s, i) => (
                            <div key={i} style={{
                                backgroundColor: '#3d3731',
                                padding: '3rem 2rem',
                                borderRadius: '12px',
                                textAlign: 'left'
                            }}>
                                <h4 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>{s.title}</h4>
                                <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: '0.9rem', opacity: 0.6, lineHeight: 1.5 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ContactSection />
            <Footer />
        </main>
    )
}
