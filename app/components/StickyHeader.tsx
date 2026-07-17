'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ContactOverlay from './ContactOverlay'
import { DARK, SAND, INTER } from '../lib/constants'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

/** An entry with no `href` opens the contact overlay instead of navigating. */
const NAV_LINKS: { name: string; href?: string }[] = [
    { name: 'Projects', href: '/projects' },
    { name: 'Contact' }
]

interface ServiceLink {
    name: string
    /** Omit to open the contact overlay instead of navigating. */
    href?: string
    /** Renders this entry as a submenu parent instead of a plain link. */
    children?: { name: string; href: string }[]
}

// Only the manufacturing ERP and software development pages exist. Everything
// else opens the contact overlay until there's somewhere better to send them.
const SERVICES: ServiceLink[] = [
    {
        name: 'Custom ERP',
        href: '/erp-systems-for-manufacturers',
        children: [
            { name: 'Manufacturing ERP', href: '/manufacturing-erp' },
            { name: 'College/School ERP', href: '/college-erp' },
        ],
    },
    { name: 'Custom CRM' },
    { name: 'Software Development', href: '/software-development-agency-mumbai' },
    { name: 'Website Development' },
    { name: 'Automations' },
]

const navItemStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    letterSpacing: '0.01em',
    textTransform: 'uppercase',
    fontWeight: 500,
    color: 'inherit',
    textDecoration: 'none',
    opacity: 1,
}

