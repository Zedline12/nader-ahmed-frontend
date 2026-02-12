"use client";

import { CategoriesService } from "@/lib/api/services/categories.service";
import { Category } from "@/lib/types/category.type";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CategoriesDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const CategoriesDropdown = ({
  value,
  onChange,
}: CategoriesDropdownProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoriesService.findAll();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="h-10 w-full animate-pulse bg-gray-200 rounded-md"></div>
    );
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value="" disabled>
        Select a category
      </option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.title}
        </option>
      ))}
    </select>
  );
};
