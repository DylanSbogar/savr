import { CompactButton } from "@/components/compact-button"
import { DeletePopover } from "@/components/delete-popover"
import { Header } from "@/components/layout"

import { createFileRoute } from "@tanstack/react-router"
import { Trash2 } from "lucide-react"

export const Route = createFileRoute("/__app/expenses/$expenseId/")({
  component: RouteComponent,
  loader: () => ({ crumb: "Test Expense" }),
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-2">
      <Header>
        <DeletePopover
          label="expense"
          onDelete={() => console.log(`Deleting expense...`)}
        >
          <CompactButton
            variant="destructive"
            icon={Trash2}
            label="Delete expense"
          />
        </DeletePopover>
      </Header>
    </div>
  )
}
