import { DitherAvatar } from "@/components/dither-kit"
import {
  Sidebar as BaseSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui"
import { CreateCategoryDialog } from "@/features/categories"
import { CreateExpenseDialog } from "@/features/expenses"
import { SearchCommand } from "@/features/search"
import { SettingsDialog } from "@/features/settings"
import { useIsMobile } from "@/hooks"
import { useMatchRoute, useNavigate } from "@tanstack/react-router"
import {
  DollarSign,
  LayoutDashboard,
  LifeBuoy,
  List,
  Plus,
  Search,
  Settings,
} from "lucide-react"

export const Sidebar = () => {
  const navigate = useNavigate()
  const matchRoute = useMatchRoute()
  const isMobile = useIsMobile()

  return (
    <BaseSidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              onClick={() => navigate({ to: "/home" })}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <DollarSign className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">SAVR</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SearchCommand />
            </SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Dashboard"
                  onClick={() => navigate({ to: "/home" })}
                  isActive={!!matchRoute({ to: "/home", fuzzy: true })}
                >
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Categories"
                  onClick={() => navigate({ to: "/categories" })}
                  isActive={!!matchRoute({ to: "/categories", fuzzy: true })}
                >
                  <List />
                  <span>Categories</span>
                </SidebarMenuButton>
                {!isMobile && (
                  <CreateCategoryDialog>
                    <SidebarMenuAction showOnHover>
                      <Plus />
                      <span className="sr-only">Create category</span>
                    </SidebarMenuAction>
                  </CreateCategoryDialog>
                )}
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Expenses"
                  onClick={() => navigate({ to: "/expenses" })}
                  isActive={!!matchRoute({ to: "/expenses", fuzzy: true })}
                >
                  <DollarSign />
                  <span>Expenses</span>
                </SidebarMenuButton>
                {!isMobile && (
                  <CreateExpenseDialog>
                    <SidebarMenuAction showOnHover>
                      <Plus />
                      <span className="sr-only">Create expense</span>
                    </SidebarMenuAction>
                  </CreateExpenseDialog>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SettingsDialog />
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Support"
              render={
                <a
                  href="https://github.com/DylanSbogar/savr/issues/new"
                  target="_blank"
                />
              }
            >
              <LifeBuoy />
              <span>Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="rounded-none data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              tooltip="dylansbogar"
              onClick={() => navigate({ to: "/profile" })}
            >
              <DitherAvatar name="dylansbogar" size={32} className="shrink-0" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">dylansbogar</span>
                <span className="truncate text-xs text-muted-foreground">
                  dev.dylansbogar@icloud.com
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </BaseSidebar>
  )
}
