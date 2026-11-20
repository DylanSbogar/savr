import { z } from "zod";

export const registerSchema = z
	.object({
		email: z.string().min(1),
		password: z.string().min(8, "Password must be at least 8 characters"),
		passwordConfirmation: z.string(),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "Passwords don't match",
		path: ["passwordConfirmation"], // attach the error to this field
	});

export type RegisterSchema = z.infer<typeof registerSchema>;
