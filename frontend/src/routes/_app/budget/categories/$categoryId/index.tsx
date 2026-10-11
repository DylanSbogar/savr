import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/budget/categories/$categoryId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/budget/categories/$categoryId/"!</div>
}
