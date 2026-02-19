'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

import type { Product } from './data'

type ProductCardProps = {
  product: Product
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <Link href={`/shop/${product.id}`} className="block">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: index * 0.06 }}
        className="group"
      >
        <div className="relative rounded-[2.2rem] overflow-hidden bg-[var(--secondary-bg)] aspect-[4/5]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover grayscale-[0.35] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-70" />
        </div>

        <div className="pt-6 flex items-start justify-between gap-4">
          <div>
            <p
              style={{ fontFamily: 'var(--font-roboto)' }}
              className="text-[10px] uppercase tracking-[0.35em] text-[var(--dark-grey)] mb-2"
            >
              {product.category}
            </p>
            <h2
              style={{ fontFamily: 'var(--font-amarante)' }}
              className="text-3xl leading-tight text-[var(--black)]"
            >
              {product.name}
            </h2>
          </div>
          <p
            style={{ fontFamily: 'var(--font-abel)' }}
            className="text-xl text-[var(--black)] pt-1"
          >
            {product.price}
          </p>
        </div>
      </motion.article>
    </Link>
  )
}
