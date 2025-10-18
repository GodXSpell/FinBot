'use client'

import { MessageSquare, TrendingUp, Shield, Zap, Brain, Users } from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: "General Purpose Chat",
    description: "Engage in natural conversations on any topic. Get answers, brainstorm ideas, or just have a friendly chat."
  },
  {
    icon: TrendingUp,
    title: "Finance Assistant",
    description: "Specialized financial guidance for budgeting, investments, and financial planning with FundFlow integration."
  },
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Advanced AI that learns from conversations to provide more personalized and relevant responses."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your conversations and financial data are encrypted and protected with enterprise-grade security."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get instant responses to your queries with our optimized AI infrastructure and real-time processing."
  },
  {
    icon: Users,
    title: "Multi-Mode Support",
    description: "Switch seamlessly between general chat and finance mode based on your current needs."
  }
]

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-foreground/80">Powerful Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Everything you need
            </span>
            <br />
            <span className="text-foreground">
              in one assistant
            </span>
          </h2>
          
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            FinBot combines the power of general AI conversation with specialized financial expertise, 
            giving you the best of both worlds in a single, intelligent assistant.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full px-6 py-3">
            <span className="text-foreground/70">Ready to experience the future?</span>
            <a
              href="/signup"
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    </section>
  )
}