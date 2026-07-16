'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'
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
                        textAlign: isMobile ? 'center' : 'left',
                    }}
                >
                    <span style={{
                        fontSize: '0.72rem',
                        letterSpacing: '0.2rem',
                        textTransform: 'uppercase',
                        opacity: 0.35,
                        marginBottom: '0.25rem',
                    }}>
                        Contact Us
                    </span>
                    {[
                        { Icon: Phone, label: '+91 90822 07416', href: 'tel:+919082207416' },
                        { Icon: Mail, label: 'info@nexonalabs.com', href: 'mailto:info@nexonalabs.com' },
                    ].map(({ Icon, label, href }) => (
                        <a
                            key={href}
                            href={href}
                            className="nav-link"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: isMobile ? 'center' : 'flex-start',
                                gap: '0.6rem',
                                fontSize: isMobile ? '0.8rem' : '0.85rem',
                                letterSpacing: '0.05em',
                                opacity: 0.65,
                                color: SAND,
                                textDecoration: 'none',
                            }}
                        >
                            <Icon size={15} strokeWidth={1.5} aria-hidden />
                            {label}
                        </a>
                    ))}
                    <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isMobile ? 'center' : 'flex-start',
                        gap: '0.6rem',
                        fontSize: isMobile ? '0.8rem' : '0.85rem',
                        letterSpacing: '0.05em',
                        opacity: 0.65,
                    }}>
                        <MapPin size={15} strokeWidth={1.5} aria-hidden />
                        Mumbai, India
                    </span>
                </motion.div>

                <motion.div
                    variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0.3}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        textAlign: isMobile ? 'center' : 'right',
                    }}
                >
                    {[
                        { name: 'ERP Development', href: '/erp-systems-for-manufacturers' },
                        { name: 'Software Development', href: '/software-development-agency-mumbai' },
                    ].map(link => (
                        <a
                            key={link.name}
                            href={link.href}
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
            </div>
        </footer>
    )
}