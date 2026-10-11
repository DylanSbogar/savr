import { createFileRoute } from "@tanstack/react-router"
import { useTitle } from "react-use"

export const Route = createFileRoute("/_app/home/")({
  component: RouteComponent,
})

function RouteComponent() {
  useTitle("Home | SAVR")
  return <div>Hello "/_app/home/"!</div>
}
