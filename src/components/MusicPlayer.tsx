import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react'

// Helper function to format time as mm:ss
const formatTime = (time: number): string => {
  if (isNaN(time)) return '0:00'
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function MusicPlayer() {
  const songs = [
    {
      title: 'Six Seven Symphony',
      artist: 'Number Band',
      url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3'
    },
  ]

  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentSong, setCurrentSong] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Handle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Handle next song
  const nextSong = () => {
    const nextIndex = (currentSong + 1) % songs.length
    setCurrentSong(nextIndex)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  // Handle previous song
  const prevSong = () => {
    const prevIndex = (currentSong - 1 + songs.length) % songs.length
    setCurrentSong(prevIndex)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  // Handle seek/scrubbing
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  // Update progress as audio plays
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  // Get duration when audio loads
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
      setIsLoading(false)
    }
  }

  // Auto-play next track when current ends
  const handleEnded = () => {
    nextSong()
  }

  // Cleanup: pause audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  // Reset playback when song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      setCurrentTime(0)
      setDuration(0)
      setIsLoading(true)
      setIsPlaying(false)
    }
  }, [currentSong])

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" />
          Music Player
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={songs[currentSong].url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />

        {/* Track info */}
        <div className="text-center space-y-2">
          <div className="text-xl font-bold">{songs[currentSong].title}</div>
          <div className="text-sm text-muted-foreground">{songs[currentSong].artist}</div>
          {isLoading ? (
            <Badge variant="outline">Loading...</Badge>
          ) : (
            <Badge variant="outline">
              {formatTime(currentTime)} / {formatTime(duration)}
            </Badge>
          )}
        </div>

        {/* Progress bar with seek */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer dark:bg-gray-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-purple-600 [&::-webkit-slider-thumb]:to-pink-600"
            style={{
              background: `linear-gradient(to right, rgb(147, 51, 234) 0%, rgb(236, 72, 153) ${progress}%, rgb(229, 231, 235) ${progress}%, rgb(229, 231, 235) 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button onClick={prevSong} size="icon" variant="outline">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            onClick={togglePlay}
            size="icon"
            className="h-12 w-12"
            disabled={isLoading}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
          <Button onClick={nextSong} size="icon" variant="outline">
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
