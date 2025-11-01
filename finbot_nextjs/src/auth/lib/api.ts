import {
  AuthResponse,
  JWTPayload,
  LoginCredentials,
  LoginResponse,
  SignupCredentials,
  SignupResponse,
  UpdateAllUserRequest,
  UpdateEmailRequest,
  UpdatePasswordRequest,
  User
} from '../types'

// Production API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api'

export class AuthAPI {
  // Helper method for making authenticated requests
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

    // Handle different response types and status codes
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`
      
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.error || errorMessage
      } catch {
        // If response isn't JSON, use status-specific messages
        switch (response.status) {
          case 401:
            errorMessage = 'Invalid credentials or session expired'
            break
          case 403:
            errorMessage = 'Access forbidden'
            break
          case 404:
            errorMessage = 'User not found'
            break
          case 409:
            errorMessage = 'Email already exists. Please try logging in instead.'
            break
          case 422:
            errorMessage = 'Invalid data provided'
            break
          case 500:
            errorMessage = 'Server error. Please try again later.'
            break
          default:
            errorMessage = response.statusText || errorMessage
        }
      }
      
      // Handle 401 errors by clearing auth data
      if (response.status === 401) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_data')
        // Optional: redirect to login (you might want to handle this in components)
        // window.location.href = '/login'
      }
      
      throw new Error(errorMessage)
    }

    // Handle empty responses (like DELETE operations)
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return response.json()
    } else {
      return response.text() as unknown as T
    }
  }

  // Helper method for making authenticated requests
  private static async makeAuthenticatedRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('auth_token')
    
    if (!token) {
      throw new Error('No authentication token found')
    }

    return this.makeRequest<T>(endpoint, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    })
  }

  // Helper to validate JWT token
  private static isTokenValid(token: string): boolean {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) return false

      const payload = JSON.parse(atob(parts[1])) as JWTPayload
      const now = Math.floor(Date.now() / 1000)
      
      return payload.exp > now
    } catch {
      return false
    }
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.makeRequest<LoginResponse>('/users/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      })

      // Store token and user data
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('user_data', JSON.stringify(response.user))

      return {
        success: true,
        user: response.user,
        token: response.token,
        message: 'Login successful'
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
      const response = await this.makeRequest<SignupResponse>('/users/signup', {
        method: 'POST',
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          confirmPassword: credentials.confirmPassword
        })
      })

      return {
        success: true,
        user: response,
        message: 'Account created successfully! Please log in with your credentials.'
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
      const userData = localStorage.getItem('user_data')
      
      if (!token || !userData) return null

      // Validate token expiration
      if (!this.isTokenValid(token)) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_data')
        return null
      }

      return JSON.parse(userData) as User
    } catch (error) {
      // Clear invalid data
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      return null
    }
  }

  static async updatePassword(userId: string, newPassword: string): Promise<AuthResponse> {
    try {
      const response = await this.makeAuthenticatedRequest<User>(`/users/update/password/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({ newPassword } as UpdatePasswordRequest)
      })

      // Update stored user data
      localStorage.setItem('user_data', JSON.stringify(response))

      return {
        success: true,
        user: response,
        message: 'Password updated successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Password update failed'
      }
    }
  }

  static async updateEmail(userId: string, newEmail: string): Promise<AuthResponse> {
    try {
      const response = await this.makeAuthenticatedRequest<User>(`/users/update/email/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({ newEmail } as UpdateEmailRequest)
      })

      // Update stored user data
      localStorage.setItem('user_data', JSON.stringify(response))

      return {
        success: true,
        user: response,
        message: 'Email updated successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Email update failed'
      }
    }
  }

  static async updateAllUserDetails(
    userId: string, 
    updates: UpdateAllUserRequest
  ): Promise<AuthResponse> {
    try {
      const response = await this.makeAuthenticatedRequest<User>(`/users/updateAll/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      })

      // Update stored user data
      localStorage.setItem('user_data', JSON.stringify(response))

      return {
        success: true,
        user: response,
        message: 'Profile updated successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Profile update failed'
      }
    }
  }

  static async deleteUser(userId: string): Promise<AuthResponse> {
    try {
      await this.makeAuthenticatedRequest<string>(`/users/delete/${userId}`, {
        method: 'DELETE'
      })

      // Clear all stored data
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')

      return {
        success: true,
        message: 'Account deleted successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Account deletion failed'
      }
    }
  }

  static async logout(): Promise<void> {
    try {
      // Note: Backend doesn't have logout endpoint, so we just clear local storage
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    } catch (error) {
      // Still clear local storage even if API call fails
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    }
  }

  // Helper method to check if user is authenticated
  static isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token')
    return token ? this.isTokenValid(token) : false
  }

  // Helper method to get current user ID
  static getCurrentUserId(): string | null {
    try {
      const userData = localStorage.getItem('user_data')
      if (!userData) return null
      
      const user = JSON.parse(userData) as User
      return user.id
    } catch {
      return null
    }
  }
}