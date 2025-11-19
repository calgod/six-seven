import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Quote, RefreshCw } from 'lucide-react'

const quotes = [
  "Six is perfect, seven is lucky!",
  "The answer to everything is 42 (6×7)",
  "Between 6 and 7 lies infinite possibilities",
  "67 is just the beginning",
  "Seven days in a week, six sides on a cube",
  "Six plus seven equals thirteen - a magical number",
  "The magic happens between 6 and 7",
]

export function RandomQuote() {
  const [quote, setQuote] = useState(quotes[0])

  const randomizeQuote = () => {
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(newQuote)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Quote className="h-5 w-5" />
          Random Quote
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg italic text-center">"{quote}"</p>
        <Button onClick={randomizeQuote} className="w-full" variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          New Quote
        </Button>
      </CardContent>
    </Card>
  )
}
