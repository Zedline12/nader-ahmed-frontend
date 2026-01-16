import { apiFetch } from "@/lib/api/client";
import { Category } from "@/lib/types/category.type";

export const CategoriesService = {
  findAll: async (): Promise<Category[]> => {
    return await apiFetch("categories", {
      method: "GET",
    });
  },
};
