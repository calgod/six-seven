import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Dice6 } from 'lucide-react'

export function DiceRoller() {
  const [dice1, setDice1] = useState(6)
  const [dice2, setDice2] = useState(7)
  const [isRolling, setIsRolling] = useState(false)

  const rollDice = () => {
    setIsRolling(true)
    setTimeout(() => {
      setDice1(Math.floor(Math.random() * 6) + 1)
      setDice2(Math.floor(Math.random() * 6) + 1)
      setIsRolling(false)
    }, 500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dice6 className="h-5 w-5" />
          Dice Roller
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 justify-center">
          <motion.div
            animate={isRolling ? { rotate: 360 } : {}}
            transition={{ duration: 0.5 }}
            className="h-20 w-20 bg-purple-500 rounded-lg flex items-center justify-center text-white text-4xl font-bold"
          >
            {dice1}
          </motion.div>
          <motion.div
            animate={isRolling ? { rotate: -360 } : {}}
            transition={{ duration: 0.5 }}
            className="h-20 w-20 bg-pink-500 rounded-lg flex items-center justify-center text-white text-4xl font-bold"
          >
            {dice2}
          </motion.div>
        </div>
        <div className="text-center text-2xl font-bold">
          Sum: {dice1 + dice2}
        </div>
        <Button onClick={rollDice} disabled={isRolling} className="w-full">
          <Dice6 className="h-4 w-4 mr-2" />
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </Button>
      </CardContent>
    </Card>
  )
}
