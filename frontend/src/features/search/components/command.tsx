import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui"
import { LayoutDashboard, Search } from "lucide-react"
import { useState } from "react"

export const SearchCommand = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <SidebarMenuItem className="flex items-center gap-2">
        <SidebarMenuButton
          tooltip="Quick search"
          onClick={() => setIsOpen(true)}
          className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
        >
          <Search />
          <span>Quick search</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <Command>
          <CommandInput placeholder="Search anything..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem>
                <LayoutDashboard />
                <span>Dashboard</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
