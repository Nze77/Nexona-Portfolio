import Link from 'next/link'
import type { BlogBlock } from '../data/blogs'
import { headingId } from '../data/blogs'
import { DARK, HELVETICA, INTER } from '../lib/constants'

/* Server-rendered on purpose: the article text ships as plain HTML in the
   first response, which is what crawlers and answer engines read. No motion
   wrappers here — nothing that needs JS to become visible. */

const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g

const linkStyle: React.CSSProperties = {
    color: 'inherit',
    textDecoration: 'underline',
    textDecorationThickness: '1px',
    textUnderlineOffset: '3px',
}

/** Renders the tiny inline syntax: **bold** and [text](href). */
export function Inline({ text }: { text: string }) {
    return (
        <>
            {text.split(INLINE).map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} style={{ fontWeight: 700 }}>{part.slice(2, -2)}</strong>
                }
                const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
                if (link) {
                    const [, label, href] = link
                    return href.startsWith('/') ? (
                        <Link key={i} href={href} style={linkStyle}>{label}</Link>
                    ) : (
                        <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{label}</a>
                    )
                }
                return part
            })}
        </>
    )
}

const p: React.CSSProperties = { fontSize: '1.08rem', lineHeight: 1.8, margin: '0 0 1.4rem', opacity: 0.88 }

const h2: React.CSSProperties = {
    fontFamily: HELVETICA,
    fontSize: 'clamp(1.5rem, 3.2vw, 2.1rem)',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    lineHeight: 1.15,
    margin: '3.5rem 0 1.25rem',
    scrollMarginTop: '7rem',
}

const h3: React.CSSProperties = {
    fontFamily: HELVETICA,
    fontSize: '1.2rem',
    fontWeight: 700,
    lineHeight: 1.3,
    margin: '2.25rem 0 0.75rem',
}

const list: React.CSSProperties = { ...p, paddingLeft: '1.4rem' }
const li: React.CSSProperties = { marginBottom: '0.75rem', paddingLeft: '0.25rem' }

const cell: React.CSSProperties = {
    padding: '0.85rem 1rem',
    textAlign: 'left',
    verticalAlign: 'top',
    borderBottom: '1px solid rgba(46,42,38,0.14)',
    fontSize: '0.92rem',
    lineHeight: 1.55,
}

function Block({ block }: { block: BlogBlock }) {
    switch (block.type) {
        case 'p':
            return <p style={p}><Inline text={block.text} /></p>
        case 'h2':
            return <h2 id={headingId(block.text)} style={h2}>{block.text}</h2>
        case 'h3':
            return <h3 style={h3}>{block.text}</h3>
        case 'ul':
            return (
                <ul style={list}>
                    {block.items.map((item, i) => <li key={i} style={li}><Inline text={item} /></li>)}
                </ul>
            )
        case 'ol':
            return (
                <ol style={list}>
                    {block.items.map((item, i) => <li key={i} style={li}><Inline text={item} /></li>)}
                </ol>
            )
        case 'callout':
            return (
                <aside
                    style={{
                        borderLeft: `3px solid ${DARK}`,
                        backgroundColor: 'rgba(46,42,38,0.06)',
                        padding: '1.5rem 1.75rem',
                        margin: '0 0 2.5rem',
                        borderRadius: '0 6px 6px 0',
                    }}
                >
                    {block.label && (
                        <span style={{ display: 'block', fontFamily: INTER, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.6, marginBottom: '0.6rem' }}>
                            {block.label}
                        </span>
                    )}
                    <p style={{ ...p, margin: 0, opacity: 1 }}><Inline text={block.text} /></p>
                </aside>
            )
        case 'table':
            return (
                <div style={{ overflowX: 'auto', margin: '0.5rem 0 2rem', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', minWidth: 560, borderCollapse: 'collapse' }}>
                        {block.caption && (
                            <caption style={{ captionSide: 'top', textAlign: 'left', fontFamily: INTER, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.55, paddingBottom: '0.75rem' }}>
                                {block.caption}
                            </caption>
                        )}
                        <thead>
                            <tr>
                                {block.columns.map((c, i) => (
                                    <th key={i} scope="col" style={{ ...cell, fontWeight: 700, borderBottom: `2px solid ${DARK}` }}>{c}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {block.rows.map((row, r) => (
                                <tr key={r}>
                                    {row.map((c, i) =>
                                        i === 0 ? (
                                            <th key={i} scope="row" style={{ ...cell, fontWeight: 700 }}><Inline text={c} /></th>
                                        ) : (
                                            <td key={i} style={{ ...cell, opacity: 0.85 }}><Inline text={c} /></td>
                                        ),
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
    }
}

export default function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
    return <>{blocks.map((b, i) => <Block key={i} block={b} />)}</>
}
