import {
	ArrowDownIcon,
	ArrowUpIcon,
	CaretUpDownIcon,
	EyeSlashIcon,
} from "@phosphor-icons/react";
import type { Column, RowData } from "@tanstack/react-table";
import { cn } from "@/lib";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui";
import type { DataTableFeatures } from "./table-features";

interface Props<TData extends RowData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<DataTableFeatures, TData, TValue>;
	title: string;
}

export const DataTableColumnHeader = <TData extends RowData, TValue>({
	column,
	title,
	className,
}: Props<TData, TValue>) => {
	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>;
	}

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<Button
							variant="ghost"
							size="sm"
							className="-ml-3 h-8 data-[state=open]:bg-accent"
						>
							<span>{title}</span>
							{column.getIsSorted() === "desc" ? (
								<ArrowDownIcon />
							) : column.getIsSorted() === "asc" ? (
								<ArrowUpIcon />
							) : (
								<CaretUpDownIcon />
							)}
						</Button>
					}
				/>

				<DropdownMenuContent align="start">
					<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
						<ArrowUpIcon />
						Asc
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
						<ArrowDownIcon />
						Desc
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
						<EyeSlashIcon />
						Hide
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
