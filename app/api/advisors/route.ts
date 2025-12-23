import { NextResponse } from "next/server"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost/sam-club/api"

const MOCK_ADVISORS = [
  {
    advisor_id: 1,
    full_name: "Dr. John Smith",
    email: "john.smith@university.edu",
    phone: "555-0101",
    department: "Computer Science",
  },
  {
    advisor_id: 2,
    full_name: "Prof. Emily Johnson",
    email: "emily.johnson@university.edu",
    phone: "555-0102",
    department: "Theater Arts",
  },
  {
    advisor_id: 3,
    full_name: "Dr. Michael Brown",
    email: "michael.brown@university.edu",
    phone: "555-0103",
    department: "Environmental Science",
  },
]

export async function GET() {
  try {
    const response = await fetch(`${API_BASE}/advisors.php`, {
      cache: "no-store",
    })

    if (!response.ok) throw new Error("Backend not available")

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(MOCK_ADVISORS)
  }
}
