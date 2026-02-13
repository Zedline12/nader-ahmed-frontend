"use client";

import { Product } from "@/lib/types/product.type";
import { ProductVariants } from "@/features/products/components/ProductVariants";
import Image from "next/image";
import Link from "next/link";

// Simple currency formatter
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { id,title, price, thumbnailUrl, isActive, variationType, variantsList } =
    product;

  return (
    <Link href={`/admin/products/${id}`}>
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full bg-gray-100">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full border ${
              isActive
                ? "bg-green-100 text-green-700 border-green-200"
                : "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3
            className="font-semibold text-lg text-gray-900 line-clamp-1"
            title={title}
          >
            {title}
          </h3>
          <p className="font-bold text-gray-900">{formatCurrency(price)}</p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
          <span className="px-2 py-1 bg-gray-100 rounded-md border border-gray-200">
            Type: {variationType}
          </span>
        </div>

        {/* {variantsList && variantsList.length > 0 && (
          <ProductVariants variantsList={variantsList} />
        )} */}
      </div>
      </div>
      </Link>
  );
}
