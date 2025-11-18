# 🔐 Tutorial: Membuat Admin User - Step by Step

## Langkah 1: Buka Supabase Dashboard

1. **Buka browser** (Chrome/Edge/Firefox)
2. **Ketik URL:** https://app.supabase.com
3. **Login** dengan akun Supabase Anda
   - Jika belum punya akun, daftar dulu di https://supabase.com

---

## Langkah 2: Pilih Project Anda

1. Setelah login, Anda akan melihat **daftar project**
2. **Klik project:** `kidcoderclub` atau yang sesuai dengan:
   - Project URL: `https://tasyihduktdqhshrizsl.supabase.co`
3. Dashboard project akan terbuka

---

## Langkah 3: Buat Admin di Table "users"

### 3.1 Buka Table Editor

1. Di **sidebar kiri**, cari dan klik: **Table Editor** (icon seperti tabel/grid)
2. Anda akan melihat daftar tabel di database

### 3.2 Pilih Tabel "users"

1. Di list tabel sebelah kiri, **klik:** `users`
2. Anda akan melihat tabel dengan kolom:
   - id
   - email
   - name
   - role
   - status
   - phone
   - created_at

### 3.3 Insert Row Baru (Admin User)

1. **Klik tombol hijau:** `Insert` → `Insert row` (di bagian atas tabel)
2. Form insert akan muncul

### 3.4 Isi Data Admin

**Isi field-field berikut:**

| Field | Value | Keterangan |
|-------|-------|------------|
| **id** | (kosongkan) | Auto-generate UUID oleh Supabase |
| **email** | `admin@kidcoderclub.com` | Email admin untuk login |
| **name** | `Admin KidCoder Club` | Nama admin |
| **role** | `admin` | **PENTING: Ketik "admin" (huruf kecil semua)** |
| **status** | `approved` | **PENTING: Ketik "approved" (huruf kecil semua)** |
| **phone** | (kosongkan atau isi) | Opsional |
| **created_at** | (kosongkan) | Auto-generate timestamp |

**Screenshot contoh isian:**
```
┌─────────────────────────────────────────┐
│ Insert Row - users                      │
├─────────────────────────────────────────┤
│ id:         [                          ]│ ← Kosongkan (auto)
│ email:      [admin@kidcoderclub.com    ]│
│ name:       [Admin KidCoder Club       ]│
│ role:       [admin                     ]│ ← Huruf kecil!
│ status:     [approved                  ]│ ← Huruf kecil!
│ phone:      [                          ]│ ← Opsional
│ created_at: [                          ]│ ← Kosongkan (auto)
└─────────────────────────────────────────┘
        [Cancel]  [Save] ← Klik Save
```

### 3.5 Simpan Data

1. **Klik tombol hijau:** `Save`
2. Tunggu beberapa detik
3. **Lihat konfirmasi:** Row baru akan muncul di tabel
4. **Catat ID yang di-generate** (UUID panjang seperti: `123e4567-e89b-12d3-a456-426614174000`)

**✅ Selesai! Admin user sudah dibuat di database.**

---

## Langkah 4: Buat Authentication User

Sekarang kita perlu membuat **auth user** agar admin bisa login dengan password.

### 4.1 Buka Authentication

1. Di **sidebar kiri**, klik: **Authentication** (icon gembok/kunci)
2. Submenu akan muncul
3. **Klik:** `Users`

### 4.2 Add New User

1. **Klik tombol hijau:** `Add user` (di bagian atas kanan)
2. Dropdown akan muncul
3. **Pilih:** `Create new user`

### 4.3 Isi Data Authentication

Form akan muncul dengan field:

| Field | Value | Keterangan |
|-------|-------|------------|
| **Email** | `admin@kidcoderclub.com` | **HARUS SAMA dengan email di table users!** |
| **Password** | `Admin123!KidCoder` | Password kuat (min 6 karakter, ada huruf besar, angka, simbol) |
| **Auto Confirm User** | ✅ **Centang!** | Agar langsung bisa login tanpa verifikasi email |

