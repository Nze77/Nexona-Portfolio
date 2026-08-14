'use client'

import { Suspense, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { recordPageView } from '../lib/visitorContext'

/**
 * Records every page the visitor opens into the session journey so the contact
 * forms can report the full path they took through the site. Rendered once, in
 * the root layout.
 */
function Recorder() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        // document.title is set by Next after the route commits; a frame's delay
        // gets the real title instead of the previous page's.
        const id = window.setTimeout(() => recordPageView(pathname, document.title), 0)
        return () => window.clearTimeout(id)
        // searchParams is included so a UTM-tagged in-site link is picked up.
    }, [pathname, searchParams])

    return null
}

export default function VisitorTracker() {
    // useSearchParams needs a Suspense boundary to keep pages statically rendered.
    return (
        <Suspense fallback={null}>
            <Recorder />
        </Suspense>
    )
}
