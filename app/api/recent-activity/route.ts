import { NextResponse } from "next/server"

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost/sam-club/api"

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/recent_activity.php`, {
      cache: "no-store",
    })

    if (!res.ok) throw new Error("Failed to load recent activity")

    const data = await res.json()
    return NextResponse.json(Array.isArray(data) ? data : [])
  } catch (error) {
    console.error("[recent activity]", error)
    return NextResponse.json([])
  }
}
