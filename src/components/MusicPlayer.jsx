import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './MusicPlayer.css'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const audioRef = useRef(null)

  // Show player after a short delay
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(t)
  }, [])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <>
      {/* Hidden audio element — place a music file at /public/wedding-music.mp3 */}
      <audio ref={audioRef} loop preload="none" src="/wedding-music.mp3" />

      <AnimatePresence>
        {visible && (
          <motion.div
            className="mp-wrap"
            initial={{ opacity: 0, scale: 0.6, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <button
              className={`mp-btn${playing ? ' mp-btn--playing' : ''}`}
              onClick={toggle}
              aria-label={playing ? 'Pause music' : 'Play music'}
              title={playing ? 'Pause music' : 'Play wedding music'}
            >
              {/* Vinyl disc rings */}
              {playing && (
                <>
                  <span className="mp-ring mp-ring1" />
                  <span className="mp-ring mp-ring2" />
                  <span className="mp-ring mp-ring3" />
                </>
              )}
              <span className="mp-icon">{playing ? '🎵' : '🎶'}</span>
            </button>
            <span className="mp-label">{playing ? 'Playing…' : 'Music'}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
