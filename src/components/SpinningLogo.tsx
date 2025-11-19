import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export function SpinningLogo() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      className="inline-block"
    >
      <Sparkles className="h-6 w-6 text-purple-500" />
    </motion.div>
  )
}
