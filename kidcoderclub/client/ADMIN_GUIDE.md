# 🔐 Admin Panel - User Approval Guide

## Cara Mengakses Admin Panel

### 1. Login sebagai Admin

**URL Admin Login:**
```
https://kidcoderclub-22.vercel.app/admin-login
```

Atau dari halaman utama, akses langsung:
```
https://kidcoderclub-22.vercel.app/admin
```

### 2. Kredensial Admin Default

Untuk login pertama kali, Anda perlu membuat akun admin di Supabase database secara manual, atau gunakan kredensial yang sudah dibuat.

**Cara Membuat Admin di Supabase:**

1. Buka [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda (`tasyihduktdqhshrizsl`)
3. Klik **Table Editor** → **users**
4. Klik **Insert** → **Insert row**
5. Isi data:
   ```
   id: (auto-generated UUID)
   email: admin@kidcoderclub.com
   name: Admin KidCoder
   role: admin
   status: approved
   phone: null (opsional)
   created_at: now()
   ```
6. Klik **Save**

7. Kemudian buat auth user di **Authentication** → **Users** → **Add user**:
   ```
   Email: admin@kidcoderclub.com
   Password: (buat password kuat, mis: Admin123!)
   ```

---

## Cara Approve/Reject User Registration

### Dashboard Admin - Halaman Users

Setelah login sebagai admin, Anda akan diarahkan ke **Admin Dashboard**.

**Navigasi:**
1. Klik **Users** di sidebar kiri
2. Halaman akan menampilkan semua user yang terdaftar

### Fitur Halaman Users

#### 📊 Statistics Cards (Di atas)
- **Total Users**: Jumlah semua user
- **Pending**: User menunggu approval (badge kuning)
- **Approved**: User yang sudah disetujui (badge hijau)
- **Rejected**: User yang ditolak (badge merah)

#### 🔍 Filter & Search
- **Search bar**: Cari berdasarkan nama, email, atau nama anak
- **Filter dropdown**: Filter berdasarkan status:
  - All (semua)
  - Pending (menunggu)
  - Approved (disetujui)
  - Rejected (ditolak)
- **Refresh button**: Reload data terbaru

#### 📋 Tabel User Registrations

Kolom yang ditampilkan:
1. **User Info**: Avatar, nama, email
2. **Role**: Student atau Mentor (badge berwarna)
3. **Student Info**: Nama anak, umur, kelas, nama orang tua (untuk student)
4. **Status**: Pending/Approved/Rejected (badge berwarna)
5. **Registered**: Tanggal pendaftaran
6. **Actions**: Tombol aksi

---

## 🚀 Cara Approve User (Step-by-Step)

### Untuk User dengan Status "Pending"

1. **Lihat detail user:**
   - Klik icon **eye (👁️)** untuk membuka modal detail
   - Review informasi lengkap user

2. **Approve user:**
   - Klik tombol **hijau dengan icon CheckCircle (✓)**
   - Konfirmasi pop-up: "Are you sure you want to APPROVE this registration?"
   - Klik **OK**
   - Status akan berubah dari "Pending" menjadi "Approved"
   - User akan menerima notifikasi dan bisa login

3. **Reject user (jika perlu):**
   - Klik tombol **merah dengan icon XCircle (✕)**
   - Konfirmasi pop-up: "Are you sure you want to REJECT this registration?"
   - Klik **OK**
   - Status akan berubah dari "Pending" menjadi "Rejected"

### Tombol Actions yang Tersedia

| Icon | Warna | Fungsi | Status User |
|------|-------|--------|-------------|
| 👁️ Eye | Abu-abu | View Details | Semua |
| ✓ CheckCircle | Hijau | Approve | Pending |
| ✕ XCircle | Merah | Reject | Pending |
| 🔄 RefreshCw | Biru | Re-approve | Rejected |

---

## 📧 Notifikasi untuk User

### Setelah Approve:
User akan bisa:
1. ✅ Login dengan email & password yang didaftarkan
2. ✅ Akses dashboard sesuai role (Student/Mentor)
3. ✅ Melihat course/materials/etc

### Jika Rejected:
User:
1. ❌ Tidak bisa login
2. ❌ Perlu mendaftar ulang dengan data yang benar
3. ❌ Atau hubungi admin untuk klarifikasi

---

## 🔒 Row Level Security (RLS) di Supabase

Untuk keamanan, pastikan RLS policies sudah di-set:

### Users Table Policy:
```sql
-- Admin dapat read/update semua users
CREATE POLICY "Admin can manage all users"
ON users
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);
```

### Students Table Policy:
```sql
-- Admin dapat read semua students
CREATE POLICY "Admin can view all students"
ON students
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);
```

---

## 🛠️ Troubleshooting

### Error: "Failed to approve user"
**Solusi:**
1. Cek apakah Anda login sebagai admin
2. Periksa RLS policies di Supabase
3. Cek console browser (F12) untuk error detail

### Tombol Approve/Reject tidak muncul
**Solusi:**
1. Pastikan user memiliki status "pending"
2. Refresh halaman (klik tombol refresh)
3. Re-login sebagai admin

### User tidak bisa login setelah di-approve
**Solusi:**
1. Pastikan status benar-benar "approved" (cek di database)
2. User perlu logout dan login ulang
3. Clear browser cache/cookies

---

## 📱 Quick Access URLs

| Halaman | URL |
|---------|-----|
| Admin Login | https://kidcoderclub-22.vercel.app/admin-login |
| Admin Dashboard | https://kidcoderclub-22.vercel.app/admin |
| User Management | https://kidcoderclub-22.vercel.app/admin/users |
| Statistics | https://kidcoderclub-22.vercel.app/admin/stats |

---

## 🎯 Best Practices

1. **Review setiap pendaftaran** - Cek kelengkapan data sebelum approve
2. **Respond cepat** - User menunggu approval untuk bisa mengakses platform
3. **Komunikasi** - Jika reject, beri tahu user alasannya (via email manual)
4. **Backup data** - Export user list secara berkala dari Supabase
5. **Monitor stats** - Cek dashboard statistics untuk tracking

---

## 📞 Support

Jika ada masalah atau pertanyaan:
1. Cek Supabase logs: Dashboard → Logs → Postgres Logs
2. Cek browser console untuk error JavaScript
3. Test connection: https://kidcoderclub-22.vercel.app/env-check.html

---

**Terakhir diupdate:** 7 November 2025  
**Versi:** 1.0  
**Platform:** Vercel + Supabase
