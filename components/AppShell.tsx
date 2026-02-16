'use client'

import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import SplashScreen from "./SplashScreen"
import PageTransition from "./PageTransition"

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("splashShown")

    if (alreadyShown) {
      setShowSplash(false)
      return
    }

    sessionStorage.setItem("splashShown", "true")

    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 20000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen />}
      </AnimatePresence>

      {!showSplash && <PageTransition>{children}</PageTransition>}
    </>
  )
}
