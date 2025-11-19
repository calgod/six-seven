import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Calculator as CalcIcon } from 'lucide-react'

export function Calculator() {
  const [display, setDisplay] = useState('0')
  const [prevValue, setPrevValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)

  const handleNumber = (num: string) => {
    setDisplay(display === '0' ? num : display + num)
  }

  const handleOperation = (op: string) => {
    setPrevValue(parseFloat(display))
    setOperation(op)
    setDisplay('0')
  }

  const calculate = () => {
    if (prevValue !== null && operation) {
      const current = parseFloat(display)
      let result = 0
      switch (operation) {
        case '+':
          result = prevValue + current
          break
        case '-':
          result = prevValue - current
          break
        case '×':
          result = prevValue * current
          break
        case '÷':
          result = prevValue / current
          break
      }
      setDisplay(result.toString())
      setPrevValue(null)
      setOperation(null)
    }
  }

  const clear = () => {
    setDisplay('0')
    setPrevValue(null)
    setOperation(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalcIcon className="h-5 w-5" />
          Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-right text-2xl font-mono">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button onClick={clear} variant="destructive">C</Button>
          <Button onClick={() => handleOperation('÷')} variant="outline">÷</Button>
          <Button onClick={() => handleOperation('×')} variant="outline">×</Button>
          <Button onClick={() => handleOperation('-')} variant="outline">-</Button>

          <Button onClick={() => handleNumber('7')}>7</Button>
          <Button onClick={() => handleNumber('8')}>8</Button>
          <Button onClick={() => handleNumber('9')}>9</Button>
          <Button onClick={() => handleOperation('+')} variant="outline">+</Button>

          <Button onClick={() => handleNumber('4')}>4</Button>
          <Button onClick={() => handleNumber('5')}>5</Button>
          <Button onClick={() => handleNumber('6')}>6</Button>
          <Button onClick={calculate} className="row-span-2 bg-purple-600">=</Button>

          <Button onClick={() => handleNumber('1')}>1</Button>
          <Button onClick={() => handleNumber('2')}>2</Button>
          <Button onClick={() => handleNumber('3')}>3</Button>

          <Button onClick={() => handleNumber('0')} className="col-span-2">0</Button>
          <Button onClick={() => handleNumber('.')}>.</Button>
        </div>
      </CardContent>
    </Card>
  )
}
