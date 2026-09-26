import { Header } from "@/components/layout"
import { Button } from "@/components/ui"
import { DeleteExpenseDialog } from "@/features/expenses"
import { useIsMobile } from "@/hooks"

import { createFileRoute } from "@tanstack/react-router"
import { Trash2 } from "lucide-react"

export const Route = createFileRoute("/__app/expenses/$expenseId/")({
  component: RouteComponent,
  loader: () => ({ crumb: "Test Expense" }),
})

function RouteComponent() {
  const isMobile = useIsMobile()
  return (
    <div className="flex flex-col gap-2">
      <Header>
        <DeleteExpenseDialog id="1">
          <Button variant="destructive" size={isMobile ? "icon" : "default"}>
            <Trash2 />
            <span className="hidden md:inline">Delete</span>
          </Button>
        </DeleteExpenseDialog>
      </Header>
    </div>
  )
}
