import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function EmojiRain() {
  const emojis = ['🎨', '✨', '🎉', '🌟', '💫', '🎈', '🎊', '🌈']
  const [drops, setDrops] = useState<Array<{ id: number; emoji: string; x: number }>>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setDrops(prev => [
        ...prev.slice(-20),
        {
          id: Date.now(),
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          x: Math.random() * 100
        }
      ])
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {drops.map(drop => (
        <motion.div
          key={drop.id}
          initial={{ y: -50, x: `${drop.x}vw`, opacity: 1 }}
          animate={{ y: '100vh', opacity: 0 }}
          transition={{ duration: 3, ease: 'linear' }}
          className="absolute text-4xl"
        >
          {drop.emoji}
        </motion.div>
      ))}
    </div>
  )
}
