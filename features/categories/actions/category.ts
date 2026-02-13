"use server";

import { fetchWithToken } from "@/lib/fetcher";
import { categorySchema, CategorySchema } from "../schemas/category";
import { revalidatePath } from "next/cache";

export async function createCategory(data: CategorySchema) {
  const result = categorySchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Invalid data" };
  }

  try {
    const response = await fetchWithToken("/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Failed to create category",
      };
    }

    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Create Category Error:", error);
    return { success: false, error: "Something went wrong" };
  }
}

export async function updateCategory(id: string, data: CategorySchema) {
  const result = categorySchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Invalid data" };
  }

  try {
    const response = await fetchWithToken(`/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Failed to update category",
      };
    }

    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Update Category Error:", error);
    return { success: false, error: "Something went wrong" };
  }
}

export async function deleteCategory(id: string) {
  try {
    const response = await fetchWithToken(`/categories/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Failed to delete category",
      };
    }

    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Delete Category Error:", error);
    return { success: false, error: "Something went wrong" };
  }
}
