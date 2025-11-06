export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
  joinDate: string;
  status: 'active' | 'inactive';
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
  type: 'warning' | 'success' | 'info' | 'error';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}