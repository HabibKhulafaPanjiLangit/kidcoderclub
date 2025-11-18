# Backend API Server

Backend API untuk KidCoderClub platform menggunakan Node.js + TypeScript + Express.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

Server running di: http://localhost:3000

## 📁 Struktur Folder

```
backend/
├── src/
│   ├── server.ts          → Entry point aplikasi
│   ├── config/            → Configuration files
│   ├── controllers/       → Request handlers
│   │   └── v1/           → API v1 controllers
│   ├── lib/              → Libraries & utilities
│   │   ├── express_rate_limit.ts
│   │   ├── mongoose.ts
│   │   └── winston.ts
│   └── routes/           → API routes
│       └── v1/           → API v1 routes
├── nodemon.json          → Nodemon config
├── tsconfig.json         → TypeScript config
└── package.json          → Dependencies
```

## 🔧 Environment Variables

Buat file `.env` di root backend dengan isi:

```env
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=your_mongodb_or_mysql_url

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# CORS
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

## 📦 Tech Stack

- **Node.js** + **TypeScript** - Runtime & language
- **Express 5** - Web framework
- **MongoDB/Mongoose** - Database (jika digunakan)
- **MySQL** - Alternative database
- **Winston** - Logging
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - API rate limiting
- **Compression** - Response compression

## 📝 Scripts

```bash
npm run dev      # Development dengan hot reload
npm run build    # Build TypeScript to JavaScript
npm start        # Production mode (setelah build)
npm run lint     # Lint code dengan ESLint
```

## 🗄️ Database

Backend mendukung dua database:
1. **MongoDB** (via Mongoose) - Untuk NoSQL
2. **MySQL** - Untuk relational database

Setup ada di:
- `src/lib/mongoose.ts` - MongoDB connection
- MySQL setup - Custom implementation

## 🔐 Security

- **Helmet**: Security headers
- **CORS**: Origin whitelist
- **Rate Limiting**: Prevent abuse
- **Body Parser**: Request size limiting
- **Cookie Parser**: Secure cookies

## 📚 API Documentation

### Base URL
```
Development: http://localhost:3000
Production: https://your-api-domain.com
```

### Endpoints

API v1 routes ada di `src/routes/v1/`

Contoh:
```
GET  /api/v1/health    → Health check
POST /api/v1/auth      → Authentication
GET  /api/v1/users     → Get users
```

## 🚀 Deployment

### Railway/Render/Heroku

1. Push code ke Git repository
2. Connect repository ke platform
3. Set environment variables
4. Deploy!

### Environment Variables (Production)
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=your_production_db_url
JWT_SECRET=your_strong_secret
CORS_ORIGIN=https://your-frontend-domain.com
```

## 🐛 Debugging

Logs menggunakan **Winston** logger:
- **Development**: Console output dengan colors
- **Production**: File logs di `logs/` folder

```typescript
import logger from './lib/winston';

logger.info('Info message');
logger.error('Error message');
logger.warn('Warning message');
```

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature-name`
2. Make changes
3. Test locally: `npm run dev`
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin feature-name`

## 📄 License

Apache-2.0 License
