'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutGrid, ListOrdered, Package, Shapes } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { useAuth } from '@/components/providers/AuthProvider'
import { ProfileMenu } from '@/components/ProfileMenu'

const links = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutGrid size={18} /> },
  { href: '/admin/categories', label: 'Categories', icon: <Shapes size={18} /> },
  { href: '/admin/products', label: 'Products', icon: <Package size={18} /> },
  { href: '/admin/orders', label: 'Orders', icon: <ListOrdered size={18} /> },
]

export function AdminGuardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { isHydrated, isLoggedIn, user } = useAuth()
  const [activeIndex, setActiveIndex] = useState(0)
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, height: 0 })
  const containerRef = useRef<HTMLElement | null>(null)
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([])

  useEffect(() => {
    if (!isHydrated) return
    if (!isLoggedIn) {
      router.replace('/login')
      return
    }
    if (!user?.isAdmin) {
      router.replace('/home')
    }
  }, [isHydrated, isLoggedIn, router, user?.isAdmin])

  useEffect(() => {
    const index = links.findIndex(
      (item) => pathname === item.href || pathname?.startsWith(`${item.href}/`),
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
    window.addEventListener('resize', updatePill)
    return () => window.removeEventListener('resize', updatePill)
  }, [activeIndex])

  if (!isHydrated || !isLoggedIn || !user?.isAdmin) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6">
        <p style={{ fontFamily: 'var(--font-abel)' }} className="text-[var(--dark-grey)]">
          Checking access...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
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
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute rounded-full bg-[var(--secondary-bg)]"
            />

            {links.map((link, index) => (
              <Link
                key={link.href}
                ref={(element) => {
                  itemRefs.current[index] = element
                }}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-[var(--dark-grey)] transition-colors relative z-10"
              >
                {link.icon}
                <span
                  style={{ fontFamily: 'var(--font-roboto)' }}
                  className="text-[10px] uppercase tracking-widest font-medium whitespace-nowrap"
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </motion.nav>
        </div>
      </div>

      <div className="fixed top-8 right-6 z-[60]">
        <ProfileMenu variant="admin" />
      </div>

      <main className="px-6 py-36 md:px-10">{children}</main>
    </div>
  )
}
