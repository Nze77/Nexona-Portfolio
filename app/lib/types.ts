export interface Product {
    name?: string    
    src: string
    alt: string
    style: React.CSSProperties
    parallaxY: number   // total px to drift over the section's scroll-through
    description?: string
    link?: string
}

export interface SectionData {
    id: string
    category: string
    dark: boolean
    products: Product[]
}

export interface ProjectDetail {
    id: string
    name: string
    client: string
    year: string
    role: string
    description: string
    image: string
    deliverables: string[]
    landingPage?: string
    /** Internal page covering this kind of work, linked under the description. */
    relatedPage?: { href: string; label: string }
    caseStudy?: {
        images: string[]
        title: string
        text: string
    }
}