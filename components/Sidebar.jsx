'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { Home, Grid, LayoutGrid, Phone, Info } from "lucide-react"
import { useEffect } from "react"

export default function Sidebar() {
  const { scrollYProgress } = useScroll()

  const width = useTransform(scrollYProgress, [0, 0.2], ["14rem", "4.5rem"], {
    clamp: true,
  })

  const borderRadius = useTransform(scrollYProgress, [0, 0.2], ["3rem", "2rem"], {
    clamp: true,
  })

  const paddingX = useTransform(scrollYProgress, [0, 0.2], ["2.25rem", "1rem"], {
    clamp: true,
  })

  const textOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0], {
    clamp: true,
  })

  const logoOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0], {
    clamp: true,
  })

  const collapsedLogoOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1], {
    clamp: true,
  })


  return (
    <motion.div
      style={{
        width,
        paddingLeft: paddingX,
        paddingRight: paddingX,
        borderTopRightRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
      }}
      className="fixed z-[99] left-0 top-10 bottom-10 bg-[var(--secondary-bg)] border-2 border-l-0 border-[var(--dark-grey)] flex flex-col overflow-hidden"
    >
      {/* Logo */}
      <div className="py-12 h-[120px] flex items-center">
        <motion.h1
          style={{ opacity: logoOpacity }}
          className="text-3xl tracking-wider font-bold text-stone-900 font-abel whitespace-nowrap"
        >
          HS Crafters
        </motion.h1>

        {/* Collapsed Logo */}
        <motion.h1
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]) }}
          className="absolute left-6 text-3xl tracking-wider font-bold text-stone-900 font-abel whitespace-nowrap"
        >
          HS
        </motion.h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mb-6 flex flex-col justify-center gap-10">
        <SidebarItem icon={<Home size={26} />} label="Home" textOpacity={textOpacity} />
        <SidebarItem icon={<Grid size={26} />} label="Categories" textOpacity={textOpacity} />
        <SidebarItem icon={<LayoutGrid size={26} />} label="Catalog" textOpacity={textOpacity} />
        <SidebarItem icon={<Phone size={26} />} label="Contact" textOpacity={textOpacity} />
        <SidebarItem icon={<Info size={26} />} label="About" textOpacity={textOpacity} />
      </nav>
    </motion.div>
  )
}

function SidebarItem({ icon, label, textOpacity }) {
  return (
    <a
      href="#"
      className="flex items-center gap-3 text-xl text-[--dark-grey] hover:text-stone-900 transition-colors"
    >
      <div className="min-w-[32px] flex justify-center">{icon}</div>

      {/* Text fades away */}
      <motion.span
        style={{ opacity: textOpacity }}
        className="whitespace-nowrap"
      >
        {label}
      </motion.span>
    </a>
  )
}
