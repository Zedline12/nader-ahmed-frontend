import { fetchWithToken } from "@/lib/fetcher";
import { AdminCourseCard } from "@/features/admin/courses/components/AdminCourseCard";
import { CourseAdmin } from "@/features/admin/courses/types/course";
import Link from "next/link";

export default async function CoursesPage() {
  const response = await fetchWithToken("/courses");
  const courses: CourseAdmin[] = await response.json().then((d) => d.data);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <Link key={course.id} href={`/admin/courses/${course.id}`}>
            <AdminCourseCard key={course.id} course={course} />
          </Link>
        ))}
      </div>
    </div>
  );
}
