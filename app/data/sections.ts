import { SectionData } from '../lib/types'

export const SECTIONS: SectionData[] = [
    {
        id: 'fullstack', category: 'FULL STACK DEVELOPMENT', dark: false,
        products: [
            {
                src: '/logos/1327.png',
                alt: '1327', style: { top: '40%', left: '3%', width: '25%', maxWidth: 370, aspectRatio: '1.1/1', clipPath: 'inset(0 2% 0 0)' }, parallaxY: 90
            },
            {
                src: '/logos/dariza.jpg',
                alt: 'dariza', style: { top: '38%', left: '40%', width: '17%', maxWidth: 260, aspectRatio: '1/1' }, parallaxY: 115
            },
            {
                src: '/logos/autoparts.png',
                alt: 'autoparts', style: { top: '30%', right: '10%', width: '20%', maxWidth: 430, aspectRatio: '1/1' }, parallaxY: 70
            },
        ],
    },
    {
        id: 'decor', category: 'AI AGENTS', dark: true,
        products: [
            {
                src: 'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=500&q=80',
                alt: 'table lamp', style: { top: '6%', left: '2%', width: '24%', maxWidth: 370, aspectRatio: '4/5' }, parallaxY: 85
            },
            {
                src: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=400&q=80',
                alt: 'desk lamp', style: { top: '40%', left: '31%', width: '16%', maxWidth: 250, aspectRatio: '3/4' }, parallaxY: 115
            },
            {
                src: 'https://images.unsplash.com/photo-1606744824163-985d376605ef?w=350&q=80',
                alt: 'night lamp', style: { top: '10%', right: '10%', width: '16%', maxWidth: 200, aspectRatio: '1/1' }, parallaxY: 65
            },
            {
                src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80',
                alt: 'room', style: { top: '28%', right: '1%', width: '28%', maxWidth: 420, aspectRatio: '4/3' }, parallaxY: 80
            },
        ],
    },
    {
        id: 'office', category: 'AUTOMATION', dark: false,
        products: [
            {
                src: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?w=500&q=80',
                alt: 'desk lamp', style: { top: '5%', left: '2%', width: '24%', maxWidth: 370, aspectRatio: '4/5' }, parallaxY: 90
            },
            {
                src: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=400&q=80',
                alt: 'decor piece', style: { top: '12%', right: '8%', width: '15%', maxWidth: 195, aspectRatio: '3/4' }, parallaxY: 55
            },
            {
                src: 'https://images.unsplash.com/photo-1561015708-98a1db703e84?w=450&q=80',
                alt: 'chairs', style: { top: '38%', left: '32%', width: '17%', maxWidth: 265, aspectRatio: '4/5' }, parallaxY: 110
            },
            {
                src: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=700&q=80',
                alt: 'home office', style: { top: '28%', right: '1%', width: '29%', maxWidth: 425, aspectRatio: '4/3' }, parallaxY: 75
            },
        ],
    },
    {
        id: 'tech', category: 'BUSINESS OPTIMIZATION', dark: true,
        products: [
            {
                src: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80',
                alt: 'book', style: { top: '8%', left: '2%', width: '24%', maxWidth: 370, aspectRatio: '4/5' }, parallaxY: 88
            },
            {
                src: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=450&q=80',
                alt: 'speaker', style: { top: '35%', left: '31%', width: '17%', maxWidth: 265, aspectRatio: '3/4' }, parallaxY: 105
            },
            {
                src: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=700&q=80',
                alt: 'clock', style: { top: '12%', right: '1%', width: '28%', maxWidth: 430, aspectRatio: '4/3' }, parallaxY: 70
            },
            {
                src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
                alt: 'headphones', style: { top: '10%', left: '28%', width: '10%', maxWidth: 150, aspectRatio: '1/1' }, parallaxY: 60
            },
        ],
    },
]