"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Home() {
  const [searchValue, setSearchValue] = useState("")
  const router = useRouter()

  const handleGo = () => {
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue)}`)
    } else {
      router.push("/search")
    }
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-between py-8">
      <div className="flex-1 w-full max-w-2xl flex flex-col items-center justify-center gap-8 px-4">
        <div className="flex flex-col items-center gap-4 mb-8">
          <Image src="/images/logo.png" alt="Logo" width={80} height={80} className="object-contain" />
          <h1 className="text-white text-2xl font-light tracking-wide">Vaulted</h1>
        </div>

        <div className="flex gap-2 w-full max-w-md">
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGo()}
            placeholder="search"
            className="flex-1 bg-black border border-white text-white placeholder:text-gray-500 focus:border-white focus:ring-0 rounded-none"
          />
          <Button onClick={handleGo} className="bg-white text-black hover:bg-gray-200 rounded-none px-6">
            go
          </Button>
        </div>

        <Link href="/share" className="text-gray-500 text-sm hover:text-white transition-colors text-center">
          share
        </Link>
      </div>

      <footer className="flex gap-4 justify-center text-xs text-gray-600 pb-4">
        <Link href="/about" className="hover:text-white transition-colors">
          what's this
        </Link>
        <span>•</span>
        <Link href="/tos" className="hover:text-white transition-colors">
          tos
        </Link>
        <span>•</span>
        <Link href="/rules" className="hover:text-white transition-colors">
          rules
        </Link>
      </footer>
    </main>
  )
}
