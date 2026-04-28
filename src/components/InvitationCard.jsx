import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import './InvitationCard.css'

const LOCATION_URL = 'https://maps.google.com/?q=Sri+Annamalaiyar+Thirumana+Mahal,Sri+Gopalapuram+VK+Mills,Chinna+kalayamuthur,Palani,Tamil+Nadu+624615'

function Detail({ icon, label, value, delay }) {
  return (
    <motion.div
      className="detail-item"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <span className="detail-icon">{icon}</span>
      <div>
        <p className="detail-label">{label}</p>
        <p className="detail-value">{value}</p>
      </div>
    </motion.div>
  )
}

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
            <p className="inv-preamble">Together with their families</p>

            <h2 className="inv-names">
              Karthikasree
              <span className="inv-amp"> &amp; </span>
              Sarathkumar
            </h2>

            <div className="inv-ornament">— ✦ —</div>

            <p className="inv-verse">
              joyfully invite you to celebrate<br />
              the beginning of their forever
            </p>

            <div className="inv-grid">
              <Detail icon="📅" label="Reception" value="Tuesday, June 23, 2026 · 6:00 PM" delay={0.05} />
              <Detail icon="💍" label="Engagement" value="June 23, 2026 · 9:30 PM" delay={0.12} />
              <Detail icon="🌸" label="Muhurtham"  value="Wednesday, June 24, 2026 · 6:00 PM" delay={0.19} />
              <Detail icon="🏛️" label="Venue"    value="Sri Annamalaiyar Thirumana Mahal" delay={0.26} />
              <Detail icon="📍" label="Address"  value="Sri Gopalapuram VK Mills, Chinna Kalayamuthur, near Bus stop, Palani, Tamil Nadu 624615" delay={0.33} />
            </div>

            {/* QR Code for Location */}
            <motion.div
              className="inv-qr-section"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
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
                    imageSettings={{
                      src: '',
                      excavate: false,
                    }}
                  />
                </div>
              </a>
              <p className="inv-qr-sub">Sri Annamalaiyar Thirumana Mahal · Palani 624615</p>
            </motion.div>

            <div className="inv-monogram">
              <span>S</span>
              <span className="mono-heart">♥</span>
              <span>K</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
