'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

type SlidingFilterButtonsProps = {
  options: string[]
  value: string
  onChange: (value: string) => void
}

export function SlidingFilterButtons({
  options,
  value,
  onChange,
}: SlidingFilterButtonsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [pill, setPill] = useState({ left: 0, width: 0, height: 0 })

  const activeIndex = Math.max(
    0,
    options.findIndex((item) => item === value),
  )

  const updatePill = () => {
    const activeEl = itemRefs.current[activeIndex]
    const containerEl = containerRef.current
    if (!activeEl || !containerEl) return
    const activeRect = activeEl.getBoundingClientRect()
    const containerRect = containerEl.getBoundingClientRect()
    setPill({
      left: activeRect.left - containerRect.left,
      width: activeRect.width,
      height: activeRect.height,
    })
  }

  useLayoutEffect(() => {
    updatePill()
  }, [activeIndex, options.length])

  useEffect(() => {
    window.addEventListener('resize', updatePill)
    return () => window.removeEventListener('resize', updatePill)
  }, [activeIndex])

  return (
    <div
      ref={containerRef}
      className="relative inline-flex flex-wrap gap-2 rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] p-2"
    >
      <motion.div
        animate={{
          x: pill.left,
          width: pill.width,
          height: pill.height,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        className="absolute rounded-full bg-[var(--black)]"
      />
      {options.map((option, index) => (
        <button
          key={option}
          ref={(node) => {
            itemRefs.current[index] = node
          }}
          onClick={() => onChange(option)}
          className={`relative z-10 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.2em] ${
            option === value ? 'text-white' : 'text-[var(--dark-grey)]'
          }`}
          style={{ fontFamily: 'var(--font-roboto)' }}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
