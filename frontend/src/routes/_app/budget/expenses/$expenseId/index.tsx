import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/budget/expenses/$expenseId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/budget/expenses/$expenseId/"!</div>
}
