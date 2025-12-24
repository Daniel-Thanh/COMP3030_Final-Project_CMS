import { NextResponse } from "next/server"

const API_BASE = "http://localhost/sam-club/api"

export async function GET() {
  const res = await fetch(`${API_BASE}/auth/me.php`, {
    credentials: "include",
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
