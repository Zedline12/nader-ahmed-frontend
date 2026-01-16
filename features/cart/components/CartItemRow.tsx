"use client";

import { CartItem } from "@/lib/types/cart.type";
import Image from "next/image";
import { Minus, Plus, Trash2, X } from "lucide-react";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  isCompact?: boolean; // For sidebar vs page view
}

export default function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
  isCompact = false,
}: CartItemRowProps) {
  // Determine title and image based on fallback logic
  const title =
    item.itemDetails?.title || item.product?.title || "Unknown Item";
  const image =
    item.itemDetails?.thumbnailUrl ||
    "/placeholder.png";

  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div
      className={`flex gap-4 py-4 border-b border-gray-100 ${
        isCompact ? "items-start" : "items-center"
      }`}
    >
      <div
        className={`relative flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50 ${
          isCompact ? "w-16 h-16" : "w-24 h-24"
        }`}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3 className={`line-clamp-2 ${isCompact ? "text-sm" : "text-lg"}`}>
            {title}
          </h3>
          <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
        </div>
        <p className="mt-1 text-xs text-gray-500">{item.itemType}</p>

        <div className="flex flex-1 items-end justify-between text-sm mt-2">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => onUpdateQuantity(item.itemId, item.quantity - 1)}
              className="p-1 hover:bg-gray-100 disabled:opacity-50 transition-colors"
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="px-2 py-0.5 font-medium min-w-[1.5rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.itemId, item.quantity + 1)}
              className="p-1 hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="font-medium text-red-500 hover:text-red-600 transition-colors p-1"
              title="Remove"
            >
              {isCompact ? (
                <X size={18} />
              ) : (
                <span className="flex items-center gap-1 text-sm">
                  <Trash2 size={16} /> Remove
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
