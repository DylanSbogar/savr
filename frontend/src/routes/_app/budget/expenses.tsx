import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/budget/expenses")({
  component: RouteComponent,
  loader: () => ({ crumb: "Expenses" }),
})

function RouteComponent() {
  return <Outlet />
}
