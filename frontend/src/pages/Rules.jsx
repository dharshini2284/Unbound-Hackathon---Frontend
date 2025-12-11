import React, { useEffect, useState } from 'react'
import api from '../api/client'

export default function Rules(){
  const [rules, setRules] = useState([])
  const [pattern, setPattern] = useState('')
  const [action, setAction] = useState('AUTO_ACCEPT')
  const [desc, setDesc] = useState('')
  const [warnings, setWarnings] = useState([])

  const load = () => api.get('/rules').then(r=>setRules(r.data)).catch(()=>{})
  useEffect(()=>{load()}, [])

  const create = async () => {
    try{
      const body = { pattern, action, description: desc }
      const res = await api.post('/rules', body)
      setWarnings(res.data.warnings || [])
      setPattern(''); setDesc('')
      load()
    }catch(e){
      alert(e.response?.data?.detail || 'Error')
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Rules</h2>
      <div className="mt-3 card">
        <div className="grid md:grid-cols-3 gap-2">
          <input value={pattern} onChange={e=>setPattern(e.target.value)} placeholder="regex pattern" className="p-2 bg-gray-800 rounded-md" />
          <select value={action} onChange={e=>setAction(e.target.value)} className="p-2 bg-gray-800 rounded-md">
            <option>AUTO_ACCEPT</option>
            <option>AUTO_REJECT</option>
          </select>
          <div />
        </div>
        <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="description" className="mt-2 p-2 bg-gray-800 rounded-md w-full" />
        <div className="mt-3 flex gap-2">
          <button className="btn" onClick={create}>Create Rule</button>
        </div>
        {warnings.length>0 && (
          <div className="mt-3 text-yellow-300">
            <strong>Warnings:</strong>
            <ul className="list-disc ml-5">
              {warnings.map((w,i)=>(<li key={i}>{w}</li>))}
            </ul>
          </div>
        )}
      </div>

      <section className="mt-6">
        <h3 className="text-lg font-medium">Existing Rules</h3>
        <div className="mt-3 grid gap-2">
          {rules.map(r => (
            <div key={r.id} className="card flex justify-between">
              <div>
                <div className="font-medium">{r.pattern}</div>
                <div className="text-sm text-gray-400">{r.action}</div>
              </div>
              <div className="text-sm text-gray-300">{r.description}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
