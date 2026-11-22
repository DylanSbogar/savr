import { SquareSplitHorizontalIcon } from "@phosphor-icons/react";
import type { ReactTable, RowData } from "@tanstack/react-table";
import {
	Button,
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui";
import type { DataTableFeatures } from "./table-features";

interface Props<TData extends RowData> {
	table: ReactTable<DataTableFeatures, TData>;
}

export const DataTableViewOptions = <TData extends RowData>({
	table,
}: Props<TData>) => (
	<DropdownMenu>
		<DropdownMenuTrigger
			render={
				<Button>
					<SquareSplitHorizontalIcon />
					<span>Columns</span>
				</Button>
			}
		/>
		<DropdownMenuContent align="end">
			<DropdownMenuGroup>
				<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{table
					.getAllColumns()
					.filter(
						(column) =>
							typeof column.accessorFn !== "undefined" && column.getCanHide(),
					)
					.map((column) => (
						<DropdownMenuCheckboxItem
							key={column.id}
							checked={column.getIsVisible()}
							onCheckedChange={(value) => column.toggleVisibility(value)}
							className="capitalize"
						>
							{column.id}
						</DropdownMenuCheckboxItem>
					))}
			</DropdownMenuGroup>
		</DropdownMenuContent>
	</DropdownMenu>
);
