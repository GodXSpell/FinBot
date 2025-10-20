export interface Post {
  slug: string
  title: string
  description?: string
  publishedAt?: string
  tags?: string[]
}

export function getAllPosts(): Post[] {
  // For now, return some sample posts
  // In a real app, this would fetch from your CMS or markdown files
  return [
    {
      slug: 'getting-started-with-finbot',
      title: 'Getting Started with FinBot',
      description: 'Learn how to use FinBot for your financial management needs',
      publishedAt: '2024-01-15',
      tags: ['fintech', 'tutorial']
    },
    {
      slug: 'ai-powered-budgeting',
      title: 'AI-Powered Budgeting Made Simple',
      description: 'Discover how AI can help you create and maintain better budgets',
      publishedAt: '2024-01-10',
      tags: ['ai', 'budgeting']
    },
    {
      slug: 'investment-tracking',
      title: 'Smart Investment Tracking',
      description: 'Track your investments with intelligent insights and analytics',
      publishedAt: '2024-01-05',
      tags: ['investing', 'analytics']
    }
  ]
}