import { NextRequest, NextResponse } from "next/server"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost/sam-club/api"

export async function GET(req: NextRequest) {
  const eventId = req.nextUrl.searchParams.get("event_id")
  const res = await fetch(`${API_BASE}/event_participants.php?event_id=${eventId}`)
  return NextResponse.json(await res.json())
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const res = await fetch(`${API_BASE}/event_participants.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  return NextResponse.json(await res.json())
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const res = await fetch(`${API_BASE}/event_participants.php`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  return NextResponse.json(await res.json())
}

export async function DELETE(req: NextRequest) {
  const { event_id, student_id } = await req.json()
  const res = await fetch(
    `${API_BASE}/event_participants.php?event_id=${event_id}&student_id=${student_id}`,
    { method: "DELETE" }
  )
  return NextResponse.json(await res.json())
}
