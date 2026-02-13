"use client";

import { useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { productSchema } from "@/features/products/schemas/product";
import { VariationType } from "@/lib/types/product.type";
import { createProduct } from "@/features/products/actions/product";
import { Plus, Trash2 } from "lucide-react";
import { Category } from "@/features/categories/types/category";

type CreateProductFormValues = z.infer<typeof productSchema>;

interface CreateProductFormProps {
  onSuccess?: () => void;
  categories: Category[];
}

export function CreateProductForm({
  onSuccess,
  categories,
}: CreateProductFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      variationType: VariationType.NONE,
      description: "",
      about: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "about" as never, // casting to never or any because of potentially complex type inference issues with string arrays in z.infer
  });

  function onSubmit(data: CreateProductFormValues) {
    startTransition(async () => {
      const result = await createProduct(data);

      if (result.success) {
        toast.success("Product created successfully");
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
          name="title"
          render={({ field }) => (
            <FormItem className="text-primary-foreground">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="text-primary-foreground">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="variationType"
            render={({ field }) => (
              <FormItem className="text-primary-foreground">
                <FormLabel>Variation Type</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value={VariationType.NONE}>None</option>
                    <option value={VariationType.ONLYSIZE}>Size Only</option>
                    <option value={VariationType.ONLYCOLOR}>Color Only</option>
                    <option value={VariationType.SIZEANDCOLOR}>
                      Size & Color
                    </option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="text-primary-foreground">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Product description..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <FormLabel>About This Item</FormLabel>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <FormField
                control={form.control}
                name={`about.${index}`}
                render={({ field }) => (
                  <FormItem className="flex-1 border-none text-primary-foreground">
                    <FormControl>
                      <Input placeholder="Feature point..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append("")}
            className="mt-2"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Point
          </Button>
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
