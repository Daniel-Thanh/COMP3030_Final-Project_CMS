/**Import { type NextRequest, NextResponse } from "next/server"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost/sam-club/api"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const response = await fetch(`${API_BASE}/club_advisors.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Club Advisors API error:", error)
    return NextResponse.json({ error: "Failed to assign advisor" }, { status: 500 })
  }
}
**/


import { type NextRequest, NextResponse } from "next/server"

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost/sam-club/api"

export async function GET() {
  try {
    const response = await fetch(`${API_BASE}/club_advisors.php`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch club advisors")
    }

    const data = await response.json()
    return NextResponse.json(Array.isArray(data) ? data : [])
  } catch (error) {
    console.error("[v0] Club Advisors API error:", error)
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const response = await fetch(`${API_BASE}/club_advisors.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Club Advisors API error:", error)
    return NextResponse.json(
      { error: "Failed to assign advisor" },
      { status: 500 }
    )
  }
}
