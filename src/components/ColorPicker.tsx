import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Palette } from 'lucide-react'

export function ColorPicker() {
  const [color, setColor] = useState('#8b5cf6')

  const presetColors = [
    '#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
    '#06b6d4', '#8b5cf6', '#d946ef', '#f97316', '#84cc16', '#6366f1',
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Color Picker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="h-32 rounded-lg transition-all"
          style={{ backgroundColor: color }}
        />
        <div className="text-center font-mono text-sm">{color}</div>
        <div className="grid grid-cols-6 gap-2">
          {presetColors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              style={{ backgroundColor: c }}
              className="h-10 w-10 rounded-lg border-2 border-white hover:scale-110 transition-transform"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
