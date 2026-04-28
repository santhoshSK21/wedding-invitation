import { motion } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"
import "./VenueMap.css"

const LOCATION_URL =
  "https://maps.google.com/?q=Sri+Annamalaiyar+Thirumana+Mahal,Sri+Gopalapuram+VK+Mills,Chinna+kalayamuthur,Palani,Tamil+Nadu+624615"

export default function VenueMap() {
  return (
    <section className="vm-section">
      <motion.div
        className="vm-inner"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <p className="vm-eyebrow">Find Us</p>
        <h2 className="vm-title">Venue &amp; Location</h2>
        <div className="vm-divider">
          <span className="vm-line" />
          <span className="vm-diamond">◆</span>
          <span className="vm-line" />
        </div>

        <div className="vm-content">
          {/* Venue info */}
          <motion.div
            className="vm-info"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="vm-info-icon">🏛️</div>
            <h3 className="vm-venue-name">Sri Annamalaiyar Thirumana Mahal</h3>
            <p className="vm-venue-addr">
              Sri Gopalapuram VK Mills,<br />
              Chinna Kalayamuthur, near Bus stop,<br />
              Palani, Tamil Nadu 624615
            </p>
            <div className="vm-details">
              <span className="vm-detail"><span>📅</span> June 23–24, 2026</span>
              <span className="vm-detail"><span>🕕</span> Reception: 6:00 PM · Muhurtham: 6:00 AM</span>
            </div>
            <a
              href={LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="vm-directions-btn"
            >
              Get Directions →
            </a>
          </motion.div>

          {/* QR code */}
          <motion.div
            className="vm-qr"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="vm-qr-label">Scan to open in Maps</p>
            <a href={LOCATION_URL} target="_blank" rel="noopener noreferrer" className="vm-qr-link">
              <div className="vm-qr-frame">
                <QRCodeSVG
                  value={LOCATION_URL}
                  size={160}
                  bgColor="#ffffff"
                  fgColor="#4C1D95"
                  level="H"
                  imageSettings={{ src: "", excavate: false }}
                />
              </div>
            </a>
            <p className="vm-qr-sub">Palani 624615</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
