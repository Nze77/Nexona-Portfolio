'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Shared contact-popup trigger, used by every landing page so the behaviour is
 * identical everywhere:
 *
 *   the overlay opens as soon as EITHER the visitor has spent 20s on the page
 *   OR they have scrolled down to the page's third section — whichever happens
 *   first — and then only once per browser session.
 *
 * Usage:
 *
 *   const { triggerRef, contactOpen, openContact, closeContact, trigger } = useContactPopup()
 *   ...
 *   <section ref={triggerRef}>  // the third section on the page
 *   <button onClick={openContact}>Talk to us</button>
 *   <AnimatePresence>
 *     {contactOpen && <ContactOverlay trigger={trigger} onClose={closeContact} />}
 *   </AnimatePresence>
 */

const DEFAULT_DELAY_MS = 20_000
const SEEN_KEY = 'nx_contact_popup_seen'

/** Fires when the section's top has come up past 80% of the viewport height. */
const SCROLL_THRESHOLD = 0.8

export type ContactTrigger = 'timer' | 'scroll' | 'manual'

export function useContactPopup<T extends HTMLElement = HTMLElement>(
    { delayMs = DEFAULT_DELAY_MS }: { delayMs?: number } = {},
) {
    /** Attach to the third section of the page. */
    const triggerRef = useRef<T | null>(null)
    const [contactOpen, setContactOpen] = useState(false)
    const [trigger, setTrigger] = useState<ContactTrigger>('manual')

    // Once the visitor has seen (or opened) the form, the automatic triggers
    // stop for the rest of the session — no repeat interruptions.
    //
    // This flag is the one thing on the site written to the visitor's device,
    // and deliberately so: "this visitor already dismissed the popup" is
    // functional UI state needed to deliver the page as the visitor expects it,
    // which is the strictly-necessary exemption to the consent rule. It carries
    // no identifier and is not used for analytics — the attribution tracker in
    // visitorContext.ts is kept in memory precisely so it stays exempt too.
    const spent = useRef(false)

    const markSeen = useCallback(() => {
        spent.current = true
        try {
            sessionStorage.setItem(SEEN_KEY, '1')
        } catch {
            /* private mode — the in-memory ref still prevents repeats */
        }
    }, [])

    const openContact = useCallback(() => {
        markSeen()
        setTrigger('manual')
        setContactOpen(true)
    }, [markSeen])

    const closeContact = useCallback(() => setContactOpen(false), [])

    useEffect(() => {
        try {
            if (sessionStorage.getItem(SEEN_KEY)) spent.current = true
        } catch {
            /* ignore */
        }
        if (spent.current) return

        const fire = (why: ContactTrigger) => {
            if (spent.current) return
            markSeen()
            setTrigger(why)
            setContactOpen(true)
            cleanup()
        }

        const onScroll = () => {
            const el = triggerRef.current
            if (!el) return
            if (el.getBoundingClientRect().top <= window.innerHeight * SCROLL_THRESHOLD) {
                fire('scroll')
            }
        }

        const timer = setTimeout(() => fire('timer'), delayMs)

        // Declared after the timer so it can clear it; `fire` only ever runs
        // once the listeners below are in place.
        const cleanup = () => {
            clearTimeout(timer)
            window.removeEventListener('scroll', onScroll)
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        // A deep-link with a #hash can already be past the third section.
        onScroll()

        return cleanup
    }, [delayMs, markSeen])

    return { triggerRef, contactOpen, openContact, closeContact, trigger }
}
