# Vercel Environment Variables Setup

## Required Environment Variables

Untuk deployment Vercel yang sukses, set environment variables berikut di **Vercel Dashboard → Settings → Environment Variables**:

### 1. VITE_SUPABASE_URL
- **Value**: URL project Supabase Anda
- **Format**: `https://xxxxxxxxxxxxx.supabase.co`
- **Dapatkan dari**: [Supabase Dashboard](https://app.supabase.com) → Your Project → Settings → API

### 2. VITE_SUPABASE_ANON_KEY
- **Value**: Anonymous/public API key Supabase Anda
- **Format**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (JWT token panjang)
- **Dapatkan dari**: [Supabase Dashboard](https://app.supabase.com) → Your Project → Settings → API

## Cara Set di Vercel

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Pilih project **kidcoderclub-22** atau project Anda
3. Klik tab **Settings**
4. Klik **Environment Variables** di sidebar kiri
5. Tambahkan kedua variable di atas:
   - Key: `VITE_SUPABASE_URL`
   - Value: (paste URL Supabase Anda)
   - Environment: pilih **Production**, **Preview**, dan **Development**
6. Klik **Save**
7. Ulangi untuk `VITE_SUPABASE_ANON_KEY`

## Vercel Project Settings (Root Directory)

Jika deployment masih error, pastikan **Root Directory** di Vercel Project Settings diset ke:
- **`kidcoderclub/client`** (jika Anda push dari root monorepo), atau
- **`.`** (jika repository root langsung adalah folder client)

Cek di: **Vercel Dashboard → Settings → General → Root Directory**

## Redeploy Setelah Set Environment Variables

Setelah menambahkan environment variables:
1. Kembali ke tab **Deployments**
2. Klik deployment terakhir yang gagal
3. Klik tombol **Redeploy** (atau push commit baru ke GitHub)

## Troubleshooting

### Error: "VITE_SUPABASE_URL is not defined"
- Pastikan environment variable sudah di-save di Vercel
- Pastikan nama variable EXACT: `VITE_SUPABASE_URL` (case-sensitive, dengan prefix `VITE_`)
- Redeploy setelah menambahkan variable

### Error: Build command failed
- Cek Build Logs di Vercel untuk error detail
- Pastikan `package.json` dan `vercel.json` konsisten
- Coba build lokal: `npm install && npm run build` di folder `client/`

### Warning: "content configuration matching node_modules"
- Sudah diperbaiki di `tailwind.config.js` versi terbaru
- Pull commit terbaru: `git pull origin main`

## Build Command & Output Directory

Default settings di `vercel.json`:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Framework**: Vite

Jangan ubah ini kecuali struktur project berubah.
