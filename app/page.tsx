"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { DashboardOverview } from "@/components/dashboard-overview"
import { ClubsManagement } from "@/components/clubs-management"
import { EventsManagement } from "@/components/events-management"
import { BudgetsManagement } from "@/components/budgets-management"
import { MembershipsManagement } from "@/components/memberships-management"
import { AdvisorsManagement } from "@/components/advisors-management"
import { ReportsManagement } from "@/components/reports-management"

import {
  Users,
  CalendarDays,
  DollarSign,
  School,
  UserCheck,
  TrendingUp,
} from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      {/* ===== HEADER ===== */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                SAM Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Student Activity Management System
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">SAM Role</p>
            </div>
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          {/* ===== TABS NAV ===== */}
          <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="gap-2">
              <School className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>

            <TabsTrigger value="clubs" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Clubs</span>
            </TabsTrigger>

            <TabsTrigger value="events" className="gap-2">
              <CalendarDays className="h-4 w-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>

            <TabsTrigger value="budgets" className="gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Budgets</span>
            </TabsTrigger>

            <TabsTrigger value="memberships" className="gap-2">
              <UserCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Members</span>
            </TabsTrigger>

            <TabsTrigger value="advisors" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Advisors</span>
            </TabsTrigger>

            <TabsTrigger value="reports" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
          </TabsList>

          {/* ===== TAB CONTENT ===== */}
          <TabsContent value="overview">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="clubs">
            <ClubsManagement />
          </TabsContent>

          <TabsContent value="events">
            <EventsManagement />
          </TabsContent>

          <TabsContent value="budgets">
            <BudgetsManagement />
          </TabsContent>

          <TabsContent value="memberships">
            <MembershipsManagement />
          </TabsContent>

          <TabsContent value="advisors">
            <AdvisorsManagement />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
