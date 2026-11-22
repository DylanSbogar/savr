import { createColumnHelper } from "@tanstack/react-table";
import type { TransactionSummary } from "@/api";
import {
	DataTableColumnHeader,
	type DataTableFeatures,
} from "@/components/data-table";

const columnHelper = createColumnHelper<
	DataTableFeatures,
	TransactionSummary
>();

export const transactionsColums = columnHelper.columns([
	columnHelper.accessor("name", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
	}),
	columnHelper.accessor("amount", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Amount" />
		),
	}),
	columnHelper.accessor("dateTime", {
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date" />
		),
	}),
]);
