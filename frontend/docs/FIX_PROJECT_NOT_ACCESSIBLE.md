# 🚨 CRITICAL: Supabase Project Not Accessible

## Problem
URL `tasy1hdukttdqhshrizsl.supabase.co` tidak bisa diakses.

Error: `The remote name could not be resolved`

## Root Causes

### 1. ❌ Project Paused (Free Tier)
Supabase free tier akan pause project setelah 1 minggu tidak aktif.

**Check:**
- Buka: https://supabase.com/dashboard/projects
- Lihat status project
- Jika ada label "PAUSED" → Klik "Resume"

### 2. ❌ Project Deleted
Project mungkin sudah dihapus (tidak sengaja atau karena inactivity).

**Solution:**
Buat project baru (lihat langkah di bawah).

### 3. ❌ Wrong URL
URL yang dicopy dari dashboard mungkin salah.

**Check:**
- Buka: https://supabase.com/dashboard/project/tasy1hdukttdqhshrizsl/settings/api
- Verify URL matches exactly

## Solution 1: Resume Paused Project

1. Go to: https://supabase.com/dashboard/projects
2. Find "kidcoderclub" project
3. If status is "PAUSED":
   - Click "Resume" button
   - Wait ~1 minute
4. Go to Settings → API
5. Copy fresh URL and Key
6. Update `.env` file

## Solution 2: Create New Project

### Step 1: Create Project
1. Go to: https://supabase.com/dashboard/projects
2. Click "New Project"
3. Settings:
   ```
   Organization: [Select your org]
   Name: kidcoderclub
   Database Password: [CREATE STRONG PASSWORD - SAVE IT!]
   Region: Southeast Asia (Singapore)
   Plan: Free
   ```
4. Click "Create new project"
5. Wait ~2 minutes for project to be ready

### Step 2: Get Credentials
1. After project is ready, go to: **Settings** → **API**
2. Copy these values:
   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon public: eyJhbGci...
   ```

### Step 3: Update `.env`
Open `frontend/.env` and update:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...your-key...
```

### Step 4: Setup Database
1. Go to: **SQL Editor** in Supabase dashboard
2. Run this SQL (create new query):

```sql
-- Copy dari: frontend/database/schema/01_initial.sql
-- Paste semua isi file tersebut
-- Klik RUN
```

3. After success, run:

```sql
-- Copy dari: frontend/database/schema/02_dev_disable_rls.sql
-- Paste semua isi file tersebut
-- Klik RUN
```

### Step 5: Verify
Run this SQL to verify:

```sql
-- Check tables exist
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'students', 'mentors');

-- Check RLS disabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'students', 'mentors');
```

Expected results:
- 3 tables found
- All `rowsecurity = f` (false)

### Step 6: Restart Dev Server
```bash
# Stop current server (Ctrl+C)
npm run dev

# Hard refresh browser (Ctrl+Shift+R)
```

## Verification Checklist

After setup, verify:

- [ ] Project status: ACTIVE (not paused)
- [ ] URL accessible from browser
- [ ] Database tables created (3 tables)
- [ ] RLS disabled for all tables
- [ ] `.env` file updated with correct credentials
- [ ] Dev server restarted
- [ ] Browser hard refreshed
- [ ] Console shows: "✅ Supabase connected successfully!"

## Common Mistakes

1. ❌ Wrong URL (typo or wrong project)
2. ❌ Wrong Anon Key (dari project lain)
3. ❌ Tables belum dibuat (run 01_initial.sql)
4. ❌ RLS masih enabled (run 02_dev_disable_rls.sql)
5. ❌ .env tidak direload (harus restart dev server)
6. ❌ Browser masih cache (harus hard refresh)

## Still Not Working?

1. Test URL di browser: `https://your-url.supabase.co`
   - Harus load Supabase REST API docs
   - Jika 404/error → URL salah

2. Check DNS:
   ```bash
   nslookup your-url.supabase.co
   ```
   - Harus resolve ke IP address
   - Jika "can't find" → Project tidak ada/paused

3. Screenshot dan kirim:
   - Supabase dashboard (project list)
   - Settings → API page
   - Browser console errors
   - Terminal errors

## Contact

Kirim screenshot Supabase dashboard untuk bantuan lebih lanjut!
