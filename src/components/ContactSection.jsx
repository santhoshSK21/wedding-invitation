import { motion } from 'framer-motion'
import './ContactSection.css'

const contacts = [
  {
    role: 'Groom',
    name: 'Sarathkumar',
    phone: '+91 87546 55313',
    whatsapp: '918754655313',
    icon: '🤵',
  },
  {
    role: 'Bride',
    name: 'Karthikasree',
    phone: '+91 95859 89600',
    whatsapp: '919585989600',
    icon: '👰',
  }
]

function ContactCard({ contact, index }) {
  const waMsg = encodeURIComponent(
    `Hello ${contact.name}! I'm reaching out regarding the wedding of Sarathkumar & Karthikasree on June 23–24, 2026.`
  )
  return (
    <motion.div
      className="cs-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      <div className="cs-avatar">{contact.icon}</div>
      <p className="cs-role">{contact.role}</p>
      <h3 className="cs-name">{contact.name}</h3>
      <p className="cs-phone">{contact.phone}</p>
      <div className="cs-actions">
        <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="cs-btn cs-btn--call">
          📞 Call
        </a>
        <a
          href={`https://wa.me/${contact.whatsapp}?text=${waMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="cs-btn cs-btn--wa"
        >
          💬 WhatsApp
        </a>
      </div>
    </motion.div>
  )
}

export default function ContactSection() {
  return (
    <section className="cs-section">
      <div className="cs-bg-orb cs-orb1" />
      <div className="cs-bg-orb cs-orb2" />

      <motion.div
        className="cs-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="cs-eyebrow">☎️ Get in Touch</p>
        <h2 className="cs-title">Contact Us</h2>
        <div className="cs-divider">
          <span className="cs-line" />
          <span className="cs-diamond">◆</span>
          <span className="cs-line" />
        </div>
        <p className="cs-subtitle">We'd love to hear from you</p>
      </motion.div>

      <div className="cs-grid">
        {contacts.map((c, i) => (
          <ContactCard key={i} contact={c} index={i} />
        ))}
      </div>
    </section>
  )
}
