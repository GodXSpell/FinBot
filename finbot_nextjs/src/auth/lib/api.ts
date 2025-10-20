import { AuthResponse, LoginCredentials, SignupCredentials, User } from '../types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

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
      const response = await this.makeRequest<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      })

      // Store token in localStorage if login successful
      if (response.success && response.token) {
        localStorage.setItem('auth_token', response.token)
      }

      return response
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Login failed'
      }
    }
  }

  static async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    try {
      const response = await this.makeRequest<AuthResponse>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password
        }),
      })

      // Store token in localStorage if signup successful
      if (response.success && response.token) {
        localStorage.setItem('auth_token', response.token)
      }

      return response
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

      const response = await this.makeRequest<{ user: User }>('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.user
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