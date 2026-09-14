import { useState, useEffect } from "react"

const DEMO_PROFILES = [
  {id:"sofia_27", name:"Sofia", age:27, loc:"Medellin - Colombia", country:"Colombia", tag:"Artist & coffee lover", demo:true, img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop", bio:"Painter, coffee addict, looking for real connection. Speak English & Spanish."},
  {id:"isabella_24", name:"Isabella", age:24, loc:"Dominican Republic", country:"DR", tag:"Dancer, beach soul", demo:true, img:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop", bio:"Professional dancer, loves beach sunsets and bachata."},
  {id:"yuki_26", name:"Yuki", age:26, loc:"Tokyo - Japan", country:"Japan", tag:"Photographer", demo:true, img:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=800&fit=crop", bio:"Tokyo street photographer, ramen hunter."},
  {id:"lea_29", name:"Lea", age:29, loc:"Zurich - Switzerland", country:"Switzerland", tag:"Mountains & design", demo:true, img:"https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=600&h=800&fit=crop"},
  {id:"valentina_25", name:"Valentina", age:25, loc:"Buenos Aires - Argentina", country:"Argentina", tag:"Chef & traveler", demo:true, img:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop"},
  {id:"maria_28", name:"Maria", age:28, loc:"Lisbon - Portugal", country:"Portugal", tag:"Yoga instructor", demo:true, img:"https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&h=800&fit=crop"},
  {id:"ana_26", name:"Ana", age:26, loc:"Cartagena - Colombia", country:"Colombia", tag:"Law student", demo:true, img:"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop"},
  {id:"camila_23", name:"Camila", age:23, loc:"Santo Domingo - DR", country:"DR", tag:"Model", demo:true, img:"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop"},
  {id:"lucia_27", name:"Lucia", age:27, loc:"Medellin - Colombia", country:"Colombia", tag:"Entrepreneur", demo:true, img:"https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=800&fit=crop"},
  {id:"kiara_24", name:"Kiara", age:24, loc:"Bali - Indonesia", country:"Indonesia", tag:"Surfer", demo:true, img:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop"},
  {id:"sofia2_26", name:"Sofia M", age:26, loc:"Bogota - Colombia", country:"Colombia", tag:"Doctor", demo:true, img:"https://images.unsplash.com/photo-1509967419535-04f92cc6d2af?w=600&h=800&fit=crop"},
  {id:"elena_28", name:"Elena", age:28, loc:"Madrid - Spain", country:"Spain", tag:"Architect", demo:true, img:"https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=600&h=800&fit=crop"},
]

const DEMO_MERCH = [
  {id:1, vendor:"Sofia's Art", name:"Handpainted Coffee Mug", price:18, img:"https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400"},
  {id:2, vendor:"Isabella's Boutique", name:"Beach Sarong", price:24, img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"},
  {id:3, vendor:"Yuki Studio", name:"Tokyo Photo Print", price:35, img:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400"},
  {id:4, vendor:"Lea Designs", name:"Alpine Beanie", price:22, img:"https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400"},
  {id:5, vendor:"GlobalAmor Official", name:"Love Knows No Border Tee", price:28, img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"},
  {id:6, vendor:"Camila's Closet", name:"DR Sunset Dress", price:45, img:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400"},
  {id:7, vendor:"Maria Flow", name:"Yoga Mat Strap", price:15, img:"https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400"},
  {id:8, vendor:"Valentina Cooks", name:"Empanada Recipe Card Set", price:12, img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"},
]

const DEMO_VENDORS = [
  {id:"v1", name:"Sofia's Art", owner:"Sofia", products:2, sales:124},
  {id:"v2", name:"Isabella's Boutique", owner:"Isabella", products:1, sales:89},
  {id:"v3", name:"GlobalAmor Official", owner:"Admin", products:3, sales:452},
  {id:"v4", name:"Yuki Studio", owner:"Yuki", products:1, sales:67},
]

const DEMO_WALL = [
  {id:1, author:"Sofia", avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", text:"First day in Medellin after 2 years in US. Who wants to show me new coffee spots? ☕️", likes:12, comments:[{user:"Carlos", text:"I know a great one in Poblado!"}, {user:"Sofia", text:"DM me!"}]},
  {id:2, author:"Isabella", avatar:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100", text:"Beach day was perfect. Dominican sun hits different 🌴", likes:24, comments:[]},
  {id:3, author:"GlobalAmor", avatar:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100", text:"Welcome to our global community! Introduce yourself below 👇", likes:56, comments:[{user:"Ana", text:"Hola from Cartagena!"}, {user:"Yuki", text:"Konnichiwa from Tokyo"}]},
]

export default function App(){
  const [ageOk,setAgeOk]=useState(false)
  const [tab,setTab]=useState("Discover")
  const [profiles,setProfiles]=useState(DEMO_PROFILES)
  const [saved,setSaved]=useState([])
  const [chats,setChats]=useState({})
  const [openChat,setOpenChat]=useState(null)
  const [chatText,setChatText]=useState("")
  const [q,setQ]=useState("")
  const [vendors,setVendors]=useState(DEMO_VENDORS)
  const [merch,setMerch]=useState(DEMO_MERCH)
  const [wall,setWall]=useState(DEMO_WALL)
  const [wallText,setWallText]=useState("")
  const [showCreate,setShowCreate]=useState(false)
  const [newProfile,setNewProfile]=useState({name:"",age:"",loc:""})
  const [editingVendor,setEditingVendor]=useState(null)

  useEffect(()=>{
    setAgeOk(localStorage.getItem("ga_age")==="yes")
    setSaved(JSON.parse(localStorage.getItem("ga_saved")||"[]"))
    setChats(JSON.parse(localStorage.getItem("ga_chats")||"{}"))
    const p = JSON.parse(localStorage.getItem("ga_profiles")||"null")
    if(p) setProfiles(p)
  },[])
  useEffect(()=>localStorage.setItem("ga_saved",JSON.stringify(saved)),[saved])
  useEffect(()=>localStorage.setItem("ga_chats",JSON.stringify(chats)),[chats])
  useEffect(()=>localStorage.setItem("ga_profiles",JSON.stringify(profiles)),[profiles])

  const toggleSave=(id)=>setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id])
  const sendChat=()=>{
    if(!chatText.trim()||!openChat) return
    const all={...chats}
    if(!all[openChat]) all[openChat]=[]
    all[openChat].push({me:true,txt:chatText, t:Date.now()})
    setChats(all); setChatText("")
    setTimeout(()=>{
      const a={...JSON.parse(localStorage.getItem("ga_chats")||"{}")}
      if(!a[openChat]) a[openChat]=[]
      a[openChat].push({me:false,txt:"Hey! Thanks for reaching out 😊", t:Date.now()})
      setChats(a)
    },800)
  }
  const createProfile=()=>{
    if(!newProfile.name||!newProfile.age) return alert("Name & Age required")
    const np={id:Date.now().toString(), name:newProfile.name, age:parseInt(newProfile.age), loc:newProfile.loc||"Worldwide", country:"New", tag:"New member", demo:false, bio:"New member", img:`https://i.pravatar.cc/600?u=${Date.now()}`}
    setProfiles([np,...profiles]); setShowCreate(false); setNewProfile({name:"",age:"",loc:""}); setTab("Discover")
  }
  const filtered = (tab==="Saved"? profiles.filter(p=>saved.includes(p.id)) : profiles).filter(p=>p.name.toLowerCase().includes(q.toLowerCase()))

  if(!ageOk){
    return (
      <div style={{minHeight:"100vh",background:"#0a0a0a",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        <div style={{background:"#151515",padding:30,borderRadius:24,maxWidth:380,width:"100%",textAlign:"center",border:"1px solid #222"}}>
          <h1 style={{margin:0,fontSize:28}}>GlobalAmor 🌍❤️</h1>
          <p style={{color:"#888",fontSize:14,marginTop:10}}>Adults only community (18+). Meet people worldwide - dating, culture, merch, wall. Confirm you are 18+ to enter.</p>
          <button onClick={()=>{localStorage.setItem("ga_age","yes");setAgeOk(true)}} style={{width:"100%",padding:14,borderRadius:999,border:0,background:"#fff",color:"#000",fontWeight:800,marginTop:18}}>I am 18+ - Enter GlobalAmor</button>
          <button onClick={()=>window.location.href="https://google.com"} style={{width:"100%",padding:10,background:"transparent",border:0,color:"#555",marginTop:8}}>Exit</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:"100vh",background:"#f6f6f6",fontFamily:"system-ui"}}>
      <div style={{background:"#fff",borderBottom:"1px solid #eee",padding:"10px 12px",position:"sticky",top:0,zIndex:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <b style={{fontSize:18}}>GlobalAmor 🌍</b>
          <span style={{fontSize:11,background:"#111",color:"#fff",padding:"2px 8px",borderRadius:999}}>{profiles.length} members</span>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {["Discover","Shop","Wall","Vendors","Saved"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"7px 12px",borderRadius:999,border:0,background:tab===t?"#111":"#eee",color:tab===t?"#fff":"#000",fontSize:13,fontWeight:600}}>{t}{t==="Saved"?` (${saved.length})`:""}</button>
          ))}
          <button onClick={()=>setShowCreate(true)} style={{padding:"7px 14px",borderRadius:999,border:0,background:"#ff2d75",color:"#fff",fontWeight:800}}>+</button>
        </div>
      </div>

      <div style={{maxWidth:1150,margin:"0 auto",padding:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,gap:10}}>
          <h2 style={{margin:0,fontSize:20}}>{tab} {tab==="Discover"?`• ${filtered.length}`:""}</h2>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search profiles, shop, wall..." style={{padding:"10px 16px",borderRadius:999,border:"1px solid #ddd",width:220}}/>
        </div>

        {(tab==="Discover"||tab==="Saved") && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:14}}>
            {filtered.map(p=>{
              const isSaved=saved.includes(p.id)
              return (
                <div key={p.id} style={{background:"#fff",borderRadius:18,overflow:"hidden",border:"1px solid #eee"}}>
                  <div style={{height:270,backgroundImage:`url(${p.img})`,backgroundSize:"cover",backgroundPosition:"center",position:"relative"}}>
                    <div style={{position:"absolute",top:8,left:8,display:"flex",gap:6}}>
                      <span style={{background:"#fff",fontSize:10,fontWeight:800,padding:"3px 8px",borderRadius:999}}>{p.country}</span>
                      {p.demo&&<span style={{background:"#ff2d75",color:"#fff",fontSize:9,fontWeight:800,padding:"3px 8px",borderRadius:999}}>DEMO</span>}
                    </div>
                    <div style={{position:"absolute",bottom:0,left:0,right:0,padding:12,background:"linear-gradient(transparent,rgba(0,0,0,0.85))",color:"#fff"}}>
                      <div style={{fontWeight:800}}>{p.name}, {p.age}</div>
                      <div style={{fontSize:11,opacity:0.9}}>{p.loc}</div>
                    </div>
                  </div>
                  <div style={{padding:11}}>
                    <div style={{fontSize:12,color:"#666",height:18,overflow:"hidden"}}>{p.tag}</div>
                    <div style={{fontSize:11,color:"#888",marginTop:4,height:32,overflow:"hidden"}}>{p.bio||""}</div>
                    <div style={{display:"flex",gap:8,marginTop:10}}>
                      <button onClick={()=>setOpenChat(p.id)} style={{flex:1,background:"#111",color:"#fff",border:0,borderRadius:999,padding:"9px",fontWeight:700,fontSize:13}}>Message</button>
                      <button onClick={()=>toggleSave(p.id)} style={{width:38,borderRadius:999,border:"1px solid #ddd",background:isSaved?"#ff2d75":"#fff",color:isSaved?"#fff":"#000"}}>{isSaved?"♥":"♡"}</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {tab==="Shop" && (
          <div>
            <div style={{background:"#fff",borderRadius:16,padding:14,marginBottom:14,border:"1px solid #eee"}}>
              <b>Community Merch • 8 products</b><div style={{fontSize:12,color:"#666"}}>Support creators. Vendors can edit their store names in Vendors tab.</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:14}}>
              {merch.map(m=>(
                <div key={m.id} style={{background:"#fff",borderRadius:16,overflow:"hidden",border:"1px solid #eee"}}>
                  <div style={{height:160,backgroundImage:`url(${m.img})`,backgroundSize:"cover",backgroundPosition:"center"}}/>
                  <div style={{padding:10}}>
                    <div style={{fontSize:11,color:"#ff2d75",fontWeight:700}}>{m.vendor}</div>
                    <div style={{fontSize:13,fontWeight:600}}>{m.name}</div>
                    <div style={{fontSize:13,marginTop:4}}>${m.price}</div>
                    <button style={{width:"100%",marginTop:8,background:"#111",color:"#fff",border:0,borderRadius:999,padding:"7px",fontSize:12}}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="Wall" && (
          <div style={{maxWidth:600,margin:"0 auto"}}>
            <div style={{background:"#fff",borderRadius:16,padding:12,border:"1px solid #eee",display:"flex",gap:10,marginBottom:14}}>
              <input value={wallText} onChange={e=>setWallText(e.target.value)} placeholder="Share something with the community..." style={{flex:1,border:"1px solid #eee",borderRadius:999,padding:"10px 14px"}}/>
              <button onClick={()=>{if(!wallText.trim())return; setWall([{id:Date.now(), author:"You", avatar:"https://i.pravatar.cc/100", text:wallText, likes:0, comments:[]},...wall]); setWallText("")}} style={{background:"#111",color:"#fff",border:0,borderRadius:999,padding:"10px 18px",fontWeight:700}}>Post</button>
            </div>
            {wall.map(w=>(
              <div key={w.id} style={{background:"#fff",borderRadius:16,padding:14,border:"1px solid #eee",marginBottom:12}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{width:36,height:36,borderRadius:999,backgroundImage:`url(${w.avatar})`,backgroundSize:"cover"}}/>
                  <b style={{fontSize:14}}>{w.author}</b>
                </div>
                <div style={{marginTop:10,fontSize:14}}>{w.text}</div>
                <div style={{display:"flex",gap:14,marginTop:10,fontSize:12,color:"#666"}}>
                  <span>♥ {w.likes} likes</span><span>💬 {w.comments.length} comments</span>
                </div>
                {w.comments.map((c,i)=><div key={i} style={{marginTop:8,background:"#f6f6f6",borderRadius:10,padding:"6px 10px",fontSize:12}}><b>{c.user}: </b>{c.text}</div>)}
              </div>
            ))}
          </div>
        )}

        {tab==="Vendors" && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:14}}>
            {vendors.map(v=>(
              <div key={v.id} style={{background:"#fff",borderRadius:16,padding:14,border:"1px solid #eee"}}>
                {editingVendor===v.id? (
                  <div style={{display:"flex",gap:8}}>
                    <input defaultValue={v.name} id={`edit-${v.id}`} style={{flex:1,padding:"8px",borderRadius:8,border:"1px solid #ddd"}}/>
                    <button onClick={()=>{const newName=document.getElementById(`edit-${v.id}`).value; setVendors(vendors.map(x=>x.id===v.id?{...x,name:newName}:x)); setEditingVendor(null)}} style={{background:"#111",color:"#fff",border:0,borderRadius:8,padding:"8px 12px"}}>Save</button>
                  </div>
                ):(
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <b>{v.name}</b><button onClick={()=>setEditingVendor(v.id)} style={{background:"#eee",border:0,borderRadius:999,padding:"4px 10px",fontSize:11}}>Edit</button>
                  </div>
                )}
                <div style={{fontSize:12,color:"#666",marginTop:6}}>Owner: {v.owner} • {v.products} products • {v.sales} sales</div>
                <button style={{marginTop:10,width:"100%",background:"#f6f6f6",border:"1px solid #eee",borderRadius:999,padding:"7px",fontSize:12}}>Manage Store</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreate && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"#fff",borderRadius:20,padding:20,width:"100%",maxWidth:380}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><h3 style={{margin:0}}>Create Profile</h3><button onClick={()=>setShowCreate(false)} style={{border:0,background:"#eee",borderRadius:999,width:28,height:28}}>×</button></div>
            <input value={newProfile.name} onChange={e=>setNewProfile({...newProfile,name:e.target.value})} placeholder="Name" style={{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #ddd",marginBottom:10}}/>
            <input value={newProfile.age} onChange={e=>setNewProfile({...newProfile,age:e.target.value})} placeholder="Age" type="number" style={{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #ddd",marginBottom:10}}/>
            <input value={newProfile.loc} onChange={e=>setNewProfile({...newProfile,loc:e.target.value})} placeholder="Location" style={{width:"100%",padding:"12px",borderRadius:10,border:"1px solid #ddd",marginBottom:12}}/>
            <button onClick={()=>{if(!newProfile.name||!newProfile.age)return alert("Name & Age required"); const np={id:Date.now().toString(), name:newProfile.name, age:parseInt(newProfile.age), loc:newProfile.loc||"Worldwide", country:"New", tag:"New member", demo:false, bio:"New member", img:`https://i.pravatar.cc/600?u=${Date.now()}`}; setProfiles([np,...profiles]); setShowCreate(false); setNewProfile({name:"",age:"",loc:""}); setTab("Discover")}} style={{width:"100%",background:"#111",color:"#fff",border:0,borderRadius:999,padding:"12px",fontWeight:800}}>Create & Publish</button>
          </div>
        </div>
      )}

      {openChat && (
        <div style={{position:"fixed",right:12,bottom:12,width:350,maxWidth:"92vw",height:400,background:"#111",borderRadius:18,display:"flex",flexDirection:"column",zIndex:50}}>
          <div style={{padding:14,color:"#fff",display:"flex",justifyContent:"space-between",borderBottom:"1px solid #222",fontWeight:700}}>
            <span>{profiles.find(x=>x.id===openChat)?.name||"Chat"}</span>
            <button onClick={()=>setOpenChat(null)} style={{background:"none",border:0,color:"#fff",fontSize:20}}>×</button>
          </div>
          <div style={{flex:1,overflow:"auto",padding:12,display:"flex",flexDirection:"column",gap:8}}>
            {(chats[openChat]||[]).map((m,i)=><div key={i} style={{alignSelf:m.me?"flex-end":"flex-start",background:m.me?"#ff2d75":"#222",color:"#fff",padding:"9px 13px",borderRadius:16,fontSize:14,maxWidth:"80%"}}>{m.txt}</div>)}
          </div>
          <div style={{display:"flex",gap:8,padding:12,borderTop:"1px solid #222"}}>
            <input value={chatText} onChange={e=>setChatText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(()=>{if(!chatText.trim()||!openChat)return; const all={...chats}; if(!all[openChat])all[openChat]=[]; all[openChat].push({me:true,txt:chatText}); setChats(all); setChatText(""); setTimeout(()=>{const a={...JSON.parse(localStorage.getItem("ga_chats")||"{}")}; if(!a[openChat])a[openChat]=[]; a[openChat].push({me:false,txt:"Hey! Thanks for reaching out 😊"}); setChats(a)},800)})()} placeholder="Type a message..." style={{flex:1,borderRadius:999,border:"1px solid #333",background:"#1a1a1a",color:"#fff",padding:"10px 14px"}}/>
            <button onClick={()=>{if(!chatText.trim()||!openChat)return; const all={...chats}; if(!all[openChat])all[openChat]=[]; all[openChat].push({me:true,txt:chatText}); setChats(all); setChatText(""); setTimeout(()=>{const a={...JSON.parse(localStorage.getItem("ga_chats")||"{}")}; if(!a[openChat])a[openChat]=[]; a[openChat].push({me:false,txt:"Hey! Thanks for reaching out 😊"}); setChats(a)},800)}} style={{background:"#ff2d75",color:"#fff",border:0,borderRadius:999,padding:"10px 16px",fontWeight:800}}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}
