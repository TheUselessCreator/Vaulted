import { createClient } from "@/lib/supabase/client"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q") || ""
  const sortBy = searchParams.get("sortBy") || "created_at"
  const order = searchParams.get("order") || "desc"

  const supabase = createClient()

  let supabaseQuery = supabase.from("uploads").select("*")

  // Search by name or description if query exists
  if (query.trim()) {
    supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%`)
  }

  // Apply sorting
  supabaseQuery = supabaseQuery.order(sortBy, { ascending: order === "asc" })

  const { data, error } = await supabaseQuery

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}
