'use client'

import { CommandMenu } from '@/components/ui/CommandMenu'
import Container from '@/components/ui/Container'
import { ToggleTheme } from '@/components/ui/ToggleTheme'
import { Command, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isCommandOpen, setIsCommandOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <Container>
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                FinBot
              </span>
            </Link>

            {/* Command Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <button
                onClick={() => setIsCommandOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground bg-background/50 border border-border/50 rounded-lg hover:bg-background/80 hover:border-border transition-all"
              >
                <Search className="h-4 w-4" />
                <span className="flex-1 text-left">Search for anything...</span>
                <div className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
                  <Command className="h-3 w-3" />
                  <span>K</span>
                </div>
              </button>
            </div>

            {/* Theme Toggle */}
            <div className="hidden md:flex items-center">
              <ToggleTheme />
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-2">
              <ToggleTheme />
              <button
                onClick={() => setIsCommandOpen(true)}
                className="p-2 rounded-lg hover:bg-accent"
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <CommandMenu open={isCommandOpen} onOpenChange={setIsCommandOpen} />
    </>
  )
}