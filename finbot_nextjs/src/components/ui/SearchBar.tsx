'use client'

import { CommandMenu } from '@/components/ui/CommandMenu'
import { getAllPosts } from '@/features/blog/data/posts'
import { cn } from '@/lib/utils'
import { Command, Search } from 'lucide-react'
import { useState } from 'react'

interface SearchBarProps {
  className?: string
}

export function SearchBar({ className }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const posts = getAllPosts()

  return (
    <>
      <div className={cn("flex-1 max-w-lg mx-4", className)}>
        <button
          onClick={() => setIsOpen(true)}
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
      
      <CommandMenu 
        open={isOpen} 
        onOpenChange={setIsOpen}
        posts={posts} 
      />
    </>
  )
}