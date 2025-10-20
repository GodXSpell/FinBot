'use client'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { MAIN_NAV } from '@/config/site'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface MobileNavProps {
  items: typeof MAIN_NAV
  className?: string
}

export function MobileNav({ items, className }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            "flex items-center justify-center rounded-md p-2 text-base hover:bg-accent hover:text-accent-foreground",
            className
          )}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <span className="bg-gradient-to-r from-purple-400 via-purple-600 to-blue-600 bg-clip-text text-transparent font-bold text-xl">
              FinBot
            </span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-2 hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex flex-col gap-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex w-full items-center rounded-md p-3 text-sm font-medium hover:bg-accent transition-colors",
                pathname === item.href ? "bg-accent" : "transparent"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </DialogContent>
    </Dialog>
  )
}