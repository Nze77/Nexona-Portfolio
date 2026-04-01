'use client'

import { use } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { DARK, SAND, HELVETICA, INTER } from '../../lib/constants'
import StickyHeader from '../../components/StickyHeader'
import Footer from '../../components/Footer'
import { useLenis } from '../../lib/useLenis'
import { SECTIONS } from '../../data/sections'
import { PROJECT_DETAILS } from '../../data/projectDetails'

export default function ProjectDetailsPage({ params }: { params: Promise<{ project: string }> }) {
    useLenis()
    const resolvedParams = use(params)
    const project = resolvedParams.project

    const ALL_PROJECTS = SECTIONS.flatMap(s => s.products)
    const foundSectionProduct = ALL_PROJECTS.find(p =>
        p.alt.replace(/^\/logos\/|\.png$|\.jpg$|\.jpeg$/g, '').toLowerCase().replace(/\s+/g, '-') === project
    )

    const detailedProject = PROJECT_DETAILS.find(p => p.id === project)

    // Merge or fallback
    const dummyData = {
        name: detailedProject?.name || project ? decodeURIComponent(project).replace(/-/g, ' ').toUpperCase() : 'PROJECT NAME',
        client: detailedProject?.client || 'Global Innovations Inc.',
        year: detailedProject?.year || '2024',
        role: detailedProject?.role || 'Creative Direction, UI/UX, Development',
        description: detailedProject?.description || 'This is a dummy description for the project. In a real-world scenario, this would contain detailed information about the project overview, the challenges faced, the solution implemented, and the final results achieved. Nexona delivered a complete digital transformation, emphasizing brand identity and seamless user interactions.',
        image: detailedProject?.image || foundSectionProduct?.src || '/logos/1327.png',
        deliverables: detailedProject?.deliverables || ['Web Design', 'Development', 'Brand Identity', '3D Motion'],
        landingPage: detailedProject?.landingPage
    }

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

            <section style={{ padding: '1rem 5% 4rem', minHeight: '100vh' }}>
                <div style={{
                    maxWidth: 1400,
                    margin: '1rem auto 0',
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4rem',
                    alignItems: 'flex-start'
                }}>

                    {/* Left side: Photo & Landing Page */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            flex: '1 1 500px',
                            minWidth: 0,
                        }}
                    >
                        <div style={{
                            position: 'relative',
                            aspectRatio: '16/9',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            backgroundColor: '#fff',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                            marginBottom: '2rem'
                        }}>
                            <Image
                                src={dummyData.image}
                                alt={dummyData.name}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>

                        {dummyData.landingPage && (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Link
                                    href={dummyData.landingPage}
                                    target="_blank"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        textDecoration: 'none',
                                        color: DARK,
                                        fontFamily: INTER,
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        borderBottom: `2px solid ${DARK}`,
                                        paddingBottom: '4px',
                                        transition: 'opacity 0.3s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                >
                                    Visit Landing Page
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        )}
                    </motion.div>

                    {/* Right side: Data */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        style={{
                            flex: '1 1 500px',
                            minWidth: 0,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Title */}
                        <h1 style={{
                            fontFamily: HELVETICA,
                            fontSize: 'clamp(3rem, 5vw, 5rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.04em',
                            margin: '0 0 2rem 0',
                            textTransform: 'uppercase',
                            lineHeight: 0.95
                        }}>
                            {dummyData.name}
                        </h1>

                        {/* Metadata Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '2rem',
                            marginBottom: '3rem',
                            paddingBottom: '3rem',
                            borderBottom: `1px solid rgba(0,0,0,0.1)`
                        }}>
                            <div>
                                <h4 style={{ fontFamily: INTER, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.5rem' }}>Client</h4>
                                <p style={{ fontFamily: HELVETICA, fontSize: '1.1rem', fontWeight: 500 }}>{dummyData.client}</p>
                            </div>
                            <div>
                                <h4 style={{ fontFamily: INTER, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.5rem' }}>Year</h4>
                                <p style={{ fontFamily: HELVETICA, fontSize: '1.1rem', fontWeight: 500 }}>{dummyData.year}</p>
                            </div>
                            <div style={{ gridColumn: '1 / span 2' }}>
                                <h4 style={{ fontFamily: INTER, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '0.5rem' }}>Role</h4>
                                <p style={{ fontFamily: HELVETICA, fontSize: '1.1rem', fontWeight: 500 }}>{dummyData.role}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div style={{ marginBottom: '3rem' }}>
                            <h4 style={{ fontFamily: INTER, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '1.5rem' }}>Overview</h4>
                            <p style={{
                                fontFamily: INTER,
                                fontSize: '1.1rem',
                                lineHeight: 1.6,
                                opacity: 0.8,
                                fontWeight: 400
                            }}>
                                {dummyData.description}
                            </p>
                        </div>

                        {/* Deliverables */}
                        <div>
                            <h4 style={{ fontFamily: INTER, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '1.5rem' }}>Deliverables</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {dummyData.deliverables.map((item, idx) => (
                                    <span key={idx} style={{
                                        fontFamily: INTER,
                                        fontSize: '0.85rem',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '100px',
                                        border: `1px solid rgba(0,0,0,0.15)`,
                                        fontWeight: 500
                                    }}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </motion.div>
                </div>
            </section>
        </main>
    )
}
