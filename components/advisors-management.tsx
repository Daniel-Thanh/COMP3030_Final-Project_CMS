"use client"

import type React from "react"
import { useEffect, useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

/* ======================
   Types
====================== */

interface Advisor {
  advisor_id: number
  full_name: string
  email: string
  department: string
}

interface Club {
  club_id: number
  club_name: string
}

interface ClubAdvisor {
  assignment_id: number
  club_name: string
  advisor_name: string
  start_date: string
  end_date: string | null
}

/* ======================
   Component
====================== */

export function AdvisorsManagement() {
  const { toast } = useToast()

  const [advisors, setAdvisors] = useState<Advisor[]>([])
  const [clubs, setClubs] = useState<Club[]>([])
  const [clubAdvisors, setClubAdvisors] = useState<ClubAdvisor[]>([])

  const [isLoadingAdvisors, setIsLoadingAdvisors] = useState(true)
  const [isLoadingAssignments, setIsLoadingAssignments] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    club_id: "",
    advisor_id: "",
    start_date: new Date().toISOString().split("T")[0],
    end_date: "",
  })

  /* ======================
     Fetch data
  ====================== */

  useEffect(() => {
    fetchAdvisors()
    fetchClubs()
    fetchAssignments()
  }, [])

  const fetchAdvisors = async () => {
    try {
      const res = await fetch("/api/advisors")
      if (!res.ok) throw new Error("Failed to fetch advisors")
      const data = await res.json()
      setAdvisors(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching advisors:", error)
      toast({
        title: "Error",
        description: "Failed to load advisors",
        variant: "destructive",
      })
    } finally {
      setIsLoadingAdvisors(false)
    }
  }

  const fetchClubs = async () => {
    try {
      const res = await fetch("/api/clubs")
      if (!res.ok) throw new Error("Failed to fetch clubs")
      const data = await res.json()
      setClubs(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching clubs:", error)
    }
  }

  const fetchAssignments = async () => {
    try {
      const res = await fetch("/api/club_advisors", { cache: "no-store" })
      const data = await res.json()
      setClubAdvisors(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching advisor assignments:", error)
    } finally {
      setIsLoadingAssignments(false)
    }
  }

  /* ======================
     Handlers
  ====================== */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.club_id || !formData.advisor_id) {
      toast({
        title: "Validation Error",
        description: "Please select both a club and an advisor",
        variant: "destructive",
      })
      return
    }

    try {
      const res = await fetch("/api/club_advisors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          end_date: formData.end_date || null,
        }),
      })

      if (!res.ok) throw new Error("Failed to assign advisor")

      toast({
        title: "Success",
        description: "Advisor assigned successfully",
      })

      setIsDialogOpen(false)
      resetForm()
      fetchAssignments()
    } catch (error) {
      console.error("Error assigning advisor:", error)
      toast({
        title: "Error",
        description: "Failed to assign advisor",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      club_id: "",
      advisor_id: "",
      start_date: new Date().toISOString().split("T")[0],
      end_date: "",
    })
  }

  /* ======================
     Render
  ====================== */

  return (
    <div className="space-y-6">
      {/* Header + Assign */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Advisors Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage advisors and their club assignments
          </p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Assign Advisor
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Advisor to Club</DialogTitle>
              <DialogDescription>
                Link an advisor with a club
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                {/* Club */}
                <div className="space-y-2">
                  <Label>Club</Label>
                  <Select
                    value={formData.club_id}
                    onValueChange={(value) =>
                      setFormData({ ...formData, club_id: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a club" />
                    </SelectTrigger>
                    <SelectContent>
                      {clubs.map((club) => (
                        <SelectItem
                          key={club.club_id}
                          value={club.club_id.toString()}
                        >
                          {club.club_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Advisor */}
                <div className="space-y-2">
                  <Label>Advisor</Label>
                  <Select
                    value={formData.advisor_id}
                    onValueChange={(value) =>
                      setFormData({ ...formData, advisor_id: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an advisor" />
                    </SelectTrigger>
                    <SelectContent>
                      {advisors.map((advisor) => (
                        <SelectItem
                          key={advisor.advisor_id}
                          value={advisor.advisor_id.toString()}
                        >
                          {advisor.full_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Dates */}
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        start_date: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Date (Optional)</Label>
                  <Input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        end_date: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false)
                    resetForm()
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Assign Advisor</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* All Advisors */}
      <Card>
        <CardHeader>
          <CardTitle>All Advisors</CardTitle>
          <CardDescription>
            View all registered advisors
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingAdvisors ? (
            <div className="text-center py-6 text-muted-foreground">
              Loading advisors...
            </div>
          ) : advisors.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No advisors found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {advisors.map((advisor) => (
                  <TableRow key={advisor.advisor_id}>
                    <TableCell>{advisor.advisor_id}</TableCell>
                    <TableCell className="font-medium">
                      {advisor.full_name}
                    </TableCell>
                    <TableCell>{advisor.email || "N/A"}</TableCell>
                    <TableCell>{advisor.department || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Advisor Assignments */}
      <Card>
        <CardHeader>
          <CardTitle>Advisor Assignments</CardTitle>
          <CardDescription>
            Advisors assigned to clubs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingAssignments ? (
            <div className="text-center py-6 text-muted-foreground">
              Loading assignments...
            </div>
          ) : clubAdvisors.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No advisor assignments found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Club</TableHead>
                  <TableHead>Advisor</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clubAdvisors.map((a) => (
                  <TableRow key={a.assignment_id}>
                    <TableCell className="font-medium">
                      {a.club_name}
                    </TableCell>
                    <TableCell>{a.advisor_name}</TableCell>
                    <TableCell>{a.start_date}</TableCell>
                    <TableCell>{a.end_date ?? "Ongoing"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
