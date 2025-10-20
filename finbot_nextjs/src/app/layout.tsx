import Footer from '@/components/layout/Footer';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { META_THEME_COLORS } from '@/config/site';
import type { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "FinBot – Your AI Chat & Finance Assistant",
  description: "Smart conversations and effortless financial management with FinBot. Your personal AI assistant for chat and FundFlow finance.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: META_THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: META_THEME_COLORS.dark },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SiteHeader />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
