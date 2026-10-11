import { PageHeader } from "@/components/layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/budget/expenses/$expenseId/")({
  component: RouteComponent,
  loader: () => ({ crumb: "Test Expense" }),
})

function RouteComponent() {
  return (
    <div className="col">
      <PageHeader>Actions</PageHeader>
    </div>
  )
}
