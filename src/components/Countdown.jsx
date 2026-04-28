import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Countdown.css'

const WEDDING_DATE = new Date('2026-06-24T16:00:00')

function useCountdown(target) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const diff = target - new Date()
      if (diff <= 0) return setT({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      setT({
        days:    Math.floor(diff / 864e5),
        hours:   Math.floor((diff / 36e5) % 24),
        minutes: Math.floor((diff / 6e4) % 60),
        seconds: Math.floor((diff / 1e3) % 60),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  return t
}

function Block({ value, label, delay }) {
  const pad = String(value).padStart(2, '0')
  return (
    <motion.div
      className="cd-block"
      initial={{ opacity: 0, scale: 0.75 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay }}
    >
      <div className="cd-digits">
        <span className="cd-digit">{pad[0]}</span>
        <span className="cd-digit">{pad[1]}</span>
      </div>
      <p className="cd-label">{label}</p>
    </motion.div>
  )
}

export default function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE)

  return (
    <section className="cd-section">
      {/* pulsing rings */}
      <div className="cd-rings" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="cd-ring" style={{ '--i': i }} />
        ))}
      </div>

      <motion.div
        className="cd-inner"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85 }}
      >
        <p className="cd-eyebrow">Counting down to</p>
        <h2 className="cd-title">Our Special Day</h2>
        <p className="cd-subtitle">June 24, 2026 &mdash; 4 : 00 PM</p>

        <div className="cd-grid">
          <Block value={days}    label="Days"    delay={0}    />
          <span className="cd-sep">:</span>
          <Block value={hours}   label="Hours"   delay={0.1}  />
          <span className="cd-sep">:</span>
          <Block value={minutes} label="Minutes" delay={0.2}  />
          <span className="cd-sep">:</span>
          <Block value={seconds} label="Seconds" delay={0.3}  />
        </div>
      </motion.div>
    </section>
  )
}
