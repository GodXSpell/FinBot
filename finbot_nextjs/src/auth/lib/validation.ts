import { LoginCredentials, SignupCredentials, ValidationErrors } from '../types'

export function validateEmail(email: string): string | null {
  if (!email) {
    return 'Email is required'
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address'
  }
  
  return null
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return 'Password is required'
  }
  
  if (password.length < 8) {
    return 'Password must be at least 8 characters long'
  }
  
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  }
  
  return null
}

export function validateName(name: string): string | null {
  if (!name) {
    return 'Name is required'
  }
  
  if (name.length < 2) {
    return 'Name must be at least 2 characters long'
  }
  
  return null
}

export function validateLoginForm(credentials: LoginCredentials): ValidationErrors {
  const errors: ValidationErrors = {}
  
  const emailError = validateEmail(credentials.email)
  if (emailError) errors.email = emailError
  
  const passwordError = validatePassword(credentials.password)
  if (passwordError) errors.password = passwordError
  
  return errors
}

export function validateSignupForm(credentials: SignupCredentials): ValidationErrors {
  const errors: ValidationErrors = {}
  
  const nameError = validateName(credentials.name)
  if (nameError) errors.name = nameError
  
  const emailError = validateEmail(credentials.email)
  if (emailError) errors.email = emailError
  
  const passwordError = validatePassword(credentials.password)
  if (passwordError) errors.password = passwordError
  
  if (credentials.password !== credentials.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }
  
  return errors
}

export function hasValidationErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0
}