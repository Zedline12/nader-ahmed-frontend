"use server";

import { fetchWithToken } from "@/lib/fetcher";
import { productSchema, ProductSchema } from "../schemas/product";
import { revalidatePath } from "next/cache";

export async function createProduct(data: ProductSchema) {
  const result = productSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Invalid data" };
  }

  try {
    // Parse details from string to JSON object before sending
    const payload = {
      ...data,
      // Filter out empty about items
      about: data.about.filter((item) => item.trim() !== ""),
    };

    const response = await fetchWithToken("/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Failed to create product",
      };
    }

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("Create Product Error:", error);
    return { success: false, error: "Something went wrong" };
  }
}
