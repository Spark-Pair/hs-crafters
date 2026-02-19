'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import { categories, products } from './data'
import { ProductCard } from './ProductCard'
import { ShopFilters } from './ShopFilters'

export function ShopCatalog() {
  const [activeCategory, setActiveCategory] = useState('All Pieces')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'All Pieces' || product.category === activeCategory
      const matchesSearch =
        query.length === 0 ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchTerm])

  return (
    <div className="bg-[var(--bg)]">
      <section className="px-6 md:px-12 mt-28">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto rounded-[2.8rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-8 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
        >
          <div>
            <p
              style={{ fontFamily: 'var(--font-roboto)' }}
              className="uppercase tracking-[0.5em] text-[10px] text-[var(--dark-grey)] mb-4"
            >
              Studio Drops
            </p>
            <h3
              style={{ fontFamily: 'var(--font-amarante)' }}
              className="text-4xl md:text-6xl text-[var(--black)] leading-[0.95]"
            >
              New pieces every month.
            </h3>
          </div>

          <button
            style={{ fontFamily: 'var(--font-abel)' }}
            className="rounded-full border border-[var(--dark-grey)] text-[var(--dark-grey)] hover:text-[var(--black)] hover:border-[var(--black)] px-8 py-4 uppercase tracking-[0.2em] text-xs transition-colors"
          >
            Join Waitlist
          </button>
        </motion.div>
      </section>

      <ShopFilters
        categories={categories}
        activeCategory={activeCategory}
        searchTerm={searchTerm}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchTerm}
      />

      <section className="px-6 md:px-12 pb-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="max-w-7xl mx-auto mt-14 rounded-[2rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-8 text-center">
            <p
              style={{ fontFamily: 'var(--font-abel)' }}
              className="text-[var(--dark-grey)] text-lg"
            >
              No products found for this search.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  )
}
