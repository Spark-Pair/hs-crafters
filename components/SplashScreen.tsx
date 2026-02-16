'use client'

import { motion } from "framer-motion"

export default function SplashScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--bg)]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-3xl font-bold text-[var(--text)]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        HS Crafters
      </motion.h1>
    </motion.div>
  )
}
