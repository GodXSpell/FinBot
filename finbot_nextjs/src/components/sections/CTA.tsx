'use client'

import { ArrowRight, Star, Users, Shield } from 'lucide-react'

export default function CTA() {
  return (
    <section id="cta" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]" />
      
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-500" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-12 text-sm text-foreground/60">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>10,000+ Active Users</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Bank-Grade Security</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span>4.9/5 User Rating</span>
          </div>
        </div>

        {/* Main CTA Content */}
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Ready to transform
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            your conversations?
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
          Join thousands who trust FinBot for intelligent conversations and expert financial guidance. 
          Start your journey today with our free trial.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            href="/signup"
            className="group bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 flex items-center gap-2"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="/demo"
            className="bg-background/20 backdrop-blur-sm border border-white/20 text-foreground hover:bg-white/10 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-lg"
          >
            Watch Demo
          </a>
        </div>

        {/* Features Pills */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {[
            "14-day free trial",
            "No credit card required",
            "Cancel anytime",
            "Full feature access"
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-foreground/80"
            >
              {feature}
            </div>
          ))}
        </div>

        {/* Fine Print */}
        <p className="text-sm text-foreground/50">
          Start your free trial today. No commitment, no hidden fees. 
          <br className="hidden sm:block" />
          Upgrade to premium features when you're ready.
        </p>
      </div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    </section>
  )
}