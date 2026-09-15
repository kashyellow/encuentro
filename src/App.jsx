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
  const [editingMerch,setEditingMerch]=useState(null);

  useEffect(()=>{const v=localStorage.getItem("ga_18plus");const p=localStorage.getItem("ga_profiles");const m=localStorage.getItem("ga_merch");if(v)setAgeVerified(true);if(p){try{setProfiles(JSON.parse(p));}catch{}}if(m){try{setMerch(JSON.parse(m));}catch{}}},[]);
  useEffect(()=>{localStorage.setItem("ga_profiles",JSON.stringify(profiles));},[profiles]);
  useEffect(()=>{localStorage.setItem("ga_merch",JSON.stringify(merch));},[merch]);

  const filteredProfiles = (()=>{let out=profiles;if(countryFilter!=="All Countries")out=out.filter(pr=>pr.country===countryFilter);if(searchProfiles.trim()){const s=searchProfiles.toLowerCase();out=out.filter(pr=>pr.name.toLowerCase().includes(s)||pr.city.toLowerCase().includes(s)||pr.bio.toLowerCase().includes(s));}return out;})();
  const filteredMerch = (()=>{let out=merch;if(countryFilter!=="All Countries")out=out.filter(it=>VENDOR_COUNTRY[it.vendorId]===countryFilter);if(vendorFilter!=="All Vendors")out=out.filter(it=>vendors.find(v=>v.id===it.vendorId)?.name===vendorFilter);if(searchMerch.trim()){const s=searchMerch.toLowerCase();out=out.filter(it=>it.title.toLowerCase().includes(s)||it.desc.toLowerCase().includes(s));}return out;})();

  const handleCreateProfile=(e)=>{e.preventDefault();if(!newProfile.name||!newProfile.age)return;const np={id:"p"+Date.now(),name:newProfile.name,age:parseInt(newProfile.age),country:newProfile.country,city:newProfile.city||"Unknown",bio:newProfile.bio||"New here!",photo:newProfile.photo||`https://i.pravatar.cc/400?img=${Math.floor(Math.random()*60)+1}`,demo:false};setProfiles([np,...profiles]);setNewProfile({name:"",age:"",country:"Colombia",city:"",bio:"",photo:""});setShowAddProfile(false);};
  const handleCreateMerch=(e)=>{e.preventDefault();if(!newMerch.title)return;if(editingMerch){setMerch(merch.map(m=>m.id===editingMerch.id?{...m,title:newMerch.title,price:parseInt(newMerch.price),vendorId:newMerch.vendorId,image:newMerch.image||m.image,desc:newMerch.desc}:m));setEditingMerch(null);}else{const nm={id:"m"+Date.now(),title:newMerch.title,price:parseInt(newMerch.price),vendorId:newMerch.vendorId,image:newMerch.image||"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",desc:newMerch.desc};setMerch([nm,...merch]);}setShowAddMerch(false);setNewMerch({title:"",price:20,vendorId:"v1",desc:"",image:""});};
  const startEditMerch=(item)=>{setNewMerch({title:item.title,price:item.price,vendorId:item.vendorId,desc:item.desc,image:item.image});setEditingMerch(item);setShowAddMerch(true);};
  const closeMerchModal=()=>{setShowAddMerch(false);setEditingMerch(null);setNewMerch({title:"",price:20,vendorId:"v1",desc:"",image:""});};
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
        </div>
      </div>
    );
  }

  return(
    <div className="min-h-screen bg-[#fafafa] text-zinc-900">
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

      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-zinc-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3"><div><div className="font-bold tracking-tight leading-none">global amor</div></div></div>
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
                <div key={item.id} className="group relative bg-white rounded-[20px] border border-zinc-200 overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0
