"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"

export default function ApiSignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/api-dashboard`,
        },
      })

      if (error) {
        setMessage({ type: "error", text: error.message })
      } else {
        setMessage({
          type: "success",
          text: "Check your email for a verification link. After verifying, you'll receive your API key.",
        })
        setEmail("")
        setPassword("")
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Image src="/images/logo.png" alt="Vaulted Logo" width={80} height={80} className="object-contain" />
          </div>
          <Link href="/" className="text-white text-2xl font-light tracking-wide hover:text-gray-300 transition-colors">
            Vaulted
          </Link>
          {/* </CHANGE> */}
          <h2 className="mt-6 text-white text-xl font-light">Get API Access</h2>
          <p className="mt-2 text-sm text-gray-500">Sign up to receive your API key</p>
        </div>

        <form onSubmit={handleSignup} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              required
              className="bg-black border border-white text-white placeholder:text-gray-500 focus:border-white focus:ring-0 rounded-none"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
              minLength={6}
              className="bg-black border border-white text-white placeholder:text-gray-500 focus:border-white focus:ring-0 rounded-none"
            />
          </div>

          {message && (
            <div
              className={`text-sm ${message.type === "error" ? "text-red-500" : "text-green-500"} text-center border ${
                message.type === "error" ? "border-red-500" : "border-green-500"
              } p-3 rounded-none`}
            >
              {message.text}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black hover:bg-gray-200 rounded-none py-3"
          >
            {loading ? "signing up..." : "sign up"}
          </Button>
        </form>

        <div className="text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
            back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
