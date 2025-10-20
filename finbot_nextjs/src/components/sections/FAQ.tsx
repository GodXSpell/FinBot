'use client'

import { ChevronDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: "What is FinBot and how does it work?",
    answer: "FinBot is an AI-powered assistant that combines general conversation capabilities with specialized financial expertise. It uses advanced language models to understand your questions and provide accurate, helpful responses whether you're asking about everyday topics or complex financial matters."
  },
  {
    question: "Is my financial data secure with FinBot?",
    answer: "Absolutely. We use enterprise-grade encryption to protect all your conversations and financial data. Your information is never shared with third parties, and all data is processed with the highest security standards in compliance with financial regulations."
  },
  {
    question: "Can FinBot help with investment advice?",
    answer: "FinBot can provide general financial guidance and educational information about investments, but it doesn't replace professional financial advisors. For personalized investment advice, we recommend consulting with a qualified financial professional."
  },
  {
    question: "How accurate is the financial information provided?",
    answer: "FinBot is trained on comprehensive financial data and provides information based on current market conditions and established financial principles. However, financial markets are dynamic, so we always recommend verifying important information and consulting professionals for critical decisions."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 14-day free trial that gives you access to all FinBot features. You can explore both general chat and financial assistance modes without any commitment. No credit card required to start."
  },
  {
    question: "Can I integrate FinBot with other financial tools?",
    answer: "FinBot includes FundFlow integration for enhanced financial tracking and analysis. We're continuously working on adding more integrations with popular financial platforms and tools to provide you with a comprehensive financial assistant experience."
  },
  {
    question: "What languages does FinBot support?",
    answer: "Currently, FinBot primarily supports English, but we're working on expanding language support. The AI can understand context and nuance in English conversations, making interactions feel natural and helpful."
  },
  {
    question: "How do I switch between general chat and finance mode?",
    answer: "FinBot automatically detects the context of your conversation and adjusts its responses accordingly. You can also explicitly mention 'finance mode' or ask financial questions to activate specialized financial assistance features."
  }
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden bg-background/50 backdrop-blur-sm">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-purple-500/5 transition-colors duration-200"
      >
        <span className="font-semibold text-foreground pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-purple-400 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-4 text-foreground/70 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="relative">
      <div 
        className="screen-line-before screen-line-after section-bg flex min-h-[60vh] items-center justify-center border-x border-border px-4 py-16 md:py-24"
        data-faq-container
      >
        <div className="w-full max-w-4xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <HelpCircle className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-foreground/80">Got Questions?</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-600 to-purple-400 bg-clip-text text-transparent">
                Frequently Asked
              </span>
              <br />
              <span className="text-foreground">
                Questions
              </span>
            </h2>
            
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Find answers to common questions about FinBot, its features, security, and how it can help with your financial needs.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>

          {/* Contact Support */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Still have questions?
              </h3>
              <p className="text-foreground/70 mb-4">
                Our support team is here to help you get the most out of FinBot.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}