**Screenshot contoh:**
```
┌──────────────────────────────────────────┐
│ Create New User                          │
├──────────────────────────────────────────┤
│ Email:                                   │
│ [admin@kidcoderclub.com                 ]│
│                                          │
│ Password:                                │
│ [Admin123!KidCoder                      ]│
│                                          │
│ ☑ Auto Confirm User  ← CENTANG INI!     │
└──────────────────────────────────────────┘
           [Cancel]  [Create User] ← Klik ini
```

### 4.4 Simpan User

1. **Klik tombol:** `Create User`
2. Tunggu beberapa detik
3. **User baru akan muncul** di list dengan:
   - Email: `admin@kidcoderclub.com`
   - Provider: `email`
   - Created: (tanggal hari ini)

**✅ Selesai! Authentication sudah dibuat.**

---

## Langkah 5: Test Login Admin

### 5.1 Buka Halaman Admin Login

1. Buka browser **tab baru**
2. Ketik URL: **https://kidcoderclub-22.vercel.app/admin-login**
3. Enter

### 5.2 Login dengan Kredensial Admin

1. **Isi Email:** `admin@kidcoderclub.com`
2. **Isi Password:** `Admin123!KidCoder` (atau password yang Anda buat)
3. **Klik:** `Login`

### 5.3 Verifikasi Login Berhasil

Jika berhasil:
- ✅ Anda akan diarahkan ke **Admin Dashboard**
- ✅ Muncul sidebar dengan menu: Dashboard, Users, Certificates, Materials, dll
- ✅ Halaman dashboard menampilkan statistics

Jika gagal:
- ❌ Cek email & password sudah benar
- ❌ Pastikan Auto Confirm User sudah dicentang
- ❌ Cek role di table users = "admin" (huruf kecil)

---

## Langkah 6: Akses Halaman User Management

### 6.1 Klik Menu "Users"

1. Di **sidebar kiri**, klik: **Users**
2. Halaman User Management akan terbuka

### 6.2 Lihat Daftar User

Anda akan melihat:
- **Statistics cards** di atas:
  - Total Users
  - Pending (badge kuning)
  - Approved (badge hijau)
  - Rejected (badge merah)
  
- **Tabel users** dengan kolom:
  - User Info (avatar, nama, email)
  - Role (Student/Mentor)
  - Student Info (data anak untuk student)
  - Status (Pending/Approved/Rejected)
  - Registered (tanggal daftar)
  - Actions (tombol aksi)

**✅ Admin panel sudah siap digunakan!**

---

## Langkah 7: Approve User Pertama (Test)

### 7.1 Filter User Pending

1. Di halaman Users, lihat **dropdown filter** (sebelah search bar)
2. **Pilih:** `Pending`
3. Hanya user dengan status pending yang akan tampil

### 7.2 Lihat Detail User (Opsional)

1. Klik icon **👁️ (eye)** di kolom Actions
2. Modal popup akan muncul dengan detail lengkap user:
   - Informasi pribadi
   - Data anak (untuk student)
   - Data mentor (untuk mentor)

### 7.3 Approve User

1. **Klik tombol hijau** dengan icon **✓ (CheckCircle)**
2. Konfirmasi popup akan muncul:
   ```
   Are you sure you want to APPROVE this registration?
   ```
3. **Klik:** `OK`
4. Loading sebentar...
5. **Alert muncul:** "User approved successfully!"
6. **Status berubah** dari "Pending" (kuning) → "Approved" (hijau)
7. Tabel akan auto-refresh

### 7.4 User Sekarang Bisa Login

User yang baru di-approve sekarang bisa:
- ✅ Login dengan email & password yang didaftarkan
- ✅ Akses dashboard sesuai role (Student/Mentor)

---

## 🎯 Checklist Lengkap

Gunakan checklist ini untuk memastikan semua langkah sudah benar:

### Database Setup
- [ ] Buka Supabase Dashboard
- [ ] Pilih project yang benar
- [ ] Buka Table Editor → users
- [ ] Insert row baru:
  - [ ] email = `admin@kidcoderclub.com`
  - [ ] name = `Admin KidCoder Club`
  - [ ] role = `admin` (huruf kecil!)
  - [ ] status = `approved` (huruf kecil!)
- [ ] Klik Save
- [ ] Row baru muncul di tabel

