import { useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Droplet, Trash2 } from 'lucide-react'

interface Droplet {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
}

export function PaintSplatter() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dropletsRef = useRef<Droplet[]>([])
  const animationRef = useRef<number>()

  const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = 400
    canvas.height = 300

    // Fill with white background
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const animate = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Update and draw droplets
      dropletsRef.current = dropletsRef.current.filter((droplet) => {
        droplet.x += droplet.vx
        droplet.y += droplet.vy
        droplet.vy += 0.3 // gravity
        droplet.life -= 0.02

        if (droplet.life <= 0) return false

        ctx.fillStyle = droplet.color
        ctx.globalAlpha = droplet.life
        ctx.beginPath()
        ctx.arc(droplet.x, droplet.y, droplet.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1

        // Leave permanent paint marks
        if (droplet.vy > 2) {
          ctx.globalAlpha = 0.3
          ctx.beginPath()
          ctx.arc(droplet.x, droplet.y, droplet.size * 0.8, 0, Math.PI * 2)
          ctx.fill()
          ctx.globalAlpha = 1
        }

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

  const createSplatter = (x: number, y: number) => {
    const dropletCount = 7
    const color = colors[Math.floor(Math.random() * colors.length)]

    for (let i = 0; i < dropletCount; i++) {
      const angle = (Math.PI * 2 * i) / dropletCount + (Math.random() - 0.5) * 0.5
      const speed = 3 + Math.random() * 4
      dropletsRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 3 + Math.random() * 5,
        color,
        life: 1,
      })
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      createSplatter(x, y)
    }
  }

  const clearCanvas = () => {
    dropletsRef.current = []
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplet className="h-5 w-5" />
          Paint Splatter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          className="border-2 border-orange-500 rounded-lg cursor-pointer w-full bg-white"
          style={{ maxWidth: '400px' }}
        />

        <Button onClick={clearCanvas} variant="outline" className="w-full">
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Canvas
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Click to splatter 7 paint droplets!
        </p>
      </CardContent>
    </Card>
  )
}
