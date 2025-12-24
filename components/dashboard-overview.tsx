"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CalendarCheck, DollarSign, TrendingUp } from "lucide-react"

/* =======================
   Types
======================= */

type DashboardStats = {
  totalClubs: number
  pendingEvents: number
  totalBudget: number
  activeMembers: number
}

type Activity = {
  club_name: string | null
  activity_text: string
  action_time: string
}

/* =======================
   Component
======================= */

export function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalClubs: 0,
    pendingEvents: 0,
    totalBudget: 0,
    activeMembers: 0,
  })

  const [activities, setActivities] = useState<Activity[]>([])
  const [loadingStats, setLoadingStats] = useState(true)
  const [loadingActivity, setLoadingActivity] = useState(true)

  /* =======================
     Fetch dashboard stats
  ======================= */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard", { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to fetch dashboard stats")
        const data = await res.json()
        setStats(data)
      } catch (error) {
        console.error("Dashboard stats error:", error)
      } finally {
        setLoadingStats(false)
      }
    }

    fetchStats()
  }, [])

  /* =======================
     Fetch recent activity
     (AUDIT LOG)
  ======================= */
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch("/api/recent-activity", { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to fetch recent activity")
        const data = await res.json()
        setActivities(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Recent activity error:", error)
      } finally {
        setLoadingActivity(false)
      }
    }

    fetchActivity()
  }, [])

  /* =======================
     Stat cards
  ======================= */
  const statCards = [
    {
      title: "Total Clubs",
      value: stats.totalClubs,
      icon: Users,
      description: "Active student organizations",
    },
    {
      title: "Pending Events",
      value: stats.pendingEvents,
      icon: CalendarCheck,
      description: "Awaiting approval",
    },
    {
      title: "Total Budget",
      value: `$${stats.totalBudget.toLocaleString()}`,
      icon: DollarSign,
      description: "Allocated across all clubs",
    },
    {
      title: "Active Members",
      value: stats.activeMembers,
      icon: TrendingUp,
      description: "Across all clubs",
    },
  ]

  /* =======================
     Render
  ======================= */
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground mt-1">
          Monitor student activities at a glance
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loadingStats ? "—" : stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Lower section */}
      <div className="grid gap-4 md:grid-cols-2 mt-6">
        {/* Recent Activity (AUDIT LOG) */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingActivity ? (
              <p className="text-sm text-muted-foreground">
                Loading activity...
              </p>
            ) : activities.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No recent activity
              </p>
            ) : (
              <div className="space-y-3">
                {activities.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between border-b border-border pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-sm">
                        {activity.club_name ?? "System"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.activity_text}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(activity.action_time).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Active Clubs
                </span>
                <span className="text-sm font-medium">
                  {stats.totalClubs}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Pending Events
                </span>
                <span className="text-sm font-medium">
                  {stats.pendingEvents}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Avg Members / Club
                </span>
                <span className="text-sm font-medium">
                  {stats.totalClubs > 0
                    ? (stats.activeMembers / stats.totalClubs).toFixed(1)
                    : "0"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
