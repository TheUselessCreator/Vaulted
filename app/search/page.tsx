"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"

type Upload = {
  id: string
  name: string
  description: string
  url: string
  created_at: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "")
  const [results, setResults] = useState<Upload[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<"created_at" | "name">("created_at")
  const [order, setOrder] = useState<"asc" | "desc">("desc")

  const handleSearch = async (query: string = searchValue) => {
    setLoading(true)
    setHasSearched(true)
    try {
      const params = new URLSearchParams({
        q: query,
        sortBy,
        order,
      })
      const response = await fetch(`/api/search?${params}`)
      const { data, error } = await response.json()

      if (error) {
        console.error("[v0] Search error:", error)
        setResults([])
      } else {
        setResults(data || [])
      }
    } catch (error) {
      console.error("[v0] Search error:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleGo = () => {
    const query = searchValue.trim()
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search")
    handleSearch(query)
  }

  useEffect(() => {
    const query = searchParams.get("q") || ""
    setSearchValue(query)
    handleSearch(query)
  }, [])

  useEffect(() => {
    if (hasSearched) {
      handleSearch()
    }
  }, [sortBy, order])

  return (
    <main className="min-h-screen bg-black flex flex-col items-center py-8">
      <div className="w-full max-w-2xl flex flex-col gap-8 px-4">
        <div className="flex flex-col items-center gap-4 mb-4">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={60} height={60} className="object-contain" />
          </Link>
          <h1 className="text-white text-xl font-light tracking-wide">Vaulted</h1>
        </div>

        <div className="flex flex-col gap-2 items-center">
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

          {hasSearched && (
            <>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-gray-500 text-xs hover:text-white transition-colors"
              >
                {showFilters ? "- filters" : "+ filters"}
              </button>

              {showFilters && (
                <div className="flex gap-4 text-xs border border-gray-800 p-3 w-full max-w-md">
                  <div className="flex gap-2 items-center">
                    <span className="text-gray-500">sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as "created_at" | "name")}
                      className="bg-black text-white border border-gray-700 rounded-none px-2 py-1"
                    >
                      <option value="created_at">date</option>
                      <option value="name">name</option>
                    </select>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-gray-500">order:</span>
                    <select
                      value={order}
                      onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
                      className="bg-black text-white border border-gray-700 rounded-none px-2 py-1"
                    >
                      <option value="desc">newest</option>
                      <option value="asc">oldest</option>
                    </select>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {loading ? (
          <div className="text-gray-500 text-sm text-center">searching...</div>
        ) : results.length > 0 ? (
          <div className="flex flex-col gap-2">
            {results.map((upload) => (
              <a
                key={upload.id}
                href={upload.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-800 hover:border-white transition-colors p-4 group"
              >
                <h3 className="text-white text-sm font-medium group-hover:underline">{upload.name}</h3>
                {upload.description && <p className="text-gray-500 text-xs mt-1">{upload.description}</p>}
              </a>
            ))}
          </div>
        ) : hasSearched ? (
          <div className="text-gray-500 text-sm text-center">no results found</div>
        ) : null}

        <Link href="/share" className="text-gray-500 text-sm hover:text-white transition-colors text-center">
          share
        </Link>

        <footer className="flex gap-4 justify-center text-xs text-gray-600 mt-8">
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
      </div>
    </main>
  )
}
