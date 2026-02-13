"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ColorSelect } from "../components/ColorSelect";
import { SizeSelect } from "../components/SizeSelect";
import { ProductsService } from "@/lib/api/services/products.service";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import Image from "next/image";

export function CreateVariantForm() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [formState, setFormState] = useState({
    price: "",
    colorId: "",
    sizeId: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles]);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("price", formState.price);
    formData.append("colorId", formState.colorId);
    formData.append("sizeId", formState.sizeId);

    images.forEach((file) => {
      formData.append("imagesFiles", file);
    });

    try {
      await ProductsService.addVariant(productId, formData);
      toast.success("Variant created successfully");
      router.push(`/admin/products`);
      router.refresh();
    } catch (error: any) {
      console.error("Error creating variant", error);
      toast.error(error.message || "Failed to create variant");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Create Product Variant
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formState.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <ColorSelect
            value={formState.colorId}
            onChange={(val) => handleInputChange("colorId", val)}
          />

          <SizeSelect
            value={formState.sizeId}
            onChange={(val) => handleInputChange("sizeId", val)}
          />
        </div>
      </div>

      {/* Image Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Variant Images
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 hover:bg-gray-50 transition-colors cursor-pointer relative">
          <div className="text-center">
            <Upload
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
              >
                <span>Upload files</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
          {/* Overlay input for drag and drop could be implemented here for better UX */}
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {imagePreviews.map((src, index) => (
              <div
                key={index}
                className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
              >
                <Image
                  src={src}
                  alt={`Preview ${index}`}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? "Creating..." : "Create Variant"}
        </button>
      </div>
    </form>
  );
}
