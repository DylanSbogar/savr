import { SidebarInset, SidebarProvider } from "@/components/ui"
import { Header, Sidebar } from "@/features/layout"
import { createRootRoute, Outlet } from "@tanstack/react-router"

const RootLayout = () => {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <Header />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}

export const Route = createRootRoute({ component: RootLayout })
