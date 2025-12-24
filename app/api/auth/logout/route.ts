import { NextResponse } from "next/server"

const API_BASE = "http://localhost/sam-club/api"

export async function POST() {
  await fetch(`${API_BASE}/auth/logout.php`, {
    method: "POST",
    credentials: "include",
  })

  return NextResponse.json({ success: true })
}
