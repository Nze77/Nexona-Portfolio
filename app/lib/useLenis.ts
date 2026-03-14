'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

/**
 * Boots a Lenis smooth-scroll instance and ties it to GSAP's ticker
 * so ScrollTrigger stays in sync. Call once at the page root.
 */
export function useLenis() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => 1 - Math.pow(1 - t, 4),
            smoothWheel: true,
        })

        const syncGSAP = () => ScrollTrigger.update()
        lenis.on('scroll', syncGSAP)

        const tick = (t: number) => lenis.raf(t * 1000)
        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)

        return () => {
            lenis.off('scroll', syncGSAP)
            gsap.ticker.remove(tick)
            lenis.destroy()
        }
    }, [])
}