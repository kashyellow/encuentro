import { useState, useEffect } from 'react'
import AgeGate from './components/AgeGate.jsx'
import AdminPage from './components/AdminPage.jsx'
import { supabase } from './lib/supabaseClient.js'

const FALLBACK = [{id:'1', name:'Sofia', age:27, city:'Boston', country:'Colombia', flag:'🇨🇴', image:'https://i.pravatar.cc/600?img=5', bio:'Love travel'}]

export default function App(){
  const [tab,setTab]=useState('discover')
  const [profiles,setProfiles]=useState(()=>{ try{ const s=localStorage.getItem('encuentro_profiles'); return s? JSON.parse(s): FALLBACK }catch{ return FALLBACK }})
  useEffect(()=>{ (async()=>{ if(!supabase) return; const {data}=await supabase.from('profiles').select('*'); if(data&&data.length) setProfiles(data) })() },[])
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <AgeGate />
      <header className="bg-white border-b sticky top-0"><div className="max-w-[1280px] mx-auto px-4 h-[64px] flex items-center justify-between"><b>GlobalAmor</b><div className="flex gap-2">{['discover','admin'].map(k=><button key={k} onClick={()=>setTab(k)} className={`px-4 h-8 rounded-full border text-[12px] ${tab===k?'bg-black text-white':''}`}>{k}</button>)}</div></div></header>
      <main className="max-w-[1280px] mx-auto p-4">
        {tab==='discover'&&<div className="grid grid-cols-2 gap-4">{profiles.map(p=><div key={p.id} className="bg-white border rounded-[20px] p-3"><img src={p.image||p.photo} className="w-full h-48 object-cover rounded-[12px]" /><p className="font-bold mt-2">{p.name}</p></div>)}</div>}
        {tab==='admin'&&<AdminPage profiles={profiles} setProfiles={setProfiles} onSignOut={()=>setTab('discover')} />}
      </main>
    </div>
  )
}
