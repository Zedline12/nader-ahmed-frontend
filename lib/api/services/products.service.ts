import { apiFetch } from "@/lib/api/client";
import { Product } from "@/lib/types/product.type";

export const ProductsService = {
  getFeatured: async (): Promise<Product[]> => {
    return await apiFetch("products/featured", {
      method: "GET",
    });
  },

  findOne: async (id: string): Promise<Product> => {
    return await apiFetch(`products/${id}`, {
      method: "GET",
    });
  },
  create: async (
    data: Partial<Product> & {
      categoryId: string;
      details?: Record<string, any>;
      variationType: string;
    }
  ): Promise<Product> => {
    return await apiFetch("admin/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  getAdminProducts: async (): Promise<Product[]> => {
    return await apiFetch("admin/products", {
      method: "GET",
    });
  },
  addVariant: async (productId: string, formData: FormData): Promise<any> => {
    // NOTE: When sending FormData, do NOT set Content-Type header manually.
    // The browser/client automatically sets it with the boundary.
    return await apiFetch(`admin/products/${productId}/variants`, {
      method: "POST",
      body: formData,
      // apiFetch might by default set Content-Type: application/json, need to ensure it handles FormData correctly
      // usually if body is FormData, we shouldn't stringify it.
      // Implementation of apiFetch needs to support this. Assuming it does or I will check it.
    });
  },
  update: async (id: string, data: Partial<Product>): Promise<Product> => {
    return await apiFetch(`admin/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
  deleteVariant: async (
    productId: string,
    variantId: string
  ): Promise<void> => {
    return await apiFetch(`admin/products/${productId}/variants/${variantId}`, {
      method: "DELETE",
    });
  },
  updateVariant: async (
    productId: string,
    variantId: string,
    formData: FormData
  ): Promise<any> => {
    return await apiFetch(`admin/products/${productId}/variants/${variantId}`, {
      method: "PUT", // or PATCH depending on backend
      body: formData,
    });
  },
};
