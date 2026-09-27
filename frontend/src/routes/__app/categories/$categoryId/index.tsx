import { CompactButton } from "@/components/compact-button"
import { DeletePopover } from "@/components/delete-popover"
import { Header } from "@/components/layout"
import { CreateExpenseDialog } from "@/features/expenses"
import { createFileRoute } from "@tanstack/react-router"
import { Plus, Trash2 } from "lucide-react"

export const Route = createFileRoute("/__app/categories/$categoryId/")({
  component: RouteComponent,
  loader: () => ({ crumb: "Test Category" }),
})

function RouteComponent() {
  const { categoryId } = Route.useParams()
  return (
    <div>
      <Header>
        <CreateExpenseDialog categoryId={categoryId}>
          <CompactButton icon={Plus} label="New expense" />
        </CreateExpenseDialog>

        <DeletePopover
          label="category"
          onDelete={() => console.log("Deleting category...")}
        >
          <CompactButton
            variant="destructive"
            icon={Trash2}
            label="Delete category"
          />
        </DeletePopover>
      </Header>
    </div>
  )
}
