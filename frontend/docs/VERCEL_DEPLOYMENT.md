# Vercel Deployment Guide

## Environment Variables Setup

Agar aplikasi work di Vercel, environment variables HARUS di-set!

### Step 1: Go to Vercel Dashboard
https://vercel.com/dashboard

### Step 2: Select Your Project
Pilih project "kidcoderclub" (atau nama project kamu)

### Step 3: Go to Settings
Settings → Environment Variables

### Step 4: Add These Variables

#### Variable 1: VITE_SUPABASE_URL
```
Name: VITE_SUPABASE_URL
Value: https://tasyihduktdqhshrizsl.supabase.co
Environment: Production, Preview, Development (check all)
```

#### Variable 2: VITE_SUPABASE_ANON_KEY
```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhc3lpaGR1a3RkcWhzaHJpenNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MTYyNzMsImV4cCI6MjA3Nzk5MjI3M30.MOD3cFl1OfQ11J7rNpC6H1SdXmbH77PJKTAWFzLDzs4
Environment: Production, Preview, Development (check all)
```

### Step 5: Save
Click "Save" untuk setiap variable

### Step 6: Redeploy
Setelah save environment variables, HARUS redeploy!

**Option A: Auto Redeploy (Recommended)**
```bash
git commit --allow-empty -m "trigger redeploy"
git push origin main
```

**Option B: Manual Redeploy**
1. Go to: Deployments tab
2. Find latest deployment
3. Click "..." menu
4. Click "Redeploy"
5. Confirm

### Step 7: Verify Deployment
1. Tunggu deployment selesai (~1-2 menit)
2. Buka URL production
3. Cek browser console (F12)
4. Harus muncul: "✅ Supabase connected successfully!"

### Step 8: Access Admin
URL Admin: `https://your-domain.vercel.app/admin/users`

Contoh:
- `https://kidcoderclub.vercel.app/admin/users`
- `https://kidcoderclub-abc123.vercel.app/admin/users`

## Troubleshooting

### Error: "Supabase credentials missing"
❌ Environment variables belum di-set di Vercel
✅ Set variables di Vercel Settings → Environment Variables

### Error: "Failed to fetch"
❌ RLS masih enabled di Supabase
✅ Run: `ALTER TABLE users DISABLE ROW LEVEL SECURITY;` di Supabase SQL Editor

### Error: 404 Not Found on /admin
❌ Routing issue atau build error
✅ Check build logs di Vercel Deployments tab

### Deployment Failed
❌ Build error atau dependency issue
✅ Check logs di Vercel untuk error details

## Current Settings

### Supabase Project
```
URL: https://tasyihduktdqhshrizsl.supabase.co
Project: kidcoderclub
Region: Singapore
```

### Database Tables
- users (dengan RLS disabled)
- students (dengan RLS disabled)
- mentors (dengan RLS disabled)

### Admin Routes
- `/admin` - Dashboard
- `/admin/users` - User Management (Approve/Reject)
- `/admin/certificates` - Certificates
- `/admin/materials` - Materials
- `/admin/payments` - Payments
- `/admin/stats` - Statistics
- `/admin/maintenance` - Maintenance

## Quick Deploy Command

```bash
# Trigger redeploy dengan push kosong
git commit --allow-empty -m "redeploy: update environment variables"
git push origin main
```

Vercel akan auto-deploy dalam 1-2 menit.
