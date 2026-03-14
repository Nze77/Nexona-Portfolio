'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SAND, HELVETICA, NAV_H, INTER } from '../lib/constants'

gsap.registerPlugin(ScrollTrigger)

interface Props {
    heroRef: React.RefObject<HTMLElement | null>
}

/**
 * The brand wordmark lives at a fixed position and is scrubbed purely
 * on the Y axis + scale as the hero scrolls out.
 *
 * State 0 (hero at top):
 *   - Full hero font size  (~15vw / clamp)
 *   - y = viewport height − element height  →  sits at visual bottom of hero
 *   - Horizontally centred via left:50% + translateX(-50%)
 *
 * State 1 (hero fully scrolled out):
 *   - Shrunk to TARGET_NAV_PX (large but nav-sized)
 *   - y = nav vertical centre
 *
 * NO opacity animation — the element is always fully visible.
 * z-index 90 sits above the FixedNavbar (z-80).
 */
export default function MorphingBrand({ heroRef }: Props) {
    const brandRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const hero = heroRef.current
        const el = brandRef.current
        if (!hero || !el) return

        const setup = () => {
            const brandH = el.offsetHeight
            const vh = window.innerHeight

            // Target size for the docked brand
            const TARGET_SIZE = 60 // Significantly larger

            // Positions
            const yStart = vh - brandH
            const yEnd = 15 // Significantly lower

            gsap.set(el, {
                xPercent: -50,
                y: yStart,
                scale: 1,
                transformOrigin: '50% 0%',
                force3D: true,
            })

            gsap.to(el, {
                y: yEnd,
                scale: TARGET_SIZE / parseFloat(getComputedStyle(el).fontSize),
                ease: 'none',     // pure 1:1 scroll scrub — no ease, no fade
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            })
        }

        requestAnimationFrame(setup)

        return () => {
            ScrollTrigger.getAll()
                .filter(st => st.trigger === heroRef.current)
                .forEach(st => st.kill())
        }
    }, [heroRef])

    return (
        <div
            ref={brandRef}
            className="brand-wordmark"
            style={{
                position: 'fixed',
                top: 0,
                left: '50%',
                zIndex: 90,
                pointerEvents: 'none',
                fontFamily: INTER,
                fontWeight: 700,
                // Start size: nearly full-width wordmark like the reference
                fontSize: 'clamp(5rem, 14vw, 13rem)',
                letterSpacing: '-0.08em',
                color: SAND,
                whiteSpace: 'nowrap',
                lineHeight: 1,
                willChange: 'transform, color',
                // Always fully visible — no opacity
            }}
        >
            Nexona
        </div>
    )
}