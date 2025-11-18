export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
  status: 'pending' | 'approved' | 'rejected';
  phone?: string | null;
  created_at?: string;
  avatar?: string;
}

export interface Certificate {
  id: string;
  studentId: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  certificateType: 'completion' | 'achievement' | 'participation';
  status: 'issued' | 'pending' | 'revoked';
}

export interface LearningMaterial {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'document' | 'interactive' | 'quiz';
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  createdDate: string;
  status: 'published' | 'draft' | 'archived';
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionDate: string;
  description: string;
}

export interface SystemStats {
  totalUsers: number;
  activeMentors: number;
  activeClasses: number;
  todayRevenue: number;
  monthlyRevenue: number;
  completedCourses: number;
  pendingPayments: number;
}

export interface Alert {
  id: string;
  type: 'warning' | 'success' | 'info';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tasyihduktdqhshrizsl.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhc3lpaGR1a3RkcWhzaHJpenNsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjQxNjI3MywiZXhwIjoyMDc3OTkyMjczfQ.48qseHSmWsmMBcTJQErYIoi7CQyRgQFPeyaVETg5JBM';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function updateUserRole(userId: string) {
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: { role: 'admin' }
  });

  console.log('Data:', data);
  console.log('Error:', error);

  if (error) {
    console.error('Error updating user:', error);
  } else {
    console.log('User updated:', data);
  }
}

updateUserRole('ec7c241f-694e-41b2-8eaa-db68cab6da23');