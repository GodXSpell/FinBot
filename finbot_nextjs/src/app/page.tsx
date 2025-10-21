import CTA from '@/components/sections/CTA'
import FAQ from '@/components/sections/FAQ'
import Features from '@/components/sections/Features'
import Hero from '@/components/sections/Hero'
import Container from '@/components/ui/Container'
import { Separator } from '@/components/ui/separator'
// please change the design of the landing page to a modern saas landing page design later
// also modify the seperator component to be more like the portfolio seperator design
// 
export default function Home() {
  return (
    <main className="min-h-screen pt-16">
      <Container className="py-0 space-y-0">
        <Hero />
        <Separator fullWidth />
        <Features />
        <Separator fullWidth />
        <FAQ />
        <Separator fullWidth />
        <CTA />
      </Container>
    </main>
  )
}
