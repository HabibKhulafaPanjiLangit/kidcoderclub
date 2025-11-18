# 🎓 KidCoderClub# 🎓 KidCoderClub



Platform pembelajaran coding untuk anak dengan sistem pendaftaran student & mentor.**Platform pendaftaran online untuk siswa dan mentor coding anak-anak**



## 🚀 Quick Start---



```bash## 🚀 Quick Start

npm install

cp .env.example .env```bash

# Edit .env dengan Supabase credentials# 1. Install dependencies

npm run devnpm install

```

# 2. Setup environment variables

Open http://localhost:5173cp .env.example .env

# Edit .env dengan credentials Supabase Anda

## 📁 Structure

# 3. Run development server

```npm run dev

frontend/

├── src/           # Source code# 4. Open browser

│   ├── admin/     # Admin dashboardhttp://localhost:5173

│   ├── mentor/    # Mentor portal  ```

│   ├── user/      # User-facing pages

│   └── lib/       # supabase.ts, utils---

├── database/      # SQL schemas & TS types

├── docs/          # Documentation## 📂 Project Structure

└── public/        # Static assets

``````

frontend/

## 📚 Docs├── database/              # 📁 DATABASE & DOCUMENTATION

│   ├── README.md          # Database overview

| Doc | Link |│   ├── QUICK_REFERENCE.md # Cheat sheet untuk developer

|-----|------|│   ├── SUMMARY.md         # Summary reorganisasi

| **Setup Supabase** | `docs/SETUP_GUIDE.md` |│   ├── schema/            # SQL migration files

| **Deploy to Vercel** | `docs/DEPLOYMENT.md` |│   ├── types/             # TypeScript type definitions

| **Database Schema** | `database/README.md` |│   └── docs/              # Complete documentation

| **Quick Reference** | `docs/DATABASE_REFERENCE.md` |│       ├── SETUP_GUIDE.md

| **Fix Issues** | `docs/TROUBLESHOOTING.md` |│       ├── DEPLOYMENT.md

│       └── TROUBLESHOOTING.md

## 🛠 Tech│

├── src/

**Frontend**: React + TypeScript + Vite  │   ├── lib/

**Style**: Tailwind CSS  │   │   └── supabase.ts    # Supabase client

**Database**: Supabase (PostgreSQL)  │   ├── services/

**Deploy**: Vercel│   │   └── authService.ts # Authentication service

│   ├── user/              # User-facing pages

## 🔧 Commands│   ├── admin/             # Admin dashboard

│   └── mentor/            # Mentor dashboard

```bash│

npm run dev       # Dev server├── .env                   # Environment variables (local)

npm run build     # Production build└── README.md              # This file

npm run preview   # Preview build```

npm run lint      # Lint code

```---



## 🗄️ Database## 📖 Documentation



3 tables: `users` → `students` | `mentors`  ### 🎯 [Quick Reference](database/QUICK_REFERENCE.md)

See `database/schema/diagram.md` for details.Cheat sheet untuk developer - commands, tips, & common fixes



## 🚀 Deploy### 📘 [Setup Guide](database/docs/SETUP_GUIDE.md)

Step-by-step setup Supabase dari awal

1. Push to GitHub

2. Import to Vercel### 🚀 [Deployment Guide](database/docs/DEPLOYMENT.md)

3. Add environment variablesDeploy ke production dengan Vercel

4. Deploy!

### 🔧 [Troubleshooting](database/docs/TROUBLESHOOTING.md)

See `docs/DEPLOYMENT.md` for full guide.Solusi untuk masalah umum



## 📝 Environment Variables### 📊 [Schema Diagram](database/schema/schema_diagram.md)

Database structure & ERD

```env

VITE_SUPABASE_URL=https://xxx.supabase.co---

VITE_SUPABASE_ANON_KEY=eyJxxx...

```## 🗄️ Database



Get from: Supabase Dashboard → Settings → APIProject ini menggunakan **Supabase** sebagai backend.



## 🆘 Help### Tables:

- `users` - Main user table

- Check `docs/TROUBLESHOOTING.md`- `students` - Student profiles

- Read documentation in `docs/`- `mentors` - Mentor profiles

- Create GitHub issue

### Setup Database:

---1. Buat project di [Supabase](https://app.supabase.com)

2. Run migration: `database/schema/01_initial_migration.sql`

**Version**: 2.0.0  3. Configure `.env` file

**Made with ❤️ for young coders**

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
