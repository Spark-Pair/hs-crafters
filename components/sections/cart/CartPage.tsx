'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Trash2 } from 'lucide-react'

import { useCart } from '@/components/providers/CartProvider'
import { useAuth } from '@/components/providers/AuthProvider'

export function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart()
  const { user } = useAuth()
  const shipping = items.length > 0 ? 12 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="bg-[var(--bg)] px-6 md:px-12 pt-36 pb-24">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-[var(--dark-grey)] hover:text-[var(--black)] mb-8 transition-colors"
          style={{ fontFamily: 'var(--font-roboto)' }}
        >
          <ArrowLeft size={16} />
          <span className="text-xs uppercase tracking-[0.25em]">Continue Shopping</span>
        </Link>

        <div className="grid lg:grid-cols-12 gap-8">
          <section className="lg:col-span-8 rounded-[2.5rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-6 md:p-10">
            <div className="flex items-center justify-between mb-8">
              <h1
                style={{ fontFamily: 'var(--font-amarante)' }}
                className="text-5xl text-[var(--black)]"
              >
                Cart
              </h1>
              {items.length > 0 ? (
                <button
                  onClick={clearCart}
                  className="text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)] hover:text-[var(--black)]"
                  style={{ fontFamily: 'var(--font-roboto)' }}
                >
                  Clear Cart
                </button>
              ) : null}
            </div>

            {items.length === 0 ? (
              <p
                style={{ fontFamily: 'var(--font-abel)' }}
                className="text-[var(--dark-grey)] text-lg"
              >
                Your cart is empty.
              </p>
            ) : (
              <div className="space-y-5">
                {items.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-[1.8rem] border border-[var(--secondary-bg)] bg-[var(--bg)] p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full md:w-28 h-36 md:h-28 object-cover rounded-[1.2rem]"
                    />
                    <div className="flex-1">
                      <h2
                        style={{ fontFamily: 'var(--font-amarante)' }}
                        className="text-3xl text-[var(--black)]"
                      >
                        {item.name}
                      </h2>
                      <p
                        style={{ fontFamily: 'var(--font-abel)' }}
                        className="text-[var(--dark-grey)]"
                      >
                        {item.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center border border-[var(--secondary-bg)] rounded-full overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 text-[var(--dark-grey)] hover:text-[var(--black)] transition-colors"
                        >
                          -
                        </button>
                        <span
                          className="w-10 text-center text-[var(--black)]"
                          style={{ fontFamily: 'var(--font-abel)' }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 text-[var(--dark-grey)] hover:text-[var(--black)] transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-[var(--dark-grey)] hover:text-[var(--black)]"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </section>

          <aside className="lg:col-span-4 rounded-[2.5rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-6 md:p-8 h-fit">
            <h3
              style={{ fontFamily: 'var(--font-amarante)' }}
              className="text-4xl text-[var(--black)] mb-8"
            >
              Summary
            </h3>

            <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <SummaryRow label="Shipping" value={`$${shipping.toFixed(2)}`} />
            <SummaryRow label="Tax" value={`$${tax.toFixed(2)}`} />

            <div className="mt-5 pt-5 border-t border-[var(--secondary-bg)] flex items-center justify-between">
              <p
                style={{ fontFamily: 'var(--font-roboto)' }}
                className="text-xs uppercase tracking-[0.25em] text-[var(--dark-grey)]"
              >
                Total
              </p>
              <p
                style={{ fontFamily: 'var(--font-amarante)' }}
                className="text-4xl text-[var(--black)]"
              >
                ${total.toFixed(2)}
              </p>
            </div>

            <button
              disabled={items.length === 0}
              onClick={async () => {
                if (items.length === 0) return
                const payload = {
                  customer: user?.name ?? 'Guest',
                  customerEmail: user?.email ?? '',
                  amount: Number(total.toFixed(2)),
                  status: 'pending',
                  items: items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    price: item.unitPrice,
                    quantity: item.quantity,
                  })),
                }
                const response = await fetch('/api/orders', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload),
                })
                if (response.ok) {
                  clearCart()
                }
              }}
              className="mt-8 w-full rounded-full bg-[var(--black)] text-[var(--bg)] px-8 py-4 uppercase tracking-[0.2em] text-xs disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-roboto)' }}
            >
              Checkout
            </button>
          </aside>
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <p style={{ fontFamily: 'var(--font-abel)' }} className="text-[var(--dark-grey)]">
        {label}
      </p>
      <p style={{ fontFamily: 'var(--font-abel)' }} className="text-[var(--black)]">
        {value}
      </p>
    </div>
  )
}
