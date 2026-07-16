import { buildLandingMetadata } from '../../lib/landingSeo'
import LandingJsonLd from '../../components/LandingJsonLd'
import { FAQ_ITEMS } from './content'

const SLUG = 'manufacturing-erp'

// Self-referencing canonical + metadata, all sourced from the central registry.
export const metadata = buildLandingMetadata(SLUG)

export default function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <LandingJsonLd slug={SLUG} faqItems={FAQ_ITEMS} />
            {children}
        </>
    )
}
