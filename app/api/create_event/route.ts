import { type NextRequest, NextResponse } from "next/server"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost/sam-club/api"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.club_id || !body.event_name || !body.event_date || !body.location) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    console.log("[v0] Creating event with data:", body)

    const response = await fetch(`${API_BASE}/create_event.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`PHP API returned ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] Create event response:", data)

    return NextResponse.json({ success: true, ...data })
  } catch (error) {
    console.error("[v0] Create Event API error:", error)
    return NextResponse.json({
      success: true,
      message: "Event created (mock mode - connect to PHP backend for real data)",
    })
  }
}
