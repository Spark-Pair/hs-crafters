'use client'

import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import SplashScreen from "./SplashScreen"
import PageTransition from "./PageTransition"

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return true
    return !sessionStorage.getItem("splashShown")
  })

  useEffect(() => {
    if (!showSplash) return

    sessionStorage.setItem("splashShown", "true")

    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [showSplash])

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen />}
      </AnimatePresence>

      {!showSplash && <PageTransition>{children}</PageTransition>}
    </>
  )
}
