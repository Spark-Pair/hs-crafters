'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'

export function ContactPage() {
  return (
    <div className="bg-[var(--bg)]">
      <section className="px-6 md:px-12 pt-36 pb-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <p
              style={{ fontFamily: 'var(--font-roboto)' }}
              className="uppercase tracking-[0.6em] text-[10px] text-[var(--dark-grey)] mb-5"
            >
              Contact
            </p>
            <h1
              style={{ fontFamily: 'var(--font-amarante)' }}
              className="text-[15vw] sm:text-[11vw] lg:text-[8vw] leading-[0.82] text-[var(--black)]"
            >
              Let&apos;s
              <br />
              Connect
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5 text-lg md:text-2xl text-[var(--dark-grey)] leading-relaxed max-w-md"
            style={{ fontFamily: 'var(--font-abel)' }}
          >
            Reach out for custom pieces, studio visits, or wholesale conversations.
          </motion.p>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-[2.5rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-8 md:p-12"
          >
            <h2
              style={{ fontFamily: 'var(--font-amarante)' }}
              className="text-5xl text-[var(--black)] mb-8"
            >
              Send a message
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Name"
                className="rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-5 py-4 text-[var(--black)] placeholder:text-[var(--dark-grey)]/75 focus:outline-none focus:ring-2 focus:ring-[var(--dark-grey)]/20"
                style={{ fontFamily: 'var(--font-abel)' }}
              />
              <input
                type="email"
                placeholder="Email"
                className="rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-5 py-4 text-[var(--black)] placeholder:text-[var(--dark-grey)]/75 focus:outline-none focus:ring-2 focus:ring-[var(--dark-grey)]/20"
                style={{ fontFamily: 'var(--font-abel)' }}
              />
              <input
                type="text"
                placeholder="Subject"
                className="md:col-span-2 rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-5 py-4 text-[var(--black)] placeholder:text-[var(--dark-grey)]/75 focus:outline-none focus:ring-2 focus:ring-[var(--dark-grey)]/20"
                style={{ fontFamily: 'var(--font-abel)' }}
              />
              <textarea
                placeholder="Tell us what you need..."
                className="md:col-span-2 min-h-40 rounded-[2rem] border border-[var(--secondary-bg)] bg-[var(--bg)] px-5 py-4 text-[var(--black)] placeholder:text-[var(--dark-grey)]/75 focus:outline-none focus:ring-2 focus:ring-[var(--dark-grey)]/20 resize-none"
                style={{ fontFamily: 'var(--font-abel)' }}
              />

              <button
                type="button"
                className="md:col-span-2 w-fit rounded-full bg-[var(--black)] text-[var(--bg)] px-8 py-4 uppercase tracking-[0.2em] text-xs"
                style={{ fontFamily: 'var(--font-roboto)' }}
              >
                Send Inquiry
              </button>
            </form>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 rounded-[2.5rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-8 md:p-10"
          >
            <h3
              style={{ fontFamily: 'var(--font-amarante)' }}
              className="text-4xl text-[var(--black)] mb-8"
            >
              Studio Details
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="text-[var(--dark-grey)] mt-1" size={18} />
                <div>
                  <p
                    style={{ fontFamily: 'var(--font-roboto)' }}
                    className="text-[10px] uppercase tracking-[0.35em] text-[var(--dark-grey)] mb-1"
                  >
                    Email
                  </p>
                  <p style={{ fontFamily: 'var(--font-abel)' }} className="text-[var(--black)]">
                    hello@hscrafters.art
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-[var(--dark-grey)] mt-1" size={18} />
                <div>
                  <p
                    style={{ fontFamily: 'var(--font-roboto)' }}
                    className="text-[10px] uppercase tracking-[0.35em] text-[var(--dark-grey)] mb-1"
                  >
                    Phone
                  </p>
                  <p style={{ fontFamily: 'var(--font-abel)' }} className="text-[var(--black)]">
                    +92 300 0000000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-[var(--dark-grey)] mt-1" size={18} />
                <div>
                  <p
                    style={{ fontFamily: 'var(--font-roboto)' }}
                    className="text-[10px] uppercase tracking-[0.35em] text-[var(--dark-grey)] mb-1"
                  >
                    Location
                  </p>
                  <p style={{ fontFamily: 'var(--font-abel)' }} className="text-[var(--black)]">
                    Karachi, Pakistan
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>
    </div>
  )
}
