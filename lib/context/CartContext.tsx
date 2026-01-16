"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  Cart,
  CartItem,
  AddCartItemDto,
  UpdateCartItemDto,
} from "@/lib/types/cart.type";
import { CartService } from "@/lib/api/services/cart.service";
import { toast } from "sonner";

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  addToCart: (dto: AddCartItemDto) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const data = await CartService.getCart();
      setCart(data);
    } catch (error) {
      // Silent fail or low-level log, user might not be logged in or no cart yet
      console.log("Could not fetch cart (user might be guest)");
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const addToCart = async (dto: AddCartItemDto) => {
    // Optimistic UI could be implemented here, but simple for now
    try {
      const updatedCart = await CartService.addItem(dto);
      setCart(updatedCart);
      openSidebar();
      toast.success("Added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      const updatedCart = await CartService.updateItem(itemId, { quantity });
      setCart(updatedCart);
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const updatedCart = await CartService.removeItem(itemId);
      setCart(updatedCart);
      toast.success("Removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await CartService.clearCart();
      setCart(null);
      toast.success("Cart cleared");
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        isSidebarOpen,
        toggleSidebar,
        openSidebar,
        closeSidebar,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
