'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'
import { DARK, SAND, HELVETICA, BUSINESS_PHONE, BUSINESS_PHONE_DISPLAY, BUSINESS_EMAIL, BUSINESS_LOCATION_DISPLAY } from '../lib/constants'
import { LANDING_PAGES, type LandingPage } from '../data/landingPages'
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

// Every landing page gets a real crawlable <a> here. Google reported
// "Referring page: None detected" on pages that were missing from the footer —
// a page in sitemap.xml with zero internal links reads as low-priority and sits
// in "Discovered – currently not indexed". Sourced from the registry so new
// landing pages are never orphaned; `footerGroup` decides the column.
const linksFor = (group: LandingPage['footerGroup']) =>
    LANDING_PAGES
        .filter(page => page.footerGroup === group)
        .map(page => ({ name: page.navLabel ?? page.title, href: `/${page.slug}` }))

const LINK_COLUMNS = [
    { heading: 'Services', links: linksFor('services') },
    { heading: 'Solutions', links: linksFor('solutions') },
    { heading: 'Locations', links: linksFor('local') },
    {
        heading: 'Company',
        links: [
            { name: 'Projects', href: '/projects' },
            { name: 'Blogs', href: '/blogs' },
        ],
    },
]

const columnHeadingStyle: React.CSSProperties = {
    fontSize: '0.68rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    opacity: 0.35,
    marginBottom: '0.35rem',
}

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

    const linkStyle: React.CSSProperties = {
        fontSize: isMobile ? '0.8rem' : '0.82rem',
        lineHeight: 1.35,
        opacity: 0.65,
        color: SAND,
        textDecoration: 'none',
        alignSelf: 'flex-start',
    }

    return (
        <footer
            ref={ref}
            data-theme="dark"
            style={{
                backgroundColor: DARK,
                color: SAND,
                padding: isMobile ? '3rem 5% 2rem' : '4rem 5% 2rem',
                borderTop: '1px solid rgba(232,223,211,0.12)',
                fontFamily: HELVETICA,
            }}
        >
            {/* Brand + contact on the left, link columns side by side on the
                right — wide and shallow instead of one tall stack of links. */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'minmax(220px, 1fr) 3fr',
                gap: isMobile ? '2.5rem' : '4rem',
                alignItems: 'start',
            }}>
                <motion.div
                    variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
                    style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}
                >
                    <h3 style={{
                        fontSize: isMobile ? '2.5rem' : 'clamp(2.5rem, 4vw, 3.5rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.04em',
                        lineHeight: 0.9,
                        margin: '0 0 0.25rem 0',
                    }}>
                        Nexona
                    </h3>
                    <p style={{ fontSize: '0.72rem', opacity: 0.45, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.75rem 0' }}>
                        We help you grow
                    </p>
                    {[
                        { Icon: Phone, label: BUSINESS_PHONE_DISPLAY, href: `tel:${BUSINESS_PHONE}` },
                        { Icon: Mail, label: BUSINESS_EMAIL, href: `mailto:${BUSINESS_EMAIL}` },
                    ].map(({ Icon, label, href }) => (
                        <a
                            key={href}
                            href={href}
                            className="nav-link"
                            style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: '0.55rem' }}
                        >
                            <Icon size={14} strokeWidth={1.5} aria-hidden />
                            {label}
                        </a>
                    ))}
                    <span style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                        <MapPin size={14} strokeWidth={1.5} aria-hidden />
                        {BUSINESS_LOCATION_DISPLAY}
                    </span>
                </motion.div>

                <motion.nav
                    aria-label="Footer"
                    variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0.15}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))',
                        gap: isMobile ? '2rem 1.5rem' : '2.5rem',
                    }}
                >
                    {LINK_COLUMNS.map(col => (
                        <div key={col.heading} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            <span style={columnHeadingStyle}>{col.heading}</span>
                            {col.links.map(link => (
                                <a key={link.href} href={link.href} className="nav-link" style={linkStyle}>
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    ))}
                </motion.nav>
            </div>

            {/* Bottom bar: copyright left, socials right. */}
            <div style={{
                marginTop: isMobile ? '2.5rem' : '3rem',
                borderTop: '1px solid rgba(232,223,211,0.12)',
                paddingTop: '1.25rem',
                display: 'flex',
                flexDirection: isMobile ? 'column-reverse' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
            }}>
                <span style={{ fontSize: '0.7rem', opacity: 0.35, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    © 2026 Nexona. All rights reserved.
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
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
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                border: '1px solid rgba(232,223,211,0.22)',
                                color: SAND,
                                opacity: 0.65,
                            }}
                        >
                            <svg
                                width="14"
                                height="14"
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
            </div>
        </footer>
    )
}
