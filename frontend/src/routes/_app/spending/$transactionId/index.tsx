import {
	MagnifyingGlassIcon,
	SquareSplitHorizontalIcon,
} from "@phosphor-icons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getTransactionOptions } from "@/api/@tanstack/react-query.gen";
import { PageHeader } from "@/components/layout";
import {
	Button,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui";
import { TransactionsDeleteDialog } from "@/features/transactions/components/delete-dialog";

export const Route = createFileRoute("/_app/spending/$transactionId/")({
	loader: async ({ context: { queryClient }, params: { transactionId } }) => {
		const transaction = await queryClient.query({
			...getTransactionOptions({ path: { transactionId } }),
			staleTime: "static",
		});
		return { transaction, crumb: transaction.name ?? "N/A" };
	},
	errorComponent: ErrorComponent,
	pendingComponent: PendingComponent,
	component: RouteComponent,
});

function ErrorComponent() {
	return <div>Something went wrong</div>;
}

function PendingComponent() {
	return <div>Loading transaction...</div>;
}

function RouteComponent() {
	const { transactionId } = Route.useParams();
	const { data: transaction } = useSuspenseQuery(
		getTransactionOptions({ path: { transactionId } }),
	);

	return (
		<div className="flex flex-1 flex-col">
			<PageHeader>
				<TransactionsDeleteDialog id={transaction.id} name={transaction.name} />
			</PageHeader>
			{/* Takes the remaining height; min-h-0 lets children scroll instead of stretching the page */}
			<div className="flex min-h-0 flex-1 flex-col">
				<div className="h-32 shrink-0 border-b p-4">
					<h1 className="text-xl font-semibold">{transaction.name}</h1>
				</div>

				<div className="min-h-0 flex-1 overflow-y-auto">
					<pre className="whitespace-pre-line">
						{JSON.stringify(transaction)}
					</pre>
				</div>
			</div>
		</div>
	);
}
