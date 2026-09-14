import { useState, useEffect } from 'react'
import AgeGate from './components/AgeGate.jsx'
import AdminPage from './components/AdminPage.jsx'

const MOCK_PROFILES = [
  {id:'1', name:'Sofia', age:27, city:'Boston', country:'Colombia', flag:'🇨🇴', image:'https://i.pravatar.cc/600?img=5', bio:'Love travel'},
  {id:'2', name:'Marcus', age:29, city:'Cambridge', country:'Japan', flag:'🇯🇵', image:'https://i.pravatar.cc/600?img=8', bio:'Photographer'},
  {id:'3', name:'Aisha', age:26, city:'Somerville', country:'Switzerland', flag:'🇨🇭', image:'https://i.pravatar.cc/600?img=32', bio:'Designer'},
]

function Discover({profiles, country}){
  const filtered = country==='All Countries'? profiles : profiles.filter(p=>p.country===country)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map(p=>(
        <div key={p.id} className="bg-white rounded-[20px] border border-zinc-200 overflow-hidden">
          <img src={p.image} className="w-full h-64 object-cover" />
          <div className="p-4">
            <p className="font-bold text-[16px]">{p.flag} {p.name}, {p.age} • {p.city}</p>
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
  const [showCreate, setShowCreate] = useState(false)

  useEffect(()=>{
    if(tab==='admin'){ setShowCreate(false) }
  },[tab])

  const countries = [
    {label:'All Countries', flag:'🌍'},
    {label:'Colombia', flag:'🇨🇴'},
    {label:'Dominican Republic', flag:'🇩🇴'},
    {label:'Japan', flag:'🇯🇵'},
    {label:'Switzerland', flag:'🇨🇭'},
  ]

  const topTabs = [
    {k:'discover', label:'Discover'},
    {k:'essential', label:'Essential'},
    {k:'wall', label:'Wall'},
    {k:'inbox', label:'Inbox 🔒'},
    {k:'admin', label:'Admin'},
  ]

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <AgeGate />
      <header className="sticky top-0 z-30 bg-white border-b border-zinc-200">
        <div className="max-w-[1280px] mx-auto px-4 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-black text-white grid place-items-center font-bold">G</div>
            <span className="font-bold text-[18px] tracking-tight">GlobalAmor</span>
          </div>
          <div className="flex items-center gap-2">
            {topTabs.map(t=>(
              <button key={t.k} onClick={()=>setTab(t.k)} className={`px-4 h-8 rounded-full text-[13px] font-medium border ${tab===t.k?'bg-black text-white border-black':'bg-white border-zinc-200'}`}>{t.label}</button>
            ))}
          </div>
        </div>
      </header>
      <div className="border-b border-zinc-200 bg-[#fafaf8] sticky top-[64px] z-20">
        <div className="max-w-[1280px] mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-none">
          {countries.map(c=>(
            <button key={c.label} onClick={()=>setCountry(c.label)} className={`whitespace-nowrap px-4 h-8 rounded-full text-[12px] border ${country===c.label?'bg-black text-white border-black':'bg-white border-zinc-200'}`}>{c.flag} {c.label}</button>
          ))}
        </div>
      </div>
      {tab!=='admin' && (
        <div className="max-w-[1280px] mx-auto px-4 py-3 flex gap-2">
          <button className="px-5 h-9 rounded-full bg-black text-white text-[13px]">Merch Items</button>
          <button className="px-5 h-9 rounded-full bg-white border border-zinc-200 text-[13px]">Vendors</button>
        </div>
      )}
      <main className="max-w-[1280px] mx-auto px-4 py-6">
        {tab==='discover' && <Discover profiles={MOCK_PROFILES} country={country} />}
        {tab==='essential' && <div className="bg-white rounded-[20px] border p-6">Essential vendors — same layout as live</div>}
        {tab==='wall' && <div className="bg-white rounded-[20px] border p-6">Wall — community posts — same layout</div>}
        {tab==='inbox' && <div className="bg-white rounded-[20px] border p-6">Inbox 🔒 — please log in</div>}
        {tab==='admin' && <AdminPage onSignOut={()=>setTab('discover')} />}
      </main>
      <button className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-black text-white grid place-items-center text-[12px] font-bold">ES</button>
    </div>
  )
}
