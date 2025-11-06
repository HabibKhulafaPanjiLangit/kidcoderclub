# 🚀 Deployment Guide

Panduan lengkap deploy KidCoderClub ke production dengan Vercel & Supabase.

---

## 📋 Pre-Deployment Checklist

- [ ] Supabase project sudah setup dan tested
- [ ] Database migration sudah dijalankan
- [ ] Local development works perfectly
- [ ] Git repository clean (no uncommitted changes)
- [ ] Environment variables documented
- [ ] RLS policies di-enable (untuk production)

---

## 🎯 Step 1: Prepare Supabase for Production

### 1.1 Enable RLS (Row Level Security)

⚠️ **IMPORTANT untuk production security!**

```sql
-- Di Supabase SQL Editor
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
```

Verify policies exist:
```sql
SELECT * FROM pg_policies WHERE schemaname = 'public';
```

Should have policies untuk INSERT, SELECT, UPDATE.

### 1.2 Configure Production URLs

1. Go to Supabase → **Authentication** → **URL Configuration**
2. Set **Site URL**: `https://yourdomain.com` or `https://yourapp.vercel.app`
3. Add **Redirect URLs**:
   ```
   https://yourdomain.com/**
   https://yourapp.vercel.app/**
   https://*.vercel.app/**
   ```
4. Save

### 1.3 Enable Email Confirmation (Recommended)

1. Supabase → **Authentication** → **Providers** → **Email**
2. Enable **"Confirm email"**
3. Customize email templates if needed
4. Save

### 1.4 Setup Custom SMTP (Optional but Recommended)

Default Supabase email has limits. Use custom SMTP:

1. Supabase → **Settings** → **Auth**
2. **SMTP Settings**:
   - **Host**: `smtp.gmail.com` (or your provider)
   - **Port**: `587`
   - **Username**: Your email
   - **Password**: App-specific password
   - **Sender email**: `noreply@yourdomain.com`
3. Save & Test

---

## 🚀 Step 2: Deploy to Vercel

### 2.1 Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your Git repository
4. Select **"kidcoderclub"** repository

### 2.2 Configure Build Settings

Vercel should auto-detect. Verify:

| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

### 2.3 Set Environment Variables

**CRITICAL STEP!**

Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://xxx.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `eyJ...` | Production, Preview, Development |

⚠️ **Important:**
- Use **ANON key**, NOT service_role key
- Apply to ALL environments
- No quotes needed
- No spaces before/after

### 2.4 Deploy

1. Click **"Deploy"**
2. Wait ~2-3 minutes
3. Should see: ✅ **"Production deployment ready"**

### 2.5 Verify Deployment

1. Click **"Visit"** to open deployed site
2. Open DevTools Console (F12)
3. Check logs:
   ```
   🔍 ENV CHECK: { url: "https://...", key: "EXISTS" }
   ✅ Supabase connected successfully!
   ```
4. Try registration
5. Check data in Supabase Table Editor

---

## 🔧 Step 3: Custom Domain (Optional)

### 3.1 Add Custom Domain

1. Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add your domain: `www.kidcoderclub.com`
3. Follow DNS configuration instructions

### 3.2 Update Supabase URLs

1. Supabase → Authentication → URL Configuration
2. Update **Site URL** to your custom domain
3. Add to **Redirect URLs**:
   ```
   https://kidcoderclub.com/**
   https://www.kidcoderclub.com/**
   ```

### 3.3 Force HTTPS

Vercel automatically forces HTTPS. No action needed.

---

## 📊 Step 4: Monitoring & Analytics

### 4.1 Vercel Analytics

1. Vercel Dashboard → Your Project → **Analytics**
2. Enable **"Vercel Analytics"** (free tier available)
3. Add to `index.html`:
   ```html
   <script src="https://cdn.vercel-analytics.com/v1/script.js" defer></script>
   ```

### 4.2 Supabase Metrics

Monitor di Supabase Dashboard:
- **Database** → Performance metrics
- **API** → Request logs
- **Auth** → User growth

### 4.3 Error Tracking (Optional)

Setup Sentry atau LogRocket:

```bash
npm install @sentry/vite-plugin @sentry/react
```

