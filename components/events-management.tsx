"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

/* ================= TYPES ================= */

interface Event {
  event_id: number
  club_id: number
  club_name: string
  event_name: string
  event_date: string
  location: string
  status: string
}

interface Student {
  student_id: number
  student_code: string
  full_name: string
}

interface Participant {
  student_id: number
  student_name: string
  participation_status: string
}

/* ================= COMPONENT ================= */

export function EventsManagement() {
  const { toast } = useToast()

  const [events, setEvents] = useState<Event[]>([])
  const [clubs, setClubs] = useState<any[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [participants, setParticipants] = useState<Participant[]>([])

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedStudentId, setSelectedStudentId] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false)

  const [formData, setFormData] = useState({
    club_id: "",
    event_name: "",
    event_date: "",
    location: "",
  })

  /* ================= FETCH BASE DATA ================= */

  useEffect(() => {
    fetchEvents()
    fetchClubs()
    fetchStudents()
  }, [])

  const fetchEvents = async () => {
    const res = await fetch("/api/events")
    setEvents(await res.json())
  }

  const fetchClubs = async () => {
    const res = await fetch("/api/clubs")
    setClubs(await res.json())
  }

  const fetchStudents = async () => {
    const res = await fetch("/api/students")
    setStudents(await res.json())
  }

  const fetchParticipants = async (eventId: number) => {
    const res = await fetch(`/api/event-participants?event_id=${eventId}`)
    setParticipants(await res.json())
  }

  /* ================= EVENT CRUD ================= */

  const createEvent = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/create_event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    const data = await res.json()
    if (!data.success) {
      toast({ title: "Error", description: data.error, variant: "destructive" })
      return
    }

    toast({ title: "Event created successfully" })
    setIsCreateOpen(false)
    setFormData({ club_id: "", event_name: "", event_date: "", location: "" })
    fetchEvents()
  }

  const updateStatus = async (eventId: number, status: string) => {
    await fetch("/api/approve_event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: eventId, status }),
    })
    toast({ title: `Event ${status.toLowerCase()}` })
    fetchEvents()
  }

  /* ================= PARTICIPANTS ================= */

  const addParticipant = async () => {
    if (!selectedEvent || !selectedStudentId) return

    const res = await fetch("/api/event-participants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_id: selectedEvent.event_id,
        student_id: selectedStudentId,
      }),
    })

    const data = await res.json()
    if (!data.success) {
      toast({
        title: "Error",
        description: data.error,
        variant: "destructive",
      })
      return
    }

    toast({ title: "Student registered" })
    setSelectedStudentId("")
    fetchParticipants(selectedEvent.event_id)
  }

  /* ================= UI ================= */

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-bold">Events Management</h2>
          <p className="text-muted-foreground">Create, approve & manage events</p>
        </div>

        {/* CREATE EVENT */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="h-4 w-4 mr-1" /> Create Event
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={createEvent} className="space-y-3">
              <Select
                value={formData.club_id}
                onValueChange={(v) => setFormData({ ...formData, club_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select club" />
                </SelectTrigger>
                <SelectContent>
                  {clubs.map((c) => (
                    <SelectItem key={c.club_id} value={c.club_id.toString()}>
                      {c.club_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Event name"
                value={formData.event_name}
                onChange={(e) =>
                  setFormData({ ...formData, event_name: e.target.value })
                }
              />

              <Input
                type="date"
                value={formData.event_date}
                onChange={(e) =>
                  setFormData({ ...formData, event_date: e.target.value })
                }
              />

              <Input
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />

              <Button type="submit">Create</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* EVENTS TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardDescription>Approve & manage participants</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Club</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((e) => (
                <TableRow key={e.event_id}>
                  <TableCell>{e.event_name}</TableCell>
                  <TableCell>{e.club_name}</TableCell>
                  <TableCell>{e.event_date}</TableCell>
                  <TableCell>{e.status}</TableCell>
                  <TableCell className="text-right space-x-2">
                    {e.status === "Pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateStatus(e.event_id, "Approved")}
                        >
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateStatus(e.event_id, "Rejected")}
                        >
                          <XCircle className="h-4 w-4 text-red-600" />
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedEvent(e)
                        fetchParticipants(e.event_id)
                        setIsParticipantsOpen(true)
                      }}
                    >
                      Participants
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* PARTICIPANTS MODAL */}
      <Dialog open={isParticipantsOpen} onOpenChange={setIsParticipantsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Participants — {selectedEvent?.event_name}
            </DialogTitle>
          </DialogHeader>

          <div className="flex gap-2 mb-4">
            <Select
              value={selectedStudentId}
              onValueChange={setSelectedStudentId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select student" />
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
            <Button onClick={addParticipant}>Add</Button>
          </div>

          {participants.length === 0 ? (
            <p className="text-sm text-muted-foreground">No participants</p>
          ) : (
            participants.map((p) => (
              <div
                key={p.student_id}
                className="flex justify-between border-b pb-2"
              >
                <span>{p.student_name}</span>
                <span className="text-xs">{p.participation_status}</span>
              </div>
            ))
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
