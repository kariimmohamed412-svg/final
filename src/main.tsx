import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AudioProvider } from './context/AudioContext'
import { ThemeProvider } from './context/ThemeContext'
import { AccentProvider } from './context/AccentContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AccentProvider>
        <AudioProvider>
          <App />
        </AudioProvider>
      </AccentProvider>
    </ThemeProvider>
  </StrictMode>,
)
