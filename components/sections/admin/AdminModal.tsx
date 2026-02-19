'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

type AdminModalProps = {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
  accentClassName?: string
}

export function AdminModal({
  open,
  title,
  onClose,
  children,
  accentClassName = '',
}: AdminModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/45 p-4 md:p-8 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className={`w-full max-w-2xl rounded-[2rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-6 md:p-8 shadow-2xl ${accentClassName}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontFamily: 'var(--font-amarante)' }} className="text-4xl text-[var(--black)]">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-[var(--secondary-bg)] inline-flex items-center justify-center text-[var(--dark-grey)] hover:text-[var(--black)]"
                style={{ fontFamily: 'var(--font-roboto)' }}
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
