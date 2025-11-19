import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home, Gamepad2, BarChart3, FormInput, Sparkles, Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export function Navigation() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/playground', label: 'Playground', icon: Gamepad2 },
    { to: '/charts', label: 'Charts', icon: BarChart3 },
    { to: '/forms', label: 'Forms', icon: FormInput },
    { to: '/widgets', label: 'Widgets', icon: Sparkles },
  ]

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-purple-500 animate-pulse" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Six Seven
            </span>
          </Link>

          <div className="flex items-center space-x-1">
            {links.map(({ to, label, icon: Icon }) => (
              <Button
                key={to}
                variant={location.pathname === to ? 'default' : 'ghost'}
                size="sm"
                asChild
              >
                <Link to={to} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </Button>
            ))}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="ml-2"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
