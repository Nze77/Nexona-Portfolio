'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'
import { DARK, SAND, HELVETICA, BUSINESS_PHONE, BUSINESS_PHONE_DISPLAY, BUSINESS_EMAIL, BUSINESS_LOCATION_DISPLAY } from '../lib/constants'
import { LANDING_PAGES } from '../data/landingPages'
import { fadeUp } from '../lib/variants'

/** Profiles we link out to. Also the list to mirror into `sameAs` structured
 *  data if we ever add an Organization schema. */
const SOCIALS = [
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/nexonalabs',
        // Brand glyphs aren't in lucide v1, so the paths are inlined rather
        // than pulling in a second icon package for two icons.
        path: (
            <>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </>
        ),
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/company/nexonalabs',
        path: (
            <>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </>
        ),
    },
]

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
                        { Icon: Phone, label: BUSINESS_PHONE_DISPLAY, href: `tel:${BUSINESS_PHONE}` },
                        { Icon: Mail, label: BUSINESS_EMAIL, href: `mailto:${BUSINESS_EMAIL}` },
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
                        {BUSINESS_LOCATION_DISPLAY}
                    </span>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isMobile ? 'center' : 'flex-start',
                        gap: '0.75rem',
                        marginTop: '0.5rem',
                    }}>
                        {SOCIALS.map(social => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Nexona on ${social.name}`}
                                title={social.name}
                                className="nav-link"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '34px',
                                    height: '34px',
                                    borderRadius: '50%',
                                    border: '1px solid rgba(232,223,211,0.22)',
                                    color: SAND,
                                    opacity: 0.65,
                                }}
                            >
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden
                                >
                                    {social.path}
                                </svg>
                            </a>
                        ))}
                    </div>
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
                        // Every landing page gets a real crawlable <a> here. Google reported
                        // "Referring page: None detected" on pages that were missing from this
                        // list — a page in sitemap.xml with zero internal links reads as
                        // low-priority and sits in "Discovered – currently not indexed".
                        // Sourced from the registry so new landing pages are never orphaned.
                        ...LANDING_PAGES.map(page => ({
                            name: page.navLabel ?? page.title,
                            href: `/${page.slug}`,
                        })),
                        { name: 'Projects', href: '/projects' },
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