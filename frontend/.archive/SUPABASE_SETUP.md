# 🚀 Panduan Setup Supabase untuk KidCoderClub

## 📋 Langkah-langkah Setup

### 1. Buat Project Supabase

1. Kunjungi [https://app.supabase.com](https://app.supabase.com)
2. Login atau buat akun baru
3. Klik "New Project"
4. Isi informasi project:
   - **Name**: KidCoderClub
   - **Database Password**: (buat password yang kuat)
   - **Region**: Pilih yang terdekat dengan lokasi Anda
   - **Pricing Plan**: Pilih "Free" untuk mulai
5. Klik "Create new project"
6. Tunggu beberapa menit hingga project selesai dibuat

### 2. Dapatkan API Keys

1. Setelah project dibuat, buka **Settings** → **API**
2. Copy informasi berikut:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. Konfigurasi Environment Variables

1. Buat file `.env` di folder `frontend/`:
   ```bash
   cd frontend
   copy .env.example .env
   ```

2. Edit file `.env` dan isi dengan API keys Anda:
   ```env
   VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 4. Jalankan Database Migration

1. Di Supabase Dashboard, buka **SQL Editor**
2. Klik "New Query"
3. Copy seluruh isi file `supabase_migration.sql`
4. Paste ke SQL Editor
5. Klik "Run" atau tekan `Ctrl+Enter`
6. Tunggu hingga selesai (akan ada notifikasi "Success")

### 5. Setup Storage Bucket

Storage bucket untuk sertifikat akan otomatis dibuat oleh migration. Namun jika perlu, Anda bisa:

1. Buka **Storage** di Supabase Dashboard
2. Pastikan bucket `certificates` sudah ada
3. Jika belum, klik "Create bucket":
   - **Name**: certificates
   - **Public**: ON (centang)
   - Klik "Save"

### 6. Buat Admin User (Optional)

Untuk dapat mengakses halaman admin approval:

1. Buka **Authentication** → **Users**
2. Klik "Add user" → "Create new user"
3. Isi:
   - **Email**: admin@kidcoderclub.com (atau email admin Anda)
   - **Password**: (buat password yang kuat)
   - Centang "Auto Confirm User"
4. Klik "Create user"
5. Setelah user dibuat, klik email user tersebut
6. Scroll ke bawah ke bagian **Raw User Meta Data**
7. Edit JSON dan tambahkan:
   ```json
   {
     "role": "admin"
   }
   ```
8. Klik "Save"

### 7. Verifikasi Setup

1. **Test Authentication**:
   - Jalankan aplikasi: `npm run dev`
   - Buka browser: `http://localhost:5173`
   - Coba registrasi sebagai murid atau mentor
   - Cek di Supabase Dashboard → **Authentication** → **Users**
   - User baru seharusnya muncul di list

2. **Test Database**:
   - Buka **Table Editor** di Supabase
   - Pastikan ada 3 tabel: `users`, `students`, `mentors`
   - Cek data yang baru didaftarkan

3. **Test Login**:
   - Login sebagai admin
   - Approve salah satu pendaftaran
   - Logout dan coba login dengan akun yang sudah di-approve

## 🔧 Troubleshooting

### Error: "Missing Supabase environment variables"

**Solusi**:
- Pastikan file `.env` ada di folder `frontend/`
- Pastikan variable dimulai dengan `VITE_`
- Restart development server (`Ctrl+C` lalu `npm run dev` lagi)

### Error: "relation public.users does not exist"

**Solusi**:
- Jalankan ulang migration SQL di SQL Editor
- Pastikan tidak ada error saat menjalankan migration

### User tidak bisa login setelah registrasi

**Solusi**:
- Cek status user di Supabase → **Table Editor** → **users**
- Pastikan `status` = `approved`
- Jika masih `pending`, ubah manual atau gunakan halaman admin

### Storage upload gagal

**Solusi**:
- Pastikan bucket `certificates` sudah dibuat
- Pastikan bucket di-set sebagai **Public**
- Cek policies di **Storage** → **Policies**

## 📊 Struktur Database

### Table: `users`
- **id**: UUID (Primary Key)
- **email**: TEXT (Unique)
- **name**: TEXT
- **role**: TEXT ('student' | 'mentor')
- **status**: TEXT ('pending' | 'approved' | 'rejected')
- **phone**: TEXT
- **created_at**: TIMESTAMPTZ
- **updated_at**: TIMESTAMPTZ

### Table: `students`
- **id**: UUID (Primary Key)
- **user_id**: UUID (Foreign Key → users.id)
- **parent_name**: TEXT
- **parent_email**: TEXT
- **phone**: TEXT
- **child_name**: TEXT
- **child_age**: INTEGER
- **class_name**: TEXT
- **created_at**: TIMESTAMPTZ

### Table: `mentors`
- **id**: UUID (Primary Key)
- **user_id**: UUID (Foreign Key → users.id)
- **mentor_name**: TEXT
- **mentor_email**: TEXT
- **mentor_phone**: TEXT
- **expertise**: TEXT
- **experience**: TEXT
- **certificates**: TEXT[] (Array of URLs)
- **created_at**: TIMESTAMPTZ

## 🔐 Security

### Row Level Security (RLS)
Semua tabel sudah menggunakan RLS dengan policies:
- **Public**: Bisa register (INSERT)
- **Users**: Bisa lihat data sendiri (SELECT)
- **Admins**: Bisa lihat dan update semua data

### Authentication
- Password di-hash otomatis oleh Supabase Auth
- Session management otomatis
- Auto-logout saat token expired

## 🌐 Fallback Mode

Jika Supabase tidak dikonfigurasi (tidak ada `.env`), aplikasi akan otomatis menggunakan **localStorage** sebagai fallback. Fitur yang tetap berjalan:
- ✅ Registrasi
- ✅ Login
- ✅ Admin approval
- ❌ Upload sertifikat (hanya simulasi)
- ❌ Real-time updates
- ❌ Email notifications

## 📞 Support

Jika ada masalah:
1. Cek console browser (F12 → Console)
2. Cek logs di Supabase Dashboard → **Logs**
3. Dokumentasi Supabase: https://supabase.com/docs
