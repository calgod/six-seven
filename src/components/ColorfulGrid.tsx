import { motion } from 'framer-motion'

export function ColorfulGrid() {
  const colors = ['bg-purple-500', 'bg-pink-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500']

  return (
    <div className="grid grid-cols-6 gap-2">
      {Array.from({ length: 42 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.02 }}
          whileHover={{ scale: 1.2, rotate: 15 }}
          className={`h-16 rounded-lg ${colors[i % colors.length]} cursor-pointer`}
        />
      ))}
    </div>
  )
}
