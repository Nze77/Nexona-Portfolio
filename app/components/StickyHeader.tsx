'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DARK, SAND, INTER } from '../lib/constants'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const NAV_LINKS = [
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '#contact' }
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

export default function StickyHeader({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
    const headerRef = useRef<HTMLElement>(null)
    const dividerRef = useRef<HTMLDivElement>(null)
    const [menuOpen, setMenuOpen] = useState(false)

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

    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

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

                {/* Nav row */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 2rem',
                    height: '6rem',
                }}>
                    {/* Desktop nav links */}
                    <div className="desktop-nav" style={{ display: 'flex', gap: '2rem' }}>
                        <a href="/projects" style={navItemStyle}>
                            Projects
                        </a>
                    </div>

                    {/* Mobile hamburger button */}
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
                            <div style={{
                                width: '24px',
                                height: '2px',
                                backgroundColor: 'currentColor',
                                transition: 'all 0.3s ease',
                                position: 'absolute',
                                left: 0,
                                top: menuOpen ? '50%' : '0',
                                transform: menuOpen ? 'translateY(-50%) rotate(45deg)' : 'none',
                            }} />
                            <div style={{
                                width: '24px',
                                height: '2px',
                                backgroundColor: 'currentColor',
                                transition: 'all 0.3s ease',
                                position: 'absolute',
                                left: 0,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                opacity: menuOpen ? 0 : 1,
                            }} />
                            <div style={{
                                width: '24px',
                                height: '2px',
                                backgroundColor: 'currentColor',
                                transition: 'all 0.3s ease',
                                position: 'absolute',
                                left: 0,
                                top: menuOpen ? '50%' : '100%',
                                transform: menuOpen ? 'translateY(-50%) rotate(-45deg)' : 'translateY(-100%)',
                            }} />
                        </div>
                    </button>


                    {/* Contact Link on the right */}
                    <div className="desktop-only">
                        <a href="#contact" style={navItemStyle}>
                            Contact
                        </a>
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
                    opacity: menuOpen ? 1 : 0,
                    pointerEvents: menuOpen ? 'auto' : 'none',
                    transition: 'opacity 0.3s ease',
                }}
            >
                {NAV_LINKS.map((link, i) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            color: currentColor,
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            fontFamily: INTER,
                            opacity: menuOpen ? 1 : 0,
                            transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                            transition: `all 0.4s ease ${i * 0.08}s`,
                        }}
                    >
                        {link.name}
                    </a>
                ))}
            </div>

            {/* CSS for responsive show/hide */}
            <style jsx>{`
                .desktop-nav { display: flex !important; }
                .mobile-menu-btn { display: none !important; }
                .desktop-only { display: block !important; }

                @media (max-width: 768px) {
                    .desktop-nav { display: none !important; }
                    .mobile-menu-btn { display: block !important; }
                    .desktop-only { display: none !important; }
                }
            `}</style>
        </>
    )
}