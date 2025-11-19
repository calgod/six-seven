import { motion } from 'framer-motion'
import { CountdownTimer } from '@/components/CountdownTimer'
import { LiveClock } from '@/components/LiveClock'
import { RandomQuote } from '@/components/RandomQuote'
import { DiceRoller } from '@/components/DiceRoller'
import { ProgressTracker } from '@/components/ProgressTracker'
import { ColorPicker } from '@/components/ColorPicker'
import { RainbowText } from '@/components/RainbowText'
import { Calculator } from '@/components/Calculator'
import { MemoryGame } from '@/components/MemoryGame'
import { WeatherWidget } from '@/components/WeatherWidget'
import { TodoList } from '@/components/TodoList'
import { MusicPlayer } from '@/components/MusicPlayer'

export function WidgetsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <RainbowText text="WIDGETS GALORE!" />
        <p className="text-muted-foreground text-lg">
          A collection of fun and interactive widgets
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <CountdownTimer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <LiveClock />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <RandomQuote />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <DiceRoller />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ProgressTracker />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <ColorPicker />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Calculator />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <MemoryGame />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
        >
          <WeatherWidget />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0 }}
        >
          <TodoList />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1 }}
        >
          <MusicPlayer />
        </motion.div>
      </div>
    </div>
  )
}
