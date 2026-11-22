import { Dialog, DialogContent, DialogHeader, Progress } from "@/components/ui";

type Props = { open: boolean; setOpen: (value: boolean) => void };

export const OnboardingDialog = ({ open, setOpen }: Props) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<Progress value={25} />
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
