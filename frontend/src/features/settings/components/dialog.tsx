import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui"
import { Bell, Keyboard, Link, Paintbrush, Settings } from "lucide-react"
import { useState } from "react"

const data = [
  { name: "Appearance", icon: Paintbrush },
  { name: "Notifications", icon: Bell },
  { name: "Accessibility", icon: Keyboard },
  {
    name: "Connected accounts",
    icon: Link,
    component: <>Connected Accounts</>,
  },
]

export const SettingsDialog = () => {
  const [selectedTab, setSelectedTab] =
    useState<(typeof data)[number]["name"]>("Appearance")

  return (
    <Dialog>
      <SidebarMenuItem>
        <DialogTrigger
          render={
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          }
        />
      </SidebarMenuItem>
      <DialogContent size="3xl" className="overflow-hidden p-0 md:max-h-125">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          isActive={selectedTab === item.name}
                          onClick={() => setSelectedTab(item.name)}
                        >
                          <item.icon />
                          <span>{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-120 flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">{selectedTab}</div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
              <span>Content coming soon...</span>
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
