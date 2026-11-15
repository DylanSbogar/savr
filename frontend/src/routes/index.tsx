import {
  Button,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui"
import { LoginDialog, RegisterDialog } from "@/features/auth"
import { MoonIcon } from "@phosphor-icons/react"
import { createFileRoute, Link } from "@tanstack/react-router"

{
  /*<div className="flex min-h-svh flex-col items-center justify-center gap-2 p-6">
  <h1 className="text-lg font-medium">SAVR</h1>
  <p className="text-sm text-muted-foreground">
    Sign in page coming soon. For now head to{" "}
    <Link to="/home" className="border-b">
      /home
    </Link>
  </p>
</div>*/
}

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  return (
    <div className="col-2">
      <div className="grid h-12 grid-cols-[1fr_auto_1fr] items-center px-20">
        <div className="row-2 items-center justify-self-start">
          <span>SAVR</span>
        </div>

        <div className="row-2 items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink>Overview</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink>Features</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink>FAQ</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink>Contact</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="row-2 items-center justify-self-end">
          <LoginDialog>
            <Button variant="outline" size="lg">
              Log in
            </Button>
          </LoginDialog>
          <RegisterDialog>
            <Button size="lg">Sign up</Button>
          </RegisterDialog>
          <Button variant="ghost" size="icon-lg">
            <MoonIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
