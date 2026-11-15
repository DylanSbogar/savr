import { z } from "zod"

export const loginSchema = z.object({
  emailOrUsername: z.string().min(1),
  password: z.string().min(8),
})

export type LoginSchema = z.infer<typeof loginSchema>
