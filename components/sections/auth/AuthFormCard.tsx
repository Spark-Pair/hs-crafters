'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'

import { useAuth } from '@/components/providers/AuthProvider'

type Mode = 'login' | 'signup'

export function AuthFormCard({ mode }: { mode: Mode }) {
  const router = useRouter()
  const { login, signup } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const title = mode === 'login' ? 'Welcome Back' : 'Create Account'
  const submitText = mode === 'login' ? 'Login' : 'Sign Up'
  const alternateText = mode === 'login' ? "Don't have an account?" : 'Already have an account?'
  const alternateHref = mode === 'login' ? '/signup' : '/login'
  const alternateCta = mode === 'login' ? 'Sign up' : 'Login'

  return (
    <div className="px-6 py-12 md:py-20 min-h-screen flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl mx-auto rounded-[2.5rem] border border-[var(--secondary-bg)] bg-[var(--light-secondary-bg)] p-8 md:p-12"
      >
        <p
          style={{ fontFamily: 'var(--font-roboto)' }}
          className="text-[10px] uppercase tracking-[0.5em] text-[var(--dark-grey)] mb-4"
        >
          HS Crafters
        </p>
        <h1
          style={{ fontFamily: 'var(--font-amarante)' }}
          className="text-5xl md:text-6xl text-[var(--black)] leading-[0.95] mb-8"
        >
          {title}
        </h1>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
            setError('')

            if (mode === 'login') {
              const result = login(email, password)
              if (!result.success) {
                setError(result.message ?? 'Unable to login.')
                return
              }
              router.push('/home')
              return
            }

            if (!name.trim()) {
              setError('Name is required.')
              return
            }
            if (password !== confirmPassword) {
              setError('Passwords do not match.')
              return
            }

            const result = signup({ name, email, password })
            if (!result.success) {
              setError(result.message ?? 'Unable to sign up.')
              return
            }

            router.push('/home')
          }}
        >
          {mode === 'signup' ? (
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="Full name"
              className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-5 py-4 text-[var(--black)] placeholder:text-[var(--dark-grey)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--dark-grey)]/20"
              style={{ fontFamily: 'var(--font-abel)' }}
            />
          ) : null}

          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Email address"
            className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-5 py-4 text-[var(--black)] placeholder:text-[var(--dark-grey)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--dark-grey)]/20"
            style={{ fontFamily: 'var(--font-abel)' }}
          />

          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-5 py-4 text-[var(--black)] placeholder:text-[var(--dark-grey)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--dark-grey)]/20"
            style={{ fontFamily: 'var(--font-abel)' }}
          />

          {mode === 'signup' ? (
            <input
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              type="password"
              placeholder="Confirm password"
              className="w-full rounded-full border border-[var(--secondary-bg)] bg-[var(--bg)] px-5 py-4 text-[var(--black)] placeholder:text-[var(--dark-grey)]/70 focus:outline-none focus:ring-2 focus:ring-[var(--dark-grey)]/20"
              style={{ fontFamily: 'var(--font-abel)' }}
            />
          ) : null}

          {error ? (
            <p style={{ fontFamily: 'var(--font-abel)' }} className="text-sm text-red-600">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-full bg-[var(--black)] text-[var(--bg)] px-8 py-4 uppercase tracking-[0.2em] text-xs mt-3"
            style={{ fontFamily: 'var(--font-roboto)' }}
          >
            {submitText}
          </button>
        </form>

        <p
          style={{ fontFamily: 'var(--font-abel)' }}
          className="text-[var(--dark-grey)] mt-6 text-sm"
        >
          {alternateText}{' '}
          <Link href={alternateHref} className="text-[var(--black)] underline underline-offset-2">
            {alternateCta}
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
