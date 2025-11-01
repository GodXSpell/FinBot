import { Bot } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

import { SignupForm } from "@/auth"

export const metadata: Metadata = {
  title: "Sign Up | FinBot",
  description: "Create your FinBot account to get started with AI-powered financial assistance.",
}

export default function SignupPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {/* <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Bot className="size-4" />
          </div>
          FinBot
        </Link> */}
        <SignupForm />
        
        {/* <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  )
}
