import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import api from '../api/client'

export default function Dashboard(){
  const { user } = useContext(AuthContext)
  const [recent, setRecent] = useState([])

  useEffect(() => {
    api.get('/commands').then(r => setRecent(r.data)).catch(()=>{})
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Welcome, {user?.username}</h1>
        <div className="text-sm text-gray-300">Credits: {user?.credits}</div>
      </div>

      <section className="mt-6">
        <h3 className="text-lg font-medium">Recent commands</h3>
        <div className="mt-3 grid gap-3">
          {recent.length === 0 && <div className="text-gray-400">No commands yet.</div>}
          {recent.map(c => (
            <div key={c.id} className="card flex justify-between items-center">
              <div>
                <div className="font-medium">{c.command_text}</div>
                <div className="text-sm text-gray-400">status: {c.status}</div>
              </div>
              <div className="text-sm text-gray-300">cost: {c.cost}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
