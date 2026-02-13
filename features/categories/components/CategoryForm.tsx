"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { categorySchema, CategorySchema } from "../schemas/category";
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
import { createCategory, updateCategory } from "../actions/category";
import { toast } from "sonner";
import { Category } from "../types/category";

interface CategoryFormProps {
  category?: Category;
  onSuccess?: () => void;
}

export function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: category?.title || "",
    },
  });

  function onSubmit(data: CategorySchema) {
    startTransition(async () => {
      let result;
      if (category) {
        result = await updateCategory(category.id, data);
      } else {
        result = await createCategory(data);
      }

      if (result.success) {
        toast.success(
          `Category ${category ? "updated" : "created"} successfully`,
        );
        if (!category) {
          form.reset();
        }
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-background-light p-4 rounded-md"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary-foreground">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Category Title"
                  {...field}
                  className="bg-transparent text-primary-foreground border-input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending
              ? "Saving..."
              : category
                ? "Update Category"
                : "Create Category"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
