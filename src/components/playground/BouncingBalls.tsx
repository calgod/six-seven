import { useRef, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Circle, Plus, Minus, Zap } from 'lucide-react'

interface Ball {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

export function BouncingBalls() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ballsRef = useRef<Ball[]>([])
  const animationRef = useRef<number>()
  const [gravity, setGravity] = useState(0.5)
  const [ballCount, setBallCount] = useState(6)

  const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = 400
    canvas.height = 300

    // Initialize balls
    ballsRef.current = Array.from({ length: ballCount }, () => ({
      x: Math.random() * (canvas.width - 40) + 20,
      y: Math.random() * (canvas.height - 40) + 20,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      radius: 10 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    const animate = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.fillStyle = '#1a1a2e'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ballsRef.current.forEach((ball) => {
        // Apply gravity
        ball.vy += gravity

        // Update position
        ball.x += ball.vx
        ball.y += ball.vy

        // Bounce off walls
        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
          ball.vx *= -0.9
          ball.x = ball.x - ball.radius < 0 ? ball.radius : canvas.width - ball.radius
        }
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
          ball.vy *= -0.9
          ball.y = ball.y - ball.radius < 0 ? ball.radius : canvas.height - ball.radius
        }

        // Draw ball
        ctx.fillStyle = ball.color
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
        ctx.fill()

        // Draw trail
        ctx.strokeStyle = ball.color
        ctx.globalAlpha = 0.3
        ctx.lineWidth = ball.radius / 2
        ctx.beginPath()
        ctx.moveTo(ball.x, ball.y)
        ctx.lineTo(ball.x - ball.vx * 2, ball.y - ball.vy * 2)
        ctx.stroke()
        ctx.globalAlpha = 1
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gravity, ballCount])

  const addBall = () => {
    const canvas = canvasRef.current
    if (!canvas || ballsRef.current.length >= 20) return

    ballsRef.current.push({
      x: Math.random() * (canvas.width - 40) + 20,
      y: 50,
      vx: (Math.random() - 0.5) * 4,
      vy: 0,
      radius: 10 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
    })
    setBallCount(ballsRef.current.length)
  }

  const removeBall = () => {
    if (ballsRef.current.length > 1) {
      ballsRef.current.pop()
      setBallCount(ballsRef.current.length)
    }
  }

  const chaosMode = () => {
    ballsRef.current.forEach((ball) => {
      ball.vx = (Math.random() - 0.5) * 10
      ball.vy = (Math.random() - 0.5) * 10
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Circle className="h-5 w-5" />
          Bouncing Balls ({ballCount})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas
          ref={canvasRef}
          className="border-2 border-blue-500 rounded-lg w-full bg-[#1a1a2e]"
          style={{ maxWidth: '400px' }}
        />

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm">Gravity:</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={gravity}
              onChange={(e) => setGravity(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm w-8">{gravity.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={addBall} variant="outline" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
          <Button onClick={removeBall} variant="outline" size="sm">
            <Minus className="h-4 w-4" />
          </Button>
          <Button onClick={chaosMode} variant="default" className="flex-1">
            <Zap className="h-4 w-4 mr-2" />
            Chaos!
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
