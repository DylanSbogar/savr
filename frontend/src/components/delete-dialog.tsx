import { useIsMobile } from "@/hooks";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "./ui";

interface Props {
	title: string;
	description: string;
	action: () => void;
	actionText?: string;
	children: React.ReactElement;
}

export const DeleteDialog = ({
	title,
	description,
	action,
	actionText = "Delete",
	children,
}: Props) => {
	const isMobile = useIsMobile();

	return isMobile ? (
		<Popover>
			<PopoverTrigger render={children} />
			<PopoverContent>
				<PopoverHeader>
					<PopoverTitle>{title}</PopoverTitle>
					<PopoverDescription>{description}</PopoverDescription>
				</PopoverHeader>
				<Button variant="secondary">Cancel</Button>
				<Button variant="destructive" onClick={action}>
					{actionText}
				</Button>
			</PopoverContent>
		</Popover>
	) : (
		<AlertDialog>
			<AlertDialogTrigger render={children} />
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction variant="destructive" onClick={action}>
						{actionText}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
