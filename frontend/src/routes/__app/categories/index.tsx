import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/__app/categories/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__app/categories/"!</div>
}
