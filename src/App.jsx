import { useState, useEffect } from 'react';

const INITIAL_PROFILES = [
  { id: 1, name: "Sofia", age: 24, location: "Madrid, ES", bio: "Designer who loves late night tapas and gallery hopping. Looking for real connections.", image: "https://i.pravatar.cc/400?img=5", interests: ["Art", "Travel", "Coffee"], isDemo: true },
  { id: 2, name: "Kenji", age: 27, location: "Tokyo, JP", bio: "Photographer capturing street moments. Always up for an adventure.", image: "https://i.pravatar.cc/400?img=8", interests: ["Photo", "Hiking", "Music"], isDemo: true },
  { id: 3, name: "Luna", age: 23, location: "Lisbon, PT", bio: "Yoga instructor & plant mom. Let's find the best sunset spot.", image: "https://i.pravatar.cc/400?img=23", interests: ["Yoga", "Plants", "Beach"], isDemo: true },
  { id: 4, name: "Diego", age: 28, location: "Mexico City, MX", bio: "Chef by day, DJ by night. I can make you the best tacos.", image: "https://i.pravatar.cc/400?img=15", interests: ["Food", "Music", "Dancing"], isDemo: true },
  { id: 5, name: "Ava", age: 25, location: "Berlin, DE", bio: "Techno lover and vintage hunter. New in town, show me around?", image: "https://i.pravatar.cc/400?img=32", interests: ["Techno", "Vintage", "Cycling"], isDemo: true },
  { id: 6, name: "Mateo", age: 26, location: "Buenos Aires, AR", bio: "Writer working on my first novel. Coffee is my fuel.", image: "https://i.pravatar.cc/400?img=16", interests: ["Books", "Coffee", "Cinema"], isDemo: true },
  { id: 7, name: "Chloe", age: 22, location: "Paris, FR", bio: "Art student, loves thrift stores and croissants.", image: "https://i.pravatar.cc/400?img=26", interests: ["Art", "Fashion", "Baking"], isDemo: true },
  { id: 8, name: "Rafa", age: 29, location: "Rio, BR", bio: "Surfer and personal trainer. Let's catch waves together.", image: "https://i.pravatar.cc/400?img=12", interests: ["Surf", "Fitness", "Travel"], isDemo: true },
  { id: 9, name: "Mia", age: 24, location: "Barcelona, ES", bio: "Architect with a love for rooftop bars.", image: "https://i.pravatar.cc/400?img=31", interests: ["Design", "Rooftops", "Cats"], isDemo: true },
  { id: 10, name: "Alex", age: 27, location: "NYC, US", bio: "Music producer. Always searching for new sounds.", image: "https://i.pravatar.cc/400?img=7", interests: ["Music", "Studio", "Nightlife"], isDemo: true },
  { id: 11, name: "Isabella", age: 26, location: "Rome, IT", bio: "Foodie tour guide. I know all the hidden trattorias.", image: "https://i.pravatar.cc/400?img=29", interests: ["Food", "History", "Wine"], isDemo: true },
  { id: 12, name: "Leo", age: 28, location: "Amsterdam, NL", bio: "Cyclist, coder, and coffee snob. Let's build something.", image: "https://i.pravatar.cc/400?img=19", interests: ["Code", "Bike", "Coffee"], isDemo: true },
];

