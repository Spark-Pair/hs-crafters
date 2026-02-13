'use client'

import Sidebar from '@/components/Sidebar'
import BottomNav from '@/components/BottomNav'
import Hero from '@/components/Hero'
import NextSection from '@/components/NextSection'
import Lenis from "lenis"
import { useEffect } from "react"

export default function Page() {

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: false })
  
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
  
    requestAnimationFrame(raf)
  
    return () => lenis.destroy()
  }, [])  

  return (
    <div className="min-h-screen bg-stone-50">
      <Sidebar />

      <main>
        <Hero />
        <NextSection />
      </main>

    <BottomNav />
    </div>
  )
}
