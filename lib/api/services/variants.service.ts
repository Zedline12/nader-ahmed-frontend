import { apiFetch } from "@/lib/api/client";

export const VariantsService = {
  getColors: async (): Promise<{ id: string; name: string }[]> => {
    return await apiFetch("admin/variants/colors", {
      method: "GET",
    });
  },

  getSizes: async (): Promise<{ id: string; code: string }[]> => {
    return await apiFetch("admin/variants/sizes", {
      method: "GET",
    });
  },
};