Configure di `vite.config.ts`.

---

## 🔄 Step 5: CI/CD Setup

### 5.1 Auto-Deploy on Git Push

Vercel automatically deploys on:
- `main` branch push → Production
- PR created → Preview deployment
- Other branches → Development

### 5.2 Deploy Hooks

For manual deployments:

1. Vercel → Settings → Git → **Deploy Hooks**
2. Create hook: `production-deploy`
3. Get URL: `https://api.vercel.com/...`
4. Trigger via:
   ```bash
   curl -X POST https://api.vercel.com/...
   ```

### 5.3 GitHub Actions (Advanced)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🧪 Step 6: Testing Production

### 6.1 Smoke Tests

Test these features:

- [ ] Homepage loads
- [ ] Registration form (student) works
- [ ] Registration form (mentor) works
- [ ] File upload (certificates) works
- [ ] Data saved to Supabase
- [ ] Email confirmation sent (if enabled)
- [ ] Console has no errors
- [ ] Mobile responsive

### 6.2 Performance Test

Use tools:
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

Target metrics:
- **LCP** < 2.5s
- **FID** < 100ms
- **CLS** < 0.1

### 6.3 Security Check

- [ ] HTTPS enabled
- [ ] RLS enabled in Supabase
- [ ] No sensitive keys in client code
- [ ] CORS configured properly
- [ ] API keys are anon key (not service_role)

---

## 🔐 Step 7: Security Hardening

### 7.1 Supabase Security

```sql
-- Limit anonymous access
ALTER DATABASE postgres SET statement_timeout = '10s';

-- Add rate limiting via Supabase dashboard
-- Settings → API → Rate Limiting
```

### 7.2 Vercel Security Headers

Create `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

---

## 📈 Step 8: Post-Deployment

### 8.1 Create Admin User

Follow guide in `SETUP_GUIDE.md` Step 7.

### 8.2 Monitor Logs

**Vercel Logs:**
- Dashboard → Project → Logs
- Filter by errors

**Supabase Logs:**
- Dashboard → Logs → API/Auth tabs
- Set alerts for errors

### 8.3 Backup Strategy

**Supabase Free Tier:**
- 7 days automatic backup
- Download manual backups:
  ```sql
  -- Export data
  COPY (SELECT * FROM users) TO '/tmp/users_backup.csv' CSV HEADER;
  ```

**Paid Plans:**
- Point-in-time recovery
- 30-day backups

### 8.4 Update Documentation

- [ ] Update README with production URL
- [ ] Document custom domain (if any)
- [ ] Add deployment date to CHANGELOG
- [ ] Update team about new deployment

---

## 🚨 Rollback Plan

### If Something Goes Wrong:

**Option 1 - Vercel Instant Rollback:**
1. Vercel Dashboard → Deployments
2. Find last working deployment
3. Click **"..."** → **"Promote to Production"**
4. Done in ~30 seconds

**Option 2 - Git Revert:**
```bash
git revert HEAD
git push origin main
# Vercel will auto-deploy previous version
```

**Option 3 - Supabase Restore:**
1. Supabase Dashboard → Database → Backups
2. Select backup
3. Click **"Restore"**

---

## ✅ Deployment Checklist

### Before Deploy:
- [ ] All features tested locally
- [ ] No console errors
- [ ] Git committed & pushed
- [ ] Environment variables documented
- [ ] Supabase RLS enabled

### During Deploy:
- [ ] Vercel build successful
- [ ] No build warnings/errors
- [ ] Environment variables set
- [ ] Domain configured (if custom)

### After Deploy:
- [ ] Production site loads
- [ ] Registration works
- [ ] Data saves to Supabase
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Admin user created
- [ ] Team notified

---

## 📚 Resources

- [Vercel Docs](https://vercel.com/docs)
- [Supabase Production Checklist](https://supabase.com/docs/guides/platform/going-into-prod)
- [Vite Production Build](https://vitejs.dev/guide/build.html)

---

## 🆘 Troubleshooting

See `TROUBLESHOOTING.md` for common deployment issues.

---

**Last Updated:** 2024-11-06
**Next Review:** Before major releases
