-- ============================================
-- Disable RLS for Development/Testing
-- ============================================
-- Migration: 02_disable_rls.sql
-- Description: Disable Row Level Security untuk development
-- WARNING: JANGAN JALANKAN DI PRODUCTION!
-- Created: 2024-11-06
-- ============================================

-- ⚠️ WARNING ⚠️
-- Script ini akan disable RLS dan menghapus semua policies
-- Gunakan HANYA untuk development/testing
-- JANGAN gunakan di production environment!

-- ============================================
-- 1. DISABLE RLS
-- ============================================
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.students DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors DISABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. DROP POLICIES (Optional - untuk cleanup)
-- ============================================

-- Users policies
DROP POLICY IF EXISTS "Anyone can register" ON public.users;
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update users" ON public.users;

-- Students policies
DROP POLICY IF EXISTS "Anyone can register as student" ON public.students;
DROP POLICY IF EXISTS "Students can view own data" ON public.students;
DROP POLICY IF EXISTS "Admins can view all students" ON public.students;

-- Mentors policies
DROP POLICY IF EXISTS "Anyone can register as mentor" ON public.mentors;
DROP POLICY IF EXISTS "Mentors can view own data" ON public.mentors;
DROP POLICY IF EXISTS "Admins can view all mentors" ON public.mentors;

-- ============================================
-- 3. VERIFY
-- ============================================
-- Check RLS status
SELECT 
  tablename, 
  rowsecurity AS rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('users', 'students', 'mentors');

-- Expected output: All tables should have rls_enabled = false

-- ============================================
-- NOTES
-- ============================================
-- Untuk re-enable RLS dan policies, jalankan kembali:
-- schema/01_initial_migration.sql (bagian RLS saja)
-- ============================================
