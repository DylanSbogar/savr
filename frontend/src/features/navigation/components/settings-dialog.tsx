import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  SidebarMenuButton,
} from "@/components/ui"
import { GearIcon } from "@phosphor-icons/react"

export const SettingsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <SidebarMenuButton>
            <GearIcon />
            <span>Settings</span>
          </SidebarMenuButton>
        }
      />
      <DialogContent size="2xl">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
