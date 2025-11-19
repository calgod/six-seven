import { motion } from 'framer-motion'
import { Card } from './ui/card'
import { ReactNode } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  delay?: number
}

export function AnimatedCard({ children, delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
    >
      <Card>{children}</Card>
    </motion.div>
  )
}
