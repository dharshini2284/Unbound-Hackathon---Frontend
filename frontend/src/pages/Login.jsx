import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Login(){
  const { login } = useContext(AuthContext)
  const [key, setKey] = useState('')
  const [err, setErr] = useState(null)
  const nav = useNavigate()

  const submit = async () => {
    try {
      await login(key)
      nav('/')
    } catch (e) {
      setErr('Invalid API key or server unreachable')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 card">
      <h2 className="text-xl font-semibold mb-4">Login with API Key</h2>
      <input value={key} onChange={e=>setKey(e.target.value)} className="w-full p-2 rounded-md bg-gray-800 border border-gray-700" placeholder="Paste your API key here" />
      {err && <div className="text-red-400 mt-2">{err}</div>}
      <div className="mt-4 flex gap-2">
        <button className="btn" onClick={submit}>Login</button>
      </div>
      <div className="text-sm text-gray-400 mt-3">Use the admin key from backend to create member users in /users (admin only)</div>
    </div>
  )
}