export default function StickyHeader({
    theme = 'dark',
    showBrand = true,
    onContactClick,
}: {
    theme?: 'dark' | 'light'
    /** Render the centered "Nexona" wordmark. Disable on the root page, whose
     *  MorphingBrand supplies its own animated wordmark. */
    showBrand?: boolean
    /** When provided, Contact calls this instead of opening the built-in
     *  overlay (used by landing pages that have their own lead popup). */
    onContactClick?: () => void
}) {
    const headerRef = useRef<HTMLElement>(null)
    const dividerRef = useRef<HTMLDivElement>(null)
    const [menuOpen, setMenuOpen] = useState(false)
    /** Built-in contact overlay — only used when no onContactClick is given. */
    const [contactOpen, setContactOpen] = useState(false)
    const [servicesOpen, setServicesOpen] = useState(false)
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
    /** Name of the services row whose nested accordion is open (mobile). */
    const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null)
    // Item hover is tracked in state rather than CSS: the rows are <Link>s, and
    // styled-jsx doesn't scope component tags — a :hover class would never apply.
    // Keyed "i" for a top-level row, "i-j" for a submenu row.
    const [hoveredService, setHoveredService] = useState<string | null>(null)
    /** Index of the services row whose submenu is open (desktop). */
    const [openSub, setOpenSub] = useState<number | null>(null)

    // Landing pages with their own lead popup pass onContactClick; everyone
    // else gets the built-in overlay.
    const openContact = onContactClick ?? (() => setContactOpen(true))

    const initialBg = theme === 'light' ? SAND : DARK
    const initialColor = theme === 'light' ? DARK : SAND
    const initialDiv = theme === 'light' ? 'rgba(46,42,38,0.2)' : 'rgba(232,223,211,0.2)'

    const [currentBg, setCurrentBg] = useState(initialBg)
    const [currentColor, setCurrentColor] = useState(initialColor)

    useEffect(() => {
        if (!headerRef.current) return

        const ctx = gsap.context(() => {
            const themedElements = document.querySelectorAll('[data-theme]')
            const brand = document.querySelector('.brand-wordmark')

            themedElements.forEach(el => {
                const themeAttr = el.getAttribute('data-theme')
                if (!themeAttr) return

                if (themeAttr === 'circle') {
                    const scrubConfig = {
                        trigger: el,
                        start: 'top top',
                        end: '65% bottom',
                        scrub: true,
                        invalidateOnRefresh: true,
                        overwrite: 'auto'
                    }

                    gsap.fromTo(headerRef.current,
                        { backgroundColor: DARK, color: SAND },
                        {
                            backgroundColor: SAND,
                            color: DARK,
                            ease: 'none',
                            scrollTrigger: {
                                ...scrubConfig,
                                onUpdate: (self) => {
                                    // Interpolate colors for React state to keep menu in sync
                                    if (self.progress > 0.5) {
                                        setCurrentBg(SAND)
                                        setCurrentColor(DARK)
                                    } else {
                                        setCurrentBg(DARK)
                                        setCurrentColor(SAND)
                                    }
                                }
                            },
                            immediateRender: false
                        }
                    )

                    if (brand) {
                        gsap.fromTo(brand,
                            { color: SAND },
                            {
                                color: DARK,
                                ease: 'none',
                                scrollTrigger: scrubConfig,
                                immediateRender: false
                            }
                        )
                    }

                    if (dividerRef.current) {
                        gsap.fromTo(dividerRef.current,
                            { backgroundColor: 'rgba(232,223,211,0.2)' },
                            {
                                backgroundColor: 'rgba(46,42,38,0.2)',
                                ease: 'none',
                                scrollTrigger: scrubConfig,
                                immediateRender: false
                            }
                        )
                    }
                } else {
                    const isLight = themeAttr === 'light'
                    const targetBg = isLight ? SAND : DARK
                    const targetColor = isLight ? DARK : SAND
                    const targetDiv = isLight ? 'rgba(46,42,38,0.2)' : 'rgba(232,223,211,0.2)'

                    const isProduct = el.classList.contains('product-theme-trigger')
                    const startPoint = isProduct ? 'top 50%' : 'top top'
                    const endPoint = isProduct ? 'bottom 50%' : 'bottom top'

                    ScrollTrigger.create({

                        trigger: el,
                        start: startPoint,
                        end: endPoint,
                        onEnter: () => updateHeader(targetBg, targetColor, targetDiv, isProduct),
                        onEnterBack: () => updateHeader(targetBg, targetColor, targetDiv, isProduct),
                    })
                }
            })

            function updateHeader(bg: string, color: string, div: string, isProduct: boolean) {
                const duration = isProduct ? 0 : 0.4
                setCurrentBg(bg)
                setCurrentColor(color)
                gsap.to(headerRef.current, { backgroundColor: bg, color: color, duration, ease: 'sine.inOut', overwrite: 'auto' })
                if (brand) gsap.to(brand, { color: color, duration, ease: 'sine.inOut', overwrite: 'auto' })
                if (dividerRef.current) gsap.to(dividerRef.current, { backgroundColor: div, duration, overwrite: 'auto' })
            }

            ScrollTrigger.refresh()

        }, headerRef)

        return () => ctx.revert()
    }, [])


    // Close menu on scroll
    useEffect(() => {
        if (!menuOpen) return
        const handleScroll = () => setMenuOpen(false)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [menuOpen])

    // The dropdown would otherwise hang around after the header slides away on
    // scroll, or trap a keyboard user with no way out.
    useEffect(() => {
        if (!servicesOpen) return
        const close = () => { setServicesOpen(false); setHoveredService(null); setOpenSub(null) }
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
        window.addEventListener('scroll', close, { passive: true })
        window.addEventListener('keydown', onKey)
        return () => {
            window.removeEventListener('scroll', close)
            window.removeEventListener('keydown', onKey)
        }
    }, [servicesOpen])

    // Lock body scroll when the menu is open. ContactOverlay locks scroll on its
    // own too, but contactOpen has to be accounted for here: opening the overlay
    // from the mobile menu closes the menu, and this effect would otherwise run
    // afterwards and unlock the body straight back out from under the overlay.
    useEffect(() => {
        document.body.style.overflow = menuOpen || contactOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen, contactOpen])

    // Collapse the services accordion once the overlay closes, so reopening the
    // menu doesn't reveal it mid-expanded.
    useEffect(() => {
        if (!menuOpen) { setMobileServicesOpen(false); setMobileSubOpen(null) }
    }, [menuOpen])

    // Collapsing Services shouldn't leave a nested accordion open underneath it.
    useEffect(() => {
        if (!mobileServicesOpen) setMobileSubOpen(null)
    }, [mobileServicesOpen])

    return (
        <>
            <header
                ref={headerRef}
                id="main-sticky-header"
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: menuOpen ? 110 : 80,
                    backgroundColor: initialBg,
                    color: initialColor,
                    fontFamily: INTER,
                    willChange: 'background-color, color',
                }}
            >

                {/* Nav row. Desktop: brand left, links right. Mobile: brand centered,
                    hamburger right — see the media query at the bottom of this file. */}
                <div className="navRow">
                    {/* Nexona wordmark — matches the docked MorphingBrand state */}
                    {showBrand && (
                        <div className="brandCell">
                            <Link
                                href="/"
                                aria-label="Nexona — home"
                                // Font size is inherited from .brandCell, so the
                                // breakpoint can override it. It cannot live here:
                                // an inline style can't be overridden by a media
                                // query, and a styled-jsx class wouldn't apply —
                                // styled-jsx only scopes real tags, not <Link>.
                                className="brand-wordmark"
                                style={{
                                    fontFamily: INTER,
                                    fontWeight: 700,
                                    letterSpacing: '-0.08em',
                                    lineHeight: 1,
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Nexona
                            </Link>
                        </div>
                    )}

                    {/* Desktop nav links + mobile hamburger */}
                    <div className="navCell">
                        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                            {/* Services dropdown. The menu is a child of this wrapper and
                                sits flush against the trigger, so moving the pointer onto
                                it never leaves the wrapper and never closes the menu. */}
                            <div
                                className="servicesWrap"
                                onMouseEnter={() => setServicesOpen(true)}
                                onMouseLeave={() => { setServicesOpen(false); setHoveredService(null); setOpenSub(null) }}
                            >
                                <button
                                    type="button"
                                    aria-haspopup="true"
                                    aria-expanded={servicesOpen}
                                    onClick={() => setServicesOpen(o => !o)}
                                    style={{
                                        ...navItemStyle,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        background: 'none',
                                        border: 'none',
                                        padding: 0,
                                        cursor: 'pointer',
                                        fontFamily: 'inherit',
                                    }}
                                >
                                    Services
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            display: 'inline-block',
                                            fontSize: '0.6em',
                                            lineHeight: 1,
                                            transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.2s ease',
                                        }}
                                    >
                                        ▼
                                    </span>
                                </button>

                                {/* padding-top bridges the visual gap to the panel while
                                    keeping the hover target continuous */}
                                <div
                                    className="servicesMenu"
                                    style={{
                                        opacity: servicesOpen ? 1 : 0,
                                        visibility: servicesOpen ? 'visible' : 'hidden',
                                        transform: servicesOpen ? 'translateY(0)' : 'translateY(-6px)',
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: currentBg,
                                            border: `1px solid ${currentColor === DARK ? 'rgba(46,42,38,0.15)' : 'rgba(232,223,211,0.15)'}`,
                                            borderRadius: '0.5rem',
                                            padding: '0.5rem 0',
                                            minWidth: '15rem',
                                            boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
                                        }}
                                    >
                                        {SERVICES.map((service, i) => {
                                            const rowStyle: React.CSSProperties = {
                                                display: 'block',
                                                padding: '0.7rem 1.25rem',
                                                fontSize: '0.75rem',
                                                letterSpacing: '0.08em',
                                                textTransform: 'uppercase',
                                                fontWeight: 500,
                                                whiteSpace: 'nowrap',
                                                color: currentColor,
                                                textDecoration: 'none',
                                                transition: 'background-color 0.18s ease',
                                            }
                                            const tint = currentColor === DARK ? 'rgba(46,42,38,0.07)' : 'rgba(232,223,211,0.1)'

                                            if (!service.children) {
                                                const rowProps = {
                                                    onMouseEnter: () => setHoveredService(`${i}`),
                                                    onMouseLeave: () => setHoveredService(null),
                                                    tabIndex: servicesOpen ? undefined : -1,
                                                    style: {
                                                        ...rowStyle,
                                                        backgroundColor: hoveredService === `${i}` ? tint : 'transparent',
                                                    },
                                                }

                                                if (!service.href) {
                                                    return (
                                                        <button
                                                            key={service.name}
                                                            type="button"
                                                            onClick={() => { setServicesOpen(false); openContact() }}
                                                            {...rowProps}
                                                            style={{
                                                                ...rowProps.style,
                                                                width: '100%',
                                                                textAlign: 'left',
                                                                background: hoveredService === `${i}` ? tint : 'none',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                fontFamily: 'inherit',
                                                            }}
                                                        >
                                                            {service.name}
                                                        </button>
                                                    )
                                                }

                                                return (
                                                    <Link
                                                        key={service.name}
                                                        href={service.href}
                                                        onClick={() => setServicesOpen(false)}
                                                        {...rowProps}
                                                    >
                                                        {service.name}
                                                    </Link>
                                                )
                                            }

                                            // Submenu parent. It opens to the LEFT: the panel
                                            // already sits at the right edge of the viewport.
                                            const subOpen = openSub === i
                                            return (
                                                <div
                                                    key={service.name}
                                                    className="subWrap"
                                                    onMouseEnter={() => { setOpenSub(i); setHoveredService(`${i}`) }}
                                                    onMouseLeave={() => { setOpenSub(null); setHoveredService(null) }}
                                                >
                                                    <div
                                                        style={{
                                                            ...rowStyle,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            gap: '1.5rem',
                                                            cursor: 'default',
                                                            backgroundColor: hoveredService === `${i}` ? tint : 'transparent',
                                                        }}
                                                    >
                                                        {service.name}
                                                        <span
                                                            aria-hidden="true"
                                                            style={{ fontSize: '0.6em', opacity: 0.7 }}
                                                        >
                                                            ◀
                                                        </span>
                                                    </div>

                                                    <div
                                                        className="subMenu"
                                                        style={{
                                                            opacity: subOpen ? 1 : 0,
                                                            visibility: subOpen ? 'visible' : 'hidden',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                backgroundColor: currentBg,
                                                                border: `1px solid ${currentColor === DARK ? 'rgba(46,42,38,0.15)' : 'rgba(232,223,211,0.15)'}`,
                                                                borderRadius: '0.5rem',
                                                                padding: '0.5rem 0',
                                                                minWidth: '13rem',
                                                                boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
                                                            }}
                                                        >
                                                            {service.children.map((child, j) => (
                                                                <Link
                                                                    key={child.name}
                                                                    href={child.href}
                                                                    onClick={() => { setServicesOpen(false); setOpenSub(null) }}
                                                                    onMouseEnter={() => setHoveredService(`${i}-${j}`)}
                                                                    onMouseLeave={() => setHoveredService(`${i}`)}
                                                                    tabIndex={subOpen ? undefined : -1}
                                                                    style={{
                                                                        ...rowStyle,
                                                                        backgroundColor: hoveredService === `${i}-${j}` ? tint : 'transparent',
                                                                    }}
                                                                >
                                                                    {child.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                            <Link href="/projects" style={navItemStyle}>
                                Projects
                            </Link>
                            <button
                                type="button"
                                onClick={openContact}
                                style={{ ...navItemStyle, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}
                            >
                                Contact
                            </button>
                        </div>

                        {/* Mobile hamburger button — 3 equal, evenly spaced lines */}
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                            style={{
                                display: 'none',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '8px',
                                color: currentColor,
                                zIndex: 100,
                                position: 'relative',
                                width: '40px',
                                height: '40px',
                            }}
                        >
                            <div style={{
                                position: 'relative',
                                width: '24px',
                                height: '18px',
                                margin: '0 auto',
                            }}>
                                {[0, 8, 16].map((topPos, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            width: '24px',
                                            height: '2px',
                                            backgroundColor: 'currentColor',
                                            borderRadius: '2px',
                                            transition: 'all 0.3s ease',
                                            top: menuOpen ? '8px' : `${topPos}px`,
                                            opacity: menuOpen && i === 1 ? 0 : 1,
                                            transform: menuOpen
                                                ? (i === 0 ? 'rotate(45deg)' : i === 2 ? 'rotate(-45deg)' : 'none')
                                                : 'none',
                                        }}
                                    />
                                ))}
                            </div>
                        </button>
                    </div>

                </div>

                {/* Divider */}
                <div
                    ref={dividerRef}
                    style={{
                        height: '1px',
                        backgroundColor: initialDiv,
                        margin: '0 2rem',
                        willChange: 'background-color',
                    }}
                />
            </header>

            {/* Mobile Menu Overlay */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    backgroundColor: currentBg,
                    zIndex: 105,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2rem',
                    // The list is long enough now to overflow a short phone screen.
                    padding: '5rem 1.5rem',
                    overflowY: 'auto',
                    opacity: menuOpen ? 1 : 0,
                    pointerEvents: menuOpen ? 'auto' : 'none',
                    transition: 'opacity 0.3s ease',
                }}
            >
                {/* Services — tap to expand. No hover on a phone, so the trigger
                    toggles instead, and the panel animates via max-height. */}
                {/* gap:0 — the collapsed panel below is zero-height, but a flex gap
                    would still push PROJECTS down and break the even rhythm. The
                    panel supplies its own spacing via padding when it opens. */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                    <button
                        type="button"
                        aria-expanded={mobileServicesOpen}
                        onClick={() => setMobileServicesOpen(o => !o)}
                        style={{
                            // relative: the caret is taken out of flow below, so the
                            // word itself centers with PROJECTS/CONTACT instead of
                            // "Services ▾" centering as one wider unit.
                            position: 'relative',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            color: currentColor,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            fontFamily: INTER,
                            lineHeight: 1.2,
                            opacity: menuOpen ? 1 : 0,
                            transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.4s ease',
                        }}
                    >
                        Services
                        <span
                            aria-hidden="true"
                            style={{
                                position: 'absolute',
                                left: '100%',
                                top: '50%',
                                marginLeft: '0.5rem',
                                fontSize: '0.5em',
                                lineHeight: 1,
                                transform: mobileServicesOpen
                                    ? 'translateY(-50%) rotate(180deg)'
                                    : 'translateY(-50%) rotate(0deg)',
                                transition: 'transform 0.25s ease',
                            }}
                        >
                            ▼
                        </span>
                    </button>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem',
                            // max-height animates; height:auto would not. Padding is
                            // part of the same collapse, so a shut panel adds nothing
                            // to the spacing between SERVICES and PROJECTS. The cap
                            // has to grow for the nested accordion or it clips.
                            maxHeight: mobileServicesOpen ? (mobileSubOpen ? '34rem' : '22rem') : 0,
                            paddingTop: mobileServicesOpen ? '1.25rem' : 0,
                            opacity: mobileServicesOpen ? 1 : 0,
                            overflow: 'hidden',
                            transition: 'max-height 0.35s ease, padding-top 0.35s ease, opacity 0.25s ease',
                        }}
                    >
                        {SERVICES.map((service) => {
                            const itemStyle: React.CSSProperties = {
                                fontSize: '1.05rem',
                                fontWeight: 500,
                                color: currentColor,
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontFamily: INTER,
                                opacity: 0.8,
                                whiteSpace: 'nowrap',
                            }

                            if (!service.children) {
                                if (!service.href) {
                                    return (
                                        <button
                                            key={service.name}
                                            type="button"
                                            onClick={() => { setMenuOpen(false); openContact() }}
                                            tabIndex={menuOpen && mobileServicesOpen ? undefined : -1}
                                            style={{ ...itemStyle, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                                        >
                                            {service.name}
                                        </button>
                                    )
                                }

                                return (
                                    <Link
                                        key={service.name}
                                        href={service.href}
                                        onClick={() => setMenuOpen(false)}
                                        tabIndex={menuOpen && mobileServicesOpen ? undefined : -1}
                                        style={itemStyle}
                                    >
                                        {service.name}
                                    </Link>
                                )
                            }

                            // Nested accordion — no hover on touch, so it taps open.
                            const subOpen = mobileSubOpen === service.name
                            return (
                                <div
                                    key={service.name}
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}
                                >
                                    <button
                                        type="button"
                                        aria-expanded={subOpen}
                                        onClick={() => setMobileSubOpen(subOpen ? null : service.name)}
                                        tabIndex={menuOpen && mobileServicesOpen ? undefined : -1}
                                        style={{
                                            ...itemStyle,
                                            position: 'relative',
                                            background: 'none',
                                            border: 'none',
                                            padding: 0,
                                            cursor: 'pointer',
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {service.name}
                                        <span
                                            aria-hidden="true"
                                            style={{
                                                position: 'absolute',
                                                left: '100%',
                                                top: '50%',
                                                marginLeft: '0.45rem',
                                                fontSize: '0.5em',
                                                lineHeight: 1,
                                                transform: subOpen
                                                    ? 'translateY(-50%) rotate(180deg)'
                                                    : 'translateY(-50%) rotate(0deg)',
                                                transition: 'transform 0.25s ease',
                                            }}
                                        >
                                            ▼
                                        </span>
                                    </button>

                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            maxHeight: subOpen ? '10rem' : 0,
                                            paddingTop: subOpen ? '0.85rem' : 0,
                                            opacity: subOpen ? 1 : 0,
                                            overflow: 'hidden',
                                            transition: 'max-height 0.3s ease, padding-top 0.3s ease, opacity 0.22s ease',
                                        }}
                                    >
                                        {service.children.map((child) => (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                onClick={() => setMenuOpen(false)}
                                                tabIndex={menuOpen && mobileServicesOpen && subOpen ? undefined : -1}
                                                style={{ ...itemStyle, fontSize: '0.9rem', opacity: 0.6 }}
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {NAV_LINKS.map((link, i) => {
                    // Continue the stagger after the services block above.
                    const delay = (SERVICES.length + 1 + i) * 0.06
                    const linkStyle: React.CSSProperties = {
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: currentColor,
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontFamily: INTER,
                        opacity: menuOpen ? 1 : 0,
                        transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                        transition: `all 0.4s ease ${delay}s`,
                    }

                    if (!link.href) {
                        return (
                            <button
                                key={link.name}
                                type="button"
                                onClick={() => { setMenuOpen(false); openContact() }}
                                style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                {link.name}
                            </button>
                        )
                    }

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            style={linkStyle}
                        >
                            {link.name}
                        </Link>
                    )
                })}
            </div>

            {/* Built-in contact overlay. Hosts that pass onContactClick open
                their own popup instead, so contactOpen never flips for them. */}
            <AnimatePresence>
                {contactOpen && <ContactOverlay onClose={() => setContactOpen(false)} />}
            </AnimatePresence>

            {/* CSS for responsive show/hide */}
            <style jsx>{`
                /* Desktop: two columns — brand hard left, links hard right. The nav
                   cell is pinned to column 2 so it stays right-aligned even on the
                   root page, where showBrand is false and column 1 collapses. */
                .navRow {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    align-items: center;
                    padding: 0 2rem;
                    height: 6rem;
                }
                /* Desktop wordmark: caps at 3.5rem (56px). The size sits here rather
                   than on the <Link> inside, which inherits it — see the note there. */
                .brandCell {
                    grid-column: 1;
                    justify-self: start;
                    display: flex;
                    align-items: center;
                    font-size: clamp(3rem, 4.5vw, 3.5rem);
                }
                .navCell { grid-column: 2; justify-self: end; display: flex; align-items: center; }

                .servicesWrap { position: relative; display: flex; align-items: center; }
                /* Anchored at top:100% with no gap — the padding inside provides the
                   visual offset, so the pointer never crosses dead space on its way
                   to the panel and the menu stays open. */
                .servicesMenu {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    padding-top: 1.1rem;
                    z-index: 120;
                    transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s;
                }

                .subWrap { position: relative; }
                /* Opens leftward — the parent panel already sits against the right
                   edge of the viewport. right:100% keeps it flush against the panel,
                   so the pointer crosses no gap and the flyout stays open. */
                .subMenu {
                    position: absolute;
                    right: 100%;
                    top: -0.5rem;
                    padding-right: 0.4rem;
                    z-index: 130;
                    transition: opacity 0.18s ease, visibility 0.18s;
                }

                .desktop-nav { display: flex !important; }
                .mobile-menu-btn { display: none !important; }

                @media (max-width: 768px) {
                    /* Mobile is unchanged: empty gutter, centered brand, hamburger right. */
                    .navRow { grid-template-columns: 1fr auto 1fr; }
                    /* Mobile keeps the original size, matching MorphingBrand's 52px dock. */
                    .brandCell {
                        grid-column: 2;
                        justify-self: center;
                        font-size: clamp(3.25rem, 7vw, 5rem);
                    }
                    .navCell { grid-column: 3; }

                    .desktop-nav { display: none !important; }
                    .mobile-menu-btn { display: block !important; }
                }
            `}</style>
        </>
    )
}