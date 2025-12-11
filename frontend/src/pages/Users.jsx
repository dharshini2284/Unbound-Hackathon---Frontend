import React, { useEffect, useState } from 'react'
import api from '../api/client'

export default function Users(){
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('member')
  const [newKey, setNewKey] = useState(null)

  const load = () => api.get('/users').then(r=>setUsers(r.data)).catch(()=>{})
  useEffect(()=>{load()}, [])

  const create = async () => {
    try{
      const res = await api.post('/users/create_with_key', { username, role })
      setNewKey(res.data.api_key)
      setUsername(''); setRole('member')
      load()
    }catch(e){
      alert(e.response?.data?.detail || 'Error')
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Users</h2>
      <div className="mt-3 card">
        <div className="grid md:grid-cols-3 gap-2">
          <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" />
          <select value={role} onChange={e=>setRole(e.target.value)}>
            <option value="member">member</option>
            <option value="admin">admin</option>
          </select>
          <div />
        </div>
        <div className="mt-3 flex gap-2">
          <button className="btn" onClick={create}>Create User</button>
        </div>
        {newKey && (
          <div className="mt-3">
            <div className="text-sm text-gray-300">New API Key (copy and save now):</div>
            <div className="mt-2 p-2 bg-gray-800 rounded-md text-sm">{newKey}</div>
          </div>
        )}
      </div>

      <section className="mt-6">
        <h3 className="text-lg font-medium">Existing Users</h3>
        <div className="mt-3 grid gap-2">
          {users.map(u => (
            <div key={u.id} className="card flex justify-between items-center">
              <div>
                <div className="font-medium">{u.username}</div>
                <div className="text-sm text-gray-400">{u.role}</div>
              </div>
              <div className="text-sm text-gray-300">{u.credits} cr</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
