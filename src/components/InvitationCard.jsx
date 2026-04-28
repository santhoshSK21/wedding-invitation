import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import './InvitationCard.css'

const LOCATION_URL = 'https://maps.google.com/?q=Sri+Annamalaiyar+Thirumana+Mahal,Sri+Gopalapuram+VK+Mills,Chinna+kalayamuthur,Palani,Tamil+Nadu+624615'

export default function InvitationCard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="invitation" className="inv-section" ref={ref}>
      {/* Corner flourishes */}
      <span className="flourish fl-tl">❧</span>
      <span className="flourish fl-tr">❧</span>
      <span className="flourish fl-bl">❧</span>
      <span className="flourish fl-br">❧</span>

      <motion.div
        className="inv-card"
        initial={{ opacity: 0, y: 70, rotateX: 6 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inv-border">
          <div className="inv-body">

            {/* ── Header ── */}
            <p className="inv-preamble">With the blessings of God &amp; our beloved parents</p>

            <h2 className="inv-names">
              Sarathkumar
              <span className="inv-amp"> &amp; </span>
              Karthikasree
            </h2>

            <div className="inv-ornament">— ✦ —</div>

            <p className="inv-verse">
              joyfully invite you to celebrate<br />
              the auspicious occasion of their wedding
            </p>

            {/* ── Venue ── */}
            <motion.div className="inv-venue-block"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="inv-venue-name">Sri Annamalaiyar Thirumana Mahal</p>
              <p className="inv-venue-addr">Sri Gopalapuram VK Mills, Chinna Kalayamuthur,<br />near Bus stop, Palani, Tamil Nadu 624615</p>
            </motion.div>

            <div className="inv-section-divider" aria-hidden>❧ ✦ ❧</div>

            {/* ── Reception ── */}
            <motion.div className="inv-event-block"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.15 }}
            >
              <p className="inv-event-tag">Reception</p>
              <h3 className="inv-event-title">Evening Reception &amp; Engagement</h3>
              <p className="inv-event-body">
                We cordially invite you to join us for an evening of joy and celebration
                as we announce the engagement of our beloved children. Your presence
                will make this evening truly memorable.
              </p>
              <div className="inv-event-details">
                <span className="inv-event-detail"><span className="inv-event-icon">📅</span> Tuesday, June 23, 2026</span>
                <span className="inv-event-sep">·</span>
                <span className="inv-event-detail"><span className="inv-event-icon">🕕</span> Reception: 6:00 PM onwards</span>
                <span className="inv-event-sep">·</span>
                <span className="inv-event-detail"><span className="inv-event-icon">💍</span> Engagement: 9:30 PM</span>
              </div>
            </motion.div>

            <div className="inv-event-divider" aria-hidden />

            {/* ── Muhurtham ── */}
            <motion.div className="inv-event-block"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.25 }}
            >
              <p className="inv-event-tag inv-event-tag--gold">Muhurtham</p>
              <h3 className="inv-event-title">Wedding Ceremony</h3>
              <p className="inv-event-body">
                We humbly request the honour of your presence at the sacred wedding
                ceremony of our children. May your blessings and good wishes make
                this divine union a joyous and everlasting one.
              </p>
              <div className="inv-event-details">
                <span className="inv-event-detail"><span className="inv-event-icon">📅</span> Wednesday, June 24, 2026</span>
                <span className="inv-event-sep">·</span>
                <span className="inv-event-detail"><span className="inv-event-icon">🌅</span> Muhurtham: 6:00 AM</span>
              </div>
            </motion.div>

            <div className="inv-section-divider" aria-hidden>❧ ✦ ❧</div>

            

            {/* ── Monogram ── */}
            <div className="inv-monogram">
              <span>S</span>
              <span className="mono-heart">♥</span>
              <span>K</span>
            </div>

            <div className="inv-section-divider" aria-hidden>❧ ✦ ❧</div>

            {/* ── QR Code — end of card ── */}
            <motion.div
              className="inv-qr-section"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <p className="inv-qr-label">📍 Scan to find the venue</p>
              <a href={LOCATION_URL} target="_blank" rel="noopener noreferrer" className="inv-qr-link">
                <div className="inv-qr-frame">
                  <QRCodeSVG
                    value={LOCATION_URL}
                    size={130}
                    bgColor="#ffffff"
                    fgColor="#4C1D95"
                    level="H"
                    imageSettings={{ src: '', excavate: false }}
                  />
                </div>
              </a>
              <p className="inv-qr-sub">Sri Annamalaiyar Thirumana Mahal · Palani 624615</p>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  )
}
