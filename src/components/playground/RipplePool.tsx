import { useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Waves } from 'lucide-react'

interface Ripple {
  x: number
  y: number
  radius: number
  maxRadius: number
  alpha: number
}

export function RipplePool() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ripplesRef = useRef<Ripple[]>([])
  const animationRef = useRef<number>()

  const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = 400
    canvas.height = 300

    const animate = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Clear with slight fade
      ctx.fillStyle = 'rgba(26, 26, 46, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw ripples
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        ripple.radius += 2
        ripple.alpha -= 0.01

        if (ripple.alpha <= 0 || ripple.radius > ripple.maxRadius) return false

        // Draw 6 concentric circles
        for (let i = 0; i < 6; i++) {
          const r = ripple.radius - i * 10
          if (r > 0) {
            ctx.strokeStyle = colors[i % colors.length]
            ctx.globalAlpha = ripple.alpha * (1 - i * 0.1)
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.arc(ripple.x, ripple.y, r, 0, Math.PI * 2)
            ctx.stroke()
          }
        }

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

  const createRipple = (x: number, y: number) => {
    ripplesRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius: 150,
      alpha: 1,
    })
  }

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      createRipple(x, y)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Waves className="h-5 w-5" />
          Ripple Pool
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          className="border-2 border-cyan-500 rounded-lg cursor-pointer w-full bg-[#1a1a2e]"
          style={{ maxWidth: '400px' }}
        />
        <p className="text-sm text-muted-foreground text-center">
          Click to create ripples with 6 rings!
        </p>
      </CardContent>
    </Card>
  )
}
