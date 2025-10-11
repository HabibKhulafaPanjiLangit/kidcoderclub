/*
  # KidCoderClub Platform Schema

  ## Overview
  Complete database schema for student learning platform with courses, assignments, portfolios, and community features.

  ## New Tables

  ### 1. students
  Student profiles extending auth.users with additional information

  ### 2. courses
  Available courses with details like title, description, category, level, and pricing

  ### 3. course_materials
  Learning materials for each course (videos, content, etc.)

  ### 4. enrollments
  Student course enrollments with progress tracking

  ### 5. assignments
  Course assignments with due dates

  ### 6. assignment_submissions
  Student assignment submissions with grades and feedback

  ### 7. portfolios
  Student project portfolios linked to courses

  ### 8. certificates
  Course completion certificates

  ### 9. testimonials
  Student testimonials with ratings

  ### 10. feedback
  Student feedback and suggestions

  ### 11. faqs
  Frequently asked questions

  ### 12. mentors
  Platform mentors/instructors

  ### 13. pricing_plans
  Subscription pricing plans

  ### 14. partnerships
  Partner organizations

  ### 15. gallery
  Image gallery

  ### 16. whatsapp_groups
  WhatsApp community groups per course

  ## Security
  All tables have RLS enabled with appropriate policies
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text NOT NULL,
  thumbnail_url text,
  category text NOT NULL,
  level text NOT NULL DEFAULT 'Beginner',
  price decimal(10,2) NOT NULL DEFAULT 0,
  duration_hours integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Course materials table
CREATE TABLE IF NOT EXISTS course_materials (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  video_url text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  enrolled_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  progress_percentage integer DEFAULT 0,
  UNIQUE(student_id, course_id)
);

-- Assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  due_date timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Assignment submissions table
CREATE TABLE IF NOT EXISTS assignment_submissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id uuid REFERENCES assignments(id) ON DELETE CASCADE NOT NULL,
  student_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  submission_url text NOT NULL,
  notes text,
  submitted_at timestamptz DEFAULT now(),
  grade integer,
  feedback text,
  UNIQUE(assignment_id, student_id)
);

-- Portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  project_url text,
  image_url text,
  technologies text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  certificate_url text NOT NULL,
  issued_at timestamptz DEFAULT now(),
  UNIQUE(student_id, course_id)
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  created_at timestamptz DEFAULT now()
);

-- FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Mentors table
CREATE TABLE IF NOT EXISTS mentors (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  title text NOT NULL,
  bio text NOT NULL,
  avatar_url text,
  specialties text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Pricing plans table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  features text[] DEFAULT '{}',
  is_popular boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Partnerships table
CREATE TABLE IF NOT EXISTS partnerships (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name text NOT NULL,
  logo_url text,
  description text NOT NULL,
  website_url text,
  created_at timestamptz DEFAULT now()
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  image_url text NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'General',
  created_at timestamptz DEFAULT now()
);

-- WhatsApp groups table
CREATE TABLE IF NOT EXISTS whatsapp_groups (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  group_name text NOT NULL,
  invite_link text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_groups ENABLE ROW LEVEL SECURITY;

-- Students policies
CREATE POLICY "Students can view own profile"
  ON students FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Students can update own profile"
  ON students FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Students can insert own profile"
  ON students FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Courses policies
CREATE POLICY "Anyone can view active courses"
  ON courses FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Course materials policies
CREATE POLICY "Enrolled students can view materials"
  ON course_materials FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE enrollments.course_id = course_materials.course_id
      AND enrollments.student_id = auth.uid()
    )
  );

-- Enrollments policies
CREATE POLICY "Students can view own enrollments"
  ON enrollments FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own enrollments"
  ON enrollments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own enrollments"
  ON enrollments FOR UPDATE
  TO authenticated
  USING (auth.uid() = student_id)
  WITH CHECK (auth.uid() = student_id);

-- Assignments policies
CREATE POLICY "Enrolled students can view assignments"
  ON assignments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE enrollments.course_id = assignments.course_id
      AND enrollments.student_id = auth.uid()
    )
  );

-- Assignment submissions policies
CREATE POLICY "Students can view own submissions"
  ON assignment_submissions FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Students can create own submissions"
  ON assignment_submissions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own submissions"
  ON assignment_submissions FOR UPDATE
  TO authenticated
  USING (auth.uid() = student_id)
  WITH CHECK (auth.uid() = student_id);

-- Portfolios policies
CREATE POLICY "Anyone can view all portfolios"
  ON portfolios FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Students can create own portfolios"
  ON portfolios FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own portfolios"
  ON portfolios FOR UPDATE
  TO authenticated
  USING (auth.uid() = student_id)
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can delete own portfolios"
  ON portfolios FOR DELETE
  TO authenticated
  USING (auth.uid() = student_id);

-- Certificates policies
CREATE POLICY "Students can view own certificates"
  ON certificates FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

-- Testimonials policies
CREATE POLICY "Anyone can view approved testimonials"
  ON testimonials FOR SELECT
  TO authenticated
  USING (is_approved = true OR auth.uid() = student_id);

CREATE POLICY "Students can create testimonials"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = student_id);

-- Feedback policies
CREATE POLICY "Students can view own feedback"
  ON feedback FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Students can create feedback"
  ON feedback FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = student_id);

-- FAQs policies
CREATE POLICY "Anyone can view FAQs"
  ON faqs FOR SELECT
  TO authenticated
  USING (true);

-- Mentors policies
CREATE POLICY "Anyone can view mentors"
  ON mentors FOR SELECT
  TO authenticated
  USING (true);

-- Pricing plans policies
CREATE POLICY "Anyone can view pricing plans"
  ON pricing_plans FOR SELECT
  TO authenticated
  USING (true);

-- Partnerships policies
CREATE POLICY "Anyone can view partnerships"
  ON partnerships FOR SELECT
  TO authenticated
  USING (true);

-- Gallery policies
CREATE POLICY "Anyone can view gallery"
  ON gallery FOR SELECT
  TO authenticated
  USING (true);

-- WhatsApp groups policies
CREATE POLICY "Enrolled students can view group links"
  ON whatsapp_groups FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE enrollments.course_id = whatsapp_groups.course_id
      AND enrollments.student_id = auth.uid()
    )
  );