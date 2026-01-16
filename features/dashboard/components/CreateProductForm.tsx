"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ProductsService } from "@/lib/api/services/products.service";
import { CategoriesDropdown } from "./CategoriesDropdown";
import { VariationType } from "@/lib/types/product.type";
import { X, Plus } from "lucide-react";

export const CreateProductForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [variationType, setVariationType] = useState<string>(
    VariationType.NONE
  );
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState<string[]>([""]);
  const [details, setDetails] = useState("{}"); // JSON string for flexibility
  const [categoryId, setCategoryId] = useState("");

  const handleAboutChange = (index: number, value: string) => {
    const newAbout = [...about];
    newAbout[index] = value;
    setAbout(newAbout);
  };

  const addAboutItem = () => {
    setAbout([...about, ""]);
  };

  const removeAboutItem = (index: number) => {
    const newAbout = about.filter((_, i) => i !== index);
    setAbout(newAbout);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !categoryId || !variationType) {
      toast.error("Please fill in all required fields");
      return;
    }

    let parsedDetails = {};
    try {
      parsedDetails = JSON.parse(details);
    } catch (error) {
      toast.error("Invalid JSON in Details field");
      return;
    }

    setLoading(true);
    try {
      await ProductsService.create({
        title,
        variationType: variationType as VariationType,
        description,
        about: about.filter((item) => item.trim() !== ""), // Remove empty strings
        details: parsedDetails,
        categoryId,
      });
      toast.success("Product created successfully");
      router.push("/dashboard/products"); // Redirect to products list (assumed path)
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl bg-white p-6 rounded-lg shadow-sm border border-gray-100"
    >
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Create New Product
        </h2>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          placeholder="Product Title"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category *
        </label>
        <CategoriesDropdown value={categoryId} onChange={setCategoryId} />
      </div>

      {/* Variation Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Variation Type *
        </label>
        <select
          value={variationType}
          onChange={(e) => setVariationType(e.target.value)}
          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          {Object.values(VariationType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          placeholder="Product Description"
        />
      </div>

      {/* About (Multiple Inputs) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          About
        </label>
        <div className="space-y-2">
          {about.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleAboutChange(index, e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                placeholder="Feature point..."
              />
              {about.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAboutItem(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addAboutItem}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Item
          </button>
        </div>
      </div>

      {/* Details (JSON) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Details (JSON)
        </label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 font-mono text-xs"
          placeholder='{"weight": "1kg", "material": "Cotton"}'
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter details as a valid JSON object.
        </p>
      </div>


      <button
        type="submit"
        disabled={loading}
        className="w-full h-10 bg-black text-white rounded-md font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Creating..." : "Create Product"}
      </button>
    </form>
  );
};
