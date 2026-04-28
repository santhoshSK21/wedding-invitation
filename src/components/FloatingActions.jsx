import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import './FloatingActions.css'

/* ── Save-the-date: generates and downloads an .ics file ── */
function downloadICS() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Karthikasree & Sarathkumar Wedding//EN',
    'BEGIN:VEVENT',
    'DTSTART:20260623T120000Z',
    'DTEND:20260624T020000Z',
    'SUMMARY:Karthikasree & Sarathkumar Wedding',
    'DESCRIPTION:Wedding Reception (Jun 23, 6PM) • Engagement (Jun 23, 9:30PM) • Muhurtham (Jun 24, 6AM)',
    'LOCATION:Sri Annamalaiyar Thirumana Mahal, Sri Gopalapuram VK Mills, Chinna Kalayamuthur, Palani, Tamil Nadu 624615',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = 'karthikasree-sarathkumar-wedding.ics'
  a.click()
  URL.revokeObjectURL(url)
}

/* ── WhatsApp invite share ───────────────────────────────── */
function shareWhatsApp() {
  const text = encodeURIComponent(
    '💍 *You\'re Invited!*\n\n' +
    '🌸 *Karthikasree & Sarathkumar*\n\n' +
    '📅 *Reception:* June 23, 2026 · 6:00 PM\n' +
    '💍 *Engagement:* June 23, 2026 · 9:30 PM\n' +
    '🌸 *Muhurtham:* June 24, 2026 · 6:00 AM\n\n' +
    '📍 Sri Annamalaiyar Thirumana Mahal, Palani, Tamil Nadu\n\n' +
    'Join us to celebrate the beginning of their forever! ✨'
  )
  window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer')
}

/* ── Invite QR modal ─────────────────────────────────────── */
const INVITE_URL = typeof window !== 'undefined' ? window.location.href : 'https://wedding-invite.app'

export default function FloatingActions({ darkMode, onToggleDark }) {
  const [open, setOpen]      = useState(false)
  const [qrOpen, setQrOpen]  = useState(false)
  const [saved, setSaved]    = useState(false)

  // close QR on Escape
  useEffect(() => {
    if (!qrOpen) return
    const handler = (e) => { if (e.key === 'Escape') setQrOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [qrOpen])

  function handleSave() {
    downloadICS()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const actions = [
    { label: 'Dark / Light', icon: darkMode ? '☀️' : '🌙', onClick: onToggleDark },
    { label: 'WhatsApp Share', icon: '💬', onClick: shareWhatsApp },
    { label: saved ? 'Saved! ✓' : 'Save the Date', icon: '📅', onClick: handleSave },
    { label: 'QR Invite', icon: '🔗', onClick: () => setQrOpen(true) },
  ]

  return (
    <>
      {/* FAB cluster — bottom-right */}
      <div className="fa-cluster">
        <AnimatePresence>
          {open && actions.map((a, i) => (
            <motion.button
              key={a.label}
              className="fa-action"
              title={a.label}
              onClick={() => { a.onClick(); setOpen(false) }}
              initial={{ opacity: 0, y: 20, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.7 }}
              transition={{ duration: 0.22, delay: i * 0.05 }}
            >
              <span className="fa-action-icon">{a.icon}</span>
              <span className="fa-action-label">{a.label}</span>
            </motion.button>
          ))}
        </AnimatePresence>

        <motion.button
          className={`fa-main${open ? ' fa-main--open' : ''}`}
          onClick={() => setOpen(o => !o)}
          whileTap={{ scale: 0.9 }}
          aria-label="Wedding actions"
          title="Actions"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'block', fontSize: '1.5rem' }}
          >
            💍
          </motion.span>
        </motion.button>
      </div>

      {/* QR Invite Modal */}
      <AnimatePresence>
        {qrOpen && (
          <motion.div
            className="fa-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQrOpen(false)}
          >
            <motion.div
              className="fa-modal"
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="fa-modal-close" onClick={() => setQrOpen(false)} aria-label="Close">✕</button>
              <p className="fa-modal-eyebrow">✦ Share the Invitation ✦</p>
              <h3 className="fa-modal-title">Scan to Open</h3>
              <div className="fa-qr-frame">
                <QRCodeSVG
                  value={INVITE_URL}
                  size={180}
                  bgColor="#ffffff"
                  fgColor="#4C1D95"
                  level="H"
                />
              </div>
              <p className="fa-modal-sub">Share this QR with guests to open the invitation</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
