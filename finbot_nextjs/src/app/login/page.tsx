import { Bot } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

import { LoginForm } from "@/auth"
import { Separator } from "@radix-ui/react-separator"

export const metadata: Metadata = {
  title: "Login | FinBot",
  description: "Sign in to your FinBot account to access personalized financial AI assistance.",
}

export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {/* <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Bot className="size-4" />
          </div>
          FinBot
        </Link> */}
        <LoginForm />
        {/* <Separator/> */}
        
        {/* <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link 
              href="/signup" 
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  )
}
