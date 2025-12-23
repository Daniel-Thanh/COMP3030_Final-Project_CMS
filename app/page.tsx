import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardOverview } from "@/components/dashboard-overview"
import { ClubsManagement } from "@/components/clubs-management"
import { EventsManagement } from "@/components/events-management"
import { BudgetsManagement } from "@/components/budgets-management"
import { MembershipsManagement } from "@/components/memberships-management"
import { AdvisorsManagement } from "@/components/advisors-management"
import { Users, CalendarDays, DollarSign, School, UserCheck } from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">SAM Dashboard</h1>
              <p className="text-sm text-muted-foreground">Student Activity Management System</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">SAM Role</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
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
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="clubs" className="space-y-4">
            <ClubsManagement />
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <EventsManagement />
          </TabsContent>

          <TabsContent value="budgets" className="space-y-4">
            <BudgetsManagement />
          </TabsContent>

          <TabsContent value="memberships" className="space-y-4">
            <MembershipsManagement />
          </TabsContent>

          <TabsContent value="advisors" className="space-y-4">
            <AdvisorsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
