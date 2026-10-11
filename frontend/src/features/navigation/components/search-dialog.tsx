import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
  Kbd,
  KbdGroup,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import { useState } from "react"

export const SearchDialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="sm"
                variant="outline"
                tooltip="Search"
                className="flex items-center justify-between"
                onClick={() => setOpen(true)}
              >
                <div className="flex items-center gap-2">
                  <MagnifyingGlassIcon />
                  <span className="text-muted-foreground">Search</span>
                </div>
                <KbdGroup>
                  <Kbd>Ctrl</Kbd>
                  <Kbd>K</Kbd>
                </KbdGroup>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search anything..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
