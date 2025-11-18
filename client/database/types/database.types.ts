/**
 * Database Type Definitions
 * Auto-generated from Supabase schema
 * 
 * Usage:
 * import type { Database, User, Student, Mentor } from '@/database/types/database.types';
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'student' | 'mentor'
          status: 'pending' | 'approved' | 'rejected'
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role: 'student' | 'mentor'
          status?: 'pending' | 'approved' | 'rejected'
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'student' | 'mentor'
          status?: 'pending' | 'approved' | 'rejected'
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          id: string
          user_id: string
          parent_name: string
          parent_email: string
          phone: string
          child_name: string
          child_age: number
          class_name: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          parent_name: string
          parent_email: string
          phone: string
          child_name: string
          child_age: number
          class_name: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          parent_name?: string
          parent_email?: string
          phone?: string
          child_name?: string
          child_age?: number
          class_name?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      mentors: {
        Row: {
          id: string
          user_id: string
          mentor_name: string
          mentor_email: string
          mentor_phone: string
          expertise: string
          experience: string
          certificates: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mentor_name: string
          mentor_email: string
          mentor_phone: string
          expertise: string
          experience: string
          certificates?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mentor_name?: string
          mentor_email?: string
          mentor_phone?: string
          expertise?: string
          experience?: string
          certificates?: string[] | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentors_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// ============================================
// Helper Types
// ============================================

/**
 * User row type
 * Represents a complete user record from database
 */
export type User = Database['public']['Tables']['users']['Row']

/**
 * Student row type
 * Represents a complete student profile from database
 */
export type Student = Database['public']['Tables']['students']['Row']

/**
 * Mentor row type
 * Represents a complete mentor profile from database
 */
export type Mentor = Database['public']['Tables']['mentors']['Row']

/**
 * User insert type
 * For creating new users
 */
export type UserInsert = Database['public']['Tables']['users']['Insert']

/**
 * Student insert type
 * For creating new student profiles
 */
export type StudentInsert = Database['public']['Tables']['students']['Insert']

/**
 * Mentor insert type
 * For creating new mentor profiles
 */
export type MentorInsert = Database['public']['Tables']['mentors']['Insert']

/**
 * User update type
 * For updating existing users
 */
export type UserUpdate = Database['public']['Tables']['users']['Update']

/**
 * Student update type
 * For updating existing student profiles
 */
export type StudentUpdate = Database['public']['Tables']['students']['Update']

/**
 * Mentor update type
 * For updating existing mentor profiles
 */
export type MentorUpdate = Database['public']['Tables']['mentors']['Update']

// ============================================
// Enum Types
// ============================================

/**
 * User role enum
 */
export type UserRole = 'student' | 'mentor'

/**
 * User status enum
 */
export type UserStatus = 'pending' | 'approved' | 'rejected'

// ============================================
// Combined Types (with relations)
// ============================================

/**
 * User with student profile
 */
export type UserWithStudent = User & {
  student?: Student
}

/**
 * User with mentor profile
 */
export type UserWithMentor = User & {
  mentor?: Mentor
}

/**
 * Complete user profile (auto-detects role)
 */
export type UserProfile = User & {
  profile: Student | Mentor
}

// ============================================
// Registration Types
// ============================================

/**
 * Student registration data
 */
export interface StudentRegistrationData {
  // User data
  email: string
  name: string
  phone?: string
  // Student specific
  parent_name: string
  parent_email: string
  parent_phone: string
  child_name: string
  child_age: number
  class_name: string
}

/**
 * Mentor registration data
 */
export interface MentorRegistrationData {
  // User data
  email: string
  name: string
  // Mentor specific
  mentor_name: string
  mentor_email: string
  mentor_phone: string
  expertise: string
  experience: string
  certificates?: File[] // For upload
}
