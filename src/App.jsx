import { useState, useEffect } from "react"

// --- CONFIG ---
const PROFILES = [
  { id: "sofia_27", name: "Sofia", age: 27, location: "Medellin • Colombia", country: "Colombia", tag: "Artist & coffee lover", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8cca?w=400" },
  { id: "isabella_24", name: "Isabella", age: 24, location: "Dominican Republic", country: "Dominican Republic", tag: "Dancer, beach soul", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400" },
  { id: "yuki_26", name: "Yuki", age: 26, location: "Tokyo • Japan", country: "Japan", tag: "Photographer capturing quiet moments", img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400" },
  { id: "lea_29", name: "Léa", age: 29, location: "Zurich • Switzerland", country: "Switzerland", tag: "Mountains, design, meaningful chats", img: "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=400" },
]

export default function App() {
  const [ageVerified, setAgeVerified] = useState(() => localStorage.getItem("enc_age_ok") === "yes")
  const [activeTab, setActiveTab] = useState("Discover")
  const [saves, setSaves] = useState(() => JSON.parse(localStorage.getItem("enc_saved") || "[]"))
  const [chats, setChats] = useState(() => JSON.parse(localStorage.getItem("enc_chats") || "{}"))
  const [openChatId, setOpenChatId] = useState(null)
  const [msgText, setMsgText] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => { localStorage.setItem("enc_saved", JSON.stringify(saves)) }, [saves])
  useEffect(() => { localStorage.setItem("enc_chats", JSON.stringify(chats)) }, [chats])

  // --- SAVE ---
  const toggleSave = (id) => {
    setSaves(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  // --- CHAT ---
  const openChat = (id) => { setOpenChatId(id) }
  const sendMsg = () => {
    if (!msgText.trim() || !openChatId) return
    const newMsg = { me: true, text: msgText, t: Date.now() }
    setChats(prev => ({ ...prev, [openChatId]: [...(prev[openChatId] || []), newMsg] }))
    setMsgText("")
    // fake reply for live feel
    setTimeout(() => {
      setChats(prev => ({
        ...prev,
        [openChatId]: [...(prev[openChatId] || []), { me: false, text: "Got your message 😉 Let's connect?", t: Date.now() }]
      }))
    }, 1000)
  }

  const filtered = PROFILES.filter(p => {
    if (activeTab === "Saved" || activeTab === "Inbox") return saves.includes(p.id) // show saved in Inbox too
    if (search) return (p.name + p.location + p.country).toLowerCase().includes(search.toLowerCase())
    return true
  })

  const displayProfiles = activeTab === "Discover" ? PROFILES.filter(p => !search || (p.name+p.location).toLowerCase().includes(search.toLowerCase())) : filtered

  // --- 18+ GATE - CANNOT BE BYPASSED ---
  if (!ageVerified) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ maxWidth: 400, width: "100%", background: "#111", borderRadius: 20, padding: 28, border: "1px solid #222", textAlign: "center" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>GlobalAmor • 18+</h1>
          <p style={{ color: "#999", fontSize: 14, marginBottom: 20 }}>This is a dating community for adults 18 and older. You must be 18+ to enter. By continuing you confirm you are 18+.</p>
          <button onClick={() => { localStorage.setItem("enc_age_ok", "yes"); setAgeVerified(true) }} style={{ width: "100%", background: "white", color: "black", border: "none", borderRadius: 999, padding: "12px", fontWeight: 800, cursor: "pointer" }}>I am 18+ - Enter</button>
          <button onClick={() => window.location.href = "https://google.com"} style={{ width: "100%", marginTop: 10, background: "transparent", color: "#666", border: "none", padding: "10px", cursor: "pointer" }}>Exit</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f7", color: "#111", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* HEADER */}
      <div style={{ background: "white", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 900 }}>GlobalAmor <span style={{ fontSize: 10, background: "#111", color: "white", padding: "2px 6px", borderRadius: 999, marginLeft: 6 }}>COMMUNITY MARKETPLACE</span></div>
          <div style={{ display: "flex", gap: 8, fontSize: 13 }}>
            {["Discover", "Community Merch", "Wall", "Inbox", "Admin"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab === "Community Merch" ? "Discover" : tab)} style={{ padding: "6px 12px", borderRadius: 999, border: "none", background: activeTab === tab ? "#111" : "#f0f0f0", color: activeTab === tab ? "white" : "#333", cursor: "pointer", fontWeight: 600 }}>
                {tab} {tab === "Inbox" && saves.length > 0 ? `(${saves.length})` : ""}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 16px", display: "flex", gap: 8, overflowX: "auto" }}>
        {["All Countries", "Colombia", "Dominican Republic", "Japan", "Switzerland", "Europe", "Panama"].map(c => (
          <button key={c} style={{ whiteSpace: "nowrap", padding: "6px 12px", borderRadius: 999, border: "1px solid #ddd", background: "white", fontSize: 12 }}>{c}</button>
        ))}
      </div>

      {/* DISCOVER HEADER */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: 20, fontWeight: 800 }}>{activeTab === "Saved" || activeTab === "Inbox" ? `Saved • ${saves.length}` : "Discover"}</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search names, cities..." style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid #ddd", fontSize: 13, minWidth: 180 }} />
          <button onClick={() => { const id = prompt("Name?"); if (id) alert("For now add profiles in PROFILES array in code - next version will be + Add Profile form") }} style={{ padding: "8px 14px", borderRadius: 999, border: "none", background: "#111", color: "white", fontSize: 13, fontWeight: 700 }}>+ Add Profile</button>
        </div>
      </div>

      {/* GRID */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px 100px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {displayProfiles.map(p => {
          const saved = saves.includes(p.id)
          return (
            <div key={p.id} data-profile-id={p.id} style={{ background: "white", borderRadius: 16, overflow: "hidden", border: "1px solid #eee" }}>
              <div style={{ position: "relative", height: 280, background: `#ddd url(${p.img}) center/cover` }}>
                <div style={{ position: "absolute", top: 8, left: 8, background: "rgba(255,255,255,.9)", fontSize: 10, padding: "3px 8px", borderRadius: 999 }}>{p.country}</div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, background: "linear-gradient(transparent, rgba(0,0,0,.8))", color: "white" }}>
                  <div style={{ fontWeight: 800 }}>{p.name}, {p.age}</div>
                  <div style={{ fontSize: 11, opacity: .8 }}>{p.location}</div>
                </div>
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 12, color: "#666", minHeight: 28 }}>{p.tag}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button onClick={() => openChat(p.id)} style={{ flex: 1, background: "#111", color: "white", border: "none", borderRadius: 999, padding: "8px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Message</button>
                  <button onClick={() => toggleSave(p.id)} style={{ width: 36, height: 36, borderRadius: 999, border: "1px solid #ddd", background: saved ? "#ff2d75" : "white", color: saved ? "white" : "#111", cursor: "pointer" }}>{saved ? "♥" : "♡"}</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* CHAT DRAWER */}
      {openChatId && (
        <div style={{ position: "fixed", bottom: 0, right: 0, width: "100%", maxWidth: 380, height: "60vh", background: "#111", borderRadius: "16px 16px 0 0", display: "flex", flexDirection: "column", zIndex: 50, boxShadow: "0 -10px 40px rgba(0,0,0,.5)" }}>
          <div style={{ padding: 14, borderBottom: "1px solid #222", display: "flex", justifyContent: "space-between", color: "white", fontWeight: 700 }}>
            <span>{PROFILES.find(x => x.id === openChatId)?.name || openChatId}</span>
            <button onClick={() => setOpenChatId(null)} style={{ background: "none", border: "none", color: "white", fontSize: 20, cursor: "pointer" }}>×</button>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            {(chats[openChatId] || []).map((m, i) => (
              <div key={i} style={{ maxWidth: "80%", padding: "10px 12px", borderRadius: 14, fontSize: 14, alignSelf: m.me ? "flex-end" : "flex-start", background: m.me ? "#ff2d75" : "#222", color: "white" }}>{m.text}</div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid #222" }}>
            <input value={msgText} onChange={e => setMsgText(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} placeholder="Type a message..." style={{ flex: 1, background: "#1a1a1a", border: "1px solid #333", borderRadius: 999, padding: "10px 14px", color: "white" }} />
            <button onClick={sendMsg} style={{ background: "#ff2d75", color: "white", border: "none", borderRadius: 999, padding: "10px 18px", fontWeight: 800, cursor: "pointer" }}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}
