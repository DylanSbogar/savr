import { HandCoinsIcon } from "@phosphor-icons/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/spending")({
	component: RouteComponent,
	loader: () => ({ crumb: "Spending Tracker", icon: HandCoinsIcon }),
});

function RouteComponent() {
	return <Outlet />;
}