const SHOP_PRODUCTS = [
  { id: 1, name: "Encuentro Tee", price: "$28", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
  { id: 2, name: "Amor Hoodie", price: "$58", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
  { id: 3, name: "Heart Cap", price: "$22", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400" },
  { id: 4, name: "Tote Bag", price: "$18", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400" },
  { id: 5, name: "Sticker Pack", price: "$12", image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400" },
  { id: 6, name: "Love Mug", price: "$16", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400" },
  { id: 7, name: "Poster Set", price: "$24", image: "https://images.unsplash.com/photo-1586717041483-d91ba57e9d59?w=400" },
  { id: 8, name: "Beanie", price: "$20", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400" },
];

const INITIAL_WALL_POSTS = [
  { id: 1, author: "Sofia", avatar: "https://i.pravatar.cc/100?img=5", text: "Just landed in Lisbon for a week! Anyone know a good co-working spot?", likes: 12, liked: false, comments: [{ user: "Mateo", text: "Try Outsite! Great vibe" }], time: "2h ago" },
  { id: 2, author: "Kenji", avatar: "https://i.pravatar.cc/100?img=8", text: "Shot this on film last night in Shinjuku. What do you think?", likes: 24, liked: true, comments: [], time: "5h ago" },
  { id: 3, author: "Luna", avatar: "https://i.pravatar.cc/100?img=23", text: "Hosting a small sunset yoga this Sunday at the park. DM for details 🧘‍♀️", likes: 18, liked: false, comments: [{ user: "Ava", text: "I'm in!" }, { user: "Diego", text: "Count me in" }], time: "1d ago" },
];

const INITIAL_VENDORS = [
  { id: 1, name: "Café del Amor", category: "Coffee & Brunch", products: 12 },
  { id: 2, name: "Bloom Studio", category: "Flowers & Gifts", products: 8 },
  { id: 3, name: "Vinyl & Vibes", category: "Music Store", products: 24 },
  { id: 4, name: "Sabor Latino", category: "Restaurant", products: 15 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [profiles, setProfiles] = useState(INITIAL_PROFILES);
  const [saved, setSaved] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showChat, setShowChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [chatInput, setChatInput] = useState('');
  const [wallPosts, setWallPosts] = useState(INITIAL_WALL_POSTS);
  const [newPostText, setNewPostText] = useState('');
  const [vendors, setVendors] = useState(INITIAL_VENDORS);
  const [editingVendor, setEditingVendor] = useState(null);
  const [editVendorName, setEditVendorName] = useState('');
  const [ageVerified, setAgeVerified] = useState(false);
  const [newProfileForm, setNewProfileForm] = useState({ name: '', age: '', bio: '', location: '' });

  useEffect(() => {
    const savedData = localStorage.getItem('encuentro-saved');
    const verified = localStorage.getItem('encuentro-18plus');
    if (savedData) setSaved(JSON.parse(savedData));
    if (verified) setAgeVerified(true);
    const storedProfiles = localStorage.getItem('encuentro-profiles');
    if (storedProfiles) {
      try { setProfiles(JSON.parse(storedProfiles)); } catch(e){}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('encuentro-saved', JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    localStorage.setItem('encuentro-profiles', JSON.stringify(profiles));
  }, [profiles]);

  const filteredProfiles = profiles.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSave = (id) => {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleLikeWall = (postId) => {
    setWallPosts(posts => posts.map(p => p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    const newPost = { id: Date.now(), author: "You", avatar: "https://i.pravatar.cc/100?img=1", text: newPostText, likes: 0, liked: false, comments: [], time: "now" };
    setWallPosts([newPost, ...wallPosts]);
    setNewPostText('');
  };

  const handleCreateProfile = (e) => {
    e.preventDefault();
    if (!newProfileForm.name || !newProfileForm.age) return;
    const newP = {
      id: Date.now(),
      name: newProfileForm.name,
      age: parseInt(newProfileForm.age),
      bio: newProfileForm.bio || "New here, excited to meet people!",
      location: newProfileForm.location || "Global",
      image: `https://i.pravatar.cc/400?img=${Math.floor(Math.random()*60)+1}`,
      interests: ["New", "Encuentro"],
      isDemo: false
    };
    setProfiles([newP, ...profiles]);
    setNewProfileForm({ name: '', age: '', bio: '', location: '' });
    setShowCreate(false);
    setActiveTab('discover');
  };

  const handleSendChat = () => {
    if (!chatInput.trim() || !showChat) return;
    const msg = { from: 'me', text: chatInput, time: new Date().toLocaleTimeString() };
    setChatMessages(prev => ({
      ...prev,
      [showChat.id]: [...(prev[showChat.id] || []), msg]
    }));
    setChatInput('');
    setTimeout(() => {
      const reply = { from: 'them', text: "Hey! Thanks for reaching out ❤️ Let's chat soon!", time: new Date().toLocaleTimeString() };
      setChatMessages(prev => ({
        ...prev,
        [showChat.id]: [...(prev[showChat.id] || []), reply]
      }));
    }, 1200);
  };

  const startEditVendor = (vendor) => {
    setEditingVendor(vendor.id);
    setEditVendorName(vendor.name);
  };

  const saveVendorName = (id) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, name: editVendorName } : v));
    setEditingVendor(null);
  };

  if (!ageVerified) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-sm w-full bg-zinc-900 rounded-3xl p-8 text-center border border-zinc-800">
          <div className="text-5xl mb-4">🔞</div>
          <h1 className="text-2xl font-bold mb-2">Encuentro is 18+</h1>
          <p className="text-zinc-400 mb-6 text-sm">This is a dating community for adults. Please confirm you are 18 or older to continue.</p>
          <button onClick={() => { setAgeVerified(true); localStorage.setItem('encuentro-18plus', 'true'); }} className="w-full bg-white text-black rounded-full py-3 font-bold hover:bg-zinc-200">I am 18+ - Enter</button>
          <p className="text-xs text-zinc-600 mt-4">Members: {profiles.length} • Online now: 7</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 pb-24 font-sans">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-zinc-200">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold">e</div>
            <span className="font-bold text-lg">encuentro</span>
            <span className="text-xs bg-zinc-100 px-2 py-0.5 rounded-full ml-1">{profiles.length} members</span>
          </div>
          <div className="relative">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" className="bg-zinc-100 rounded-full px-4 py-1.5 text-sm w-28 focus:w-40 transition-all outline-none" />
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-4">
        {activeTab === 'discover' && (
          <div className="grid grid-cols-2 gap-3">
            {filteredProfiles.map(p => (
              <div key={p.id} className="bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-sm relative group">
                {p.isDemo && <span className="absolute top-2 left-2 z-10 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded-full backdrop-blur">DEMO</span>}
                <div className="aspect-[4/5] relative cursor-pointer" onClick={() => setSelectedProfile(p)}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <h3 className="text-white font-bold">{p.name}, {p.age}</h3>
                    <p className="text-white/70 text-xs">{p.location}</p>
                  </div>
                </div>
                <div className="p-2.5 flex gap-1.5">
                  <button onClick={() => toggleSave(p.id)} className={`flex-1 rounded-full py-1.5 text-sm font-medium ${saved.includes(p.id) ? 'bg-black text-white' : 'bg-zinc-100'}`}>{saved.includes(p.id) ? '♥ Saved' : '♡ Save'}</button>
                  <button onClick={() => setShowChat(p)} className="flex-1 bg-zinc-900 text-white rounded-full py-1.5 text-sm font-medium">Message</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'shop' && (
          <div>
            <h2 className="text-xl font-bold mb-3">Shop</h2>
            <div className="grid grid-cols-2 gap-3">
              {SHOP_PRODUCTS.map(prod => (
                <div key={prod.id} className="bg-white rounded-2xl overflow-hidden border border-zinc-200">
                  <img src={prod.image} className="w-full aspect-square object-cover" alt={prod.name} />
                  <div className="p-3 flex justify-between items-center">
                    <span className="text-sm font-medium">{prod.name}</span>
                    <span className="text-sm font-bold">{prod.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'wall' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-zinc-200">
              <textarea value={newPostText} onChange={e => setNewPostText(e.target.value)} placeholder="Share something with the community..." className="w-full bg-zinc-50 rounded-xl p-3 text-sm outline-none resize-none" rows={3}></textarea>
              <button onClick={handleCreatePost} className="mt-2 bg-black text-white rounded-full px-5 py-2 text-sm font-bold w-full">Post</button>
            </div>
            {wallPosts.map(post => (
              <div key={post.id} className="bg-white rounded-2xl p-4 border border-zinc-200">
                <div className="flex items-center gap-2 mb-2">
                  <img src={post.avatar} className="w-8 h-8 rounded-full" alt={post.author} />
                  <div><div className="text-sm font-bold">{post.author}</div><div className="text-xs text-zinc-500">{post.time}</div></div>
                </div>
                <p className="text-sm mb-3">{post.text}</p>
                <div className="flex gap-4 text-sm text-zinc-600">
                  <button onClick={() => handleLikeWall(post.id)} className={post.liked ? 'text-red-500 font-bold' : ''}>♥ {post.likes} likes</button>
                  <span>💬 {post.comments.length} comments</span>
                </div>
                {post.comments.length > 0 && (
                  <div className="mt-3 bg-zinc-50 rounded-xl p-2.5 space-y-1">
                    {post.comments.map((c,i) => <div key={i} className="text-xs"><span className="font-bold">{c.user}: </span>{c.text}</div>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'vendors' && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Vendors</h2>
            <p className="text-sm text-zinc-500">Tap edit to rename your stores - this was the bug you fixed.</p>
            {vendors.map(v => (
              <div key={v.id} className="bg-white rounded-2xl p-4 border border-zinc-200 flex justify-between items-center">
                <div className="flex-1">
                  {editingVendor === v.id ? (
                    <div className="flex gap-2">
                      <input value={editVendorName} onChange={e => setEditVendorName(e.target.value)} className="bg-zinc-100 rounded-full px-3 py-1 text-sm flex-1 outline-none" />
                      <button onClick={() => saveVendorName(v.id)} className="bg-black text-white rounded-full px-4 py-1 text-sm">Save</button>
                    </div>
                  ) : (
                    <>
                      <div className="font-bold text-sm">{v.name}</div>
                      <div className="text-xs text-zinc-500">{v.category} • {v.products} products</div>
                    </>
                  )}
                </div>
                {editingVendor !== v.id && <button onClick={() => startEditVendor(v)} className="text-xs bg-zinc-100 rounded-full px-3 py-1.5">Edit</button>}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            <h2 className="text-xl font-bold mb-3">Saved ({saved.length})</h2>
            {saved.length === 0 ? <div className="text-center py-20 text-zinc-400 text-sm">No saved profiles yet. Tap ♡ on Discover to save.</div> :
              <div className="grid grid-cols-2 gap-3">
                {profiles.filter(p => saved.includes(p.id)).map(p => (
                  <div key={p.id} className="bg-white rounded-3xl overflow-hidden border border-zinc-200">
                    <img src={p.image} className="w-full aspect-[4/5] object-cover" alt={p.name} />
                    <div className="p-2.5">
                      <div className="font-bold text-sm">{p.name}, {p.age}</div>
                      <div className="text-xs text-zinc-500">{p.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            }
          </div>
        )}
      </div>

      {/* Profile Detail */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur flex items-end justify-center p-4" onClick={() => setSelectedProfile(null)}>
          <div className="bg-white w-full max-w-md rounded-[2rem] overflow-hidden max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <img src={selectedProfile.image} className="w-full aspect-[4/3] object-cover" alt={selectedProfile.name} />
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div><h2 className="text-2xl font-bold">{selectedProfile.name}, {selectedProfile.age}</h2><p className="text-zinc-500 text-sm">{selectedProfile.location}</p></div>
                {selectedProfile.isDemo && <span className="text-xs bg-zinc-900 text-white px-2 py-1 rounded-full">DEMO</span>}
              </div>
              <p className="text-sm mb-4">{selectedProfile.bio}</p>
              <div className="flex gap-2 mb-6">{selectedProfile.interests.map(i => <span key={i} className="text-xs bg-zinc-100 px-3 py-1 rounded-full">{i}</span>)}</div>
              <div className="flex gap-2">
                <button onClick={() => { toggleSave(selectedProfile.id); setSelectedProfile(null); }} className="flex-1 bg-zinc-100 rounded-full py-3 font-bold text-sm">{saved.includes(selectedProfile.id) ? '♥ Saved' : '♡ Save'}</button>
                <button onClick={() => { setShowChat(selectedProfile); setSelectedProfile(null); }} className="flex-1 bg-black text-white rounded-full py-3 font-bold text-sm">Message</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat */}
      {showChat && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="p-4 border-b flex items-center gap-3">
            <button onClick={() => setShowChat(null)} className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center">←</button>
            <img src={showChat.image} className="w-8 h-8 rounded-full" alt={showChat.name} />
            <div className="font-bold text-sm">{showChat.name}</div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {(chatMessages[showChat.id] || []).length === 0 && <div className="text-center text-zinc-400 text-sm mt-20">Say hi to {showChat.name}! 👋</div>}
            {(chatMessages[showChat.id] || []).map((m,i) => (
              <div key={i} className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${m.from === 'me' ? 'bg-black text-white ml-auto rounded-br-sm' : 'bg-zinc-100 rounded-bl-sm'}`}>{m.text}</div>
            ))}
          </div>
          <div className="p-4 border-t flex gap-2">
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendChat()} placeholder="Type a message..." className="flex-1 bg-zinc-100 rounded-full px-4 py-3 text-sm outline-none" />
            <button onClick={handleSendChat} className="bg-black text-white rounded-full w-11 h-11 flex items-center justify-center">↑</button>
          </div>
        </div>
      )}

      {/* Create Profile - FIXED + BUTTON */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur flex items-end justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2rem] p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create Profile</h2>
              <button onClick={() => setShowCreate(false)} className="w-8 h-8 bg-zinc-100 rounded-full">✕</button>
            </div>
            <form onSubmit={handleCreateProfile} className="space-y-3">
              <input required value={newProfileForm.name} onChange={e => setNewProfileForm({...newProfileForm, name: e.target.value})} placeholder="Name" className="w-full bg-zinc-100 rounded-full px-4 py-3 text-sm outline-none" />
              <input required type="number" value={newProfileForm.age} onChange={e => setNewProfileForm({...newProfileForm, age: e.target.value})} placeholder="Age" className="w-full bg-zinc-100 rounded-full px-4 py-3 text-sm outline-none" />
              <input value={newProfileForm.location} onChange={e => setNewProfileForm({...newProfileForm, location: e.target.value})} placeholder="Location (e.g. Madrid, ES)" className="w-full bg-zinc-100 rounded-full px-4 py-3 text-sm outline-none" />
              <textarea value={newProfileForm.bio} onChange={e => setNewProfileForm({...newProfileForm, bio: e.target.value})} placeholder="Bio" rows={3} className="w-full bg-zinc-100 rounded-2xl px-4 py-3 text-sm outline-none resize-none"></textarea>
              <button type="submit" className="w-full bg-black text-white rounded-full py-3 font-bold">Create & Publish</button>
            </form>
          </div>
        </div>
      )}

      {/* Floating + Button - NOW FIXED */}
      <button onClick={() => setShowCreate(true)} className="fixed bottom-20 right-4 w-14 h-14 bg-black text-white rounded-full shadow-xl flex items-center justify-center text-2xl font-light z-40">+</button>

      {/* Bottom Tabs */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200">
        <div className="max-w-xl mx-auto flex justify-around py-2">
          {[
            { id: 'discover', label: 'Discover', icon: '◍' },
            { id: 'shop', label: 'Shop', icon: '◫' },
            { id: 'wall', label: 'Wall', icon: '◧' },
            { id: 'vendors', label: 'Vendors', icon: '◐' },
            { id: 'saved', label: `Saved (${saved.length})`, icon: '♥' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center px-3 py-1 rounded-xl ${activeTab === tab.id ? 'text-black font-bold' : 'text-zinc-400'}`}>
              <span className="text-lg">{tab.icon}</span>
              <span className="text-[10px]">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
