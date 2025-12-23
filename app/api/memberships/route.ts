import { type NextRequest, NextResponse } from "next/server"

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost/sam-club/api"

/* ========= GET: view memberships ========= */
export async function GET() {
  try {
    const response = await fetch(`${API_BASE}/memberships.php`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch memberships")
    }

    const data = await response.json()
    return NextResponse.json(Array.isArray(data) ? data : [])
  } catch (error) {
    console.error("[v0] Memberships GET error:", error)
    return NextResponse.json([])
  }
}

/* ========= POST: add membership ========= */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch(`${API_BASE}/memberships.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Memberships POST error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
