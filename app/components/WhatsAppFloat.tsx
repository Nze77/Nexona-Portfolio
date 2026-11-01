'use client'

import Image from 'next/image'
import { useState } from 'react'
import { getAiSource } from '../lib/visitorContext'

const WA_BASE = 'https://wa.me/919082207416'

/** Built at click time so it names the page the visitor is on and, when an AI
 *  assistant sent them, says so — WhatsApp leads are otherwise unattributed. */
function waHref(): string {
  const ai = getAiSource()
  const text = `Hi Nexona, I was reading "${document.title}"${ai ? ` (found you through ${ai})` : ''}.`
  return `${WA_BASE}?text=${encodeURIComponent(text)}`
}

export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="whatsapp-float-wrap"
      style={{
        position: 'fixed',
        right: '24px',
        bottom: '24px',
        zIndex: 9999,
        animation: 'whatsapp-float 3s ease-in-out infinite',
      }}
    >
      <a
        href={WA_BASE}
        onClick={(e) => { e.currentTarget.href = waHref() }}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#25D366',
          boxShadow: hovered
            ? '0 8px 24px rgba(37, 211, 102, 0.45)'
            : '0 4px 14px rgba(0, 0, 0, 0.25)',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          cursor: 'pointer',
        }}
      >
        <Image
          src="/logos/whatsapp.avif"
          alt="WhatsApp"
          width={58}
          height={58}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </a>
    </div>
  )
}
