import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Send, CheckCircle2, XCircle, Loader2 } from 'lucide-react'

export function FormsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [favoriteNumber, setFavoriteNumber] = useState('6')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [newsletter, setNewsletter] = useState(true)
  const [score, setScore] = useState(67)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }, 1500)
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Interactive Forms
        </h1>
        <p className="text-muted-foreground text-lg">
          Fill out forms and see magic happen
        </p>
      </div>

      {/* Main Form */}
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Join the 6-7 Club</CardTitle>
            <CardDescription>
              Sign up to receive updates about our magical numbers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="favorite">Favorite Number (6 or 7)</Label>
              <Input
                id="favorite"
                value={favoriteNumber}
                onChange={(e) => setFavoriteNumber(e.target.value)}
                placeholder="6 or 7"
              />
              {favoriteNumber !== '6' && favoriteNumber !== '7' && favoriteNumber && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <XCircle className="h-4 w-4" />
                  Please enter 6 or 7
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="newsletter"
                checked={newsletter}
                onCheckedChange={setNewsletter}
              />
              <Label htmlFor="newsletter">
                Subscribe to our newsletter
              </Label>
            </div>

            <div className="space-y-2">
              <Label>Your Score: {score}</Label>
              <input
                type="range"
                min="0"
                max="100"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || submitted}
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : submitted ? (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Submitted!
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Submit Form
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Live Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>See your form data in real-time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Name</Label>
                <p className="font-semibold">{name || 'Not entered'}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Email</Label>
                <p className="font-semibold">{email || 'Not entered'}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Favorite Number</Label>
                <p className="font-semibold">{favoriteNumber || 'Not selected'}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Score</Label>
                <p className="font-semibold">{score}/100</p>
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Newsletter</Label>
              <div className="mt-1">
                {newsletter ? (
                  <Badge className="bg-green-500">Subscribed</Badge>
                ) : (
                  <Badge variant="outline">Not subscribed</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          variant="outline"
          onClick={() => {
            setName('Lucky User')
            setEmail('lucky@six-seven.app')
            setFavoriteNumber('6')
            setScore(67)
          }}
        >
          Fill with 6
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setName('Magic User')
            setEmail('magic@six-seven.app')
            setFavoriteNumber('7')
            setScore(76)
          }}
        >
          Fill with 7
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setName('')
            setEmail('')
            setFavoriteNumber('')
            setScore(67)
            setNewsletter(true)
          }}
        >
          Clear Form
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setFavoriteNumber(Math.random() > 0.5 ? '6' : '7')
            setScore(Math.floor(Math.random() * 100))
          }}
        >
          Randomize
        </Button>
      </div>

      {/* Fun Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Form Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600">67</div>
              <div className="text-sm text-muted-foreground">Forms Submitted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600">76</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">42</div>
              <div className="text-sm text-muted-foreground">Newsletter Subs</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
