'use client'

import { cn } from '@/lib/utils'

interface SiteHeaderMarkProps {
  className?: string
}

export function SiteHeaderMark({ className }: SiteHeaderMarkProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <rect width="32" height="32" rx="8" fill="url(#gradient)" />
        <path
          d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h12v2H8v-2z"
          fill="white"
        />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
            <stop stopColor="#8B5CF6" />
            <stop offset="0.5" stopColor="#7C3AED" />
            <stop offset="1" stopColor="#2563EB" />
          </linearGradient>
        </defs>
      </svg>
      <span className="bg-gradient-to-r from-purple-400 via-purple-600 to-blue-600 bg-clip-text text-transparent font-bold text-xl">
        FinBot
      </span>
    </div>
  )
}