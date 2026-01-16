import { ProductVariant } from "@/lib/types/product.type";
import Image from "next/image";

interface ProductVariantsProps {
  variantsList?: ProductVariant[];
}

export function ProductVariants({ variantsList }: ProductVariantsProps) {
  if (!variantsList || variantsList.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 mt-4">
      <h4 className="text-sm font-semibold text-gray-700">Variants</h4>
      <div className="grid grid-cols-1 gap-2">
        {variantsList.map((variant) => (
          <div
            key={variant.id}
            className="flex items-center gap-3 p-2 border rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            {variant.imagesUrls && variant.imagesUrls.length > 0 && (
              <div className="relative w-10 h-10 rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
                <Image
                  src={variant.imagesUrls[0]}
                  alt={`${variant.color} ${variant.size}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-col text-xs text-gray-600">
              <div className="flex gap-2">
                {variant.size && (
                  <span className="px-1.5 py-0.5 bg-white border rounded text-xs">
                    {variant.size}
                  </span>
                )}
                {variant.color && (
                  <span className="px-1.5 py-0.5 bg-white border rounded text-xs flex items-center gap-1">
                    <span
                      className="w-2 h-2 rounded-full border border-gray-300"
                      style={{ backgroundColor: variant.color.toLowerCase() }} // Assuming color is a valid CSS color or name
                    />
                    {variant.color}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
