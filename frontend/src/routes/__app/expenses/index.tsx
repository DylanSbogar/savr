import { CompactButton } from "@/components/compact-button"
import { Header } from "@/components/layout"
import { CreateExpenseDialog } from "@/features/expenses"
import { createFileRoute } from "@tanstack/react-router"
import { Plus } from "lucide-react"
import { useTitle } from "react-use"

export const Route = createFileRoute("/__app/expenses/")({
  component: RouteComponent,
})

function RouteComponent() {
  useTitle("Expenses | SAVR")
  return (
    <div>
      <Header>
        <CreateExpenseDialog>
          <CompactButton icon={Plus} label="New expense" />
        </CreateExpenseDialog>
      </Header>
    </div>
  )
}
