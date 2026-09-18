import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__app/home/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3>Home page</h3>
    </div>
  )
}
