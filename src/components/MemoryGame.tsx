import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Brain } from 'lucide-react'

export function MemoryGame() {
  const [sequence, setSequence] = useState<number[]>([])
  const [playerSequence, setPlayerSequence] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  const colors = ['bg-purple-500', 'bg-pink-500', 'bg-blue-500', 'bg-green-500']

  const startGame = () => {
    const newSequence = [Math.floor(Math.random() * 4)]
    setSequence(newSequence)
    setPlayerSequence([])
    setScore(0)
    setIsPlaying(true)
    playSequence(newSequence)
  }

  const playSequence = async (seq: number[]) => {
    for (const index of seq) {
      await new Promise(resolve => setTimeout(resolve, 500))
      setHighlightedIndex(index)
      await new Promise(resolve => setTimeout(resolve, 500))
      setHighlightedIndex(null)
    }
  }

  const handleColorClick = (index: number) => {
    if (!isPlaying) return

    const newPlayerSequence = [...playerSequence, index]
    setPlayerSequence(newPlayerSequence)

    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setIsPlaying(false)
      return
    }

    if (newPlayerSequence.length === sequence.length) {
      const newScore = score + 1
      setScore(newScore)
      const newSequence = [...sequence, Math.floor(Math.random() * 4)]
      setSequence(newSequence)
      setPlayerSequence([])
      setTimeout(() => playSequence(newSequence), 1000)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Memory Game
          </span>
          <Badge>{score} points</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {colors.map((color, index) => (
            <motion.button
              key={index}
              onClick={() => handleColorClick(index)}
              disabled={!isPlaying || highlightedIndex !== null}
              className={`h-24 rounded-lg ${color} ${
                highlightedIndex === index ? 'opacity-100' : 'opacity-50'
              } hover:opacity-75 transition-opacity`}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>
        <Button onClick={startGame} className="w-full" disabled={isPlaying && playerSequence.length < sequence.length}>
          {isPlaying ? 'Playing...' : 'Start Game'}
        </Button>
      </CardContent>
    </Card>
  )
}
