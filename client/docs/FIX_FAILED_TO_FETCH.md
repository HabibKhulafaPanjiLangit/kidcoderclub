# 🚨 FIX: "Failed to fetch" Error

## Problem
Error "Failed to fetch" terjadi karena **Row Level Security (RLS) masih aktif** di Supabase.

## Solution: Disable RLS

### Step 1: Buka Supabase SQL Editor
1. Go to: https://supabase.com/dashboard/project/tasyihdukttdqhshrizsl/sql
2. Login jika belum

### Step 2: Run SQL Command

Copy dan paste command ini, lalu klik **RUN**:

```sql
-- DISABLE RLS untuk semua tables
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.students DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors DISABLE ROW LEVEL SECURITY;

-- Verify RLS status
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('users', 'students', 'mentors');
```

### Step 3: Verify

Hasil query harus menunjukkan `rls_enabled = false` untuk semua tables:

```
schemaname | tablename | rls_enabled
-----------+-----------+-------------
public     | users     | f
public     | students  | f
public     | mentors   | f
```

### Step 4: Refresh Browser

Setelah RLS disabled, refresh aplikasi di browser.

## Alternative: Using Migration File

File sudah ada di: `frontend/database/schema/02_dev_disable_rls.sql`

```bash
# Copy content dari file tersebut
cat frontend/database/schema/02_dev_disable_rls.sql

# Paste di Supabase SQL Editor
# Klik RUN
```

## ⚠️ Important Notes

### Development Mode
- RLS **DISABLED** untuk development
- Semua orang bisa read/write tanpa auth
- **JANGAN pakai di production!**

### Production Mode
- RLS harus **ENABLED**
- Tambahkan policies untuk security
- Hanya authenticated users yang bisa akses

## Check Environment Variables (Vercel)

Jika masih error setelah disable RLS, cek env vars di Vercel:

1. Go to: https://vercel.com/dashboard
2. Select project → Settings → Environment Variables
3. Pastikan ada:
   ```
   VITE_SUPABASE_URL = https://tasyihdukttdqhshrizsl.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbG...
   ```

4. Redeploy jika perlu:
   ```bash
   git commit --allow-empty -m "trigger redeploy"
   git push
   ```

## Common Errors

### Error: "Failed to fetch"
**Cause**: RLS enabled  
**Fix**: Run disable RLS SQL above

### Error: "Invalid API key"
**Cause**: Wrong ANON KEY  
**Fix**: Check .env file and Vercel env vars

### Error: "Could not connect to database"
**Cause**: Wrong Supabase URL  
**Fix**: Check .env file and Vercel env vars

### Error: "Project paused"
**Cause**: Supabase free tier paused  
**Fix**: Go to Supabase dashboard and unpause project

## Need Help?

Check logs di browser console (F12) untuk error details.
