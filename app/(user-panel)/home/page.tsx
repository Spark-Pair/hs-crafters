'use client'

import { Hero } from "@/components/sections/home/Hero"
import { Featured } from "@/components/sections/home/Featured"
import { Process } from "@/components/sections/home/Process"
import { useEffect } from "react"

export default function Page() {
  return (
    <>
      <Hero />
      <Featured />
      <Process />
    </>
  )
}
