'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type AuthUser = {
  name: string
  email: string
  isAdmin: boolean
}

type StoredUser = AuthUser & {
  password: string
}

type AuthResult = {
  success: boolean
  message?: string
}

type AuthContextValue = {
  user: AuthUser | null
  isHydrated: boolean
  isLoggedIn: boolean
  login: (email: string, password: string) => AuthResult
  signup: (payload: { name: string; email: string; password: string }) => AuthResult
  logout: () => void
}

const STORAGE_KEY = 'hs_crafters_auth_user'
const USERS_STORAGE_KEY = 'hs_crafters_auth_users'
const DEFAULT_ADMIN: StoredUser = {
  name: 'Admin User',
  email: 'admin@hscrafters.art',
  password: 'admin123',
  isAdmin: true,
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [users, setUsers] = useState<StoredUser[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const rawUsers = localStorage.getItem(USERS_STORAGE_KEY)
      if (!rawUsers) {
        setUsers([DEFAULT_ADMIN])
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([DEFAULT_ADMIN]))
      } else {
        const parsed = JSON.parse(rawUsers) as StoredUser[]
        if (!parsed.some((entry) => entry.email === DEFAULT_ADMIN.email)) {
          const merged = [...parsed, DEFAULT_ADMIN]
          setUsers(merged)
          localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(merged))
        } else {
          setUsers(parsed)
        }
      }

      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setUser(JSON.parse(raw))
      }
    } catch {
      setUser(null)
    } finally {
      setIsHydrated(true)
    }
  }, [])

  const persist = useCallback((nextUser: AuthUser | null) => {
    setUser(nextUser)
    if (nextUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
      return
    }
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const login = useCallback(
    (email: string, password: string): AuthResult => {
      const normalizedEmail = email.trim().toLowerCase()
      const found = users.find(
        (entry) =>
          entry.email.toLowerCase() === normalizedEmail && entry.password === password,
      )

      if (!found) {
        return { success: false, message: 'Invalid email or password.' }
      }

      persist({ name: found.name, email: found.email, isAdmin: found.isAdmin })
      return { success: true }
    },
    [persist, users],
  )

  const signup = useCallback(
    (payload: { name: string; email: string; password: string }): AuthResult => {
      const normalizedEmail = payload.email.trim().toLowerCase()
      if (users.some((entry) => entry.email.toLowerCase() === normalizedEmail)) {
        return { success: false, message: 'Email already exists.' }
      }

      const newUser: StoredUser = {
        name: payload.name.trim(),
        email: normalizedEmail,
        password: payload.password,
        isAdmin: false,
      }

      const nextUsers = [...users, newUser]
      setUsers(nextUsers)
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(nextUsers))
      persist({ name: newUser.name, email: newUser.email, isAdmin: newUser.isAdmin })
      return { success: true }
    },
    [persist, users],
  )

  const logout = useCallback(() => {
    persist(null)
  }, [persist])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isHydrated,
      isLoggedIn: !!user,
      login,
      signup,
      logout,
    }),
    [isHydrated, login, logout, signup, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
