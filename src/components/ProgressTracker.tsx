import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Plus, Minus } from 'lucide-react'

export function ProgressTracker() {
  const [progress, setProgress] = useState(67)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full bg-gray-200 rounded-full h-8 dark:bg-gray-700">
          <div
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-8 rounded-full transition-all duration-300 flex items-center justify-center text-white font-bold"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setProgress(Math.max(0, progress - 6))}
            variant="outline"
            className="flex-1"
          >
            <Minus className="h-4 w-4 mr-1" />
            -6
          </Button>
          <Button
            onClick={() => setProgress(Math.min(100, progress + 7))}
            variant="outline"
            className="flex-1"
          >
            <Plus className="h-4 w-4 mr-1" />
            +7
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
