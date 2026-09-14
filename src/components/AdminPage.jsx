import { useState } from 'react'

export default function AdminPage({ onSignOut }){
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(()=>{ try{ return sessionStorage.getItem('ga_role')||'' }catch{ return '' } })
  const [tab, setTab] = useState('merch')
  const [msg, setMsg] = useState('')
  const [profiles, setProfiles] = useState(()=>{
    try{
      const s = localStorage.getItem('encuentro_profiles')
      return s? JSON.parse(s) : [{id:'1', name:'Demo Sofia', age:27, city:'Boston'}, {id:'2', name:'Demo Marcus', age:29, city:'Cambridge'}]
    }catch{ return [] }
  })
  const [country, setCountry] = useState('All Countries')
  const [subTab, setSubTab] = useState('profiles')

  const countries = [
    {label:'All Countries', flag:'🌍'},
    {label:'Colombia', flag:'🇨🇴'},
    {label:'Dominican Republic', flag:'🇩🇴'},
    {label:'Japan', flag:'🇯🇵'},
    {label:'Switzerland', flag:'🇨🇭'},
  ]

  const handleLogin = () => {
    const p = password.trim()
    if(['kashyellow5844','shawn123'].includes(p)){
      setRole('full'); sessionStorage.setItem('ga_role','full')
    }else if(['merch2024','community2024'].includes(p)){
      setRole('sub'); sessionStorage.setItem('ga_role','sub'); setSubTab('profiles')
    }else{
      setMsg('Wrong password'); setTimeout(()=>setMsg(''),2000)
    }
    setPassword('')
  }

  const deleteProfile = (id) => {
    const next = profiles.filter(x=>x.id!==id)
    setProfiles(next)
    try{ localStorage.setItem('encuentro_profiles', JSON.stringify(next)) }catch{}
    setMsg('Profile deleted — one at a time'); setTimeout(()=>setMsg(''),2000)
  }

  if(!role){
    return (
      <div className="max-w-[420px] mx-auto bg-white rounded-[20px] border p-6">
        <h3 className="font-bold text-[16px]">Admin Login</h3>
        <p className="text-[11px] text-zinc-500 mt-1">Full: kashyellow5844 / shawn123 • Sub: merch2024 / community2024</p>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter password" className="mt-4 w-full h-11 px-4 rounded-full border text-[13px]" />
        <button onClick={handleLogin} className="mt-3 w-full h-11 rounded-full bg-black text-white font-bold text-[13px]">Unlock</button>
        {msg && <p className="mt-3 text-[12px] text-center text-red-500">{msg}</p>}
      </div>
    )
  }

  if(role==='sub'){
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-[11px] bg-green-50 border border-green-200 text-green-800 px-3 py-1 rounded-full">✅ Separated — Profiles vs Merch</p>
          <button onClick={()=>{setRole(''); sessionStorage.removeItem('ga_role'); onSignOut?.()}} className="text-[11px] px-3 h-8 rounded-full border">Sign Out Admin 🔒</button>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>setSubTab('profiles')} className={`px-5 h-10 rounded-full text-[13px] border ${subTab==='profiles'?'bg-black text-white border-black':'bg-white'}`}>👤 Add / Approve Profiles — SEPARATED</button>
          <button onClick={()=>setSubTab('merch')} className={`px-5 h-10 rounded-full text-[13px] border ${subTab==='merch'?'bg-black text-white border-black':'bg-white'}`}>🛍️ Edit Merch — SEPARATED</button>
        </div>
        {subTab==='profiles' && (
          <div className="bg-white rounded-[20px] border p-4">
            <h4 className="font-bold text-[14px]">Add / Approve Profiles — Separated from Merch</h4>
            <p className="text-[11px] text-zinc-500 mt-1">Delete one at a time when ready</p>
            <div className="mt-4 space-y-3">
              {profiles.map(p=>(
                <div key={p.id} className="border rounded-[16px] p-3 flex justify-between items-center">
                  <div><p className="font-bold text-[13px]">{p.name}, {p.age} • {p.city}</p><p className="text-[11px] text-zinc-500">Demo — delete one at a time</p></div>
                  <div className="flex gap-2">
                    <button onClick={()=>deleteProfile(p.id)} className="h-7 px-3 rounded-full bg-amber-200 text-[11px]">Reject / Delete</button>
                    <button onClick={()=>{setMsg('Approved ✓'); setTimeout(()=>setMsg(''),2000)}} className="h-7 px-3 rounded-full bg-emerald-50 border text-[11px]">Approve ✓</button>
                  </div>
                </div>
              ))}
            </div>
            {msg && <p className="mt-3 text-[12px] text-center">{msg}</p>}
          </div>
        )}
        {subTab==='merch' && (
          <div className="bg-white rounded-[20px] border p-4">
            <h4 className="font-bold">Community Merch Window — Limited</h4>
            <p className="text-[11px] text-zinc-500 mt-1">8 items • one per window • internal modal only</p>
            <div className="mt-4 grid gap-3">
              {[
                {name:'Amor Linen Tote - Natural', vendor:'Casa Amor Atelier', price:'$28', flag:'🇨🇴'},
                {name:'Kyoto Postcard Set (12)', vendor:'Kyoto Paper Studio', price:'$18', flag:'🇯🇵'},
                {name:'Alpine Wool Cap', vendor:'Alpine Collective', price:'$42', flag:'🇨🇭'},
              ].map((it,i)=>(
                <div key={i} className="border rounded-[20px] p-3 flex gap-3">
                  <div className="w-20 h-20 rounded-[16px] bg-amber-100 grid place-items-center text-[24px]">{['👜','📸','🧢'][i]}</div>
                  <div><p className="font-bold text-[13px]">{it.flag} {it.name}</p><p className="text-[11px] text-zinc-500">{it.vendor} • {it.price}</p><button className="mt-2 h-8 px-4 rounded-full bg-black text-white text-[11px]">View + Vendor Contact</button></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto">
          {countries.map(c=>(
            <button key={c.label} onClick={()=>setCountry(c.label)} className={`whitespace-nowrap px-4 h-8 rounded-full text-[12px] border ${country===c.label?'bg-black text-white border-black':'bg-white'}`}>{c.flag} {c.label}</button>
          ))}
        </div>
        <button onClick={()=>{setRole(''); sessionStorage.removeItem('ga_role'); onSignOut?.()}} className="text-[11px] px-3 h-8 rounded-full border bg-white">Sign Out Admin 🔒</button>
      </div>
      <div className="flex gap-2">
        <button onClick={()=>setTab('merch')} className={`px-5 h-9 rounded-full text-[13px] border ${tab==='merch'?'bg-black text-white border-black':'bg-white'}`}>Merch Items</button>
        <button onClick={()=>setTab('vendors')} className={`px-5 h-9 rounded-full text-[13px] border ${tab==='vendors'?'bg-black text-white border-black':'bg-white'}`}>Vendors</button>
        <button onClick={()=>setTab('profiles')} className={`px-5 h-9 rounded-full text-[13px] border ${tab==='profiles'?'bg-black text-white border-black':'bg-white'}`}>Profiles ({profiles.length})</button>
      </div>
      {msg && <p className="text-[12px] text-center bg-amber-50 border rounded-full py-2">{msg}</p>}
      {tab==='merch' && (
        <div className="bg-white rounded-[20px] border p-4">
          <h3 className="font-bold text-[16px]">Community Merch Window — Limited</h3>
          <p className="text-[11px] mt-1 bg-zinc-50 inline-block px-3 py-1 rounded-full border">8 items • one per window • internal modal only</p>
          <div className="mt-4 grid gap-3">
            {[
              {name:'Amor Linen Tote - Natural', vendor:'Casa Amor Atelier', price:'$28', owner:'Sofia', country:'Colombia', flag:'🇨🇴', icon:'👜'},
              {name:'Kyoto Postcard Set (12)', vendor:'Kyoto Paper Studio', price:'$18', owner:'Yuki', country:'Japan', flag:'🇯🇵', icon:'📸'},
              {name:'Alpine Wool Cap', vendor:'Alpine Collective', price:'$42', owner:'Léa', country:'Switzerland', flag:'🇨🇭', icon:'🧢'},
              {name:'Panama Shell Necklace', vendor:'Panama Mar', price:'$36', owner:'Maya', country:'Panama', flag:'🇵🇦', icon:'📿'},
            ].map((it,i)=>(
              <div key={i} className="border border-zinc-200 rounded-[20px] p-3 flex gap-3">
                <div className="w-20 h-20 rounded-[16px] bg-gradient-to-br from-amber-100 to-orange-100 grid place-items-center text-[24px] shrink-0">{it.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[14px] truncate">{it.flag} {it.name}</p>
                  <p className="text-[11px] text-zinc-500 truncate">{it.vendor} • {it.price} • {it.owner} • {it.country}</p>
                  <button className="h-8 px-4 rounded-full bg-black text-white text-[11px] font-medium mt-3">View + Vendor Contact</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab==='profiles' && (
        <div className="bg-white rounded-[20px] border p-4">
          <h3 className="font-bold">Profiles — delete one at a time when ready</h3>
          <p className="text-[11px] text-zinc-500 mt-1">No need to rearrange whole site — just delete here</p>
          <div className="mt-4 space-y-3">
            {profiles.map(p=>(
              <div key={p.id} className="border rounded-[16px] p-3 flex justify-between items-center">
                <div><p className="font-bold text-[13px]">{p.name}, {p.age} • {p.city}</p><p className="text-[11px] text-zinc-500">ID: {p.id}</p></div>
                <div className="flex gap-2">
                  <button onClick={()=>deleteProfile(p.id)} className="h-8 px-4 rounded-full bg-white border text-[12px]">Delete</button>
                  <button onClick={()=>{setMsg('Approved ✓'); setTimeout(()=>setMsg(''),2000)}} className="h-8 px-4 rounded-full bg-black text-white text-[12px]">Approve ✓</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab==='vendors' && <div className="bg-white rounded-[20px] border p-6"><h3 className="font-bold">Vendors</h3><p className="text-[12px] text-zinc-500 mt-2">Vendor list</p></div>}
    </div>
  )
}
