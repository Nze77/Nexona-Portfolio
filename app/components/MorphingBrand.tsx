'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SAND, INTER } from '../lib/constants'

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
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const hero = heroRef.current
        const el = brandRef.current
        if (!hero || !el) return

        const setup = () => {
            const brandH = el.offsetHeight
            const vh = window.innerHeight

            // Target size for the docked brand — bigger and centered in header
            const isMob = window.innerWidth <= 768
            const TARGET_SIZE = isMob ? 52 : 80 
            const NAV_CENTER = 48 // 96 / 2

            // Initial pos: sitting at baseline of hero
            const yStart = vh - (brandH / 2)

            gsap.set(el, {
                yPercent: -50,
                y: yStart,
                scale: 1,
                transformOrigin: '50% 50%',
                force3D: true,
            })

            // Mark as ready so visibility flips to visible
            setReady(true)

            gsap.to(el, {
                y: NAV_CENTER,
                scale: TARGET_SIZE / parseFloat(getComputedStyle(el).fontSize),
                ease: 'none',
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
                .filter(st => st.trigger === hero)
                .forEach(st => st.kill())
        }
    }, [heroRef])

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            zIndex: 90,
            pointerEvents: 'none',
        }}>
            <div
                ref={brandRef}
                className="brand-wordmark"
                style={{
                    fontFamily: INTER,
                    fontWeight: 700,
                    fontSize: 'clamp(5rem, 14vw, 13rem)',
                    letterSpacing: '-0.08em',
                    color: SAND,
                    whiteSpace: 'nowrap',
                    lineHeight: 1,
                    willChange: 'transform, color',
                    visibility: ready ? 'visible' : 'hidden',
                }}
            >
                Nexona
            </div>
        </div>
    )
}