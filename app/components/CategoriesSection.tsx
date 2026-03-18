'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { DARK, SAND, HELVETICA } from '../lib/constants'
import { stagger, pill } from '../lib/variants'

const CATEGORIES = [
    'AUTOMATION', 'FULL STACK WEBSITE', 'BUSINESS OPTIMIZATION', 'AI AGENTS',
]

/**
 * Pill-shaped category links — stagger entrance via Framer Motion,
 * hover swaps fill to dark with a smooth color transition.
 */
export default function CategoriesSection() {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })

    return (
        <section
            ref={ref}
            data-theme="light"
            style={{ backgroundColor: SAND, padding: '6rem 5% 5rem' }}
        >
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                        justifyContent: 'center',
                    }}
                >
                    {CATEGORIES.map(cat => (
                        <motion.a
                            key={cat}
                            href="#"
                            variants={pill}
                            whileHover={{
                                backgroundColor: DARK,
                                color: SAND,
                                borderColor: DARK,
                                transition: { duration: 0.2 },
                            }}
                            style={{
                                border: `1.5px solid ${DARK}`,
                                borderRadius: 999,
                                padding: '0.65rem 1.6rem',
                                fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
                                fontWeight: 600,
                                color: DARK,
                                backgroundColor: 'transparent',
                                cursor: 'pointer',
                                letterSpacing: '-0.01em',
                                textDecoration: 'none',
                                display: 'inline-block',
                                fontFamily: HELVETICA,
                            }}
                        >
                            {cat}
                        </motion.a>
                    ))}
                </motion.div>

                {/* View All link */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    style={{
                        textAlign: 'center',
                        marginTop: '3.5rem',
                    }}
                >
                    <motion.a
                        href="/projects"
                        whileHover="hover"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: DARK,
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            fontFamily: HELVETICA,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            opacity: 0.8,
                            cursor: 'pointer',
                        }}
                    >
                        <span>view all</span>
                        <motion.span
                            variants={{
                                hover: { x: 3, y: -3 }
                            }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            style={{ fontSize: '1.1rem' }}
                        >
                            ↗
                        </motion.span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}