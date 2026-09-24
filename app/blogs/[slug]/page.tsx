import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import StickyHeader from '../../components/StickyHeader'
import Footer from '../../components/Footer'
import BlogBody from '../../components/BlogBody'
import BlogCta from '../../components/BlogCta'
import BlogJsonLd from '../../components/BlogJsonLd'
import { BLOG_POSTS, getPost, headingId } from '../../data/blogs'
import { buildBlogMetadata } from '../../lib/blogSeo'
import { DARK, SAND, HELVETICA, INTER } from '../../lib/constants'
import { formatPostDate } from '../format'

// Every post is known at build time; anything else is a 404, not a render.
export const dynamicParams = false

export function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const post = getPost((await params).slug)
    return post ? buildBlogMetadata(post) : {}
}

const eyebrow: React.CSSProperties = {
    fontFamily: INTER,
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
}

export default async function BlogPostPage({ params }: Params) {
    const post = getPost((await params).slug)
    if (!post) notFound()

    const toc = post.body.filter((b) => b.type === 'h2').map((b) => b.text)
    const cta = post.cta ?? {
        heading: 'Something in your operations not adding up?',
        text: 'Tell us where the work gets stuck. We will tell you whether software is the fix, and which part to build first.',
    }

    return (
        <main style={{ backgroundColor: SAND, color: DARK, minHeight: '100vh' }}>
            <BlogJsonLd post={post} />
            <StickyHeader theme="light" />

            <article data-theme="light" style={{ padding: '1.75rem 5% 5rem' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto' }}>
                    <nav aria-label="Breadcrumb" style={{ ...eyebrow, opacity: 0.55, marginBottom: '1.25rem' }}>
                        <Link href="/blogs" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link>
                        <span aria-hidden style={{ margin: '0 0.6rem' }}>/</span>
                        <span>{post.category}</span>
                    </nav>

                    <h1
                        style={{
                            fontFamily: HELVETICA,
                            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.035em',
                            lineHeight: 1.05,
                            margin: '0 0 1.5rem',
                            maxWidth: 980,
                        }}
                    >
                        {post.title}
                    </h1>

                    <p style={{ fontSize: '1.15rem', lineHeight: 1.65, opacity: 0.75, margin: '0 0 2rem', maxWidth: 820 }}>{post.excerpt}</p>

                    <div
                        style={{
                            ...eyebrow,
                            opacity: 0.55,
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.4rem 1.5rem',
                            paddingBottom: '2rem',
                            marginBottom: '2.5rem',
                            borderBottom: '1px solid rgba(46,42,38,0.14)',
                        }}
                    >
                        <span>By Nexona</span>
                        <span>
                            <time dateTime={post.published}>{formatPostDate(post.published)}</time>
                        </span>
                        {post.updated && post.updated !== post.published && (
                            <span>
                                Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
                            </span>
                        )}
                        <span>{post.readingMinutes} min read</span>
                    </div>

                    {/* Desktop: sticky contents sidebar + reading column (see
                        .blog-layout in globals.css). Below 1024px it collapses
                        to one column with the contents above the body. */}
                    <div className="blog-layout">
                        {toc.length > 2 ? (
                            <nav aria-label="Contents" className="blog-toc">
                                <span style={{ ...eyebrow, display: 'block', opacity: 0.55, marginBottom: '0.9rem' }}>In this article</span>
                                <ol style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.9, fontSize: '0.98rem' }}>
                                    {toc.map((text) => (
                                        <li key={text}>
                                            <a href={`#${headingId(text)}`} style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}>
                                                {text}
                                            </a>
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        ) : <div />}

                        <div style={{ minWidth: 0, maxWidth: 780 }}>
                            <BlogBody blocks={post.body} />

                            {post.faq && post.faq.length > 0 && (
                                <section aria-labelledby="faq" style={{ marginTop: '4rem' }}>
                                    <h2
                                        id="faq"
                                        style={{ fontFamily: HELVETICA, fontSize: 'clamp(1.5rem, 3.2vw, 2.1rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1.25rem' }}
                                    >
                                        Frequently asked questions
                                    </h2>
                                    {post.faq.map((item, i) => (
                                        <details
                                            key={item.question}
                                            open={i === 0}
                                            style={{ borderBottom: '1px solid rgba(46,42,38,0.14)', padding: '1.1rem 0' }}
                                        >
                                            <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.45 }}>
                                                {item.question}
                                            </summary>
                                            <p style={{ fontSize: '1rem', lineHeight: 1.75, opacity: 0.85, margin: '0.85rem 0 0' }}>{item.answer}</p>
                                        </details>
                                    ))}
                                </section>
                            )}

                            {post.relatedServices && post.relatedServices.length > 0 && (
                                <aside style={{ marginTop: '3.5rem' }}>
                                    <span style={{ ...eyebrow, display: 'block', opacity: 0.55, marginBottom: '1rem' }}>Related</span>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                        {post.relatedServices.map((s) => (
                                            <Link
                                                key={s.href}
                                                href={s.href}
                                                style={{
                                                    fontSize: '0.88rem',
                                                    color: DARK,
                                                    textDecoration: 'none',
                                                    border: '1px solid rgba(46,42,38,0.3)',
                                                    borderRadius: 99,
                                                    padding: '0.55rem 1.1rem',
                                                }}
                                            >
                                                {s.label}
                                            </Link>
                                        ))}
                                    </div>
                                </aside>
                            )}

                            <BlogCta heading={cta.heading} text={cta.text} />
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    )
}
