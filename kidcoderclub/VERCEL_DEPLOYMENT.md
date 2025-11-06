# 🚀 Vercel Deployment Guide - Monorepo Structure

## ✅ Project Structure (Clean & Organized)

```
kidcoderclub/
├── client/              # Frontend (React + Vite)
├── server/              # Backend (Node.js + Express)
├── package.json         # Root package manager
├── vercel.json          # Vercel config
└── README.md
```

## 📋 Step-by-Step Vercel Setup

### Step 1: Push to GitHub

```bash
cd "d:\magang diskom\KidCoderCLub2-master"

# Add kidcoderclub folder
git add kidcoderclub/
git commit -m "feat: restructure to clean monorepo"
git push origin main
```

### Step 2: Configure Vercel Project

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project** (kidcoderclub)
3. **Go to Settings → General**

#### 🔧 Important Settings:

**Root Directory:**
```
kidcoderclub
```
✅ **Sangat penting!** Set ini atau deployment akan gagal!

**Framework Preset:**
```
Other
```

**Build Command:**
```
cd client && npm install && npm run build
```

**Output Directory:**
```
client/dist
```

**Install Command:**
```
npm install
```

### Step 3: Environment Variables

**Go to Settings → Environment Variables**

Tambahkan 2 variables ini (sudah ada, tapi double check):

#### Variable 1: VITE_SUPABASE_URL
- Name: `VITE_SUPABASE_URL`
- Value: `https://tasyihduktdqhshrizsl.supabase.co`
- Environment: ✅ Production, ✅ Preview, ✅ Development

#### Variable 2: VITE_SUPABASE_ANON_KEY
- Name: `VITE_SUPABASE_ANON_KEY`  
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhc3lpaGR1a3RkcWhzaHJpenNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MTYyNzMsImV4cCI6MjA3Nzk5MjI3M30.MOD3cFl1OfQ11J7rNpC6H1SdXmbH77PJKTAWFzLDzs4`
- Environment: ✅ Production, ✅ Preview, ✅ Development

### Step 4: Save & Redeploy

**Cara 1: Automatic (Recommended)**
```bash
git push origin main
```
Vercel akan auto-deploy setiap push ke main branch.

**Cara 2: Manual**
1. Go to: Deployments tab
2. Click latest deployment
3. Click "..." menu → "Redeploy"

## ✅ Verification Checklist

Sebelum deploy, pastikan semua ini sudah benar:

- [x] Root Directory = `kidcoderclub`
- [x] Build Command = `cd client && npm install && npm run build`
- [x] Output Directory = `client/dist`
- [x] Install Command = `npm install`
- [x] Framework = Other (atau Vite)
- [x] Environment Variables sudah di-set (VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY)
- [x] Build berhasil locally (`npm run build` di folder client)

## 🐛 Troubleshooting

### Error: "No such file or directory: dist"
**Fix:** Check Root Directory → harus set ke `kidcoderclub`

### Error: "Environment variable missing"
**Fix:** Add VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di Settings → Environment Variables

### Error: "Build failed"
**Fix:** Test build locally dulu:
```bash
cd kidcoderclub/client
npm install
npm run build
```

### Error: "Cannot find module"
**Fix:** Pastikan Build Command lengkap:
```
cd client && npm install && npm run build
```

## 📊 Expected Build Output

Kalau berhasil, Vercel log akan show:
```
✓ Running "cd client && npm install && npm run build"
✓ Installing dependencies...
✓ Building...
✓ Compiled successfully
✓ Build completed
✓ Deploying...
✓ Deployment ready
```

## 🎉 Success!

Setelah deployment berhasil:
- ✅ Website accessible di URL Vercel
- ✅ No console errors
- ✅ Supabase connection working
- ✅ All pages loading correctly

## 📝 Notes

- **Folder lama** (`frontend/` dan `backend/`) **JANGAN dihapus dulu** sampai deployment sukses
- Setelah deployment sukses, baru hapus folder lama
- Backend (`server/`) bisa di-deploy terpisah ke Railway/Render/etc

## 🆘 Need Help?

Kalau masih error, screenshot:
1. Vercel build logs
2. Settings → General page
3. Settings → Environment Variables page

Lalu share untuk troubleshooting lebih lanjut.
