import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Envelope from './components/Envelope'
import Hero3D from './components/Hero3D'
import InvitationCard from './components/InvitationCard'
import PhotoGallery3D from './components/PhotoGallery3D'
import Countdown from './components/Countdown'
import Timeline from './components/Timeline'
import ContactSection from './components/ContactSection'
import MusicPlayer from './components/MusicPlayer'
import FloatingActions from './components/FloatingActions'
import './App.css'

// Initialise theme from storage before first render
const savedTheme = localStorage.getItem('wedding-theme') === 'dark'
if (savedTheme) document.documentElement.setAttribute('data-theme', 'dark')

function App() {
  const [opened, setOpened] = useState(false)
  const [darkMode, setDarkMode] = useState(savedTheme)

  function toggleDark() {
    const next = !darkMode
    setDarkMode(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('wedding-theme', next ? 'dark' : 'light')
  }

  return (
    <AnimatePresence mode="wait">
      {!opened ? (
        <Envelope key="envelope" onOpen={() => setOpened(true)} />
      ) : (
        <motion.main
          key="invitation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Hero3D />
          <InvitationCard />
          <PhotoGallery3D />
          <Countdown />
          <Timeline />
          <ContactSection />
          <footer className="wedding-footer">
            <p>With love, Karthikasree &amp; Sarathkumar</p>
            <p>© 2026. Designed with care by santhoshkumar.</p>
          </footer>

          {/* Floating UI */}
          <MusicPlayer />
          <FloatingActions darkMode={darkMode} onToggleDark={toggleDark} />
        </motion.main>
      )}
    </AnimatePresence>
  )
}

export default App
