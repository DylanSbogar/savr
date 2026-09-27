import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"
import { DollarSign } from "lucide-react"

interface Props {
  categoryId?: string
  children: React.ReactElement
}

export const CreateExpenseDialog = ({ categoryId, children }: Props) => {
  console.log(`Pre-selecting category with id: ${categoryId}...`)
  return (
    <Dialog>
      <DialogTrigger render={children} />
      <DialogContent>
        <DialogHeader icon={DollarSign}>
          <DialogTitle>Create expense</DialogTitle>
          <DialogDescription>Lets do something here</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <FieldGroup>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input placeholder="Electricity" />
            </Field>
            <Field>
              <FieldLabel>Category</FieldLabel>
              <Select>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </Select>
            </Field>
          </FieldGroup>
          <DialogFooter showCloseButton>
            <Button>Create</Button>
          </DialogFooter>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
