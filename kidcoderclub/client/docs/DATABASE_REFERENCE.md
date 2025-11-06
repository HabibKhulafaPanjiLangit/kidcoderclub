# 🎯 Quick Reference Card

**KidCoderClub Database - Cheat Sheet untuk Developer**

---

## 🚀 Quick Start (5 minutes)

```bash
# 1. Setup Supabase
https://app.supabase.com → New Project

# 2. Run Migration
Copy: database/schema/01_initial_migration.sql
Paste: Supabase SQL Editor → Run

# 3. Get Credentials
Supabase → Settings → API
Copy: URL & Anon Key

# 4. Setup .env
echo VITE_SUPABASE_URL=your-url > .env
echo VITE_SUPABASE_ANON_KEY=your-key >> .env

# 5. Test
npm run dev
```

---

## 📁 File Locations

| What | Where |
|------|-------|
| **Setup Guide** | `database/docs/SETUP_GUIDE.md` |
| **Deploy Guide** | `database/docs/DEPLOYMENT.md` |
| **Troubleshoot** | `database/docs/TROUBLESHOOTING.md` |
| **Schema SQL** | `database/schema/01_initial_migration.sql` |
| **Disable RLS** | `database/schema/02_disable_rls.sql` |
| **ERD Diagram** | `database/schema/schema_diagram.md` |
| **Types** | `database/types/database.types.ts` |
| **Supabase Client** | `src/lib/supabase.ts` |
| **Env Vars** | `.env` (local) or Vercel Dashboard |

---

## 💾 Database Tables

```
users         → Main user table (email, role, status)
  ├─ students → Student profiles (parent info, child info)
  └─ mentors  → Mentor profiles (expertise, certificates)
```

---

## 🔐 Environment Variables

```env
# Local Development (.env file)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# Vercel Production
Same variables → Vercel Dashboard → Settings → Env Vars
```

---

## 📝 Common SQL Commands

### Disable RLS (Dev Only)
```sql
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.students DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors DISABLE ROW LEVEL SECURITY;
```

### Check Tables
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

### Check RLS Status
```sql
SELECT tablename, rowsecurity FROM pg_tables 
WHERE schemaname = 'public';
```

### View Recent Users
```sql
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;
```

### Count by Status
```sql
SELECT status, COUNT(*) FROM users GROUP BY status;
```

---

## 💻 TypeScript Usage

### Import Types
```typescript
// From supabase.ts (recommended)
import { User, Student, Mentor } from '@/lib/supabase';

// Or from types directly
import type { User } from '@/database/types/database.types';
```

### Use in Component
```typescript
import { supabase } from '@/lib/supabase';

// Query users
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('status', 'pending');

// Insert student
const { data, error } = await supabase
  .from('students')
  .insert({
    user_id: userId,
    parent_name: 'John Doe',
    child_name: 'Jane Doe',
    child_age: 10,
    class_name: 'Python Basics'
  });
```

---

## 🐛 Quick Debug

### Check Env Vars Loaded
```javascript
// In browser console
console.log(import.meta.env.VITE_SUPABASE_URL);
console.log(import.meta.env.VITE_SUPABASE_ANON_KEY);
```

### Test Supabase Connection
```typescript
const test = async () => {
  const { data, error } = await supabase.from('users').select('count');
  console.log('Test:', { data, error });
};
```

### Check Console Logs
Look for these in browser console:
```
🔍 ENV CHECK: { url: "...", key: "EXISTS" }
✅ Supabase connected successfully!
```

---

## 🚨 Common Errors & Quick Fixes

| Error | Quick Fix |
|-------|-----------|
| `Failed to fetch` | Check `.env` file, restart dev server |
| `Invalid API key` | Use ANON key (not service_role) |
| `Row Level Security` | Run `02_disable_rls.sql` (dev only) |
| `Table not found` | Run `01_initial_migration.sql` |
| `Env vars missing` | Add to Vercel Dashboard → Redeploy |

---

## 🔄 Development Workflow

```
1. Pull latest code
   ↓
2. npm install (if package.json changed)
   ↓
3. Check .env exists
   ↓
4. npm run dev
   ↓
5. Code & test
   ↓
6. git add, commit, push
   ↓
7. Vercel auto-deploys ✅
```

---

## 📦 Deploy Checklist

```
Local:
☐ All features work
☐ No console errors
☐ Git committed

Supabase:
☐ RLS enabled (production!)
☐ Domain added to redirect URLs

Vercel:
☐ Env vars set
☐ Build successful
☐ Production tested
```

---

## 🆘 Emergency Contacts

| Issue | Action |
|-------|--------|
| **Can't connect** | `database/docs/TROUBLESHOOTING.md` |
| **Deploy fails** | `database/docs/DEPLOYMENT.md` |
| **Schema questions** | `database/schema/schema_diagram.md` |
| **Still stuck** | Supabase Discord / GitHub Issues |

---

## 📚 Learning Resources

- 📘 [Full Setup Guide](database/docs/SETUP_GUIDE.md)
- 🚀 [Deployment Guide](database/docs/DEPLOYMENT.md)
- 🔧 [Troubleshooting](database/docs/TROUBLESHOOTING.md)
- 📊 [Schema Diagram](database/schema/schema_diagram.md)
- 📖 [Supabase Docs](https://supabase.com/docs)

---

## ⚡ Pro Tips

1. **Always restart dev server** after changing `.env`
2. **Use RLS in production**, disable only in dev
3. **Check browser console** for debug logs
4. **Commit often**, Vercel deploys automatically
5. **Test locally first** before pushing to production
6. **Keep docs updated** when schema changes
7. **Monitor Supabase logs** for errors

---

**Print this card and keep it handy! 🎯**

---

**Last Updated:** 2024-11-06  
**Version:** 1.0
