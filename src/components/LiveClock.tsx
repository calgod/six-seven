import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Clock } from 'lucide-react'

export function LiveClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Live Clock
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-mono text-center">
          {time.toLocaleTimeString()}
        </div>
        <div className="text-sm text-muted-foreground text-center mt-2">
          {time.toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  )
}
