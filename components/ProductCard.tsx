import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types/product.type";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex flex-col h-full bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-secondary/20 transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
        {product.thumbnailUrl ? (
          <Image
            src={product.thumbnailUrl}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-gray-200 group-hover:scale-105 transition-transform duration-500" />
        )}

        {product.isFeatured && (
          <div className="absolute top-4 right-4 bg-secondary/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm">
            Featured
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2 group-hover:text-secondary transition-colors">
          {product.title}
        </h3>
        <p className="flex-grow text-gray-500 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </div>
          <Link
            href={`/products/${product.id}`}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg group-hover:bg-secondary transition-colors"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}
