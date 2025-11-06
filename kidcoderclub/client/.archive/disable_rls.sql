-- Disable RLS untuk testing
-- Jalankan di Supabase SQL Editor

ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.students DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentors DISABLE ROW LEVEL SECURITY;

-- Hapus semua policies
DROP POLICY IF EXISTS "Anyone can register" ON public.users;
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update users" ON public.users;

DROP POLICY IF EXISTS "Anyone can register as student" ON public.students;
DROP POLICY IF EXISTS "Students can view own data" ON public.students;
DROP POLICY IF EXISTS "Admins can view all students" ON public.students;

DROP POLICY IF EXISTS "Anyone can register as mentor" ON public.mentors;
DROP POLICY IF EXISTS "Mentors can view own data" ON public.mentors;
DROP POLICY IF EXISTS "Admins can view all mentors" ON public.mentors;

-- Verify
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'students', 'mentors');
