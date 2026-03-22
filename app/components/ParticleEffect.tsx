'use client'

import { useRef, useEffect } from 'react'

export default function ParticleEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []
        const mouse = { x: 0, y: 0, active: false }

        const isMobile = window.innerWidth <= 768

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            init()
        }

        class Particle {
            x: number
            y: number
            vx: number
            vy: number
            size: number
            color: string

            constructor() {
                this.x = Math.random() * canvas!.width
                this.y = Math.random() * canvas!.height
                this.vx = (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5)
                this.vy = (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5)
                this.size = Math.random() * (isMobile ? 1 : 1.5) + 0.5
                this.color = Math.random() > 0.5 ? '#E8E2DA' : '#2E2A26'
            }

            update() {
                this.x += this.vx
                this.y += this.vy

                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1

                // Only track mouse on desktop
                if (!isMobile && mouse.active) {
                    const dx = mouse.x - this.x
                    const dy = mouse.y - this.y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 150) {
                        this.x -= dx * 0.02
                        this.y -= dy * 0.02
                    }
                }
            }

            draw() {
                if (!ctx) return
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = this.color
                ctx.globalAlpha = 0.6
                ctx.fill()
                ctx.globalAlpha = 1.0
            }
        }

        const init = () => {
            particles = []
            // Significantly fewer particles on mobile
            const maxCount = isMobile ? 35 : 100
            const count = Math.min(Math.floor((canvas.width * canvas.height) / (isMobile ? 15000 : 10000)), maxCount)
            for (let i = 0; i < count; i++) {
                particles.push(new Particle())
            }
        }

        const connectionDist = isMobile ? 80 : 120

        const connect = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x
                    const dy = particles[a].y - particles[b].y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < connectionDist) {
                        const opacity = 1 - dist / connectionDist
                        ctx.strokeStyle = `rgba(232, 226, 218, ${opacity * 0.15})`
                        ctx.lineWidth = 1
                        ctx.beginPath()
                        ctx.moveTo(particles[a].x, particles[a].y)
                        ctx.lineTo(particles[b].x, particles[b].y)
                        ctx.stroke()
                    }
                }
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach(p => {
                p.update()
                p.draw()
            })
            connect()
            animationFrameId = requestAnimationFrame(animate)
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (isMobile) return
            mouse.x = e.clientX
            mouse.y = e.clientY
            mouse.active = true
        }

        const handleMouseLeave = () => {
            mouse.active = false
        }

        window.addEventListener('resize', resize)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseleave', handleMouseLeave)
        
        resize()
        animate()

        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseleave', handleMouseLeave)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 5,
            }}
        />
    )
}
