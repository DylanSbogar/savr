import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/__app/expenses/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__app/expenses/"!</div>
}
