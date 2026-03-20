export interface Product {
    src: string
    alt: string
    style: React.CSSProperties
    parallaxY: number   // total px to drift over the section's scroll-through
    description?: string
}

export interface SectionData {
    id: string
    category: string
    dark: boolean
    products: Product[]
}