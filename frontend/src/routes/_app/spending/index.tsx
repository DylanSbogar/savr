import { HandCoinsIcon } from "@phosphor-icons/react";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
	createTransactionMutation,
	getTransactionsOptions,
} from "@/api/@tanstack/react-query.gen";
import { PageHeader } from "@/components/layout";
import { Button, toast } from "@/components/ui";

export const Route = createFileRoute("/_app/spending/")({
	component: RouteComponent,
	loader: () => ({ crumb: "Spending Tracker", icon: HandCoinsIcon }),
});

function RouteComponent() {
	const { data: transactions } = useQuery(getTransactionsOptions());

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
			<div className="flex flex-col gap-2">
				{transactions?.map(({ id, name, amount }) => (
					<Link
						key={id}
						to="/spending/$transactionId"
						params={{ transactionId: id }}
					>
						{name} - {amount}
					</Link>
				))}
			</div>
		</div>
	);
}
