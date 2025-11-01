'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { AuthAPI } from '../lib/api'
import { hasValidationErrors, validateLoginForm, validateSignupForm } from '../lib/validation'
import { AuthState, LoginCredentials, SignupCredentials, UpdateAllUserRequest, ValidationErrors } from '../types'

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
        
        // Redirect to chatbot after successful login
        router.push('/chatbot')
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
      
      if (response.success) {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: null
        }))
        
        // Signup successful, redirect to login page
        setTimeout(() => {
          router.push('/login')
        }, 2000) // Give user time to read success message
        
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

  const updatePassword = useCallback(async (newPassword: string): Promise<{ success: boolean; message?: string }> => {
    const userId = AuthAPI.getCurrentUserId()
    if (!userId) {
      return { success: false, message: 'User not authenticated' }
    }

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const response = await AuthAPI.updatePassword(userId, newPassword)
      
      if (response.success && response.user) {
        setAuthState(prev => ({
          ...prev,
          user: response.user!,
          isLoading: false
        }))
        return { success: true, message: response.message }
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: { message: response.message || 'Password update failed' }
        }))
        return { success: false, message: response.message }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Password update failed'
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: { message: errorMessage }
      }))
      return { success: false, message: errorMessage }
    }
  }, [])

  const updateEmail = useCallback(async (newEmail: string): Promise<{ success: boolean; message?: string }> => {
    const userId = AuthAPI.getCurrentUserId()
    if (!userId) {
      return { success: false, message: 'User not authenticated' }
    }

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const response = await AuthAPI.updateEmail(userId, newEmail)
      
      if (response.success && response.user) {
        setAuthState(prev => ({
          ...prev,
          user: response.user!,
          isLoading: false
        }))
        return { success: true, message: response.message }
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: { message: response.message || 'Email update failed' }
        }))
        return { success: false, message: response.message }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Email update failed'
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: { message: errorMessage }
      }))
      return { success: false, message: errorMessage }
    }
  }, [])

  const updateProfile = useCallback(async (updates: UpdateAllUserRequest): Promise<{ success: boolean; message?: string }> => {
    const userId = AuthAPI.getCurrentUserId()
    if (!userId) {
      return { success: false, message: 'User not authenticated' }
    }

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const response = await AuthAPI.updateAllUserDetails(userId, updates)
      
      if (response.success && response.user) {
        setAuthState(prev => ({
          ...prev,
          user: response.user!,
          isLoading: false
        }))
        return { success: true, message: response.message }
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: { message: response.message || 'Profile update failed' }
        }))
        return { success: false, message: response.message }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Profile update failed'
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: { message: errorMessage }
      }))
      return { success: false, message: errorMessage }
    }
  }, [])

  const deleteAccount = useCallback(async (): Promise<{ success: boolean; message?: string }> => {
    const userId = AuthAPI.getCurrentUserId()
    if (!userId) {
      return { success: false, message: 'User not authenticated' }
    }

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const response = await AuthAPI.deleteUser(userId)
      
      if (response.success) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        })
        
        // Redirect to home page
        router.push('/')
        return { success: true, message: response.message }
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: { message: response.message || 'Account deletion failed' }
        }))
        return { success: false, message: response.message }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Account deletion failed'
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: { message: errorMessage }
      }))
      return { success: false, message: errorMessage }
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
    updatePassword,
    updateEmail,
    updateProfile,
    deleteAccount,
    clearError
  }
}