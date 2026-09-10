'use client'
import { useState, useEffect } from 'react'
import StyleBanner from '../components/StyleBanner'
import TrendingPopup from '../components/TrendingPopup'
import AdminLogin from '../components/AdminLogin'
import AdminDashboard from '../components/AdminDashboard'
import { defaultTrending, demoProfiles } from '../lib/defaults'
import { TrendingItem, Profile } from '../lib/types'
import { getSupabase } from '../lib/supabase'

export default function Page() {
  const [tab, setTab] = useState<'discover'|'wall'|'matches'|'admin'>('discover')
  const [showTrending, setShowTrending] = useState(false)
  const [trending, setTrending] = useState<TrendingItem[]>(defaultTrending)
  const [profiles, setProfiles] = useState<Profile[]>(demoProfiles)
  const [pending, setPending] = useState<Profile[]>([])
  const [role, setRole] = useState<'super'|'sub'|null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [toast, setToast] = useState('')

  // Load from localStorage + Supabase
  useEffect(() => {
    const savedTrending = localStorage.getItem('ga_trending')
    if (savedTrending) setTrending(JSON.parse(savedTrending))
    
    const savedProfiles = localStorage.getItem('ga_profiles')
    if (savedProfiles) setProfiles(JSON.parse(savedProfiles))
    
    const savedPending = localStorage.getItem('ga_pending')
    if (savedPending) setPending(JSON.parse(savedPending))

    const savedRole = localStorage.getItem('ga_role') as any
    if (savedRole) setRole(savedRole)

    // Try Supabase
    const supabase = getSupabase()
    if (supabase) {
      supabase.from('profiles').select('*').eq('status','approved').then(({data}) => {
        if (data && data.length>0) setProfiles(data as any)
      })
      supabase.from('profiles').select('*').eq('status','pending').then(({data}) => {
        if (data) setPending(data as any)
      })
      supabase.from('trending_items').select('*').order('sort_order').then(({data}) => {
        if (data && data.length>0) setTrending(data as any)
      })
    }
  }, [])

  useEffect(() => {
    if (trending !== defaultTrending) localStorage.setItem('ga_trending', JSON.stringify(trending))
  }, [trending])

  const showToast = (msg: string) => { setToast(msg); setTimeout(()=>setToast(''), 3000) }

  const handleCreateProfile = async (e: any) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const newProfile: Profile = {
      id: Date.now().toString(),
      name: form.get('name') as string,
      age: parseInt(form.get('age') as string),
      city: form.get('city') as string,
      country: form.get('country') as string,
      role: form.get('role') as any,
      bio: form.get('bio') as string,
      interests: form.get('interests') as string,
      email: form.get('email') as string,
      photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      status: 'pending',
      created_at: new Date().toISOString()
    }
    
    const supabase = getSupabase()
    if (supabase) {
      await supabase.from('profiles').insert(newProfile)
      showToast('Profile pending approval — will appear after admin review')
    } else {
      const newPending = [newProfile, ...pending]
      setPending(newPending)
      localStorage.setItem('ga_pending', JSON.stringify(newPending))
      showToast('Profile pending approval — saved locally')
    }
    setShowCreate(false)
  }

  return (
    <div className="min-h-screen bg-[#fdf8f0] max-w-[480px] mx-auto relative pb-[140px]">
      {/* Header */}
      <div className="px-4 py-4 flex justify-between items-center">
        <h1 className="font-serif font-bold text-[18px]">Global Amor</h1>
        <div className="flex gap-2 items-center">
          <span className="text-[10px] bg-white border px-2 py-1 rounded-full">{getSupabase() ? '● Live' : '● Demo'}</span>
          {tab==='discover' && <button onClick={()=>setShowCreate(true)} className="text-xs bg-black text-white px-3 py-1.5 rounded-full">+ Create Profile</button>}
        </div>
      </div>

      {/* Main Content */}
      {tab==='discover' && (
        <div className="px-3 grid grid-cols-2 gap-3">
          {profiles.map(p => (
            <div key={p.id} className="bg-white rounded-[16px] p-2 border">
              <img src={p.photo_url} className="w-full h-[160px] object-cover rounded-[12px]" />
              <div className="mt-2">
                <div className="text-sm font-semibold">{p.name}, {p.age}</div>
                <div className="text-[11px] opacity-60">{p.city} • {p.role}</div>
                <div className="text-[11px] mt-1 line-clamp-2">{p.bio}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==='admin' && !role && <AdminLogin onLogin={(r)=>{ setRole(r); localStorage.setItem('ga_role', r) }} />}
      {tab==='admin' && role && (
        <AdminDashboard 
          role={role} 
          onLogout={()=>{ setRole(null); localStorage.removeItem('ga_role') }}
          profiles={profiles}
          pending={pending}
          trending={trending}
          setTrending={setTrending}
          refresh={()=>window.location.reload()}
        />
      )}

      {tab==='wall' && <div className="p-10 text-center opacity-50 text-sm">Live Wall coming — posts will show here</div>}
      {tab==='matches' && <div className="p-10 text-center opacity-50 text-sm">Matches — liked profiles</div>}

      {/* Style Banner - always visible above nav, like screenshot #2 */}
      <div className="fixed bottom-[64px] left-0 right-0 max-w-[480px] mx-auto z-20">
        <StyleBanner count={trending.length} onOpen={()=>setShowTrending(true)} />
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-[#fdf8f0]/90 backdrop-blur border-t border-black/5 flex justify-around py-2 z-30">
        {[
          ['discover','Discover','🧭'],
          ['wall','Wall','🔥'],
          ['matches','Matches','❤️'],
          ['admin','Admin','🛡️'],
        ].map(([k,label,icon]) => (
          <button key={k} onClick={()=>setTab(k as any)} className={`flex flex-col items-center px-4 py-1 ${tab===k?'opacity-100':'opacity-50'}`}>
            <span>{icon}</span>
            <span className="text-[11px] mt-1">{label}</span>
          </button>
        ))}
      </div>

      {/* Trending Popup */}
      {showTrending && (
        <TrendingPopup 
          items={trending}
          onClose={()=>setShowTrending(false)}
          isAdmin={!!role}
          onEdit={()=>{ setShowTrending(false); setTab('admin') }}
          onShop={(item)=>showToast(`Chat Mamasota to shop ${item.title}`)}
        />
      )}

      {/* Create Profile Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <form onSubmit={handleCreateProfile} className="bg-white w-full max-w-[420px] rounded-t-[20px] sm:rounded-[20px] p-5 max-h-[90vh] overflow-auto">
            <h2 className="font-semibold">Create Your Profile — Email Ready</h2>
            <p className="text-xs opacity-60 mt-1">Will go to pending for admin review</p>
            <div className="mt-4 space-y-3">
              <input name="name" required placeholder="Name" className="w-full border rounded-full px-4 py-2.5 text-sm" />
              <div className="grid grid-cols-2 gap-2">
                <input name="age" required type="number" placeholder="Age" className="border rounded-full px-4 py-2.5 text-sm" />
                <select name="role" className="border rounded-full px-4 py-2.5 text-sm">
                  <option>Local Host</option>
                  <option>Traveling In</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input name="city" required placeholder="City" className="border rounded-full px-4 py-2.5 text-sm" />
                <input name="country" required placeholder="Country" className="border rounded-full px-4 py-2.5 text-sm" />
              </div>
              <input name="email" required type="email" placeholder="Email (required, for contact)" className="w-full border rounded-full px-4 py-2.5 text-sm bg-amber-50" />
              <textarea name="bio" required placeholder="Bio" className="w-full border rounded-[16px] px-4 py-2.5 text-sm h-[70px]" />
              <input name="interests" placeholder="Interests (comma separated)" className="w-full border rounded-full px-4 py-2.5 text-sm" />
            </div>
            <div className="flex gap-2 mt-5">
              <button type="button" onClick={()=>setShowCreate(false)} className="flex-1 border rounded-full py-3 text-sm">Cancel</button>
              <button type="submit" className="flex-1 bg-black text-white rounded-full py-3 text-sm">Save Profile</button>
            </div>
          </form>
        </div>
      )}

      {toast && <div className="fixed bottom-[120px] left-1/2 -translate-x-1/2 bg-black text-white text-xs px-4 py-2 rounded-full z-[60]">{toast}</div>}
    </div>
  )
}
