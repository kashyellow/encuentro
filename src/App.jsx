import { useState, useEffect, useRef } from "react";

const FLAGS = {"All Countries":"🌍", Colombia:"🇨🇴", Japan:"🇯🇵", France:"🇫🇷", Spain:"🇪🇸", Brazil:"🇧🇷", Jamaica:"🇯🇲", "Dominican Republic":"🇩🇴", USA:"🇺🇸", Germany:"🇩🇪"};
const getFlag = (c) => FLAGS[c] || "🏳️";
const VENDOR_COUNTRY = { v1: "Colombia", v2: "Japan", v3: "Brazil", v4: "Jamaica" };

const INITIAL_PROFILES = [
  { id: "p1", name: "Sofia", age: 27, country: "Colombia", city: "Cartagena", status: "Local Host", vibe: "Sosua sunsets" },
  { id: "p2", name: "Isabella", age: 24, country: "Dominican Republic", city: "Santo Domingo", status: "Traveling in", vibe: "Coffee + hikes" },
  { id: "p3", name: "Yuki", age: 26, country: "Japan", city: "Kyoto", status: "Local Host", vibe: "Temples + film" },
  { id: "p4", name: "Léa", age: 29, country: "France", city: "Paris", status: "Local Host", vibe: "Art nights" },
  { id: "p5", name: "Elena", age: 28, country: "Spain", city: "Medellin", status: "Traveling in", vibe: "Salsa + Spanish" },
  { id: "p6", name: "Kenji", age: 31, country: "Japan", city: "Tokyo", status: "Local Host", vibe: "Ramen guide" },
  { id: "p7", name: "Maya", age: 25, country: "Brazil", city: "Rio", status: "Local Host", vibe: "Beach mornings" },
  { id: "p8", name: "Aiko", age: 23, country: "Japan", city: "Osaka", status: "Traveling in", vibe: "Thrift + cafes" },
  { id: "p9", name: "Larissa", age: 26, country: "Brazil", city: "Salvador", status: "Traveling in", vibe: "Dancehall" },
  { id: "p10", name: "Valentina", age: 27, country: "Colombia", city: "Sosua", status: "Local Host", vibe: "Beach club" },
  { id: "p11", name: "Lucia", age: 30, country: "Brazil", city: "Cartagena", status: "Local Host", vibe: "Yoga + co-work" },
  { id: "p12", name: "Gabriela", age: 28, country: "Colombia", city: "Kingston", status: "Traveling in", vibe: "Kingston nights" },
];

const INITIAL_VENDORS = [
  {id:"v1", name:"Casa Mamasota", country:"Colombia", tag:"Linen + Raffia"},
  {id:"v2", name:"Kyoto Paper Co", country:"Japan", tag:"Stationery"},
  {id:"v3", name:"Rio Clay", country:"Brazil", tag:"Ceramics"},
];

const INITIAL_MERCH = [
  {id:"m1", title:"Amor Linen Tote - Natural", price: 48, vendor:"v1", desc:"Sosua sunsets edition"},
  {id:"m2", title:"Kyoto Postcard Set (12)", price: 18, vendor:"v2", desc:"Film + temple prints"},
  {id:"m3", title:"Raffia Beach Tote", price: 62, vendor:"v1", desc:"Mamasota curation"},
  {id:"m4", title:"Linen Gauze Shirt", price: 48, vendor:"v1", desc:"Travel light"},
  {id:"m5", title:"Ceramic Café Cup", price: 32, vendor:"v3", desc:"Rio mornings"},
];

