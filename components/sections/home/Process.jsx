'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function Process() {
  const container = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  })

  // Subtle horizontal slide for the background text
  const xMove = useTransform(scrollYProgress, [0, 1], [0, -150])

  return (
    <section ref={container} className="py-40 bg-[var(--bg)] relative overflow-hidden">
      
      {/* Decorative Background Text */}
      <motion.div 
        style={{ x: xMove }}
        className="absolute top-20 left-0 whitespace-nowrap opacity-[0.03] select-none pointer-events-none"
      >
        <span className="text-[25vw] font-serif uppercase tracking-tighter">
          The Process • The Process • The Process
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        <div className="grid md:grid-cols-12 gap-12">
          
          {/* Left Side: Large Minimalist Headline */}
          <div className="md:col-span-7">
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-amarante)' }} 
              className="text-6xl md:text-8xl text-[var(--black)] leading-[0.9] tracking-tight"
            >
              Listening to <br />
              <span className="italic ml-[10%] opacity-80">the Grain.</span>
            </motion.h2>
          </div>

          {/* Right Side: Detailed Narrative & Stats */}
          <div className="md:col-span-5 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <p style={{ fontFamily: 'var(--font-abel)' }} className="text-2xl text-[var(--dark-grey)] leading-relaxed mb-12">
                "We don't force shapes. We listen to the grain of the oak and the temper of the clay. Each piece is born from a slow, deliberate conversation between human hands and raw earth."
              </p>

              {/* Minimal Stats Row */}
              <div className="grid grid-cols-2 gap-8 py-8 border-t border-[var(--dark-grey)]/20">
                <div>
                  <h4 className="text-3xl font-light text-[var(--black)]">100%</h4>
                  <p style={{ fontFamily: 'var(--font-roboto)' }} className="text-[10px] uppercase tracking-[0.3em] mt-2 opacity-60">Organic Materials</p>
                </div>
                <div>
                  <h4 className="text-3xl font-light text-[var(--black)]">24hr+</h4>
                  <p style={{ fontFamily: 'var(--font-roboto)' }} className="text-[10px] uppercase tracking-[0.3em] mt-2 opacity-60">Curing Time</p>
                </div>
              </div>

              {/* Interactive Text Link */}
              <motion.button
                className="mt-8 flex items-center gap-4 transition-all hover:gap-8 text-xs uppercase tracking-[0.5em] font-bold group"
              >
                <span>Read Story</span>
                <span className="h-[1px] w-12 bg-[var(--black)] transition-all group-hover:w-24" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}