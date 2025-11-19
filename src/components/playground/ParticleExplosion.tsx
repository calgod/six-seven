import { useRef, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Trash2 } from 'lucide-react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  life: number
  size: number
}

export function ParticleExplosion() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const [autoMode, setAutoMode] = useState(false)

  const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = 400
    canvas.height = 300

    const animate = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Clear with fade effect
      ctx.fillStyle = 'rgba(26, 26, 46, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.2 // gravity
        particle.life -= 0.01

        if (particle.life <= 0) return false

        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.life
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1

        return true
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!autoMode) return

    const interval = setInterval(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      createExplosion(Math.random() * canvas.width, Math.random() * canvas.height)
    }, 500)

    return () => clearInterval(interval)
  }, [autoMode])

  const createExplosion = (x: number, y: number) => {
    const particleCount = 67
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount
      const speed = 2 + Math.random() * 3
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        size: 2 + Math.random() * 2,
      })
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      createExplosion(x, y)
    }
  }

  const clearParticles = () => {
    particlesRef.current = []
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Particle Explosion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          className="border-2 border-pink-500 rounded-lg cursor-pointer w-full bg-[#1a1a2e]"
          style={{ maxWidth: '400px' }}
        />

        <div className="flex gap-2">
          <Button
            onClick={() => setAutoMode(!autoMode)}
            variant={autoMode ? 'default' : 'outline'}
            className="flex-1"
          >
            {autoMode ? 'Stop Auto' : 'Auto Mode'}
          </Button>
          <Button onClick={clearParticles} variant="outline" className="flex-1">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          Click anywhere to explode 67 particles!
        </p>
      </CardContent>
    </Card>
  )
}
