import { NextResponse } from "next/server"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost/sam-club/api"

const MOCK_EVENTS = [
  {
    event_id: 1,
    club_id: 1,
    club_name: "Computer Science Club",
    event_name: "Hackathon 2024",
    event_date: "2024-03-15",
    location: "Engineering Building Room 101",
    status: "Approved",
  },
  {
    event_id: 2,
    club_id: 1,
    club_name: "Computer Science Club",
    event_name: "Guest Speaker: AI in Industry",
    event_date: "2024-02-20",
    location: "Auditorium A",
    status: "Pending",
  },
  {
    event_id: 3,
    club_id: 2,
    club_name: "Drama Society",
    event_name: "Spring Musical Auditions",
    event_date: "2024-02-10",
    location: "Theater Main Stage",
    status: "Approved",
  },
]

export async function GET() {
  try {
    const response = await fetch(`${API_BASE}/events.php`, {
      cache: "no-store",
    })

    if (!response.ok) throw new Error("Backend not available")

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(MOCK_EVENTS)
  }
}
