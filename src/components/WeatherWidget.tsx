import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Cloud, Sun, CloudRain, CloudSnow, Wind } from 'lucide-react'

export function WeatherWidget() {
  const weathers = [
    { icon: Sun, name: 'Sunny', temp: 67, color: 'text-yellow-500' },
    { icon: Cloud, name: 'Cloudy', temp: 56, color: 'text-gray-500' },
    { icon: CloudRain, name: 'Rainy', temp: 47, color: 'text-blue-500' },
    { icon: CloudSnow, name: 'Snowy', temp: 32, color: 'text-cyan-500' },
    { icon: Wind, name: 'Windy', temp: 61, color: 'text-teal-500' },
  ]

  const [currentWeather, setCurrentWeather] = useState(weathers[0])

  const randomWeather = () => {
    const randomIndex = Math.floor(Math.random() * weathers.length)
    setCurrentWeather(weathers[randomIndex])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Widget</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-4">
          <currentWeather.icon className={`h-24 w-24 mx-auto ${currentWeather.color}`} />
          <div>
            <div className="text-4xl font-bold">{currentWeather.temp}°F</div>
            <div className="text-xl text-muted-foreground">{currentWeather.name}</div>
          </div>
        </div>
        <Button onClick={randomWeather} className="w-full" variant="outline">
          Change Weather
        </Button>
      </CardContent>
    </Card>
  )
}
