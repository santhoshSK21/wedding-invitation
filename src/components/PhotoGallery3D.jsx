import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import './PhotoGallery3D.css'

const GALLERY_ITEMS = [
  {
    icon: '💍',
    label: 'The Ring',
    sub: 'A symbol of eternity',
    gradient: 'linear-gradient(145deg, #4C1D95 0%, #7C3AED 55%, #A78BFA 100%)',
    floatDuration: 3.2,
    floatDelay: 0,
  },
  {
    icon: '🌹',
    label: 'First Bloom',
    sub: 'Where it all began',
    gradient: 'linear-gradient(145deg, #3730a3 0%, #6D28D9 60%, #C4B5FD 100%)',
    floatDuration: 3.8,
    floatDelay: 0.4,
  },
  {
    icon: '🕊️',
    label: 'Our Promise',
    sub: 'Till the end of time',
    gradient: 'linear-gradient(145deg, #5B21B6 0%, #8B5CF6 60%, #EDE9FE 100%)',
    floatDuration: 3.5,
    floatDelay: 0.8,
  },
  {
    icon: '💒',
    label: 'The Chapel',
    sub: 'Sacred beginnings',
    gradient: 'linear-gradient(145deg, #4C1D95 0%, #7C3AED 50%, #DDD6FE 100%)',
    floatDuration: 4.0,
    floatDelay: 0.2,
  },
  {
    icon: '🥂',
    label: 'Celebration',
    sub: 'Joy shared together',
    gradient: 'linear-gradient(145deg, #6D28D9 0%, #A78BFA 60%, #C4B5FD 100%)',
    floatDuration: 3.6,
    floatDelay: 0.6,
  },
  {
    icon: '❤️',
    label: 'Forever',
    sub: 'Always & always',
    gradient: 'linear-gradient(145deg, #1E0A3C 0%, #4C1D95 45%, #A78BFA 100%)',
    floatDuration: 3.3,
    floatDelay: 1.0,
  },
]

function Card3D({ item, index }) {
  const [hovered, setHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springCfg = { stiffness: 280, damping: 28 }
  const rotateX = useSpring(useTransform(y, [-120, 120], [18, -18]), springCfg)
  const rotateY = useSpring(useTransform(x, [-120, 120], [-18, 18]), springCfg)
  const scale    = useSpring(hovered ? 1.06 : 1, { stiffness: 260, damping: 24 })

  function onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width  / 2)
    y.set(e.clientY - rect.top  - rect.height / 2)
  }
  function onMouseLeave() {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      className="pg3d-wrapper"
      initial={{ opacity: 0, y: 80, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* floating idle */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{
          duration: item.floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: item.floatDelay,
        }}
      >
        {/* 3D tilt layer */}
        <motion.div
          className="pg3d-tilt"
          style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
          onMouseMove={onMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={onMouseLeave}
        >
          {/* card face */}
          <div className="pg3d-frame" style={{ background: item.gradient }}>

            {/* corner flourishes */}
            <span className="pg3d-corner pg3d-tl" />
            <span className="pg3d-corner pg3d-tr" />
            <span className="pg3d-corner pg3d-bl" />
            <span className="pg3d-corner pg3d-br" />

            {/* shine sweep */}
            <div className={`pg3d-shine${hovered ? ' pg3d-shine--active' : ''}`} />

            {/* floating content (extra depth via translateZ) */}
            <div className="pg3d-content">
              <motion.span
                className="pg3d-icon"
                animate={hovered ? { scale: [1, 1.3, 1.1], rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.6 }}
              >
                {item.icon}
              </motion.span>

              <p className="pg3d-label">{item.label}</p>
              <p className="pg3d-sub">{item.sub}</p>

              <motion.div
                className="pg3d-badge"
                initial={{ opacity: 0, y: 10 }}
                animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                ✦ {index + 1} / {GALLERY_ITEMS.length} ✦
              </motion.div>
            </div>

            {/* outer glow ring when hovered */}
            {hovered && (
              <motion.div
                className="pg3d-glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>

          {/* 3D side edge (depth illusion) */}
          <div className="pg3d-edge-bottom" />
          <div className="pg3d-edge-right" />
        </motion.div>

        {/* soft drop shadow */}
        <div className={`pg3d-shadow${hovered ? ' pg3d-shadow--hover' : ''}`} />
      </motion.div>
    </motion.div>
  )
}

export default function PhotoGallery3D() {
  return (
    <section className="pg3d-section">
      {/* decorative bg circles */}
      <div className="pg3d-bg-orb pg3d-orb1" />
      <div className="pg3d-bg-orb pg3d-orb2" />

      <motion.div
        className="pg3d-header"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85 }}
      >
        <p className="pg3d-eyebrow">✦ Our Gallery ✦</p>
        <h2 className="pg3d-title">Moments We Cherish</h2>
        <div className="pg3d-divider">
          <span className="pg3d-line" />
          <span className="pg3d-diamond">◆</span>
          <span className="pg3d-line" />
        </div>
        <p className="pg3d-subtitle">Hover over each card to feel the magic</p>
      </motion.div>

      <div className="pg3d-grid">
        {GALLERY_ITEMS.map((item, i) => (
          <Card3D key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
