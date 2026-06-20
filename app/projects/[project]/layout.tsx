import type { Metadata } from 'next'

// Dynamic, self-referencing canonical: each project detail page points its
// canonical at its OWN URL (/projects/<slug>) rather than at a parent page.
export async function generateMetadata({
    params,
}: {
    params: Promise<{ project: string }>
}): Promise<Metadata> {
    const { project } = await params
    const name = decodeURIComponent(project)
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())

    return {
        title: `${name} | Nexona Projects`,
        description: `${name} — a project delivered by Nexona, covering design, development, and deployment.`,
        alternates: {
            canonical: `/projects/${project}`,
        },
    }
}

export default function ProjectDetailLayout({ children }: { children: React.ReactNode }) {
    return children
}
