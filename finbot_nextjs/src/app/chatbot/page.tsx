'use client'

import { useAuth } from '@/auth'
import { Button } from '@/components/ui/button'
import { CommandMenu } from '@/components/ui/CommandMenu'
import { Bot, MessageCircle, Send, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

interface ChatMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface SavedChat {
  id: string
  name: string
  messages: ChatMessage[]
  createdAt: Date
  lastModified: Date
}

export default function ChatbotPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [currentChatName, setCurrentChatName] = useState<string>('New Chat')
  const [savedChats, setSavedChats] = useState<SavedChat[]>([])
  const [showCommandHelp, setShowCommandHelp] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px'
    }
  }

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Load saved chats from localStorage on mount
  useEffect(() => {
    const loadSavedChats = () => {
      try {
        const saved = localStorage.getItem(`finbot-chats-${user?.email}`)
        if (saved) {
          const parsedChats = JSON.parse(saved).map((chat: any) => ({
            ...chat,
            createdAt: new Date(chat.createdAt),
            lastModified: new Date(chat.lastModified),
            messages: chat.messages.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }))
          }))
          setSavedChats(parsedChats)
        }
      } catch (error) {
        console.error('Error loading saved chats:', error)
      }
    }

    if (user?.email) {
      loadSavedChats()
    }
  }, [user?.email])

  // Save current chat
  const saveCurrentChat = useCallback(() => {
    if (!user?.email || messages.length === 0) return

    const chatToSave: SavedChat = {
      id: currentChatId || Date.now().toString(),
      name: currentChatName,
      messages: messages,
      createdAt: currentChatId ? savedChats.find(c => c.id === currentChatId)?.createdAt || new Date() : new Date(),
      lastModified: new Date()
    }

    const updatedChats = currentChatId 
      ? savedChats.map(chat => chat.id === currentChatId ? chatToSave : chat)
      : [...savedChats, chatToSave]

    setSavedChats(updatedChats)
    setCurrentChatId(chatToSave.id)

    try {
      localStorage.setItem(`finbot-chats-${user.email}`, JSON.stringify(updatedChats))
    } catch (error) {
      console.error('Error saving chat:', error)
    }
  }, [user?.email, messages, currentChatId, currentChatName, savedChats])

  // Auto-save chat when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const timeoutId = setTimeout(() => {
        saveCurrentChat()
      }, 2000) // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(timeoutId)
    }
  }, [messages, saveCurrentChat])

  // Process commands
  const processCommand = (command: string): boolean => {
    const trimmedCommand = command.trim()
    
    if (trimmedCommand === '/help') {
      setShowCommandHelp(true)
      addSystemMessage(`Available Commands:
• /help - Show this help message
• /nc - Start a new chat
• /save "<name>" - Save current chat with a name
• /load "<name>" - Load a previously saved chat
• /list - List all saved chats
• /delete "<name>" - Delete a saved chat
• /clear - Clear current chat`)
      return true
    }
    
    if (trimmedCommand === '/nc') {
      startNewChat()
      addSystemMessage('Started a new chat. Your previous chat has been auto-saved.')
      return true
    }

    if (trimmedCommand === '/list') {
      if (savedChats.length === 0) {
        addSystemMessage('No saved chats found.')
      } else {
        const chatList = savedChats
          .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
          .map(chat => `• "${chat.name}" - ${chat.messages.length} messages - ${chat.lastModified.toLocaleDateString()}`)
          .join('\n')
        addSystemMessage(`Saved Chats:\n${chatList}`)
      }
      return true
    }

    if (trimmedCommand === '/clear') {
      setMessages([])
      setCurrentChatId(null)
      setCurrentChatName('New Chat')
      addSystemMessage('Chat cleared.')
      return true
    }

    // Save command: /save "chat name"
    const saveMatch = trimmedCommand.match(/^\/save\s+"([^"]+)"$/)
    if (saveMatch) {
      const chatName = saveMatch[1]
      setCurrentChatName(chatName)
      saveCurrentChat()
      addSystemMessage(`Chat saved as "${chatName}".`)
      return true
    }

    // Load command: /load "chat name"
    const loadMatch = trimmedCommand.match(/^\/load\s+"([^"]+)"$/)
    if (loadMatch) {
      const chatName = loadMatch[1]
      const chatToLoad = savedChats.find(chat => chat.name === chatName)
      if (chatToLoad) {
        setMessages(chatToLoad.messages)
        setCurrentChatId(chatToLoad.id)
        setCurrentChatName(chatToLoad.name)
        addSystemMessage(`Loaded chat "${chatName}".`)
      } else {
        addSystemMessage(`Chat "${chatName}" not found. Use /list to see available chats.`)
      }
      return true
    }

    // Delete command: /delete "chat name"
    const deleteMatch = trimmedCommand.match(/^\/delete\s+"([^"]+)"$/)
    if (deleteMatch) {
      const chatName = deleteMatch[1]
      const chatExists = savedChats.find(chat => chat.name === chatName)
      if (chatExists) {
        const updatedChats = savedChats.filter(chat => chat.name !== chatName)
        setSavedChats(updatedChats)
        try {
          localStorage.setItem(`finbot-chats-${user?.email}`, JSON.stringify(updatedChats))
          addSystemMessage(`Chat "${chatName}" deleted.`)
        } catch (error) {
          console.error('Error deleting chat:', error)
          addSystemMessage(`Error deleting chat "${chatName}".`)
        }
      } else {
        addSystemMessage(`Chat "${chatName}" not found.`)
      }
      return true
    }

    return false // Not a valid command
  }

  // Add system message
  const addSystemMessage = (content: string) => {
    const systemMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: 'assistant',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, systemMessage])
  }

  // Start new chat
  const startNewChat = () => {
    setMessages([])
    setCurrentChatId(null)
    setCurrentChatName('New Chat')
  }

  // Load chat by name (for CommandMenu)
  const loadChatByName = (chatName: string) => {
    const chatToLoad = savedChats.find(chat => chat.name === chatName)
    if (chatToLoad) {
      setMessages(chatToLoad.messages)
      setCurrentChatId(chatToLoad.id)
      setCurrentChatName(chatToLoad.name)
      addSystemMessage(`Loaded chat "${chatName}".`)
    }
  }

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    adjustTextareaHeight()
  }

  const getChatbotResponse = async (userMessage: string): Promise<string> => {
    try {
      // Get API key from environment variables
      const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY
      
      if (!API_KEY) {
        throw new Error('API key not found. Please add NEXT_PUBLIC_OPENAI_API_KEY or NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file')
      }

      // Detect if it's a Gemini API key (starts with AIzaSy)
      const isGeminiKey = API_KEY.startsWith('AIzaSy')
      
      if (isGeminiKey) {
        // Use Google Gemini API with correct model and headers
        console.log('Using Gemini API with model: gemini-2.0-flash')
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': API_KEY,
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are FinBot, an AI-powered financial assistant. You help users with budgeting, investment advice, financial planning, and market insights. Always be helpful, professional, and provide practical financial guidance. You are an expert in personal finance and investments with deep knowledge of financial markets, instruments, and strategies as well as budgeting and saving techniques with a friendly and approachable demeanor along with clear and concise explanations.\n\nUser: ${userMessage}`
              }]
            }]
          }),
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error('Gemini API error response:', errorText)
          throw new Error(`Gemini API error: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        console.log('Gemini API response:', data)
        return data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I encountered an error processing your request. Please try again.'
      } else {
        // Use OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are FinBot, an AI-powered financial assistant. You help users with budgeting, investment advice, financial planning, and market insights. Always be helpful, professional, and provide practical financial guidance. You are an expert in personal finance and investments with deep knowledge of financial markets, instruments, and strategies as well as budgeting and saving techniques with a friendly and approachable demeanor along with clear and concise explanations.'
              },
              {
                role: 'user',
                content: userMessage
              }
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        })

        if (!response.ok) {
          throw new Error(`OpenAI API error: ${response.status}`)
        }

        const data = await response.json()
        return data.choices[0]?.message?.content || 'I apologize, but I encountered an error processing your request. Please try again.'
      }
    } catch (error) {
      console.error('Error getting chatbot response:', error)
      return 'I apologize, but I\'m currently experiencing technical difficulties. Please try again later or check your API configuration.'
    }
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const trimmedMessage = message.trim()
    
    // Check if it's a command
    if (trimmedMessage.startsWith('/')) {
      const isValidCommand = processCommand(trimmedMessage)
      if (isValidCommand) {
        setMessage('')
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto'
        }
        return
      } else {
        addSystemMessage(`Unknown command: ${trimmedMessage}. Type /help for available commands.`)
        setMessage('')
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto'
        }
        return
      }
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: trimmedMessage,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setIsTyping(true)
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    try {
      const botResponse = await getChatbotResponse(userMessage.content)
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        role: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsTyping(false)
    }
  }

    return (
        <div className="min-h-screen bg-background flex flex-col">
      {/* Chat Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto max-w-4xl px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="h-5 w-5 text-primary" />
              <h1 className="font-semibold text-lg">{currentChatName}</h1>
              {messages.length > 0 && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {messages.length} messages
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Type /help for commands</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="container mx-auto max-w-4xl flex-1 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-4">
            {messages.length === 0 ? (
              <>
                {/* Initial Welcome */}
                <div className="bg-card border rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Bot className="h-6 w-6 text-primary" />
                    <span className="font-semibold">FinBot</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">
                    Hello {user?.name || user?.email}! 👋
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Welcome to FinBot, your AI-powered financial assistant. I'm here to help you with financial planning, investment advice, budgeting, and market insights.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-3 mb-4">
                    <h4 className="text-sm font-medium mb-2">💡 Quick Commands:</h4>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div><code className="bg-background px-1 rounded">/help</code> - Show all commands</div>
                      <div><code className="bg-background px-1 rounded">/nc</code> - Start new chat</div>
                      <div><code className="bg-background px-1 rounded">/save "name"</code> - Save current chat</div>
                      <div><code className="bg-background px-1 rounded">/list</code> - View saved chats</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Type your question below to get started!
                  </p>
                </div>

                {/* Sample Questions */}
                <div className="grid gap-3">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Try asking me:
                  </h3>
                  <div className="grid gap-2">
                    {[
                      "How should I budget my monthly income?",
                      "What's the best investment strategy for beginners?",
                      "How can I save for retirement?",
                      "Explain cryptocurrency to me"
                    ].map((question, index) => (
                      <button
                        key={index}
                        className="text-left p-3 bg-muted/50 hover:bg-muted rounded-lg text-sm transition-colors"
                        onClick={() => {
                          setMessage(question)
                          if (textareaRef.current) {
                            textareaRef.current.focus()
                          }
                        }}
                      >
                        <MessageCircle className="h-4 w-4 inline mr-2 text-muted-foreground" />
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Chat Messages */}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${
                      msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {msg.role === 'assistant' ? (
                        <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
                          <Bot className="h-4 w-4 text-primary-foreground" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card border'
                      }`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
                          <Bot className="h-3 w-3" />
                          <span>FinBot</span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="bg-card border p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
                        <Bot className="h-3 w-3" />
                        <span>FinBot</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t border-border">
          <div className="p-4">
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-3 items-end">
                <CommandMenu 
                  savedChats={savedChats}
                  onLoadChat={loadChatByName}
                  onNewChat={startNewChat}
                />
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={handleInputChange}
                    placeholder={message.startsWith('/') ? "Type command... (try /help)" : "Ask me anything about finance or type / for commands..."}
                    className="w-full resize-none bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[44px] max-h-[150px] overflow-y-auto"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                </div>
                <Button 
                  size="sm" 
                  className="h-11 px-4 flex-shrink-0"
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-2 text-center">
                Press Enter to send • Shift + Enter for new line • / for commands • ⌘K for menu
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}