import { useState, useEffect } from 'react'
import AgeGate from './components/AgeGate.jsx'
import AdminPage from './components/AdminPage.jsx'
import { supabase } from './lib/supabaseClient.js'

const FALLBACK = [
  {id:'1', name:'Sofia', age:27, city:'Boston', country:'Colombia', flag:'🇨🇴', image:'https://i.pravatar.cc/600?img=5', bio:'Love travel'},
  {id:'2', name:'Marcus', age:29, city:'Cambridge', country:'Japan', flag:'🇯🇵', image:'https://i.pravatar.cc/600?img=8', bio:'Photographer'},
]

function Discover({profiles, country}){
  const list = country==='All Countries'? profiles : profiles.filter(p=>p.country===country)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {list.map(p=>(
        <div key={p.id} className="bg-white rounded-[20px] border border-zinc-200 overflow-hidden">
          <img src={p.image||p.photo||'https://i.pravatar.cc/600?img=5'} className="w-full h-64 object-cover" alt="" />
          <div className="p-4">
            <p className="font-bold text-[16px]">{p.flag||'🌍'} {p.name}, {p.age} • {p.city}</p>
            <p className="text-[12px] text-zinc-500 mt-1">{p.bio}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function App(){
  const [tab, setTab] = useState('discover')
  const [country, setCountry] = useState('All Countries')
  const [profiles, setProfiles] = useState(()=>{
    try{
      const s=localStorage.getItem('encuentro_profiles')
      return s? JSON.parse(s): FALLBACK
    }catch{ return FALLBACK }
  })

  useEffect(()=>{
    async function load(){
      if(!supabase) return
      const {data} = await supabase.from('profiles').select('*').order('created_at',{ascending:false})
      if(data && data.length>0){
        setProfiles(data)
        try{ localStorage.setItem('encuentro_profiles', JSON.stringify(data)) }catch{}
      }
    }
    load()
  },[])

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <AgeGate />
      <header className="sticky top-0 z-30 bg-white border-b border-zinc-200">
        <div className="max-w-[1280px] mx-auto px-4 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-black text-white grid place-items-center font-bold">G</div>
            <span className="font-bold text-[18px]">GlobalAmor</span>
          </div>
          <div className="flex gap-2">
            {['discover','essential','wall','inbox','admin'].map(k=>(
              <button key={k} onClick={()=>setTab(k)} className={`px-4 h-8 rounded-full text-[13px] border ${tab===k?'bg-black text-white border-black':'bg-white border-zinc-200'}`}>{k==='inbox'?'Inbox 🔒':k}</button>
            ))}
          </div>
        </div>
      </header>
      <main className="max-w-[1280px] mx-auto px-4 py-6">
        {tab==='discover' && <Discover profiles={profiles} country={country} />}
        {tab==='admin' && <AdminPage profiles={profiles} setProfiles={setProfiles} onSignOut={()=>setTab('discover')} />}
        {tab!=='discover' && tab!=='admin' && <div className="bg-white rounded-[20px] border p-6">{tab} — same layout</div>}
      </main>
    </div>
  )
}
