'use client'

export default function Hero() {
  return (
    <section className="relative">
      <div 
        className="screen-line-before screen-line-after section-bg flex min-h-[60vh] items-center justify-center border-x border-border px-4 py-16 md:py-24"
        data-hero-container
      >
        <div className="text-center max-w-xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              The AI for your Smart Saving
            </span>
          </h1>

          {/* Subtitle */}
          <h4 className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-8">
            FinBot is your AI-powered assistant for everyday conversations and seamless FundFlow finance support. Get answers, insights, and financial help—all in one place.
          </h4>

          {/* Demo Credentials */}
          <div className="bg-muted/50 border border-border rounded-lg p-6 max-w-md mx-auto">
            <h5 className="text-sm font-semibold text-foreground mb-3">🚀 Try the Demo</h5>
            <div className="text-sm space-y-2 text-left">
              <div>
                <span className="text-muted-foreground">Name:</span> <code className="bg-background px-2 py-1 rounded text-xs">Admin</code>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span> <code className="bg-background px-2 py-1 rounded text-xs">admin@gmail.com</code>
              </div>
              <div>
                <span className="text-muted-foreground">Password:</span> <code className="bg-background px-2 py-1 rounded text-xs">Admin@123</code>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Use these credentials to test the signup and login flow
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}