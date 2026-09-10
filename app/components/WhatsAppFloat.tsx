'use client'

import Image from 'next/image'
import { useState } from 'react'

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
        href="https://wa.me/919082207416"
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
