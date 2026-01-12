import { createClient } from "@/lib/supabase/client"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Get API key from Authorization header
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid API key" }, { status: 401 })
    }

    const apiKey = authHeader.replace("Bearer ", "")
    const supabase = createClient()

    // Verify API key exists and is active
    const { data: keyData, error: keyError } = await supabase
      .from("api_keys")
      .select("api_key, is_active")
      .eq("api_key", apiKey)
      .single()

    if (keyError || !keyData || !keyData.is_active) {
      return NextResponse.json({ error: "Invalid or inactive API key" }, { status: 401 })
    }

    // Check rate limit - 1 request per 10 minutes
    const { data: rateLimitData } = await supabase
      .from("api_rate_limits")
      .select("last_request_at")
      .eq("api_key", apiKey)
      .single()

    const now = new Date()
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000)

    if (rateLimitData) {
      const lastRequest = new Date(rateLimitData.last_request_at)
      if (lastRequest > tenMinutesAgo) {
        const waitTime = Math.ceil((lastRequest.getTime() + 10 * 60 * 1000 - now.getTime()) / 1000 / 60)
        return NextResponse.json({ error: `Rate limit exceeded. Try again in ${waitTime} minute(s)` }, { status: 429 })
      }

      // Update last request time
      await supabase.from("api_rate_limits").update({ last_request_at: now }).eq("api_key", apiKey)
    } else {
      // First request - create rate limit entry
      await supabase.from("api_rate_limits").insert({ api_key: apiKey, last_request_at: now })
    }

    // Parse request body
    const body = await request.json()
    const { name, description, url } = body

    if (!name || !url) {
      return NextResponse.json({ error: "Name and URL are required" }, { status: 400 })
    }

    // Insert upload into database
    const { data, error } = await supabase
      .from("uploads")
      .insert([{ name, description: description || "", url }])
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save upload" }, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        message: "Upload saved successfully",
        data: {
          id: data.id,
          name: data.name,
          description: data.description,
          url: data.url,
          created_at: data.created_at,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
