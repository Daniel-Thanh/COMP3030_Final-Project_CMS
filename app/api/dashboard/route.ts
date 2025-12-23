import { NextResponse } from "next/server"

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost/sam-club/api"

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/dashboard_stats.php`, {
      cache: "no-store",
    })

    if (!res.ok) throw new Error("PHP dashboard failed")

    const data = await res.json()

    return NextResponse.json({
      totalClubs: Number(data.totalClubs || 0),
      pendingEvents: Number(data.pendingEvents || 0),
      totalBudget: Number(data.totalBudget || 0),
      activeMembers: Number(data.activeMembers || 0),
    })
  } catch (error) {
    console.error("[dashboard API]", error)

    // UI-safe fallback (NO CRASH)
    return NextResponse.json({
      totalClubs: 0,
      pendingEvents: 0,
      totalBudget: 0,
      activeMembers: 0,
    })
  }
}
