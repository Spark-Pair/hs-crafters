// components/Hero.jsx
'use client'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export function Hero() {
  const container = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // 1. Mouse Tracking for subtle movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start']
  })

  // 2. Smooth Springs for Scroll (adds "weight" to the animation)
  const smoothYMid = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), { stiffness: 100, damping: 30 })
  const smoothYFast = useSpring(useTransform(scrollYProgress, [0, 1], [0, -400]), { stiffness: 100, damping: 30 })
  const skew = useTransform(scrollYProgress, [0, 0.5], [0, 10]) // Images skew slightly as you scroll

  // Variants for Staggered Text
  const titleVariant = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section ref={container} className="relative h-[120vh] w-full bg-[var(--bg)] overflow-hidden flex items-center justify-center cursor-default">
      
      {/* 3. Noise Overlay (The "Film Grain" Studio Effect) */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 4. Background Typography - Interactive Move */}
      <motion.div 
        style={{ x: mousePos.x * -1.5, y: mousePos.y * -1.5 }}
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
      >
        <h2 
          style={{ fontFamily: 'var(--font-amarante)' }} 
          className="text-[28vw] text-[var(--secondary-bg)] leading-none whitespace-nowrap opacity-60"
        >
          HANDMADE
        </h2>
      </motion.div>

      {/* 5. Main Narrative Image - Skew and Clip Path */}
      <motion.div 
        style={{ y: smoothYMid, skewY: skew, x: mousePos.x * 0.2 }}
        initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.2 }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
        transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
        className="absolute left-[8%] top-[15%] w-[32vw] h-[45vw] max-h-[700px] z-10 group"
      >
        <div className="w-full h-full overflow-hidden rounded-[3rem]">
            <motion.img 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=2000" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              alt="Artisan"
            />
        </div>
      </motion.div>

      {/* 6. Centered Identity - Interactive Button */}
      <div className="relative z-20 md:ml-[15vw]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <motion.p 
            variants={titleVariant}
            style={{ fontFamily: 'var(--font-roboto)', x: mousePos.x * 0.3 }} 
            className="text-[var(--dark-grey)] uppercase tracking-[1em] text-[11px] mb-6 flex items-center gap-4"
          >
            <span className="w-8 h-[1px] bg-[var(--dark-grey)]" /> Aura of Crafts
          </motion.p>
          
          <motion.h1 
            variants={titleVariant}
            style={{ fontFamily: 'var(--font-amarante)' }} 
            className="text-[10vw] md:text-[12vw] text-[var(--black)] leading-[0.75] mb-8"
          >
            HS <br /> <span className='ml-[8vw] italic'>Crafters</span>
          </motion.h1>
          
          <div className="flex items-center gap-12 ml-2">
             {/* Magnetic Circle Button */}
             <motion.div 
               whileHover={{ scale: 1.15, x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
               transition={{ type: "spring", stiffness: 150, damping: 15 }}
               className="relative w-20 h-20 rounded-full border border-[var(--dark-grey)] flex items-center justify-center cursor-pointer overflow-hidden group"
             >
                <motion.div 
                    initial={{ y: "100%" }}
                    whileHover={{ y: "0%" }}
                    className="absolute inset-0 bg-[var(--black)]"
                />
                <div className="z-10 w-2 h-2 bg-[var(--black)] rounded-full transition-colors duration-300" />
             </motion.div>

             <p style={{ fontFamily: 'var(--font-abel)' }} className="text-sm max-w-[220px] text-[var(--dark-grey)] leading-snug italic">
               Where raw earth meets the <br/> precision of human touch.
             </p>
          </div>
        </motion.div>
      </div>

      {/* 7. Secondary Image - High Speed Parallax */}
      <motion.div 
        style={{ y: smoothYFast, x: mousePos.x * -0.4, rotate: 12 }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="absolute right-[10%] bottom-[15%] w-[20vw] h-[20vw] z-30 hidden lg:block"
      >
        <motion.div 
            whileHover={{ rotate: 5, scale: 1.05 }}
            className="w-full h-full p-6 bg-[var(--light-secondary-bg)] rounded-[2.5rem] shadow-[20px_40px_80px_rgba(0,0,0,0.1)] border border-white/50 backdrop-blur-sm"
        >
            <img 
              src="https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=1000" 
              className="w-full h-full object-cover rounded-2xl" 
              alt="Detail"
            />
        </motion.div>
      </motion.div>

    </section>
  )
}