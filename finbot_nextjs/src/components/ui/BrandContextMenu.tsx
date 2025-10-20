'use client'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { ReactNode, useState } from 'react'

interface BrandContextMenuProps {
  children: ReactNode
  className?: string
}

export function BrandContextMenu({ children, className }: BrandContextMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={cn("cursor-pointer", className)}>
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold">FinBot</h3>
            <p className="text-sm text-muted-foreground">
              Your AI-powered financial assistant
            </p>
          </div>
          <div className="grid gap-2">
            <button 
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent text-left"
              onClick={() => {
                navigator.clipboard.writeText('FinBot')
                setOpen(false)
              }}
            >
              <span className="text-sm">Copy brand name</span>
            </button>
            <button 
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent text-left"
              onClick={() => {
                navigator.clipboard.writeText(window.location.origin)
                setOpen(false)
              }}
            >
              <span className="text-sm">Copy website URL</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}