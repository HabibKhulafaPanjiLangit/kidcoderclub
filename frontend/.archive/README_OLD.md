# 🎓 KidCoderClub

**Platform pendaftaran online untuk siswa dan mentor coding anak-anak**

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables
cp .env.example .env
# Edit .env dengan credentials Supabase Anda

# 3. Run development server
npm run dev

# 4. Open browser
http://localhost:5173
```

---

## 📂 Project Structure

```
frontend/
├── database/              # 📁 DATABASE & DOCUMENTATION
│   ├── README.md          # Database overview
│   ├── QUICK_REFERENCE.md # Cheat sheet untuk developer
│   ├── SUMMARY.md         # Summary reorganisasi
│   ├── schema/            # SQL migration files
│   ├── types/             # TypeScript type definitions
│   └── docs/              # Complete documentation
│       ├── SETUP_GUIDE.md
│       ├── DEPLOYMENT.md
│       └── TROUBLESHOOTING.md
│
├── src/
│   ├── lib/
│   │   └── supabase.ts    # Supabase client
│   ├── services/
│   │   └── authService.ts # Authentication service
│   ├── user/              # User-facing pages
│   ├── admin/             # Admin dashboard
│   └── mentor/            # Mentor dashboard
│
├── .env                   # Environment variables (local)
└── README.md              # This file
```

---

## 📖 Documentation

### 🎯 [Quick Reference](database/QUICK_REFERENCE.md)
Cheat sheet untuk developer - commands, tips, & common fixes

### 📘 [Setup Guide](database/docs/SETUP_GUIDE.md)
Step-by-step setup Supabase dari awal

### 🚀 [Deployment Guide](database/docs/DEPLOYMENT.md)
Deploy ke production dengan Vercel

### 🔧 [Troubleshooting](database/docs/TROUBLESHOOTING.md)
Solusi untuk masalah umum

### 📊 [Schema Diagram](database/schema/schema_diagram.md)
Database structure & ERD

---

## 🗄️ Database

Project ini menggunakan **Supabase** sebagai backend.

### Tables:
- `users` - Main user table
- `students` - Student profiles
- `mentors` - Mentor profiles

### Setup Database:
1. Buat project di [Supabase](https://app.supabase.com)
2. Run migration: `database/schema/01_initial_migration.sql`
3. Configure `.env` file

**Full guide:** [Setup Guide](database/docs/SETUP_GUIDE.md)

---

## 🔐 Environment Variables

Create `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Get credentials from: Supabase Dashboard → Settings → API

---

## 🛠️ Development

### Run Dev Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 🚀 Deployment

Deploy ke Vercel:

1. Push code ke GitHub
2. Import project di Vercel
3. Set environment variables
4. Deploy!

**Full guide:** [Deployment Guide](database/docs/DEPLOYMENT.md)

---

## 🔥 Features

- ✅ Student registration dengan parent info
- ✅ Mentor registration dengan certificates upload
- ✅ Admin approval system
- ✅ Supabase integration
- ✅ Row Level Security (RLS)
- ✅ File upload ke Supabase Storage
- ✅ TypeScript support
- ✅ Responsive design

---

## 🆘 Need Help?

1. Check [Quick Reference](database/QUICK_REFERENCE.md)
2. Read [Troubleshooting](database/docs/TROUBLESHOOTING.md)
3. Check [Supabase Docs](https://supabase.com/docs)
4. Open GitHub Issue

---

## 📝 Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Backend:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Storage:** Supabase Storage

---

## 👥 Team

- Developer: [Your Name]
- Project: KidCoderClub
- Updated: 2024-11-06

---

## 📄 License

[Your License Here]

---

**Happy Coding! 🎉**
