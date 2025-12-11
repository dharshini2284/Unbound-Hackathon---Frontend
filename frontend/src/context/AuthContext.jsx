import React, { createContext, useState, useEffect } from 'react'
import api from '../api/client'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const key = localStorage.getItem('apiKey')
    if (key) {
      api.get('/me').then(res => {
        setUser(res.data)
      }).catch(() => {
        localStorage.removeItem('apiKey')
        setUser(null)
      }).finally(()=>setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (apiKey) => {
    localStorage.setItem('apiKey', apiKey)
    const res = await api.get('/me')
    setUser(res.data)
  }

  const logout = () => {
    localStorage.removeItem('apiKey')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
