'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { AuthAPI } from '../lib/api'
import { hasValidationErrors, validateLoginForm, validateSignupForm } from '../lib/validation'
import { AuthState, LoginCredentials, SignupCredentials, ValidationErrors } from '../types'

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null
  })
  
  const router = useRouter()

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await AuthAPI.getCurrentUser()
        setAuthState(prev => ({
          ...prev,
          user,
          isAuthenticated: !!user,
          isLoading: false
        }))
      } catch (error) {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: { message: 'Failed to load user' }
        }))
      }
    }

    loadUser()
  }, [])

  const login = useCallback(async (credentials: LoginCredentials): Promise<{ success: boolean; errors?: ValidationErrors }> => {
    // Validate form
    const validationErrors = validateLoginForm(credentials)
    if (hasValidationErrors(validationErrors)) {
      return { success: false, errors: validationErrors }
    }

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const response = await AuthAPI.login(credentials)
      
      if (response.success && response.user) {
        setAuthState(prev => ({
          ...prev,
          user: response.user!,
          isAuthenticated: true,
          isLoading: false
        }))
        
        // Redirect to dashboard or previous page
        router.push('/dashboard')
        return { success: true }
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: { message: response.message || 'Login failed' }
        }))
        return { success: false }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: { message: errorMessage }
      }))
      return { success: false }
    }
  }, [router])

  const signup = useCallback(async (credentials: SignupCredentials): Promise<{ success: boolean; errors?: ValidationErrors }> => {
    // Validate form
    const validationErrors = validateSignupForm(credentials)
    if (hasValidationErrors(validationErrors)) {
      return { success: false, errors: validationErrors }
    }

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const response = await AuthAPI.signup(credentials)
      
      if (response.success && response.user) {
        setAuthState(prev => ({
          ...prev,
          user: response.user!,
          isAuthenticated: true,
          isLoading: false
        }))
        
        // Redirect to dashboard
        router.push('/dashboard')
        return { success: true }
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: { message: response.message || 'Signup failed' }
        }))
        return { success: false }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed'
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: { message: errorMessage }
      }))
      return { success: false }
    }
  }, [router])

  const logout = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }))
    
    try {
      await AuthAPI.logout()
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      })
      
      router.push('/')
    } catch (error) {
      // Even if logout fails, clear local state
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      })
      router.push('/')
    }
  }, [router])

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }))
  }, [])

  return {
    ...authState,
    login,
    signup,
    logout,
    clearError
  }
}