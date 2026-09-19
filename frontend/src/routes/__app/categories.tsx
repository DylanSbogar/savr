import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/__app/categories")({
  component: RouteComponent,
  loader: () => ({ crumb: "Categories" }),
})

function RouteComponent() {
  return <Outlet />
}
