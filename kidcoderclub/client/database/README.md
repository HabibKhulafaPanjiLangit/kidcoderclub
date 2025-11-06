# �️ Database

**Database schema, types, dan SQL migrations untuk KidCoderClub**

## 📂 Structure

```
database/
├── README.md                 # This file
├── schema/                   # SQL migrations
│   ├── 01_initial.sql        # Initial setup
│   ├── 02_disable_rls.sql    # Disable RLS (dev only)
│   └── diagram.md            # Schema diagram
└── types/                    # TypeScript types
    └── database.types.ts     # Database types
```

## � Schema

**Tables**: `users` → `students` | `mentors`  
**Storage**: `certificates` (public)  
**Detail**: See `schema/diagram.md`

## 🚀 Quick Start

```bash
# 1. Create Supabase project at https://app.supabase.com
# 2. Run SQL: schema/01_initial.sql
# 3. Copy credentials to .env
# 4. Done!
```

**Full guide**: `/docs/SETUP_GUIDE.md`

## � Documentation

- **Setup**: `/docs/SETUP_GUIDE.md`
- **Deploy**: `/docs/DEPLOYMENT.md`
- **Troubleshoot**: `/docs/TROUBLESHOOTING.md`
- **Reference**: `/docs/DATABASE_REFERENCE.md`

## ⚠️ Dev vs Prod

**Development**: Disable RLS → `schema/02_dev_disable_rls.sql`  
**Production**: Keep RLS enabled!
