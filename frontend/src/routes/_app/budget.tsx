import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/budget")({
  component: RouteComponent,
  loader: () => ({ crumb: "Budget Planner" }),
})

function RouteComponent() {
  return <Outlet />
}
