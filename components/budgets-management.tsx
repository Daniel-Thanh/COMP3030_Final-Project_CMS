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
import { Plus, Receipt } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Budget {
  budget_id: number
  club_id: number
  club_name: string
  fiscal_year: string
  allocated_amount: number
  total_expenses?: number
}

interface Expense {
  expense_id: number
  budget_id: number
  category: string
  amount: number
  expense_date: string
  description: string
}

export function BudgetsManagement() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [clubs, setClubs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false)
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState<number | null>(null)
  const { toast } = useToast()

  const [budgetFormData, setBudgetFormData] = useState({
    club_id: "",
    year: new Date().getFullYear().toString(),
    amount: "",
  })

  const [expenseFormData, setExpenseFormData] = useState({
    budget_id: "",
    category: "",
    amount: "",
    expense_date: new Date().toISOString().split("T")[0],
    description: "",
  })

  useEffect(() => {
    fetchBudgets()
    fetchClubs()
  }, [])

  const fetchBudgets = async () => {
    try {
      const response = await fetch("/api/budgets")
      if (!response.ok) throw new Error("Failed to fetch budgets")
      const data = await response.json()
      setBudgets(data)
    } catch (error) {
      console.error("[v0] Error fetching budgets:", error)
      toast({ title: "Error", description: "Failed to load budgets", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchClubs = async () => {
    try {
      const response = await fetch("/api/clubs")
      if (!response.ok) throw new Error("Failed to fetch clubs")
      const data = await response.json()
      setClubs(data)
    } catch (error) {
      console.error("[v0] Error fetching clubs:", error)
    }
  }

  const handleBudgetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          club_id: budgetFormData.club_id,
          fiscal_year: budgetFormData.year,
          allocated_amount: budgetFormData.amount,
        }),
      })

      if (!response.ok) throw new Error("Failed to create budget")

      toast({ title: "Success", description: "Budget created successfully" })
      setIsBudgetDialogOpen(false)
      resetBudgetForm()
      fetchBudgets()
    } catch (error) {
      console.error("[v0] Error creating budget:", error)
      toast({ title: "Error", description: "Failed to create budget", variant: "destructive" })
    }
  }

  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseFormData),
      })

      if (!response.ok) throw new Error("Failed to add expense")

      toast({ title: "Success", description: "Expense added successfully" })
      setIsExpenseDialogOpen(false)
      resetExpenseForm()
      fetchBudgets()
    } catch (error) {
      console.error("[v0] Error adding expense:", error)
      toast({ title: "Error", description: "Failed to add expense", variant: "destructive" })
    }
  }

  const resetBudgetForm = () => {
    setBudgetFormData({
      club_id: "",
      year: new Date().getFullYear().toString(),
      amount: "",
    })
  }

  const resetExpenseForm = () => {
    setExpenseFormData({
      budget_id: "",
      category: "",
      amount: "",
      expense_date: new Date().toISOString().split("T")[0],
      description: "",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Budgets Management</h2>
          <p className="text-muted-foreground mt-1">Track club budgets and expenses</p>
        </div>
        <div className="flex gap-2">
          <Dialog
            open={isBudgetDialogOpen}
            onOpenChange={(open) => {
              setIsBudgetDialogOpen(open)
              if (!open) resetBudgetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Budget
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Budget</DialogTitle>
                <DialogDescription>Allocate budget for a club</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleBudgetSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="club_id">Club</Label>
                    <Select
                      value={budgetFormData.club_id}
                      onValueChange={(value) => setBudgetFormData({ ...budgetFormData, club_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a club" />
                      </SelectTrigger>
                      <SelectContent>
                        {clubs.map((club) => (
                          <SelectItem key={club.club_id} value={club.club_id.toString()}>
                            {club.club_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Fiscal Year</Label>
                    <Input
                      id="year"
                      type="number"
                      value={budgetFormData.year}
                      onChange={(e) => setBudgetFormData({ ...budgetFormData, year: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Allocated Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={budgetFormData.amount}
                      onChange={(e) => setBudgetFormData({ ...budgetFormData, amount: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsBudgetDialogOpen(false)
                      resetBudgetForm()
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Budget</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isExpenseDialogOpen}
            onOpenChange={(open) => {
              setIsExpenseDialogOpen(open)
              if (!open) resetExpenseForm()
            }}
          >
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Receipt className="h-4 w-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Expense</DialogTitle>
                <DialogDescription>Record a club expense</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleExpenseSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget_id">Budget</Label>
                    <Select
                      value={expenseFormData.budget_id}
                      onValueChange={(value) => setExpenseFormData({ ...expenseFormData, budget_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a budget" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgets.map((budget) => (
                          <SelectItem key={budget.budget_id} value={budget.budget_id.toString()}>
                            {budget.club_name} - {budget.fiscal_year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={expenseFormData.category}
                      onChange={(e) => setExpenseFormData({ ...expenseFormData, category: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expense_amount">Amount</Label>
                    <Input
                      id="expense_amount"
                      type="number"
                      step="0.01"
                      value={expenseFormData.amount}
                      onChange={(e) => setExpenseFormData({ ...expenseFormData, amount: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expense_date">Expense Date</Label>
                    <Input
                      id="expense_date"
                      type="date"
                      value={expenseFormData.expense_date}
                      onChange={(e) => setExpenseFormData({ ...expenseFormData, expense_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={expenseFormData.description}
                      onChange={(e) => setExpenseFormData({ ...expenseFormData, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsExpenseDialogOpen(false)
                      resetExpenseForm()
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Expense</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Club Budgets</CardTitle>
          <CardDescription>View budget allocations and spending</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading budgets...</div>
          ) : budgets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No budgets found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Club</TableHead>
                  <TableHead>Fiscal Year</TableHead>
                  <TableHead>Allocated</TableHead>
                  <TableHead>Spent</TableHead>
                  <TableHead>Remaining</TableHead>
                  <TableHead>Usage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgets.map((budget) => {
                  const totalExpenses = budget.total_expenses || 0
                  const remaining = budget.allocated_amount - totalExpenses
                  const usagePercent = (totalExpenses / budget.allocated_amount) * 100
                  return (
                    <TableRow key={budget.budget_id}>
                      <TableCell className="font-medium">{budget.club_name}</TableCell>
                      <TableCell>{budget.fiscal_year}</TableCell>
                      <TableCell>${budget.allocated_amount.toLocaleString()}</TableCell>
                      <TableCell>${totalExpenses.toLocaleString()}</TableCell>
                      <TableCell>${remaining.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full ${usagePercent > 90 ? "bg-red-500" : usagePercent > 75 ? "bg-yellow-500" : "bg-green-500"}`}
                              style={{ width: `${Math.min(usagePercent, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-12">{usagePercent.toFixed(0)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
