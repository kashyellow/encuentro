// ENCUENTRO Wall - Add-on (Supabase Shared - Ready)
(function() {
  const SUPABASE_URL = 'https://ygacbyhuetmwfcayuixv.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnYWNieWh1ZXRtd2ZjYXl1aXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1Mjg2ODAsImV4cCI6MjEwNDEwNDY4MH0.uR9yrUL2L3d69iNY8GzKkfjaAZ0M3LkNTZgifR4AxWk';
  const TABLE = 'encuentro_profiles';

  const style = document.createElement('style');
  style.textContent = `
    #encuentro-wall { max-width: 900px; margin: 40px auto; padding: 0 16px; font-family: inherit; }
    #encuentro-wall h2 { font-size: 28px; font-weight: 800; margin-bottom: 6px; }
    #encuentro-wall .sub { opacity:0.6; font-size:14px; margin-bottom:16px; }
    .wall-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
    .wall-card { border-radius: 16px; padding: 16px; background: #fff; box-shadow: 0 4px 18px rgba(0,0,0,0.08); border: 1px solid #eee; animation: fadeIn .3s; }
    @keyframes fadeIn { from { opacity:0; transform: translateY(8px)} to {opacity:1; transform:none} }
    .wall-card img { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; }
    .wall-card h3 { margin: 12px 0 4px; font-size: 18px; }
    .wall-card p { margin: 0; opacity: 0.7; font-size: 14px; }
    #encuentro-bottom-bar { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: #111; color: #fff; border-radius: 999px; padding: 10px 18px; display: flex; gap: 18px; align-items: center; box-shadow: 0 10px 30px rgba(0,0,0,0.25); z-index: 9999; }
    #encuentro-bottom-bar button { background: #fff; color: #111; border: none; width: 42px; height: 42px; border-radius: 50%; font-size: 28px; cursor: pointer; line-height: 1; }
    #encuentro-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: none; place-items: center; z-index: 10000; }
    #encuentro-modal.open { display: grid; }
    #encuentro-modal .box { background: #fff; padding: 20px; border-radius: 16px; width: 90%; max-width: 400px; }
    #encuentro-modal input { width: 100%; padding: 10px; margin: 8px 0; border-radius: 10px; border: 1px solid #ddd; box-sizing:border-box; }
  `;
  document.head.appendChild(style);

  function ensureSupabaseLib(cb) {
    if (window.supabase && window.supabase.createClient) return cb();
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js';
    s.onload = cb;
    document.head.appendChild(s);
  }

  let supa = null;
  let profiles = [];

  async function loadProfiles() {
    if (!supa) return;
    const { data, error } = await supa.from(TABLE).select('*').order('created_at', { ascending: false });
    if (error) { console.error(error); return; }
    profiles = data || [];
    renderWall();
  }

  function renderWall() {
    let wall = document.getElementById('encuentro-wall');
    if (!wall) {
      wall = document.createElement('section');
      wall.id = 'encuentro-wall';
      (document.querySelector('main') || document.body).appendChild(wall);
    }
    wall.innerHTML = `
      <h2>Encuentro Wall</h2>
      <div class="sub">Shared • ${profiles.length} profiles • Everyone sees same</div>
      <div class="wall-grid">
        ${profiles.length ? profiles.map(p => `
          <div class="wall-card"><img src="${p.img || 'https://i.pravatar.cc/150?u='+p.id}" alt=""><h3>${p.name}</h3><p>${p.bio || ''}</p></div>
        `).join('') : '<div style="opacity:0.5">No profiles yet — tap + to create first one</div>'}
      </div>
    `;
  }

  function ensureBar() {
    if (document.getElementById('encuentro-bottom-bar')) return;
    const bar = document.createElement('div');
    bar.id = 'encuentro-bottom-bar';
    bar.innerHTML = `<span>Encuentro</span><button id="encuentro-add-btn">+</button>`;
    document.body.appendChild(bar);
    document.getElementById('encuentro-add-btn').onclick = () => {
      document.getElementById('encuentro-modal').classList.add('open');
    };
  }

  function ensureModal() {
    if (document.getElementById('encuentro-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'encuentro-modal';
    modal.innerHTML = `<div class="box">
      <h3 style="margin:0 0 8px">Create Profile (Shared)</h3>
      <input id="enc-n" placeholder="Name" />
      <input id="enc-b" placeholder="Bio" />
      <input id="enc-i" placeholder="Image URL (optional)" />
      <button id="enc-save" style="width:100%;padding:12px;border-radius:10px;border:none;background:#111;color:#fff;margin-top:8px;cursor:pointer">Save & Share to All Users</button>
      <button id="enc-close" style="width:100%;padding:10px;background:transparent;border:none;margin-top:4px;cursor:pointer">Cancel</button>
    </div>`;
    document.body.appendChild(modal);
    document.getElementById('enc-close').onclick = () => modal.classList.remove('open');
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
    document.getElementById('enc-save').onclick = async () => {
      const name = document.getElementById('enc-n').value.trim();
      const bio = document.getElementById('enc-b').value.trim();
      const img = document.getElementById('enc-i').value.trim() || `https://i.pravatar.cc/150?u=${Date.now()}`;
      if (!name) return alert('Add a name');
      const { data, error } = await supa.from(TABLE).insert([{ name, bio, img }]).select();
      if (error) return alert('Supabase error: ' + error.message + '\nDid you run the SQL table creation?');
      document.getElementById('enc-n').value = ''; document.getElementById('enc-b').value = ''; document.getElementById('enc-i').value = '';
      modal.classList.remove('open');
      await loadProfiles();
    };
  }

  function init() {
    supa = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    renderWall(); ensureBar(); ensureModal();
    loadProfiles();
    supa.channel('wall').on('postgres_changes', { event: '*', schema: 'public', table: TABLE }, () => loadProfiles()).subscribe();
  }

  document.addEventListener('DOMContentLoaded', () => {
    ensureSupabaseLib(init);
  });
  if (document.readyState !== 'loading') ensureSupabaseLib(init);
})();
