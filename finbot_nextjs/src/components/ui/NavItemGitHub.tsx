'use client'

import { Github } from 'lucide-react'
import Link from 'next/link'

export function NavItemGitHub() {
  return (
    <Link
      href="https://github.com/finbot"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center rounded-md p-2 text-foreground/60 hover:text-foreground hover:bg-accent transition-colors"
      aria-label="GitHub repository"
    >
      <Github className="h-5 w-5" />
    </Link>
  )
}