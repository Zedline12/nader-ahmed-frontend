import { z } from "zod";

export const categorySchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be less than 50 characters"),
});

export type CategorySchema = z.infer<typeof categorySchema>;
