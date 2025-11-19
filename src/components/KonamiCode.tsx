import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function KonamiCode() {
  const [activated, setActivated] = useState(false)
  const [sequence, setSequence] = useState<string[]>([])

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight']

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...sequence, e.key].slice(-8)
      setSequence(newSequence)

      if (newSequence.join(',') === konamiCode.join(',')) {
        setActivated(true)
        setTimeout(() => setActivated(false), 5000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [sequence])

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 pointer-events-none"
        >
          <div className="text-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="text-9xl"
            >
              🎮
            </motion.div>
            <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text">
              KONAMI CODE!
            </div>
            <div className="text-3xl text-white">
              You found the secret! 🎉
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
