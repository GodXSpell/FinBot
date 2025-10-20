'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

import { BrandContextMenu } from '@/components/ui/BrandContextMenu'
import { SiteHeaderMark } from '@/components/ui/SiteHeaderMark'
import { SiteHeaderWrapper } from '@/components/ui/SiteHeaderWrapper'
import { getAllPosts } from '@/features/blog/data/posts'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

const CommandMenu = dynamic(() =>
  import('@/components/ui/CommandMenu').then((mod) => ({ default: mod.CommandMenu })),
  { 
    ssr: false,
    loading: () => (
      <button
        className="flex items-center justify-center rounded-md p-2 text-foreground/60 hover:text-foreground hover:bg-accent transition-colors"
        aria-label="Search"
        disabled
      >
        <Search className="h-5 w-5" />
      </button>
    )
  }
)

export function SiteHeader() {
  const posts = getAllPosts()

  return (
    <SiteHeaderWrapper
      className={cn(
        'fixed top-0 z-50 w-full max-w-screen overflow-x-hidden px-2 pt-2 border-b border-border/30',
        'bg-white/70 backdrop-blur-xl dark:bg-black/70',
        'data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]/80',
        'not-dark:data-[affix=true]:**:data-header-container:after:bg-border',
        'transition-all duration-300'
      )}
    >
      <div
        className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-2 border-x border-border/50 px-2 after:z-1 after:transition-[background-color] sm:gap-4 w-full lg:w-[85%]"
        data-header-container
      >
        <BrandContextMenu>
          <Link href="/" aria-label="Home" className="[&_svg]:h-8">
            <SiteHeaderMark />
          </Link>
        </BrandContextMenu>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <CommandMenu posts={posts} />
        </div>
      </div>
    </SiteHeaderWrapper>
  )
}