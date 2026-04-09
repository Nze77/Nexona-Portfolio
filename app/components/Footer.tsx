'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { DARK, SAND, HELVETICA } from '../lib/constants'
import { fadeUp } from '../lib/variants'

export default function Footer() {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, margin: '-5%' })
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    return (
        <footer
            ref={ref}
            data-theme="dark"
            style={{
                backgroundColor: DARK,
                color: SAND,
                padding: isMobile ? '3rem 5% 2.5rem' : '6rem 5% 4rem',
                borderTop: '1px solid rgba(232,223,211,0.12)',
                fontFamily: HELVETICA,
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'center' : 'flex-end',
                flexWrap: 'wrap',
                gap: '2rem',
                textAlign: isMobile ? 'center' : 'left',
            }}>

                <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}>
                    <h3 style={{
                        fontSize: isMobile ? 'clamp(2.5rem, 10vw, 4rem)' : 'clamp(3rem, 8vw, 7rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.04em',
                        lineHeight: 0.9,
                        marginBottom: '1rem',
                    }}>
                        Nexona
                    </h3>
                    <p style={{ fontSize: '0.85rem', opacity: 0.45, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        We help you grow
                    </p>
                </motion.div>

                <motion.div
                    variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0.15}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        textAlign: isMobile ? 'center' : 'right',
                    }}
                >
                    {[
                        { name: 'Full Stack Websites', href: '/#fullstack' },
                        { name: 'AI Agents', href: '/#ai-agents' },
                        { name: 'Automation', href: '/#automation' },
                        { name: 'Business Optimization', href: '/#business-optimization' },
                        { name: 'Contact', href: '/#contact' }

                    ].map(link => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => {
                                // If we are already on the home page, intercept the click for smooth scroll
                                if (window.location.pathname === '/' && link.href.startsWith('/#')) {
                                    e.preventDefault()
                                    const id = link.href.slice(2) // remove '/#'
                                    const el = document.getElementById(id)
                                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                                }
                                // Else, let the browser naturally navigate to /#id
                            }}
                            className="nav-link"
                            style={{
                                fontSize: isMobile ? '0.75rem' : '0.8rem',
                                letterSpacing: '0.2rem',
                                textTransform: 'uppercase',
                                opacity: 0.65,
                                color: SAND,
                                textDecoration: 'none',
                            }}
                        >
                            {link.name}
                        </a>
                    ))}
                </motion.div>

            </div>

            <div style={{
                marginTop: isMobile ? '2.5rem' : '5rem',
                borderTop: '1px solid rgba(232,223,211,0.12)',
                paddingTop: '1.5rem',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'center' : 'flex-start',
                gap: isMobile ? '0.5rem' : '0',
                fontSize: '0.72rem',
                opacity: 0.35,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textAlign: isMobile ? 'center' : 'left',
            }}>
                <span>© 2026 Nexona. All rights reserved.</span>
                <span>Minimal design curation</span>
            </div>
        </footer>
    )
}