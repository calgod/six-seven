import { useRef, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, Download, Palette } from 'lucide-react'

export function SymmetryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#8b5cf6')
  const [brushSize, setBrushSize] = useState(3)

  const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 400
    canvas.height = 400

    // Fill with dark background
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const drawSymmetry = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const relX = x - centerX
    const relY = y - centerY

    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'

    // Draw in 6 symmetrical positions
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const rotX = relX * cos - relY * sin + centerX
      const rotY = relX * sin + relY * cos + centerY

      ctx.beginPath()
      ctx.arc(rotX, rotY, brushSize, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      drawSymmetry(x, y)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      drawSymmetry(x, y)
    }
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const downloadCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'symmetry-art.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          6-Fold Symmetry Canvas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="border-2 border-purple-500 rounded-lg cursor-crosshair w-full"
          style={{ maxWidth: '400px' }}
        />

        <div className="space-y-2">
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`h-8 w-8 rounded-full border-2 ${color === c ? 'border-white' : 'border-gray-400'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Brush:</label>
            <input
              type="range"
              min="1"
              max="10"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm w-8">{brushSize}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={clearCanvas} variant="outline" className="flex-1">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
          <Button onClick={downloadCanvas} variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
