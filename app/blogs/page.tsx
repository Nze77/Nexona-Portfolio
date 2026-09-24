import type { Metadata } from 'next'
import Link from 'next/link'
import StickyHeader from '../components/StickyHeader'
import Footer from '../components/Footer'
import { BLOG_POSTS } from '../data/blogs'
import { DARK, SAND, HELVETICA, INTER } from '../lib/constants'
import { formatPostDate } from './format'

export const metadata: Metadata = {
    title: 'Blog | Nexona',
    description:
        'Practical writing on custom software, ERPs, CRMs, AI agents and automation — what breaks inside growing businesses, and what actually fixes it.',
    alternates: { canonical: '/blogs' },
}

export default function BlogIndexPage() {
    return (
        <main style={{ backgroundColor: SAND, color: DARK, minHeight: '100vh' }}>
            <StickyHeader theme="light" />

            <section data-theme="light" style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 5% 5rem' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <h1
                        style={{
                            fontFamily: HELVETICA,
                            fontSize: 'clamp(3rem, 8vw, 6rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.04em',
                            textTransform: 'uppercase',
                            lineHeight: 0.9,
                            margin: 0,
                        }}
                    >
                        Blog
                    </h1>
                    <p style={{ fontFamily: INTER, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '1.5rem', opacity: 0.6 }}>
                        What breaks inside growing businesses. And what fixes it.
                    </p>

                    <div style={{ marginTop: '4rem', borderTop: '1px solid rgba(46,42,38,0.18)' }}>
                        {BLOG_POSTS.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blogs/${post.slug}`}
                                style={{
                                    display: 'block',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    padding: '2.5rem 0',
                                    borderBottom: '1px solid rgba(46,42,38,0.18)',
                                }}
                            >
                                <span
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '0.4rem 1.25rem',
                                        fontFamily: INTER,
                                        fontSize: '0.72rem',
                                        fontWeight: 600,
                                        letterSpacing: '0.2em',
                                        textTransform: 'uppercase',
                                        opacity: 0.55,
                                        marginBottom: '1rem',
                                    }}
                                >
                                    <span>{post.category}</span>
                                    <time dateTime={post.published}>{formatPostDate(post.published)}</time>
                                    <span>{post.readingMinutes} min read</span>
                                </span>
                                <h2
                                    style={{
                                        fontFamily: HELVETICA,
                                        fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)',
                                        fontWeight: 800,
                                        letterSpacing: '-0.025em',
                                        lineHeight: 1.1,
                                        margin: '0 0 1rem',
                                        maxWidth: 820,
                                    }}
                                >
                                    {post.title}
                                </h2>
                                <p style={{ fontSize: '1rem', lineHeight: 1.7, opacity: 0.72, margin: 0, maxWidth: 720 }}>{post.excerpt}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
