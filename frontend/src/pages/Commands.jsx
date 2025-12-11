import React, { useState, useEffect } from 'react'
import api from '../api/client'

export default function Commands(){
  const [cmd, setCmd] = useState('')
  const [history, setHistory] = useState([])
  const [msg, setMsg] = useState(null)

  const load = () => api.get('/commands').then(r=>setHistory(r.data)).catch(()=>{})
  useEffect(()=>{load()}, [])

  const submit = async () => {
    setMsg(null)
    try{
      const res = await api.post('/commands', { command_text: cmd })
      setMsg('Submitted: ' + res.data.status)
      setCmd('')
      load()
    }catch(e){
      setMsg(e.response?.data?.detail || 'Error')
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Submit Command</h2>
      <div className="mt-3 card">
        <textarea value={cmd} onChange={e=>setCmd(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md" rows={3} />
        <div className="mt-3 flex gap-2">
          <button className="btn" onClick={submit}>Submit</button>
          <button className="btn-ghost" onClick={()=>setCmd('')}>Clear</button>
        </div>
        {msg && <div className="mt-2 text-gray-300">{msg}</div>}
      </div>

      <section className="mt-6">
        <h3 className="text-lg font-medium">History</h3>
        <div className="mt-3 grid gap-2">
          {history.map(h => (
            <div key={h.id} className="card flex justify-between">
              <div>
                <div className="font-medium">{h.command_text}</div>
                <div className="text-sm text-gray-400">{h.status}</div>
              </div>
              <div className="text-sm">{h.cost}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
