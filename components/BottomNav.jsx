// components/BottomNav.jsx
'use client'
import { motion } from 'framer-motion'
import { ShoppingBag, ShoppingCart } from 'lucide-react'

export function BottomNav() {
  return (
    <div className="fixed bottom-10 right-10 z-50 flex items-center gap-4">
      <motion.button 
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ backgroundColor: 'var(--black)', fontFamily: 'var(--font-roboto)' }}
        className="flex items-center gap-4 pl-8 pr-6 py-4 text-white rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Shop Now</span>
        <ShoppingBag size={18} />
      </motion.button>

      <motion.button 
        whileHover={{ rotate: -15, scale: 1.1 }}
        className="p-5 bg-white text-[var(--black)] rounded-full border border-[var(--secondary-bg)] shadow-xl"
      >
        <ShoppingCart size={20} />
      </motion.button>
    </div>
  )
}