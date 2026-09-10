Global Amor — Travel. Connect. Belong.
This is the CLEAN, editable source for your app. No more 3MB single file.
How to make small changes (10 seconds)
Change the black pill banner text:
→ Open components/StyleBanner.tsx → edit the text on line 8
Change the 6 trending items default:
→ Open lib/defaults.ts → edit the array. Or just login as Sub Admin (Mamasota2025!) in the app → Trending Editor (no code needed)
Change colors:
→ Open app/globals.css → edit --cream, --dark variables
Change admin passwords:
→ Open lib/auth.ts
Change profile fields:
→ Open components/ProfileCreator.tsx
Deploy to Vercel (single file still works)
npm install
npm run build
The output is still a static app you can deploy. Or push to GitHub and Vercel will auto-deploy.
Supabase Setup
Create project at supabase.com
Run SQL from lib/supabase-schema.sql in Supabase SQL Editor
Add env vars in Vercel:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
Redeploy
If no Supabase keys, app automatically uses localStorage (demo mode) — so it works immediately.
Structure
app/page.tsx — main app, tabs logic
components/StyleBanner.tsx — black pill (your screenshot #2)
components/TrendingPopup.tsx — popup with 6 items (screenshot #3)
components/AdminLogin.tsx — dual admin login (screenshot #1)
components/AdminDashboard.tsx — pending profiles + trending editor + email export
lib/ — types, defaults, supabase client
