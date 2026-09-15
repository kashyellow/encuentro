import { useState, useEffect } from 'react';

const FLAGS = {"All Countries":"🌎", Colombia:"🇨🇴", "Dominican Republic":"🇩🇴", Japan:"🇯🇵", Switzerland:"🇨🇭", Europe:"🇪🇺", Panama:"🇵🇦", Thailand:"🇹🇭", Brazil:"🇧🇷", "Costa Rica":"🇨🇷", Mexico:"🇲🇽", Venezuela:"🇻🇪", USA:"🇺🇸", "United States":"🇺🇸", Philippines:"🇵🇭"};
const getFlag = (c) => FLAGS[c] || "🏳️";
const VENDOR_COUNTRY = { v1: "Colombia", v2: "Japan", v3: "Switzerland", v4: "Panama", v5: "Brazil", v6: "Costa Rica", v7: "Mexico", v8: "Venezuela" };

const INITIAL_PROFILES = [
  { id: "p1", name: "Sofia", age: 27, country: "Colombia", city: "Medellín", bio: "Artist & coffee lover. Looking for real connection.", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80", demo: true },
  { id: "p2", name: "Isabella", age: 24, country: "Dominican Republic", city: "Santo Domingo", bio: "Dancer, beach soul, loves to travel.", photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80", demo: true },
  { id: "p3", name: "Yuki", age: 26, country: "Japan", city: "Kyoto", bio: "Photographer capturing quiet moments.", photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=80", demo: true },
  { id: "p4", name: "Léa", age: 29, country: "Switzerland", city: "Zurich", bio: "Mountains, design, meaningful chats.", photo: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&q=80", demo: true },
  { id: "p5", name: "Elena", age: 28, country: "Europe", city: "Barcelona", bio: "Architect based in Europe, loves old towns.", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80", demo: true },
  { id: "p6", name: "Kenji", age: 31, country: "Japan", city: "Tokyo", bio: "Chef, vinyl collector, calm energy.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", demo: true },
  { id: "p7", name: "Maya", age: 25, country: "Panama", city: "Panama City", bio: "Marine biology student, ocean lover.", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80", demo: true },
  { id: "p8", name: "Aiko", age: 23, country: "Thailand", city: "Bangkok", bio: "Yoga teacher, street food explorer.", photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80", demo: true },
  { id: "p9", name: "Larissa", age: 26, country: "Brazil", city: "Rio", bio: "Sun, samba, and sincere conversations.", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80", demo: true },
  { id: "p10", name: "Valentina", age: 27, country: "Costa Rica", city: "San José", bio: "Sustainable living & surf mornings.", photo: "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=600&q=80", demo: true },
  { id: "p11", name: "Lucia", age: 30, country: "Mexico", city: "CDMX", bio: "Writer, mezcal tasting, late-night talks.", photo: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=600&q=80", demo: true },
  { id: "p12", name: "Gabriela", age: 28, country: "Venezuela", city: "Caracas", bio: "Painter, dreamer, loves salsa.", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80", demo: true },
];

const INITIAL_VENDORS = [{id:"v1",name:"Casa Amor Atelier",owner:"Sofia"},{id:"v2",name:"Kyoto Paper Studio",owner:"Yuki"},{id:"v3",name:"Alpine Collective",owner:"Léa"},{id:"v4",name:"Panama Mar",owner:"Maya"},{id:"v5",name:"Rio Sun Club",owner:"Larissa"},{id:"v6",name:"Costa Vida",owner:"Valentina"},{id:"v7",name:"Tulum Goods",owner:"Lucia"},{id:"v8",name:"Caracas Color",owner:"Gabriela"}];

const INITIAL_MERCH = [
  {id:"m1",title:"Amor Linen Tote - Natural",price:28,vendorId:"v1",image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",desc:"Hand-stitched tote, natural canvas, limited run."},
  {id:"m2",title:"Kyoto Postcard Set (12)",price:18,vendorId:"v2",image:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80",desc:"Risograph postcards from Kyoto streets."},
  {id:"m3",title:"Alpine Wool Cap",price:42,vendorId:"v3",image:"https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80",desc:"Merino wool, embroidered heart."},
  {id:"m4",title:"Panama Shell Necklace",price:36,vendorId:"v4",image:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",desc:"Recycled shells, brass clasp."},
  {id:"m5",title:"Rio Sun Tee - Washed",price:32,vendorId:"v5",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",desc:"Organic cotton, soft wash."},
  {id:"m6",title:"Costa Rica Coffee - 250g",price:22,vendorId:"v6",image:"https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80",desc:"Single origin, Tarrazú beans."},
  {id:"m7",title:"Tulum Clay Mug",price:26,vendorId:"v7",image:"https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=600&q=80",desc:"Wheel-thrown, glazed interior."},
  {id:"m8",title:"Caracas Print - Limited",price:55,vendorId:"v8",image:"https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80",desc:"A3 giclée, signed by artist."},
];

const INITIAL_WALL = [
  {id:"w1",author:"Sofia",avatar:INITIAL_PROFILES[0].photo,text:"First market day in Medellín! Sold out of totes in 2 hours. Gracias comunidad 💛",image:"https://images.unsplash.com/photo-1555529771-7888783a18d3?w=800&q=80",likes:24,comments:[{author:"Maya",text:"So proud of you!"}],time:"2h ago"},
  {id:"w2",author:"Yuki",avatar:INITIAL_PROFILES[2].photo,text:"New postcard set dropping tomorrow. Kyoto in winter light.",likes:18,comments:[],time:"5h ago"},
  {id:"w3",author:"Valentina",avatar:INITIAL_PROFILES[9].photo,text:"Beach cleanup in Nosara today - 12kg plastic collected. Anyone want to join next Saturday?",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",likes:41,comments:[{author:"Larissa",text:"Count me in!"},{author:"Lucia",text:"Amazing work"}],time:"1d ago"},
];

const COUNTRIES = ["All Countries","Colombia","Dominican Republic","Japan","Switzerland","Europe","Panama","Thailand","Brazil","Costa Rica","Mexico","Venezuela","USA","Philippines"];

export default function App(){
  const [activeTab,setActiveTab]=useState("discover");
  const [countryFilter,setCountryFilter]=useState("All Countries");
  const [vendorFilter,setVendorFilter]=useState("All Vendors");
  const [searchProfiles,setSearchProfiles]=useState("");
  const [searchMerch,setSearchMerch]=useState("");
  const [profiles,setProfiles]=useState(INITIAL_PROFILES);
  const [vendors]=useState(INITIAL_VENDORS);
  const [merch,setMerch]=useState(INITIAL_MERCH);
  const [wall]=useState(INITIAL_WALL);
  const [selectedProfile,setSelectedProfile]=useState(null);
  const [selectedMerch,setSelectedMerch]=useState(null);
  const [showAddProfile,setShowAddProfile]=useState(false);
  const [showAddMerch,setShowAddMerch]=useState(false);
  const [ageVerified,setAgeVerified]=useState(false);
  const [adminUnlocked,setAdminUnlocked]=useState(false);
  const [adminPass,setAdminPass]=useState("");
  const [subAdminTab,setSubAdminTab]=useState("profiles");
  const [inboxUser,setInboxUser]=useState(null);
  const [chatMessages,setChatMessages]=useState({});
  const [chatInput,setChatInput]=useState("");
  const [newProfile,setNewProfile]=useState({name:"",age:"",country:"Colombia",city:"",bio:"",photo:""});
  const [newMerch,setNewMerch]=useState({title:"",price:20,vendorId:"v1",desc:"",image:""});

  useEffect(()=>{const v=localStorage.getItem("ga_18plus");const p=localStorage.getItem("ga_profiles");const m=localStorage.getItem("ga_merch");if(v)setAgeVerified(true);if(p){try{setProfiles(JSON.parse(p));}catch{}}if(m){try{setMerch(JSON.parse(m));}catch{}}},[]);
  useEffect(()=>{localStorage.setItem("ga_profiles",JSON.stringify(profiles));},[profiles]);
  useEffect(()=>{localStorage.setItem("ga_merch",JSON.stringify(merch));},[merch]);

  const filteredProfiles = (()=>{let out=profiles;if(countryFilter!=="All Countries")out=out.filter(pr=>pr.country===countryFilter);if(searchProfiles.trim()){const s=searchProfiles.toLowerCase();out=out.filter(pr=>pr.name.toLowerCase().includes(s)||pr.city.toLowerCase().includes(s)||pr.bio.toLowerCase().includes(s));}return out;})();
  const filteredMerch = (()=>{let out=merch;if(countryFilter!=="All Countries")out=out.filter(it=>VENDOR_COUNTRY[it.vendorId]===countryFilter);if(vendorFilter!=="All Vendors")out=out.filter(it=>vendors.find(v=>v.id===it.vendorId)?.name===vendorFilter);if(searchMerch.trim()){const s=searchMerch.toLowerCase();out=out.filter(it=>it.title.toLowerCase().includes(s)||it.desc.toLowerCase().includes(s));}return out;})();

  const handleCreateProfile=(e)=>{e.preventDefault();if(!newProfile.name||!newProfile.age)return;const np={id:"p"+Date.now(),name:newProfile.name,age:parseInt(newProfile.age),country:newProfile.country,city:newProfile.city||"Unknown",bio:newProfile.bio||"New here!",photo:newProfile.photo||`https://i.pravatar.cc/400?img=${Math.floor(Math.random()*60)+1}`,demo:false};setProfiles([np,...profiles]);setNewProfile({name:"",age:"",country:"Colombia",city:"",bio:"",photo:""});setShowAddProfile(false);};
  const handleCreateMerch=(e)=>{e.preventDefault();if(!newMerch.title)return;const nm={id:"m"+Date.now(),title:newMerch.title,price:parseInt(newMerch.price),vendorId:newMerch.vendorId,image:newMerch.image||"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",desc:newMerch.desc};setMerch([nm,...merch]);setShowAddMerch(false);setNewMerch({title:"",price:20,vendorId:"v1",desc:"",image:""});};
  const deleteProfile=(id)=>{if(confirm("Delete this profile?"))setProfiles(profiles.filter(p=>p.id!==id));};
  const deleteMerch=(id)=>{if(confirm("Delete this merch item?"))setMerch(merch.filter(m=>m.id!==id));};
  const approveProfile=(id)=>{setProfiles(profiles.map(p=>p.id===id?{...p,demo:false}:p));};
  const sendChat=()=>{if(!chatInput.trim()||!inboxUser)return;const msg={from:"me",text:chatInput};setChatMessages(prev=>({...prev,[inboxUser.id]:[...(prev[inboxUser.id]||[]),msg]}));setChatInput("");setTimeout(()=>{setChatMessages(prev=>({...prev,[inboxUser.id]:[...(prev[inboxUser.id]||[]),{from:"them",text:"Thanks for reaching out ❤️"}]}));},800);};
  const unlockAdmin=()=>{if(adminPass==="admin123"){setAdminUnlocked(true);setAdminPass("");}else alert("Wrong password — try admin123");};
  const waLink = (title, price, vendor) => `https://wa.me/?text=${encodeURIComponent(`Hi! I'm interested in ${title}${price?` - $${price}`:""}${vendor?` from ${vendor}`:""}. Is it still available? From global amor`)}`;

  if(!ageVerified){
    return(
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <div className="max-w-[460px] w-full bg-white rounded-[24px] border border-zinc-200 p-8 shadow-sm">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">g</div>
          <h1 className="text-[22px] font-semibold tracking-tight text-center mt-4">global amor — 18+ Community</h1>
          <p className="text-[13px] text-zinc-500 text-center mt-2 leading-[1.5]">Secure adult community. Please confirm you are 18+ to continue. Private, respectful, global.</p>
          <div className="mt-6"><button onClick={()=>{setAgeVerified(true);localStorage.setItem("ga_18plus","true");}} className="w-full h-11 rounded-full bg-black text-white text-[14px] font-medium">I am 18+ — Enter global amor</button></div>
          <div className="mt-4 flex justify-center gap-3 text-[11px] text-zinc-400"><button className="hover:text-zinc-600 underline">Safety</button><span>•</span><button className="hover:text-zinc-600 underline">Terms</button><span>•</span><button className="hover:text-zinc-600 underline">Privacy</button></div>
          <div className="mt-3 text-center text-[11px] text-zinc-400">{profiles.length} members • 7 online now</div>
        </div>
      </div>
    );
  }

  return(
    <div className="min-h-screen bg-[#fafafa] text-zinc-900">
      <style>{`.scrollbar-none::-webkit-scrollbar{display:none}.scrollbar-none{-ms-overflow-style:none;scrollbar-width:none}`}</style>
      
      {/* Countries banner with flags - across top like before (yellow bar removed) */}
      <div className="bg-zinc-900 text-white text-[11px] border-b border-zinc-800 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-10 flex items-center gap-5 overflow-x-auto whitespace-nowrap scrollbar-none">
          {COUNTRIES.filter(c=>c!=="All Countries").map(c=>(
            <button key={c} onClick={()=>{setCountryFilter(c); setActiveTab("discover");}} className={`flex items-center gap-1.5 hover:text-emerald-300 transition shrink-0 ${countryFilter===c?"text-emerald-300 font-bold":""}`}>
              <span>{FLAGS[c]||"🏳️"}</span><span className="font-medium">{c}</span>
            </button>
          ))}
          <button onClick={()=>setCountryFilter("All Countries")} className={`ml-2 px-3 h-6 rounded-full border text-[10px] ${countryFilter==="All Countries"?"bg-white text-black border-white":"border-zinc-600 text-zinc-300"}`}>🌎 All Countries</button>
        </div>
      </div>

      {/* Header - global amor (g + members removed per yellow request) */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-zinc-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div><div className="font-bold tracking-tight leading-none">global amor</div></div>
          </div>
          <nav className="flex items-center gap-1.5 overflow-x-auto scrollbar-none max-w-full">
            {[{k:"discover",label:"Discover"},{k:"merch",label:"Community Merch"},{k:"wall",label:"Wall"},{k:"inbox",label:inboxUser?`Inbox (${Object.keys(chatMessages).length})`:"Inbox 🔒"},{k:"admin",label:"Admin"}].map(tab=>(
              <button key={tab.k} onClick={()=>setActiveTab(tab.k)} className={`whitespace-nowrap px-4 h-8 rounded-full text-[12px] font-medium border transition ${activeTab===tab.k?"bg-black text-white border-black":"bg-white border-zinc-200 hover:border-zinc-300"}`}>{tab.label}</button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6">
        {(activeTab==="discover"||activeTab==="merch")&&(
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <select value={countryFilter} onChange={e=>setCountryFilter(e.target.value)} className="h-9 rounded-full border border-zinc-200 bg-white px-4 text-[13px] outline-none min-w-[130px]">{COUNTRIES.map(c=><option key={c}>{c}</option>)}</select>
            <select value={vendorFilter} onChange={e=>setVendorFilter(e.target.value)} className="flex-1 sm:flex-none h-9 rounded-full border border-zinc-200 bg-white px-4 text-[13px] outline-none min-w-[130px]"><option>All Vendors</option>{vendors.map(v=><option key={v.id}>{v.name}</option>)}</select>
            <div className="relative flex-1 sm:w-[220px]"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[13px]">🔍</span><input value={activeTab==="discover"?searchProfiles:searchMerch} onChange={e=>activeTab==="discover"?setSearchProfiles(e.target.value):setSearchMerch(e.target.value)} placeholder={activeTab==="discover"?"Search profiles...":"Search merch..."} className="w-full h-9 pl-9 pr-4 rounded-full border border-zinc-200 bg-white text-[13px] outline-none focus:border-black" /></div>
            {activeTab==="discover"&&<button onClick={()=>setShowAddProfile(true)} className="h-9 px-5 rounded-full bg-black text-white text-[13px] font-medium">+ Add Profile</button>}
            {activeTab==="merch"&&<button onClick={()=>setShowAddMerch(true)} className="h-9 px-5 rounded-full bg-black text-white text-[13px] font-medium">Add Item</button>}
          </div>
        )}

        {activeTab==="discover"&&(
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredProfiles.map(p=>(
              <div key={p.id} className="group relative bg-white rounded-[20px] border border-zinc-200 overflow-hidden hover:border-zinc-300 transition-colors">
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 cursor-pointer" onClick={()=>setSelectedProfile(p)}>
                  <img src={p.photo} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
                  {p.demo&&<span className="absolute top-3 left-3 text-[10px] bg-black/70 text-white px-2.5 py-1 rounded-full backdrop-blur">DEMO</span>}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4">
                    <div className="flex items-center gap-1.5 text-white font-semibold"><span className="text-[12px]">{FLAGS[p.country]||"🏳️"}</span><span>{p.name}, {p.age}</span></div>
                    <div className="text-white/70 text-[12px]">{p.city}, {p.country}</div>
                  </div>
                </div>
                <div className="p-3 flex gap-1.5"><button onClick={()=>setSelectedProfile(p)} className="flex-1 h-9 rounded-full bg-zinc-100 text-[13px] font-medium">View</button><button onClick={()=>setInboxUser(p)} className="flex-1 h-9 rounded-full bg-black text-white text-[13px] font-medium">Message</button></div>
              </div>
            ))}
          </div>
        )}

        {activeTab==="merch"&&(
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredMerch.map(item=>{
              const vend=vendors.find(v=>v.id===item.vendorId);
              const country=VENDOR_COUNTRY[item.vendorId];
              return(
                <div key={item.id} className="group relative bg-white rounded-[20px] border border-zinc-200 overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-zinc-300 transition-all">
                  <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden cursor-pointer" onClick={()=>setSelectedMerch(item)}>
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
                    <div className="absolute top-3 left-3 flex gap-1"><span className="text-[10px] bg-white/90 backdrop-blur px-2 py-1 rounded-full border border-zinc-200">{FLAGS[country]||"🏳️"} {vend?.name}</span></div>
                    <div className="absolute bottom-3 right-3 bg-black text-white text-[12px] px-2.5 py-1 rounded-full">${item.price}</div>
                  </div>
                  <div className="p-4">
                    <div className="text-[14px] font-semibold leading-tight">{item.title}</div>
                    <div className="text-[12px] text-zinc-500 mt-1 line-clamp-2">{item.desc}</div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={()=>setSelectedMerch(item)} className="flex-1 h-8 rounded-full bg-zinc-900 text-white text-[12px] font-medium">View</button>
                      <a href={waLink(item.title, item.price, vend?.name)} target="_blank" rel="noopener noreferrer" className="flex-1 h-8 rounded-full bg-[#25D366] text-white text-[12px] font-medium flex items-center justify-center gap-1 hover:bg-[#20bd5a]">💬 WhatsApp</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab==="wall"&&(<div className="max-w-[640px] mx-auto space-y-4">{wall.map(post=>(<div key={post.id} className="bg-white rounded-[20px] border border-zinc-200 overflow-hidden"><div className="p-4 flex items-center gap-3"><img src={post.avatar} className="w-9 h-9 rounded-full object-cover" alt={post.author} /><div><div className="text-[14px] font-semibold">{post.author}</div><div className="text-[11px] text-zinc-500">{post.time}</div></div><div className="ml-auto text-[12px] text-zinc-400">♥ {post.likes}</div></div><div className="px-4 pb-3 text-[14px] leading-[1.5]">{post.text}</div>{post.image&&<img src={post.image} className="w-full max-h-[420px] object-cover" alt="post" />}{post.comments.length>0&&(<div className="p-4 bg-zinc-50 border-t border-zinc-100 space-y-2">{post.comments.map((c,i)=><div key={i} className="text-[12px]"><span className="font-semibold">{c.author}:</span> {c.text}</div>)}</div>)}</div>))}</div>)}
        
        {activeTab==="inbox"&&(<div className="max-w-[760px] mx-auto">{!inboxUser?(<div className="bg-white rounded-[20px] border border-zinc-200 p-8 text-center"><div className="text-3xl mb-3">🔒</div><h3 className="font-semibold">Private inbox — select a profile to message</h3><p className="text-[13px] text-zinc-500 mt-2">Go to Discover, tap Message on any profile.</p></div>):(<div className="bg-white rounded-[20px] border border-zinc-200 overflow-hidden min-h-[560px] flex flex-col"><div className="p-4 border-b flex items-center gap-3"><button onClick={()=>setInboxUser(null)} className="w-8 h-8 bg-zinc-100 rounded-full">←</button><img src={inboxUser.photo} className="w-8 h-8 rounded-full object-cover" alt={inboxUser.name} /><div className="font-semibold text-[14px]">{inboxUser.name} — {inboxUser.city}, {inboxUser.country} {FLAGS[inboxUser.country]||""}</div><span className="ml-auto text-[10px] bg-black text-white px-2 py-1 rounded-full">Inbox</span></div><div className="flex-1 overflow-y-auto p-4 space-y-3">{(chatMessages[inboxUser.id]||[]).length===0&&<div className="text-center text-zinc-400 text-[13px] mt-20">Say hi to {inboxUser.name}!</div>}{(chatMessages[inboxUser.id]||[]).map((m,i)=>(<div key={i} className={`max-w-[78%] rounded-[18px] px-4 py-2 text-[13px] ${m.from==="me"?"bg-black text-white ml-auto rounded-br-[6px]":"bg-zinc-100 rounded-bl-[6px]"}`}>{m.text}</div>))}</div><div className="p-4 border-t flex gap-2"><input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Type a message..." className="flex-1 h-11 rounded-full border border-zinc-200 bg-white px-4 text-[13px] outline-none" /><button onClick={sendChat} className="w-11 h-11 rounded-full bg-black text-white">↑</button></div></div>)}</div>)}

        {activeTab==="admin"&&(
          <div className="max-w-[700px] mx-auto space-y-4">
            <div className="bg-white rounded-[20px] border border-zinc-200 p-6">
              <h2 className="text-[18px] font-semibold">global amor — Dual Admin Access</h2>
              <p className="text-[13px] text-zinc-500 mt-1">Secure admin access — authorized only. Password: admin123</p>
              {!adminUnlocked?(
                <div className="mt-4 flex gap-2"><input type="password" value={adminPass} onChange={e=>setAdminPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&unlockAdmin()} placeholder="Enter admin password" className="flex-1 h-11 rounded-full border border-zinc-200 px-4 text-[13px] outline-none focus:border-black" /><button onClick={unlockAdmin} className="h-11 px-6 rounded-full bg-black text-white text-[13px] font-medium">Unlock</button></div>
              ):(
                <div className="mt-5">
                  <div className="flex gap-2 mb-4">
                    <button id="btnProfiles" onClick={()=>setSubAdminTab("profiles")} className={`h-9 px-5 rounded-full text-[13px] font-medium border ${subAdminTab==="profiles"?"bg-black text-white border-black":"bg-white border-zinc-200"}`}>👤 Profiles ({profiles.length})</button>
                    <button id="btnMerch" onClick={()=>setSubAdminTab("merch")} className={`h-9 px-5 rounded-full text-[13px] font-medium border ${subAdminTab==="merch"?"bg-black text-white border-black":"bg-white border-zinc-200"}`}>Merch ({merch.length})</button>
                    <button onClick={()=>setAdminUnlocked(false)} className="ml-auto h-9 px-4 rounded-full bg-zinc-100 text-[12px]">Lock</button>
                  </div>
                  <div id="separatedContent">
                    {subAdminTab==="profiles"&&(
                      <div id="profilesSeparated" className="bg-white rounded-[20px] border border-zinc-200 p-4">
                        <h3 className="font-bold text-[15px]">👤 Add / Approve New Profiles — global amor</h3>
                        <p className="text-[11px] text-zinc-500 mt-1">SEPARATED from merch — only profile approvals here. Buttons work!</p>
                        <div className="mt-4 space-y-2">
                          {profiles.map(p=>(
                            <div key={p.id} className="flex items-center gap-3 border border-zinc-100 rounded-[12px] p-3">
                              <img src={p.photo} className="w-10 h-10 rounded-full object-cover" alt={p.name} />
                              <div className="flex-1 min-w-0"><div className="text-[13px] font-medium flex items-center gap-1.5"><span>{FLAGS[p.country]||"🏳️"}</span>{p.name} — {p.city}, {p.country} {p.demo?"(DEMO)":""}</div><div className="text-[11px] text-zinc-500 truncate">{p.bio}</div></div>
                              <div className="flex gap-1.5 shrink-0">
                                {p.demo&&<button onClick={()=>approveProfile(p.id)} className="h-8 px-3 rounded-full bg-emerald-600 text-white text-[11px] font-medium hover:bg-emerald-700">Approve</button>}
                                <button onClick={()=>setSelectedProfile(p)} className="h-8 px-3 rounded-full bg-zinc-100 text-[11px]">View</button>
                                <button onClick={()=>deleteProfile(p.id)} className="h-8 px-3 rounded-full bg-red-50 text-red-600 text-[11px] border border-red-200 hover:bg-red-100">Delete</button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button onClick={()=>setShowAddProfile(true)} className="mt-4 w-full h-10 rounded-full bg-black text-white text-[13px]">+ Add New Profile to global amor</button>
                      </div>
                    )}
                    {subAdminTab==="merch"&&(
                      <div id="originalMerchWindow" className="bg-white rounded-[20px] border border-zinc-200 p-4">
                        <div className="flex items-center gap-2"><h3 className="font-bold text-[15px]">Merch — Full Management — global amor</h3><span className="text-[11px] px-2.5 py-1 rounded-full bg-zinc-100 border">{merch.length} items • WhatsApp enabled</span></div>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {merch.map(it=>{
                            const vend=vendors.find(v=>v.id===it.vendorId);
                            return(
                              <div key={it.id} className="rounded-[16px] border border-zinc-200 p-3 flex gap-3">
                                <img src={it.image} className="w-20 h-20 rounded-[12px] object-cover border shrink-0" alt={it.title} />
                                <div className="flex-1 min-w-0">
                                  <div className="text-[13px] font-semibold truncate flex items-center gap-1.5"><span>{FLAGS[VENDOR_COUNTRY[it.vendorId]]||"🏳️"}</span>{it.title}</div>
                                  <div className="text-[11px] text-zinc-500">${it.price} • {vend?.name}</div>
                                  <div className="mt-2 flex gap-1.5 flex-wrap">
                                    <button onClick={()=>setSelectedMerch(it)} className="h-7 px-3 rounded-full bg-zinc-100 text-[11px]">View</button>
                                    <a href={waLink(it.title, it.price, vend?.name)} target="_blank" rel="noopener noreferrer" className="h-7 px-3 rounded-full bg-[#25D366] text-white text-[11px] flex items-center justify-center hover:bg-[#20bd5a]">💬 WhatsApp</a>
                                    <button onClick={()=>deleteMerch(it.id)} className="h-7 px-3 rounded-full bg-red-50 text-red-600 text-[11px] border border-red-200 hover:bg-red-100">Delete</button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <button onClick={()=>setShowAddMerch(true)} className="mt-4 w-full h-10 rounded-full bg-black text-white text-[13px]">+ Add New Item</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedProfile&&(<div className="fixed inset-0 z-50 bg-black/60 backdrop-blur flex items-center justify-center p-4" onClick={()=>setSelectedProfile(null)}><div className="bg-white w-full max-w-[480px] rounded-[24px] overflow-hidden max-h-[92vh] overflow-y-auto" onClick={e=>e.stopPropagation()}><img src={selectedProfile.photo} className="w-full aspect-[4/3] object-cover" alt={selectedProfile.name} /><div className="p-6"><div className="flex justify-between"><h2 className="text-[20px] font-semibold flex items-center gap-2">{FLAGS[selectedProfile.country]||"🏳️"} {selectedProfile.name}, {selectedProfile.age}</h2>{selectedProfile.demo&&<span className="text-[10px] bg-black text-white px-2 py-1 rounded-full">DEMO</span>}</div><div className="text-[13px] text-zinc-500">{selectedProfile.city}, {selectedProfile.country}</div><p className="text-[14px] mt-4 leading-[1.5]">{selectedProfile.bio}</p><div className="mt-6 flex gap-2"><button onClick={()=>{setInboxUser(selectedProfile);setSelectedProfile(null);}} className="flex-1 h-11 rounded-full bg-black text-white text-[14px] font-medium">Message</button><button onClick={()=>setSelectedProfile(null)} className="flex-1 h-11 rounded-full bg-zinc-100 text-[14px] font-medium">Close</button></div></div></div></div>)}
      
      {selectedMerch&&(<div className="fixed inset-0 z-50 bg-black/60 backdrop-blur flex items-center justify-center p-4" onClick={()=>setSelectedMerch(null)}><div className="bg-white w-full max-w-[520px] rounded-[24px] overflow-hidden" onClick={e=>e.stopPropagation()}><img src={selectedMerch.image} className="w-full h-[320px] object-cover" alt={selectedMerch.title} /><div className="p-6"><div className="flex justify-between items-start"><h2 className="text-[18px] font-semibold">{selectedMerch.title}</h2><span className="bg-black text-white px-3 py-1 rounded-full text-[13px]">${selectedMerch.price}</span></div><div className="text-[12px] text-zinc-500 mt-1">{vendors.find(v=>v.id===selectedMerch.vendorId)?.name} • {FLAGS[VENDOR_COUNTRY[selectedMerch.vendorId]]||""} {VENDOR_COUNTRY[selectedMerch.vendorId]}</div><p className="text-[13px] mt-3">{selectedMerch.desc}</p><div className="mt-6 flex gap-2"><a href={waLink(selectedMerch.title, selectedMerch.price, vendors.find(v=>v.id===selectedMerch.vendorId)?.name)} target="_blank" rel="noopener noreferrer" className="flex-1 h-11 rounded-full bg-[#25D366] text-white text-[14px] font-medium flex items-center justify-center gap-1.5 hover:bg-[#20bd5a]">💬 WhatsApp Vendor</a><button onClick={()=>setSelectedMerch(null)} className="flex-1 h-11 rounded-full bg-zinc-100 text-[14px] font-medium">Close</button></div></div></div></div>)}

      {showAddProfile&&(<div className="fixed inset-0 z-50 bg-black/60 backdrop-blur flex items-end sm:items-center justify-center p-4"><form onSubmit={handleCreateProfile} className="bg-white w-full max-w-[520px] rounded-[24px] p-6 max-h-[92vh] overflow-y-auto"><div className="flex justify-between items-center mb-4"><h2 className="text-[18px] font-semibold">Add Profile to global amor</h2><button type="button" onClick={()=>setShowAddProfile(false)} className="w-8 h-8 bg-zinc-100 rounded-full">✕</button></div><div className="grid grid-cols-2 gap-3"><input required value={newProfile.name} onChange={e=>setNewProfile({...newProfile,name:e.target.value})} placeholder="Name" className="h-11 rounded-full border border-zinc-200 px-4 text-[13px] outline-none" /><input required type="number" value={newProfile.age} onChange={e=>setNewProfile({...newProfile,age:e.target.value})} placeholder="Age" className="h-11 rounded-full border border-zinc-200 px-4 text-[13px] outline-none" /><select value={newProfile.country} onChange={e=>setNewProfile({...newProfile,country:e.target.value})} className="h-11 rounded-full border border-zinc-200 px-4 text-[13px]">{COUNTRIES.filter(c=>c!=="All Countries").map(c=><option key={c}>{c}</option>)}</select><input value={newProfile.city} onChange={e=>setNewProfile({...newProfile,city:e.target.value})} placeholder="City" className="h-11 rounded-full border border-zinc-200 px-4 text-[13px] outline-none" /></div><input value={newProfile.photo} onChange={e=>setNewProfile({...newProfile,photo:e.target.value})} placeholder="Photo URL (optional)" className="w-full mt-3 h-11 rounded-full border border-zinc-200 px-4 text-[13px] outline-none" /><textarea value={newProfile.bio} onChange={e=>setNewProfile({...newProfile,bio:e.target.value})} placeholder="Bio" rows={3} className="w-full mt-3 rounded-[16px] border border-zinc-200 p-4 text-[13px] outline-none resize-none"></textarea><button type="submit" className="w-full mt-4 h-11 rounded-full bg-black text-white text-[14px] font-medium">Create Profile</button></form></div>)}
      
      {showAddMerch&&(<div className="fixed inset-0 z-50 bg-black/60 backdrop-blur flex items-end sm:items-center justify-center p-4"><form onSubmit={handleCreateMerch} className="bg-white w-full max-w-[520px] rounded-[24px] p-6"><div className="flex justify-between items-center mb-4"><h2 className="text-[18px] font-semibold">Add Item to global amor</h2><button type="button" onClick={()=>setShowAddMerch(false)} className="w-8 h-8 bg-zinc-100 rounded-full">✕</button></div><input required value={newMerch.title} onChange={e=>setNewMerch({...newMerch,title:e.target.value})} placeholder="Title" className="w-full h-11 rounded-full border border-zinc-200 px-4 text-[13px] outline-none" /><div className="grid grid-cols-2 gap-3 mt-3"><input type="number" value={newMerch.price} onChange={e=>setNewMerch({...newMerch,price:e.target.value})} placeholder="Price" className="h-11 rounded-full border border-zinc-200 px-4 text-[13px] outline-none" /><select value={newMerch.vendorId} onChange={e=>setNewMerch({...newMerch,vendorId:e.target.value})} className="h-11 rounded-full border border-zinc-200 px-4 text-[13px]">{vendors.map(v=><option key={v.id} value={v.id}>{v.name}</option>)}</select></div><input value={newMerch.image} onChange={e=>setNewMerch({...newMerch,image:e.target.value})} placeholder="Image URL" className="w-full mt-3 h-11 rounded-full border border-zinc-200 px-4 text-[13px] outline-none" /><textarea value={newMerch.desc} onChange={e=>setNewMerch({...newMerch,desc:e.target.value})} placeholder="Description" rows={2} className="w-full mt-3 rounded-[16px] border border-zinc-200 p-4 text-[13px] outline-none resize-none"></textarea><button type="submit" className="w-full mt-4 h-11 rounded-full bg-black text-white text-[14px] font-medium">Add Item</button></form></div>)}

      <button onClick={()=>setShowAddProfile(true)} className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full shadow-xl flex items-center justify-center text-2xl font-light z-40">+</button>
    </div>
  );
}
