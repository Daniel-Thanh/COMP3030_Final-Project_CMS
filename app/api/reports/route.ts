import { NextResponse } from "next/server"

const API_BASE = "http://localhost/sam-club/api"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get("type")

  const res = await fetch(`${API_BASE}/reports.php?type=${type}`, {
    cache: "no-store",
  })

  const data = await res.json()
  return NextResponse.json(data)
}
