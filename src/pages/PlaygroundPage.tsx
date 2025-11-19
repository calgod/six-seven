import { motion } from 'framer-motion'
import { SymmetryCanvas } from '@/components/playground/SymmetryCanvas'
import { ParticleExplosion } from '@/components/playground/ParticleExplosion'
import { BouncingBalls } from '@/components/playground/BouncingBalls'
import { RipplePool } from '@/components/playground/RipplePool'
import { PaintSplatter } from '@/components/playground/PaintSplatter'

export function PlaygroundPage() {
  const components = [
    { Component: SymmetryCanvas, delay: 0.1 },
    { Component: ParticleExplosion, delay: 0.2 },
    { Component: BouncingBalls, delay: 0.3 },
    { Component: RipplePool, delay: 0.4 },
    { Component: PaintSplatter, delay: 0.5 },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-6xl font-bold">
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Interactive Playground
          </span>
        </h1>
        <p className="text-muted-foreground text-xl">
          Click, draw, and play with these interactive canvases!
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-600 font-semibold">
            ✏️ Draw
          </span>
          <span className="px-4 py-2 rounded-full bg-pink-500/20 text-pink-600 font-semibold">
            💥 Explode
          </span>
          <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-600 font-semibold">
            ⚽ Bounce
          </span>
          <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-600 font-semibold">
            🌊 Ripple
          </span>
          <span className="px-4 py-2 rounded-full bg-orange-500/20 text-orange-600 font-semibold">
            🎨 Splatter
          </span>
        </div>
      </motion.div>

      {/* Interactive Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {components.map(({ Component, delay }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <Component />
          </motion.div>
        ))}
      </div>

      {/* Fun Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12"
      >
        <div className="text-center p-6 rounded-lg bg-purple-500/10">
          <div className="text-4xl font-bold text-purple-600">6</div>
          <div className="text-sm text-muted-foreground">Symmetry Axes</div>
        </div>
        <div className="text-center p-6 rounded-lg bg-pink-500/10">
          <div className="text-4xl font-bold text-pink-600">67</div>
          <div className="text-sm text-muted-foreground">Particles per Click</div>
        </div>
        <div className="text-center p-6 rounded-lg bg-blue-500/10">
          <div className="text-4xl font-bold text-blue-600">∞</div>
          <div className="text-sm text-muted-foreground">Bouncing Balls</div>
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="p-6 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
      >
        <h3 className="text-xl font-bold mb-3">How to Play:</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>🎨 <strong>Symmetry Canvas:</strong> Draw and see your art mirrored 6 times!</li>
          <li>💥 <strong>Particle Explosion:</strong> Click anywhere to explode 67 colorful particles</li>
          <li>⚽ <strong>Bouncing Balls:</strong> Adjust gravity and watch physics in action</li>
          <li>🌊 <strong>Ripple Pool:</strong> Create beautiful water-like ripple patterns</li>
          <li>🎨 <strong>Paint Splatter:</strong> Click to splatter 7 paint droplets</li>
        </ul>
      </motion.div>
    </div>
  )
}
