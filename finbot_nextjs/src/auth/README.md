# Authentication Module

This module contains all authentication-related functionality for the FinBot application.

## Structure

```
auth/
├── components/           # React components for auth UI
│   ├── login-form.tsx   # Login form with validation
│   └── signup-form.tsx  # Signup form with validation
├── hooks/               # React hooks for auth state management
│   └── useAuth.ts       # Main auth hook with login/signup/logout
├── lib/                 # Utility functions and API client
│   ├── api.ts          # API client for backend communication
│   └── validation.ts   # Form validation utilities
├── types/              # TypeScript type definitions
│   └── index.ts        # All auth-related types
└── index.ts            # Main export file
```

## Features

### ✅ Form Validation
- Email format validation
- Password strength requirements (8+ chars, uppercase, lowercase, number)
- Real-time validation with error display
- Form state management

### ✅ Authentication Flow
- Login with email/password
- Signup with name/email/password
- Token-based authentication
- Automatic token refresh
- Logout functionality

### ✅ Backend Integration
- RESTful API client
- Automatic token management
- Error handling with user-friendly messages
- Support for OAuth providers (Apple/Google) - UI ready

### ✅ State Management
- React hooks for auth state
- Loading states during API calls
- Error state management
- Automatic redirects after auth

## Usage

### Using the Auth Hook

\`\`\`tsx
import { useAuth } from '@/auth'

function MyComponent() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth()
  
  if (isLoading) return <div>Loading...</div>
  
  if (!isAuthenticated) {
    return <LoginForm />
  }
  
  return (
    <div>
      Welcome, {user?.name}!
      <button onClick={logout}>Logout</button>
    </div>
  )
}
\`\`\`

### Using Individual Components

\`\`\`tsx
import { LoginForm, SignupForm } from '@/auth'

// Login page
export default function LoginPage() {
  return (
    <div>
      <LoginForm />
    </div>
  )
}
\`\`\`

## Backend Requirements

The auth module expects the following API endpoints:

### POST `/api/auth/login`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "user": { "id": "...", "email": "...", "name": "..." },
  "token": "jwt_token_here"
}
```

### POST `/api/auth/signup`
```json
{
  "name": "John Doe",
  "email": "user@example.com", 
  "password": "password123"
}
```

### GET `/api/auth/me`
Headers: `Authorization: Bearer <token>`

### POST `/api/auth/logout`
Headers: `Authorization: Bearer <token>`

### POST `/api/auth/refresh`
Headers: `Authorization: Bearer <token>`

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Security Features

- Client-side form validation
- Password strength requirements
- Secure token storage in localStorage
- Automatic token refresh
- Protected route handling
- CSRF protection ready (backend implementation needed)

## Future Enhancements

- [ ] OAuth provider integration (Google, Apple)
- [ ] Two-factor authentication
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Remember me functionality
- [ ] Session management
- [ ] Rate limiting
- [ ] Account lockout protection