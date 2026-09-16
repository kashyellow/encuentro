export const INITIAL_PROFILES = [
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
export const INITIAL_VENDORS = [{id:"v1",name:"Casa Amor Atelier",owner:"Sofia"},{id:"v2",name:"Kyoto Paper Studio",owner:"Yuki"},{id:"v3",name:"Alpine Collective",owner:"Léa"},{id:"v4",name:"Panama Mar",owner:"Maya"},{id:"v5",name:"Rio Sun Club",owner:"Larissa"},{id:"v6",name:"Costa Vida",owner:"Valentina"},{id:"v7",name:"Tulum Goods",owner:"Lucia"},{id:"v8",name:"Caracas Color",owner:"Gabriela"}];
export const INITIAL_MERCH = [
  {id:"m1",title:"Amor Linen Tote - Natural",price:28,vendorId:"v1",image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",desc:"Hand-stitched tote, natural canvas, limited run."},
  {id:"m2",title:"Kyoto Postcard Set (12)",price:18,vendorId:"v2",image:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80",desc:"Risograph postcards from Kyoto streets."},
  {id:"m3",title:"Alpine Wool Cap",price:42,vendorId:"v3",image:"https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80",desc:"Merino wool, embroidered heart."},
  {id:"m4",title:"Panama Shell Necklace",price:36,vendorId:"v4",image:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",desc:"Recycled shells, brass clasp."},
  {id:"m5",title:"Rio Sun Tee - Washed",price:32,vendorId:"v5",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",desc:"Organic cotton, soft wash."},
  {id:"m6",title:"Costa Rica Coffee - 250g",price:22,vendorId:"v6",image:"https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80",desc:"Single origin, Tarrazú beans."},
  {id:"m7",title:"Tulum Clay Mug",price:26,vendorId:"v7",image:"https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=600&q=80",desc:"Wheel-thrown, glazed interior."},
  {id:"m8",title:"Caracas Print - Limited",price:55,vendorId:"v8",image:"https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80",desc:"A3 giclée, signed by artist."},
];
export const INITIAL_WALL = [
  {id:"w1",author:"Sofia",avatar:INITIAL_PROFILES[0].photo,text:"First market day in Medellín! Sold out of totes in 2 hours. Gracias comunidad 💛",image:"https://images.unsplash.com/photo-1555529771-7888783a18d3?w=800&q=80",likes:24,comments:[{author:"Maya",text:"So proud of you!"}],time:"2h ago"},
  {id:"w2",author:"Yuki",avatar:INITIAL_PROFILES[2].photo,text:"New postcard set dropping tomorrow. Kyoto in winter light.",likes:18,comments:[],time:"5h ago"},
  {id:"w3",author:"Valentina",avatar:INITIAL_PROFILES[9].photo,text:"Beach cleanup in Nosara today - 12kg plastic collected. Anyone want to join next Saturday?",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",likes:41,comments:[{author:"Larissa",text:"Count me in!"},{author:"Lucia",text:"Amazing work"}],time:"1d ago"},
];
