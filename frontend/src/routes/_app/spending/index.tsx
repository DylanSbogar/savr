import { HandCoinsIcon } from "@phosphor-icons/react";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { createTransactionMutation } from "@/api/@tanstack/react-query.gen";
import { PageHeader } from "@/components/layout";
import { Button, toast } from "@/components/ui";

export const Route = createFileRoute("/_app/spending/")({
	component: RouteComponent,
	loader: () => ({ crumb: "Spending Tracker", icon: HandCoinsIcon }),
});

function RouteComponent() {
	const navigate = useNavigate();

	const createTransaction = useMutation({
		...createTransactionMutation(),
		onSuccess: (data) => {
			toast.add({ type: "success", description: "Success!" });
			navigate({
				to: "/spending/$transactionId",
				params: { transactionId: data },
			});
		},
	});

	return (
		<div className="col">
			<PageHeader>
				<Button
					onClick={() =>
						createTransaction.mutate({
							body: {
								name: "Example",
								amount: 19.99,
								dateTime: Date.now().toString(),
							},
						})
					}
				>
					<PlusIcon />
					<span>New transaction</span>
				</Button>
			</PageHeader>
			<Link
				to="/spending/$transactionId"
				params={{ transactionId: crypto.randomUUID() }}
			>
				Test example
			</Link>
		</div>
	);
}
