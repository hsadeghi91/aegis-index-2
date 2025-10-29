'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

export type AuthUser = {
  email: string
}

type AuthContextValue = {
  isAuthenticated: boolean
  user: AuthUser | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const AUTH_STORAGE_KEY = 'aegis_auth_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(AUTH_STORAGE_KEY) : null
      if (raw) {
        const parsed = JSON.parse(raw) as AuthUser
        setUser(parsed)
      }
    } catch {}
  }, [])

  const isAuthenticated = !!user

  const persistUser = useCallback((u: AuthUser | null) => {
    if (typeof window === 'undefined') return
    if (u) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u))
    } else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [])

  const signIn = useCallback(async (email: string, _password: string) => {
    // Placeholder: accept any credentials
    const u = { email }
    setUser(u)
    persistUser(u)
    router.push('/dashboard')
  }, [persistUser, router])

  const signUp = useCallback(async (email: string, _password: string) => {
    const u = { email }
    setUser(u)
    persistUser(u)
    router.push('/dashboard')
  }, [persistUser, router])

  const signOut = useCallback(() => {
    setUser(null)
    persistUser(null)
    router.push('/signin')
  }, [persistUser, router])

  const value = useMemo<AuthContextValue>(() => ({
    isAuthenticated,
    user,
    signIn,
    signUp,
    signOut,
  }), [isAuthenticated, user, signIn, signUp, signOut])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