export default function App(){
  const [tab, setTab] = useState("Shop");
  const [countryFilter, setCountryFilter] = useState("All Countries");
  const [profiles] = useState(INITIAL_PROFILES);

  const filtered = profiles.filter(p => countryFilter === "All Countries" || p.country === countryFilter);

  return (
    <div style={{fontFamily:"Inter, system-ui", background:"#FFFBF0", minHeight:"100vh", color:"#111"}}>
      <nav style={{display:"flex", justifyContent:"space-between", padding:"14px 20px", borderBottom:"1.5px solid #111", fontWeight:700, textTransform:"uppercase", fontSize:12, letterSpacing:".08em"}}>
        <div>encuentro / Global Amor</div>
        <div style={{display:"flex", gap:14}}>
          {["Discover","Wall","Matches","Admin","Shop"].map(t=>(
            <span key={t} onClick={()=>setTab(t)} style={{cursor:"pointer", borderBottom: tab===t? "2px solid #FFD60A" : "none"}}>{t}</span>
          ))}
        </div>
      </nav>

      {tab === "Shop" && (
        <div style={{padding:"32px 20px", maxWidth:1000, margin:"0 auto"}}>
          <div style={{fontSize:11, opacity:.6, letterSpacing:".2em", textTransform:"uppercase"}}>Shop • Global Amor Essentials</div>
          <h1 style={{fontSize:54, lineHeight:.95, margin:"12px 0", fontFamily:"Instrument Serif, serif"}}>Travel light,<br/><i>belong everywhere.</i></h1>
          <p style={{maxWidth:520, opacity:.7}}>Curated by Mamasota for Sosua sunsets, Medellin hikes, and Kingston nights. Tap the pill to preview the collection.</p>
          <div style={{display:"flex", gap:10, margin:"18px 0", flexWrap:"wrap"}}>
            {Object.keys(FLAGS).slice(0,6).map(c=>(
              <button key={c} onClick={()=>setCountryFilter(c)} style={{padding:"8px 14px", borderRadius:99, border:"1.5px solid #111", background: countryFilter===c? "#111" : "white", color: countryFilter===c? "white" : "#111", fontWeight:600, cursor:"pointer"}}>
                {getFlag(c)} {c}
              </button>
            ))}
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px,1fr))", gap:16, marginTop:24}}>
            {INITIAL_MERCH.map(m=>(
              <div key={m.id} style={{background:"white", border:"1.5px solid #111", borderRadius:16, padding:14}}>
                <div style={{fontSize:11, border:"1px solid #111", display:"inline-block", padding:"4px 8px", borderRadius:99, marginBottom:10}}>{VENDOR_COUNTRY[m.vendor]} {getFlag(VENDOR_COUNTRY[m.vendor])}</div>
                <div style={{fontWeight:800}}>{m.title}</div>
                <div style={{opacity:.6, fontSize:13, margin:"4px 0"}}>{m.desc}</div>
                <div style={{fontWeight:700, marginTop:8}}>${m.price}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "Discover" && (
        <div style={{padding:"20px"}}>
          <div style={{background:"#FFD60A", border:"1.5px solid #111", borderRadius:12, padding:"10px 14px", fontSize:13, textAlign:"center", marginBottom:16}}>
            Demo travelers from Sosua DR, Colombia, Jamaica + more visible — delete in Admin as real people join. Profiles auto-seed for preview.
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(180px,1fr))", gap:14}}>
            {filtered.map(p=>(
              <div key={p.id} style={{background:"white", border:"1.5px solid #111", borderRadius:16, padding:12}}>
                <div style={{height:90, background:"#eee", borderRadius:10, marginBottom:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24}}>{getFlag(p.country)}</div>
                <div style={{fontWeight:800}}>{p.name}, {p.age} - {p.city}</div>
                <div style={{fontSize:11, textTransform:"uppercase", margin:"4px 0", opacity:.7}}>{p.status} DEMO • {p.vibe}</div>
                <div style={{display:"flex", gap:8, marginTop:8}}>
                  <button style={{flex:1, borderRadius:99, border:"1.5px solid #111"}}>♡</button>
                  <button style={{flex:1, borderRadius:99, border:"1.5px solid #111"}}>✉️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab!== "Shop" && tab!== "Discover" && (
        <div style={{padding:40, opacity:.6}}> {tab} view — coming from your Vercel build. Switch to Shop or Discover to see restored data.</div>
      )}
    </div>
  )
}
