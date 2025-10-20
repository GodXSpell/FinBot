'use client'

import { useAuth } from '@/auth'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Bot,
  DollarSign,
  ExternalLink,
  History,
  Home,
  LogIn,
  LogOut,
  Mail,
  MessageCircle,
  Monitor,
  Moon,
  Search,
  Sun,
  User,
  UserPlus
} from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

interface Post {
  slug: string
  title: string
}

interface SavedChat {
  id: string
  name: string
  messages: any[]
  createdAt: Date
  lastModified: Date
}

interface CommandMenuProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  posts?: Post[]
  savedChats?: SavedChat[]
  onLoadChat?: (chatName: string) => void
  onNewChat?: () => void
}

export function CommandMenu({ 
  open = false, 
  onOpenChange, 
  posts = [], 
  savedChats = [], 
  onLoadChat, 
  onNewChat 
}: CommandMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const { setTheme } = useTheme()
  const { user, logout } = useAuth()
  
  const handleOpenChange = onOpenChange || setIsOpen
  const isOpenState = onOpenChange ? open : isOpen

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!mounted) return

    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        handleOpenChange(!isOpenState)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [isOpenState, handleOpenChange, mounted])

  const runCommand = React.useCallback((command: () => void) => {
    handleOpenChange(false)
    command()
  }, [handleOpenChange])

  if (!mounted) {
    return (
      <button
        className="flex items-center justify-center rounded-md p-2 text-foreground/60 hover:text-foreground hover:bg-accent transition-colors"
        aria-label="Search"
        disabled
      >
        <Search className="h-5 w-5" />
      </button>
    )
  }

  return (
    <>
      <button
        onClick={() => handleOpenChange(true)}
        className="flex items-center justify-center rounded-md p-2 text-foreground/60 hover:text-foreground hover:bg-accent transition-colors"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>
      
      <CommandDialog open={isOpenState} onOpenChange={handleOpenChange}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => window.location.href = '/')}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => {
              const element = document.getElementById('pricing')
              element?.scrollIntoView({ behavior: 'smooth' })
            })}>
              <DollarSign className="mr-2 h-4 w-4" />
              <span>Pricing</span>
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading="Account">
            {user ? (
              <>
                <CommandItem onSelect={() => runCommand(() => {
                  if (window.location.pathname === '/chatbot') {
                    if (onNewChat) {
                      onNewChat()
                    }
                  } else {
                    window.location.href = '/chatbot'
                  }
                })}>
                  <Bot className="mr-2 h-4 w-4" />
                  <span>{window.location.pathname === '/chatbot' ? 'New FinBot Chat' : 'FinBot Chat'}</span>
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => {
                  // TODO: Implement profile page
                  console.log('Profile clicked')
                })}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => logout())}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </CommandItem>
              </>
            ) : (
              <>
                <CommandItem onSelect={() => runCommand(() => window.location.href = '/login')}>
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Login</span>
                </CommandItem>
                <CommandItem onSelect={() => runCommand(() => window.location.href = '/signup')}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Get Started</span>
                </CommandItem>
              </>
            )}
          </CommandGroup>

          <CommandSeparator />
          
          {user && (
            <>
              <CommandGroup heading="Chat History">
                {onNewChat && (
                  <CommandItem onSelect={() => runCommand(() => onNewChat())}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    <span>New Chat</span>
                  </CommandItem>
                )}
                {savedChats.length > 0 ? (
                  <>
                    {savedChats
                      .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
                      .slice(0, 5) // Show only the 5 most recent chats
                      .map((chat) => (
                        <CommandItem 
                          key={chat.id} 
                          onSelect={() => runCommand(() => {
                            if (onLoadChat) {
                              onLoadChat(chat.name)
                            }
                          })}
                        >
                          <History className="mr-2 h-4 w-4" />
                          <div className="flex flex-col items-start">
                            <span className="truncate max-w-48">{chat.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {chat.messages.length} messages • {chat.lastModified.toLocaleDateString()}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                    {savedChats.length > 5 && (
                      <CommandItem onSelect={() => runCommand(() => {
                        // This will trigger the /list command behavior
                        console.log('Show all saved chats - use /list command')
                      })}>
                        <History className="mr-2 h-4 w-4" />
                        <span>View All ({savedChats.length} total)</span>
                      </CommandItem>
                    )}
                  </>
                ) : (
                  <CommandItem onSelect={() => runCommand(() => {
                    console.log('No saved chats available')
                  })}>
                    <History className="mr-2 h-4 w-4" />
                    <span className="text-muted-foreground">No saved chats yet</span>
                  </CommandItem>
                )}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}          {posts && posts.length > 0 && (
            <>
              <CommandGroup heading="Blog Posts">
                {posts.map((post) => (
                  <CommandItem 
                    key={post.slug} 
                    onSelect={() => runCommand(() => window.location.href = `/blog/${post.slug}`)}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    <span>{post.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}
          
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <Monitor className="mr-2 h-4 w-4" />
              <span>System</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          
          <CommandGroup heading="Contact">
            <CommandItem onSelect={() => runCommand(() => window.location.href = 'mailto:support@finbot.com')}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Contact Support</span>
              <ExternalLink className="ml-auto h-3 w-3" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
