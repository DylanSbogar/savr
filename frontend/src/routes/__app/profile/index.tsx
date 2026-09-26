import { Header } from "@/components/layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/__app/profile/")({
  component: Index,
  loader: () => ({ crumb: "Profile" }),
})

function Index() {
  return (
    <div>
      <Header />
      <h3>Profile page</h3>
    </div>
  )
}
