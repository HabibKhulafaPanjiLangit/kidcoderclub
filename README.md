# KidCoderClub - Full Stack Application

## 📁 Project Structure

```
kidcoderclub/
├── client/              # Frontend (React + Vite + TypeScript)
│   ├── src/            # Source code
│   ├── public/         # Static assets
│   ├── database/       # Database types & schemas
│   ├── package.json    # Client dependencies
│   └── .env            # Client environment variables
│
├── server/              # Backend (Node.js + Express + TypeScript)
│   ├── src/            # Source code
│   ├── package.json    # Server dependencies
│   └── .env            # Server environment variables
│
├── package.json         # Root package.json (monorepo manager)
├── vercel.json          # Vercel deployment configuration
└── README.md            # This file
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd kidcoderclub
npm run install:all
```

### 2. Development Mode

**Run both client and server:**
```bash
npm run dev
```

**Run client only:**
```bash
npm run client
```

**Run server only:**
```bash
npm run server
```

### 3. Build

**Build client:**
```bash
npm run build:client
```

**Build server:**
```bash
npm run build:server
```

## 🌐 Deployment

### Vercel (Frontend)

1. **Connect Repository** ke Vercel
2. **Set Root Directory**: `kidcoderclub`
3. **Framework Preset**: Other
4. **Build Command**: `cd client && npm install && npm run build`
5. **Output Directory**: `client/dist`
6. **Install Command**: `npm install`

**Environment Variables di Vercel:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Backend Deployment

Deploy folder `server/` ke platform pilihan:
- Railway
- Render
- Heroku
- DigitalOcean App Platform

## 📝 Environment Variables

### Client (`.env` di folder `client/`)
```env
VITE_SUPABASE_URL=https://tasyihduktdqhshrizsl.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Server (`.env` di folder `server/`)
```env
PORT=5000
DATABASE_URL=your_database_url
```

## 🛠️ Technologies

### Frontend (Client)
- React 18
- TypeScript
- Vite
- TailwindCSS
- Supabase Client
- React Router
- Framer Motion

### Backend (Server)
- Node.js
- Express
- TypeScript
- (Add your backend stack here)

## 📦 Package Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Run both client and server |
| `npm run client` | Run frontend only |
| `npm run server` | Run backend only |
| `npm run build:client` | Build frontend for production |
| `npm run build:server` | Build backend for production |
| `npm run install:all` | Install all dependencies |

## 🐛 Troubleshooting

### Vercel Deployment Errors

1. **Check Root Directory**: Pastikan set ke `kidcoderclub`
2. **Check Environment Variables**: VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY harus di-set
3. **Check Build Command**: `cd client && npm install && npm run build`
4. **Check Output Directory**: `client/dist`

### Local Development Issues

1. **Port already in use**: Ganti port di config
2. **Module not found**: Run `npm run install:all`
3. **Build fails**: Check console errors dan dependencies

## 📄 License

[Add your license here]

## 👥 Contributors

[Add contributors here]
