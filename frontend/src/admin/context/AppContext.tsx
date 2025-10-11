import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Certificate, LearningMaterial, Payment, SystemStats, Alert } from '../types';

interface AppContextType {
  // Users
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  
  // Certificates
  certificates: Certificate[];
  addCertificate: (certificate: Omit<Certificate, 'id'>) => void;
  updateCertificate: (id: string, certificate: Partial<Certificate>) => void;
  deleteCertificate: (id: string) => void;
  
  // Learning Materials
  learningMaterials: LearningMaterial[];
  addLearningMaterial: (material: Omit<LearningMaterial, 'id'>) => void;
  updateLearningMaterial: (id: string, material: Partial<LearningMaterial>) => void;
  deleteLearningMaterial: (id: string) => void;
  
  // Payments
  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id'>) => void;
  updatePayment: (id: string, payment: Partial<Payment>) => void;
  
  // System Stats
  systemStats: SystemStats;
  updateSystemStats: (stats: Partial<SystemStats>) => void;
  
  // Alerts
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id'>) => void;
  dismissAlert: (id: string) => void;
  markAlertAsRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Sample data
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'student',
      joinDate: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'mentor',
      joinDate: '2023-12-01',
      status: 'active'
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol@example.com',
      role: 'student',
      joinDate: '2024-02-10',
      status: 'inactive'
    }
  ]);

  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      studentId: '1',
      studentName: 'Alice Johnson',
      courseName: 'Python Basics',
      issueDate: '2024-03-15',
      certificateType: 'completion',
      status: 'issued'
    },
    {
      id: '2',
      studentId: '3',
      studentName: 'Carol Davis',
      courseName: 'JavaScript Fundamentals',
      issueDate: '2024-03-10',
      certificateType: 'achievement',
      status: 'pending'
    }
  ]);

  const [learningMaterials, setLearningMaterials] = useState<LearningMaterial[]>([
    {
      id: '1',
      title: 'Introduction to Python',
      description: 'Learn the basics of Python programming',
      type: 'video',
      category: 'Programming',
      difficulty: 'beginner',
      duration: 45,
      createdDate: '2024-01-01',
      status: 'published'
    },
    {
      id: '2',
      title: 'JavaScript Quiz',
      description: 'Test your JavaScript knowledge',
      type: 'quiz',
      category: 'Programming',
      difficulty: 'intermediate',
      duration: 30,
      createdDate: '2024-02-01',
      status: 'published'
    }
  ]);

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Alice Johnson',
      amount: 99.99,
      currency: 'USD',
      status: 'completed',
      paymentMethod: 'Credit Card',
      transactionDate: '2024-03-15',
      description: 'Python Course Enrollment'
    },
    {
      id: '2',
      userId: '3',
      userName: 'Carol Davis',
      amount: 149.99,
      currency: 'USD',
      status: 'pending',
      paymentMethod: 'PayPal',
      transactionDate: '2024-03-14',
      description: 'JavaScript Course Enrollment'
    }
  ]);

  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalUsers: 2847,
    activeMentors: 156,
    activeClasses: 89,
    todayRevenue: 4231,
    monthlyRevenue: 125000,
    completedCourses: 1250,
    pendingPayments: 15
  });

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Server Maintenance Scheduled',
      message: 'System maintenance is scheduled for tonight at 2:00 AM EST.',
      time: '2 hours ago',
      isRead: false
    },
    {
      id: '2',
      type: 'info',
      title: 'New Feature Release',
      message: 'Interactive coding playground v2.0 has been deployed successfully.',
      time: '5 hours ago',
      isRead: false
    }
  ]);

  // User functions
  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: generateId() };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, updatedUser: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...updatedUser } : user
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  // Certificate functions
  const addCertificate = (certificate: Omit<Certificate, 'id'>) => {
    const newCertificate = { ...certificate, id: generateId() };
    setCertificates(prev => [...prev, newCertificate]);
  };

  const updateCertificate = (id: string, updatedCertificate: Partial<Certificate>) => {
    setCertificates(prev => prev.map(cert => 
      cert.id === id ? { ...cert, ...updatedCertificate } : cert
    ));
  };

  const deleteCertificate = (id: string) => {
    setCertificates(prev => prev.filter(cert => cert.id !== id));
  };

  // Learning Material functions
  const addLearningMaterial = (material: Omit<LearningMaterial, 'id'>) => {
    const newMaterial = { ...material, id: generateId() };
    setLearningMaterials(prev => [...prev, newMaterial]);
  };

  const updateLearningMaterial = (id: string, updatedMaterial: Partial<LearningMaterial>) => {
    setLearningMaterials(prev => prev.map(material => 
      material.id === id ? { ...material, ...updatedMaterial } : material
    ));
  };

  const deleteLearningMaterial = (id: string) => {
    setLearningMaterials(prev => prev.filter(material => material.id !== id));
  };

  // Payment functions
  const addPayment = (payment: Omit<Payment, 'id'>) => {
    const newPayment = { ...payment, id: generateId() };
    setPayments(prev => [...prev, newPayment]);
  };

  const updatePayment = (id: string, updatedPayment: Partial<Payment>) => {
    setPayments(prev => prev.map(payment => 
      payment.id === id ? { ...payment, ...updatedPayment } : payment
    ));
  };

  // System Stats functions
  const updateSystemStats = (stats: Partial<SystemStats>) => {
    setSystemStats(prev => ({ ...prev, ...stats }));
  };

  // Alert functions
  const addAlert = (alert: Omit<Alert, 'id'>) => {
    const newAlert = { ...alert, id: generateId() };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const markAlertAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const value: AppContextType = {
    users,
    addUser,
    updateUser,
    deleteUser,
    certificates,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    learningMaterials,
    addLearningMaterial,
    updateLearningMaterial,
    deleteLearningMaterial,
    payments,
    addPayment,
    updatePayment,
    systemStats,
    updateSystemStats,
    alerts,
    addAlert,
    dismissAlert,
    markAlertAsRead
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};