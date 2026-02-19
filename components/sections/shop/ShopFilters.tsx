'use client'

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

type ShopFiltersProps = {
  categories: string[]
  activeCategory: string
  searchTerm: string
  onCategoryChange: (category: string) => void
  onSearchChange: (value: string) => void
}

export function ShopFilters({
  categories,
  activeCategory,
  searchTerm,
  onCategoryChange,
  onSearchChange,
}: ShopFiltersProps) {
  return (
    <section className="px-6 md:px-12 mt-10 mb-6">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="relative w-full">
          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--dark-grey)]/70"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search products..."
            className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] text-[var(--black)] placeholder:text-[var(--dark-grey)]/70 pl-14 pr-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dark-grey)]/20"
            style={{ fontFamily: 'var(--font-abel)' }}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => onCategoryChange(category)}
              className={`rounded-full px-6 py-3 text-xs uppercase tracking-[0.25em] border transition-colors ${
                activeCategory === category
                  ? 'bg-[var(--black)] text-[var(--bg)] border-[var(--black)]'
                  : 'border-[var(--secondary-bg)] text-[var(--dark-grey)] hover:border-[var(--dark-grey)] hover:text-[var(--black)]'
              }`}
              style={{ fontFamily: 'var(--font-roboto)' }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
