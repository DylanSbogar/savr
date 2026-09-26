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
  FieldSeparator,
  Input,
  Textarea,
} from "@/components/ui"
import { ListPlus } from "lucide-react"

interface Props {
  children: React.ReactElement
}

export const CreateCategoryDialog = ({ children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger render={children} />
      <DialogContent>
        <DialogHeader icon={ListPlus}>
          <DialogTitle>Create category</DialogTitle>
          <DialogDescription>
            Lets do something because of this and that
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <FieldGroup>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input type="text" placeholder="Bills" />
            </Field>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea placeholder="Track my essential recurring bills and subscriptions." />
            </Field>
            <FieldSeparator />
            <Field>
              <FieldLabel>Planned limit</FieldLabel>
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
