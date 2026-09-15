import { useState, useEffect, useRef } from 'react';

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
  const [wall,setWall]=useState(INITIAL_WALL);
  const [wallText,setWallText]=useState("");
  const [wallImage,setWallImage]=useState("");
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
  const [editMerchForm,setEditMerchForm]=useState({title:"",price:20,vendorId:"v1",desc:"",image:""});
  const wallFileRef=useRef(null);
  const merchFileRef=useRef(null);
  const editMerchFileRef=useRef(null);
  const profileFileRef=useRef(null);

  useEffect(()=>{const v=localStorage.getItem("ga_18plus");const p=localStorage.getItem("ga_profiles");const m=localStorage.getItem("ga_merch");if(v)setAgeVerified(true);if(p){try{setProfiles(JSON.parse(p));}catch{}}if(m){try{setMerch(JSON.parse(m));}catch{}}},[]);
  useEffect(()=>{localStorage.setItem("ga_profiles",JSON.stringify(profiles));},[profiles]);
  useEffect(()=>{localStorage.setItem("ga_merch",JSON.stringify(merch));},[merch]);

  const filteredProfiles = (()=>{let out=profiles;if(countryFilter!=="All Countries")out=out.filter(pr=>pr.country===countryFilter);if(searchProfiles.trim()){const s=searchProfiles.toLowerCase();out=out.filter(pr=>pr.name.toLowerCase().includes(s)||pr.city.toLowerCase().includes(s)||pr.bio.toLowerCase().includes(s));}return out;})();
  const filteredMerch = (()=>{let out=merch;if(countryFilter!=="All Countries")out=out.filter(it=>VENDOR_COUNTRY[it.vendorId]===countryFilter);if(vendorFilter!=="All Vendors")out=out.filter(it=>vendors.find(v=>v.id===it.vendorId)?.name===vendorFilter);if(searchMerch.trim()){const s=searchMerch.toLowerCase();out=out.filter(it=>it.title.toLowerCase().includes(s)||it.desc.toLowerCase().includes(s));}return out;})();

  const handleCreateProfile=(e)=>{e.preventDefault();if(!newProfile.name||!newProfile.age)return;const np={id:"p"+Date.now(),name:newProfile.name,age:parseInt(newProfile.age),country:newProfile.country,city:newProfile.city||"Unknown",bio:newProfile.bio||"New here!",photo:newProfile.photo||`https://i.pravatar.cc/400?img=${Math.floor(Math.random()*60)+1}`,demo:false};setProfiles([np,...profiles]);setNewProfile({name:"",age:"",country:"Colombia",city:"",bio:"",photo:""});setShowAddProfile(false);};
  const handleCreateMerch=(e)=>{e.preventDefault();if(!newMerch.title)return;const nm={id:"m"+Date.now(),title:newMerch.title,price:parseInt(newMerch.price),vendorId:newMerch.vendorId,image:newMerch.image||"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",desc:newMerch.desc};setMerch([nm,...merch]);setShowAddMerch(false);setNewMerch({title:"",price:20,vendorId:"v1",desc:"",image:""});};
  const handleEditMerch=(e)=>{e.preventDefault();if(!editingMerch)return;setMerch(merch.map(m=>m.id===editingMerch.id?{...m,title:editMerchForm.title,price:parseInt(editMerchForm.price),vendorId:editMerchForm.vendorId,desc:editMerchForm.desc,image:editMerchForm.image}:m));setEditingMerch(null);};
  const startEditMerch=(item)=>{setEditingMerch(item);setEditMerchForm({title:item.title,price:item.price,vendorId:item.vendorId,desc:item.desc,image:item.image});};
  const deleteProfile=(id)=>{if(confirm("Delete this profile?"))setProfiles(profiles.filter(p=>p.id!==id));};
  const deleteMerch=(id)=>{if(confirm("Delete this merch item?"))setMerch(merch.filter(m=>m.id!==id));};
  const approveProfile=(id)=>{setProfiles(profiles.map(p=>p.id===id?{...p,demo:false}:p));};
  const handleFileUpload=(e,setter,current)=>{const file=e.target.files?.[0]; if(!file)return; const reader=new FileReader(); reader.onload=(ev)=>{setter({...current,image:ev.target.result});}; reader.readAsDataURL(file);};
  const handleWallFileUpload=(e)=>{const file=e.target.files?.[0]; if(!file)return; const reader=new FileReader(); reader.onload=(ev)=>{setWallImage(ev.target.result);}; reader.readAsDataURL(file);};
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
          <div className="mt-4 flex justify-center gap-3 text-
