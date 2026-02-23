'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

import type { Category } from '@/lib/types'

export function CategoriesPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const run = async () => {
      const response = await fetch('/api/categories', { cache: 'no-store' })
      if (!response.ok) return
      const data = (await response.json()) as Category[]
      setCategories(data.filter((item) => item.isActive))
    }
    run()
  }, [])

  const featured = useMemo(
    () => categories.filter((item) => item.featuredOnHome),
    [categories],
  )
  const rest = useMemo(
    () => categories.filter((item) => !item.featuredOnHome),
    [categories],
  )
  const ordered = [...featured, ...rest]

  return (
    <div className="bg-[var(--bg)] px-6 md:px-12 pt-36 pb-24">
      <div className="max-w-7xl mx-auto">
        <p
          style={{ fontFamily: 'var(--font-roboto)' }}
          className="text-[10px] uppercase tracking-[0.5em] text-[var(--dark-grey)] mb-5"
        >
          Browse Categories
        </p>
        <h1
          style={{ fontFamily: 'var(--font-amarante)' }}
          className="text-6xl md:text-7xl text-[var(--black)] leading-[0.9] mb-10"
        >
          Collections
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {ordered.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              onClick={() =>
                router.push(`/shop?category=${encodeURIComponent(category.name)}`)
              }
              className="group rounded-[2rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] overflow-hidden text-left"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2
                  style={{ fontFamily: 'var(--font-amarante)' }}
                  className="text-4xl text-[var(--black)]"
                >
                  {category.name}
                </h2>
                <p
                  style={{ fontFamily: 'var(--font-roboto)' }}
                  className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[var(--dark-grey)]"
                >
                  Tap to shop this category
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
