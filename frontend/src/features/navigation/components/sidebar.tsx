import {
	CurrencyDollarIcon,
	LifebuoyIcon,
	SignOutIcon,
	UserIcon,
} from "@phosphor-icons/react";
import { useMatchRoute, useNavigate } from "@tanstack/react-router";
import { DitherAvatar } from "@/components/dither-kit";
import {
	Sidebar as BaseSidebar,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarTrigger,
	useSidebar,
} from "@/components/ui";
import { useIsMobile } from "@/hooks";
import { navGroups } from "../utils";
import { SettingsDialog } from "./settings-dialog";

export const Sidebar = () => {
	const navigate = useNavigate();
	const matchRoute = useMatchRoute();

	const { open } = useSidebar();
	const isMobile = useIsMobile();

	const handleLogOut = () => {
		navigate({ to: "/" });
	};

	return (
		<BaseSidebar collapsible="icon">
			<SidebarHeader className="border-b bg-background">
				<SidebarMenu>
					<SidebarMenuItem className="flex items-center justify-between">
						<SidebarMenuButton
							onClick={() => navigate({ to: "/home" })}
							className="w-fit"
						>
							<CurrencyDollarIcon className="size-5" />
							<span className="text-base font-semibold">SAVR</span>
						</SidebarMenuButton>
						{open && <SidebarTrigger />}
					</SidebarMenuItem>
					{!open && !isMobile && (
						<SidebarMenuItem className="flex items-center justify-center">
							<SidebarTrigger />
						</SidebarMenuItem>
					)}
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="border-b bg-background">
				{/*<SearchDialog />*/}
				{navGroups.map((group) => (
					<SidebarGroup key={group.label}>
						<SidebarGroupContent>
							{group.label && open && (
								<SidebarGroupLabel>{group.label}</SidebarGroupLabel>
							)}
							<SidebarMenu>
								{group.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											tooltip={item.title}
											onClick={() => navigate({ to: item.href })}
											isActive={
												!!matchRoute({ to: item.href, fuzzy: !item.exact })
											}
										>
											<item.icon />
											<span>{item.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter className="border-b bg-background">
				<SidebarMenu>
					<SidebarMenuItem>
						<SettingsDialog />
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							tooltip="Support"
							render={
								<a
									href="https://github.com/DylanSbogar/savr/issues/new"
									target="_blank"
									rel="noopener"
								/>
							}
						>
							<LifebuoyIcon />
							<span>Support</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarFooter className="bg-background">
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger
								render={
									<SidebarMenuButton
										size="lg"
										className="rounded-none data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
										tooltip={`dylansbogar\ndev.dylansbogar@icloud.com`}
									>
										<DitherAvatar
											name="dylansbogar"
											size={32}
											className="shrink-0"
										/>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-medium">dylansbogar</span>
											<span className="truncate text-xs text-muted-foreground">
												dev.dylansbogar@icloud.com
											</span>
										</div>
									</SidebarMenuButton>
								}
							/>
							<DropdownMenuContent side="right" align="end" sideOffset={4}>
								<DropdownMenuGroup>
									<DropdownMenuItem
										onClick={() => navigate({ to: "/profile" })}
									>
										<UserIcon />
										<span>Profile</span>
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuGroup onClick={handleLogOut}>
									<DropdownMenuItem variant="destructive">
										<SignOutIcon />
										<span>Log out</span>
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</BaseSidebar>
	);
};
