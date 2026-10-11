import { PageHeader } from "@/components/layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/spending/")({
  component: RouteComponent,
  loader: () => ({ crumb: "Spending Tracker" }),
})

function RouteComponent() {
  return (
    <div className="col">
      <PageHeader>Actions</PageHeader>
    </div>
  )
}
