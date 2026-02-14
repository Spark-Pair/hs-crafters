'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const items = [
  { title: "Ceramics", category: "Earth & Fire", img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1000" },
  { title: "Woodwork", category: "Ancient Grain", img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1000" },
  { title: "Textiles", category: "Soft Precision", img: "https://images.unsplash.com/photo-1610505466020-058597376045?q=80&w=1000" }
]

function FeaturedCard({ item, index }) {
  const cardRef = useRef(null)
  
  // Create a subtle parallax effect for the image inside the container
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"])

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      className="group cursor-pointer relative"
    >
      {/* Image Container with Parallax */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--secondary-bg)] aspect-[4/5] md:aspect-[3/4]">
        <motion.img 
          style={{ scale: 1.2, y }} 
          src={item.img} 
          className="w-full h-full object-cover transition-filter duration-700 grayscale-[0.5] group-hover:grayscale-0" 
          alt={item.title} 
        />
        
        {/* Overlay Label (Appears on Hover) */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <motion.span 
            className="px-6 py-2 border border-white text-white rounded-full backdrop-blur-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
            style={{ fontFamily: 'var(--font-abel)' }}
          >
            Explore Collection
          </motion.span>
        </div>
      </div>

      {/* Typography Section */}
      <div className="mt-8 flex justify-between items-start">
        <div>
          <h4 style={{ fontFamily: 'var(--font-amarante)' }} className="text-3xl text-[var(--black)] leading-tight">
            {item.title}
          </h4>
          <p style={{ fontFamily: 'var(--font-roboto)' }} className="text-[var(--dark-grey)] text-[10px] uppercase tracking-[0.3em] mt-1">
            {item.category}
          </p>
        </div>
        <span className="text-[var(--dark-grey)] opacity-30 text-2xl font-serif">0{index + 1}</span>
      </div>
    </motion.div>
  )
}

export function Featured() {
  return (
    <section className="pb-40 px-6 md:px-12 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section with better hierarchy */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-6">
          <div className="max-w-xl">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ fontFamily: 'var(--font-roboto)' }} 
              className="text-[var(--dark-grey)] uppercase tracking-[0.6em] text-[10px] mb-4"
            >
              Curated Collections
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontFamily: 'var(--font-amarante)' }} 
              className="text-6xl md:text-7xl text-[var(--black)] leading-none"
            >
              The Essentials
            </motion.h2>
          </div>
          
          <motion.button 
            whileHover={{ x: 5 }}
            style={{ fontFamily: 'var(--font-abel)' }} 
            className="text-[var(--dark-grey)] border-b border-[var(--dark-grey)/30] pb-2 text-sm uppercase tracking-widest hover:text-[var(--black)] hover:border-[var(--black)] transition-all flex items-center gap-4"
          >
            View All Collections <span>→</span>
          </motion.button>
        </div>

        {/* Grid with staggered layout feel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
          {items.map((item, i) => (
            <FeaturedCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}