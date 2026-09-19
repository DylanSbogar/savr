import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/__app/categories/$categoryId/")({
  component: RouteComponent,
  loader: () => ({ crumb: "Test Category" }),
})

function RouteComponent() {
  return <div>Hello "/__app/categories/$categoryId/"!</div>
}
