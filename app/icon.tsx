import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default async function Icon() {
  // Read the logo image file
  const logoPath = join(process.cwd(), 'public/logo.png')
  const logoData = await readFile(logoPath)
  const logoBase64 = logoData.toString('base64')
  const logoSrc = `data:image/png;base64,${logoBase64}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          overflow: 'hidden',
          background: 'transparent',
        }}
      >
        {/* Satori (next/og) renders a restricted JSX subset to an image — it has
            no DOM and cannot resolve next/image, so a raw <img> with a data URI
            is the only option here. The LCP/alt-text rules don't apply to a
            32x32 favicon that never reaches a browser as HTML. */}
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          src={logoSrc}
          width="100%"
          height="100%"
          style={{
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
