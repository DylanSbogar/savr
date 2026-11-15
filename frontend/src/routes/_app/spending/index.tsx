import { HandCoinsIcon } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout";

export const Route = createFileRoute("/_app/spending/")({
	component: RouteComponent,
	loader: () => ({ crumb: "Spending Tracker", icon: HandCoinsIcon }),
});

function RouteComponent() {
	return (
		<div className="col">
			<PageHeader>Actions</PageHeader>
			<Link
				to="/spending/$transactionId"
				params={{ transactionId: crypto.randomUUID() }}
			>
				Test example
			</Link>
		</div>
	);
}
