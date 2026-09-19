import { DitherAvatar } from "@/components/dither-kit"
import {
  Sidebar as BaseSidebar,
  Button,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui"
import { useMatchRoute, useNavigate } from "@tanstack/react-router"
import {
  CirclePlus,
  DollarSignIcon,
  LayoutDashboard,
  ListIcon,
  MailIcon,
} from "lucide-react"

const options = [
  {
    title: "Dashboard",
    url: "/home",
    icon: LayoutDashboard,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: ListIcon,
  },
  {
    title: "Expenses",
    url: "/expenses",
    icon: DollarSignIcon,
  },
]

export const Sidebar = () => {
  const navigate = useNavigate()
  const matchRoute = useMatchRoute()
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
                <DollarSignIcon className="size-4" />
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
              {/* Quick create/search button goes here */}
              <SidebarMenuItem className="flex items-center gap-2">
                <SidebarMenuButton
                  tooltip="Quick Create"
                  className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                >
                  <CirclePlus />
                  <span>Quick Create</span>
                </SidebarMenuButton>
                <Button
                  size="icon"
                  className="size-8 group-data-[collapsible=icon]:opacity-0"
                  variant="outline"
                >
                  <MailIcon />
                  <span className="sr-only">Inbox</span>
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              {options.map((opt) => (
                <SidebarMenuItem key={opt.title}>
                  <SidebarMenuButton
                    tooltip={opt.title}
                    onClick={() => navigate({ to: opt.url })}
                    isActive={!!matchRoute({ to: opt.url, fuzzy: true })}
                  >
                    {opt.icon && <opt.icon />}
                    <span>{opt.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="rounded-none data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
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
