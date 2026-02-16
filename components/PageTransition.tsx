'use client'

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const stackVariants = {
    // Incoming page: Drops from above, scales down from 1.1 to 1
    initial: { 
      opacity: 0, 
      y: "-100%", 
      scale: 1.1,
      filter: "blur(10px)" 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 0.9, 
        ease: [0.16, 1, 0.3, 1] // Custom Expo Out ease
      }
    },
    // Outgoing page: Falls downward, scales down to 0.9
    exit: { 
      opacity: 0, 
      y: "100%", 
      scale: 0.9,
      filter: "blur(10px)",
      transition: { 
        duration: 0.7, 
        ease: [0.76, 0, 0.24, 1] 
      }
    }
  }

  return (
    <motion.div
      key={pathname}
      variants={stackVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen bg-[var(--bg)] origin-center"
      style={{ position: 'relative' }}
    >
      {children}
    </motion.div>
  )
}