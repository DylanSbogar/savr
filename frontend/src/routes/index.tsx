import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <h3 className="font-mono text-6xl font-semibold">SAVR.app</h3>
      <Link to="/home">Go home</Link>
    </div>
  )
}
