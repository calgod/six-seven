import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'
import { KonamiCode } from './KonamiCode'

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <KonamiCode />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
