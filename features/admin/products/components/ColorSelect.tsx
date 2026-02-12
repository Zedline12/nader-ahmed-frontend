"use client";

import { useEffect, useState } from "react";
import { VariantsService } from "@/lib/api/services/variants.service";

interface ColorSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
}

export function ColorSelect({
  value,
  onChange,
  error,
  label = "Color",
}: ColorSelectProps) {
  const [colors, setColors] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchColors() {
      try {
        const data = await VariantsService.getColors();
        setColors(data || []);
      } catch (err) {
        console.error("Failed to fetch colors", err);
      } finally {
        setLoading(false);
      }
    }
    fetchColors();
  }, []);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Select a color</option>
        {colors.map((color) => (
          <option key={color.id} value={color.id}>
            {color.name}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
