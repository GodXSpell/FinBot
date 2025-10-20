'use client'

import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'wide' | 'narrow'
}

export default function Container({ 
  children, 
  className = "", 
  variant = 'default' 
}: ContainerProps) {
  const variantClasses = {
    default: 'w-full lg:w-[75%]', // 75% on desktop, full on tablet/mobile
    wide: 'w-full lg:w-[85%]',    // 85% on desktop for wider content
    narrow: 'w-full lg:w-[65%]'   // 65% on desktop for narrower content
  }

  return (
    <div className={`${variantClasses[variant]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}