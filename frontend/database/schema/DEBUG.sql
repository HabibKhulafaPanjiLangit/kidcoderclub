-- ============================================
-- DEBUGGING: Check Supabase Setup
-- ============================================
-- Run this SQL in Supabase SQL Editor to debug
-- URL: https://supabase.com/dashboard/project/tasyihdukttdqhshrizsl/sql

-- ============================================
-- 1. CHECK IF TABLES EXIST
-- ============================================
SELECT 
  tablename,
  schemaname
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('users', 'students', 'mentors')
ORDER BY tablename;

-- Expected: 3 rows (users, students, mentors)
-- If 0 rows: Tables don't exist! Run 01_initial.sql first

-- ============================================
-- 2. CHECK RLS STATUS
-- ============================================
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('users', 'students', 'mentors')
ORDER BY tablename;

-- Expected: All rls_enabled = 'f' (false)
-- If 't' (true): Run 02_dev_disable_rls.sql

-- ============================================
-- 3. CHECK TABLE PERMISSIONS
-- ============================================
SELECT 
  grantee,
  table_schema,
  table_name,
  privilege_type
FROM information_schema.table_privileges
WHERE table_schema = 'public'
  AND table_name IN ('users', 'students', 'mentors')
  AND grantee = 'anon'
ORDER BY table_name, privilege_type;

-- Expected: anon should have SELECT, INSERT, UPDATE, DELETE
-- If empty: Need to grant permissions

-- ============================================
-- 4. TEST READ ACCESS (as anon user)
-- ============================================
-- This simulates what your frontend does
SELECT COUNT(*) as user_count FROM public.users;
SELECT COUNT(*) as student_count FROM public.students;
SELECT COUNT(*) as mentor_count FROM public.mentors;

-- Expected: Should return counts (even if 0)
-- If ERROR: Check RLS or permissions

-- ============================================
-- 5. CHECK RLS POLICIES (if RLS enabled)
-- ============================================
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd,
  qual
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('users', 'students', 'mentors')
ORDER BY tablename, policyname;

-- Expected: Empty if RLS is disabled
-- If not empty: These policies might be blocking access

-- ============================================
-- QUICK FIX: If tables don't exist
-- ============================================
-- Uncomment and run if tables are missing:

/*
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'mentor')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create students table
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  parent_name TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  phone TEXT NOT NULL,
  child_name TEXT NOT NULL,
  child_age INTEGER NOT NULL CHECK (child_age >= 5 AND child_age <= 13),
  class_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create mentors table
CREATE TABLE IF NOT EXISTS public.mentors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  expertise TEXT NOT NULL,
  bio TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  years_experience INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS for development
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.students DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors DISABLE ROW LEVEL SECURITY;

-- Grant permissions to anon user
GRANT ALL ON public.users TO anon;
GRANT ALL ON public.students TO anon;
GRANT ALL ON public.mentors TO anon;
*/
