import { NextResponse } from "next/server"

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost/sam-club/api"

export async function GET() {
  const res = await fetch(`${API_BASE}/recent_activity.php`, {
    cache: "no-store",
  })

  const data = await res.json()
  return NextResponse.json(data)
}
