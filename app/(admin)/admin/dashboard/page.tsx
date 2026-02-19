'use client'

import { motion } from 'framer-motion'

import {
  initialCategories,
  initialOrders,
  initialProducts,
} from '@/components/sections/admin/mockData'

const stats = [
  { label: 'Categories', value: initialCategories.length },
  { label: 'Products', value: initialProducts.length },
  { label: 'Orders', value: initialOrders.length },
  {
    label: 'Pending Orders',
    value: initialOrders.filter((order) => order.status === 'pending').length,
  },
]

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1
        style={{ fontFamily: 'var(--font-amarante)' }}
        className="text-5xl md:text-6xl text-[var(--black)] mb-8"
      >
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <motion.article
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="rounded-[1.6rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-6"
          >
            <p
              style={{ fontFamily: 'var(--font-roboto)' }}
              className="text-[10px] uppercase tracking-[0.25em] text-[var(--dark-grey)] mb-3"
            >
              {stat.label}
            </p>
            <p
              style={{ fontFamily: 'var(--font-amarante)' }}
              className="text-5xl text-[var(--black)]"
            >
              {stat.value}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
