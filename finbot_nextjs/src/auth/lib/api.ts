import { AuthResponse, LoginCredentials, SignupCredentials, User } from '../types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

// Temporary hardcoded admin credentials for testing
const TEMP_ADMIN_CREDENTIALS = {
  name: 'Admin',
  email: 'admin@gmail.com',
  password: 'Admin@123'
}

// Temporary user data that would normally come from database
const TEMP_USER_DATA = {
  id: 'admin_001',
  email: 'admin@gmail.com',
  name: 'Admin',
  avatar: undefined,
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date()
}

export class AuthAPI {
  private static async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Debug logging
      console.log('Login attempt:', {
        inputEmail: credentials.email,
        inputPassword: credentials.password,
        expectedEmail: TEMP_ADMIN_CREDENTIALS.email,
        expectedPassword: TEMP_ADMIN_CREDENTIALS.password,
        emailMatch: credentials.email === TEMP_ADMIN_CREDENTIALS.email,
        passwordMatch: credentials.password === TEMP_ADMIN_CREDENTIALS.password
      })

      // Temporary authentication - check against hardcoded credentials
      if (
        credentials.email === TEMP_ADMIN_CREDENTIALS.email &&
        credentials.password === TEMP_ADMIN_CREDENTIALS.password
      ) {
        // Generate a fake JWT token for temporary use
        const fakeToken = btoa(JSON.stringify({
          userId: TEMP_USER_DATA.id,
          email: TEMP_USER_DATA.email,
          exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        }))

        // Store token in localStorage
        localStorage.setItem('auth_token', fakeToken)

        return {
          success: true,
          user: TEMP_USER_DATA,
          token: fakeToken,
          message: 'Login successful'
        }
      } else {
        return {
          success: false,
          message: 'Invalid email or password. Use admin@gmail.com / Admin@123 for testing.'
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Login failed'
      }
    }
  }

  static async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    try {
      // Temporary authentication - check if trying to sign up with admin credentials
      if (
        credentials.name.toLowerCase() === TEMP_ADMIN_CREDENTIALS.name.toLowerCase() &&
        credentials.email === TEMP_ADMIN_CREDENTIALS.email &&
        credentials.password === TEMP_ADMIN_CREDENTIALS.password
      ) {
        // For testing, we'll simulate successful signup and redirect to login
        return {
          success: true,
          message: 'Account created successfully! Please log in with your credentials.'
        }
      } else {
        return {
          success: false,
          message: 'For testing, please use: Name: Admin, Email: admin@gmail.com, Password: Admin@123'
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Signup failed'
      }
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) return null

      // Temporary authentication - decode fake token
      try {
        const decoded = JSON.parse(atob(token))
        
        // Check if token is expired
        if (decoded.exp && Date.now() > decoded.exp) {
          localStorage.removeItem('auth_token')
          return null
        }

        // Return user data if token is valid
        if (decoded.userId === TEMP_USER_DATA.id) {
          return TEMP_USER_DATA
        }
      } catch (decodeError) {
        localStorage.removeItem('auth_token')
        return null
      }

      return null
    } catch (error) {
      // Remove invalid token
      localStorage.removeItem('auth_token')
      return null
    }
  }

  static async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('auth_token')
      if (token) {
        await this.makeRequest('/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }
    } catch (error) {
      // Ignore logout errors
    } finally {
      localStorage.removeItem('auth_token')
    }
  }

  static async refreshToken(): Promise<string | null> {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) return null

      const response = await this.makeRequest<{ token: string }>('/auth/refresh', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      localStorage.setItem('auth_token', response.token)
      return response.token
    } catch (error) {
      localStorage.removeItem('auth_token')
      return null
    }
  }
}