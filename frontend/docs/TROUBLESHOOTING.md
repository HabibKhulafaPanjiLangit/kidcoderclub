# 🚨 Troubleshooting Guide

Common issues dan solusinya saat setup/develop dengan Supabase.

---

## 🔴 Connection Issues

### Issue: "Failed to fetch" atau "Network Error"

**Symptoms:**
- Console error: `Failed to fetch`
- Supabase connection test failed
- Cannot load data from database

**Possible Causes & Solutions:**

#### 1. Environment Variables Not Set

**Check:**
```javascript
// Di browser console
console.log(import.meta.env.VITE_SUPABASE_URL);
console.log(import.meta.env.VITE_SUPABASE_ANON_KEY);
```

**Solution:**
- ✅ Pastikan `.env` file exists di root `frontend/`
- ✅ Variable names HARUS punya prefix `VITE_`
- ✅ Restart dev server after adding `.env`

#### 2. Wrong Supabase URL

**Check:**
```javascript
// Should be like: https://xxxxx.supabase.co
// NOT: https://xxxxx.supabase.co/rest/v1
```

**Solution:**
- Copy URL from Supabase Dashboard → Settings → API
- Don't add `/rest/v1` or any path

#### 3. Row Level Security (RLS) Blocking Access

**Check:**
```sql
-- Di Supabase SQL Editor
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

**Solution untuk Development:**
```sql
-- Disable RLS temporarily
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.students DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors DISABLE ROW LEVEL SECURITY;
```

⚠️ **Remember:** Re-enable RLS untuk production!

#### 4. CORS Issues (Vercel/Production)

**Solution:**
- Add your domain di Supabase:
  - Authentication → URL Configuration
  - Add to **Redirect URLs**: `https://yourdomain.com/**`

---

## 🔴 Authentication Issues

### Issue: "Invalid API key"

**Symptoms:**
- Error: `Invalid API key`
- 401 Unauthorized

**Solution:**
```javascript
// Check key validity
// Key should start with: eyJ
// Copy ANON key, NOT service_role key!
```

Get correct key from: Supabase → Settings → API → **anon** **public**

### Issue: "Email not confirmed"

**Symptoms:**
- Cannot login after registration
- Email confirmation required

**Solution:**

**Option 1 - Disable email confirmation (development):**
1. Supabase → Authentication → Providers → Email
2. Turn OFF **"Confirm email"**
3. Save

**Option 2 - Manually confirm user:**
```sql
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email = 'user@email.com';
```

### Issue: Cannot create user / Registration fails

**Check RLS policies:**
```sql
-- Should return at least 1 policy with INSERT
SELECT * FROM pg_policies 
WHERE tablename = 'users' 
  AND cmd = 'INSERT';
```

**Solution:**
```sql
-- Re-add INSERT policy
CREATE POLICY "Anyone can register" ON public.users
  FOR INSERT WITH CHECK (true);
```

---

## 🔴 Database Issues

### Issue: Table doesn't exist

**Symptoms:**
- Error: `relation "public.users" does not exist`

**Solution:**
```sql
-- Verify tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- If missing, run migration:
-- Copy from: database/schema/01_initial_migration.sql
```

### Issue: Foreign key constraint violation

**Symptoms:**
- Error: `insert or update on table "students" violates foreign key constraint`

**Cause:**
- Trying to insert `student` with `user_id` yang tidak ada

**Solution:**
```sql
-- Check if user exists
SELECT id FROM users WHERE id = 'user-uuid-here';

-- If not, create user first before student profile
```

### Issue: Check constraint violation

**Symptoms:**
- Error: `new row for relation "students" violates check constraint`

**Common Cases:**
```sql
-- child_age must be 5-13
INSERT INTO students (child_age) VALUES (15); -- ❌ Error
INSERT INTO students (child_age) VALUES (10); -- ✅ OK

-- role must be 'student' or 'mentor'
INSERT INTO users (role) VALUES ('admin'); -- ❌ Error
INSERT INTO users (role) VALUES ('student'); -- ✅ OK
```

---

## 🔴 Vercel Deployment Issues

### Issue: Environment variables not loaded

**Symptoms:**
- Works locally, fails on Vercel
- Console shows: `key: 'MISSING'`

**Solution:**
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add both variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. ⚠️ Apply to: **Production**, **Preview**, **Development**
4. **Redeploy** (important!)

### Issue: Build fails on Vercel

**Check build logs:**
```
Error: Cannot find module '@supabase/supabase-js'
```

