import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <FAQ />
      <CTA />
    </main>
  )
}
