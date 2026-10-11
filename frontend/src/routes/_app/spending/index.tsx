import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/spending/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/spending/"!</div>
}
