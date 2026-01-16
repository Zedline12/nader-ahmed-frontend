import { Product } from "./product.type";
// import { Course } from "./course.type"; // Assuming course type exists, otherwise use any or define partial

export interface CartItem {
  id: string; // CartItem ID
  itemType: "Product" | "Course";
  itemId: string; // The Product or Course ID
  quantity: number;
  price: number;
  subTotal: number;
  product?: Product;
  // course?: Course; // Add when course type is available
  itemDetails?: {
    // Fallback/Unification for display
    title: string;
    thumbnailUrl: string;
    slug?: string;
  };
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}

export interface AddCartItemDto {
  itemId: string;
  itemType: "Product" | "Course";
  quantity?: number;
  // Optional: variant info if needed in future
  variantId?: string;
}

export interface UpdateCartItemDto {
  quantity: number;
}
