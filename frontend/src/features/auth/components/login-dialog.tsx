import { GoogleLogoIcon, KeyIcon } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import { TextMorph } from "torph/react";
import { loginMutation } from "@/api/@tanstack/react-query.gen";
import {
	Alert,
	AlertDescription,
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
import { loginSchema, setToken, useSessionExpired } from "../utils";

interface Props {
	children: React.ReactElement;
}

export const LoginDialog = ({ children }: Props) => {
	const router = useRouter();
	const navigate = useNavigate();
	const sessionExpired = useSessionExpired();
	const { redirect } = useSearch({ strict: false });

	const form = useForm({
		defaultValues: { email: "", password: "" },
		validators: { onSubmit: loginSchema, onChange: loginSchema },
		onSubmit: async ({ value }) => {
			login.mutate({
				body: {
					email: value.email,
					password: value.password,
				},
			});
		},
	});

	const login = useMutation({
		...loginMutation(),
		onSuccess: (data) => {
			setToken(data.access_token);
			if (redirect?.startsWith("/") && !redirect.startsWith("//")) {
				router.history.push(redirect);
			} else {
				navigate({ to: "/home" });
			}
		},
		onError: () => {
			toast.add({
				type: "success",
				description: "There was an error whilst logging in",
			});
		},
	});

	return (
		<Dialog>
			<form
				id="login-form"
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<DialogTrigger render={children} />
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							<TextMorph>Log in to SAVR</TextMorph>
						</DialogTitle>
					</DialogHeader>
					{sessionExpired && (
						<Alert>
							<AlertDescription>
								Your session expired. Please log in again.
							</AlertDescription>
						</Alert>
					)}
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
											disabled={login.isPending}
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
											disabled={login.isPending}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<FieldSeparator>or</FieldSeparator>
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
									form="login-form"
									disabled={login.isPending || !isValid || !isDirty}
								>
									Log in
								</Button>
							)}
						</form.Subscribe>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
};
