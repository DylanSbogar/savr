import { createFileRoute } from "@tanstack/react-router";
import { useTitle } from "react-use";
import { PageHeader } from "@/components/layout";

export const Route = createFileRoute("/_app/home/")({
	component: RouteComponent,
	loader: () => ({ crumb: "Home" }),
});

function RouteComponent() {
	useTitle("Home | SAVR");
	return (
		<div className="col">
			<PageHeader>Actions</PageHeader>
		</div>
	);
}
