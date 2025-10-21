'use client'
// idea for hero section is to have 1/4 width of the section to be assigned to its logo and rest 3/4 to the text content
// and the text to be left aligned and the logo will be to the right of the section 
// and logo will be jin sakais clan logo from ghost of tsushima
// this is to be implemented later 
// and to also change the whole of the landing page design as of now its fine but still lacking the touch of modern saas landing page
// 
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

        </div>
      </div>
    </section>
  )
}