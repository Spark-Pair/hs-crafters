'use client'

import { AdminModal } from './AdminModal'

type ConfirmDialogProps = {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AdminModal open={open} title={title} onClose={onCancel}>
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
          className="rounded-full bg-[var(--black)] text-[var(--bg)] px-6 py-3 text-xs uppercase tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-roboto)' }}
        >
          {confirmLabel}
        </button>
      </div>
    </AdminModal>
  )
}
