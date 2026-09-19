import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/__app/expenses")({
  component: RouteComponent,
  loader: () => ({ crumb: "Expenses" }),
})

function RouteComponent() {
  return <Outlet />
}
