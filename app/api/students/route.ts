import { NextResponse } from "next/server"

const PHP_API_BASE = "http://localhost/sam-club/api"

const MOCK_STUDENTS = [
  {
    student_id: 1,
    full_name: "Alice Anderson",
    email: "alice.anderson@student.edu",
    student_code: "STU001",
    major: "Computer Science",
    year: "Junior",
  },
  {
    student_id: 2,
    full_name: "Bob Baker",
    email: "bob.baker@student.edu",
    student_code: "STU002",
    major: "Theater Arts",
    year: "Sophomore",
  },
  {
    student_id: 3,
    full_name: "Carol Clark",
    email: "carol.clark@student.edu",
    student_code: "STU003",
    major: "Environmental Studies",
    year: "Senior",
  },
]

export async function GET() {
  try {
    const response = await fetch(`${PHP_API_BASE}/students.php`)

    if (!response.ok) throw new Error("Backend not available")

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(MOCK_STUDENTS)
  }
}
