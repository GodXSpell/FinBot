// Components
export { LoginForm } from './components/login-form'
export { SignupForm } from './components/signup-form'

// Hooks
export { useAuth } from './hooks/useAuth'

// Types
export type {
    AuthError, AuthResponse, AuthState, JWTPayload, LoginCredentials, LoginResponse, SignupCredentials, SignupResponse, UpdateAllUserRequest, UpdateEmailRequest, UpdatePasswordRequest, User, ValidationErrors
} from './types'

// API
export { AuthAPI } from './lib/api'

// Validation
export {
    hasValidationErrors, validateEmail, validateLoginForm, validateName, validatePassword, validateSignupForm
} from './lib/validation'

// Error Handling
export { formatErrorForUser, getErrorAction, getErrorMessage, isAuthError, isConflictError, isServerError, isValidationError, parseAPIError, shouldRetry, type APIError } from './lib/errors'

