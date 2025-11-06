-- ============================================
-- KidCoderClub Registration System Schema
-- ============================================
-- This schema creates tables for user registration,
-- student and mentor profiles with admin approval system
-- ============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USERS TABLE (Main user registration table)
-- ============================================
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

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON public.users(status);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- Add RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (register)
CREATE POLICY "Anyone can register" ON public.users
  FOR INSERT WITH CHECK (true);

-- Policy: Users can read their own data
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Policy: Admins can view all
-- Note: You need to create admin role in auth.users metadata
CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Policy: Admins can update status
CREATE POLICY "Admins can update users" ON public.users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- ============================================
-- 2. STUDENTS TABLE (Student-specific data)
-- ============================================
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

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_students_user_id ON public.students(user_id);

-- Add RLS
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert
CREATE POLICY "Anyone can register as student" ON public.students
  FOR INSERT WITH CHECK (true);

-- Policy: Users can read their own data
CREATE POLICY "Students can view own data" ON public.students
  FOR SELECT USING (
    user_id IN (SELECT id FROM public.users WHERE id = auth.uid())
  );

-- Policy: Admins can view all
CREATE POLICY "Admins can view all students" ON public.students
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- ============================================
-- 3. MENTORS TABLE (Mentor-specific data)
-- ============================================
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

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_mentors_user_id ON public.mentors(user_id);

-- Add RLS
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert
CREATE POLICY "Anyone can register as mentor" ON public.mentors
  FOR INSERT WITH CHECK (true);

-- Policy: Users can read their own data
CREATE POLICY "Mentors can view own data" ON public.mentors
  FOR SELECT USING (
    user_id IN (SELECT id FROM public.users WHERE id = auth.uid())
  );

-- Policy: Admins can view all
CREATE POLICY "Admins can view all mentors" ON public.mentors
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- ============================================
-- 4. STORAGE BUCKET for Certificates
-- ============================================
-- Create storage bucket for mentor certificates
INSERT INTO storage.buckets (id, name, public)
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy: Anyone can upload
CREATE POLICY "Anyone can upload certificates"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'certificates');

-- Storage Policy: Public read access
CREATE POLICY "Public can view certificates"
ON storage.objects FOR SELECT
USING (bucket_id = 'certificates');

-- ============================================
-- 5. FUNCTIONS
-- ============================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for users table
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. SAMPLE ADMIN USER (OPTIONAL)
-- ============================================
-- After running this migration, you need to:
-- 1. Create an admin user through Supabase Auth
-- 2. Update their metadata with: {"role": "admin"}
-- 
-- You can do this in Supabase Dashboard:
-- Authentication > Users > Select user > Raw User Meta Data
-- Add: {"role": "admin"}

-- ============================================
-- END OF MIGRATION
-- ============================================

COMMENT ON TABLE public.users IS 'Main users table with registration data and approval status';
COMMENT ON TABLE public.students IS 'Student-specific profile data';
COMMENT ON TABLE public.mentors IS 'Mentor-specific profile data and certificates';
COMMENT ON COLUMN public.users.status IS 'User approval status: pending (default), approved, or rejected';
