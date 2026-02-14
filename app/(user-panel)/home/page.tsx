'use client'

import { Hero } from "@/components/sections/home/Hero"
import { Featured } from "@/components/sections/home/Featured"
import { Process } from "@/components/sections/home/Process"
import Lenis from "lenis"
import { useEffect } from "react"

export default function Page() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: false })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      <Hero />
      <Featured />
      <Process />
    </>
  )
}
