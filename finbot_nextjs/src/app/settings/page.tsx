'use client'

import { useAuth } from '@/auth'
import { validateEmail, validateName, validatePassword } from '@/auth/lib/validation'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Lock, Mail, Save, Trash2, User } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const { user, isAuthenticated, isLoading, updatePassword, updateEmail, updateProfile, deleteAccount, logout } = useAuth()
  
  // Profile update state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  })
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileMessage, setProfileMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  // Password update state
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  // Email update state
  const [emailData, setEmailData] = useState({
    newEmail: ''
  })
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailMessage, setEmailMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  // Account deletion state
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  if (!isAuthenticated || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                {isLoading ? 'Loading...' : 'Please log in to access settings.'}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileMessage(null)
    
    // Validation
    const nameError = validateName(profileData.name)
    const emailError = validateEmail(profileData.email)
    
    if (nameError || emailError) {
      setProfileMessage({
        type: 'error',
        text: nameError || emailError || 'Validation failed'
      })
      return
    }
    
    setProfileLoading(true)
    
    try {
      const result = await updateProfile({
        name: profileData.name,
        email: profileData.email
      })
      
      if (result.success) {
        setProfileMessage({
          type: 'success',
          text: result.message || 'Profile updated successfully!'
        })
      } else {
        setProfileMessage({
          type: 'error',
          text: result.message || 'Failed to update profile'
        })
      }
    } catch (error) {
      setProfileMessage({
        type: 'error',
        text: 'An unexpected error occurred'
      })
    } finally {
      setProfileLoading(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordMessage(null)
    
    // Validation
    const passwordError = validatePassword(passwordData.newPassword)
    if (passwordError) {
      setPasswordMessage({
        type: 'error',
        text: passwordError
      })
      return
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({
        type: 'error',
        text: 'Passwords do not match'
      })
      return
    }
    
    setPasswordLoading(true)
    
    try {
      const result = await updatePassword(passwordData.newPassword)
      
      if (result.success) {
        setPasswordMessage({
          type: 'success',
          text: result.message || 'Password updated successfully!'
        })
        setPasswordData({ newPassword: '', confirmPassword: '' })
      } else {
        setPasswordMessage({
          type: 'error',
          text: result.message || 'Failed to update password'
        })
      }
    } catch (error) {
      setPasswordMessage({
        type: 'error',
        text: 'An unexpected error occurred'
      })
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailMessage(null)
    
    // Validation
    const emailError = validateEmail(emailData.newEmail)
    if (emailError) {
      setEmailMessage({
        type: 'error',
        text: emailError
      })
      return
    }
    
    if (emailData.newEmail === user?.email) {
      setEmailMessage({
        type: 'error',
        text: 'New email must be different from current email'
      })
      return
    }
    
    setEmailLoading(true)
    
    try {
      const result = await updateEmail(emailData.newEmail)
      
      if (result.success) {
        setEmailMessage({
          type: 'success',
          text: result.message || 'Email updated successfully!'
        })
        setEmailData({ newEmail: '' })
      } else {
        setEmailMessage({
          type: 'error',
          text: result.message || 'Failed to update email'
        })
      }
    } catch (error) {
      setEmailMessage({
        type: 'error',
        text: 'An unexpected error occurred'
      })
    } finally {
      setEmailLoading(false)
    }
  }

  const handleAccountDeletion = async (e: React.FormEvent) => {
    e.preventDefault()
    setDeleteMessage(null)
    
    if (deleteConfirmation !== 'DELETE') {
      setDeleteMessage({
        type: 'error',
        text: 'Please type DELETE to confirm account deletion'
      })
      return
    }
    
    setDeleteLoading(true)
    
    try {
      const result = await deleteAccount()
      
      if (result.success) {
        setDeleteMessage({
          type: 'success',
          text: result.message || 'Account deleted successfully!'
        })
        // useAuth hook will handle redirect
      } else {
        setDeleteMessage({
          type: 'error',
          text: result.message || 'Failed to delete account'
        })
      }
    } catch (error) {
      setDeleteMessage({
        type: 'error',
        text: 'An unexpected error occurred'
      })
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account preferences and security settings
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="danger" className="flex items-center gap-2 text-destructive">
              <Trash2 className="w-4 h-4" />
              Danger Zone
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile details here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-email">Current Email</Label>
                    <Input
                      id="current-email"
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-sm text-muted-foreground">
                      Use the Email tab to change your email address
                    </p>
                  </div>

                  {profileMessage && (
                    <Alert variant={profileMessage.type === 'error' ? 'destructive' : 'default'}>
                      <AlertDescription>{profileMessage.text}</AlertDescription>
                    </Alert>
                  )}
                  
                  <Button 
                    type="submit" 
                    disabled={profileLoading}
                    className="flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {profileLoading ? 'Updating...' : 'Update Profile'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Password Settings */}
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm new password"
                      required
                    />
                  </div>

                  {passwordMessage && (
                    <Alert variant={passwordMessage.type === 'error' ? 'destructive' : 'default'}>
                      <AlertDescription>{passwordMessage.text}</AlertDescription>
                    </Alert>
                  )}
                  
                  <Button 
                    type="submit" 
                    disabled={passwordLoading}
                    className="flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    {passwordLoading ? 'Updating...' : 'Update Password'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Change Email Address</CardTitle>
                <CardDescription>
                  Update the email address associated with your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEmailUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-email-display">Current Email</Label>
                    <Input
                      id="current-email-display"
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-email">New Email Address</Label>
                    <Input
                      id="new-email"
                      type="email"
                      value={emailData.newEmail}
                      onChange={(e) => setEmailData(prev => ({ ...prev, newEmail: e.target.value }))}
                      placeholder="Enter new email address"
                      required
                    />
                  </div>

                  {emailMessage && (
                    <Alert variant={emailMessage.type === 'error' ? 'destructive' : 'default'}>
                      <AlertDescription>{emailMessage.text}</AlertDescription>
                    </Alert>
                  )}
                  
                  <Button 
                    type="submit" 
                    disabled={emailLoading}
                    className="flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    {emailLoading ? 'Updating...' : 'Update Email'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Danger Zone */}
          <TabsContent value="danger">
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Permanently delete your account and all associated data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert variant="destructive">
                    <Trash2 className="w-4 h-4" />
                    <AlertDescription>
                      <strong>Warning:</strong> This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                    </AlertDescription>
                  </Alert>
                  
                  <form onSubmit={handleAccountDeletion} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="delete-confirmation">
                        Type <strong>DELETE</strong> to confirm account deletion
                      </Label>
                      <Input
                        id="delete-confirmation"
                        type="text"
                        value={deleteConfirmation}
                        onChange={(e) => setDeleteConfirmation(e.target.value)}
                        placeholder="Type DELETE here"
                        required
                      />
                    </div>

                    {deleteMessage && (
                      <Alert variant={deleteMessage.type === 'error' ? 'destructive' : 'default'}>
                        <AlertDescription>{deleteMessage.text}</AlertDescription>
                      </Alert>
                    )}
                    
                    <Button 
                      type="submit" 
                      variant="destructive"
                      disabled={deleteLoading || deleteConfirmation !== 'DELETE'}
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      {deleteLoading ? 'Deleting...' : 'Delete Account'}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}