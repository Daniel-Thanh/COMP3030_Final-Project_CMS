"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableRow, TableCell, TableHeader, TableBody } from "@/components/ui/table"

export function ReportsManagement() {
  const [memberships, setMemberships] = useState<any[]>([])
  const [clubs, setClubs] = useState<any[]>([])
  const [expenses, setExpenses] = useState<any[]>([])
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/reports?type=memberships").then(r => r.json()).then(setMemberships)
    fetch("/api/reports?type=club-summary").then(r => r.json()).then(setClubs)
    fetch("/api/reports?type=expenses").then(r => r.json()).then(setExpenses)
    fetch("/api/reports?type=activity-log").then(r => r.json()).then(setLogs)
  }, [])

  return (
    <div className="space-y-6">

      <Card>
        <CardHeader><CardTitle>Monthly Memberships (VIEW)</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {memberships.map((m, i) => (
                <TableRow key={i}>
                  <TableCell>{m.year}-{m.month}</TableCell>
                  <TableCell>{m.total_members}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Club Summary (Number of members/Events)</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {clubs.map((c, i) => (
                <TableRow key={i}>
                  <TableCell>{c.club_name}</TableCell>
                  <TableCell>{c.total_members}</TableCell>
                  <TableCell>{c.total_events}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Monthly Expenses</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {expenses.map((e, i) => (
                <TableRow key={i}>
                  <TableCell>{e.year}-{e.month}</TableCell>
                  <TableCell>{e.total_expenses}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Audit Log</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {logs.map((l, i) => (
                <TableRow key={i}>
                  <TableCell>{l.action}</TableCell>
                  <TableCell>{l.table_name}</TableCell>
                  <TableCell>{l.action_time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  )
}
