"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"

export default function SharePage() {
  const [fileName, setFileName] = useState("")
  const [fileInfo, setFileInfo] = useState("")
  const [fileUrl, setFileUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async () => {
    // Validate input
    if (!fileName.trim() || !fileUrl.trim()) {
      setError("Name and URL are required")
      return
    }

    setIsLoading(true)
    setError(null)
    setUploadSuccess(false)

    try {
      const supabase = createClient()

      // Insert data into uploads table
      const { data, error: insertError } = await supabase
        .from("uploads")
        .insert({
          name: fileName.trim(),
          description: fileInfo.trim() || null,
          url: fileUrl.trim(),
        })
        .select()

      if (insertError) {
        throw insertError
      }

      console.log("[v0] Upload successful:", data)

      // Clear form and show success
      setFileName("")
      setFileInfo("")
      setFileUrl("")
      setUploadSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000)
    } catch (err) {
      console.error("[v0] Upload error:", err)
      setError(err instanceof Error ? err.message : "Failed to upload")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="flex flex-col items-center gap-4 mb-8">
          <Image src="/images/logo.png" alt="Logo" width={80} height={80} className="object-contain" />
          <h1 className="text-white text-2xl font-light tracking-wide">Vaulted</h1>
        </div>

        {uploadSuccess && <div className="bg-white text-black p-3 text-center rounded-none">Upload successful!</div>}

        {error && <div className="bg-red-500 text-white p-3 text-center rounded-none">{error}</div>}

        <Input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="name"
          className="bg-black border border-white text-white placeholder:text-gray-500 focus:border-white focus:ring-0 rounded-none"
          disabled={isLoading}
        />

        <Textarea
          value={fileInfo}
          onChange={(e) => setFileInfo(e.target.value)}
          placeholder="description"
          className="bg-black border border-white text-white placeholder:text-gray-500 focus:border-white focus:ring-0 rounded-none min-h-[80px] resize-none"
          disabled={isLoading}
        />

        <Input
          type="url"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          placeholder="url"
          className="bg-black border border-white text-white placeholder:text-gray-500 focus:border-white focus:ring-0 rounded-none"
          disabled={isLoading}
        />

        <div className="flex gap-2 mt-4">
          <Button
            onClick={handleUpload}
            className="flex-1 bg-white text-black hover:bg-gray-200 rounded-none"
            disabled={isLoading}
          >
            {isLoading ? "uploading..." : "upload"}
          </Button>
          <Link href="/" className="flex-1">
            <Button
              variant="outline"
              className="w-full border border-white text-white hover:bg-white hover:text-black rounded-none bg-black"
              disabled={isLoading}
            >
              back
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
