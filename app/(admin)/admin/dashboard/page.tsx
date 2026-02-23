'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import type { Category, Order, Product } from '@/lib/types'

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const run = async () => {
      const [categoriesRes, productsRes, ordersRes] = await Promise.all([
        fetch('/api/categories', { cache: 'no-store' }),
        fetch('/api/products', { cache: 'no-store' }),
        fetch('/api/orders', { cache: 'no-store' }),
      ])
      if (categoriesRes.ok) setCategories((await categoriesRes.json()) as Category[])
      if (productsRes.ok) setProducts((await productsRes.json()) as Product[])
      if (ordersRes.ok) setOrders((await ordersRes.json()) as Order[])
    }
    run()
  }, [])

  const stats = useMemo(
    () => [
      { label: 'Categories', value: categories.length },
      { label: 'Products', value: products.length },
      { label: 'Orders', value: orders.length },
      {
        label: 'Pending Orders',
        value: orders.filter((order) => order.status === 'pending').length,
      },
    ],
    [categories.length, orders, products.length],
  )

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
