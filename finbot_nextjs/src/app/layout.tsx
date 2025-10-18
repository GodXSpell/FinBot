import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "FinBot – Your AI Chat & Finance Assistant",
  description: "Smart conversations and effortless financial management with FinBot. Your personal AI assistant for chat and FundFlow finance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
