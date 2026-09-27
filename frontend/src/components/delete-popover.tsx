import { useState } from "react"
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "./ui"
import { Trash2 } from "lucide-react"

interface Props {
  label?: string
  onDelete: () => void
  children: React.ReactElement
}

export const DeletePopover = ({ label, onDelete, children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleDelete = () => {
    onDelete()
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger render={children} />
      <PopoverContent align="end">
        <PopoverHeader>
          Are you sure you wish to delete this{label ? ` ${label}` : ""}? This
          action cannot be undone.
        </PopoverHeader>
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2 />
          <span>Delete{label ? ` ${label}` : ""}</span>
        </Button>
      </PopoverContent>
    </Popover>
  )
}
