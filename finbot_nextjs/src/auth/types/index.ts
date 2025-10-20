export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  user?: User
  token?: string
}

export interface AuthError {
  field?: string
  message: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  error: AuthError | null
}

export interface ValidationErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}