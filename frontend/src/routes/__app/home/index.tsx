import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/__app/home/")({
  component: Index,
  loader: () => ({
    crumb: "Dashboard",
  }),
})

function Index() {
  return (
    <div className="p-2">
      <h3>Dashboard</h3>
    </div>
  )
}
