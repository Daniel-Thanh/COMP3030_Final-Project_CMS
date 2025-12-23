import { type NextRequest, NextResponse } from "next/server"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost/sam-club/api"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const response = await fetch(`${API_BASE}/approve_event.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Approve Event API error:", error)
    return NextResponse.json({ error: "Failed to approve event" }, { status: 500 })
  }
}
