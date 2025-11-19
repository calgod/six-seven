import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Zap, Rocket, Star, Heart, Dice6 } from 'lucide-react'
import { Link } from 'react-router-dom'

export function HomePage() {
  const features = [
    { icon: Sparkles, title: '6 Colors', desc: 'Vibrant palette', color: 'text-purple-500' },
    { icon: Zap, title: '7 Components', desc: 'Interactive UI', color: 'text-yellow-500' },
    { icon: Rocket, title: '67 Animations', desc: 'Smooth transitions', color: 'text-blue-500' },
    { icon: Star, title: '6+7=13', desc: 'Lucky numbers', color: 'text-pink-500' },
    { icon: Heart, title: '7×6=42', desc: 'The answer', color: 'text-red-500' },
    { icon: Dice6, title: '6.7 Perfect', desc: 'Score rating', color: 'text-green-500' },
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 py-12"
      >
        <div className="flex items-center justify-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-16 w-16 text-purple-500" />
          </motion.div>
          <h1 className="text-7xl font-bold">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              6 7
            </span>
          </h1>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-16 w-16 text-pink-500" />
          </motion.div>
        </div>

        <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
          A chaotic, colorful playground of React components and interactive widgets
        </p>

        <div className="flex items-center justify-center gap-3">
          <Badge className="text-lg px-4 py-2 bg-purple-500">Six</Badge>
          <Badge className="text-lg px-4 py-2 bg-pink-500">Seven</Badge>
          <Badge className="text-lg px-4 py-2 bg-blue-500">Awesome</Badge>
        </div>

        <div className="flex gap-4 justify-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600">
            <Link to="/playground">Explore Playground</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/widgets">View Widgets</Link>
          </Button>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-500">
              <CardHeader>
                <feature.icon className={`h-12 w-12 ${feature.color} mb-2`} />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.desc}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Numbers Section */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
        <CardHeader>
          <CardTitle className="text-3xl">Why 6 and 7?</CardTitle>
          <CardDescription>The perfect combination of numbers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white dark:bg-gray-900 rounded-lg text-center"
            >
              <div className="text-6xl font-bold text-purple-600">6</div>
              <p className="text-sm text-muted-foreground mt-2">Perfect Number</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white dark:bg-gray-900 rounded-lg text-center"
            >
              <div className="text-6xl font-bold text-pink-600">7</div>
              <p className="text-sm text-muted-foreground mt-2">Lucky Number</p>
            </motion.div>
          </div>
          <p className="text-center text-lg">
            Together they make <span className="font-bold text-purple-600">67</span> or{' '}
            <span className="font-bold text-pink-600">13</span> or{' '}
            <span className="font-bold text-blue-600">42</span> - all magical!
          </p>
        </CardContent>
      </Card>

      {/* Animated Squares */}
      <div className="grid grid-cols-6 gap-4 py-12">
        {Array.from({ length: 42 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.02 }}
            whileHover={{ scale: 1.2, rotate: 15 }}
            className={`h-12 w-12 rounded-lg ${
              i % 7 === 0
                ? 'bg-purple-500'
                : i % 6 === 0
                ? 'bg-pink-500'
                : i % 2 === 0
                ? 'bg-blue-500'
                : 'bg-green-500'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
