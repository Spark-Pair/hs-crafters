'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronDown, User } from 'lucide-react'
import { useState } from 'react'

import { useAuth } from './providers/AuthProvider'

type ProfileMenuProps = {
  variant?: 'user' | 'admin'
}

export function ProfileMenu({ variant = 'user' }: ProfileMenuProps) {
  const router = useRouter()
  const { isHydrated, isLoggedIn, user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  if (!isHydrated) {
    return null
  }

  if (!isLoggedIn || !user) {
    if (variant === 'admin') return null
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-2 rounded-full bg-[var(--black)] text-[var(--bg)] px-5 py-3 text-xs uppercase tracking-[0.2em]"
        style={{ fontFamily: 'var(--font-roboto)' }}
      >
        Login
      </Link>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] text-[var(--dark-grey)] px-4 py-2"
      >
        <User size={16} />
        <span style={{ fontFamily: 'var(--font-abel)' }} className="text-sm">
          {user.name}
        </span>
        <ChevronDown size={14} />
      </button>

      {open ? (
        <div className="absolute right-0 mt-2 w-72 rounded-3xl border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-4 shadow-xl">
          <p
            style={{ fontFamily: 'var(--font-roboto)' }}
            className="text-[10px] uppercase tracking-[0.25em] text-[var(--dark-grey)]"
          >
            Signed in as
          </p>
          <p style={{ fontFamily: 'var(--font-amarante)' }} className="text-3xl text-[var(--black)] mt-1">
            {user.name}
          </p>
          <p style={{ fontFamily: 'var(--font-abel)' }} className="text-[var(--dark-grey)] text-sm">
            {user.email}
          </p>

          <div className="mt-4 space-y-2">
            {variant === 'admin' ? (
              <button
                onClick={() => {
                  setOpen(false)
                  router.push('/home')
                }}
                className="w-full rounded-full border border-[var(--secondary-bg)] px-4 py-2 text-left text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)] hover:text-[var(--black)]"
              >
                Go to Website
              </button>
            ) : null}

            {variant === 'user' && user.isAdmin ? (
              <button
                onClick={() => {
                  setOpen(false)
                  router.push('/admin/dashboard')
                }}
                className="w-full rounded-full border border-[var(--secondary-bg)] px-4 py-2 text-left text-xs uppercase tracking-[0.2em] text-[var(--dark-grey)] hover:text-[var(--black)]"
              >
                Admin Panel
              </button>
            ) : null}

            <button
              onClick={() => {
                logout()
                setOpen(false)
                router.push('/home')
              }}
              className="w-full rounded-full bg-[var(--black)] text-[var(--bg)] px-4 py-2 text-xs uppercase tracking-[0.2em]"
            >
              Logout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
