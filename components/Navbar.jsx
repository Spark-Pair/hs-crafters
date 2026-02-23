'use client'
import { motion } from 'framer-motion'
import { Home, Folder, Phone, Info, LayoutGrid } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from "next/navigation"
import { ProfileMenu } from './ProfileMenu'

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const [activeIndex, setActiveIndex] = useState(0)
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, height: 0 })

  const containerRef = useRef(null)
  const itemRefs = useRef([])
  const navItems = [
    { icon: <Home size={18} />, label: 'Home', href: "/home" },
    { icon: <LayoutGrid size={18} />, label: 'Categories', href: "/categories" },
    { icon: <Folder size={18} />, label: 'Shop', href: "/shop" },
    { icon: <Phone size={18} />, label: 'Contact', href: "/contact" },
    { icon: <Info size={18} />, label: 'About', href: "/about" },
  ]

  // set active based on URL
  useEffect(() => {
    const index = navItems.findIndex(
      (item) => pathname === item.href || pathname?.startsWith(`${item.href}/`)
    )
    if (index !== -1) setActiveIndex(index)
  }, [pathname])

  const updatePill = () => {
    const activeEl = itemRefs.current[activeIndex]
    const containerEl = containerRef.current

    if (!activeEl || !containerEl) return

    const activeRect = activeEl.getBoundingClientRect()
    const containerRect = containerEl.getBoundingClientRect()

    setPillStyle({
      left: activeRect.left - containerRect.left,
      width: activeRect.width,
      height: activeRect.height,
    })
  }

  useLayoutEffect(() => {
    updatePill()
  }, [activeIndex])

  useEffect(() => {
    window.addEventListener("resize", updatePill)
    return () => window.removeEventListener("resize", updatePill)
  }, [activeIndex])

  return (
    <>
      <div className="fixed top-8 left-0 w-full flex justify-center z-50 px-6">
        <div className="bg-[var(--light-secondary-bg)]/60 backdrop-blur-xl rounded-full border border-[var(--secondary-bg)] relative p-2">
          <motion.nav
            ref={containerRef}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2 relative"
          >
            <motion.div
              animate={{
                x: pillStyle.left,
                width: pillStyle.width,
                height: pillStyle.height,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute rounded-full bg-[var(--secondary-bg)]"
            />

            {navItems.map((item, i) => (
              <button
                key={i}
                ref={(el) => (itemRefs.current[i] = el)}
                onClick={() => router.push(item.href)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-[var(--dark-grey)] transition-colors group relative z-10"
              >
                {item.icon}
                <span
                  style={{ fontFamily: 'var(--font-roboto)' }}
                  className="text-[10px] uppercase tracking-widest font-medium whitespace-nowrap"
                >
                  {item.label}
                </span>
              </button>
            ))}
          </motion.nav>
        </div>
      </div>
      <div className="fixed top-8 right-6 z-[60]">
        <ProfileMenu variant="user" />
      </div>
    </>
  )
}
