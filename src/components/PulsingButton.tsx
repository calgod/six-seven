import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { ReactNode } from 'react'

interface PulsingButtonProps {
  children: ReactNode
  onClick?: () => void
}

export function PulsingButton({ children, onClick }: PulsingButtonProps) {
  return (
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Button
        onClick={onClick}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
        size="lg"
      >
        {children}
      </Button>
    </motion.div>
  )
}
