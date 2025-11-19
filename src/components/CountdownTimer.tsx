import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export function CountdownTimer() {
  const [count, setCount] = useState(67)

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCount(67)
    }
  }, [count])

  return (
    <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
      <CardHeader>
        <CardTitle>Countdown Timer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-6xl font-bold text-center">
          {count}
        </div>
      </CardContent>
    </Card>
  )
}
