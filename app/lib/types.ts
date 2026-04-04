export interface Product {
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
    caseStudy?: {
        images: string[]
        title: string
        text: string
    }
}