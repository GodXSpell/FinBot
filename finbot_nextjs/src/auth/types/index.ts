export interface User {
  id: string
  email: string
  name: string
  registeredOn: string
  avatar?: string
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

// Backend response for login
export interface LoginResponse {
  token: string
  tokenType: string
  user: User
}

// Backend response for signup (user details only)
export type SignupResponse = User

// Generic API response wrapper
export interface AuthResponse {
  success: boolean
  message?: string
  user?: User
  token?: string
}

// User update interfaces
export interface UpdatePasswordRequest {
  newPassword: string
}

export interface UpdateEmailRequest {
  newEmail: string
}

export interface UpdateAllUserRequest {
  name?: string
  email?: string
  password?: string
}

// JWT Token payload structure
export interface JWTPayload {
  sub: string  // User ID
  iat: number  // Issued At
  exp: number  // Expiration
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