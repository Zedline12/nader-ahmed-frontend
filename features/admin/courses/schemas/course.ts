import { z } from "zod";

const createCourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  youtubeNiche: z.string().min(1, "Youtube Niche is required"),
  description: z.string().min(1, "Description is required"),
  focusAreas: z.array(z.string()).min(1, "Focus Areas is required"),
});
const uploadThumbnailSchema = z.object({
  thumbnail: z
    .custom<FileList>()
    .refine((files) => files && files.length === 1, {
      message: "Thumbnail is required",
    })
    .refine((files) => files?.[0]?.size <= 5_000_000, {
      message: "Max file size is 5MB",
    })
    .refine(
      (files) =>
        ["image/png", "image/jpeg", "image/webp"].includes(files?.[0]?.type),
      {
        message: "Only PNG, JPG, or WEBP images are allowed",
      },
    ),
});
export { createCourseSchema, uploadThumbnailSchema };
