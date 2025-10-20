import Container from '@/components/ui/Container'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold mb-4 inline-block">
              <span className="bg-gradient-to-r from-purple-400 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                FinBot
              </span>
            </Link>
            <p className="text-foreground/70 max-w-md">
              Your AI-powered assistant for smart conversations and effortless financial management with FundFlow.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <div className="space-y-3">
              <Link href="#features" className="block text-foreground/70 hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="block text-foreground/70 hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/chat" className="block text-foreground/70 hover:text-foreground transition-colors">
                Chat
              </Link>
              <Link href="/finance" className="block text-foreground/70 hover:text-foreground transition-colors">
                Finance Tools
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <div className="space-y-3">
              <Link href="/about" className="block text-foreground/70 hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/contact" className="block text-foreground/70 hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="block text-foreground/70 hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="block text-foreground/70 hover:text-foreground transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm">
            © 2025 FinBot. All rights reserved. Building the future of AI-powered finance.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}