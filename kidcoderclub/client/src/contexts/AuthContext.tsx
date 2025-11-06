import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginCredentials, RegisterCredentials, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('kidcoderclub_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('kidcoderclub_user');
      }
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get stored users
      const storedUsers = JSON.parse(localStorage.getItem('kidcoderclub_users') || '[]');
      
      // Find user with matching email and role
      const foundUser = storedUsers.find((u: User & { password: string }) => 
        u.email === credentials.email && 
        u.role === credentials.role
      );
      
      if (!foundUser) {
        throw new Error('User not found with this email and role');
      }
      
      // In a real app, you'd hash and compare passwords
      if (foundUser.password !== credentials.password) {
        throw new Error('Invalid password');
      }
      
      // Create user object without password
      const userWithoutPassword: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        createdAt: new Date(foundUser.createdAt)
      };
      
      setUser(userWithoutPassword);
      localStorage.setItem('kidcoderclub_user', JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate passwords match
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Get existing users
      const storedUsers = JSON.parse(localStorage.getItem('kidcoderclub_users') || '[]');
      
      // Check if user already exists with same email and role
      const existingUser = storedUsers.find((u: User) => 
        u.email === credentials.email && u.role === credentials.role
      );
      
      if (existingUser) {
        throw new Error('User already exists with this email and role');
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.name,
        role: credentials.role,
        password: credentials.password, // In real app, this would be hashed
        createdAt: new Date().toISOString()
      };
      
      // Save to localStorage
      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem('kidcoderclub_users', JSON.stringify(updatedUsers));
      
      // Auto-login after registration
      const userWithoutPassword: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        createdAt: new Date(newUser.createdAt)
      };
      
      setUser(userWithoutPassword);
      localStorage.setItem('kidcoderclub_user', JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get stored users
      const storedUsers = JSON.parse(localStorage.getItem('kidcoderclub_users') || '[]');
      
      // Find user with matching email
      const foundUser = storedUsers.find((u: User) => u.email === email);
      
      if (!foundUser) {
        throw new Error('No user found with this email');
      }
      
      // In a real app, you'd send an email with reset link
      // For demo purposes, we'll just show a success message
      console.log(`Password reset email sent to ${email}`);
      
      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kidcoderclub_user');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    resetPassword,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};