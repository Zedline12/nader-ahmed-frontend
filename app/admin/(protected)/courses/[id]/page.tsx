import { AdminCourseHeader } from "@/features/admin/courses/components/AdminCourseHeader";
import { AdminLessonCard } from "@/features/admin/courses/components/AdminLessonCard";
import { CreateLessonButton } from "@/features/admin/courses/components/CreateLessonButton";
import { CourseAdmin, CourseLessonAdmin } from "@/features/admin/courses/types/course";
import { fetchWithToken } from "@/lib/fetcher";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function AdminCoursePage({ params }: PageProps) {
    const { id } = await params;
    console.log(id)

  // 1. Fetch data
    const res = await fetchWithToken(`/courses/${id}`, {
      method:"GET",
    cache: "no-store",
    });
  const lessonsRes=await fetchWithToken(`/courses/${id}/lessons`,{
      method:"GET",
    cache: "no-store",
    })

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    // Simple error handling
    return (
      <div className="flex items-center justify-center p-12 text-red-500">
        Error loading course details. Please try again later.
      </div>
    );
  }

  // 2. Parse data
  const course: CourseAdmin = await res.json().then(d=>d.data);
  const lessons: CourseLessonAdmin[] = await lessonsRes.json().then(d => d.data);
  console.log(lessons)
  // 3. Render
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8 space-y-8">
      {/* Header Actions */}
      <AdminCourseHeader courseId={course.id} />

      {/* Hero / Thumbnail Section */}
      <div className="group relative w-full aspect-[21/9] rounded-3xl overflow-hidden bg-gray-100 shadow-sm">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-gray-50">
            <span className="text-lg font-medium">No Thumbnail Available</span>
          </div>
        )}
        {/* Overlay gradient for text readability if needed, or just cleaner styling */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 tracking-wide">
                {course.youtubeNiche}
              </span>
              {course.lastUpdated && (
                <span className="text-xs text-gray-400">
                  Last updated{" "}
                  {new Date(course.lastUpdated).toLocaleDateString()}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              {course.title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {course.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {course.focusAreas?.map((area) => (
              <span
                key={area}
                className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-600"
              >
                # {area}
              </span>
            ))}
          </div>

          {/* Lessons Section */}
          <div className="pt-8 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900">Curriculum</h2>
                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">
                  {course.lessons?.length || 0}
                </span>
              </div>
              <CreateLessonButton courseId={course.id} />
            </div>

            <div className="space-y-4">
              {lessons && lessons.length > 0 ? (
                lessons.map((lesson) => (
                  <Link href={`/dashboard/courses/${course.id}/lessons/${lesson.id}`}>
                  <AdminLessonCard key={lesson.order} lesson={lesson} />
                  </Link>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No lessons yet
                  </h3>
                  <p className="text-gray-500 text-sm text-center max-w-sm mb-4">
                    Start building your course content by adding the first
                    lesson.
                  </p>
                  <CreateLessonButton courseId={course.id} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Key Stats / Metadata Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 sticky top-8">
            <h3 className="font-semibold text-gray-900">Course Insights</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Duration
                </div>
                <div className="font-bold text-gray-900 text-lg">
                  {course.totalDurationHours}h
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Students
                </div>
                <div className="font-bold text-gray-900 text-lg">
                  {course.enrollmentCount}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Rating
                </div>
                <div className="font-bold text-gray-900 text-lg flex items-center gap-1">
                  {course.averageRating.toFixed(1)}
                  <span className="text-yellow-400 text-sm">★</span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Completion
                </div>
                <div className="font-bold text-gray-900 text-lg">
                  {course.completionRate}%
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Created</span>
                <span className="font-medium text-gray-900">
                  {new Date(course.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Video Collection</span>
                <span
                  className="font-medium text-gray-900 truncate max-w-[120px]"
                  title={course.videoCollectionId}
                >
                  {course.videoCollectionId}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
