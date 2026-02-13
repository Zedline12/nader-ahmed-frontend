"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { inviteAdminSchema } from "@/features/admin/schemas/invite-admin";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { inviteAdminAction } from "@/features/admin/actions/invite-admin";
import { toast } from "sonner"; // Assuming sonner is used, typical for modern setups, otherwise I'll fallback to a generic toast if undefined, but user mentioned toast in previous turns

type InviteAdminFormValues = z.infer<typeof inviteAdminSchema>;

interface InviteAdminFormProps {
  onSuccess?: () => void;
}

export function InviteAdminForm({ onSuccess }: InviteAdminFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<InviteAdminFormValues>({
    resolver: zodResolver(inviteAdminSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  function onSubmit(data: InviteAdminFormValues) {
    startTransition(async () => {
      const result = await inviteAdminAction(data);

      if (result.success) {
        toast.success("Invitation sent successfully");
        form.reset();
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(result.error || "Something went wrong");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="admin@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Inviting..." : "Send Invitation"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
