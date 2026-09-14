import { useState, useEffect } from "react"

const PROFILES = [
  { id: "sofia_27", name: "Sofia", age: 27, location: "Medellin - Colombia", country: "Colombia", tag: "Artist & coffee lover", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8cca?w=400&h=600&fit=crop" },
  { id: "isabella_24", name: "Isabella", age: 24, location: "Dominican Republic", country: "DR", tag: "Dancer, beach soul", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop" },
  { id: "yuki_26", name: "Yuki", age: 26, location: "Tokyo - Japan", country: "Japan", tag: "Photographer", img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop" },
  { id: "lea_29", name: "Lea", age: 29, location: "Zurich - Switzerland", country: "Switzerland", tag: "Mountains & design", img: "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=400&h=600&fit=crop" },
]

export default function App() {
  const [ageOk, setAgeOk] = useState(false)
  const [tab, setTab] = useState("Discover")
  const [saved, setSaved] = useState([])
  const [chats, setChats] = useState({})
  const [openId, setOpenId] = useState(null)
  const [text, setText] = useState("")
  const [q, setQ] = useState("")

  useEffect(() => {
    setAgeOk(localStorage.getItem("ga_age") === "yes")
    setSaved(JSON.parse(localStorage.getItem("ga_saved") || "[]"))
    setChats(JSON.parse(localStorage.getItem("ga_chats") || "{}"))
  }, [])

  useEffect(() => { localStorage.setItem("ga_saved", JSON.stringify(saved)) }, [saved])
  useEffect(() => { localStorage.setItem("ga_chats", JSON.stringify(chats)) }, [chats])

  const toggleSave = (id) => {
    setSaved(s => s.includes(id)? s.filter(x => x!== id) : [...s, id])
  }

  const send = () => {
    if (!text.trim() ||!openId) return
    const msg = { me: true, t: Date.now(), txt: text }
    setChats(c => ({...c, [openId]: [...(c[openId] || []), msg] }))
    setText("")
    setTimeout(() => {
      const rep = { me: false, t: Date.now(), txt: "Hey! Got your message. Let's connect?" }
      setChats(c => ({...c, [openId]: [...(c[openId] || []), rep] }))
    }, 800)
  }

  if (!ageOk) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ background: "#151515", padding: 24, borderRadius: 20, maxWidth: 360, width: "100%", textAlign: "center", border: "1px solid #222" }}>
          <h1 style={{ margin: 0 }}>GlobalAmor - 18+</h1>
          <p style={{ color: "#888", fontSize: 14 }}>Adults only community. Confirm you are 18+ to enter.</p>
          <button onClick={() => { localStorage.setItem("ga_age", "yes"); setAgeOk(true) }} style={{ width: "100%", padding: 12, borderRadius: 999, border: 0, background: "#fff", color: "#000", fontWeight: 800, marginTop: 12 }}>I am 18+ - Enter</button>
          <button onClick={() => window.location.href = "https://google.com"} style={{ width: "100%", padding: 10, background: "transparent", border: 0, color: "#555", marginTop: 8 }}>Exit</button>
        </div>
      </div>
    )
  }

  const list = tab === "Saved"? PROFILES.filter(p => saved.includes(p.id)) : PROFILES.filter(p => p.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div style={{ minHeight: "100vh", background: "#f6f6f6", fontFamily: "system-ui" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "10px 16px", position: "sticky", top: 0, zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <b>GlobalAmor</b>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => setTab("Discover")} style={{ padding: "6px 12px", borderRadius: 999, border: 0, background: tab === "Discover"? "#111" : "#eee", color: tab === "Discover"? "#fff" : "#000" }}>Discover</button>
          <button onClick={() => setTab("Saved")} style={{ padding: "6px 12px", borderRadius: 999, border: 0, background: tab === "Saved"? "#111" : "#eee", color: tab === "Saved"? "#fff" : "#000" }}>Saved ({saved.length})</button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>{tab}</h2>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search" style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid #ddd" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 14 }}>
          {list.map(p => {
            const isSaved = saved.includes(p.id)
            return (
              <div key={p.id} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #eee" }}>
                <div style={{ height: 240, backgroundImage: `url(${p.img})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 10, background: "linear-gradient(transparent, rgba(0,0,0,0.8))", color: "#fff" }}>
                    <b>{p.name}, {p.age}</b><div style={{ fontSize: 11 }}>{p.location}</div>
                  </div>
                  <div style={{ position: "absolute", top: 8, left: 8, background: "#fff", fontSize: 10, padding: "2px 8px", borderRadius: 999 }}>{p.country}</div>
                </div>
                <div style={{ padding: 10 }}>
                  <div style={{ fontSize: 12, color: "#666", height: 18 }}>{p.tag}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button onClick={() => setOpenId(p.id)} style={{ flex: 1, background: "#111", color: "#fff", border: 0, borderRadius: 999, padding: 8, fontWeight: 700 }}>Message</button>
                    <button onClick={() => toggleSave(p.id)} style={{ width: 36, borderRadius: 999, border: "1px solid #ddd", background: isSaved? "#ff2d75" : "#fff", color: isSaved? "#fff" : "#000" }}>{isSaved? "♥" : "♡"}</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {openId && (
        <div style={{ position: "fixed", right: 10, bottom: 10, width: 340, maxWidth: "90vw", height: 380, background: "#111", borderRadius: 16, display: "flex", flexDirection: "column", zIndex: 50 }}>
          <div style={{ padding: 12, color: "#fff", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #222" }}>
            <span>{PROFILES.find(x => x.id === openId)?.name}</span>
            <button onClick={() => setOpenId(null)} style={{ background: "none", border: 0, color: "#fff", fontSize: 18 }}>x</button>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
            {(chats[openId] || []).map((m, i) => (
              <div key={i} style={{ alignSelf: m.me? "flex-end" : "flex-start", background: m.me? "#ff2d75" : "#222", color: "#fff", padding: "8px 12px", borderRadius: 14, fontSize: 14, maxWidth: "80%" }}>{m.txt}</div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, padding: 10, borderTop: "1px solid #222" }}>
            <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type..." style={{ flex: 1, borderRadius: 999, border: "1px solid #333", background: "#1a1a1a", color: "#fff", padding: "8px 12px" }} />
            <button onClick={send} style={{ background: "#ff2d75", color: "#fff", border: 0, borderRadius: 999, padding: "8px 14px", fontWeight: 800 }}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}
