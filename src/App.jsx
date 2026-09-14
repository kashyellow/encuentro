import { useState, useEffect } from "react"

const PROFILES = [
  { id:"sofia", name:"Sofia", age:27, loc:"Medellin - Colombia", country:"Colombia", tag:"Artist & coffee lover", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop" },
  { id:"isabella", name:"Isabella", age:24, loc:"Dominican Republic", country:"DR", tag:"Dancer, beach soul", img:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop" },
  { id:"yuki", name:"Yuki", age:26, loc:"Tokyo - Japan", country:"Japan", tag:"Photographer", img:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=800&fit=crop" },
  { id:"lea", name:"Lea", age:29, loc:"Zurich - Switzerland", country:"Switzerland", tag:"Mountains & design", img:"https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=600&h=800&fit=crop" },
  { id:"valentina", name:"Valentina", age:25, loc:"Buenos Aires - Argentina", country:"Argentina", tag:"Chef & traveler", img:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop" },
  { id:"maria", name:"Maria", age:28, loc:"Lisbon - Portugal", country:"Portugal", tag:"Yoga instructor", img:"https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&h=800&fit=crop" },
]

export default function App(){
  const [ageOk,setAgeOk]=useState(false)
  const [tab,setTab]=useState("Discover")
  const [saved,setSaved]=useState([])
  const [chats,setChats]=useState({})
  const [openId,setOpenId]=useState(null)
  const [text,setText]=useState("")
  const [q,setQ]=useState("")

  useEffect(()=>{
    setAgeOk(localStorage.getItem("ga_age")==="yes")
    setSaved(JSON.parse(localStorage.getItem("ga_saved")||"[]"))
    setChats(JSON.parse(localStorage.getItem("ga_chats")||"{}"))
  },[])
  useEffect(()=>{localStorage.setItem("ga_saved",JSON.stringify(saved))},[saved])
  useEffect(()=>{localStorage.setItem("ga_chats",JSON.stringify(chats))},[chats])

  const toggleSave=(id)=>setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id])
  const send=()=>{
    if(!text.trim()||!openId) return
    const msg={me:true,txt:text}
    setChats(c=>({...c,[openId]:[...(c[openId]||[]),msg]}))
    setText("")
    setTimeout(()=>{
      setChats(c=>({...c,[openId]:[...(c[openId]||[]),{me:false,txt:"Hey! Got your message ❤️ Let's connect?"}]}))
    },700)
  }

  if(!ageOk){
    return(
      <div style={{minHeight:"100vh",background:"#0a0a0a",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        <div style={{background:"#151515",padding:28,borderRadius:20,maxWidth:360,width:"100%",textAlign:"center",border:"1px solid #222"}}>
          <h1 style={{margin:0}}>GlobalAmor - 18+</h1>
          <p style={{color:"#888",fontSize:14,marginTop:8}}>Adults only community. Confirm you are 18+ to enter.</p>
          <button onClick={()=>{localStorage.setItem("ga_age","yes");setAgeOk(true)}} style={{width:"100%",padding:14,borderRadius:999,border:0,background:"#fff",color:"#000",fontWeight:800,marginTop:16}}>I am 18+ - Enter</button>
          <button onClick={()=>window.location.href="https://google.com"} style={{width:"100%",padding:10,background:"transparent",border:0,color:"#555",marginTop:8}}>Exit</button>
        </div>
      </div>
    )
  }

  const list = tab==="Saved"? PROFILES.filter(p=>saved.includes(p.id)) : PROFILES.filter(p=>p.name.toLowerCase().includes(q.toLowerCase()))

  return(
    <div style={{minHeight:"100vh",background:"#f6f6f6",fontFamily:"system-ui"}}>
      <div style={{background:"#fff",borderBottom:"1px solid #eee",padding:"12px 16px",position:"sticky",top:0,zIndex:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <b style={{fontSize:18}}>GlobalAmor</b>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setTab("Discover")} style={{padding:"8px 16px",borderRadius:999,border:0,background:tab==="Discover"?"#111":"#eee",color:tab==="Discover"?"#fff":"#000",fontWeight:600}}>Discover</button>
          <button onClick={()=>setTab("Saved")} style={{padding:"8px 16px",borderRadius:999,border:0,background:tab==="Saved"?"#111":"#eee",color:tab==="Saved"?"#fff":"#000",fontWeight:600}}>Saved ({saved.length})</button>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <h2 style={{margin:0}}>{tab}</h2>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search" style={{padding:"10px 16px",borderRadius:999,border:"1px solid #ddd",width:180}}/>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:16}}>
          {list.map(p=>{
            const isSaved=saved.includes(p.id)
            return(
              <div key={p.id} style={{background:"#fff",borderRadius:18,overflow:"hidden",border:"1px solid #eee",boxShadow:"0 2px 10px rgba(0,0,0,0.04)"}}>
                <div style={{height:280,backgroundImage:`url(${p.img})`,backgroundSize:"cover",backgroundPosition:"center",position:"relative"}}>
                  <div style={{position:"absolute",bottom:0,left:0,right:0,padding:12,background:"linear-gradient(transparent,rgba(0,0,0,0.85))",color:"#fff"}}>
                    <div style={{fontWeight:800,fontSize:16}}>{p.name}, {p.age}</div>
                    <div style={{fontSize:12,opacity:0.9}}>{p.loc}</div>
                  </div>
                  <div style={{position:"absolute",top:10,left:10,background:"#fff",fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:999}}>{p.country}</div>
                </div>
                <div style={{padding:12}}>
                  <div style={{fontSize:12,color:"#666",marginBottom:10}}>{p.tag}</div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>setOpenId(p.id)} style={{flex:1,background:"#111",color:"#fff",border:0,borderRadius:999,padding:11,fontWeight:700}}>Message</button>
                    <button onClick={()=>toggleSave(p.id)} style={{width:42,borderRadius:999,border:"1px solid #ddd",background:isSaved?"#ff2d75":"#fff",color:isSaved?"#fff":"#000",fontSize:18}}>{isSaved?"♥":"♡"}</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {openId&&(
        <div style={{position:"fixed",right:12,bottom:12,width:350,maxWidth:"92vw",height:400,background:"#111",borderRadius:18,display:"flex",flexDirection:"column",zIndex:50,boxShadow:"0 20px 50px rgba(0,0,0,0.5)"}}>
          <div style={{padding:14,color:"#fff",display:"flex",justifyContent:"space-between",borderBottom:"1px solid #222",fontWeight:700}}>
            <span>{PROFILES.find(x=>x.id===openId)?.name}</span>
            <button onClick={()=>setOpenId(null)} style={{background:"none",border:0,color:"#fff",fontSize:20}}>×</button>
          </div>
          <div style={{flex:1,overflow:"auto",padding:12,display:"flex",flexDirection:"column",gap:8}}>
            {(chats[openId]||[]).map((m,i)=>(
              <div key={i} style={{alignSelf:m.me?"flex-end":"flex-start",background:m.me?"#ff2d75":"#222",color:"#fff",padding:"9px 13px",borderRadius:16,fontSize:14,maxWidth:"80%"}}>{m.txt}</div>
            ))}
          </div>
          <div style={{display:"flex",gap:8,padding:12,borderTop:"1px solid #222"}}>
            <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Type a message..." style={{flex:1,borderRadius:999,border:"1px solid #333",background:"#1a1a1a",color:"#fff",padding:"10px 14px"}}/>
            <button onClick={send} style={{background:"#ff2d75",color:"#fff",border:0,borderRadius:999,padding:"10px 16px",fontWeight:800}}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}
