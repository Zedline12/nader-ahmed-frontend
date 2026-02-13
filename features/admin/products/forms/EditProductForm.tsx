"use client";

import { useState } from "react";
import { ProductsService } from "@/lib/api/services/products.service";
import { toast } from "sonner";
import { Product } from "@/lib/types/product.type";

interface EditProductFormProps {
  product: Product;
}

export function EditProductForm({ product }: EditProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await ProductsService.update(product.id, {
        title,
        description,
        // categoryId: categoryId
      });
      toast.success("Product updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=""
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary-foreground">Product Details</h2>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black min-h-[100px]"
          />
        </div>
      </div>
    </form>
  );
}
