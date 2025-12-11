import React, { useEffect, useState } from 'react'
import api from '../api/client'

export default function Audit(){
  const [logs, setLogs] = useState([])
  useEffect(()=>{ api.get('/audit').then(r=>setLogs(r.data)).catch(()=>{}) }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold">Audit Log</h2>
      <div className="mt-3 grid gap-2">
        {logs.map(l => (
          <div key={l.id} className="card">
            <div className="text-sm text-gray-400">{new Date(l.created_at).toLocaleString()} • user:{l.user_id ?? 'system'} • {l.event}</div>
            <div className="mt-1">{l.details}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
