import { PageHeader } from "@/components/layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/budget/categories/$categoryId/")({
  component: RouteComponent,
  loader: () => ({ crumb: "Test Category" }),
})

function RouteComponent() {
  return (
    <div className="col">
      <PageHeader>Actions</PageHeader>
    </div>
  )
}
