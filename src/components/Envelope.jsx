import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./Envelope.css"

/* Deterministic floating particles */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left:     `${(i / 18) * 94 + 3}%`,
  top:      `${((i * 41 + 13) % 80) + 10}%`,
  delay:    `${(i * 0.45) % 7}s`,
  duration: `${4 + (i % 5) * 0.8}s`,
  size:     `${2 + (i % 3)}px`,
}))

export default function Envelope({ onOpen }) {
  const [opening, setOpening] = useState(false)

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    setTimeout(onOpen, 1800)
  }

  return (
    <motion.div
      className="el-scene"
      animate={opening ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeInOut", delay: opening ? 0.9 : 0 }}
    >
      {/* Background orbs */}
      <div className="el-orbs" aria-hidden>
        <div className="el-orb el-orb-1" />
        <div className="el-orb el-orb-2" />
        <div className="el-orb el-orb-3" />
      </div>

      {/* Particle dots */}
      <div className="el-particles" aria-hidden>
        {PARTICLES.map((p, i) => (
          <div key={i} className="el-particle"
            style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.duration, width: p.size, height: p.size }}
          />
        ))}
      </div>

      {/* Card */}
      <motion.div
        className="el-card"
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top ornament */}
        <motion.div className="el-ornament"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.0 }}
        >
          <span className="el-orn-line" />
          <span className="el-orn-icon">✦</span>
          <span className="el-orn-line" />
        </motion.div>

        {/* Eyebrow */}
        <motion.p className="el-eyebrow"
          initial={{ opacity: 0, letterSpacing: "2px" }}
          animate={{ opacity: 1, letterSpacing: "5px" }}
          transition={{ delay: 0.55, duration: 1.0 }}
        >
          Wedding Invitation
        </motion.p>

        {/* Ring icon */}
        <motion.div className="el-ring-wrap"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.65, duration: 0.9, ease: [0.34, 1.3, 0.64, 1] }}
        >
          <motion.span className="el-ring"
            animate={{ rotate: [0, 8, -8, 0], y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            💍
          </motion.span>
        </motion.div>

        {/* Names */}
        <motion.div className="el-names"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 1.0 }}
        >
          <h1 className="el-name">Sarathkumar</h1>
          <motion.span className="el-amp"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >&amp;</motion.span>
          <h1 className="el-name">Karthikasree</h1>
        </motion.div>

        {/* Divider */}
        <motion.div className="el-divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.9 }}
        >
          <span className="el-div-line" />
          <span className="el-div-diamond">◆</span>
          <span className="el-div-line" />
        </motion.div>

        {/* Date & venue */}
        <motion.div className="el-details"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.9 }}
        >
          <p className="el-date">June 23 – 24, 2026</p>
          <p className="el-venue">Sri Annamalaiyar Thirumana Mahal &nbsp;·&nbsp; Palani, Tamil Nadu</p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.85 }}
        >
          <AnimatePresence mode="wait">
            {!opening ? (
              <motion.button key="btn" className="el-btn" onClick={handleOpen}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.3 } }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
              >
                Open Invitation
              </motion.button>
            ) : (
              <motion.p key="status" className="el-status"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                ✦ &nbsp;Opening…
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div className="el-ornament"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.1, duration: 1.0 }}
        >
          <span className="el-orn-line" />
          <span className="el-orn-icon">✦</span>
          <span className="el-orn-line" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
