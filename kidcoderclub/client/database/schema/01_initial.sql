-- ============================================
-- KidCoderClub Registration System Schema
-- ============================================
-- Migration: 01_initial_migration.sql
-- Description: Setup awal database dengan tables, indexes, RLS, dan policies
-- Created: 2024-11-06
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USERS TABLE
-- ============================================
-- Main user registration table with approval system
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

-- Indexes untuk performa
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON public.users(status);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- Comments
COMMENT ON TABLE public.users IS 'Main users table with registration data and approval status';
COMMENT ON COLUMN public.users.status IS 'User approval status: pending (default), approved, or rejected';

-- ============================================
-- 2. STUDENTS TABLE
-- ============================================
-- Student-specific profile data
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

-- Index
CREATE INDEX IF NOT EXISTS idx_students_user_id ON public.students(user_id);

-- Comment
COMMENT ON TABLE public.students IS 'Student-specific profile data';

-- ============================================
-- 3. MENTORS TABLE
-- ============================================
-- Mentor-specific profile data
CREATE TABLE IF NOT EXISTS public.mentors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  mentor_name TEXT NOT NULL,
  mentor_email TEXT NOT NULL,
  mentor_phone TEXT NOT NULL,
  expertise TEXT NOT NULL,
  experience TEXT NOT NULL,
  certificates TEXT[], -- Array of certificate URLs
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_mentors_user_id ON public.mentors(user_id);

-- Comment
COMMENT ON TABLE public.mentors IS 'Mentor-specific profile data and certificates';

-- ============================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;

-- Users Policies
CREATE POLICY "Anyone can register" ON public.users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins can update users" ON public.users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Students Policies
CREATE POLICY "Anyone can register as student" ON public.students
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Students can view own data" ON public.students
  FOR SELECT USING (
    user_id IN (SELECT id FROM public.users WHERE id = auth.uid())
  );

CREATE POLICY "Admins can view all students" ON public.students
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Mentors Policies
CREATE POLICY "Anyone can register as mentor" ON public.mentors
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Mentors can view own data" ON public.mentors
  FOR SELECT USING (
    user_id IN (SELECT id FROM public.users WHERE id = auth.uid())
  );

CREATE POLICY "Admins can view all mentors" ON public.mentors
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- ============================================
-- 5. STORAGE BUCKET
-- ============================================
-- Bucket untuk mentor certificates
INSERT INTO storage.buckets (id, name, public)
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Anyone can upload certificates"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'certificates');

CREATE POLICY "Public can view certificates"
ON storage.objects FOR SELECT
USING (bucket_id = 'certificates');

-- ============================================
-- 6. FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger untuk users table
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- MIGRATION COMPLETE
-- ============================================
-- Next Steps:
-- 1. Create admin user melalui Supabase Auth
-- 2. Set user metadata: {"role": "admin"}
-- 3. Test RLS policies
-- ============================================
