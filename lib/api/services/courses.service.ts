import { apiFetch } from "@/lib/api/client";
import { Course } from "@/lib/types/course.type";

export const coursesService = {
  async getCourses(): Promise<Course[]> {
    return await apiFetch("courses", {
      method: "GET",
    });
  },
};
