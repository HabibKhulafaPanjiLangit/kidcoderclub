export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'student' | 'mentor';
  createdAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: 'admin' | 'student' | 'mentor';
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  isLoading: boolean;
}