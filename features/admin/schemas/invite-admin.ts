import { z } from "zod";

export const inviteAdminSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
});

export type InviteAdminSchema = z.infer<typeof inviteAdminSchema>;
