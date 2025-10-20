'use client'

import { ReactNode, useEffect, useState } from 'react'

interface SiteHeaderWrapperProps {
  children: ReactNode
  className?: string
}

export function SiteHeaderWrapper({ children, className }: SiteHeaderWrapperProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={className}
      data-affix={isScrolled}
    >
      {children}
    </header>
  )
}