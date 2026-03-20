import { Variants } from 'framer-motion'

/** Fade + slide up. Pass `custom={delaySeconds}` to the motion element. */
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (d: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: d },
    }),
}

/** Wrapper that staggers its children */
export const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
}

/** Used for category pills */
export const pill: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}