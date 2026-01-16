import { coursesService } from "@/lib/api/services/courses.service";
import { CourseGrid } from "@/features/courses/components/CourseGrid";

export default async function CoursesPage() {
  const courses = await coursesService.getCourses();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Courses
        </h1>
        <p className="text-gray-500 text-lg">
          Manage and view all your educational content in one place.
        </p>
      </div>

      <CourseGrid courses={courses} />
    </div>
  );
}
