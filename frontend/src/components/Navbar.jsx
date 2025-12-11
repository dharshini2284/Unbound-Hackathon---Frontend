import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Navbar(){
  const { user, logout } = useContext(AuthContext)
  const nav = useNavigate()
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/80">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-semibold">Command Gateway</div>
        <nav className="hidden md:flex gap-3 text-sm">
          <Link to="/" className="text-gray-300">Dashboard</Link>
          <Link to="/commands" className="text-gray-300">Commands</Link>
          {user?.role === "admin" && (
            <>
              <Link to="/rules" className="text-gray-300">Rules</Link>
              <Link to="/users" className="text-gray-300">Users</Link>
              <Link to="/audit" className="text-gray-300">Audit</Link>
            </>
          )}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="text-sm text-gray-300">{user.username} • {user.credits} cr</div>
            <button className="btn-ghost" onClick={() => { logout(); nav('/login') }}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn">Login</Link>
        )}
      </div>
    </header>
  )
}