**Solution:**
```bash
# Make sure dependency is in package.json
npm install @supabase/supabase-js --save
git add package.json package-lock.json
git commit -m "Add supabase dependency"
git push
```

### Issue: "Invalid JSON" in Vercel logs

**Cause:**
- Environment variable value has extra spaces/newlines

**Solution:**
1. Copy API key carefully (no spaces before/after)
2. Don't wrap in quotes in Vercel dashboard
3. Just paste raw value

---

## 🔴 Storage Issues

### Issue: Cannot upload files

**Symptoms:**
- Error uploading certificates
- 403 Forbidden on upload

**Solution:**
```sql
-- Check storage policies
SELECT * FROM storage.policies 
WHERE bucket_id = 'certificates';

-- If missing, add:
CREATE POLICY "Anyone can upload certificates"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'certificates');
```

### Issue: Uploaded files not accessible

**Check bucket is public:**
1. Storage → certificates
2. **Public bucket**: Should be ON
3. If not, recreate bucket as public

---

## 🔴 Development Issues

### Issue: Dev server not hot-reloading .env changes

**Solution:**
```bash
# Stop dev server (Ctrl+C)
# Restart
npm run dev
```

Environment variables are loaded on startup only!

### Issue: TypeScript errors with Supabase types

**Symptoms:**
```
Property 'from' does not exist on type 'null'
```

**Solution:**
```typescript
// Add null check
if (!supabase) {
  console.error('Supabase not initialized');
  return;
}

// Then use supabase safely
const { data, error } = await supabase.from('users').select('*');
```

---

## 🔴 Data Issues

### Issue: Data not showing after insert

**Check:**
```sql
-- Verify data inserted
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;
```

**Common causes:**
1. RLS blocking SELECT
2. Wrong table queried
3. Data in different Supabase project (check URL!)

### Issue: Duplicate email error

**Symptoms:**
- Error: `duplicate key value violates unique constraint "users_email_key"`

**Solution:**
```sql
-- Check existing emails
SELECT email, COUNT(*) 
FROM users 
GROUP BY email 
HAVING COUNT(*) > 1;

-- Delete duplicates (keep newest)
DELETE FROM users 
WHERE id NOT IN (
  SELECT MAX(id) FROM users GROUP BY email
);
```

---

## 🔧 Debugging Tips

### Enable Verbose Logging

```typescript
// In supabase.ts
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    debug: true, // Enable auth debug logs
  },
});
```

### Check Supabase Connection

```typescript
// Test query
const test = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('count');
  
  console.log('Test result:', { data, error });
};
test();
```

### Inspect Network Requests

1. Open DevTools → Network tab
2. Filter: `supabase.co`
3. Check:
   - Request URL
   - Request Headers (apikey should be present)
   - Response Status & Body

---

## 📞 Still Need Help?

### 1. Check Logs

**Browser Console:**
- Look for red errors
- Check 🔍 ENV CHECK logs
- Check Supabase connection test

**Supabase Logs:**
- Dashboard → Logs
- Check recent API calls
- Look for errors

### 2. Common Debug Commands

```sql
-- Check tables exist
\dt public.*

-- Check RLS status
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- Check policies
SELECT * FROM pg_policies WHERE schemaname = 'public';

-- Check recent users
SELECT * FROM users ORDER BY created_at DESC LIMIT 5;

-- Count rows
SELECT 
  (SELECT COUNT(*) FROM users) as users,
  (SELECT COUNT(*) FROM students) as students,
  (SELECT COUNT(*) FROM mentors) as mentors;
```

### 3. Reset & Start Fresh

**⚠️ WARNING: This deletes ALL data!**

```sql
-- Drop all tables
DROP TABLE IF EXISTS mentors CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop storage bucket
-- (Do manually in Storage UI)

-- Then re-run: database/schema/01_initial_migration.sql
```

### 4. Get Help

- 📖 Check `SETUP_GUIDE.md` again
- 💬 [Supabase Discord](https://discord.supabase.com)
- 🐛 [GitHub Issues](https://github.com/supabase/supabase/issues)
- 📚 [Supabase Docs](https://supabase.com/docs)

---

## ✅ Prevention Checklist

Before reporting issue, verify:

- [ ] Latest code from git
- [ ] `npm install` run
- [ ] `.env` file exists & correct
- [ ] Dev server restarted
- [ ] Browser cache cleared
- [ ] Correct Supabase project (check URL)
- [ ] Internet connection stable
- [ ] Supabase project not paused (free tier auto-pauses after 7 days inactivity)

---

**Last Updated:** 2024-11-06
