'use client'

import { motion } from 'framer-motion'

const values = [
  {
    title: 'Slow Craft',
    text: 'Each piece is built in small runs with intentional pacing and no rush to scale.',
  },
  {
    title: 'Natural Materials',
    text: 'We work with clay, oak, cotton, and mineral finishes chosen for age and character.',
  },
  {
    title: 'Everyday Ritual',
    text: 'Our forms are designed to be used daily and to feel better over time.',
  },
]

const milestones = [
  { year: '2019', label: 'Studio founded' },
  { year: '2021', label: 'First seasonal collection' },
  { year: '2024', label: 'International shipping' },
]

export function AboutPage() {
  return (
    <div className="bg-[var(--bg)]">
      <section className="px-6 md:px-12 pt-36 pb-20">
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
              About The Studio
            </p>
            <h1
              style={{ fontFamily: 'var(--font-amarante)' }}
              className="text-[15vw] sm:text-[11vw] lg:text-[8vw] leading-[0.82] text-[var(--black)]"
            >
              Built By
              <br />
              Hand
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5 text-lg md:text-2xl text-[var(--dark-grey)] leading-relaxed max-w-md"
            style={{ fontFamily: 'var(--font-abel)' }}
          >
            HS Crafters is a small studio focused on tactile objects that bring calm and intention to everyday spaces.
          </motion.p>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-7">
          {values.map((value, index) => (
            <motion.article
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="rounded-[2rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-8"
            >
              <h2
                style={{ fontFamily: 'var(--font-amarante)' }}
                className="text-4xl text-[var(--black)] mb-4"
              >
                {value.title}
              </h2>
              <p
                style={{ fontFamily: 'var(--font-abel)' }}
                className="text-[var(--dark-grey)] leading-relaxed"
              >
                {value.text}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto rounded-[2.8rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-8 md:p-14"
        >
          <h3
            style={{ fontFamily: 'var(--font-amarante)' }}
            className="text-4xl md:text-6xl text-[var(--black)] leading-[0.95] mb-10"
          >
            Timeline
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {milestones.map((item, index) => (
              <div
                key={item.year}
                className="border-t border-[var(--secondary-bg)] pt-5"
              >
                <p
                  style={{ fontFamily: 'var(--font-roboto)' }}
                  className="text-[10px] uppercase tracking-[0.35em] text-[var(--dark-grey)] mb-3"
                >
                  Milestone 0{index + 1}
                </p>
                <p
                  style={{ fontFamily: 'var(--font-amarante)' }}
                  className="text-4xl text-[var(--black)] mb-2"
                >
                  {item.year}
                </p>
                <p
                  style={{ fontFamily: 'var(--font-abel)' }}
                  className="text-[var(--dark-grey)]"
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}
