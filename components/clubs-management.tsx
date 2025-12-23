"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Club {
  club_id: number
  club_name: string
  category: string
  description: string
  email: string
  status: string
  date_established: string
}

export function ClubsManagement() {
  const [clubs, setClubs] = useState<Club[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingClub, setEditingClub] = useState<Club | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    club_name: "",
    category: "",
    description: "",
    email: "",
    status: "Active",
    date_established: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    fetchClubs()
  }, [])

  const fetchClubs = async () => {
    try {
      const response = await fetch("/api/clubs")
      if (!response.ok) throw new Error("Failed to fetch clubs")
      const data = await response.json()
      setClubs(data)
    } catch (error) {
      console.error("[v0] Error fetching clubs:", error)
      toast({ title: "Error", description: "Failed to load clubs", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingClub ? `/api/clubs?id=${editingClub.club_id}` : "/api/clubs"

      const response = await fetch(url, {
        method: editingClub ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to save club")

      toast({ title: "Success", description: `Club ${editingClub ? "updated" : "created"} successfully` })
      setIsDialogOpen(false)
      resetForm()
      fetchClubs()
    } catch (error) {
      console.error("[v0] Error saving club:", error)
      toast({ title: "Error", description: "Failed to save club", variant: "destructive" })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this club?")) return

    try {
      const response = await fetch(`/api/clubs?id=${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete club")

      toast({ title: "Success", description: "Club deleted successfully" })
      fetchClubs()
    } catch (error) {
      console.error("[v0] Error deleting club:", error)
      toast({ title: "Error", description: "Failed to delete club", variant: "destructive" })
    }
  }

  const handleEdit = (club: Club) => {
    setEditingClub(club)
    setFormData({
      club_name: club.club_name,
      category: club.category,
      description: club.description,
      email: club.email,
      status: club.status,
      date_established: club.date_established,
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      club_name: "",
      category: "",
      description: "",
      email: "",
      status: "Active",
      date_established: new Date().toISOString().split("T")[0],
    })
    setEditingClub(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Clubs Management</h2>
          <p className="text-muted-foreground mt-1">Manage all student organizations</p>
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
              Add Club
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingClub ? "Edit Club" : "Add New Club"}</DialogTitle>
              <DialogDescription>
                {editingClub ? "Update club information" : "Create a new student organization"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="club_name">Club Name</Label>
                  <Input
                    id="club_name"
                    value={formData.club_name}
                    onChange={(e) => setFormData({ ...formData, club_name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Academic, Sports, Arts"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="club@university.edu"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date_established">Date Established</Label>
                    <Input
                      id="date_established"
                      type="date"
                      value={formData.date_established}
                      onChange={(e) => setFormData({ ...formData, date_established: e.target.value })}
                    />
                  </div>
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
                <Button type="submit">{editingClub ? "Update" : "Create"} Club</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Clubs</CardTitle>
          <CardDescription>View and manage all registered clubs</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading clubs...</div>
          ) : clubs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No clubs found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Club Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Established</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clubs.map((club) => (
                  <TableRow key={club.club_id}>
                    <TableCell className="font-medium">{club.club_name}</TableCell>
                    <TableCell>{club.category || "-"}</TableCell>
                    <TableCell>{club.email || "-"}</TableCell>
                    <TableCell className="max-w-xs truncate">{club.description}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          club.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {club.status}
                      </span>
                    </TableCell>
                    <TableCell>{club.date_established}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(club)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(club.club_id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
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
