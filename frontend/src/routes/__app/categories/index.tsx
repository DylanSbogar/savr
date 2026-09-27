import { CompactButton } from "@/components/compact-button"
import { Header } from "@/components/layout"
import { CreateCategoryDialog } from "@/features/categories"
import { createFileRoute } from "@tanstack/react-router"
import { Plus } from "lucide-react"

export const Route = createFileRoute("/__app/categories/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Header>
        <CreateCategoryDialog>
          <CompactButton icon={Plus} label="New category" />
        </CreateCategoryDialog>
      </Header>
    </div>
  )
}
