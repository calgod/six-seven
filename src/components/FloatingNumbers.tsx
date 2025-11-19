import { motion } from 'framer-motion'

export function FloatingNumbers() {
  const numbers = [6, 7, 13, 42, 67, 76]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {numbers.map((num, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -100,
            opacity: 0.3
          }}
          animate={{
            y: window.innerHeight + 100,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2,
          }}
          className="absolute text-6xl font-bold text-purple-500/20"
        >
          {num}
        </motion.div>
      ))}
    </div>
  )
}
