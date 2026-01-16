"use client";

import { useEffect, useState } from "react";
import { VariantsService } from "@/lib/api/services/variants.service";

interface SizeSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
}

export function SizeSelect({
  value,
  onChange,
  error,
  label = "Size",
}: SizeSelectProps) {
  const [sizes, setSizes] = useState<{ id: string; code: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSizes() {
      try {
        const data = await VariantsService.getSizes();
        setSizes(data || []);
      } catch (err) {
        console.error("Failed to fetch sizes", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSizes();
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
        <option value="">Select a size</option>
        {sizes.map((size) => (
          <option key={size.id} value={size.id}>
            {size.code}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
