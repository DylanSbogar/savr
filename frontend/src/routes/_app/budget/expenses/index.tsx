import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/budget/expenses/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/budget/expenses/"!</div>
}
