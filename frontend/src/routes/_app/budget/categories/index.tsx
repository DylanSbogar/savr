import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/budget/categories/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/budget/categories/"!</div>
}
