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
  const chatpage = pathname === '/chat'

  if (isAuthPage) {
    return <>{children}</>
  }

  if (chatpage){
    return (
    <>
      <SiteHeader />
      {children}
      
    </>
    )
  }

  return (
    <>
      <SiteHeader />
      {children}
      <Footer />
    </>
  )
}