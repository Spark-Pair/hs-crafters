'use client'

import { AdminModal } from './AdminModal'

type ConfirmDialogProps = {
  open: boolean
  title: string
  description: string
  intent?: 'danger' | 'success' | 'neutral'
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  intent = 'neutral',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const intentStyles = {
    danger: {
      modalAccent: 'border-red-200/80 bg-red-50/95',
      confirmButton: 'bg-red-600 text-white hover:bg-red-700',
    },
    success: {
      modalAccent: 'border-emerald-200/80 bg-emerald-50/95',
      confirmButton: 'bg-emerald-600 text-white hover:bg-emerald-700',
    },
    neutral: {
      modalAccent: '',
      confirmButton: 'bg-[var(--black)] text-[var(--bg)]',
    },
  }[intent]

  return (
    <AdminModal open={open} title={title} onClose={onCancel} accentClassName={intentStyles.modalAccent}>
      <p style={{ fontFamily: 'var(--font-abel)' }} className="text-[var(--dark-grey)] text-lg">
        {description}
      </p>
      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={onCancel}
          className="rounded-full border border-[var(--secondary-bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-roboto)' }}
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          className={`rounded-full px-6 py-3 text-xs uppercase tracking-[0.2em] transition-colors ${intentStyles.confirmButton}`}
          style={{ fontFamily: 'var(--font-roboto)' }}
        >
          {confirmLabel}
        </button>
      </div>
    </AdminModal>
  )
}
