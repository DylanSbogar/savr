import { Header } from "@/components/layout"
import { Button } from "@/components/ui"
import { CreateExpenseDialog } from "@/features/expenses"
import { createFileRoute } from "@tanstack/react-router"
import { Plus } from "lucide-react"

export const Route = createFileRoute("/__app/expenses/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Header>
        <CreateExpenseDialog>
          <Button>
            <Plus />
            <span>New expense</span>
          </Button>
        </CreateExpenseDialog>
      </Header>
    </div>
  )
}
