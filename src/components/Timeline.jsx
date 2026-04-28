import { motion } from 'framer-motion'
import './Timeline.css'

const days = [
  {
    date: 'Tuesday, June 23 · 2026',
    events: [
      {
        time: '6:00 PM – 9:30 PM',
        icon: '🍽️',
        title: 'Wedding Reception',
        desc: 'A joyful evening of dinner, laughter, and blessings with family and friends',
      },
      {
        time: '9:30 PM – 10:30 PM',
        icon: '💍',
        title: 'Engagement Ceremony',
        desc: 'Exchange of rings and the sacred promise that begins forever',
      },
    ],
  },
  {
    date: 'Wednesday, June 24 · 2026',
    events: [
      {
        time: '6:00 PM – 7:29 PM',
        icon: '🌸',
        title: 'Muhurtham',
        desc: 'The auspicious moment — tying of the sacred knot under the blessed stars',
      },
    ],
  },
]

export default function Timeline() {
  let globalIndex = 0
  return (
    <section className="tl-section">
      <motion.div
        className="tl-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="tl-eyebrow">Celebration Schedule</p>
        <h2 className="tl-title">Schedule of Events</h2>
        <div className="tl-divider">
          <span className="tl-line" />
          <span className="tl-diamond">◆</span>
          <span className="tl-line" />
        </div>
      </motion.div>

      {days.map((day, di) => (
        <div key={di} className="tl-day-group">
          <motion.div
            className="tl-day-label"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="tl-day-badge">{day.date}</span>
          </motion.div>

          <div className="tl-wrapper">
            <div className="tl-spine" aria-hidden />

            {day.events.map((ev) => {
              const i = globalIndex++
              return (
                <motion.div
                  key={i}
                  className={`tl-item ${i % 2 === 0 ? 'tl-left' : 'tl-right'}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -55 : 55 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                >
                  <div className="tl-card">
                    <span className="tl-event-icon">{ev.icon}</span>
                    <p className="tl-time">{ev.time}</p>
                    <h3 className="tl-event-title">{ev.title}</h3>
                    <p className="tl-event-desc">{ev.desc}</p>
                  </div>
                  <div className="tl-dot" aria-hidden>
                    <div className="tl-dot-core" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}
