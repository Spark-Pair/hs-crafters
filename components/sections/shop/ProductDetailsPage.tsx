'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import type { Product } from './data'
import { useCart } from '@/components/providers/CartProvider'

type ProductDetailsPageProps = {
  product: Product
}

export function ProductDetailsPage({ product }: ProductDetailsPageProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [added, setAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const selectedImage = useMemo(
    () => product.images[activeImage] ?? product.image,
    [activeImage, product.image, product.images],
  )

  return (
    <div className="bg-[var(--bg)] px-6 md:px-12 pt-36 pb-24">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-[var(--dark-grey)] hover:text-[var(--black)] mb-8 transition-colors"
          style={{ fontFamily: 'var(--font-roboto)' }}
        >
          <ArrowLeft size={16} />
          <span className="text-xs uppercase tracking-[0.25em]">Back to Shop</span>
        </Link>

        <div className="grid lg:grid-cols-12 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="rounded-[2.5rem] overflow-hidden bg-[var(--secondary-bg)] aspect-[4/5]">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`rounded-[1.2rem] overflow-hidden border transition ${
                    activeImage === index
                      ? 'border-[var(--black)]'
                      : 'border-[var(--secondary-bg)]'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-28 object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <p
              style={{ fontFamily: 'var(--font-roboto)' }}
              className="text-[10px] uppercase tracking-[0.35em] text-[var(--dark-grey)] mb-3"
            >
              {product.category}
            </p>
            <h1
              style={{ fontFamily: 'var(--font-amarante)' }}
              className="text-5xl md:text-6xl leading-[0.95] text-[var(--black)]"
            >
              {product.name}
            </h1>
            <p
              style={{ fontFamily: 'var(--font-abel)' }}
              className="text-3xl text-[var(--black)] mt-6"
            >
              {product.price}
            </p>

            <p
              style={{ fontFamily: 'var(--font-abel)' }}
              className="text-[var(--dark-grey)] text-lg leading-relaxed mt-8"
            >
              {product.description}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <div className="inline-flex items-center border border-[var(--secondary-bg)] rounded-full overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-10 h-10 text-[var(--dark-grey)] hover:text-[var(--black)] transition-colors"
                >
                  -
                </button>
                <span
                  className="w-10 text-center text-[var(--black)]"
                  style={{ fontFamily: 'var(--font-abel)' }}
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-10 h-10 text-[var(--dark-grey)] hover:text-[var(--black)] transition-colors"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  addItem(product, quantity)
                  setAdded(true)
                }}
                className="rounded-full bg-[var(--black)] text-[var(--bg)] px-8 py-4 uppercase tracking-[0.2em] text-xs"
                style={{ fontFamily: 'var(--font-roboto)' }}
              >
                {added ? `Added ${quantity}` : 'Add to Cart'}
              </button>
            </div>

            <div className="mt-10 space-y-8">
              <div>
                <h2
                  style={{ fontFamily: 'var(--font-roboto)' }}
                  className="text-[10px] uppercase tracking-[0.35em] text-[var(--dark-grey)] mb-3"
                >
                  Details
                </h2>
                <ul className="space-y-2">
                  {product.details.map((detail) => (
                    <li
                      key={detail}
                      className="text-[var(--dark-grey)]"
                      style={{ fontFamily: 'var(--font-abel)' }}
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                <InfoBlock label="Materials" value={product.materials} />
                <InfoBlock label="Dimensions" value={product.dimensions} />
                <InfoBlock label="Care" value={product.care} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.4rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-4">
      <p
        style={{ fontFamily: 'var(--font-roboto)' }}
        className="text-[10px] uppercase tracking-[0.25em] text-[var(--dark-grey)] mb-2"
      >
        {label}
      </p>
      <p style={{ fontFamily: 'var(--font-abel)' }} className="text-[var(--black)]">
        {value}
      </p>
    </div>
  )
}
