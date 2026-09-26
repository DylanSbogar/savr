import { Header } from "@/components/layout"
import { Button } from "@/components/ui"
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
          <Button>
            <Plus />
            <span>New category</span>
          </Button>
        </CreateCategoryDialog>
      </Header>
    </div>
  )
}
