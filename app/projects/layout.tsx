import type { Metadata } from 'next'

// Self-referencing canonical so /projects is indexed as its own page.
export const metadata: Metadata = {
    title: 'Projects | Nexona',
    description:
        'Explore Nexona’s portfolio of full-stack web apps, AI agents, automations, ERPs, and CRMs built for growing businesses.',
    alternates: {
        canonical: '/projects',
    },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return children
}
