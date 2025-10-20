'use client'

import { MAIN_NAV } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DesktopNavProps {
  items: typeof MAIN_NAV
  className?: string
}

export function DesktopNav({ items, className }: DesktopNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("hidden md:flex items-center gap-6", className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-foreground/80",
            pathname === item.href
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}