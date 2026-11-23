import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui";
import { isAuthenticated } from "@/features/auth/utils";
import { Sidebar } from "@/features/navigation";

export const Route = createFileRoute("/_app")({
	component: RouteComponent,
	beforeLoad: ({ location }) => {
		if (!isAuthenticated()) {
			throw redirect({ to: "/", search: { redirect: location.href } });
		}
	},
});

function RouteComponent() {
	return (
		<SidebarProvider>
			<Sidebar />
			<SidebarInset>
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	);
}
