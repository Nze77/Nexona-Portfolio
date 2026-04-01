'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { DARK, SAND, HELVETICA, INTER } from '../lib/constants'
import StickyHeader from '../components/StickyHeader'
import Footer from '../components/Footer'
import { useLenis } from '../lib/useLenis'

import { SECTIONS } from '../data/sections'

export default function ProjectsPage() {
    const [search, setSearch] = useState('')
    useLenis()

    // Flatten all products from all sections into a single projects array
    const ALL_PROJECTS = SECTIONS.flatMap(section => 
        section.products.map((p, idx) => ({
            id: `${section.id}-${idx}`,
            title: p.alt.replace(/^\/logos\/|\.png$|\.jpg$|\.jpeg$/g, '').toUpperCase(),
            category: section.category,
            image: p.src
        }))
    )

    const filteredProjects = ALL_PROJECTS.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    )


    return (
        <main style={{ backgroundColor: SAND, minHeight: '100vh', color: DARK }}>
            <StickyHeader theme="light" />

            {/* Brand Link matching MorphingBrand's docked state */}
            <div style={{ position: 'fixed', top: '15px', left: '50%', transform: 'translateX(-50%)', zIndex: 100, pointerEvents: 'none' }}>
                <Link href="/" className="brand-wordmark" style={{
                    fontFamily: INTER,
                    fontWeight: 700,
                    fontSize: '60px',
                    letterSpacing: '-0.08em',
                    color: DARK,
                    textDecoration: 'none',
                    pointerEvents: 'auto',
                    opacity: 1,
                    whiteSpace: 'nowrap',
                    lineHeight: 1
                }}>
                    Nexona
                </Link>
            </div>
            <section style={{ padding: '8rem 5% 4rem' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>

                    {/* Page Title */}
                    <div style={{ marginBottom: '4rem' }}>
                        <h1 style={{
                            fontFamily: HELVETICA,
                            fontSize: 'clamp(3rem, 8vw, 6rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.04em',
                            margin: 0,
                            textTransform: 'uppercase',
                            lineHeight: 0.9
                        }}>
                            Projects
                        </h1>
                        <p style={{
                            fontFamily: INTER,
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginTop: '1.5rem',
                            opacity: 0.6
                        }}>
                            Archive of our latest explorations
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div style={{ marginBottom: '5rem', position: 'relative', maxWidth: 600 }}>
                        <input
                            type="text"
                            placeholder="SEARCH BY NAME OR CATEGORY..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: '100%',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderBottom: `1.5px solid ${DARK}`,
                                padding: '1rem 0',
                                fontFamily: HELVETICA,
                                fontSize: '1rem',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                color: DARK,
                                outline: 'none',
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            right: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            opacity: 0.4,
                            fontSize: '0.8rem'
                        }}>
                            {filteredProjects.length} RESULTS
                        </div>
                    </div>

                    {/* Project Grid */}
                    <motion.div
                        layout
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                            gap: '2.5rem',
                        }}
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <Link 
                                    key={project.id} 
                                    href={`/projects/${encodeURIComponent(project.title.toLowerCase().replace(/\s+/g, '-'))}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                        whileHover={{ y: -10 }}
                                        style={{
                                            position: 'relative',
                                            aspectRatio: '16/10',
                                            backgroundColor: '#fff',
                                            borderRadius: '24px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            height: '100%'
                                        }}
                                    >
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            padding: '1.5rem 2rem',
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                                            color: '#fff',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-end',
                                        }}>
                                            <span style={{
                                                fontSize: '0.7rem',
                                                fontWeight: 600,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                opacity: 0.8,
                                                marginBottom: '0.25rem'
                                            }}>
                                                {project.category}
                                            </span>
                                            <h3 style={{
                                                fontFamily: HELVETICA,
                                                fontSize: '1.4rem',
                                                fontWeight: 700,
                                                margin: 0,
                                                letterSpacing: '-0.02em'
                                            }}>
                                                {project.title}
                                            </h3>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredProjects.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '5rem 0', opacity: 0.4 }}>
                            NO PROJECTS FOUND MATCHING YOUR SEARCH.
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    )
}
