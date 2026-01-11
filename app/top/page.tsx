"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

type Upload = {
  id: string
  name: string
  description: string
  url: string
  created_at: string
}

export default function TopPage() {
  const [uploads, setUploads] = useState<Upload[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllUploads = async () => {
      try {
        const response = await fetch("/api/search")
        const result = await response.json()
        setUploads(result.data || [])
      } catch (error) {
        console.error("Error fetching uploads:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllUploads()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center gap-4 mb-8">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={60} height={60} className="object-contain" />
          </Link>
          <h1 className="text-2xl font-light">all indexed links</h1>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">loading...</div>
        ) : uploads.length === 0 ? (
          <div className="text-center text-gray-500">no uploads yet</div>
        ) : (
          <div className="space-y-4">
            {uploads.map((upload) => (
              <a
                key={upload.id}
                href={upload.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-white p-4 hover:bg-white hover:text-black transition-colors"
              >
                <h3 className="font-medium mb-1">{upload.name}</h3>
                {upload.description && <p className="text-sm text-gray-400 mb-2">{upload.description}</p>}
                <p className="text-xs text-gray-500 break-all">{upload.url}</p>
              </a>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/">
            <Button
              variant="outline"
              className="bg-black text-white border-white hover:bg-white hover:text-black rounded-none"
            >
              back to home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
