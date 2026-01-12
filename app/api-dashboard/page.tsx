"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function ApiDashboardPage() {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    checkAuthAndGenerateKey()
  }, [])

  const checkAuthAndGenerateKey = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/api-signup")
        return
      }

      // Check if user already has an API key
      const { data: existingKey } = await supabase.from("api_keys").select("api_key").eq("user_id", user.id).single()

      if (existingKey) {
        setApiKey(existingKey.api_key)
      } else {
        // Generate new API key
        const newKey = `vlt_${generateRandomKey()}`
        const { error } = await supabase.from("api_keys").insert({
          user_id: user.id,
          email: user.email,
          api_key: newKey,
        })

        if (!error) {
          setApiKey(newKey)
        }
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateRandomKey = () => {
    return Array.from({ length: 32 }, () => Math.random().toString(36)[2]).join("")
  }

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">loading...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <Link href="/" className="text-white text-2xl font-light tracking-wide hover:text-gray-300 transition-colors">
            Vaulted
          </Link>
          <h2 className="mt-6 text-white text-xl font-light">Your API Key</h2>
        </div>

        {apiKey && (
          <div className="space-y-4">
            <div className="bg-black border border-white p-4">
              <p className="text-white font-mono text-sm break-all">{apiKey}</p>
            </div>
            <Button onClick={copyToClipboard} className="w-full bg-white text-black hover:bg-gray-200 rounded-none">
              {copied ? "copied!" : "copy api key"}
            </Button>
            <div className="text-center text-sm text-gray-500 space-y-2">
              <p>Use this key to access the Vaulted API</p>
              <p className="text-xs">Keep it secret, keep it safe</p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 items-center">
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-black rounded-none bg-transparent"
          >
            sign out
          </Button>
          <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
            back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
