import { motion } from 'framer-motion'

interface RainbowTextProps {
  text: string
}

export function RainbowText({ text }: RainbowTextProps) {
  const colors = ['text-purple-500', 'text-pink-500', 'text-blue-500', 'text-green-500', 'text-yellow-500', 'text-red-500']

  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className={`text-4xl font-bold ${colors[i % colors.length]}`}
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}
