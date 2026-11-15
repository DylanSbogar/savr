import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	deleteTransactionMutation,
	getTransactionOptions,
} from "@/api/@tanstack/react-query.gen";
import { Button, toast } from "@/components/ui";

export const Route = createFileRoute("/_app/spending/$transactionId/")({
	loader: ({ context: { queryClient }, params: { transactionId } }) =>
		queryClient.query({
			...getTransactionOptions({ path: { transactionId } }),
			staleTime: "static",
		}),
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

	const deleteTransaction = useMutation({
		...deleteTransactionMutation(),
		onSuccess: () => {
			toast.add({
				type: "success",
				description: "Transaction successfully deleted",
			});
		},
		onError: () =>
			toast.add({
				type: "error",
				description:
					"There was an error while attempting to delete a transaction",
			}),
	});

	return (
		<div>
			{transaction.name}
			<Button
				variant="destructive"
				onClick={() => deleteTransaction.mutate({ path: { transactionId } })}
			>
				Delete
			</Button>
		</div>
	);
}
