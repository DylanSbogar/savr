import { createRootRoute, Outlet } from '@tanstack/react-router'

const RootLayout = () => (
  <>
    <p>__app layout wrapper</p>
    <Outlet />
  </>
)

export const Route = createRootRoute({ component: RootLayout })
