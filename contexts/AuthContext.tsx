"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  full_name?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo
const mockUsers = [
  { id: "1", email: "demo@ciptahospital.com", password: "demo123", full_name: "Demo User" },
  { id: "2", email: "patient@example.com", password: "patient123", full_name: "John Doe" },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("cipta-hospital-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    const mockUser = mockUsers.find((u) => u.email === email && u.password === password)

    if (mockUser) {
      const userData = { id: mockUser.id, email: mockUser.email, full_name: mockUser.full_name }
      setUser(userData)
      localStorage.setItem("cipta-hospital-user", JSON.stringify(userData))
      return { error: null }
    } else {
      return { error: { message: "Email atau password salah" } }
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      return { error: { message: "Email sudah terdaftar" } }
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      full_name: fullName,
    }

    mockUsers.push(newUser)
    const userData = { id: newUser.id, email: newUser.email, full_name: newUser.full_name }
    setUser(userData)
    localStorage.setItem("cipta-hospital-user", JSON.stringify(userData))

    return { error: null }
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem("cipta-hospital-user")
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
