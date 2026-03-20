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
                src: '/logos/chat1.png',
                alt: 'chat', style: { top: '1%', left: '30%', width: '24%', maxWidth: 300, aspectRatio: '1/1' }, parallaxY: 85
            },
            {
                src: '/logos/call1.png',
                alt: 'call', style: { top: '28%', left: '70%', width: '24%', maxWidth: 300, aspectRatio: '1/1' }, parallaxY: 115
            },
            //{
            //    src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80',
            //    alt: 'room', style: { top: '28%', right: '1%', width: '28%', maxWidth: 420, aspectRatio: '4/3' }, parallaxY: 80
            //},
        ],
    },
    {
        id: 'office', category: 'AUTOMATION', dark: false,
        products: [
            {
                src: '/logos/cards.jpg',
                alt: 'cards', style: { top: '5%', left: '22%', width: '24%', maxWidth: 370, aspectRatio: '1/1' }, parallaxY: 90
            },
            {
                src: '/logos/whatsapp.png',
                alt: 'whatsapp', style: { top: '12%', right: '8%', width: '20%', maxWidth: 570, aspectRatio: '1/1' }, parallaxY: 55
            },
            // {
            //     src: 'https://images.unsplash.com/photo-1561015708-98a1db703e84?w=450&q=80',
            //     alt: 'chairs', style: { top: '38%', left: '32%', width: '17%', maxWidth: 265, aspectRatio: '4/5' }, parallaxY: 110
            // },
            // {
            //     src: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=700&q=80',
            //     alt: 'home office', style: { top: '28%', right: '1%', width: '29%', maxWidth: 425, aspectRatio: '4/3' }, parallaxY: 75
            // },
        ],
    },
    {
        id: 'tech', category: 'BUSINESS OPTIMIZATION', dark: true,
        products: [
            {
                src: '/logos/chatapp.png',
                alt: 'book', style: { top: '8%', left: '2%', width: '%', maxWidth: 370, aspectRatio: '1/1' }, parallaxY: 88
            },
            // {
            //     src: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=450&q=80',
            //     alt: 'speaker', style: { top: '35%', left: '31%', width: '17%', maxWidth: 265, aspectRatio: '3/4' }, parallaxY: 105
            // },
            {
                src: '/logos/attendance.png',
                alt: 'attendance', style: { top: '12%', right: '12%', width: '22%', maxWidth: 430, aspectRatio: '1/1' }, parallaxY: 70
            },
            // {
            //     src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
            //     alt: 'headphones', style: { top: '10%', left: '28%', width: '10%', maxWidth: 150, aspectRatio: '1/1' }, parallaxY: 60
            // },
        ],
    },
]