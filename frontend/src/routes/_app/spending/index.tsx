import {
	MagnifyingGlassIcon,
	PlusIcon,
	SquareSplitHorizontalIcon,
} from "@phosphor-icons/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { type ColumnFiltersState, useTable } from "@tanstack/react-table";
import { useState } from "react";
import {
	createTransactionMutation,
	getTransactionsOptions,
} from "@/api/@tanstack/react-query.gen";
import {
	DataTable,
	DataTableViewOptions,
	features,
} from "@/components/data-table";
import { PageHeader } from "@/components/layout";
import {
	Button,
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	toast,
} from "@/components/ui";
import { transactionsColums } from "@/features/transactions/utils/columns";

export const Route = createFileRoute("/_app/spending/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
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

	const table = useTable({
		features,
		data: transactions ?? [],
		columns: transactionsColums,
		onColumnFiltersChange: setColumnFilters,
		getRowId: (row) => row.id,
		state: {
			columnFilters,
		},
	});

	return (
		<div className="flex flex-1 flex-col">
			<PageHeader>
				<Button
					onClick={() =>
						createTransaction.mutate({
							body: {
								name: "Example transcation",
								amount: 100.01,
								dateTime: Date.now().toString(),
							},
						})
					}
				>
					<PlusIcon />
					<span>New transaction</span>
				</Button>
			</PageHeader>
			<div className="flex min-h-0 flex-1 flex-col">
				<div className="h-32 shrink-0 border-b p-4">
					<h1 className="text-xl font-semibold">Stats coming soon...</h1>
				</div>

				<div className="min-h-0 flex-1 overflow-y-auto">
					<div className="flex flex-col gap-2 p-4">
						<div className="flex items-center justify-between">
							<div className="flex items-baseline gap-2">
								<span>Transactions</span>
								<span className="text-xs text-muted-foreground">
									{table.getFilteredRowModel().rows.length} result
									{table.getFilteredRowModel().rows.length === 1 ? "" : "s"}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<InputGroup>
									<InputGroupInput
										placeholder="Search transactions..."
										value={
											(table.getColumn("name")?.getFilterValue() as string) ??
											""
										}
										onChange={(event) =>
											table
												.getColumn("name")
												?.setFilterValue(event.target.value)
										}
									/>
									<InputGroupAddon align="inline-start">
										<MagnifyingGlassIcon />
									</InputGroupAddon>
								</InputGroup>
								<DataTableViewOptions table={table} />
							</div>
						</div>
						<DataTable
							table={table}
							onRowClick={(row) =>
								navigate({
									to: "/spending/$transactionId",
									params: { transactionId: row.id },
								})
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
