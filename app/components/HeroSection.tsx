'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DARK, HELVETICA } from '../lib/constants'

import ParticleEffect from './ParticleEffect'

gsap.registerPlugin(ScrollTrigger)

interface Props {
    sectionRef: React.RefObject<HTMLElement | null>
}

/**
 * Full-viewport hero — zero UI chrome.
 *
 * The large Nexona wordmark is pinned to the very bottom edge with
 * zero bottom padding so it sits pixel-flush against the top of
 * StickyHeader's own wordmark in the DOM below.
 *
 * Both share BRAND_SIZE from StickyHeader so the font is identical.
 * Both sit on solid DARK backgrounds. The result: as you scroll, the
 * brand appears to be one continuous element that rises up the page
 * and then locks in place at the top of the viewport.
 */
export default function HeroSection({ sectionRef }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(videoRef.current, {
                yPercent: -18,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            })
        })
        return () => ctx.revert()
    }, [sectionRef])

    return (
        <section
            ref={sectionRef}
            data-theme="dark"
            style={{
                position: 'relative',
                height: '100vh',
                overflow: 'hidden',
                backgroundColor: DARK,
            }}
        >
            <ParticleEffect />

            {/* Parallax video background */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                style={{
                    position: 'absolute',
                    top: '-15%', left: 0,
                    width: '100%', height: '130%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    opacity: 1.0,
                }}
            >
                <source src="/hero vid/Circle_rotating_like_planet_f77fec32f7.mp4" type="video/mp4" />
            </video>

            {/* Nexona — flush to the bottom edge, zero padding bottom,
                matching StickyHeader's brand exactly */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                // lineHeight 0.88 means the text bottom = section bottom
                lineHeight: 0.88,
                pointerEvents: 'none',
            }}>

            </div>
        </section>
    )
}