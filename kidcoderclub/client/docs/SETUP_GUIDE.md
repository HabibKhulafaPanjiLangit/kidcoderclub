# 🚀 Supabase Setup Guide

Panduan lengkap setup Supabase untuk KidCoderClub dari awal sampai production.

## 📋 Prerequisites

- [ ] Akun Supabase (gratis) - [app.supabase.com](https://app.supabase.com)
- [ ] Node.js & npm terinstall
- [ ] Git terinstall
- [ ] Code editor (VS Code recommended)

---

## 🎯 Step 1: Create Supabase Project

### 1.1 Buat Project Baru

1. Login ke [Supabase Dashboard](https://app.supabase.com)
2. Click **"New Project"**
3. Isi form:
   - **Name**: `kidcoderclub` (atau nama lain)
   - **Database Password**: Buat password yang kuat (simpan ini!)
   - **Region**: Pilih yang terdekat (e.g., `Southeast Asia - Singapore`)
   - **Pricing Plan**: Free (untuk mulai)
4. Click **"Create new project"**
5. Tunggu ~2 menit sampai project ready

### 1.2 Get API Credentials

Setelah project ready:

1. Go to **Settings** (⚙️ di sidebar)
2. Click **API**
3. Copy 2 values ini:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public key** (key yang panjang, starts with `eyJ...`)

---

## 🗄️ Step 2: Setup Database Schema

### 2.1 Run Initial Migration

1. Buka **SQL Editor** di Supabase Dashboard
2. Click **"New Query"**
3. Copy paste isi file: `database/schema/01_initial_migration.sql`
4. Click **"Run"** atau tekan `Ctrl+Enter`
5. Verify: Should see "Success. No rows returned" or similar

### 2.2 Verify Tables Created

Di SQL Editor, run query ini:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('users', 'students', 'mentors');
```

Should return 3 rows: `users`, `students`, `mentors`

### 2.3 (Optional) Disable RLS for Development

⚠️ **ONLY for development/testing:**

```sql
-- Copy from: database/schema/02_disable_rls.sql
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.students DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors DISABLE ROW LEVEL SECURITY;
```

🚨 **DO NOT** do this in production!

---

## 🔐 Step 3: Configure Authentication

### 3.1 Enable Email Auth

1. Go to **Authentication** → **Providers**
2. Find **Email** provider
3. Enable **"Enable Email provider"**
4. Set **"Confirm email"**: Disable (untuk development) atau Enable (untuk production)
5. Save

### 3.2 Configure Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize:
   - Confirmation email
   - Reset password email
   - Magic link email

### 3.3 Configure URL Settings

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL**: Your main domain
   - Development: `http://localhost:5173`
   - Production: `https://yourdomain.com`
3. Add **Redirect URLs**:
   - Development: `http://localhost:5173/**`
   - Production: `https://yourdomain.com/**`
   - Vercel: `https://yourapp.vercel.app/**`

---

## 📦 Step 4: Setup Storage

### 4.1 Verify Certificates Bucket

1. Go to **Storage**
2. Should see bucket named **"certificates"** (dibuat dari migration)
3. If not, create manually:
   - Click **"New bucket"**
   - Name: `certificates`
   - **Public bucket**: ON
   - Save

### 4.2 Configure Storage Policies

Policies sudah di-set dari migration. Verify di:
- Storage → certificates → Policies

Should have:
- ✅ Anyone can upload
- ✅ Public can view

---

## ⚙️ Step 5: Configure Environment Variables

### 5.1 Local Development

Create `.env` file di folder `frontend/`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Replace dengan values dari Step 1.2

### 5.2 Vercel Deployment

1. Go to Vercel Dashboard → Your Project
2. Go to **Settings** → **Environment Variables**
3. Add 2 variables:

| Key | Value | Environments |
|-----|-------|--------------|
| `VITE_SUPABASE_URL` | `https://xxx.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `eyJ...` (your anon key) | Production, Preview, Development |

4. Click **Save**
5. **Redeploy** project untuk apply changes

---

## 🧪 Step 6: Test Connection

### 6.1 Test di Local

1. Start dev server:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. Open browser: `http://localhost:5173`
3. Open DevTools Console (F12)
4. Look for logs:
   ```
   🔍 ENV CHECK: { url: "https://...", key: "EXISTS", ... }
   Supabase Config: { url: "...", hasKey: true, ... }
   Supabase client created: true
   ✅ Supabase connected successfully!
   ```

### 6.2 Test Registration

1. Try register as student atau mentor
2. Check di Supabase:
   - **Table Editor** → `users` → Should see new row
   - **Table Editor** → `students` or `mentors` → Should see profile data

### 6.3 Test di Production (Vercel)

1. Deploy ke Vercel
2. Open deployed URL
3. Open Console (F12)
4. Verify same logs as local
5. Try registration

---

## 👤 Step 7: Create Admin User (Optional)

### 7.1 Register Admin via UI

1. Register normal user (student or mentor)
2. Note the email

### 7.2 Promote to Admin

1. Go to Supabase → **Authentication** → **Users**
2. Find your user by email
3. Click user → Click **"..."** menu → **"Edit user"**
4. Go to **"Raw User Meta Data"** tab
5. Add JSON:
   ```json
   {
     "role": "admin"
   }
   ```
6. Save

### 7.3 Update Database Status

```sql
UPDATE users 
SET status = 'approved' 
WHERE email = 'your-admin@email.com';
```

Now this user is admin with full access!

---

## ✅ Verification Checklist

- [ ] Supabase project created & ready
- [ ] API credentials copied
- [ ] Database migration run successfully
- [ ] 3 tables created (users, students, mentors)
- [ ] Email authentication enabled
- [ ] Storage bucket "certificates" exists
- [ ] Environment variables set (local & Vercel)
- [ ] Local development tested
- [ ] Production deployment tested
- [ ] Test registration works
- [ ] Admin user created (optional)

---

## 🔗 Next Steps

1. **Development**: Start building features
2. **Deployment**: See `DEPLOYMENT.md`
3. **Issues**: Check `TROUBLESHOOTING.md`

---

## 📚 Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth](https://supabase.com/docs/guides/auth)

---

## 🆘 Need Help?

- Check `TROUBLESHOOTING.md`
- [Supabase Discord](https://discord.supabase.com)
- [Supabase Community](https://github.com/supabase/supabase/discussions)
