"use client";

import {
  Product,
  ProductVariant,
  VariationType,
} from "@/lib/types/product.type";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Star, Heart, Share2, Check } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();
  // Initialize with the first variant if available
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variantsList && product.variantsList.length > 0
      ? product.variantsList[0]
      : null
  );

  const [mainImage, setMainImage] = useState<string>(
    selectedVariant?.imagesUrls?.[0] || product.thumbnailUrl
  );

  // Update main image when variant changes
  useEffect(() => {
    if (selectedVariant?.imagesUrls && selectedVariant.imagesUrls.length > 0) {
      setMainImage(selectedVariant.imagesUrls[0]);
    } else {
      setMainImage(product.thumbnailUrl);
    }
  }, [selectedVariant, product.thumbnailUrl]);

  const currentPrice = selectedVariant?.price || product.price;
  const currentDiscount = selectedVariant?.discount || 0;

  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    // Explicitly set image here too for immediate feedback if needed,
    // though useEffect handles it.
  };

  // Get unique colors and sizes for selectors
  // This logic assumes variants define unique combinations.
  // For a better UX in complex cases, one might filter valid combinations.
  // Here we will just list all available options based on variantsList.
  const colors = Array.from(
    new Set(product.variantsList?.map((v) => v.color).filter(Boolean))
  );
  const sizes = Array.from(
    new Set(product.variantsList?.map((v) => v.size).filter(Boolean))
  );

  // Filter variants based on selection logic
  // Since the user asked to just select a variant, let's assume clicking a Color/Size
  // tries to find a matching variant.
  // For simplicity: If user clicks "Red", we find the first Red variant.
  // If user clicks "XL", we find the first XL variant that matches current color if possible.

  // Actually, a safer approach for "changing the variant" is to render the exact variants
  // or simple selectors that update the whole state.
  // Let's implement smart selectors.

  const handleColorSelect = (color: string) => {
    // Find a variant with this color. try to keep current size if possible.
    if (!product.variantsList) return;

    const currentSize = selectedVariant?.size;
    let newVariant = product.variantsList.find(
      (v) => v.color === color && v.size === currentSize
    );

    if (!newVariant) {
      // Fallback to first variant of this color
      newVariant = product.variantsList.find((v) => v.color === color);
    }

    if (newVariant) setSelectedVariant(newVariant);
  };

  const handleSizeSelect = (size: string) => {
    // Find a variant with this size. try to keep current color if possible.
    if (!product.variantsList) return;

    const currentColor = selectedVariant?.color;
    let newVariant = product.variantsList.find(
      (v) => v.size === size && v.color === currentColor
    );

    if (!newVariant) {
      // Fallback to first variant of this size
      newVariant = product.variantsList.find((v) => v.size === size);
    }

    if (newVariant) setSelectedVariant(newVariant);
  };

  const galleryImages = selectedVariant?.imagesUrls || [product.thumbnailUrl];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Column: Images */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 border border-gray-100 shadow-sm group">
            <Image
              src={mainImage}
              alt={product.title}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 text-gray-700 transition">
                <Heart size={20} />
              </button>
              <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 text-gray-700 transition">
                <Share2 size={20} />
              </button>
            </div>
            {currentDiscount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                -{currentDiscount}% OFF
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    mainImage === img
                      ? "border-indigo-600 shadow-md ring-2 ring-indigo-100"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Product view ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: details */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-500 text-sm">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm text-gray-400 font-medium">
                (128 reviews)
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-extrabold text-indigo-600">
                {formatPrice(currentPrice)}
              </span>
              {product.price > currentPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          <div className="h-px bg-gray-200"></div>

          <div className="space-y-6">
            {/* Variations */}
            {(product.variationType === VariationType.ONLYCOLOR ||
              product.variationType === VariationType.SIZEANDCOLOR) &&
              colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                    Color
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorSelect(color)}
                        className={`group relative w-12 h-12 rounded-full flex items-center justify-center border transition-all ${
                          selectedVariant?.color === color
                            ? "border-indigo-600 ring-2 ring-indigo-100 ring-offset-2"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }} // Assuming color is a valid implementation CSS color or hex, logic might need adjustment for specialized names
                        title={color}
                      >
                        {/* Fallback for white/light colors to show checkmark */}
                        {selectedVariant?.color === color && (
                          <Check
                            size={18}
                            className={`${
                              ["white", "#ffffff", "cream"].includes(
                                color.toLowerCase()
                              )
                                ? "text-gray-900"
                                : "text-white"
                            }`}
                          />
                        )}
                        <span className="sr-only">{color}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            {(product.variationType === VariationType.ONLYSIZE ||
              product.variationType === VariationType.SIZEANDCOLOR) &&
              sizes.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                    Size
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeSelect(size)}
                        className={`min-w-[3rem] h-12 px-4 rounded-lg border text-sm font-semibold transition-all flex items-center justify-center
                                            ${
                                              selectedVariant?.size === size
                                                ? "bg-indigo-600 border-indigo-600 text-white shadow-md"
                                                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                                            }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* About Section (Features) */}
          {product.about && product.about.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <ul className="space-y-3">
                {/* Assuming about is simple string array based on previous context, 
                                 if it is object array logic needs to change.
                                 Type definition said 'string[]' in comment but potentially 'any'
                              */}
                {product.about.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <div className="mt-1 min-w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm leading-relaxed">
                      {typeof item === "string" ? item : JSON.stringify(item)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              onClick={() =>
                addToCart({
                  itemId: product.id,
                  itemType: "Product",
                  quantity: 1, // Can add quantity selector later
                })
              }
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={22} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
