"use server";

import { fetchWithToken } from "@/lib/fetcher";
import {
  inviteAdminSchema,
  InviteAdminSchema,
} from "@/features/admin/schemas/invite-admin";
import { revalidatePath } from "next/cache";

export async function inviteAdminAction(data: InviteAdminSchema) {
  const validationResult = inviteAdminSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      error: "Invalid input data",
    };
  }

  try {
    const response = await fetchWithToken("/admin/auth/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Failed to invite admin",
      };
    }

    revalidatePath("/admin/admins");
    return { success: true };
  } catch (error) {
    console.error("Invite Admin Error:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