### Authentication Setup
- [ ] Buka Authentication → Users
- [ ] Klik Add user → Create new user
- [ ] Isi email: `admin@kidcoderclub.com` (sama dengan di table!)
- [ ] Isi password: (password kuat)
- [ ] ✅ Centang "Auto Confirm User"
- [ ] Klik Create User
- [ ] User baru muncul di list

### Test Login
- [ ] Buka https://kidcoderclub-22.vercel.app/admin-login
- [ ] Isi email admin
- [ ] Isi password admin
- [ ] Klik Login
- [ ] Berhasil masuk ke Admin Dashboard
- [ ] Sidebar menu terlihat
- [ ] Klik menu "Users"
- [ ] Halaman User Management terbuka
- [ ] Bisa lihat list users

### Test Approval
- [ ] Ada user dengan status "Pending"
- [ ] Klik tombol hijau (✓) Approve
- [ ] Konfirmasi OK
- [ ] Status berubah jadi "Approved"
- [ ] User bisa login

---

## ⚠️ Troubleshooting

### Problem 1: Login gagal "Invalid credentials"

**Solusi:**
1. Cek email & password ketik ulang dengan teliti
2. Pastikan Auto Confirm User sudah dicentang saat buat user
3. Tunggu 1-2 menit, lalu coba login lagi
4. Cek di Supabase → Authentication → Users, pastikan user ada

### Problem 2: Login berhasil tapi redirect ke halaman utama (bukan admin)

**Solusi:**
1. Buka Supabase → Table Editor → users
2. Cari row dengan email admin
3. Pastikan kolom `role` = `admin` (huruf kecil semua)
4. Jika bukan, edit row dan ubah jadi `admin`
5. Logout dan login lagi

### Problem 3: Tombol Approve tidak muncul

**Solusi:**
1. Pastikan Anda login sebagai admin (role = admin)
2. User harus punya status = "pending" (bukan approved/rejected)
3. Refresh halaman (F5 atau klik tombol refresh)
4. Cek console browser (F12) untuk error

### Problem 4: Error "Failed to approve user"

**Solusi:**
1. Cek internet connection
2. Cek apakah Supabase service berjalan: https://status.supabase.com
3. Periksa RLS policies (lihat ADMIN_GUIDE.md)
4. Cek console browser (F12) untuk error detail

---

## 📝 Catatan Penting

### Keamanan Password Admin
- ✅ Gunakan password kuat (min 12 karakter)
- ✅ Kombinasi huruf besar, kecil, angka, simbol
- ✅ Jangan gunakan password yang mudah ditebak
- ✅ Jangan share password ke siapapun
- ❌ Jangan gunakan: `admin123`, `password`, `123456`

**Contoh password kuat:**
- `Admin@KidCoder2025!`
- `KcAdm!n#Str0ng99`
- `Sup3r$ecureAdm1n`

### Email Admin
- Gunakan email yang Anda kontrol
- Bisa gunakan email asli atau dummy:
  - ✅ `admin@kidcoderclub.com`
  - ✅ `youremail@gmail.com`
  - ✅ `khulafa@gmail.com`
  
### Backup Kredensial
Simpan kredensial admin di tempat aman:
```
ADMIN CREDENTIALS - KIDCODER CLUB
==================================
Email: admin@kidcoderclub.com
Password: [password Anda]
Login URL: https://kidcoderclub-22.vercel.app/admin-login
Supabase Project: tasyihduktdqhshrizsl
Created: 7 November 2025
```

---

## 🎥 Video Tutorial (Opsional)

Jika masih bingung, bisa record screen saat mengikuti tutorial ini:
1. Gunakan OBS Studio / Windows Game Bar (Win+G)
2. Record layar saat buat admin user
3. Simpan video untuk referensi nanti

---

## 📞 Butuh Bantuan?

Jika masih ada masalah:
1. Screenshot error yang muncul
2. Cek Supabase logs: Dashboard → Logs → Postgres Logs
3. Cek browser console (F12) → tab Console
4. Catat error message lengkap

---

**Good luck! 🚀**

Setelah selesai setup, Anda bisa mulai approve user yang mendaftar!
