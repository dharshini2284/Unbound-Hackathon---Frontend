import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, AuthContext } from './context/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Commands from './pages/Commands'
import Rules from './pages/Rules'
import Audit from './pages/Audit'
import Users from './pages/Users'
import Navbar from './components/Navbar'

function PrivateRoute({ children }){
  const { user, loading } = useContext(AuthContext)
  if (loading) return <div className="p-6">Loading...</div>
  return user ? children : <Navigate to="/login" />
}

export default function App(){
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="p-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/commands" element={<PrivateRoute><Commands /></PrivateRoute>} />
            <Route path="/rules" element={<PrivateRoute><Rules /></PrivateRoute>} />
            <Route path="/audit" element={<PrivateRoute><Audit /></PrivateRoute>} />
            <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}
