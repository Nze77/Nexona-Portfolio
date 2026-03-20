'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DARK, SAND, HELVETICA } from '../lib/constants'
import { SectionData } from '../lib/types'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface Props {
    data: SectionData[]
}

export default function ProductSection({ data }: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const sectionRefs = useRef<(HTMLElement | null)[]>([])

    // 2D array to hold refs for images grouped by section
    const imgRefs = useRef<(HTMLDivElement | null)[][]>([])
    if (imgRefs.current.length !== data.length) {
        imgRefs.current = data.map(() => [])
    }

    const [activeIndex, setActiveIndex] = useState(0)

    // Initial state: index 0 -> !(0 % 2 === 0) -> false -> Light Theme
    const isDark = !(activeIndex % 2 === 0)
    const bg = isDark ? DARK : SAND
    const textColor = isDark ? SAND : DARK

    useEffect(() => {
        if (!containerRef.current) return

        const ctx = gsap.context(() => {
            data.forEach((section, sIdx) => {
                const secEl = sectionRefs.current[sIdx]
                if (!secEl) return

                // 1. Track Section for Instant Text/Color Morph
                ScrollTrigger.create({
                    trigger: secEl,
                    start: 'top 50%',
                    end: 'bottom 50%',
                    onEnter: () => setActiveIndex(sIdx),
                    onEnterBack: () => setActiveIndex(sIdx),
                })

                // 2. Parallax scattered images up
                const images = imgRefs.current[sIdx]
                images.forEach((imgEl, iIdx) => {
                    if (!imgEl) return
                    const parallaxAmount = section.products[iIdx]?.parallaxY ?? 80

                    gsap.to(imgEl, {
                        y: -parallaxAmount,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: secEl,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    })
                })
            })
        }, containerRef)

        return () => ctx.revert()
    }, [data])

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                backgroundColor: bg,
                color: textColor,
                // No CSS transitions here to ensure the color swap is instant
            }}
        >
            {/* STICKY LAYER: Category title anchored to bottom left */}
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    width: '100%',
                    pointerEvents: 'none',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '0 2% -0.05em',
                    overflow: 'hidden',
                }}
            >
                <h2
                    style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 600,
                        fontSize: 'clamp(2.5rem, 6.5vw, 8rem)',
                        letterSpacing: '-0.04em',
                        lineHeight: 0.85,
                        margin: 0,
                        whiteSpace: 'nowrap',
                        opacity: 0.95,
                        textTransform: 'uppercase',
                    }}
                >
                    {data[activeIndex]?.category}
                </h2>
            </div>

            {/* SCROLLABLE LAYER: Scattered image sections */}
            <div style={{ marginTop: '-100vh' }}>
                {data.map((section, sIdx) => {
                    // Determine theme for THIS specific section so StickyHeader can read it
                    const sectionIsDark = !(sIdx % 2 === 0)
                    const themeString = sectionIsDark ? 'dark' : 'light'

                    return (
                        <section
                            key={section.id}
                            className="product-theme-trigger" // Tells StickyHeader to trigger at 50%
                            data-theme={themeString} // Tells StickyHeader which color to become
                            ref={(el) => { sectionRefs.current[sIdx] = el }}
                            style={{
                                position: 'relative',
                                minHeight: '130vh',
                                width: '100%',
                                overflow: 'visible',
                            }}
                        >
                            {section.products.map((img, iIdx) => (
                                <motion.div
                                    key={iIdx}
                                    ref={(el) => { imgRefs.current[sIdx][iIdx] = el }}
                                    className="group rounded-lg"
                                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                                    style={{
                                        position: 'absolute',
                                        ...img.style,
                                        zIndex: 2,
                                        willChange: 'transform',
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        backgroundColor: 'var(--color-dark)',
                                    }}
                                >
                                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-95 origin-top rounded-t-lg overflow-hidden">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            style={{
                                                objectFit: 'cover',
                                                display: 'block',
                                                pointerEvents: 'none',
                                            }}
                                        />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-[75%] bg-black/60 backdrop-blur-md p-6 transform translate-y-[calc(100%-68px)] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-10 flex flex-col">
                                        <div className="flex justify-between items-center h-5 shrink-0">
                                            <h3 className="text-xl font-medium text-white">{img.alt || 'Canyon Echo'}</h3>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 flex-1 flex flex-col mt-4">
                                            <p className="text-white/80 text-sm leading-relaxed mb-6">
                                                A study on natural erosion patterns and the rhythmic flow of riverbeds across the high desert plateaus.
                                            </p>
                                            <button className="w-full mt-auto py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded transition-colors hover:bg-gray-200">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </section>
                    )
                })}
            </div>
        </div>
    )
}