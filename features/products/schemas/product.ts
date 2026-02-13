import { z } from "zod";
import { VariationType } from "@/lib/types/product.type";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  categoryId: z.string().min(1, "Category is required"),
  variationType: z.nativeEnum(VariationType),
  description: z.string(),
  about: z.array(z.string()),
});

export type ProductSchema = z.infer<typeof productSchema>;
