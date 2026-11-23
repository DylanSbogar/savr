import { GoogleLogoIcon, KeyIcon } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { TextMorph } from "torph/react";
import { registerMutation } from "@/api/@tanstack/react-query.gen";
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
	Input,
	toast,
} from "@/components/ui";
import { registerSchema, setToken } from "../utils";

interface Props {
	children: React.ReactElement;
}

export const RegisterDialog = ({ children }: Props) => {
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			passwordConfirmation: "",
		},
		validators: { onSubmit: registerSchema, onChange: registerSchema },
		onSubmit: async ({ value }) => {
			register.mutate({
				body: {
					email: value.email,
					password: value.password,
				},
			});
		},
	});

	const register = useMutation({
		...registerMutation(),
		onSuccess: (data) => {
			setToken(data.access_token);
			navigate({ to: "/home" });
		},
		onError: () => {
			toast.add({ type: "error", description: "Uh oh" });
		},
	});

	return (
		<Dialog>
			<form
				id="register-form"
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<DialogTrigger render={children} />
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							<TextMorph>Sign up for SAVR</TextMorph>
						</DialogTitle>
					</DialogHeader>
					<FieldGroup className="px-4 py-2">
						<form.Field
							name="email"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor="email">Email address</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="johndoe@mail.com"
											autoComplete="off"
											disabled={register.isPending}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<form.Field
							name="password"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor="password">Password</FieldLabel>
										<Input
											type="password"
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="********"
											autoComplete="off"
											disabled={register.isPending}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<form.Field
							name="passwordConfirmation"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor="passwordConfirmation">
											Confirm password
										</FieldLabel>
										<Input
											type="password"
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="********"
											autoComplete="off"
											disabled={register.isPending}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						<FieldSeparator className="bg-popover">or</FieldSeparator>
						<Button size="lg" disabled>
							<GoogleLogoIcon />
							<span>Continue with Google</span>
						</Button>
						<Button size="lg" disabled>
							<KeyIcon />
							<span>Continue with Passkey</span>
						</Button>
					</FieldGroup>
					<DialogFooter className="justify-end!">
						<DialogClose
							render={
								<Button variant="outline">
									<span>Cancel</span>
								</Button>
							}
						/>
						<form.Subscribe
							selector={(state) => ({
								isValid: state.isValid,
								isDirty: state.isDirty,
							})}
						>
							{({ isValid, isDirty }) => (
								<Button
									type="submit"
									form="register-form"
									disabled={register.isPending || !isValid || !isDirty}
								>
									Sign up
								</Button>
							)}
						</form.Subscribe>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
};
