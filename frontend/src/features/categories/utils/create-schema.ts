import { z } from "zod"

export const createCategorySchema = z.object({})

export type CreateCategorySchema = z.infer<typeof createCategorySchema>
