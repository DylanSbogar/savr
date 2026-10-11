import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/budget/categories")({
  component: RouteComponent,
  loader: () => ({ crumb: "Categories" }),
})

function RouteComponent() {
  return <Outlet />
}
