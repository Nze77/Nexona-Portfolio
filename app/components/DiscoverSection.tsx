'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { DARK, SAND, NAV_H, INTER } from '../lib/constants'

export default function DiscoverSection() {
    const ref = useRef<HTMLDivElement | null>(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start']
    })

    const stackY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -400 : -650])

    const discoverMask = useTransform(
        scrollYProgress,
        [0, 0.18],
        ['inset(0% -100% 0% 0%)', 'inset(0% -100% 100% 0%)']
    )

    const bestMask = useTransform(
        scrollYProgress,
        [0.22, 0.44],
        ['inset(0% -20% 0% 0%)', 'inset(0% -20% 100% 0%)']
    )

    const minimalMask = useTransform(
        scrollYProgress,
        [0.44, 0.68],
        ['inset(0% -20% 0% 0%)', 'inset(0% -20% 100% 0%)']
    )

    const designMask = useTransform(
        scrollYProgress,
        [0.58, 0.8],
        ['inset(0% -10% -20% 0%)', 'inset(0% -10% 100% 0%)']
    )

    const discoverDrop = useTransform(scrollYProgress, [0, 0.22], [0, 180])
    const bestDrop = useTransform(scrollYProgress, [0.22, 0.44], [0, 180])
    const minimalDrop = useTransform(scrollYProgress, [0.44, 0.68], [0, 180])
    const designDrop = useTransform(scrollYProgress, [0.68, 0.9], [0, 180])

    const textStyle = {
        color: SAND,
        fontFamily: INTER,
        fontSize: 'clamp(3rem, 10vw, 12rem)',
        letterSpacing: '-0.08em',
        lineHeight: 0.9
    }

    return (
        <section
            ref={ref}
            data-theme="dark"
            style={{
                backgroundColor: DARK,
                minHeight: isMobile ? '250vh' : '300vh',
                position: 'relative',
                marginBottom: isMobile ? '-60vh' : '-75vh',
                zIndex: 0
            }}
        >
            <motion.div
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: `${NAV_H + 48}px 2rem 6rem`,
                    y: stackY
                }}
            >
                <motion.h1
                    style={{
                        ...textStyle,
                        fontWeight: 600,
                        marginBottom: '0.05em',
                        clipPath: discoverMask,
                        y: discoverDrop
                    }}
                >
                    Custom
                </motion.h1>

                <motion.p
                    style={{
                        ...textStyle,
                        fontWeight: 200,
                        fontStyle: 'italic',
                        marginBottom: '0.05em',
                        clipPath: bestMask,
                        y: bestDrop
                    }}
                >
                    tailored
                </motion.p>

                <motion.h2
                    style={{
                        ...textStyle,
                        fontWeight: 800,
                        clipPath: minimalMask,
                        y: minimalDrop
                    }}
                >
                    solutions
                </motion.h2>

                <motion.h2
                    style={{
                        ...textStyle,
                        fontWeight: 800,
                        clipPath: designMask,
                        y: designDrop
                    }}
                >
                    for businesses
                </motion.h2>
            </motion.div>
        </section>
    )
}
