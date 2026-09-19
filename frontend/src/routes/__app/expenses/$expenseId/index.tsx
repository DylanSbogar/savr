import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/__app/expenses/$expenseId/")({
  component: RouteComponent,
  loader: () => ({ crumb: "Test Expense" }),
})

function RouteComponent() {
  return <div>Hello "/__app/expenses/$expenseId/"!</div>
}
