"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCourseSchema, uploadThumbnailSchema } from "../schemas/course";
import { createCourseAction } from "../actions/course";
import { z } from "zod";
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
import { useTransition } from "react";
import { CourseAdmin } from "../types/course";

export const CreateCourseForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<
    z.infer<typeof createCourseSchema> & z.infer<typeof uploadThumbnailSchema>
  >({
    resolver: zodResolver(createCourseSchema.and(uploadThumbnailSchema as any)),
    defaultValues: {
      title: "",
      youtubeNiche: "",
      description: "",
      focusAreas: [],
    },
  });

  const onSubmit = (
    values: z.infer<typeof createCourseSchema> &
      z.infer<typeof uploadThumbnailSchema>,
  ) => {
    const { title,  description, focusAreas, youtubeNiche, thumbnail } = values;
    const parsed = createCourseSchema.safeParse({
      title,
      description,
      focusAreas,
      youtubeNiche,
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    startTransition(async () => {
      const result = await createCourseAction({
      title,
      description,
      focusAreas,
      youtubeNiche,
    });

      if (result?.error) {
        toast.error(result.message);
      } else {
        const course: CourseAdmin = result?.data;
        console.log(course);

        if (thumbnail && thumbnail.length > 0) {
          const formData = new FormData();
          formData.append("thumbnail", thumbnail[0]);

          const uploadThumb = await fetch(
            `/api/admin/courses/${course.id}/thumbnail`,
            {
              method: "PATCH",
              body: formData,
            },
          );

          if (!uploadThumb.ok) {
            toast.error("Course created, but thumbnail upload failed.");
          }
        }

        toast.success("Course created successfully");
        form.reset();
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={(event) => {
                    onChange(event.target.files);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Course Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
 
        <FormField
          control={form.control}
          name="youtubeNiche"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Youtube Niche</FormLabel>
              <FormControl>
                <Input placeholder="Youtube Niche" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Course description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Placeholder for Dynamic Focus Areas - treating as a comma separated string for simple input now, or just one input. 
            The schema expects array of strings. 
            For simplicity in this step, I'll implement it as a simple comma-separated input converter or similar, 
            but strictly speaking a dynamic field array is better. 
            However, given the constraints and no specific UI request for array fields, 
            I will use a simple implementation where the user types comma separated values 
            and I'll convert it manually or use a specific Input behavior.
            Wait, standard useForm binding to array usually requires useFieldArray.
            Let's keep it simple: A single text input that splits by comma for now to satisfy the schema, 
            or better, just a simple input that adds to the array? 
            Let's assume the user might want a simple text input that gets split. 
            Actually, the safest bet for now without over-engineering is just a text area or input 
            that we transform before submit, OR we just let the user modify the schema/form later if they want complex UI.
            I will implement a simple text input and split it on transform or just let it be single item array for a quick start.
            
            Let's go with: Single input, splits by comma on change.
         */}
        <FormField
          control={form.control}
          name="focusAreas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Focus Areas (comma separated)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value?.join(", ") || ""}
                  onChange={(e) => {
                    // Simple split by comma
                    const val = e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean);
                    field.onChange(val);
                  }}
                  placeholder="React, Next.js, TypeScript"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Course"}
        </Button>
      </form>
    </Form>
  );
};
