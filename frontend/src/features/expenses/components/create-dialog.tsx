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
  children: React.ReactElement
}

export const CreateExpenseDialog = ({ children }: Props) => {
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
