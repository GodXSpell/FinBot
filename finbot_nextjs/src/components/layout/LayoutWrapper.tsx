'use client'

import Footer from '@/components/layout/Footer'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { usePathname } from 'next/navigation'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login' || pathname === '/signup'
  const isChatbotPage = pathname === '/chatbot'

  // Auth pages get no header or footer
  if (isAuthPage) {
    return <>{children}</>
  }

  // Chatbot page gets no header or footer
  if (isChatbotPage) {
    return <>{children}</>
  }

  // Landing page gets both header and footer
  return (
    <>
      <SiteHeader />
      {children}
      <Footer />
    </>
  )
}