import { SidebarInset, SidebarProvider } from "@/components/ui"
import { Sidebar } from "@/features/navigation"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset className="bg-accent/75">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
