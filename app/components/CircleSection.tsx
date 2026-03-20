'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SAND, DARK } from '../lib/constants'

gsap.registerPlugin(ScrollTrigger)

/**
 * Sticky section: a perfect circle on a dark background morphs into a
 * full-viewport-width rounded panel as the user scrolls, while the
 * section background fades from dark → SAND.
 *
 * Works with Lenis — ScrollTrigger picks up Lenis's virtual scroll
 * automatically when you call ScrollTrigger.scrollerProxy or use
 * the lenis.on('scroll', ScrollTrigger.update) pattern in your root layout.
 */
export default function CircleSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const stickyRef = useRef<HTMLDivElement>(null)
    const circleRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sectionRef.current || !circleRef.current) return

        const ctx = gsap.context(() => {
            const vw = window.innerWidth
            const vh = window.innerHeight

            // Starting circle: square whose side fits the viewport
            const initSize = Math.min(vw * 0.78, 620)
            const initRadius = initSize / 2   // px value that equals 50% on a square

            // End state: near-full-viewport panel
            const endW = vw
            const endH = vh * 0.86
            const endR = 36

            // Seed the initial geometry so layout is correct before any scroll
            gsap.set(circleRef.current, {
                width: initSize,
                height: initSize,
                borderRadius: initRadius,
            })

            const st: ScrollTrigger.Vars = {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
            }

            // ── Morph: circle → full-width panel ──────────────────────────
            gsap.to(circleRef.current, {
                width: endW,
                height: endH,
                borderRadius: endR,
                ease: 'none',
                scrollTrigger: st,
            })

            // ── Background: dark → SAND ────────────────────────────────────
            gsap.to(sectionRef.current, {
                backgroundColor: SAND,
                ease: 'none',
                scrollTrigger: {
                    ...st,
                    scrub: true,
                    // colour change leads slightly ahead of geometry
                    end: '65% bottom',
                },
            })

            // ── Image parallax inside the morphing container ───────────────
            gsap.to(imgRef.current, {
                yPercent: -18,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,
                },
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        /*
         * The section is tall (260 vh) so ScrollTrigger has enough scroll
         * distance to drive the morph. The inner sticky div keeps the visual
         * centred in the viewport the whole time.
         */
        <section
            ref={sectionRef}
            data-theme="circle"
            style={{
                backgroundColor: DARK,
                height: '260vh',
                position: 'relative',
            }}
        >
            {/* ── Sticky viewport ── */}
            <div
                ref={stickyRef}
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '105vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                {/* ── Morphing shape ── */}
                <div
                    ref={circleRef}
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        willChange: 'width, height, border-radius',
                        flexShrink: 0,
                    }}
                >
                    <div
                        ref={imgRef}
                        style={{
                            position: 'absolute',
                            top: '-12%',
                            left: 0,
                            width: '100%',
                            height: '124%',
                            backgroundColor: DARK,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: SAND,
                            padding: '4rem',
                            textAlign: 'center',
                        }}
                    >
                        <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '2rem' }}>WELCOME TO NEXONA</h2>
                        <p style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', maxWidth: '900px', lineHeight: 1.5, opacity: 0.9 }}>
                            We craft seamless digital experiences, automate the mundane, and elevate businesses with next-generation AI agents.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
} //damn