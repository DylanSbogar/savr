import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { deleteTransactionMutation } from "@/api/@tanstack/react-query.gen";
import { DeleteDialog } from "@/components/delete-dialog";
import { Button, toast } from "@/components/ui";

interface Props {
	id: string;
	name: string;
}

export const TransactionsDeleteDialog = ({ id, name }: Props) => {
	const navigate = useNavigate();
	const deleteTransaction = useMutation({
		...deleteTransactionMutation(),
		onSuccess: () => {
			toast.add({
				type: "success",
				description: `${name} successfully deleted!`,
			});
			navigate({ to: "/spending" });
		},
		onError: () => {
			toast.add({
				type: "error",
				description: `There was an error whilst attempting to delete ${name}`,
			});
		},
	});

	return (
		<DeleteDialog
			title="Delete transaction"
			description={`Are you sure you wish to delete ${name}? This action cannot be undone.`}
			action={() => deleteTransaction.mutate({ path: { transactionId: id } })}
		>
			<Button variant="destructive">Delete</Button>
		</DeleteDialog>
	);
};
