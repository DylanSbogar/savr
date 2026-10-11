import { PageHeader } from "@/components/layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/budget/expenses/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="col">
      <PageHeader>Actions</PageHeader>
    </div>
  )
}
