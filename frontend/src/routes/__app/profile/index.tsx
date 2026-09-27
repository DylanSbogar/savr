import { Header } from "@/components/layout"
import { createFileRoute } from "@tanstack/react-router"
import { useTitle } from "react-use"

export const Route = createFileRoute("/__app/profile/")({
  component: Index,
  loader: () => ({ crumb: "Profile" }),
})

function Index() {
  useTitle("Profile | SAVR")
  return (
    <div>
      <Header />
      <h3>Profile page</h3>
    </div>
  )
}
