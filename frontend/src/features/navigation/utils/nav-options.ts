import {
  HandCoinsIcon,
  HouseIcon,
  ReceiptIcon,
  SquaresFourIcon,
  TagIcon,
} from "@phosphor-icons/react"

export const navGroups = [
  {
    items: [
      { title: "Home", href: "/home", icon: HouseIcon },
      { title: "Spending Tracker", href: "/spending", icon: HandCoinsIcon },
    ],
  },
  {
    label: "Budget Planner",
    items: [
      { title: "Overview", href: "/budget", icon: SquaresFourIcon },
      { title: "Categories", href: "/budget/categories", icon: TagIcon },
      { title: "Expenses", href: "/budget/expenses", icon: ReceiptIcon },
    ],
  },
]
