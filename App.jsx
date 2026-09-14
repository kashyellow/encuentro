import { useState, useEffect } from 'react'
import AgeGate from './components/AgeGate.jsx'
import AdminPage from './components/AdminPage.jsx'
import { supabase } from './lib/supabaseClient.js'

const FALLBACK = [{id:'1', name:'Sofia', age:27, city:'Boston', country:'Colombia', flag:'🇨🇴', image:'https://i.pravatar.cc/600?img=5', bio:'Love travel'}]

function Discover({profiles, country}){
  const list = country==='All Countries'? profiles : profiles.filter(p=>p.country===country)
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{list.map(p=>(
    <div key={p.id} className="bg-white rounded-[20px] border p-3">
      <img src={p.image||p.photo} className="w-full h-56 object-cover rounded-[16px]" alt="" />
      <p className="font-bold mt-2">{p.flag||'🌍'} {p.name}, {p.age} • {p.city}</p>
      <p className="text-[11px] text-zinc-500">{p.bio}</p>
    </div>))}</div>
}

export default function App(){
  const [tab,setTab]=useState('discover')
  const [country,setCountry]=useState('All Countries')
  const [profiles,setProfiles]=useState(()=>{ try{ const s=localStorage.getItem('encuentro_profiles'); return s? JSON.parse(s): FALLBACK }catch{ return FALLBACK }})
  useEffect(()=>{ (async()=>{ if(!supabase) return; const {data}=await supabase.from('profiles').select('*'); if(data&&data.length){ setProfiles(data); try{ localStorage.setItem('encuentro_profiles', JSON.stringify(data)) }catch{} } })() },[])
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <AgeGate />
      <header className="sticky top-0 bg-white border-b"><div className="max-w-[1280px] mx-auto px-4 h-[64px] flex items-center justify-between">
        <span className="font-bold">GlobalAmor</span>
        <div className="flex gap-2">{['discover','wall','admin'].map(k=><button key={k} onClick={()=>setTab(k)} className={`px-4 h-8 rounded-full text-[12px] border ${tab===k?'bg-black text-white':'bg-white'}`}>{k}</button>)}</div>
      </div></header>
      <main className="max-w-[1280px] mx-auto px-4 py-6">
        {tab==='discover'&&<Discover profiles={profiles} country={country} />}
        {tab==='admin'&&<AdminPage profiles={profiles} setProfiles={setProfiles} onSignOut={()=>setTab('discover')} />}
        {tab==='wall'&&<div className="bg-white border rounded-[20px] p-6">Wall</div>}
      </main>
    </div>
  )
}
