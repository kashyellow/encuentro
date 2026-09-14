import { useState } from 'react'

export default function AgeGate(){
  const [agreed, setAgreed] = useState(()=> localStorage.getItem('ga_gate')==='yes')
  const [c1, setC1] = useState(false)
  const [c2, setC2] = useState(false)
  const [tab, setTab] = useState(null)

  if(agreed &&!tab) return null

  const Modal = ({title, children}) => (
    <div className="fixed inset-0 z-[100] bg-black/50 grid place-items-center p-4" onClick={()=>setTab(null)}>
      <div className="bg-white rounded-[20px] max-w-[640px] w-full max-h-[80vh] overflow-y-auto p-6" onClick={e=>e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-[18px]">{title}</h2>
          <button onClick={()=>setTab(null)} className="w-8 h-8 rounded-full bg-zinc-100 grid place-items-center">✕</button>
        </div>
        <div className="text-[13px] leading-relaxed text-zinc-700">{children}</div>
      </div>
    </div>
  )

  return (
    <>
      {tab==='safety' && <Modal title="Safety • Community Guidelines"><p>Global Amor is 18+ only. Be respectful, no harassment, no explicit content in public areas. Meet in public places first. Report suspicious behavior.</p></Modal>}
      {tab==='terms' && <Modal title="Global Amor Terms of Service"><p>By using Global Amor you agree to be 18+, provide accurate info, and follow community guidelines. No commercial spam. We may remove content violating terms.</p><p className="mt-3">Welcome to Global Amor Terms of Service.</p></Modal>}
      {tab==='privacy' && <Modal title="Global Amor Privacy Policy"><p>We store profiles in Supabase. Passwords are SHA-256 hashed. We don't share your data with third parties. You can request deletion anytime.</p><p className="mt-3">Global Amor Privacy Policy.</p></Modal>}

      {!agreed && (
        <div className="fixed inset-0 z-[90] bg-white grid place-items-center p-6">
          <div className="max-w-[420px] w-full text-center">
            <h1 className="text-[32px] font-bold tracking-tight">Welcome to Global Amor</h1>
            <div className="mt-4 flex justify-center">
              <button onClick={()=>setTab('safety')} className="px-4 py-2 rounded-full bg-[#ffde59] text-black text-[12px] font-bold">Safety • Terms • Privacy</button>
            </div>
            <p className="mt-3 text-[11px] text-zinc-500">Tap to read before continuing</p>
            <div className="mt-6 space-y-3 text-left bg-zinc-50 rounded-[16px] p-4">
              <label className="flex gap-3 text-[13px]"><input type="checkbox" checked={c1} onChange={e=>setC1(e.target.checked)} /> I am 18 years or older</label>
              <label className="flex gap-3 text-[13px]"><input type="checkbox" checked={c2} onChange={e=>setC2(e.target.checked)} /> I agree to <button onClick={()=>setTab('terms')} className="underline">Global Amor Terms of Service</button> and <button onClick={()=>setTab('privacy')} className="underline">Privacy Policy</button></label>
            </div>
            <div className="mt-4 flex justify-center gap-2 text-[11px]">
              <button onClick={()=>setTab('safety')} className="underline">Safety</button><span>•</span><button onClick={()=>setTab('terms')} className="underline">Terms</button><span>•</span><button onClick={()=>setTab('privacy')} className="underline">Privacy</button>
            </div>
            <button disabled={!c1 ||!c2} onClick={()=>{localStorage.setItem('ga_gate','yes'); setAgreed(true)}} className={`mt-6 w-full h-12 rounded-full font-bold text-[14px] ${c1 && c2? 'bg-black text-white' : 'bg-zinc-200 text-zinc-400'}`}>Agree & Enter</button>
            <p className="mt-3 text-[10px] text-zinc-400"><button onClick={()=>setTab('terms')} className="underline">Global Amor Terms of Service</button> • <button onClick={()=>setTab('privacy')} className="underline">Privacy Policy</button></p>
          </div>
        </div>
      )}
    </>
  )
}
