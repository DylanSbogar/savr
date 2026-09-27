import { createRootRoute, Outlet } from "@tanstack/react-router"
import { useFavicon } from "react-use"
import icon from "@/assets/icon.svg"

const RootLayout = () => {
  useFavicon(icon)
  return <Outlet />
}

export const Route = createRootRoute({ component: RootLayout })
