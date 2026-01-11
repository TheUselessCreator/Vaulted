import { createClient } from "@/lib/supabase/client"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createClient()

  // Get a random upload from the database
  const { data, error } = await supabase.from("uploads").select("url").limit(100)

  if (error || !data || data.length === 0) {
    return NextResponse.json({ error: "No uploads found" }, { status: 404 })
  }

  // Pick a random one from the results
  const randomUpload = data[Math.floor(Math.random() * data.length)]

  return NextResponse.json({ url: randomUpload.url })
}
