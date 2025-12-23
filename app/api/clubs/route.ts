import { type NextRequest, NextResponse } from "next/server"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost/sam-club/api"

export async function GET() {
  try {
    console.log("[v0] Fetching clubs from:", `${API_BASE}/clubs.php`)

    const response = await fetch(`${API_BASE}/clubs.php`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      console.log("[v0] PHP backend not available, response status:", response.status)
      // Return mock data if PHP backend is not available (for preview)
      return NextResponse.json([
        {
          club_id: 1,
          club_name: "Computer Science Club",
          category: "Academic",
          description: "A community for students passionate about programming",
          email: "cs.club@university.edu",
          status: "Active",
          date_established: "2020-09-01",
        },
        {
          club_id: 2,
          club_name: "Drama Society",
          category: "Arts",
          description: "Performing arts and theater production",
          email: "drama@university.edu",
          status: "Active",
          date_established: "2018-08-15",
        },
      ])
    }

    const data = await response.json()
    console.log("[v0] Successfully fetched", data.length, "clubs")
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Clubs API error:", error)
    // Return mock data on error (for preview environment)
    return NextResponse.json([
      {
        club_id: 1,
        club_name: "Computer Science Club",
        category: "Academic",
        description: "A community for students passionate about programming",
        email: "cs.club@university.edu",
        status: "Active",
        date_established: "2020-09-01",
      },
    ])
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const response = await fetch(`${API_BASE}/clubs.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Clubs API error:", error)
    return NextResponse.json({ error: "Failed to create club" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const body = await request.json()

    const response = await fetch(`${API_BASE}/clubs.php?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Clubs API error:", error)
    return NextResponse.json({ error: "Failed to update club" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    const response = await fetch(`${API_BASE}/clubs.php?id=${id}`, {
      method: "DELETE",
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Clubs API error:", error)
    return NextResponse.json({ error: "Failed to delete club" }, { status: 500 })
  }
}
