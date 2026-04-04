import { SectionData } from '../lib/types'

export const SECTIONS: SectionData[] = [
    {
        id: 'fullstack', category: 'FULL STACK DEVELOPMENT', dark: false,
        products: [
            {
                src: '/logos/1327.png',
                alt: '1327', style: { top: '40%', left: '3%', width: '25%', maxWidth: 370, aspectRatio: '1.1/1', clipPath: 'inset(0 2% 0 0)' }, parallaxY: 90,
                description: 'Bespoke Cloth Customization for high-end cafes with integrated branding.',
                link: '/projects/1327'
            },
            {
                src: '/logos/dariza.jpg',
                alt: 'dariza', style: { top: '38%', left: '40%', width: '17%', maxWidth: 260, aspectRatio: '1/1' }, parallaxY: 115,
                description: 'Premium e-commerce platform matching minimalist aesthetics.',
                link: '/projects/dariza'
            },
            {
                src: '/froven image/Gemini_Generated_Image_gqcanogqcanogqca-Photoroom.png',
                alt: 'froven', style: { top: '30%', right: '10%', width: '20%', maxWidth: 430, aspectRatio: '1/1' }, parallaxY: 70,
                description: 'Sales and rental platform for commercial refrigeration showcasing all products with key specs.',
                link: '/projects/froven'
            },
        ],
    },
    {
        id: 'decor', category: 'AI AGENTS', dark: true,
        products: [
            {
                src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
                alt: 'portfolio-ai', style: { top: '5%', left: '15%', width: '25%', maxWidth: 350, aspectRatio: '4/3' }, parallaxY: 85,
                description: 'An omnipresent, ultra-intelligent AI chatbot built for interactive portfolios.',
                link: '/projects/portfolio-ai'
            },
            {
                src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
                alt: 'rag-chatbot', style: { top: '35%', left: '45%', width: '20%', maxWidth: 300, aspectRatio: '1/1' }, parallaxY: 115,
                description: 'Supercharged enterprise RAG chatbots delivering instant, verifiable data retrieval.',
                link: '/projects/rag-chatbot'
            },
            {
                src: '/logos/voice-agent-ai.png',
                alt: 'voice-agent', style: { top: '15%', right: '5%', width: '22%', maxWidth: 320, aspectRatio: '3/4' }, parallaxY: 60,
                description: 'Hyper-realistic voice agents closing thousands of leads independently.',
                link: '/projects/voice-agent'
            },
        ],
    },
    {
        id: 'office', category: 'AUTOMATION', dark: false,
        products: [
            {
                src: '/logos/cards.jpg',
                alt: 'cards', style: { top: '5%', left: '22%', width: '24%', maxWidth: 370, aspectRatio: '1/1' }, parallaxY: 90,
                description: 'Streamlining repetitive workflows to save time and boost productivity.',
                link: '/projects/cards'
            },
            {
                src: '/logos/whatsapp.png',
                alt: 'whatsapp', style: { top: '12%', right: '8%', width: '20%', maxWidth: 570, aspectRatio: '1/1' }, parallaxY: 55,
                description: 'Automated notification pipelines via WhatsApp integrations.',
                link: '/projects/whatsapp'
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
                alt: 'chatapp', style: { top: '8%', left: '2%', width: '%', maxWidth: 370, aspectRatio: '1/1' }, parallaxY: 88,
                description: 'Data-driven strategies and technical tools to optimize your daily operations.',
                link: '/projects/chatapp'
            },
            // {
            //     src: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=450&q=80',
            //     alt: 'speaker', style: { top: '35%', left: '31%', width: '17%', maxWidth: 265, aspectRatio: '3/4' }, parallaxY: 105
            // },
            {
                src: '/logos/attendance.png',
                alt: 'attendance', style: { top: '12%', right: '12%', width: '22%', maxWidth: 430, aspectRatio: '1/1' }, parallaxY: 70,
                description: 'Holistic system integrations managing team metrics actively.',
                link: '/projects/attendance'
            },
            // {
            //     src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
            //     alt: 'headphones', style: { top: '10%', left: '28%', width: '10%', maxWidth: 150, aspectRatio: '1/1' }, parallaxY: 60
            // },
        ],
    },
]