'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { DARK, SAND, HELVETICA } from '../lib/constants'
import { fadeUp } from '../lib/variants'

export default function Footer() {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, margin: '-5%' })

    return (
        <footer
            ref={ref}
            data-theme="dark"
            style={{
                backgroundColor: DARK,
                color: SAND,
                padding: '6rem 5% 4rem',
                borderTop: '1px solid rgba(232,223,211,0.12)',
                fontFamily: HELVETICA,
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>

                <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}>
                    <h3 style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.9, marginBottom: '1.5rem' }}>
                        Nexona
                    </h3>
                    <p style={{ fontSize: '0.85rem', opacity: 0.45, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Curating the best in minimal design
                    </p>
                </motion.div>

                <motion.div
                    variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0.15}
                    style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'right' }}
                >
                    {['Articles', 'Shop', 'Submit', 'Contact'].map(link => (
                        <a
                            key={link}
                            href="#"
                            className="nav-link"
                            style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.65, color: SAND, textDecoration: 'none' }}
                        >
                            {link}
                        </a>
                    ))}
                </motion.div>

            </div>

            <div style={{
                marginTop: '5rem',
                borderTop: '1px solid rgba(232,223,211,0.12)',
                paddingTop: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.72rem',
                opacity: 0.35,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
            }}>
                <span>© 2021 Nexona. All rights reserved.</span>
                <span>Minimal design curation</span>
            </div>
        </footer>
    )
}