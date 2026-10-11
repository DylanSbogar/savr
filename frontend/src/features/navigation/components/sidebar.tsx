import {
  Sidebar as BaseSidebar,
  Kbd,
  KbdGroup,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui"
import icon from "@/assets/icon-light.svg"
import { useMatchRoute, useNavigate } from "@tanstack/react-router"
import { LifebuoyIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"
import { navGroups } from "../utils"
import { DitherAvatar } from "@/components/dither-kit"
import { SettingsDialog } from "./settings-dialog"
import { SearchDialog } from "./search-dialog"

export const Sidebar = () => {
  const navigate = useNavigate()
  const matchRoute = useMatchRoute()
  return (
    <BaseSidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              onClick={() => navigate({ to: "/home" })}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <img src={icon} className="size-4" alt="SAVR icon" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-mono font-medium">SAVR</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SearchDialog />
        {navGroups.map((group, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupContent>
              {group.label && (
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              )}
              <SidebarMenu>
                {group.items.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      onClick={() => navigate({ to: item.href })}
                      isActive={
                        !!matchRoute({ to: item.href, fuzzy: !item.exact })
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SettingsDialog />
          </SidebarMenuItem>
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
              <LifebuoyIcon />
              <span>Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="rounded-none data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              tooltip="dylansbogar"
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
      <SidebarRail />
    </BaseSidebar>
  )
}
