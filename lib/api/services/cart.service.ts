import { apiFetch } from "@/lib/api/client";
import { AddCartItemDto, Cart, UpdateCartItemDto } from "@/lib/types/cart.type";

export const CartService = {
  getCart: async (): Promise<Cart> => {
    return await apiFetch("cart/me", { method: "GET" });
  },

  addItem: async (dto: AddCartItemDto): Promise<Cart> => {
    return await apiFetch("cart", {
      method: "POST",
      body: JSON.stringify(dto),
    });
  },

  updateItem: async (itemId: string, dto: UpdateCartItemDto): Promise<Cart> => {
    return await apiFetch(`cart/items/${itemId}`, {
      method: "PATCH",
      body: JSON.stringify(dto),
    });
  },

  removeItem: async (itemId: string): Promise<Cart> => {
    return await apiFetch(`cart/items/${itemId}`, {
      method: "DELETE",
    });
  },

  clearCart: async (): Promise<void> => {
    await apiFetch("cart", {
      method: "DELETE",
    });
  },
};
