import {
	HandCoinsIcon,
	HouseIcon,
	type Icon,
	ReceiptIcon,
	SquaresFourIcon,
	TagIcon,
} from "@phosphor-icons/react";
import type { LinkProps } from "@tanstack/react-router";

interface NavItem {
	title: string;
	href: LinkProps["to"];
	icon: Icon;
	exact?: boolean;
}

interface NavGroup {
	label?: string;
	items: NavItem[];
}

export const navGroups: NavGroup[] = [
	{
		label: "",
		items: [
			{ title: "Home", href: "/home", icon: HouseIcon },
			{ title: "Spending Tracker", href: "/spending", icon: HandCoinsIcon },
		],
	},
	{
		label: "Budget Planner",
		items: [
			{
				title: "Overview",
				href: "/budget",
				icon: SquaresFourIcon,
				exact: true,
			},
			{ title: "Categories", href: "/budget/categories", icon: TagIcon },
			{ title: "Expenses", href: "/budget/expenses", icon: ReceiptIcon },
		],
	},
];
