# 🎓 KidCoderClub - Supabase Integration

## ✅ Status Integrasi

Aplikasi KidCoderClub sekarang sudah terintegrasi dengan Supabase! 

### 🔧 Yang Sudah Dikerjakan:

1. ✅ **Supabase Client Setup** - `src/lib/supabase.ts`
2. ✅ **Authentication Service** - `src/services/authService.ts`
3. ✅ **Database Migration SQL** - `supabase_migration.sql`
4. ✅ **Registrasi dengan Supabase**
5. ✅ **Login dengan Supabase**
6. ✅ **Admin User Management**
7. ✅ **Upload Sertifikat ke Supabase Storage**
8. ✅ **Fallback ke localStorage** (jika Supabase tidak dikonfigurasi)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Setup Supabase (PILIHAN A - Dengan Supabase)

**a. Buat Project di Supabase:**
- Kunjungi https://app.supabase.com
- Buat project baru
- Copy **Project URL** dan **Anon Key**

**b. Konfigurasi Environment:**
```bash
# Copy .env.example ke .env
copy .env.example .env

# Edit .env dan isi:
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**c. Jalankan Migration:**
- Buka Supabase Dashboard → SQL Editor
- Copy isi file `supabase_migration.sql`
- Paste dan Run

### 2. Setup Tanpa Supabase (PILIHAN B - LocalStorage Only)

Jika tidak ingin setup Supabase, **tidak perlu melakukan apa-apa**. Aplikasi akan otomatis menggunakan localStorage sebagai database lokal.

### 3. Jalankan Aplikasi

```bash
npm run dev
```

Buka browser: http://localhost:5173

## 📖 Dokumentasi Lengkap

Lihat `SUPABASE_SETUP.md` untuk panduan lengkap setup Supabase.

## 🎯 Fitur

### Untuk User:
- ✅ Registrasi sebagai Murid atau Mentor
- ✅ Upload sertifikat (khusus Mentor)
- ✅ Buat password untuk login
- ✅ Login setelah di-approve admin
- ✅ Notifikasi status pending/rejected

### Untuk Admin:
- ✅ Lihat semua pendaftaran
- ✅ Filter berdasarkan status
- ✅ Approve/Reject pendaftaran
- ✅ Lihat detail lengkap user

## 🗄️ Database Schema

```
users (main table)
├── id (UUID)
├── email
├── name
├── role (student/mentor)
├── status (pending/approved/rejected)
└── phone

students (student details)
├── user_id → users.id
├── parent_name
├── child_name
└── ...

mentors (mentor details)
├── user_id → users.id
├── mentor_name
├── expertise
└── certificates[]
```

## 🔐 Security

- ✅ Row Level Security (RLS) enabled
- ✅ Password hashing dengan Supabase Auth
- ✅ Session management otomatis
- ✅ Admin-only policies

## 🔄 Mode Operasi

### Mode Supabase (Production)
Jika `.env` dikonfigurasi:
- Data disimpan di Supabase (cloud database)
- Real-time sync
- Sertifikat di-upload ke Supabase Storage
- Scalable untuk banyak user

### Mode localStorage (Development/Fallback)
Jika `.env` tidak ada:
- Data disimpan di browser localStorage
- Tidak ada sync antar device
- Sertifikat hanya nama file (tidak real upload)
- Cocok untuk testing/development

## 📝 File Penting

```
frontend/
├── .env.example                    # Template environment variables
├── .env                            # Your config (git-ignored)
├── supabase_migration.sql          # Database schema
├── SUPABASE_SETUP.md              # Panduan lengkap setup
├── src/
│   ├── lib/
│   │   └── supabase.ts            # Supabase client config
│   ├── services/
│   │   └── authService.ts         # Auth logic (register/login)
│   ├── user/
│   │   ├── Login.tsx              # Login page
│   │   └── Registration.tsx       # Registration form
│   └── admin/
│       └── components/
│           └── UserManagement.tsx # Admin approval page
```

## 🐛 Troubleshooting

### "Missing Supabase environment variables"
- File `.env` tidak ada atau kosong
- **Solusi**: Buat `.env` atau biarkan (akan pakai localStorage)

### User tidak bisa login
- Status masih `pending` atau `rejected`
- **Solusi**: Admin harus approve dulu di UserManagement

### Upload sertifikat gagal
- Bucket `certificates` belum dibuat
- **Solusi**: Jalankan migration SQL lagi

## 💡 Tips

1. **Development**: Pakai localStorage mode (tanpa .env) untuk cepat
2. **Production**: Setup Supabase untuk real database
3. **Testing**: Buat beberapa user dengan status berbeda
4. **Admin**: Buat admin user dengan metadata `{"role": "admin"}`

## 📞 Next Steps

1. ✅ Setup Supabase (optional)
2. ✅ Jalankan migration SQL
3. ✅ Test registrasi & login
4. ✅ Buat admin user
5. ✅ Test admin approval flow

---

**Happy Coding! 🚀**
