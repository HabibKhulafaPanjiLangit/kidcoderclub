# KidCoderClub Platform

Platform pembelajaran coding untuk anak-anak dengan sistem manajemen lengkap.

## 📁 Struktur Proyek

```
KidCoderCLub2-master/
├── frontend/           → Aplikasi utama (React + Vite + Supabase)
├── backend/            → API server (Node.js + TypeScript)
├── .archive-monorepo/  → Proyek monorepo v2 (belum digunakan)
├── .gitignore         → Git ignore rules
└── vercel.json        → Deployment config untuk Vercel
```

## 🚀 Quick Start

### Frontend (Main App)
```bash
cd frontend
npm install
npm run dev
```
Buka http://localhost:5173

### Backend (API Server)
```bash
cd backend
npm install
npm run dev
```
API running di http://localhost:3000

## 📚 Dokumentasi

Dokumentasi lengkap ada di masing-masing folder:
- **Frontend**: `frontend/README.md` - Setup Supabase, deployment, troubleshooting
- **Backend**: `backend/README.md` - API documentation, setup guide

## 🗄️ Database

Database menggunakan **Supabase** (PostgreSQL):
- Setup guide: `frontend/docs/SETUP_GUIDE.md`
- Schema: `frontend/database/schema/`
- Types: `frontend/database/types/`

## 📦 Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- Supabase (database + auth + storage)

### Backend
- Node.js + TypeScript
- Express (API framework)
- MongoDB/Mongoose (jika digunakan)

## 🔧 Environment Variables

### Frontend (.env)
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (.env)
```env
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

## 📝 Notes

- Proyek utama yang aktif: `frontend/` dan `backend/`
- Folder `.archive-monorepo/` berisi proyek monorepo v2 yang belum digunakan
- Deploy production menggunakan Vercel (frontend only)
- Backend bisa dideploy terpisah (Railway, Render, dll)

## 🤝 Contributing

1. Clone repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Create Pull Request

## 📄 License

Lihat file LICENSE di masing-masing folder.
