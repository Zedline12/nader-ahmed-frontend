"use server";

import { createCourseSchema } from "@/features/admin/courses/schemas/course";
import { fetchWithToken } from "@/lib/fetcher";
import { z } from "zod";
export interface CreateUploadResponse {
  videoId: string;
  signature: string;
  expiration: number;
  collectionId: string;
  libraryId: string;
}

export async function createLessonUpload(
  courseId: string,
  lessonTitle: string,
): Promise<CreateUploadResponse> {
  console.log(courseId);
  const response = await fetchWithToken(
    `/courses/${courseId}/lessons/create-upload`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title:lessonTitle }),
    },
  );
  const resData = await response.json();
  console.log(resData);
  return resData.data;
}
export async function createCourseAction(
  unsafeData: z.infer<typeof createCourseSchema>,
): Promise<{ error: boolean; message: string } | any> {
  const { success, data } = createCourseSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: true,
      message: (data as any).error.issues[0].message ?? "",
    };
  }
  const response = await fetchWithToken(`/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  console.log(resData);
  return resData;
}
