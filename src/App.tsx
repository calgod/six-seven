import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ThemeProvider } from './components/ThemeProvider'
import { HomePage } from './pages/HomePage'
import { PlaygroundPage } from './pages/PlaygroundPage'
import { ChartsPage } from './pages/ChartsPage'
import { FormsPage } from './pages/FormsPage'
import { WidgetsPage } from './pages/WidgetsPage'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="playground" element={<PlaygroundPage />} />
            <Route path="charts" element={<ChartsPage />} />
            <Route path="forms" element={<FormsPage />} />
            <Route path="widgets" element={<WidgetsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
