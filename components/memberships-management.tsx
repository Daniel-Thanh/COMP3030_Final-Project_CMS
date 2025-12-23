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
import { Label } from "@/components/ui/label"
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

type Club = {
  club_id: number
  club_name: string
}

type Student = {
  student_id: number
  full_name: string
  student_code: string
}

type Membership = {
  membership_id: number
  club_id: number
  club_name: string
  student_name: string
  student_code: string
  role: string
  membership_status: string
}

/* ======================
   Component
====================== */

export function MembershipsManagement() {
  const { toast } = useToast()

  const [clubs, setClubs] = useState<Club[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [memberships, setMemberships] = useState<Membership[]>([])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loadingMemberships, setLoadingMemberships] = useState(true)

  const [formData, setFormData] = useState({
    club_id: "",
    student_id: "",
    role: "Member",
  })

  /* ======================
     Fetch data
  ====================== */

  useEffect(() => {
    fetchClubs()
    fetchStudents()
    fetchMemberships()
  }, [])

  const fetchClubs = async () => {
    try {
      const res = await fetch("/api/clubs")
      const data = await res.json()
      setClubs(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error("Error fetching clubs:", e)
    }
  }

  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/students")
      const data = await res.json()
      setStudents(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error("Error fetching students:", e)
    }
  }

  const fetchMemberships = async () => {
    try {
      const res = await fetch("/api/memberships", { cache: "no-store" })
      const data = await res.json()
      setMemberships(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error("Error fetching memberships:", e)
    } finally {
      setLoadingMemberships(false)
    }
  }

  /* ======================
     Handlers
  ====================== */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.club_id || !formData.student_id) {
      toast({
        title: "Validation Error",
        description: "Please select both a club and a student",
        variant: "destructive",
      })
      return
    }

    try {
      const res = await fetch("/api/memberships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          join_date: new Date().toISOString().split("T")[0],
        }),
      })

      const result = await res.json()

      if (!result.success && result.error) {
        throw new Error(result.error)
      }

      toast({
        title: "Success",
        description: "Member added successfully",
      })

      setIsDialogOpen(false)
      resetForm()
      fetchMemberships()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add member",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      club_id: "",
      student_id: "",
      role: "Member",
    })
  }

  /* ======================
     Group memberships by club
  ====================== */

  const membershipsByClub = memberships.reduce<Record<string, Membership[]>>(
    (acc, m) => {
      acc[m.club_name] = acc[m.club_name] || []
      acc[m.club_name].push(m)
      return acc
    },
    {}
  )

  /* ======================
     Render
  ====================== */

  return (
    <div className="space-y-6">
      {/* Header + Add Member */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Memberships Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage club memberships
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
              Add Member
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Club Member</DialogTitle>
              <DialogDescription>
                Assign a student to a club
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
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

                <div className="space-y-2">
                  <Label>Student</Label>
                  <Select
                    value={formData.student_id}
                    onValueChange={(value) =>
                      setFormData({ ...formData, student_id: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((s) => (
                        <SelectItem
                          key={s.student_id}
                          value={s.student_id.toString()}
                        >
                          {s.full_name} ({s.student_code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Member">Member</SelectItem>
                      <SelectItem value="Officer">Officer</SelectItem>
                      <SelectItem value="President">President</SelectItem>
                      <SelectItem value="Vice President">
                        Vice President
                      </SelectItem>
                      <SelectItem value="Secretary">Secretary</SelectItem>
                      <SelectItem value="Treasurer">Treasurer</SelectItem>
                    </SelectContent>
                  </Select>
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
                <Button type="submit">Add Member</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* View Members by Club */}
      <Card>
        <CardHeader>
          <CardTitle>Members by Club</CardTitle>
          <CardDescription>
            View students assigned to each club
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingMemberships ? (
            <div className="text-center py-6 text-muted-foreground">
              Loading memberships...
            </div>
          ) : Object.keys(membershipsByClub).length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No memberships found
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(membershipsByClub).map(
                ([clubName, members]) => (
                  <div key={clubName}>
                    <h3 className="font-semibold mb-2">{clubName}</h3>
                    <div className="space-y-1">
                      {members.map((m) => (
                        <div
                          key={m.membership_id}
                          className="flex justify-between text-sm border-b pb-1 last:border-0"
                        >
                          <span>
                            {m.student_name} ({m.student_code})
                          </span>
                          <span className="text-muted-foreground">
                            {m.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
