// Error types based on backend API documentation
export interface APIError {
  status: number
  message: string
  type: 'auth' | 'validation' | 'conflict' | 'network' | 'server'
}

// Map HTTP status codes to user-friendly messages
export function getErrorMessage(status: number, defaultMessage?: string): string {
  switch (status) {
    case 400:
      return 'Invalid request. Please check your input and try again.'
    case 401:
      return 'Invalid credentials or session expired. Please log in again.'
    case 403:
      return 'Access forbidden. You do not have permission for this action.'
    case 404:
      return 'Resource not found. Please verify and try again.'
    case 409:
      return 'Email already exists. Please try logging in instead.'
    case 422:
      return 'Invalid data provided. Please check your input.'
    case 429:
      return 'Too many requests. Please wait a moment and try again.'
    case 500:
      return 'Server error. Please try again later.'
    case 502:
      return 'Service temporarily unavailable. Please try again later.'
    case 503:
      return 'Service maintenance in progress. Please try again later.'
    default:
      return defaultMessage || 'An unexpected error occurred. Please try again.'
  }
}

// Parse API error response
export function parseAPIError(error: unknown): APIError {
  // Type guard for axios-style errors
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response: { status: number; data?: { message?: string; error?: string } } }
    const status = axiosError.response.status
    const message = axiosError.response.data?.message || axiosError.response.data?.error || getErrorMessage(status)
    
    return {
      status,
      message,
      type: getErrorType(status)
    }
  } 
  
  // Type guard for fetch API errors
  if (error && typeof error === 'object' && ('status' in error || ('message' in error && typeof (error as Record<string, unknown>).message === 'string'))) {
    const fetchError = error as { status?: number; message?: string }
    const status = fetchError.status || 
      (fetchError.message?.includes('HTTP error') ? 
        parseInt(fetchError.message.match(/status: (\d+)/)?.[1] || '0') : 0)
    const message = fetchError.message || getErrorMessage(status)
    
    return {
      status,
      message,
      type: getErrorType(status)
    }
  } 
  
  // Type guard for Error objects
  if (error instanceof Error) {
    return {
      status: 0,
      message: error.message,
      type: 'network'
    }
  } 
  
  // Unknown error type
  return {
    status: 0,
    message: 'An unexpected error occurred',
    type: 'network'
  }
}

// Categorize errors by type
function getErrorType(status: number): APIError['type'] {
  if (status === 401 || status === 403) return 'auth'
  if (status === 400 || status === 422) return 'validation'
  if (status === 409) return 'conflict'
  if (status >= 500) return 'server'
  return 'network'
}

// Check if error requires authentication
export function isAuthError(error: APIError): boolean {
  return error.type === 'auth' || error.status === 401
}

// Check if error is a validation error
export function isValidationError(error: APIError): boolean {
  return error.type === 'validation'
}

// Check if error is a conflict (e.g., email already exists)
export function isConflictError(error: APIError): boolean {
  return error.type === 'conflict'
}

// Check if error is a server error
export function isServerError(error: APIError): boolean {
  return error.type === 'server'
}

// Format error for display to user
export function formatErrorForUser(error: APIError): string {
  switch (error.type) {
    case 'auth':
      return '🔒 ' + error.message
    case 'validation':
      return '⚠️ ' + error.message
    case 'conflict':
      return '⚡ ' + error.message
    case 'server':
      return '🔧 ' + error.message
    default:
      return '❌ ' + error.message
  }
}

// Retry logic for certain error types
export function shouldRetry(error: APIError): boolean {
  // Retry on server errors and some network errors
  return error.status >= 500 || error.status === 0
}

// Get suggested action for error
export function getErrorAction(error: APIError): string {
  switch (error.type) {
    case 'auth':
      return 'Please log in again'
    case 'validation':
      return 'Please correct the errors and try again'
    case 'conflict':
      return 'Please try logging in instead'
    case 'server':
      return 'Please try again in a few moments'
    case 'network':
      return 'Please check your connection and try again'
    default:
      return 'Please try again'
  }
}