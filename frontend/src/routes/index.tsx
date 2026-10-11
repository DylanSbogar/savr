import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-2 p-6">
      <h1 className="text-lg font-medium">SAVR</h1>
      <p className="text-sm text-muted-foreground">
        Sign in page coming soon. For now head to{" "}
        <Link to="/home" className="border-b">
          /home
        </Link>
      </p>
    </div>
  )
}
