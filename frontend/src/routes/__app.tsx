import { SidebarInset, SidebarProvider } from "@/components/ui"
import { Sidebar } from "@/features/layout"
import { createRootRoute, Outlet } from "@tanstack/react-router"

const RootLayout = () => {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}

export const Route = createRootRoute({ component: RootLayout })
