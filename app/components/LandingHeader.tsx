'use client'

import { useEffect } from 'react'
import StickyHeader from './StickyHeader'

/**
 * Header for the landing pages: renders the shared StickyHeader but adds
 * hide-on-scroll-down / reveal-on-scroll-up behaviour. The scroll logic lives
 * here (not in StickyHeader) so the site-wide header is left untouched.
 *
 * It drives the transform on the rendered header element (#main-sticky-header)
 * imperatively — only touching `transform` — so it never clashes with
 * StickyHeader's own GSAP background/color tweening.
 */
export default function LandingHeader(props: {
    theme?: 'dark' | 'light'
    showBrand?: boolean
    onContactClick?: () => void
}) {
    useEffect(() => {
        const el = document.getElementById('main-sticky-header')
        if (!el) return

        el.style.transition = 'transform 0.35s ease'
        el.style.willChange = 'transform, background-color, color'

        let lastY = window.scrollY
        const onScroll = () => {
            const y = window.scrollY
            if (y < 80) {
                el.style.transform = 'translateY(0)'          // always visible near the top
            } else if (y > lastY) {
                el.style.transform = 'translateY(-100%)'      // scrolling down → hide
            } else if (y < lastY) {
                el.style.transform = 'translateY(0)'          // scrolling up (even a little) → show
            }
            lastY = y
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', onScroll)
            el.style.transform = ''
            el.style.transition = ''
        }
    }, [])

    return <StickyHeader {...props} />
}
