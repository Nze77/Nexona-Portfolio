'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DARK, SAND, INTER } from '../lib/constants'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export default function StickyHeader({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
    const headerRef = useRef<HTMLElement>(null)
    const dividerRef = useRef<HTMLDivElement>(null)

    const initialBg = theme === 'light' ? SAND : DARK
    const initialColor = theme === 'light' ? DARK : SAND
    const initialDiv = theme === 'light' ? 'rgba(46,42,38,0.2)' : 'rgba(232,223,211,0.2)'

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
                            scrollTrigger: scrubConfig,
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
                    // Hard transitions for standard themed sections AND ProductSections
                    const isLight = themeAttr === 'light'
                    const targetBg = isLight ? SAND : DARK
                    const targetColor = isLight ? DARK : SAND
                    const targetDiv = isLight ? 'rgba(46,42,38,0.2)' : 'rgba(232,223,211,0.2)'

                    // Sync the header's trigger point with the ProductSection's 50% morph
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
                // If it's a product section, make the header flip instantly to match the background morph. 
                // Otherwise, use the standard 0.4s fade.
                const duration = isProduct ? 0 : 0.4

                gsap.to(headerRef.current, { backgroundColor: bg, color: color, duration, ease: 'sine.inOut', overwrite: 'auto' })
                if (brand) gsap.to(brand, { color: color, duration, ease: 'sine.inOut', overwrite: 'auto' })
                if (dividerRef.current) gsap.to(dividerRef.current, { backgroundColor: div, duration, overwrite: 'auto' })
            }

            ScrollTrigger.refresh()

        }, headerRef)

        return () => ctx.revert()
    }, [])

    return (
        <header
            ref={headerRef}
            id="main-sticky-header"
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 80,
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
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {[
                        { name: 'Full Stack Websites', href: '#fullstack' },
                        { name: 'Automation', href: '#office' },
                        { name: 'AI Agents', href: '#decor' },
                        { name: 'Business Optimization', href: '#tech' }
                    ].map(link => (
                        <a key={link.name} href={link.href} style={{
                            fontSize: '0.75rem',
                            letterSpacing: '0.01em',
                            textTransform: 'uppercase',
                            fontWeight: 500,
                            color: 'inherit',
                            textDecoration: 'none',
                            opacity: 1,
                        }}>
                            {link.name}
                        </a>
                    ))}
                </div>
                <div style={{
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    opacity: 1,
                    color: 'inherit',
                }}>
                    All rights reserved
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
    )
}