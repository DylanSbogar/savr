import {
  Button,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui"
import { Trash2 } from "lucide-react"
import { useState } from "react"

interface Props {
  id: string
  children: React.ReactElement
}

export const DeleteExpenseDialog = ({ id, children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleDelete = () => {
    console.log(`Deleting expense with id ${id}...`)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger render={children} />
      <PopoverContent align="end">
        <PopoverHeader>
          Are you sure you wish to delete this expense? This action cannot be
          undone.
        </PopoverHeader>
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2 />
          <span>Delete</span>
        </Button>
      </PopoverContent>
    </Popover>
  )
}
