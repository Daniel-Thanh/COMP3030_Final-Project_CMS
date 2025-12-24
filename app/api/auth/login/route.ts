import { NextResponse } from "next/server"

const API_BASE = "http://localhost/sam-club/api"

export async function POST(req: Request) {
  const body = await req.json()

  const res = await fetch(`${API_BASE}/auth/login.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
